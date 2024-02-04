import { FC } from "react"

export const YouTube: FC<{ url: string }> = ({ url }) => {
  const videoId = getYouTubeId(url)
  return (
    <div>
      <iframe
        width="100%"
        height="400"
        src={"https://www.youtube.com/embed/" + videoId}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
      ></iframe>
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
