import React, { FC, useState, useCallback } from "react"
import { useIntersectionObserver } from "@/lib/performance"

// Main Video component that routes to appropriate player
export const Video: FC<{ url: string }> = ({ url }) => {
  const videoType = detectVideoType(url)

  switch (videoType.type) {
    case "youtube":
      return <YouTube url={url} />
    case "vimeo":
      return <Vimeo url={url} />
    case "direct":
      return <DirectVideo url={url} />
    default:
      return <DirectVideo url={url} /> // Fallback to direct video
  }
}

// YouTube component (existing functionality)
export const YouTube: FC<{ url: string }> = ({ url }) => {
  const videoId = getYouTubeId(url)
  const [targetRef, isIntersecting] = useIntersectionObserver()
  const [hasLoaded, setHasLoaded] = useState(false)

  const handleLoadVideo = () => {
    setHasLoaded(true)
  }

  return (
    <div
      ref={targetRef}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]"
    >
      {!hasLoaded && isIntersecting && (
        <div
          className="flex cursor-pointer items-center justify-center bg-gradient-to-br from-red-600 to-red-700"
          style={{ aspectRatio: "16/9" }}
          onClick={handleLoadVideo}
          onKeyDown={(e) => e.key === "Enter" && handleLoadVideo()}
          role="button"
          tabIndex={0}
        >
          <div className="text-center transition-transform group-hover:scale-110">
            <div className="mb-4">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-lg font-bold text-white drop-shadow-md">Load YouTube Video</p>
            <p className="text-sm text-red-100">Click to play</p>
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
          className="rounded-xl"
        />
      )}
    </div>
  )
}

// Vimeo component
export const Vimeo: FC<{ url: string }> = ({ url }) => {
  const videoId = getVimeoId(url)
  const [targetRef, isIntersecting] = useIntersectionObserver()
  const [hasLoaded, setHasLoaded] = useState(false)

  const handleLoadVideo = () => {
    setHasLoaded(true)
  }

  return (
    <div
      ref={targetRef}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]"
    >
      {!hasLoaded && isIntersecting && (
        <div
          className="flex cursor-pointer items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600"
          style={{ aspectRatio: "16/9" }}
          onClick={handleLoadVideo}
          onKeyDown={(e) => e.key === "Enter" && handleLoadVideo()}
          role="button"
          tabIndex={0}
        >
          <div className="text-center transition-transform group-hover:scale-110">
            <div className="mb-4">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-lg font-bold text-white drop-shadow-md">Load Vimeo Video</p>
            <p className="text-sm text-blue-100">Click to play</p>
          </div>
        </div>
      )}

      {hasLoaded && (
        <iframe
          width="100%"
          height="400"
          src={`https://player.vimeo.com/video/${videoId}?autoplay=0&title=0&byline=0&portrait=0`}
          title="Vimeo video player"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen={true}
          loading="lazy"
          style={{ aspectRatio: "16/9" }}
          className="rounded-xl"
        />
      )}
    </div>
  )
}

// Direct video component for MP4, WebM, etc.
export const DirectVideo: FC<{ url: string }> = ({ url }) => {
  const [targetRef, isIntersecting] = useIntersectionObserver()
  const [hasLoaded, setHasLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoadVideo = () => {
    setHasLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  const getVideoFormat = useCallback((url: string) => {
    const extension = url.split(".").pop()?.toLowerCase()
    switch (extension) {
      case "mp4":
        return "video/mp4"
      case "webm":
        return "video/webm"
      case "ogg":
        return "video/ogg"
      default:
        return "video/mp4" // Default fallback
    }
  }, [])

  if (hasError) {
    return (
      <div className="group relative overflow-hidden rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100 shadow-xl">
        <div className="flex items-center justify-center p-8" style={{ aspectRatio: "16/9" }}>
          <div className="text-center">
            <div className="mb-4">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="text-red-500">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <p className="text-lg font-bold text-red-600">Video Error</p>
            <p className="text-sm text-red-500">Unable to load video from this source</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={targetRef}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]"
    >
      {!hasLoaded && isIntersecting && (
        <div
          className="relative flex cursor-pointer items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
          style={{ aspectRatio: "16/9" }}
          onClick={handleLoadVideo}
          onKeyDown={(e) => e.key === "Enter" && handleLoadVideo()}
          role="button"
          tabIndex={0}
        >
          {/* Video preview */}
          <div className="text-center">
            {/* Video file icon */}
            <div className="w-32 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mb-6 mx-auto shadow-lg border border-slate-500">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="white" className="opacity-80">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            {/* Video info */}
            <div className="space-y-2">
              <p className="text-lg font-semibold text-white">Video Content</p>
              <p className="text-sm text-slate-300 max-w-xs">
                {url.includes("cloudinary") ? "Cloudinary Video" : url.includes(".mp4") ? "MP4 Video" : url.includes(".webm") ? "WebM Video" : "Direct Video"}
              </p>
            </div>
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity group-hover:bg-opacity-50" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative z-10 text-center transition-transform group-hover:scale-110">
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-md"></div>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="white" className="relative drop-shadow-lg">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <p className="text-lg font-bold text-white drop-shadow-md">Play Video</p>
              <p className="text-sm text-gray-200">Click to play</p>
            </div>
          </div>
        </div>
      )}

      {hasLoaded && (
        <video width="100%" height="400" controls autoPlay preload="metadata" style={{ aspectRatio: "16/9" }} className="rounded-xl bg-black" onError={handleError}>
          <source src={url} type={getVideoFormat(url)} />
          <track kind="captions" srcLang="en" label="English" default />
          <p className="text-white p-4">
            Your browser doesn&apos;t support HTML5 video.
            <a href={url} className="text-blue-400 underline ml-1">
              Download the video instead.
            </a>
          </p>
        </video>
      )}
    </div>
  )
}

/*
 * Function to detect video type from URL
 */
export const detectVideoType = (url: string) => {
  // YouTube detection
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return { type: "youtube", id: getYouTubeId(url) }
  }

  // Vimeo detection
  if (url.includes("vimeo.com")) {
    return { type: "vimeo", id: getVimeoId(url) }
  }

  // Direct video file detection
  const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "mkv"]
  const extension = url.split(".").pop()?.toLowerCase()
  if (extension && videoExtensions.includes(extension)) {
    return { type: "direct", extension }
  }

  // Check if URL contains common video hosting domains
  const videoHosts = ["cloudinary.com", "vimeo.com", "wistia.com", "jwplayer.com"]
  if (videoHosts.some((host) => url.includes(host))) {
    return { type: "direct", host: videoHosts.find((host) => url.includes(host)) }
  }

  // Default to direct video
  return { type: "direct" }
}

/*
 * Function to get the YouTube video ID from the URL
 */
export const getYouTubeId = (url: string) => {
  // ID from https://www.youtube.com/watch?v=VIDEO_ID
  let videoId = url.split("=")[1]

  // ID from https://youtu.be/VIDEO_ID
  if (!videoId) {
    videoId = url.split("/").pop()
  }

  // Clean up any additional parameters
  if (videoId && videoId.includes("&")) {
    videoId = videoId.split("&")[0]
  }

  return videoId
}

/*
 * Function to get the Vimeo video ID from the URL
 */
export const getVimeoId = (url: string) => {
  // Extract ID from various Vimeo URL formats
  const match = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/)
  return match ? match[1] : null
}
