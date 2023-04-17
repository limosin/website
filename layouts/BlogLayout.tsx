import Container from "@/components/Container"
import { roboto } from "@/lib/fonts"

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
      <article className={`mx-auto mb-16 flex w-full max-w-2xl flex-col items-start justify-center ${roboto.className}`}>{children}</article>
    </Container>
  )
}
