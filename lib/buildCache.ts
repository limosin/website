/**
 * Build-time cache warming hook
 * This can be imported and called during the build process to pre-populate cache
 */
import { getAllPublishedBlogPosts, getNotionPageBlocksWithCache } from "./notion"
import { warmCache, clearExpiredCache } from "./notionCache"

export interface BuildCacheOptions {
  clearExpired?: boolean
  batchSize?: number
  verbose?: boolean
}

/**
 * Warm cache for all published blog posts during build time
 * This should be called in getStaticProps or during the build process
 */
export const warmBuildCache = async (options: BuildCacheOptions = {}): Promise<void> => {
  const { clearExpired = true, verbose = false } = options

  if (!process.env.NOTION_BLOG_DATABASE_ID) {
    console.warn("⚠️  NOTION_BLOG_DATABASE_ID not found, skipping cache warming")
    return
  }

  try {
    // Clear expired cache first if requested
    if (clearExpired) {
      const clearedCount = await clearExpiredCache()
      if (verbose && (clearedCount.pages > 0 || clearedCount.blocks > 0)) {
        console.log(`🧹 Cleared ${clearedCount.pages} expired page cache entries and ${clearedCount.blocks} expired block cache entries`)
      }
    }

    // Get all published posts
    const posts = await getAllPublishedBlogPosts(process.env.NOTION_BLOG_DATABASE_ID)

    if (posts.length === 0) {
      if (verbose) {
        console.log("📝 No published posts found to cache")
      }
      return
    }

    if (verbose) {
      console.log(`🔥 Warming cache for ${posts.length} blog posts...`)
    }

    // Warm cache for all posts
    const pageIds = posts.map((post) => post.id).filter(Boolean)
    await warmCache(pageIds, async (pageId) => {
      // Get both page data and blocks to fully warm the cache
      await getNotionPageBlocksWithCache(pageId)
    })

    if (verbose) {
      console.log(`✅ Build cache warmed successfully for ${pageIds.length} pages`)
    }
  } catch (error) {
    console.error("❌ Error during build cache warming:", error)
    // Don't fail the build, just log the error
  }
}

/**
 * Get cache warming status for monitoring
 */
export const getCacheWarmingStatus = async () => {
  if (!process.env.NOTION_BLOG_DATABASE_ID) {
    return { status: "disabled", reason: "NOTION_BLOG_DATABASE_ID not configured" }
  }

  try {
    const posts = await getAllPublishedBlogPosts(process.env.NOTION_BLOG_DATABASE_ID)
    return {
      status: "ready",
      totalPosts: posts.length,
      pageIds: posts.map((p) => p.id).filter(Boolean),
    }
  } catch (error) {
    return {
      status: "error",
      error: error.message,
    }
  }
}
