import { useEffect, useState } from "react"
import OptimizedImage from "../OptimizedImage"
import { inter } from "@/lib/fonts"

export const Bookmark = ({ id, value }) => {
  // Fetch the bookmark preview image using the url meta
  const [previewImage, setPreviewImage] = useState("")
  const [previewDesp, setPreviewDesp] = useState("")
  const [previewTitle, setPreviewTitle] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        setIsLoading(true)
        setHasError(false)

        const response = await fetch(`/api/cors?url=${encodeURIComponent(value.url)}`)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const html = await response.text()

        // Convert the html string to a document object
        const doc = new DOMParser().parseFromString(html, "text/html")

        const ogImageTag = extractImage(doc, value.url)
        const ogDescriptionTag = extractDescription(doc)
        const ogTitleTag = extractTitle(doc)

        setPreviewImage(ogImageTag || "")
        setPreviewDesp(ogDescriptionTag || "")
        setPreviewTitle(ogTitleTag || "")
      } catch (error) {
        console.warn("Failed to fetch bookmark preview:", error)
        setHasError(true)
        // Set fallback values
        setPreviewTitle(new URL(value.url).hostname)
        setPreviewDesp("")
        setPreviewImage("")
      } finally {
        setIsLoading(false)
      }
    }

    if (value.url) {
      fetchPreview()
    }
  }, [value.url])

  // Show skeleton while loading
  if (isLoading) {
    return showBookmarkSkeleton(id)
  }

  // Render the bookmark value with the preview image
  return showBookmark(value, id, previewTitle, previewDesp, previewImage, hasError)
}

const showBookmark = (value, id, previewTitle, previewDesp, previewImage, hasError = false) => {
  const hasImage = previewImage && previewImage !== "/logo.png"
  const displayTitle = previewTitle || (hasError ? `Visit ${new URL(value.url).hostname}` : "Untitled")
  const hostname = new URL(value.url).hostname
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=16`

  return (
    <a href={value.url} target="_blank" rel="noreferrer" className="block w-full" id={id}>
      <div
        className={`flex flex-col sm:flex-row overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300 ${hasImage ? "h-auto sm:h-24 md:h-28" : "h-auto"} ${inter.className}`}
      >
        {/* Content section */}
        <div className={`flex flex-col justify-between p-3 transition-colors hover:bg-gray-50 ${hasImage ? "w-full sm:w-3/5" : "w-full"} min-h-[80px] sm:min-h-0`}>
          <div className="flex-1 space-y-1">
            <p className="line-clamp-2 text-sm font-medium text-gray-900 leading-tight">{displayTitle}</p>
            {previewDesp && <p className="line-clamp-2 sm:line-clamp-3 text-xs leading-relaxed text-gray-600">{previewDesp}</p>}
            {hasError && <p className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Preview unavailable</p>}
          </div>
          <div className="mt-2 pt-1 border-t border-gray-100 flex-shrink-0">
            <div className="flex items-baseline space-x-1.5">
              <img
                src={faviconUrl}
                alt={`${hostname} favicon`}
                className="w-3 h-3 flex-shrink-0 object-contain inline-block"
                style={{ verticalAlign: "baseline" }}
                onError={(e) => {
                  // Replace with a fallback SVG globe icon
                  e.currentTarget.style.display = "none"
                  const fallbackIcon = e.currentTarget.nextElementSibling as HTMLElement
                  if (fallbackIcon && fallbackIcon.tagName.toLowerCase() === "svg") {
                    fallbackIcon.style.display = "inline-block"
                  }
                }}
              />
              <svg className="w-3 h-3 flex-shrink-0 text-gray-400 hidden" fill="currentColor" viewBox="0 0 20 20" style={{ verticalAlign: "baseline" }}>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs text-gray-500 font-mono break-all">{hostname}</span>
            </div>
          </div>
        </div>

        {/* Image section - only show if we have a valid image */}
        {hasImage && (
          <div className="relative w-full h-24 sm:w-2/5 sm:h-full flex-shrink-0 bg-gray-100">
            <OptimizedImage
              src={previewImage}
              alt={displayTitle}
              fill
              className="object-cover transition-transform duration-200 hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 40vw, 150px"
              style={{
                objectPosition: "center center",
              }}
              onError={(e) => {
                // Hide image container if image fails to load
                e.currentTarget.parentElement.style.display = "none"
              }}
            />
            {/* Overlay gradient for better text readability on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-200 hover:opacity-100"></div>
          </div>
        )}
      </div>
    </a>
  )
}

const showBookmarkSkeleton = (id) => {
  return (
    <div className="block w-full" id={id}>
      <div className={`flex flex-col sm:flex-row overflow-hidden rounded-lg border border-gray-200 h-auto sm:h-24 md:h-28 ${inter.className}`}>
        {/* Content skeleton */}
        <div className="flex w-full sm:w-3/5 animate-pulse flex-col justify-between p-3 min-h-[80px] sm:min-h-0">
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded-md bg-gray-200"></div>
            <div className="space-y-1">
              <div className="h-3 w-full rounded-md bg-gray-200"></div>
              <div className="h-3 w-4/5 rounded-md bg-gray-200"></div>
            </div>
          </div>
          <div className="mt-2 pt-1 border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded-sm bg-gray-200"></div>
              <div className="h-3 w-1/2 rounded-md bg-gray-200"></div>
            </div>
          </div>
        </div>

        {/* Image skeleton */}
        <div className="w-full h-24 sm:w-2/5 sm:h-full bg-gray-100">
          <div className="size-full bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

function extractDescription(doc) {
  const meta =
    doc.querySelector("meta[property='og:description']")?.getAttribute("content") ||
    doc.querySelector("meta[name='twitter:description']")?.getAttribute("content") ||
    doc.querySelector("meta[name='description']")?.getAttribute("content") ||
    doc.querySelector("meta[name='Description']")?.getAttribute("content")

  // Clean up the description but allow for longer text
  if (meta) {
    return meta.trim().slice(0, 300) // Increased from 200 to 300 characters
  }
  return null
}

function extractTitle(doc) {
  const meta =
    doc.querySelector("meta[property='og:title']")?.getAttribute("content") ||
    doc.querySelector("meta[name='twitter:title']")?.getAttribute("content") ||
    doc.querySelector("title")?.textContent ||
    doc.querySelector("h1")?.textContent

  // Clean up the title with more generous length limit
  if (meta) {
    return meta.trim().slice(0, 150) // Increased from 100 to 150 characters
  }
  return null
}

function extractImage(doc, url) {
  let meta =
    doc.querySelector("meta[property='og:image']")?.getAttribute("content") ||
    doc.querySelector("meta[property='og:image:url']")?.getAttribute("content") ||
    doc.querySelector("meta[name='twitter:image']")?.getAttribute("content") ||
    doc.querySelector("meta[property='image']")?.getAttribute("content") ||
    doc.querySelector("link[rel='image_src']")?.getAttribute("href")

  if (!meta) {
    return null
  }

  // Handle relative URLs
  if (meta.startsWith("/")) {
    const hostname = new URL(url).hostname
    const protocol = new URL(url).protocol
    meta = `${protocol}//${hostname}${meta}`
  } else if (meta.startsWith("//")) {
    const protocol = new URL(url).protocol
    meta = `${protocol}${meta}`
  } else if (!meta.startsWith("http")) {
    // Handle relative paths without leading slash
    try {
      const baseUrl = new URL(url)
      meta = new URL(meta, baseUrl.origin).href
    } catch {
      console.warn("Could not resolve image URL:", meta)
      return null
    }
  }

  // Validate that the URL looks reasonable
  try {
    const imageUrl = new URL(meta)
    // Check for common image extensions or common image hosting patterns
    const path = imageUrl.pathname.toLowerCase()
    const hasImageExtension = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?|$)/i.test(path)
    const isImageHost = /\b(images?|img|media|cdn|static|assets)\b/i.test(imageUrl.hostname)

    if (hasImageExtension || isImageHost || path.includes("image") || path.includes("photo")) {
      return meta
    }
  } catch {
    console.warn("Invalid image URL:", meta)
  }

  return null
}
