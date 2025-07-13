import { GetServerSideProps } from "next"
import { siteMetadata } from "@/lib/siteMetadata"

const Robots = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteMetadata.siteUrl}/sitemap.xml`

  res.setHeader("Content-Type", "text/plain")
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate")
  res.write(robots)
  res.end()

  return {
    props: {},
  }
}

export default Robots
