# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A performance-optimized Next.js blog using Notion as a headless CMS with Tailwind CSS styling. The architecture emphasizes caching, lazy loading, and web vitals monitoring.

## Package Manager

**Always use `yarn` for all package operations** - never use npm or npx.

## Essential Commands

### Development
```bash
yarn dev              # Development server with Turbopack (default, faster)
yarn dev:webpack      # Development with Webpack (fallback)
yarn build            # Production build (uses Webpack)
yarn start            # Start production server
```

### Code Quality
```bash
yarn lint             # Run ESLint
```

### Performance & Analysis
```bash
yarn analyze          # Bundle analysis (sets ANALYZE=true)
yarn lighthouse       # Run Lighthouse CI performance audits
```

### Cache Management
```bash
yarn cache:stats           # Show cache statistics
yarn cache:clear           # Clear all cache
yarn cache:clear-expired   # Clear only expired cache entries
yarn cache:warm            # Pre-warm cache for build optimization
```

## Architecture Overview

### Notion CMS Integration

**Core pattern**: Notion database → `lib/notion.ts` → Transformed blog posts

**Required Notion database columns**:
- `Page` (title): Blog post headline and meta title
- `Slug` (text): URL slug
- `Date` (date): Display date and published_time
- `Description` (text): Preview text and meta description
- `Published` (checkbox): Must be checked
- `stage` (select): Must be "Published" for posts to appear
- `Cover Image` (files & media): Optional cover/featured image

**Environment variables** (`.env.local`):
```bash
NOTION_API_TOKEN=secret_xxx
NOTION_BLOG_DATABASE_ID=xxx
```

### Multi-Layer Caching System

The application implements three caching levels:

1. **In-memory cache** (`lib/notion.ts`):
   - Blog posts list cached for 5 minutes
   - Resets on app restart
   - Check status: `getBlogPostsCacheStatus()`

2. **File-based cache** (`.notion-cache/`):
   - Pages cache: `.notion-cache/pages/{pageId}.json`
   - Blocks cache: `.notion-cache/blocks/{blockId}.json`
   - TTL: 24 hours
   - Invalidation: Based on Notion's `last_edited_time`

3. **Build-time cache** (`lib/buildCache.ts`):
   - Used during static site generation
   - Managed by cache-manager.js script

**Key caching functions**:
- `getAllPublishedBlogPosts()`: Fetches blog list with memory caching
- `getNotionPageWithBlocks()`: Fetches page + blocks with file caching
- `getNotionBlockChildren()`: Fetches nested blocks with caching

### Content Rendering System

**Block-based architecture** (`components/ContentBlocks.tsx`):
- `RenderBlocks()`: Main entry point for rendering Notion content
- `RenderBlocksHelper()`: Handles individual block type mapping
- Modular components in `components/notionblocks/`:
  - `CommonBlocks.tsx`: Text, headings, spans
  - `Lists.tsx`: Bulleted and numbered lists (handles nesting)
  - `Code.tsx`: Syntax-highlighted code blocks
  - `Image.tsx`: Optimized images
  - `BlockQuote.tsx`, `Callout.tsx`, `Video.tsx`
  - `Bookmark.tsx` (lazy loaded)
  - `Table.tsx` (lazy loaded)

**Performance optimization**:
- Heavy components (Bookmark, Table) are lazy loaded with `React.lazy()`
- Suspense boundaries with loading skeletons

### Static Site Generation Pattern

**Page routing** (`pages/posts/[slug].tsx`):
- `getStaticPaths()`: Generates paths for all published posts
- `getStaticProps()`: Fetches page + blocks at build time
- Nested blocks are fetched recursively and attached to parent blocks
- ISR revalidation: 6 hours in production, 1 second in development
- Fallback: "blocking" for new posts

### Type Safety with Notion API

**Critical pattern**: Always check property types before accessing values

```typescript
// Correct
title?.type === "title" ? title.title[0]?.plain_text : undefined

// Incorrect - will cause runtime errors
title.title[0].plain_text
```

Use optional chaining (`?.`) and fallbacks for all Notion API responses.

## Path Aliases

TypeScript path mappings (configured in `tsconfig.json`):
```typescript
@/components/*  → components/*
@/data/*        → data/*
@/layouts/*     → layouts/*
@/lib/*         → lib/*
@/css/*         → css/*
@/scripts/*     → scripts/*
```

## Project-Specific Patterns

### SEO & Metadata
- Site metadata: `lib/siteMetadata.ts`
- Page wrapper: `components/Container.tsx` (applies SEO meta tags)
- Dynamic sitemap: `pages/sitemap.xml.tsx` (24-hour cache)
- Dynamic robots.txt: `pages/robots.tsx`

### Performance Monitoring
- `components/PerformanceMonitor.tsx` tracks Web Vitals (CLS, INP, FCP, LCP, TTFB)
- Uses `web-vitals` library (import from 'web-vitals', not 'next/dist/build/web-vitals')
- Image optimization: `components/OptimizedImage.tsx` with srcSet generation

### Security
Security headers configured in `next.config.js`:
- Content Security Policy (CSP)
- Referrer Policy
- X-Frame-Options
- Strict Transport Security
- Permissions Policy

### Font Loading
Custom fonts loaded via `lib/fonts.ts` and preloaded in `pages/_app.tsx` for optimal performance.

## Key Files Reference

- `lib/notion.ts`: Notion API integration and data transformation
- `lib/notionCache.ts`: File-based caching implementation
- `components/ContentBlocks.tsx`: Block rendering orchestration
- `pages/posts/[slug].tsx`: Blog post page with SSG
- `next.config.js`: Security headers, image optimization, bundle config
- `lib/siteMetadata.ts`: Site-wide configuration and metadata

## Development Notes

- Console logs show "**Notion API Called**" for debugging API requests
- Cache system prevents API rate limiting during builds
- TypeScript strict mode is disabled (`strict: false` in tsconfig.json)
- Production build removes console logs automatically
