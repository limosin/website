import BlogLayout from "@/layouts/BlogLayout"
import { getNotionPageWithBlocks, getNotionBlockChildren, getAllPublishedBlogPosts } from "@/lib/notion"
import { RenderBlocks } from "@/components/ContentBlocks"
import { inter } from "@/lib/fonts"

const databaseId = process.env.NOTION_BLOG_DATABASE_ID

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <div />
  }
  return (
    <BlogLayout data={page}>
      <div className="my-2 inline-flex rounded p-1 px-2">
        <span className="my-1 pl-0.5 text-sm text-gray-400 dark:text-amber-200 transition-colors">
          {new Date(page.created_time).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>

      <h1 className={`mb-5 text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-black dark:text-white font-sans transition-colors ${inter.className}`}>
        {page.properties.title.title[0].plain_text}
      </h1>

      <RenderBlocks blocks={blocks} />
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
