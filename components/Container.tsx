import { useRouter } from "next/router"
import Head from "next/head"
import Nav from "./Nav"
import Footer from "./Footer"
import { siteMetadata } from "@/lib/siteMetadata"

export default function Container(props) {
  const { children, ...customMeta } = props
  const router = useRouter()
  const meta = {
    title: "Somil's Blog",
    description: `My Personal blog where I share my thoughts on Tech & Software Engineering`,
    type: "website",
    image: "/logo.png",
    ...customMeta,
  }

  const canonicalUrl = `${siteMetadata.siteUrl}${router.asPath}`

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
        <meta property="og:image" content={`${siteMetadata.siteUrl}${meta.image}`} />
        <meta property="og:image:alt" content={meta.title} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@limosyn_com" />
        <meta name="twitter:creator" content="@limosyn_com" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={`${siteMetadata.siteUrl}${meta.image}`} />

        {/* Article specific */}
        {meta.date && <meta property="article:published_time" content={meta.date} />}
        {meta.type === "article" && <meta property="article:author" content={siteMetadata.author} />}

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />

        {/* Theme color */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": meta.type === "article" ? "BlogPosting" : "WebSite",
              name: meta.title,
              description: meta.description,
              url: canonicalUrl,
              image: `${siteMetadata.siteUrl}${meta.image}`,
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
                  url: `${siteMetadata.siteUrl}/logo.png`,
                },
              },
              ...(meta.date && {
                datePublished: meta.date,
                dateModified: meta.date,
              }),
            }),
          }}
        />
      </Head>
      <Nav />
      <main id="skip">{children}</main>
      <Footer />
    </>
  )
}
