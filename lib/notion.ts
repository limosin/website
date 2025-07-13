import { Client } from "@notionhq/client"
import { PageObjectResponse, BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import * as fs from "fs/promises"
import * as path from "path"
import { PAGES_CACHE_DIR, initializeCache, loadCacheIndex, saveCacheIndex, isCacheEntryValid, getCachedBlocksData, saveCachedBlocksData, isBlocksCacheEntryValid } from "./notionCache"

// Types for better code structure
export interface BlogPost {
  id: string
  cover?: string
  title?: string
  date?: string
  description?: string
  tags?: string[]
  slug?: string
}

interface CachedPageData {
  page: PageObjectResponse
  blocks: BlockObjectResponse[]
  lastModified: string
  cachedAt: number
}

const notion: Client = new Client({
  auth: process.env.NOTION_API_TOKEN,
})

// In-memory cache for database queries (resets on app restart)
let cachedBlogPosts: BlogPost[] | null = null
let cacheTimestamp: number | null = null
const MEMORY_CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

// Get cached page data
const getCachedPageData = async (pageId: string): Promise<CachedPageData | null> => {
  try {
    const cacheFile = path.join(PAGES_CACHE_DIR, `${pageId}.json`)
    const cachedData = await fs.readFile(cacheFile, "utf-8")
    return JSON.parse(cachedData)
  } catch {
    return null
  }
}

// Save page data to cache
const saveCachedPageData = async (pageId: string, data: CachedPageData): Promise<void> => {
  const cacheFile = path.join(PAGES_CACHE_DIR, `${pageId}.json`)
  const dataString = JSON.stringify(data, null, 2)
  await fs.writeFile(cacheFile, dataString)

  // Update index with file size
  const index = await loadCacheIndex()
  index[pageId] = {
    ...index[pageId],
    size: Buffer.byteLength(dataString, "utf8"),
  }
  await saveCacheIndex(index)
}

/**
 * Fetches and parses all published blog posts from the Notion database
 * Uses in-memory caching to avoid redundant queries during the same session
 * @param databaseId - The Notion database ID containing blog posts
 * @returns Array of parsed blog post objects
 */
export const getAllPublishedBlogPosts = async (databaseId: string): Promise<BlogPost[]> => {
  // Check if we have valid cached data
  const now = Date.now()
  if (cachedBlogPosts && cacheTimestamp && now - cacheTimestamp < MEMORY_CACHE_TTL_MS) {
    console.log("**Using in-memory cached blog posts**")
    return cachedBlogPosts
  }

  console.log("**Notion Database Query API Called**")
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "stage",
      select: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  })
  const publishedPages = response.results.filter((obj): obj is PageObjectResponse => (obj as PageObjectResponse).properties !== undefined)
  const blogPosts = publishedPages.map(transformNotionPageToBlogPost)

  // Cache the results in memory
  cachedBlogPosts = blogPosts
  cacheTimestamp = now
  console.log(`**Cached ${blogPosts.length} blog posts in memory**`)

  return blogPosts
}

/**
 * Transforms a Notion page object into a structured blog post object
 * @param page - Notion page object
 * @returns Structured blog post object
 */
const transformNotionPageToBlogPost = (page: PageObjectResponse): BlogPost => {
  const { id, cover, properties } = page
  const { title, date, description, tags, slug } = properties

  return {
    id,
    cover: cover?.type === "external" ? cover.external?.url : undefined,
    title: title?.type === "title" ? title.title[0]?.plain_text : undefined,
    date: date?.type === "date" ? date.date?.start : undefined,
    description: description?.type === "rich_text" ? description.rich_text[0]?.plain_text : undefined,
    tags: tags?.type === "formula" && tags.formula?.type === "string" ? tags.formula?.string?.split(",").map((tag) => tag.trim()) : undefined,
    slug: slug?.type === "rich_text" ? slug.rich_text[0]?.plain_text : undefined,
  }
}

/**
 * Fetches all blocks for a page with caching based on last_edited_time
 * @param pageId - The Notion page ID
 * @returns Array of block objects
 */
export const getNotionPageBlocksWithCache = async (pageId: string): Promise<BlockObjectResponse[]> => {
  const { blocks } = await getNotionPageWithBlocks(pageId)
  return blocks
}

/**
 * Fetches both page metadata and blocks with caching based on last_edited_time
 * @param pageId - The Notion page ID
 * @returns Object containing both page and blocks
 */
export const getNotionPageWithBlocks = async (pageId: string): Promise<{ page: PageObjectResponse; blocks: BlockObjectResponse[] }> => {
  await initializeCache()

  // Get page metadata to check last_edited_time
  console.log("**Notion Page Metadata API Called**")
  const pageMetadata = (await notion.pages.retrieve({ page_id: pageId })) as PageObjectResponse
  const currentLastModified = pageMetadata.last_edited_time

  // Check if we have valid cached data
  const isValid = await isCacheEntryValid(pageId, currentLastModified)
  if (isValid) {
    const cachedData = await getCachedPageData(pageId)
    if (cachedData) {
      console.log(`**Using cached data for page and blocks ${pageId}**`)
      return { page: cachedData.page, blocks: cachedData.blocks }
    }
  }

  // Cache miss or stale data - fetch fresh blocks
  console.log(`**Cache miss for page ${pageId} - fetching fresh data**`)
  const freshBlocks = await fetchAllBlocksFromPage(pageId, true, pageId)

  // Save to cache
  const cacheData: CachedPageData = {
    page: pageMetadata,
    blocks: freshBlocks,
    lastModified: currentLastModified,
    cachedAt: Date.now(),
  }
  await saveCachedPageData(pageId, cacheData)

  // Update cache index
  const cacheIndex = await loadCacheIndex()
  cacheIndex[pageId] = {
    lastModified: currentLastModified,
    cachedAt: Date.now(),
  }
  await saveCacheIndex(cacheIndex)

  return { page: pageMetadata, blocks: freshBlocks }
}

/**
 * Fetches blocks from a block ID (for nested blocks) with caching
 * @param blockId - The Notion block ID
 * @param parentId - The parent page/block ID for cache organization
 * @returns Array of block objects
 */
export const getNotionBlockChildren = async (blockId: string, parentId?: string): Promise<BlockObjectResponse[]> => {
  // Check if we have valid cached blocks
  const isValid = await isBlocksCacheEntryValid(blockId)
  if (isValid) {
    const cachedBlocks = await getCachedBlocksData(blockId)
    if (cachedBlocks) {
      return cachedBlocks
    }
  }

  // Cache miss - fetch fresh blocks
  console.log(`**Cache miss for blocks ${blockId} - fetching fresh data**`)
  const freshBlocks = await fetchAllBlocksFromPage(blockId, true, parentId)

  // Save to cache
  await saveCachedBlocksData(blockId, freshBlocks, parentId)

  return freshBlocks
}

/**
 * Fetches all blocks from a Notion page with pagination support and caching
 * @param blockId - The Notion block/page ID
 * @param useCache - Whether to use caching (default: true for pages, false for nested blocks)
 * @param parentId - The parent page ID for cache organization
 * @returns Array of all blocks from the page
 */
const fetchAllBlocksFromPage = async (blockId: string, useCache: boolean = true, parentId?: string): Promise<BlockObjectResponse[]> => {
  // Use cache for page-level blocks
  if (useCache) {
    const isValid = await isBlocksCacheEntryValid(blockId)
    if (isValid) {
      const cachedBlocks = await getCachedBlocksData(blockId)
      if (cachedBlocks) {
        return cachedBlocks
      }
    }
  }

  console.log("**Notion Blocks API Called**")
  const blocks: BlockObjectResponse[] = []
  let cursor: string | undefined = undefined

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    })

    blocks.push(...(results as BlockObjectResponse[]))

    if (!next_cursor) {
      break
    }
    cursor = next_cursor
  }

  // Cache the results if caching is enabled
  if (useCache) {
    await saveCachedBlocksData(blockId, blocks, parentId)
  }

  return blocks
}

/**
 * Clears the in-memory cache for blog posts
 * Useful for development or when you want to force a fresh fetch
 */
export const clearBlogPostsMemoryCache = (): void => {
  cachedBlogPosts = null
  cacheTimestamp = null
  console.log("**In-memory blog posts cache cleared**")
}

/**
 * Gets the status of the in-memory cache
 * @returns Object with cache status information
 */
export const getBlogPostsCacheStatus = (): {
  isCached: boolean
  cacheAge?: number
  cacheSize?: number
  timeToExpiry?: number
} => {
  if (!cachedBlogPosts || !cacheTimestamp) {
    return { isCached: false }
  }

  const now = Date.now()
  const cacheAge = now - cacheTimestamp
  const timeToExpiry = MEMORY_CACHE_TTL_MS - cacheAge

  return {
    isCached: true,
    cacheAge,
    cacheSize: cachedBlogPosts.length,
    timeToExpiry: timeToExpiry > 0 ? timeToExpiry : 0,
  }
}
