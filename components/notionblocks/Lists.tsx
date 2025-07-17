import { ListItem } from "@/components/notionblocks/CommonBlocks"

export const NumberedList = (blocks, index, parentId) => {
  const numberedList = []
  while (index < blocks.length && blocks[index].type === "numbered_list_item") {
    const id = blocks[index].id
    numberedList.push(<ListItem value={blocks[index]["numbered_list_item"]} id={id} key={id} />)
    index++
  }
  index--
  const output = (
    <ol className="my-4 list-outside list-decimal space-y-1 pl-6 leading-relaxed text-gray-900 dark:text-gray-100 transition-colors" key={parentId}>
      {numberedList}
    </ol>
  )
  return {
    output,
    index,
  }
}

export const BulletedList = (blocks, index, parentId) => {
  const bulletedList = []
  while (index < blocks.length && blocks[index].type === "bulleted_list_item") {
    const id = blocks[index].id
    bulletedList.push(<ListItem value={blocks[index]["bulleted_list_item"]} id={id} key={id} />)
    index++
  }
  index--
  const output = (
    <ul className="my-4 list-outside list-disc space-y-1 pl-6 leading-relaxed text-gray-900 dark:text-gray-100 transition-colors" key={parentId}>
      {bulletedList}
    </ul>
  )
  return {
    output,
    index,
  }
}
