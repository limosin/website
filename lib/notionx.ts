import { NotionAPI } from "notion-client"
import { type ExtendedRecordMap, type SearchParams, type SearchResults } from "notion-types"

const notionx = new NotionAPI({
  activeUser: process.env.NOTION_PRIVATE_USER_ID,
  authToken: process.env.NOTION_PRIVATE_TOKEN,
})

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  return await notionx.getPage(pageId)
}

export async function search(params: SearchParams): Promise<SearchResults> {
  if ("search" in notionx) {
    return notionx.search(params)
  } else {
    throw new Error("Notion API does not support search")
  }
}
