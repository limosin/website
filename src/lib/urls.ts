import { siteMetadata } from "./siteMetadata"

const WEB_PROTOCOLS = new Set(["https:", "http:"])
const LINK_PROTOCOLS = new Set(["https:", "http:", "mailto:"])

export const getSafeWebUrl = (value?: string | null): URL | null => {
  if (!value) return null

  try {
    const url = new URL(value)
    return WEB_PROTOCOLS.has(url.protocol) && !url.username && !url.password ? url : null
  } catch {
    return null
  }
}

export const getSafeLinkUrl = (value?: string | null): string | null => {
  if (!value) return null

  try {
    const url = new URL(value, siteMetadata.siteUrl)
    return LINK_PROTOCOLS.has(url.protocol) && !url.username && !url.password ? url.href : null
  } catch {
    return null
  }
}

export const toAbsoluteSiteUrl = (value?: string | null, fallback = "/logo.png"): string => {
  try {
    return new URL(value || fallback, siteMetadata.siteUrl).href
  } catch {
    return new URL(fallback, siteMetadata.siteUrl).href
  }
}

export const toCanonicalUrl = (path: string): string => {
  const pathname = path.split(/[?#]/, 1)[0] || "/"
  return new URL(pathname, siteMetadata.siteUrl).href
}

export const toIsoDate = (value?: string | Date | null): string | undefined => {
  if (!value) return undefined

  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}
