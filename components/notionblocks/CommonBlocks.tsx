export const Heading = ({ text, level, id }) => {
  switch (level) {
    case "heading_1":
      return (
        <h1 className="mb-6 mt-8 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
          <SpanText text={text} id={id} />
        </h1>
      )
    case "heading_2":
      return (
        <h2 className="mb-4 mt-8 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          <SpanText text={text} id={id} />
        </h2>
      )
    case "heading_3":
      return (
        <h3 className="mb-3 mt-6 text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
          <SpanText text={text} id={id} />
        </h3>
      )
    default:
      return null
  }
}

export const SpanText = ({ text, id }) => {
  if (!text) return null
  return text.map((value, i) => {
    if (id === undefined || isNaN(id)) {
      id = Math.random().toString(36).substring(7)
    }
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value
    return (
      <span
        key={id + i}
        className={[
          bold ? "font-semibold" : "",
          code ? "mx-1 rounded-md bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800" : "",
          italic ? "italic" : "",
          strikethrough ? "line-through" : "",
          underline ? "underline decoration-2 underline-offset-2" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={color !== "default" ? { color } : {}}
      >
        {text.link ? (
          <a href={text.link.url} className="text-blue-600 underline decoration-2 underline-offset-2 hover:text-blue-800 hover:decoration-blue-800">
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    )
  })
}

export const ListItem = ({ value, id, clazz = null }) => {
  return (
    <li className={`mb-1 ${clazz || ""}`} key={id}>
      <SpanText text={value.rich_text} id={id + "_span"} />
    </li>
  )
}

export const Text = ({ text, id }) => {
  return (
    <p className="mb-4 leading-relaxed text-gray-700">
      <SpanText text={text} id={id} />
    </p>
  )
}
