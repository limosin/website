import { Bookmark } from '@/components/notionblocks/Bookmark'
import { Heading, SpanText, Text } from '@/components/notionblocks/CommonBlocks'
import { Code } from '@/components/notionblocks/Code'
import { BulletedList, NumberedList } from '@/components/notionblocks/Lists'

export const RenderBlocks = ({ blocks }) => {
  const renderedBlocks = []
  let i = 0
  while (i < blocks.length) {
    const [render, index] = RenderBlocksHelper(blocks, i)
    i = index + 1
    renderedBlocks.push(render)
  }
  return renderedBlocks
}

function RenderBlocksHelper(blocks, index) {
  const { type, id } = blocks[index]
  let output
  if (type === 'bulleted_list_item') {
    const item = BulletedList(blocks, index, id)
    output = item.output
    index = item.index
  } else if (type === 'numbered_list_item') {
    const item = NumberedList(blocks, index, id)
    output = item.output
    index = item.index
  }
  if (output) {
    return [output, index]
  }
  const value = blocks[index][type]
  switch (type) {
    case 'divider':
      output = <hr className="my-3 w-full border md:my-5" key={id} />
      break

    case 'paragraph':
      output = <Text text={value.rich_text} id={id} key={id} />
      break

    case 'heading_1':
      output = <Heading text={value.rich_text} id={id} level={type} key={id} />
      break

    case 'heading_2':
      output = <Heading text={value.rich_text} id={id} level={type} key={id} />
      break

    case 'heading_3':
      output = <Heading text={value.rich_text} id={id} level={type} key={id} />
      break

    case 'quote':
      output = (
        <blockquote key={id} className="border-l-2 border-l-black pl-4">
          <SpanText id={id} text={value.rich_text} />
        </blockquote>
      )
      break

    case 'to_do':
      output = <ToDo key={id} value={value} />
      break

    case 'toggle':
      output = <Toggle key={id} value={value} />
      break

    case 'image': {
      const imageSrc = value.type === 'external' ? value.external.url : value.file.url
      const caption = value.caption.length ? value.caption[0].plain_text : ''
      output = (
        <figure key={id} className="my-3 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={caption} src={imageSrc} />
          {caption && <figcaption className="mt-2 text-sm text-gray-600">{caption}</figcaption>}
        </figure>
      )
      break
    }

    case 'callout':
      output = <Callout key={id} value={value} />
      break

    case 'bookmark':
      output = <Bookmark key={id} value={value} />
      break

    case 'code':
      output = <Code key={id} value={value} />
      break

    default:
      output = `Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`
  }
  return [output, index]
}

const ToDo = ({ id, value }) => {
  return (
    <div>
      <label htmlFor={id}>
        <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
        <SpanText text={value.rich_text} />
      </label>
    </div>
  )
}

const Toggle = ({ value }) => {
  return (
    <details>
      <summary className="cursor-pointer">{value.rich_text[0].text.content}</summary>
      {value.children?.map((block) => {
        if (block.type === 'paragraph') {
          return <Text key={block.id} text={block.paragraph.rich_text} id={block.id} />
        }
      })}
    </details>
  )
}

const Callout = ({ id, value }) => {
  return (
    <div className="my-2 flex flex-row rounded-md bg-gray-100 py-4 px-2">
      {<div className="items-center justify-center px-2">{value.icon?.emoji}</div>}
      <div className="pl-2">
        <SpanText text={value.rich_text} id={id} />
      </div>
    </div>
  )
}
