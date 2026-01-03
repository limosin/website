import { SpanText } from "@/components/notionblocks/CommonBlocks"

export const BlockQuote = ({ value, id }) => {
  return (
    <div className="my-8 w-full">
      <blockquote className="relative border-l-4 border-blue-500 dark:border-blue-400 bg-gray-50 dark:bg-gray-800/50 pl-6 pr-4 py-4 rounded-r-lg transition-colors">
        {/* Quote icon */}
        <div className="absolute -left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-400 shadow-sm">
          <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
          </svg>
        </div>

        <div className="leading-7 text-gray-700 dark:text-gray-300 italic text-base">
          <SpanText text={value.rich_text} id={id + "_span"} />
        </div>
      </blockquote>
    </div>
  )
}
