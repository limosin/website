import { useEffect } from "react"
import { useRouter } from "next/router"
import { reportWebVitals } from "@/lib/performance"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export const PerformanceMonitor = () => {
  const router = useRouter()

  useEffect(() => {
    // Track page views
    const handleRouteChange = (url: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("config", "GA_MEASUREMENT_ID", {
          page_path: url,
        })
      }
    }

    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    // Import and setup web vitals
    import("web-vitals")
      .then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS(reportWebVitals)
        onINP(reportWebVitals) // INP replaced FID in newer versions
        onFCP(reportWebVitals)
        onLCP(reportWebVitals)
        onTTFB(reportWebVitals)
      })
      .catch(() => {
        // Silently fail if web-vitals is not available
      })
  }, [])

  return null
}

export default PerformanceMonitor
