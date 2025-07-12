import { Client } from "@notionhq/client"
import { PageObjectResponse, BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import * as fs from "fs/promises"
import * as path from "path"
import { CACHE_DIR, initializeCache, loadCacheIndex, saveCacheIndex, isCacheEntryValid } from "./notionCache"

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

// Get cached page data
const getCachedPageData = async (pageId: string): Promise<CachedPageData | null> => {
  try {
    const cacheFile = path.join(CACHE_DIR, `${pageId}.json`)
    const cachedData = await fs.readFile(cacheFile, "utf-8")
    return JSON.parse(cachedData)
  } catch {
    return null
  }
}

// Save page data to cache
const saveCachedPageData = async (pageId: string, data: CachedPageData): Promise<void> => {
  const cacheFile = path.join(CACHE_DIR, `${pageId}.json`)
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
 * @param databaseId - The Notion database ID containing blog posts
 * @returns Array of parsed blog post objects
 */
export const getAllPublishedBlogPosts = async (databaseId: string): Promise<BlogPost[]> => {
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
  return publishedPages.map(transformNotionPageToBlogPost)
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
  const freshBlocks = await fetchAllBlocksFromPage(pageId)

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
 * Fetches blocks from a block ID (for nested blocks) without caching
 * @param blockId - The Notion block ID
 * @returns Array of block objects
 */
export const getNotionBlockChildren = async (blockId: string): Promise<BlockObjectResponse[]> => {
  console.log(`**Fetching children for block ${blockId}**`)
  return await fetchAllBlocksFromPage(blockId)
}

/**
 * Fetches all blocks from a Notion page with pagination support
 * @param blockId - The Notion block/page ID
 * @returns Array of all blocks from the page
 */
const fetchAllBlocksFromPage = async (blockId: string): Promise<BlockObjectResponse[]> => {
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

  return blocks
}
