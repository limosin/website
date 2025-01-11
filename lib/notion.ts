import { Client } from "@notionhq/client"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

const notion: Client = new Client({
  auth: process.env.NOTION_API_TOKEN,
})

export const getParsedBlogTableData = async (databaseId: string) => {
  const notionData: Array<PageObjectResponse> = await fetchDatabaseFromNotionUsingId(databaseId)
  return notionData.map((item: PageObjectResponse) => {
    const { id, cover, properties } = item
    const { title, date, description, tags, slug } = properties
    return {
      id,
      cover: cover.type === "external" ? cover.external?.url : undefined,
      title: title.type === "title" ? title.title[0].plain_text : undefined,
      date: date.type === "date" ? date.date.start : undefined,
      description: description.type === "rich_text" ? description.rich_text[0].plain_text : undefined,
      tags: tags.type === "formula" && tags.formula.type === "string" ? tags.formula?.string.split(",").map((tag) => tag.trim()) : undefined,
      slug: slug.type === "rich_text" ? slug.rich_text[0].plain_text : undefined,
    }
  })
}

export const fetchDatabaseFromNotionUsingId = async (databaseId: string): Promise<Array<PageObjectResponse>> => {
  console.log("**Notion API Called**")
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "stage",
      select: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  })
  return response.results.filter((obj): obj is PageObjectResponse => (obj as PageObjectResponse).properties !== undefined)
}

export const fetchPageFromNotionDbUsingSlug = async (slug: string, databaseId: string): Promise<PageObjectResponse> => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "stage",
          select: {
            equals: "Published",
          },
        },
        {
          property: "slug",
          rich_text: {
            equals: slug,
          },
        },
      ],
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  })
  return response.results[0] as PageObjectResponse
}

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

export const getBlocks = async (blockId: string) => {
  const blocks = []
  let cursor = undefined
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    })
    blocks.push(...results)
    if (!next_cursor) {
      break
    }
    cursor = next_cursor
  }
  return blocks
}
