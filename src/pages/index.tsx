import { InferGetStaticPropsType } from "next"
import Container from "@/components/Container"
import Link from "next/link"
import * as Separator from "@radix-ui/react-separator"
import * as Tooltip from "@radix-ui/react-tooltip"

import { getAllPublishedBlogPosts } from "@/lib/notion"
import { siteMetadata } from "@/lib/siteMetadata"
import { outfit, manrope } from "@/lib/fonts"

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
    <Tooltip.Provider delayDuration={200}>
      <Container>
        {/* Hero Section - Editorial Asymmetric Layout */}
        <div className="mx-auto mb-20 px-4 max-w-3xl md:mb-32">
          <div className="relative pt-8 md:pt-16">
            {/* Large Display Headline */}
            <h1
              className={`mb-6 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl ${outfit.className} animate-gradient-text`}
            >
              {siteMetadata.headerTitle}
            </h1>

            {/* Offset Tagline - Asymmetric positioning */}
            <div className="md:ml-auto md:max-w-md md:text-right">
              <p
                className={`text-lg text-gray-600 dark:text-gray-400 leading-relaxed animate-fade-in-up stagger-2 ${manrope.className}`}
              >
                {siteMetadata.description}
              </p>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mx-auto px-4 max-w-3xl pb-16">
          <div className="flex items-center justify-between mb-12 animate-fade-in-up stagger-3">
            <h2
              className={`text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 ${manrope.className}`}
            >
              Latest Writing
            </h2>
            <div className="flex-1 mx-6 h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
            <span className="text-sm text-gray-400 dark:text-gray-600 font-mono">
              {posts.length.toString().padStart(2, "0")} posts
            </span>
          </div>

          {!posts.length && (
            <p className="mb-4 text-gray-600 dark:text-gray-400 transition-colors">
              No posts found.
            </p>
          )}

          <div className="space-y-0">
            {posts.map((post, index) => {
              const postNumber = (index + 1).toString().padStart(2, "0")
              const staggerClass = `stagger-${Math.min(index + 4, 8)}`

              return (
                <div key={post.id}>
                  <article
                    className={`group py-8 md:py-10 animate-fade-in-up ${staggerClass}`}
                  >
                    <div className="flex gap-6 md:gap-10 items-start">
                      {/* Post Number */}
                      <span
                        className={`post-number text-4xl md:text-5xl font-bold text-gray-200 dark:text-gray-800 transition-colors group-hover:text-teal-600 ${outfit.className}`}
                      >
                        {postNumber}
                      </span>

                      {/* Post Content */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/posts/${post.slug}`} className="block group/link">
                          <h3
                            className={`text-xl md:text-2xl font-bold leading-snug text-gray-900 dark:text-gray-100 transition-colors mb-3 link-underline inline ${outfit.className}`}
                          >
                            {post.title}
                          </h3>
                        </Link>

                        <p
                          className={`text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2 ${manrope.className}`}
                        >
                          {post.description}
                        </p>

                        {/* Tags with Tooltips */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Tooltip.Root key={tag}>
                              <Tooltip.Trigger asChild>
                                <span
                                  className={`px-2 py-1 text-xs font-medium uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 rounded cursor-default transition-colors hover:bg-teal-100 dark:hover:bg-teal-900/40 ${manrope.className}`}
                                >
                                  {tag}
                                </span>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content
                                  className="px-3 py-2 text-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg shadow-lg"
                                  sideOffset={5}
                                >
                                  View all posts tagged &ldquo;{tag}&rdquo;
                                  <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-100" />
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>

                  {/* Radix Separator between posts */}
                  {index < posts.length - 1 && (
                    <Separator.Root
                      className="h-px bg-gray-100 dark:bg-gray-800"
                      decorative
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Tooltip.Provider>
  )
}
