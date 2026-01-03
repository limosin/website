import Container from "@/components/Container"
import { manrope } from "@/lib/fonts"

export default function BlogLayout({ children, data }) {
  const postImage = data.properties.cover
  const postImageUrl = postImage?.type === "file" ? postImage.file.url : postImage?.external.url

  return (
    <Container
      title={data.properties.title.title[0].plain_text}
      description={data.properties.description.rich_text[0].plain_text}
      date={new Date(data.properties.date.date.start)}
      type="article"
      image={postImageUrl}
    >
      <article className={`mx-auto mb-16 flex w-full max-w-3xl px-4 md:px-0 flex-col items-start justify-center ${manrope.className}`}>{children}</article>
    </Container>
  )
}
