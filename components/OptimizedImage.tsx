import Image, { ImageProps } from "next/image"
import { useState } from "react"

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string
  fallbackSrc?: string
}

export const OptimizedImage = ({ src, alt, fallbackSrc = "/logo.png", ...props }: OptimizedImageProps) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  // Check if the image is from a trusted domain
  const isTrustedDomain = (url: string) => {
    try {
      const hostname = new URL(url).hostname
      const trustedDomains = ["res.cloudinary.com", "images.unsplash.com", "www.notion.so", "s3.us-west-2.amazonaws.com", "cdn.sanity.io", "images.pexels.com", "picsum.photos"]
      return trustedDomains.some((domain) => hostname.includes(domain))
    } catch {
      return false
    }
  }

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  // For untrusted domains, use regular img tag with lazy loading
  if (!isTrustedDomain(src) && !hasError) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={handleError}
        style={{
          maxWidth: "100%",
          height: "auto",
          ...props.style,
        }}
        {...(props as Record<string, unknown>)}
      />
    )
  }

  // For trusted domains or fallback, use Next.js Image
  return <Image src={imgSrc} alt={alt} onError={handleError} {...props} />
}

export default OptimizedImage
