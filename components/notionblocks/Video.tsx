import { FC, useState } from "react"
import { useIntersectionObserver } from "@/lib/performance"

export const YouTube: FC<{ url: string }> = ({ url }) => {
  const videoId = getYouTubeId(url)
  const [targetRef, isIntersecting] = useIntersectionObserver()
  const [hasLoaded, setHasLoaded] = useState(false)

  const handleLoadVideo = () => {
    setHasLoaded(true)
  }

  return (
    <div ref={targetRef} className="relative">
      {!hasLoaded && isIntersecting && (
        <div
          className="flex items-center justify-center bg-gray-900 cursor-pointer rounded-lg overflow-hidden"
          style={{ aspectRatio: "16/9" }}
          onClick={handleLoadVideo}
          onKeyDown={(e) => e.key === "Enter" && handleLoadVideo()}
          role="button"
          tabIndex={0}
        >
          <div className="text-center">
            <div className="mb-4">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-white text-lg font-medium">Load Video</p>
            <p className="text-gray-300 text-sm">Click to load YouTube video</p>
          </div>
        </div>
      )}

      {hasLoaded && (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
          loading="lazy"
          style={{ aspectRatio: "16/9" }}
        />
      )}
    </div>
  )
}

/*
 * Function to get the video ID from the URL
 */
export const getYouTubeId = (url: string) => {
  // ID from https://www.youtube.com page
  let videoId = url.split("=")[1]

  // ID from https://www.youtu.be short URL
  if (!videoId) {
    videoId = url.split("/").pop()
  }
  return videoId
}
