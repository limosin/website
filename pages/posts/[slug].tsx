import { type ExtendedRecordMap } from "notion-types"

import { NotionPage } from "@/components/NotionPage"
import { previewImagesEnabled, rootDomain } from "config/config"
import * as notion from "@/lib/notionx"
import Container from "@/components/Container"
import { fetchPageFromNotionDbUsingSlug, getParsedBlogTableData } from "@/lib/notion"

const databaseId = process.env.NOTION_BLOG_DATABASE_ID

export const getStaticProps = async (context) => {
  const { slug } = context.params

  const post = await fetchPageFromNotionDbUsingSlug(slug, databaseId)
  const postId = post.id

  const recordMap = await notion.getPage(postId)

  return {
    props: {
      post,
      recordMap,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const database = await getParsedBlogTableData(process.env.NOTION_BLOG_DATABASE_ID)
  return {
    paths: database.map((page) => ({
      params: {
        slug: page.slug,
      },
    })),
    fallback: false,
  }
}

export default function Page({ post, recordMap }: { post: any; recordMap: ExtendedRecordMap }) {
  const postImage = post.properties.cover
  const postImageUrl = postImage?.type === "file" ? postImage.file.url : postImage?.external.url

  return (
    <Container
      title={post.properties.title.title[0].plain_text}
      description={post.properties.description.rich_text[0].plain_text}
      date={new Date(post.properties.date.date.start)}
      type="article"
      image={postImageUrl}
    >
      <NotionPage post={post} recordMap={recordMap} rootDomain={rootDomain} previewImagesEnabled={previewImagesEnabled} />
    </Container>
  )
}
