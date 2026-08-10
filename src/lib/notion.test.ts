import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { describe, expect, it } from "vitest"

import { transformNotionPageToBlogPost } from "./notion"

const createPage = (overrides: Record<string, unknown> = {}): PageObjectResponse =>
  ({
    object: "page",
    id: "page-id",
    created_time: "2026-08-10T00:00:00.000Z",
    last_edited_time: "2026-08-10T00:00:00.000Z",
    created_by: { object: "user", id: "user-id" },
    last_edited_by: { object: "user", id: "user-id" },
    cover: { type: "external", external: { url: "https://images.example.com/cover.png" } },
    icon: null,
    parent: { type: "data_source_id", data_source_id: "database-id", database_id: "database-id" },
    archived: false,
    in_trash: false,
    is_locked: false,
    properties: {
      title: {
        id: "title",
        type: "title",
        title: [{ type: "text", text: { content: "A typed post", link: null }, annotations: {}, plain_text: "A typed post", href: null }],
      },
      date: { id: "date", type: "date", date: { start: "2026-08-10", end: null, time_zone: null } },
      description: {
        id: "description",
        type: "rich_text",
        rich_text: [{ type: "text", text: { content: "Description", link: null }, annotations: {}, plain_text: "Description", href: null }],
      },
      tags: { id: "tags", type: "formula", formula: { type: "string", string: "Systems, Testing" } },
      slug: {
        id: "slug",
        type: "rich_text",
        rich_text: [{ type: "text", text: { content: "typed-post", link: null }, annotations: {}, plain_text: "typed-post", href: null }],
      },
    },
    url: "https://www.notion.so/page-id",
    public_url: null,
    ...overrides,
  }) as unknown as PageObjectResponse

describe("transformNotionPageToBlogPost", () => {
  it("normalizes a valid Notion page", () => {
    expect(transformNotionPageToBlogPost(createPage())).toEqual({
      id: "page-id",
      cover: "https://images.example.com/cover.png",
      title: "A typed post",
      date: "2026-08-10",
      description: "Description",
      tags: ["Systems", "Testing"],
      slug: "typed-post",
    })
  })

  it("rejects pages without required routing metadata", () => {
    const page = createPage()
    page.properties.slug = { id: "slug", type: "rich_text", rich_text: [] }
    expect(transformNotionPageToBlogPost(page)).toBeNull()
  })
})
