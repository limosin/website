import Link from "next/link"
import BlogLayout from "@/layouts/BlogLayout"
import { getNotionPageWithBlocks, getNotionBlockChildren, getAllPublishedBlogPosts } from "@/lib/notion"
import { RenderBlocks } from "@/components/ContentBlocks"
import { outfit } from "@/lib/fonts"

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
      <div className="w-full max-w-4xl mx-auto mb-8">
        <Link href="/" className={`text-sm text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 transition-colors ${outfit.className}`}>
          ← Back to Blog
        </Link>
      </div>

      {/* Header */}
      <div className="w-full max-w-4xl mx-auto text-center mb-4 md:mb-8">
        <div className={`mb-3 text-sm font-medium text-gray-500 dark:text-gray-400 ${outfit.className}`}>{date}</div>

        <h1 className={`mb-4 text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 ${outfit.className}`}>{title}</h1>

        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <span key={tag.id} className={`px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase tracking-wider ${outfit.className}`}>
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl mx-auto prose dark:prose-invert">
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
