import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_API_TOKEN,
})

export const getParsedBlogTableData = async (databaseId) => {
  const notionData = await getNotionData(databaseId)
  const parsedData = notionData.map((item) => {
    const { id, cover, properties } = item
    const { title, date, description, tags, slug } = properties
    return {
      id,
      cover: cover ? cover.external.url : null,
      title: title.title[0].plain_text,
      date: date.date.start,
      description: description.rich_text[0].plain_text,
      tags: tags.formula.string.split(',').map((tag) => tag.trim()),
      slug: slug.rich_text[0].plain_text,
    }
  })
  return parsedData
}

export const getNotionData = async (databaseId) => {
  console.log('**Notion API Called**')
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'stage',
      select: {
        equals: 'Published',
      },
    },
    sorts: [
      {
        property: 'date',
        direction: 'descending',
      },
    ],
  })
  return response.results
}

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

export const getBlocks = async (blockId) => {
  const blocks = []
  let cursor
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
