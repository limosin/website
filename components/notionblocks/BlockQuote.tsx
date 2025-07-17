import { SpanText } from "@/components/notionblocks/CommonBlocks"

export const BlockQuote = ({ value, id }) => {
  return (
    <div className="my-4 w-full">
      <div className="group relative overflow-hidden rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-800 dark:via-gray-800/80 dark:to-gray-700/40 p-4 shadow-md transition-all duration-500 hover:shadow-lg hover:scale-[1.001]">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        {/* Decorative border accent */}
        <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 rounded-r-full"></div>

        <blockquote className="relative">
          {/* Enhanced quote icon */}
          <div className="absolute -left-0.5 -top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 shadow-sm">
            <svg className="h-4 w-4 text-blue-600/80 dark:text-blue-400/80" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
            </svg>
          </div>

          <div className="relative pl-10">
            <div className="space-y-2">
              <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 font-medium transition-colors">
                <SpanText text={value.rich_text} id={id + "_span"} />
              </p>

              {/* Subtle bottom accent */}
              <div className="flex justify-end">
                <div className="h-0.5 w-12 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-500 dark:to-purple-500 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </blockquote>

        {/* Decorative elements */}
        <div className="absolute bottom-2 right-2 opacity-10 dark:opacity-20">
          <svg className="h-6 w-6 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-4v-10h10z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
