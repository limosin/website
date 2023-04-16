import React, { useEffect, useRef } from "react"
import Prism from "prismjs"
import "prismjs/themes/prism.css"
import "prismjs/components/prism-clike.min.js"
import "prismjs/components/prism-css-extras.min.js"
import "prismjs/components/prism-css.min.js"
import "prismjs/components/prism-javascript.min.js"
import "prismjs/components/prism-js-extras.min.js"
import "prismjs/components/prism-json.min.js"
import "prismjs/components/prism-jsx.min.js"
import "prismjs/components/prism-tsx.min.js"
import "prismjs/components/prism-typescript.min.js"
import "prismjs/components/prism-java.min.js"
import "prismjs/components/prism-python.min.js"
import "prismjs/components/prism-yaml.min.js"
import "prismjs/components/prism-go.min.js"

export const Code = ({ value }) => {
  const language = value.language
  const code = value.rich_text[0].plain_text
  const codeBlock = useRef(null)

  useEffect(() => {
    if (codeBlock.current) {
      Prism.highlightElement(codeBlock.current)
    }
  }, [])

  return (
    <pre className="w-full !text-sm">
      <code ref={codeBlock} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  )
}
