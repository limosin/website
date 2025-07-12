import * as fs from "fs/promises"
import * as path from "path"

// Cache configuration
export const CACHE_DIR = path.join(process.cwd(), ".notion-cache")
export const CACHE_INDEX_FILE = path.join(CACHE_DIR, "index.json")
export const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

export interface CacheIndex {
  [pageId: string]: {
    lastModified: string
    cachedAt: number
    size?: number
  }
}

export interface CacheStats {
  totalFiles: number
  totalSize: number
  oldestCacheTime: number
  newestCacheTime: number
  expiredFiles: number
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
 * Get cache statistics
 */
export const getCacheStats = async (): Promise<CacheStats> => {
  const index = await loadCacheIndex()
  const entries = Object.values(index)
  const now = Date.now()

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

/**
 * Clear expired cache entries
 */
export const clearExpiredCache = async (): Promise<number> => {
  const index = await loadCacheIndex()
  const now = Date.now()
  let clearedCount = 0

  const validEntries: CacheIndex = {}

  for (const [pageId, entry] of Object.entries(index)) {
    if (now - entry.cachedAt > CACHE_TTL_MS) {
      // Remove expired cache file
      try {
        const cacheFile = path.join(CACHE_DIR, `${pageId}.json`)
        await fs.unlink(cacheFile)
        clearedCount++
      } catch {
        // File might already be deleted
      }
    } else {
      validEntries[pageId] = entry
    }
  }

  await saveCacheIndex(validEntries)
  return clearedCount
}

/**
 * Clear all cache entries
 */
export const clearAllCache = async (): Promise<number> => {
  const index = await loadCacheIndex()
  let clearedCount = 0

  for (const pageId of Object.keys(index)) {
    try {
      const cacheFile = path.join(CACHE_DIR, `${pageId}.json`)
      await fs.unlink(cacheFile)
      clearedCount++
    } catch {
      // File might already be deleted
    }
  }

  // Clear index
  await saveCacheIndex({})

  return clearedCount
}

/**
 * Clear cache for a specific page
 */
export const clearPageCache = async (pageId: string): Promise<boolean> => {
  const index = await loadCacheIndex()

  if (index[pageId]) {
    try {
      const cacheFile = path.join(CACHE_DIR, `${pageId}.json`)
      await fs.unlink(cacheFile)

      delete index[pageId]
      await saveCacheIndex(index)

      return true
    } catch {
      return false
    }
  }

  return false
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
