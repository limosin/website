import { InferGetStaticPropsType } from "next"
import Container from "@/components/Container"
import Link from "next/link"

import { getAllPublishedBlogPosts } from "@/lib/notion"
import { siteMetadata } from "@/lib/siteMetadata"
import { inter } from "@/lib/fonts"

export const getStaticProps = async () => {
  const posts = await getAllPublishedBlogPosts(process.env.NOTION_BLOG_DATABASE_ID)

  return {
    props: { posts: posts },
    // Revalidate every hour in production
    revalidate: process.env.NODE_ENV === "production" ? 3600 : 1,
  }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <div className="mx-auto mb-16 px-4 max-w-3xl">
        <div className="mb-24 text-center">
          <h1 className={`mx-auto mb-4 w-full text-4xl font-bold tracking-tight text-black dark:text-white md:text-6xl lg:text-7xl font-sans transition-colors ${inter.className}`}>
            {siteMetadata.headerTitle}
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed transition-colors">{siteMetadata.description}</p>
        </div>

        <h2 className={`mb-10 text-2xl font-bold tracking-tight text-black dark:text-white md:text-3xl font-sans transition-colors ${inter.className}`}>Latest Writing</h2>

        {!posts.length && <p className="mb-4 text-gray-600 dark:text-gray-400 transition-colors">No posts found.</p>}

        <div className="space-y-12">
          {posts.map((post) => {
            return (
              <article key={post.id} className="flex flex-col space-y-3">
                <Link href={`/posts/${post.slug}`}>
                  <h3
                    className={`text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 font-sans transition-colors hover:text-teal-600 dark:hover:text-teal-400 ${inter.className}`}
                  >
                    {post.title}
                  </h3>
                </Link>
                <p className="prose max-w-none text-gray-500 dark:text-gray-400 leading-relaxed transition-colors">{post.description}</p>
                <div className="flex flex-wrap">
                  {post.tags.map((tag) => (
                    <span key={tag} className="mr-3 text-sm font-medium uppercase text-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
