import { ListItem } from "@/components/notionblocks/CommonBlocks"

export const NumberedList = (blocks, index, parentId, renderChildren) => {
  const numberedList = []
  while (index < blocks.length && blocks[index].type === "numbered_list_item") {
    const id = blocks[index].id
    const value = blocks[index]["numbered_list_item"]
    numberedList.push(
      <ListItem value={value} id={id} key={id}>
        {value.children?.length ? renderChildren(value.children) : null}
      </ListItem>
    )
    index++
  }
  index--
  const output = (
    <ol className="my-3 list-outside list-decimal space-y-1 pl-6 leading-normal text-gray-900 dark:text-gray-100 transition-colors text-base" key={parentId}>
      {numberedList}
    </ol>
  )
  return {
    output,
    index,
  }
}

export const BulletedList = (blocks, index, parentId, renderChildren) => {
  const bulletedList = []
  while (index < blocks.length && blocks[index].type === "bulleted_list_item") {
    const id = blocks[index].id
    const value = blocks[index]["bulleted_list_item"]
    bulletedList.push(
      <ListItem value={value} id={id} key={id}>
        {value.children?.length ? renderChildren(value.children) : null}
      </ListItem>
    )
    index++
  }
  index--
  const output = (
    <ul className="my-3 list-outside list-disc space-y-1 pl-6 leading-normal text-gray-900 dark:text-gray-100 transition-colors text-base" key={parentId}>
      {bulletedList}
    </ul>
  )
  return {
    output,
    index,
  }
}
