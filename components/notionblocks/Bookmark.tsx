import { useEffect, useState } from "react"

export const Bookmark = ({ id, value }) => {
  // Fetch the bookmark preview image using the url meta
  const [previewImage, setPreviewImage] = useState("")
  const [previewDesp, setPreviewDesp] = useState("")
  const [previewTitle, setPreviewTitle] = useState("")

  useEffect(() => {
    fetch(`/api/cors?url=${encodeURIComponent(value.url)}`)
      .then((res) => res.text())
      .then((html) => {
        // Convert the html string to a document object
        const doc = new DOMParser().parseFromString(html, "text/html")

        let ogImageTag = extractImage(doc, value.url)
        const ogDescriptionTag = extractDescription(doc)
        const ogTitleTag = extractTitle(doc)

        if (!ogImageTag) {
          ogImageTag = "/logo.png"
        }
        setPreviewImage(ogImageTag)
        setPreviewDesp(ogDescriptionTag)
        setPreviewTitle(ogTitleTag)
      })
  }, [value.url])

  // Render the bookmark value with the preview image
  return <>{previewImage ? showBookmark(value, id, previewTitle, previewDesp, previewImage) : showBookmarkSkeleton(id)}</>
}

const showBookmark = (value, id, previewTitle, previewDesp, previewImage) => {
  const w: string = previewImage ? "w-3/5" : "w-full"
  return (
    <a href={value.url} target="_blank" rel="noreferrer" className="my-3 w-full md:block" id={id}>
      <div className="flex h-40 justify-between rounded border border-solid border-gray-400">
        <div className={`flex flex-col justify-between p-3 hover:bg-gray-100 ${w}`}>
          <p className="text-base">{previewTitle}</p>
          <p className="line-clamp-3 overflow-hidden text-sm text-gray-500">{previewDesp}</p>
          <p className="line-clamp-1 text-sm text-gray-500">{value.url}</p>
        </div>
        {previewImage && (
          <div className="h-full w-2/5 rounded">
            <img src={previewImage} className="size-full object-cover" alt="Bookmark" />
          </div>
        )}
      </div>
    </a>
  )
}

const showBookmarkSkeleton = (id) => {
  return (
    <div className="my-3 w-full md:block" id={id}>
      <div className="flex h-40 justify-between rounded border border-solid border-gray-400">
        <div className={`flex w-3/4 animate-pulse flex-col justify-between p-3 hover:bg-gray-100`}>
          <p className="h-4 w-3/4 rounded-md bg-gray-100 dark:bg-gray-700"></p>
          <p className="h-4 w-full rounded-md bg-gray-100 dark:bg-gray-700"></p>
          <p className="h-4 w-full rounded-md bg-gray-100 dark:bg-gray-700"></p>
          <p className="h-4 w-full rounded-md bg-gray-100 dark:bg-gray-700"></p>
        </div>
        <div className="h-full w-2/5 rounded">
          <div className="size-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  )
}

function extractDescription(doc) {
  const meta = doc.querySelector("meta[property='og:description']")?.getAttribute("content") || doc.querySelector("meta[name='description']")?.getAttribute("content")
  return meta
}

function extractTitle(doc) {
  const meta = doc.querySelector("meta[property='og:title']")?.getAttribute("content") || doc.querySelector("title")?.textContent
  return meta
}

function extractImage(doc, url) {
  let meta = doc.querySelector("meta[property='og:image']")?.getAttribute("content") || doc.querySelector("meta[property='image']")?.getAttribute("content")
  if (meta && meta.startsWith("/")) {
    const hostname = new URL(url).hostname
    meta = "https://" + hostname + meta
  }
  return meta
}
