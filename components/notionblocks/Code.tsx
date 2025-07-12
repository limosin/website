import React, { useEffect, useRef, useState } from "react"
import "prismjs/themes/prism.css"

export const Code = ({ value }) => {
  const code_class = `language-${value.language}`
  const code = value.rich_text[0].plain_text
  const codeBlock = useRef(null)
  const [Prism, setPrism] = useState(null)

  useEffect(() => {
    // Dynamically import Prism and language components
    const loadPrism = async () => {
      const PrismModule = await import("prismjs")

      // Load language components as needed
      if (value.language === "javascript" || value.language === "js") {
        await import("prismjs/components/prism-javascript.min.js")
      } else if (value.language === "typescript" || value.language === "ts") {
        await import("prismjs/components/prism-typescript.min.js")
      } else if (value.language === "jsx") {
        await import("prismjs/components/prism-jsx.min.js")
      } else if (value.language === "tsx") {
        await import("prismjs/components/prism-tsx.min.js")
      } else if (value.language === "python") {
        await import("prismjs/components/prism-python.min.js")
      } else if (value.language === "css") {
        await import("prismjs/components/prism-css.min.js")
      } else if (value.language === "json") {
        await import("prismjs/components/prism-json.min.js")
      } else if (value.language === "yaml") {
        await import("prismjs/components/prism-yaml.min.js")
      }

      setPrism(PrismModule.default)
    }

    loadPrism()
  }, [value.language])

  useEffect(() => {
    if (codeBlock.current && Prism) {
      Prism.highlightElement(codeBlock.current)
    }
  }, [Prism])

  return (
    <pre className="w-full !text-sm">
      <code ref={codeBlock} className={code_class}>
        {code}
      </code>
    </pre>
  )
}
