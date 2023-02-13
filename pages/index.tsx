import Image from 'next/image'
import { InferGetStaticPropsType } from 'next'
import Container from '../components/Container'
import Link from 'next/link'
import { getParsedBlogTableData } from '@/lib/getNotionData'

export const getStaticProps = async () => {
  const posts = await getParsedBlogTableData(process.env.NOTION_BLOG_DATABASE_ID)

  return { props: { posts: posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <div className="mx-auto mb-16 max-w-2xl">
        <div className="mx-auto mb-4 flex max-w-sm items-center justify-center">
          <Image src="/notion.svg" height={60} width={60} alt="Notion logo" />
          <span className="mx-4">+</span>
          <Image src="/nextjs.svg" height={80} width={133} alt="Next.js logo" />
          <span className="mx-4">+</span>
          <Image src="/tailwindcss.svg" height={24} width={192} alt="Tailwind CSS logo" />
        </div>
        <div className="mb-16">
          <h1 className="mx-auto mb-2 w-full max-w-xl text-3xl font-bold tracking-tight text-black md:text-center md:text-5xl">
            Starter blog template powered by Next.js, Notion and Tailwind CSS
          </h1>
          <p className="mx-auto mb-5 max-w-xl text-gray-700 md:text-center">
            This is an open-source starter blog template that is statically generated with{' '}
            <a
              href="https://nextjs.org/"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>
            , content powered by{' '}
            <a
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://developers.notion.com/"
            >
              Notion
            </a>
            , styled with{' '}
            <a
              href="http://tailwindcss.com/"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tailwind CSS
            </a>{' '}
            and deployed with{' '}
            <a
              href="https://vercel.com/"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel
            </a>
            . Grab the source code from{' '}
            <a
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://limosyn.com"
            >
              Github
            </a>
            .
          </p>
        </div>
        <h2 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-3xl">
          Blog Posts
        </h2>

        {!posts.length && <p className="mb-4 text-gray-600">No posts found.</p>}

        {posts.map((post) => {
          const postImageUrl = post.cover
          return (
            <div key={post.id} className="mb-8 sm:flex">
              {postImageUrl && (
                <Link
                  href={`/${post.slug}`}
                  className="mb-10 block w-full sm:mr-5 sm:mb-0 sm:w-1/3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={postImageUrl} />
                </Link>
              )}
              <Link href={`/${post.slug}`} className="w-full">
                <div className="w-full">
                  <h3 className="w-full text-xl font-medium text-gray-900">{post.title}</h3>
                  <p className="text-gray-700">{post.description}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </Container>
  )
}
