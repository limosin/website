import { useEffect, useRef, useState } from "react"
import type { Metric } from "web-vitals"

/**
 * Hook for lazy loading components when they enter the viewport
 */
export const useIntersectionObserver = (options: IntersectionObserverInit = {}): [React.RefObject<HTMLDivElement>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    )

    const currentTarget = targetRef.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [options])

  return [targetRef, isIntersecting]
}

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(func: T, wait: number): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Preload critical resources
 */
export const preloadResource = (href: string, as: string): void => {
  if (typeof window !== "undefined") {
    const link = document.createElement("link")
    link.rel = "preload"
    link.href = href
    link.as = as
    document.head.appendChild(link)
  }
}

/**
 * Web Vitals reporting
 */
export const reportWebVitals = (metric: Metric): void => {
  if (process.env.NODE_ENV === "production") {
    // Send to analytics service
    console.log("Web Vital:", metric)

    // Example: Send to Google Analytics
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      ;((window as unknown as Record<string, unknown>).gtag as (...args: unknown[]) => void)("event", metric.name, {
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        event_category: "Web Vitals",
        event_label: metric.id,
        non_interaction: true,
      })
    }
  }
}

/**
 * Optimize images by generating srcSet
 */
export const generateSrcSet = (src: string, sizes: number[]): string => {
  return sizes.map((size) => `${src}?w=${size} ${size}w`).join(", ")
}

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
