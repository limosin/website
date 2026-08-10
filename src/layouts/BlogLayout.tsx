import Container from "@/components/Container"
import { manrope } from "@/lib/fonts"
import type { BlogPost } from "@/lib/notion"
import type { ReactNode } from "react"

interface BlogLayoutProps {
  children: ReactNode
  post: BlogPost
}

export default function BlogLayout({ children, post }: BlogLayoutProps) {
  return (
    <Container title={post.title} description={post.description} date={post.date} type="article" image={post.cover}>
      <article className={`atlas-article ${manrope.className}`}>{children}</article>
    </Container>
  )
}
