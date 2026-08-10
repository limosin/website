import Link from "next/link"
import BlogLayout from "@/layouts/BlogLayout"
import { BlogPost, getAllPublishedBlogPosts, getNotionPageWithBlockTree } from "@/lib/notion"
import { RenderBlocks } from "@/components/ContentBlocks"
import { outfit, manrope } from "@/lib/fonts"
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import type { GetStaticPaths, GetStaticProps } from "next"

const databaseId = process.env.NOTION_BLOG_DATABASE_ID

interface PostPageProps {
  post: BlogPost
  blocks: BlockObjectResponse[]
}

export default function Post({ post, blocks }: PostPageProps) {
  if (!post || !blocks) {
    return <div />
  }

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <BlogLayout post={post}>
      <div className="atlas-post-heading">
        <Link href="/" className={`atlas-post-back group animate-fade-in-up stagger-1 ${outfit.className}`}>
          <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to blogs
        </Link>

        <header className="atlas-post-header">
          <div className={`atlas-post-meta animate-fade-in-up stagger-2 ${outfit.className}`}>
            <time dateTime={post.date}>{date}</time>
            {post.tags.length > 0 && (
              <>
                <span className="atlas-post-meta-rule" aria-hidden="true" />
                <div className="atlas-post-tags" aria-label="Topics">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          <h1 className="atlas-post-title animate-gradient-text stagger-3">{post.title}</h1>

          {post.description && <p className="atlas-post-description animate-fade-in-up stagger-4">{post.description}</p>}
        </header>
      </div>

      <div className={`atlas-post-content prose dark:prose-invert prose-lg animate-fade-in-up stagger-4 ${manrope.className}`}>
        <RenderBlocks blocks={blocks} />
      </div>
    </BlogLayout>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const database = await getAllPublishedBlogPosts(process.env.NOTION_BLOG_DATABASE_ID)
  return {
    paths: database.map((page) => ({
      params: {
        slug: page.slug,
      },
    })),
    fallback: "blocking", // Enable ISR for new posts
  }
}

export const getStaticProps: GetStaticProps<PostPageProps, { slug: string }> = async (context) => {
  const { slug } = context.params
  const database = await getAllPublishedBlogPosts(databaseId)
  const post = database.find((blog) => blog.slug === slug)
  if (!post) {
    return {
      notFound: true,
    }
  }
  const { blocks } = await getNotionPageWithBlockTree(post.id)

  return {
    props: {
      post,
      blocks,
    },
    // Revalidate every 6 hours in production
    revalidate: process.env.NODE_ENV === "production" ? 21600 : 1,
  }
}
