import { SpanText } from "@/components/notionblocks/CommonBlocks"

export const BlockQuote = ({ value, id }) => {
  return (
    <div className="my-6 w-full">
      <blockquote className="border-l-2 py-1 pl-4 text-base italic leading-7 md:text-[1.05rem]" style={{ borderColor: "var(--atlas-blue)", color: "var(--atlas-ink-soft)" }}>
        <SpanText text={value.rich_text} id={id + "_span"} />
      </blockquote>
    </div>
  )
}
