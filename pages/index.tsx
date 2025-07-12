import { InferGetStaticPropsType } from "next"
import Container from "@/components/Container"
import Link from "next/link"
import OptimizedImage from "@/components/OptimizedImage"
import { getAllPublishedBlogPosts } from "@/lib/notion"
import { siteMetadata } from "@/lib/siteMetadata"

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
      <div className="mx-auto mb-16 max-w-2xl">
        <div className="mb-16">
          <h1 className="mx-auto mb-2 w-full max-w-xl text-3xl font-bold tracking-tight text-black md:text-center md:text-5xl">{siteMetadata.headerTitle}</h1>
          <p className="mx-auto mb-5 max-w-xl text-gray-700 md:text-center">{siteMetadata.description}</p>
        </div>
        <h2 className="mb-4 mt-8 text-2xl font-bold tracking-tight text-black md:text-3xl">Blog Posts</h2>

        {!posts.length && <p className="mb-4 text-gray-600">No posts found.</p>}

        {posts.map((post) => {
          const postImageUrl = post.cover
          return (
            <div key={post.id} className="mb-8 sm:flex">
              {postImageUrl && (
                <Link href={`/posts/${post.slug}`} className="mb-10 block w-full sm:mb-0 sm:mr-5 sm:w-1/3">
                  <OptimizedImage
                    src={postImageUrl}
                    alt={post.title || "Blog post cover"}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    priority={posts.indexOf(post) < 2} // Prioritize first 2 images
                  />
                </Link>
              )}
              <div className="w-full">
                <div className="w-full">
                  <Link href={`/posts/${post.slug}`}>
                    <h3 className="line-clamp-1 w-full text-xl font-medium text-gray-900">{post.title}</h3>
                  </Link>
                  <p className="line-clamp-2 text-gray-700">{post.description}</p>
                  <div className="mt-2 flex flex-wrap">
                    {post.tags.map((tag) => (
                      <div key={tag} className="mb-2 mr-2">
                        <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}
