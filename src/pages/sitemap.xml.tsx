import { GetServerSideProps } from "next"
import { getAllPublishedBlogPosts } from "@/lib/notion"
import { siteMetadata } from "@/lib/siteMetadata"
import { toIsoDate } from "@/lib/urls"

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, (character) => {
    const entities = { "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }
    return entities[character]
  })

const Sitemap = () => {
  // getServerSideProps will handle the response
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getAllPublishedBlogPosts(process.env.NOTION_BLOG_DATABASE_ID)
  const staticRoutes = ["", "/about", "/projects"]
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      (route) => `<url>
    <loc>${escapeXml(`${siteMetadata.siteUrl}${route}`)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route ? "0.7" : "1.0"}</priority>
  </url>`
    )
    .join("\n  ")}
  ${posts
    .map((post) => {
      const lastModified = toIsoDate(post.date)
      return `
    <url>
      <loc>${escapeXml(`${siteMetadata.siteUrl}/posts/${encodeURIComponent(post.slug)}`)}</loc>
      ${lastModified ? `<lastmod>${lastModified}</lastmod>` : ""}
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`
    })
    .join("")}
</urlset>`

  res.setHeader("Content-Type", "text/xml")
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate")
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
