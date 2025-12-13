import React, { lazy, Suspense } from "react"
import { Heading, SpanText, Text } from "@/components/notionblocks/CommonBlocks"
import { Code } from "@/components/notionblocks/Code"
import { BulletedList, NumberedList } from "@/components/notionblocks/Lists"
import { BlockQuote } from "@/components/notionblocks/BlockQuote"
import { Video } from "@/components/notionblocks/Video"
import { Callout } from "@/components/notionblocks/Callout"
import { NotionImage } from "@/components/notionblocks/Image"

// Lazy load heavy components
const Bookmark = lazy(() => import("@/components/notionblocks/Bookmark").then((module) => ({ default: module.Bookmark })))
const Table = lazy(() => import("@/components/notionblocks/Table").then((module) => ({ default: module.Table })))

export const RenderBlocks = ({ blocks }) => {
  const renderedBlocks = []
  let i = 0
  while (i < blocks.length) {
    const [render, index] = RenderBlocksHelper(blocks, i)
    i = index + 1
    renderedBlocks.push(render)
  }
  // convert renderedBlocks to a single React element
  return <>{renderedBlocks}</>
}

function RenderBlocksHelper(blocks, index) {
  const { type, id } = blocks[index]
  let output
  if (type === "bulleted_list_item") {
    const item = BulletedList(blocks, index, id)
    output = item.output
    index = item.index
  } else if (type === "numbered_list_item") {
    const item = NumberedList(blocks, index, id)
    output = item.output
    index = item.index
  }
  if (output) {
    return [output, index]
  }
  const value = blocks[index][type]
  switch (type) {
    case "divider":
      output = <hr className="my-8 border-gray-300 dark:border-gray-600" key={id} />
      break

    case "paragraph":
      output = <Text text={value.rich_text} id={id} key={index} />
      break

    case "heading_1":
      output = <Heading text={value.rich_text} id={id} level={type} key={index} />
      break

    case "heading_2":
      output = <Heading text={value.rich_text} id={id} level={type} key={index} />
      break

    case "heading_3":
      output = <Heading text={value.rich_text} id={id} level={type} key={index} />
      break

    case "quote":
      output = <BlockQuote id={id} value={value} key={index} />
      //   (
      //   <blockquote key={index} className="my-2 border-l-2 border-l-black pl-4">
      //     <SpanText id={id} text={value.rich_text} />
      //   </blockquote>
      // )
      break

    case "to_do":
      output = <ToDo id={id} value={value} key={index} />
      break

    case "toggle":
      output = <Toggle key={id} value={value} />
      break

    case "image": {
      output = <NotionImage key={id} id={id} value={value} />
      break
    }

    case "video": {
      const videoSrc = value.type === "external" ? value.external.url : value.file.url
      const caption = value.caption.length ? value.caption[0].plain_text : ""
      // render the video as iframe
      output = (
        <figure key={id} className="my-8 w-full">
          <div className="mx-auto max-w-3xl">
            <Video url={videoSrc} />
          </div>
          {caption && <figcaption className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400">{caption}</figcaption>}
        </figure>
      )
      break
    }

    case "callout":
      output = (
        <Callout id={id} value={value} key={index}>
          {value.children && <RenderBlocks blocks={value.children} />}
        </Callout>
      )
      break

    case "bookmark":
      output = (
        <div key={id} className="my-6 w-full">
          <div className="mx-auto max-w-3xl">
            <Suspense fallback={<div className="h-40 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"></div>}>
              <Bookmark id={id} value={value} key={index} />
            </Suspense>
          </div>
        </div>
      )
      break

    case "code":
      output = <Code key={id} value={value} />
      break

    case "table":
      output = (
        <div key={id} className="my-6 w-full">
          <div className="mx-auto max-w-4xl">
            <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"></div>}>
              <Table id={id} value={value} />
            </Suspense>
          </div>
        </div>
      )
      break

    default:
      output = `Unsupported block (${type === "unsupported" ? "unsupported by Notion API" : type})`
  }
  return [output, index]
}

const ToDo = ({ id, value }) => {
  if (value == null) {
    return <></>
  }
  return (
    <div className="my-3 flex items-center space-x-3">
      <input type="checkbox" id={id} defaultChecked={value.checked} className="size-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700" />
      <label htmlFor={id} className="text-gray-700 dark:text-gray-300">
        <SpanText text={value.rich_text} id={id} />
      </label>
    </div>
  )
}

const Toggle = ({ value }) => {
  return (
    <details className="my-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <summary className="cursor-pointer p-4 font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">{value.rich_text[0].text.content}</summary>
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        {value.children?.map((block) => {
          if (block.type === "paragraph") {
            return <Text key={block.id} text={block.paragraph.rich_text} id={block.id} />
          }
        })}
      </div>
    </details>
  )
}
