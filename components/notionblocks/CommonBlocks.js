export const Heading = ({ text, level }) => {
  switch (level) {
    case 'heading_1':
      return (
        <h1 className="my-2 text-3xl font-bold tracking-tight text-black md:text-5xl">
          <SpanText text={text} />
        </h1>
      )
    case 'heading_2':
      return (
        <h2 className="my-2 text-2xl font-bold tracking-tight text-black md:text-3xl">
          <SpanText text={text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3 className="my-2 text-lg font-bold tracking-tight text-black md:text-xl">
          <SpanText text={text} />
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
          bold ? 'font-bold' : '',
          code ? 'rounded-md bg-gray-100 p-1 font-mono text-sm' : '',
          italic ? 'italic' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline' : '',
        ]
          .join(' ')
          .trim()}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? (
          <a href={text.link.url} className="underline">
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
    <li className={clazz}>
      <SpanText text={value.rich_text} id={id} />
    </li>
  )
}

export const Text = ({ text, id }) => {
  return (
    <p className="mb-4 text-gray-700">
      <SpanText text={text} id={id} />
    </p>
  )
}
