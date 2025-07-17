import "../styles/globals.css"
import { inter } from "@/lib/fonts"
import { AppProps } from "next/app"
import Head from "next/head"
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
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <main className={`${inter.className} font-sans`}>
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
