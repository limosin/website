import React, { useState } from "react"
import OptimizedImage from "../OptimizedImage"

// Types
interface ZoomedImageData {
  src: string
  alt: string
  caption?: string
}

interface ImageZoomModalProps {
  src: string
  alt: string
  caption?: string
  onClose: () => void
}

interface NotionImageProps {
  id: string
  value: {
    type: "external" | "file"
    external?: { url: string }
    file?: { url: string }
    caption: Array<{ plain_text: string }>
  }
}

// Main Image component for Notion blocks
export const NotionImage: React.FC<NotionImageProps> = ({ id, value }) => {
  const [zoomedImage, setZoomedImage] = useState<ZoomedImageData | null>(null)

  const imageSrc = value.type === "external" ? value.external?.url : value.file?.url
  const caption = value.caption.length ? value.caption[0].plain_text : ""

  const handleImageClick = () => {
    if (imageSrc) {
      setZoomedImage({
        src: imageSrc,
        alt: caption || "Content image",
        caption: caption,
      })
    }
  }

  if (!imageSrc) {
    return (
      <div className="my-4 w-full">
        <div className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-gray-100 p-8 text-center">
          <p className="text-gray-500">Image not available</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <figure key={id} className="my-4 w-full">
        <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <button
            type="button"
            className="group w-full cursor-zoom-in transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleImageClick}
            aria-label={`Zoom image${caption ? `: ${caption}` : ""}`}
          >
            <OptimizedImage
              src={imageSrc}
              alt={caption || "Content image"}
              width={1200}
              height={800}
              className="h-auto w-full object-contain transition-all duration-200 group-hover:brightness-110"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 90vw, 800px"
              priority={false}
            />
            {/* Zoom indicator overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-200 group-hover:bg-black/10">
              <div className="rounded-full bg-white/80 p-2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-110 backdrop-blur-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-800">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
          </button>
        </div>
        {caption && <figcaption className="mx-auto mt-4 max-w-4xl text-center text-sm leading-relaxed text-gray-600">{caption}</figcaption>}
      </figure>

      {zoomedImage && <ImageZoomModal src={zoomedImage.src} alt={zoomedImage.alt} onClose={() => setZoomedImage(null)} />}
    </>
  )
}

// Image Zoom Modal Component
const ImageZoomModal: React.FC<ImageZoomModalProps> = ({ src, alt, onClose }) => {
  // Close modal on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden" // Prevent background scroll

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-label="Image zoom modal">
      {/* Backdrop - clickable to close */}
      <button type="button" className="absolute inset-0 w-full h-full cursor-default" onClick={onClose} aria-label="Close modal by clicking backdrop" />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Close image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Image container */}
      <div className="relative flex items-center justify-center max-h-[90vh] max-w-[90vw] p-4 animate-zoom-in" role="img" aria-label={alt}>
        {/* Use regular img tag for zoom to get full resolution without Next.js optimization interfering */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="rounded-lg shadow-2xl max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain"
          style={{
            maxHeight: "90vh",
            maxWidth: "90vw",
            width: "auto",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  )
}
