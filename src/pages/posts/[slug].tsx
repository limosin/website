import Link from "next/link"
import BlogLayout from "@/layouts/BlogLayout"
import { getNotionPageWithBlocks, getNotionBlockChildren, getAllPublishedBlogPosts } from "@/lib/notion"
import { RenderBlocks } from "@/components/ContentBlocks"
import { outfit, manrope } from "@/lib/fonts"

const databaseId = process.env.NOTION_BLOG_DATABASE_ID

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <div />
  }

  const title = page.properties.title.title[0]?.plain_text || "Untitled"
  const date = new Date(page.created_time).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  // Notion tags might be in a multiselect property called 'Tags' or similar
  // Adjust based on your actual Notion schema if needed.
  // Assuming 'tags' property name mapping from siteMetadata/Notion utils or direct property access
  // The 'page' object is raw Notion response usually.
  // Let's assume standard 'Tags' multiselect for now or try to find it safely.
  const tags = page.properties.Tags?.multi_select || []

  return (
    <BlogLayout data={page}>
      {/* Back Link */}
      <div className="w-full max-w-3xl mx-auto mb-12 animate-fade-in-up stagger-1">
        <Link 
          href="/" 
          className={`group flex items-center text-sm font-medium text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 transition-colors ${outfit.className}`}
        >
          <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
      </div>

      {/* Header */}
      <div className="w-full max-w-3xl mx-auto mb-4 md:mb-8">
        <div className="flex items-center gap-4 mb-6 animate-fade-in-up stagger-2">
           <time className={`text-sm font-medium text-gray-500 dark:text-gray-400 ${manrope.className}`}>
            {date}
          </time>
          <div className="h-px w-12 bg-gray-200 dark:bg-gray-800" />
           {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag.id} className={`text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 ${outfit.className}`}>
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${outfit.className} animate-gradient-text`}>
          {title}
        </h1>

        {/* <div className="w-full h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800 animate-fade-in-up stagger-3" /> */}
      </div>

      {/* Content */}
      <div className={`w-full max-w-3xl mx-auto prose dark:prose-invert prose-lg animate-fade-in-up stagger-4 ${manrope.className}`}>
        <RenderBlocks blocks={blocks} />
      </div>
    </BlogLayout>
  )
}

export const getStaticPaths = async () => {
  const database = await getAllPublishedBlogPosts(process.env.NOTION_BLOG_DATABASE_ID)
  return {
    paths: database.map((page) => ({
      params: {
        slug: page.slug,
      },
    })),
    fallback: "blocking", // Enable ISR for new posts
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params
  const database = await getAllPublishedBlogPosts(databaseId)
  const filter = database.filter((blog) => blog.slug === slug)
  if (filter.length === 0) {
    return {
      notFound: true,
    }
  }
  // Use the combined function to fetch both page and blocks in one go
  const { page, blocks } = await getNotionPageWithBlocks(filter[0].id)

  const childrenBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getNotionBlockChildren(block.id, filter[0].id), // Pass pageId as parentId for better cache organization
        }
      })
  )

  const blocksWithChildren = blocks.map((block) => {
    if (block.has_children) {
      block[block.type].children = childrenBlocks.find((x) => x.id === block.id).children
    }
    return block
  })
  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    // Revalidate every 6 hours in production
    revalidate: process.env.NODE_ENV === "production" ? 21600 : 1,
  }
}
