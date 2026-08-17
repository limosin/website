import React, { useEffect, useRef, useState } from "react"
import { jetbrainsMono } from "@/lib/fonts"

export const Code = ({ value }) => {
  const language = value.language || "text"
  const code_class = `language-${language}`
  const code = value.rich_text[0]?.plain_text || ""
  const codeBlock = useRef(null)
  const [Prism, setPrism] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  useEffect(() => {
    // Dynamically import Prism and language components
    const loadPrism = async () => {
      try {
        const PrismModule = await import("prismjs")

        // Load language components as needed
        switch (language) {
          case "javascript":
          case "js":
            await import("prismjs/components/prism-javascript.min.js")
            break
          case "typescript":
          case "ts":
            await import("prismjs/components/prism-typescript.min.js")
            break
          case "jsx":
            await import("prismjs/components/prism-jsx.min.js")
            break
          case "tsx":
            await import("prismjs/components/prism-tsx.min.js")
            break
          case "python":
          case "py":
            await import("prismjs/components/prism-python.min.js")
            break
          case "css":
            await import("prismjs/components/prism-css.min.js")
            break
          case "json":
            await import("prismjs/components/prism-json.min.js")
            break
          case "yaml":
          case "yml":
            await import("prismjs/components/prism-yaml.min.js")
            break
          case "bash":
          case "shell":
            await import("prismjs/components/prism-bash.min.js")
            break
          case "sql":
            await import("prismjs/components/prism-sql.min.js")
            break
          case "html":
            await import("prismjs/components/prism-markup.min.js")
            break
          case "markdown":
          case "md":
            await import("prismjs/components/prism-markdown.min.js")
            break
          case "go":
            await import("prismjs/components/prism-go.min.js")
            break
          case "rust":
            await import("prismjs/components/prism-rust.min.js")
            break
          case "php":
            await import("prismjs/components/prism-php.min.js")
            break
          case "java":
            await import("prismjs/components/prism-java.min.js")
            break
          case "c":
            await import("prismjs/components/prism-c.min.js")
            break
          case "cpp":
          case "c++":
            await import("prismjs/components/prism-cpp.min.js")
            break
          case "csharp":
          case "cs":
            await import("prismjs/components/prism-csharp.min.js")
            break
          case "ruby":
            await import("prismjs/components/prism-ruby.min.js")
            break
          case "swift":
            await import("prismjs/components/prism-swift.min.js")
            break
          case "kotlin":
            await import("prismjs/components/prism-kotlin.min.js")
            break
          case "dart":
            await import("prismjs/components/prism-dart.min.js")
            break
          case "dockerfile":
            await import("prismjs/components/prism-docker.min.js")
            break
          case "nginx":
            await import("prismjs/components/prism-nginx.min.js")
            break
          case "graphql":
            await import("prismjs/components/prism-graphql.min.js")
            break
          default:
            // For unknown languages, don't load any specific component
            break
        }

        setPrism(PrismModule.default)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load Prism:", error)
        setIsLoading(false)
      }
    }

    loadPrism()
  }, [language])

  useEffect(() => {
    if (codeBlock.current && Prism && !isLoading && language !== undefined && language.length > 0) {
      // Clear any existing highlighting
      codeBlock.current.classList.remove("language-" + language)
      codeBlock.current.classList.add("language-" + language)

      Prism.highlightElement(codeBlock.current)
    }
  }, [Prism, isLoading, language, code])

  if (!code.trim()) {
    return null
  }

  return (
    <figure className={`atlas-code ${jetbrainsMono.className}`}>
      <figcaption className="atlas-code__header">
        <div className="atlas-code__identity">
          <span className="atlas-code__mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="atlas-code__label">Code specimen</span>
          <span className="atlas-code__divider" aria-hidden="true" />
          <span className="atlas-code__language">{language === "text" ? "plain text" : language}</span>
        </div>

        <button type="button" onClick={handleCopy} className="atlas-code__copy" title={copied ? "Copied" : "Copy code"} aria-label={copied ? "Code copied" : "Copy code to clipboard"}>
          {copied ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="8" y="8" width="11" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </figcaption>

      <div className="atlas-code__body">
        <pre className="atlas-code__scroll">
          <code ref={codeBlock} className={`${code_class} ${jetbrainsMono.className}`}>
            {code}
          </code>
        </pre>

        {isLoading && (
          <div className="atlas-code__loading" role="status">
            <span aria-hidden="true" />
            Preparing syntax
          </div>
        )}
      </div>
    </figure>
  )
}
