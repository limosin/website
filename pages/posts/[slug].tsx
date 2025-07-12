import BlogLayout from "@/layouts/BlogLayout"
import { getPage, getBlocks, getParsedBlogTableData } from "@/lib/notion"
import { RenderBlocks } from "@/components/ContentBlocks"
import { nunito } from "@/lib/fonts"
import CalendarIcon from "public/resources/calendar.svg"
import Image from "next/image"

const databaseId = process.env.NOTION_BLOG_DATABASE_ID

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <div />
  }
  return (
    <BlogLayout data={page}>
      <div className="my-2 inline-flex rounded border border-solid border-amber-400 bg-amber-50 p-1 px-2">
        <Image src={CalendarIcon} alt="Date" width="20" className="mr-2"></Image>
        <span className="my-1 pl-0.5 text-sm text-gray-700">
          {new Date(page.created_time).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>

      <h1 className={`mb-5 text-3xl font-bold tracking-tight text-black md:text-5xl ${nunito.className}`}>{page.properties.title.title[0].plain_text}</h1>

      <RenderBlocks blocks={blocks} />
    </BlogLayout>
  )
}

export const getStaticPaths = async () => {
  const database = await getParsedBlogTableData(process.env.NOTION_BLOG_DATABASE_ID)
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
  const database = await getParsedBlogTableData(databaseId)
  const filter = database.filter((blog) => blog.slug === slug)
  const page = await getPage(filter[0].id)
  const blocks = await getBlocks(filter[0].id)

  const childrenBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
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
