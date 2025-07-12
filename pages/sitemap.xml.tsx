import { GetServerSideProps } from "next"
import { getParsedBlogTableData } from "@/lib/notion"
import { siteMetadata } from "@/lib/siteMetadata"

const Sitemap = () => {
  // getServerSideProps will handle the response
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getParsedBlogTableData(process.env.NOTION_BLOG_DATABASE_ID)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteMetadata.siteUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts
    .map((post) => {
      return `
    <url>
      <loc>${siteMetadata.siteUrl}/posts/${post.slug}</loc>
      <lastmod>${new Date(post.date).toISOString()}</lastmod>
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
