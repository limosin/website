import { outfit } from "@/lib/fonts"
import { getSafeWebUrl } from "@/lib/urls"

interface BookmarkValue {
  url?: string
  caption?: Array<{ plain_text?: string }>
}

interface BookmarkProps {
  id: string
  value: BookmarkValue
}

export const Bookmark = ({ id, value }: BookmarkProps) => {
  const url = getSafeWebUrl(value.url)

  if (!url) {
    return (
      <div id={id} className={`rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200 ${outfit.className}`}>
        Bookmark unavailable
      </div>
    )
  }

  const caption = value.caption
    ?.map((item) => item.plain_text?.trim())
    .filter(Boolean)
    .join(" ")
  const label = caption || `Visit ${url.hostname}`

  return (
    <a
      id={id}
      href={url.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:shadow-gray-900/20 dark:hover:border-gray-500 dark:hover:bg-gray-800/50 ${outfit.className}`}
      aria-label={`${label} (opens in a new tab)`}
    >
      <span className="flex min-h-20 items-center gap-4 p-4">
        <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full border border-gray-300 text-lg text-gray-600 dark:border-gray-600 dark:text-gray-300">
          ↗
        </span>
        <span className="min-w-0 flex-1">
          <strong className="block text-sm font-medium text-gray-900 dark:text-gray-100">{label}</strong>
          <span className="mt-1 block truncate font-mono text-xs text-gray-500 dark:text-gray-400">{url.hostname}</span>
        </span>
        <span aria-hidden="true" className="text-gray-400 transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </a>
  )
}
