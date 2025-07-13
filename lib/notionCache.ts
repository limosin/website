import * as fs from "fs/promises"
import * as path from "path"
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

// Cache configuration
export const CACHE_DIR = path.join(process.cwd(), ".notion-cache")
export const PAGES_CACHE_DIR = path.join(CACHE_DIR, "pages")
export const BLOCKS_CACHE_DIR = path.join(CACHE_DIR, "blocks")
export const CACHE_INDEX_FILE = path.join(CACHE_DIR, "index.json")
export const BLOCKS_INDEX_FILE = path.join(CACHE_DIR, "blocks-index.json")
export const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

export interface CacheIndex {
  [pageId: string]: {
    lastModified: string
    cachedAt: number
    size?: number
  }
}

export interface BlocksCacheIndex {
  [blockId: string]: {
    cachedAt: number
    size?: number
    parentId?: string // Track which page/block this belongs to
  }
}

export interface CacheStats {
  pages: {
    totalFiles: number
    totalSize: number
    oldestCacheTime: number
    newestCacheTime: number
    expiredFiles: number
  }
  blocks: {
    totalFiles: number
    totalSize: number
    oldestCacheTime: number
    newestCacheTime: number
    expiredFiles: number
  }
}

/**
 * Initialize cache directory structure
 */
export const initializeCache = async (): Promise<void> => {
  try {
    await fs.access(CACHE_DIR)
  } catch {
    await fs.mkdir(CACHE_DIR, { recursive: true })
  }

  try {
    await fs.access(PAGES_CACHE_DIR)
  } catch {
    await fs.mkdir(PAGES_CACHE_DIR, { recursive: true })
  }

  try {
    await fs.access(BLOCKS_CACHE_DIR)
  } catch {
    await fs.mkdir(BLOCKS_CACHE_DIR, { recursive: true })
  }
}

/**
 * Load cache index from disk
 */
export const loadCacheIndex = async (): Promise<CacheIndex> => {
  try {
    const indexData = await fs.readFile(CACHE_INDEX_FILE, "utf-8")
    return JSON.parse(indexData)
  } catch {
    return {}
  }
}

/**
 * Save cache index to disk
 */
export const saveCacheIndex = async (index: CacheIndex): Promise<void> => {
  await fs.writeFile(CACHE_INDEX_FILE, JSON.stringify(index, null, 2))
}

/**
 * Load blocks cache index from disk
 */
export const loadBlocksCacheIndex = async (): Promise<BlocksCacheIndex> => {
  try {
    const indexData = await fs.readFile(BLOCKS_INDEX_FILE, "utf-8")
    return JSON.parse(indexData)
  } catch {
    return {}
  }
}

/**
 * Save blocks cache index to disk
 */
export const saveBlocksCacheIndex = async (index: BlocksCacheIndex): Promise<void> => {
  await fs.writeFile(BLOCKS_INDEX_FILE, JSON.stringify(index, null, 2))
}

/**
 * Get cache statistics
 */
export const getCacheStats = async (): Promise<CacheStats> => {
  const pagesIndex = await loadCacheIndex()
  const blocksIndex = await loadBlocksCacheIndex()
  const pagesEntries = Object.values(pagesIndex)
  const blocksEntries = Object.values(blocksIndex)
  const now = Date.now()

  const getStatsForEntries = (entries: Array<{ cachedAt: number; size?: number }>) => {
    if (entries.length === 0) {
      return {
        totalFiles: 0,
        totalSize: 0,
        oldestCacheTime: 0,
        newestCacheTime: 0,
        expiredFiles: 0,
      }
    }

    return {
      totalFiles: entries.length,
      totalSize: entries.reduce((sum, entry) => sum + (entry.size || 0), 0),
      oldestCacheTime: Math.min(...entries.map((e) => e.cachedAt)),
      newestCacheTime: Math.max(...entries.map((e) => e.cachedAt)),
      expiredFiles: entries.filter((e) => now - e.cachedAt > CACHE_TTL_MS).length,
    }
  }

  return {
    pages: getStatsForEntries(pagesEntries),
    blocks: getStatsForEntries(blocksEntries),
  }
}

/**
 * Clear expired cache entries for both pages and blocks
 */
export const clearExpiredCache = async (): Promise<{ pages: number; blocks: number }> => {
  const pagesIndex = await loadCacheIndex()
  const blocksIndex = await loadBlocksCacheIndex()
  const now = Date.now()
  let pagesClearedCount = 0
  let blocksClearedCount = 0

  // Clear expired pages
  const validPagesEntries: CacheIndex = {}
  for (const [pageId, entry] of Object.entries(pagesIndex)) {
    if (now - entry.cachedAt > CACHE_TTL_MS) {
      try {
        const cacheFile = path.join(PAGES_CACHE_DIR, `${pageId}.json`)
        await fs.unlink(cacheFile)
        pagesClearedCount++
      } catch {
        // File might already be deleted
      }
    } else {
      validPagesEntries[pageId] = entry
    }
  }

  // Clear expired blocks
  const validBlocksEntries: BlocksCacheIndex = {}
  for (const [blockId, entry] of Object.entries(blocksIndex)) {
    if (now - entry.cachedAt > CACHE_TTL_MS) {
      try {
        const cacheFile = path.join(BLOCKS_CACHE_DIR, `${blockId}.json`)
        await fs.unlink(cacheFile)
        blocksClearedCount++
      } catch {
        // File might already be deleted
      }
    } else {
      validBlocksEntries[blockId] = entry
    }
  }

  await saveCacheIndex(validPagesEntries)
  await saveBlocksCacheIndex(validBlocksEntries)

  return { pages: pagesClearedCount, blocks: blocksClearedCount }
}

/**
 * Clear all cache entries for both pages and blocks
 */
export const clearAllCache = async (): Promise<{ pages: number; blocks: number }> => {
  const pagesIndex = await loadCacheIndex()
  const blocksIndex = await loadBlocksCacheIndex()
  let pagesClearedCount = 0
  let blocksClearedCount = 0

  // Clear all pages
  for (const pageId of Object.keys(pagesIndex)) {
    try {
      const cacheFile = path.join(PAGES_CACHE_DIR, `${pageId}.json`)
      await fs.unlink(cacheFile)
      pagesClearedCount++
    } catch {
      // File might already be deleted
    }
  }

  // Clear all blocks
  for (const blockId of Object.keys(blocksIndex)) {
    try {
      const cacheFile = path.join(BLOCKS_CACHE_DIR, `${blockId}.json`)
      await fs.unlink(cacheFile)
      blocksClearedCount++
    } catch {
      // File might already be deleted
    }
  }

  // Clear both indexes
  await saveCacheIndex({})
  await saveBlocksCacheIndex({})

  return { pages: pagesClearedCount, blocks: blocksClearedCount }
}

/**
 * Clear cache for a specific page and its associated blocks
 */
export const clearPageCache = async (pageId: string): Promise<boolean> => {
  const pagesIndex = await loadCacheIndex()
  const blocksIndex = await loadBlocksCacheIndex()
  let success = false

  // Clear page cache
  if (pagesIndex[pageId]) {
    try {
      const cacheFile = path.join(PAGES_CACHE_DIR, `${pageId}.json`)
      await fs.unlink(cacheFile)

      delete pagesIndex[pageId]
      await saveCacheIndex(pagesIndex)
      success = true
    } catch {
      // File might already be deleted
    }
  }

  // Clear associated blocks cache
  const blocksToDelete = Object.entries(blocksIndex)
    .filter(([, entry]) => entry.parentId === pageId)
    .map(([blockId]) => blockId)

  for (const blockId of blocksToDelete) {
    try {
      const cacheFile = path.join(BLOCKS_CACHE_DIR, `${blockId}.json`)
      await fs.unlink(cacheFile)
      delete blocksIndex[blockId]
    } catch {
      // File might already be deleted
    }
  }

  if (blocksToDelete.length > 0) {
    await saveBlocksCacheIndex(blocksIndex)
  }

  return success
}

/**
 * Check if cache entry exists and is valid
 */
export const isCacheEntryValid = async (pageId: string, currentLastModified: string): Promise<boolean> => {
  const index = await loadCacheIndex()
  const entry = index[pageId]

  if (!entry) {
    return false
  }

  const now = Date.now()
  const isNotExpired = now - entry.cachedAt < CACHE_TTL_MS
  const isNotModified = entry.lastModified === currentLastModified

  return isNotExpired && isNotModified
}

/**
 * Warm cache for multiple pages (useful for build time)
 */
export const warmCache = async (pageIds: string[], fetchPageData: (pageId: string) => Promise<unknown>): Promise<void> => {
  console.log(`**Warming cache for ${pageIds.length} pages**`)

  // Process in batches to avoid rate limiting
  const batchSize = 5
  for (let i = 0; i < pageIds.length; i += batchSize) {
    const batch = pageIds.slice(i, i + batchSize)

    await Promise.all(
      batch.map(async (pageId) => {
        try {
          await fetchPageData(pageId)
        } catch (error) {
          console.warn(`Failed to warm cache for page ${pageId}:`, error)
        }
      })
    )

    // Small delay between batches
    if (i + batchSize < pageIds.length) {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }

  console.log("**Cache warming completed**")
}

/**
 * Get cached blocks data
 */
export const getCachedBlocksData = async (blockId: string): Promise<BlockObjectResponse[] | null> => {
  try {
    const cacheFile = path.join(BLOCKS_CACHE_DIR, `${blockId}.json`)
    const cachedData = await fs.readFile(cacheFile, "utf-8")
    return JSON.parse(cachedData)
  } catch {
    return null
  }
}

/**
 * Save blocks data to cache
 */
export const saveCachedBlocksData = async (blockId: string, blocks: BlockObjectResponse[], parentId?: string): Promise<void> => {
  const cacheFile = path.join(BLOCKS_CACHE_DIR, `${blockId}.json`)
  const dataString = JSON.stringify(blocks, null, 2)
  await fs.writeFile(cacheFile, dataString)

  // Update blocks index with file size and parent reference
  const index = await loadBlocksCacheIndex()
  index[blockId] = {
    cachedAt: Date.now(),
    size: Buffer.byteLength(dataString, "utf8"),
    parentId,
  }
  await saveBlocksCacheIndex(index)
}

/**
 * Check if blocks cache entry exists and is valid
 */
export const isBlocksCacheEntryValid = async (blockId: string): Promise<boolean> => {
  const index = await loadBlocksCacheIndex()
  const entry = index[blockId]

  if (!entry) {
    return false
  }

  const now = Date.now()
  const isNotExpired = now - entry.cachedAt < CACHE_TTL_MS

  // Check if cache file exists
  try {
    const cacheFile = path.join(BLOCKS_CACHE_DIR, `${blockId}.json`)
    await fs.access(cacheFile)
    return isNotExpired
  } catch {
    return false
  }
}

/**
 * Clear cache for specific blocks
 */
export const clearBlocksCache = async (blockId: string): Promise<boolean> => {
  const index = await loadBlocksCacheIndex()

  if (index[blockId]) {
    try {
      const cacheFile = path.join(BLOCKS_CACHE_DIR, `${blockId}.json`)
      await fs.unlink(cacheFile)

      delete index[blockId]
      await saveBlocksCacheIndex(index)

      return true
    } catch {
      return false
    }
  }

  return false
}
