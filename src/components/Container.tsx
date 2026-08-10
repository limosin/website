import { useRouter } from "next/router"
import Head from "next/head"
import type { ReactNode } from "react"
import Nav from "./Nav"
import Footer from "./Footer"
import { siteMetadata } from "@/lib/siteMetadata"
import { toAbsoluteSiteUrl, toCanonicalUrl, toIsoDate } from "@/lib/urls"

interface ContainerProps {
  children: ReactNode
  title?: string
  description?: string
  type?: "website" | "article"
  image?: string
  date?: string | Date
}

export default function Container(props: ContainerProps) {
  const { children, ...customMeta } = props
  const router = useRouter()
  const meta = {
    title: "Limosyn — Software, systems, and building well",
    description: siteMetadata.description,
    type: "website",
    image: "/logo.png",
    ...customMeta,
  }

  const canonicalUrl = toCanonicalUrl(router.asPath)
  const socialImage = toAbsoluteSiteUrl(meta.image)
  const publishedDate = toIsoDate(meta.date)
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": meta.type === "article" ? "BlogPosting" : "WebSite",
    name: meta.title,
    description: meta.description,
    url: canonicalUrl,
    image: socialImage,
    author: {
      "@type": "Person",
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteMetadata.headerTitle,
      url: siteMetadata.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteSiteUrl("/logo.png"),
      },
    },
    ...(publishedDate && {
      datePublished: publishedDate,
      dateModified: publishedDate,
    }),
  }).replace(/</g, "\\u003c")

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={siteMetadata.headerTitle} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:alt" content={meta.title} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@limosyn_com" />
        <meta name="twitter:creator" content="@limosyn_com" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={socialImage} />

        {/* Article specific */}
        {publishedDate && <meta property="article:published_time" content={publishedDate} />}
        {meta.type === "article" && <meta property="article:author" content={siteMetadata.author} />}

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />

        {/* Theme color */}
        <meta name="theme-color" content="#f5f1e8" />
        <meta name="msapplication-TileColor" content="#f5f1e8" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredData,
          }}
        />
      </Head>
      <Nav />
      <main id="skip">{children}</main>
      <Footer />
    </>
  )
}
