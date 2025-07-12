#!/usr/bin/env node

/**
 * Notion Cache Management CLI
 * 
 * Usage:
 *   node scripts/cache-manager.js stats
 *   node scripts/cache-manager.js clear
 *   node scripts/cache-manager.js clear-expired
 *   node scripts/cache-manager.js warm [page-id]
 */

import { 
  getCacheStats, 
  clearAllCache, 
  clearExpiredCache, 
  warmCache 
} from '../lib/notionCache.js'
import { getAllPublishedBlogPosts, getNotionPageBlocksWithCache } from '../lib/notion.js'

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleString()
}

const showStats = async () => {
  try {
    const stats = await getCacheStats()
    
    console.log('\n📊 Notion Cache Statistics:')
    console.log('─'.repeat(40))
    console.log(`Total cached files: ${stats.totalFiles}`)
    console.log(`Total cache size: ${formatBytes(stats.totalSize)}`)
    console.log(`Expired files: ${stats.expiredFiles}`)
    
    if (stats.totalFiles > 0) {
      console.log(`Oldest cache: ${formatTime(stats.oldestCacheTime)}`)
      console.log(`Newest cache: ${formatTime(stats.newestCacheTime)}`)
    }
    
    if (stats.expiredFiles > 0) {
      console.log(`\n⚠️  ${stats.expiredFiles} cache entries have expired`)
      console.log('Run "npm run cache:clear-expired" to clean them up')
    }
    
    console.log('')
  } catch (error) {
    console.error('❌ Error getting cache stats:', error.message)
  }
}

const clearCache = async () => {
  try {
    const clearedCount = await clearAllCache()
    console.log(`🗑️  Cleared ${clearedCount} cache entries`)
  } catch (error) {
    console.error('❌ Error clearing cache:', error.message)
  }
}

const clearExpired = async () => {
  try {
    const clearedCount = await clearExpiredCache()
    console.log(`🧹 Cleared ${clearedCount} expired cache entries`)
  } catch (error) {
    console.error('❌ Error clearing expired cache:', error.message)
  }
}

const warmCacheForAllPosts = async () => {
  try {
    if (!process.env.NOTION_BLOG_DATABASE_ID) {
      throw new Error('NOTION_BLOG_DATABASE_ID environment variable is required')
    }
    
    console.log('🔥 Starting cache warming process...')
    const posts = await getAllPublishedBlogPosts(process.env.NOTION_BLOG_DATABASE_ID)
    const pageIds = posts.map(post => post.id)
    
    await warmCache(pageIds, getNotionPageBlocksWithCache)
    console.log(`✅ Cache warmed for ${pageIds.length} blog posts`)
  } catch (error) {
    console.error('❌ Error warming cache:', error.message)
  }
}

const warmSpecificPage = async (pageId) => {
  try {
    console.log(`🔥 Warming cache for page: ${pageId}`)
    await getNotionPageBlocksWithCache(pageId)
    console.log(`✅ Cache warmed for page: ${pageId}`)
  } catch (error) {
    console.error(`❌ Error warming cache for page ${pageId}:`, error.message)
  }
}

const main = async () => {
  const command = process.argv[2]
  const arg = process.argv[3]
  
  switch (command) {
    case 'stats':
      await showStats()
      break
      
    case 'clear':
      await clearCache()
      break
      
    case 'clear-expired':
      await clearExpired()
      break
      
    case 'warm':
      if (arg) {
        await warmSpecificPage(arg)
      } else {
        await warmCacheForAllPosts()
      }
      break
      
    default:
      console.log('Notion Cache Manager')
      console.log('')
      console.log('Usage:')
      console.log('  node scripts/cache-manager.js stats         - Show cache statistics')
      console.log('  node scripts/cache-manager.js clear         - Clear all cache')
      console.log('  node scripts/cache-manager.js clear-expired - Clear expired cache')
      console.log('  node scripts/cache-manager.js warm          - Warm cache for all posts')
      console.log('  node scripts/cache-manager.js warm [id]     - Warm cache for specific page')
      console.log('')
  }
}

main().catch(console.error)
