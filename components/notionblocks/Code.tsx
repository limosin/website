import React, { useEffect, useRef, useState } from "react"
import "prismjs/themes/prism-tomorrow.css"

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
    if (codeBlock.current && Prism && !isLoading) {
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
    <div className="my-6 w-full">
      <div className="mx-auto max-w-5xl">
        <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.005] code-block-glow">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 opacity-0 transition-opacity duration-500 group-hover:opacity-10 blur-sm"></div>

          {/* Language label with icon */}
          {language && language !== "text" && (
            <div className="relative border-b border-gray-700/50 bg-gradient-to-r from-gray-800 to-gray-750 px-6 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-300 uppercase tracking-wider">{language}</span>
                </div>

                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  className="group/copy flex items-center space-x-2 rounded-lg bg-gray-700/50 px-3 py-2 text-xs text-gray-300 transition-all duration-200 hover:bg-gray-600/70 hover:text-white hover:scale-105"
                  title={copied ? "Copied!" : "Copy code"}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`transition-all duration-200 ${copied ? "text-green-400 scale-110" : "text-gray-400 group-hover/copy:text-white"}`}
                  >
                    {copied ? (
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                      <>
                        <path
                          d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          opacity="0.5"
                          d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </>
                    )}
                  </svg>
                  <span className="font-medium">{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>
          )}

          {/* Code content with enhanced styling */}
          <div className="relative">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/3 to-purple-900/5 pointer-events-none"></div>
            
            {/* Additional inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/2 to-transparent pointer-events-none"></div>

            <pre className="relative overflow-x-auto p-6 text-sm leading-7 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500 bg-transparent">
              <code
                ref={codeBlock}
                className={`${code_class} block whitespace-pre text-gray-100 bg-transparent`}
                style={{
                  background: "transparent !important",
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Menlo, Consolas, "Liberation Mono", "Courier New", monospace',
                  fontSize: "0.9rem",
                  lineHeight: "1.75",
                }}
              >
                {code}
              </code>
            </pre>

            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
                <div className="flex items-center space-x-2 text-gray-400">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-blue-500"></div>
                  <span className="text-sm">Loading syntax highlighting...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom styles for enhanced Prism theme */}
      <style jsx>{`
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #6b7280;
        }

        .token.punctuation {
          color: #d1d5db;
        }

        .token.property,
        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #f87171;
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: #34d399;
        }

        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string {
          color: #60a5fa;
        }

        .token.atrule,
        .token.attr-value,
        .token.keyword {
          color: #a78bfa;
        }

        .token.function,
        .token.class-name {
          color: #fbbf24;
        }

        .token.regex,
        .token.important,
        .token.variable {
          color: #f472b6;
        }

        /* Override Prism theme background */
        pre,
        code {
          background: transparent !important;
        }

        pre[class*="language-"],
        code[class*="language-"] {
          background: transparent !important;
        }

        /* Ensure the glow effect is visible */
        .code-block-glow {
          position: relative;
        }

        .code-block-glow::before {
          content: '';
          position: absolute;
          inset: -1px;
          padding: 1px;
          background: linear-gradient(45deg, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05));
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .code-block-glow:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}
