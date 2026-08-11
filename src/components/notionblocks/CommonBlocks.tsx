import { outfit, jetbrainsMono } from "@/lib/fonts"
import { getSafeLinkUrl } from "@/lib/urls"

export const Heading = ({ text, level, id }) => {
  switch (level) {
    case "heading_1":
      return (
        <h2 className={`mb-4 mt-5 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 font-sans transition-colors ${outfit.className}`}>
          <SpanText text={text} id={id} />
        </h2>
      )
    case "heading_2":
      return (
        <h3 className={`mb-3 mt-5 text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 font-sans transition-colors ${outfit.className}`}>
          <SpanText text={text} id={id} />
        </h3>
      )
    case "heading_3":
      return (
        <h4 className={`mb-2 mt-4 text-base md:text-lg lg:text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 font-sans transition-colors ${outfit.className}`}>
          <SpanText text={text} id={id} />
        </h4>
      )
    default:
      return null
  }
}

export const SpanText = ({ text, id }) => {
  if (!text) return null
  const keyPrefix = id === undefined || id === null ? "rich-text" : String(id)

  return text.map((value, i) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value
    const safeHref = text.link ? getSafeLinkUrl(text.link.url) : null

    return (
      <span
        key={`${keyPrefix}-${i}`}
        className={[
          bold ? "font-semibold" : "",
          code ? `mx-1 rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 font-mono text-sm text-gray-800 dark:text-gray-200 ${jetbrainsMono.className}` : "",
          italic ? "italic" : "",
          strikethrough ? "line-through" : "",
          underline ? "underline decoration-2 underline-offset-2" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={color !== "default" ? { color } : {}}
      >
        {safeHref ? (
          <a
            href={safeHref}
            className="text-blue-600 dark:text-blue-400 underline decoration-2 underline-offset-2 hover:text-blue-800 dark:hover:text-blue-300 hover:decoration-blue-800 dark:hover:decoration-blue-300 transition-colors"
          >
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    )
  })
}

export const ListItem = ({ value, id, clazz = null, children = null }) => {
  return (
    <li className={`mb-1 ${clazz || ""}`} key={id}>
      <SpanText text={value.rich_text} id={id + "_span"} />
      {children}
    </li>
  )
}

export const Text = ({ text, id }) => {
  return (
    <p className="mb-4 leading-7 text-gray-700 dark:text-gray-300 text-base transition-colors">
      <SpanText text={text} id={id} />
    </p>
  )
}
