import "../styles/globals.css"
import { jetbrainsMono, manrope, outfit, sourceSerif } from "@/lib/fonts"
import { AppProps } from "next/app"
import Head from "next/head"
import { Analytics } from "@vercel/analytics/next"
import PerformanceMonitor from "@/components/PerformanceMonitor"
import { ThemeProvider } from "@/components/ThemeProvider"

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      <Head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for external services */}
        <link rel="dns-prefetch" href="//www.notion.so" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//youtube.com" />
        <link rel="dns-prefetch" href="//www.youtube.com" />
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <PerformanceMonitor />
      <Analytics />
      <div className="min-h-screen atlas-page transition-colors">
        <div className={`${outfit.variable} ${manrope.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
