import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/router"
import { type ExtendedRecordMap } from "notion-types"
import { NotionRenderer } from "react-notion-x"
import TweetEmbed from "react-tweet-embed"

import { Loading } from "./Loading"
import { nunito } from "@/lib/fonts"

// -----------------------------------------------------------------------------
// dynamic imports for optional components
// -----------------------------------------------------------------------------

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    // additional prism syntaxes
    await Promise.all([
      import("prismjs/components/prism-markup-templating.js"),
      import("prismjs/components/prism-markup.js"),
      import("prismjs/components/prism-bash.js"),
      import("prismjs/components/prism-c.js"),
      import("prismjs/components/prism-cpp.js"),
      import("prismjs/components/prism-csharp.js"),
      import("prismjs/components/prism-docker.js"),
      import("prismjs/components/prism-java.js"),
      import("prismjs/components/prism-js-templates.js"),
      import("prismjs/components/prism-coffeescript.js"),
      import("prismjs/components/prism-diff.js"),
      import("prismjs/components/prism-git.js"),
      import("prismjs/components/prism-go.js"),
      import("prismjs/components/prism-graphql.js"),
      import("prismjs/components/prism-handlebars.js"),
      import("prismjs/components/prism-less.js"),
      import("prismjs/components/prism-makefile.js"),
      import("prismjs/components/prism-markdown.js"),
      import("prismjs/components/prism-objectivec.js"),
      import("prismjs/components/prism-ocaml.js"),
      import("prismjs/components/prism-python.js"),
      import("prismjs/components/prism-reason.js"),
      import("prismjs/components/prism-rust.js"),
      import("prismjs/components/prism-sass.js"),
      import("prismjs/components/prism-scss.js"),
      import("prismjs/components/prism-solidity.js"),
      import("prismjs/components/prism-sql.js"),
      import("prismjs/components/prism-stylus.js"),
      import("prismjs/components/prism-swift.js"),
      import("prismjs/components/prism-wasm.js"),
      import("prismjs/components/prism-yaml.js"),
    ])
    return m.Code
  })
)
const Collection = dynamic(() => import("react-notion-x/build/third-party/collection").then((m) => m.Collection))
const Equation = dynamic(() => import("react-notion-x/build/third-party/equation").then((m) => m.Equation))
const Pdf = dynamic(() => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf), {
  ssr: false,
})
const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal), {
  ssr: false,
})

function Tweet({ id }: { id: string }) {
  return <TweetEmbed tweetId={id} />
}

export function NotionPage({ post, recordMap, previewImagesEnabled, rootDomain }: { post: any; recordMap: ExtendedRecordMap; previewImagesEnabled?: boolean; rootDomain?: string }) {
  const router = useRouter()

  if (router.isFallback) {
    return <Loading />
  }

  if (!recordMap) {
    return null
  }

  // useful for debugging from the dev console
  if (typeof window !== "undefined") {
    const keys = Object.keys(recordMap?.block || {})
    const block = recordMap?.block?.[keys[0]]?.value
    const g = window as any
    g.recordMap = recordMap
    g.block = block
  }

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={false}
      darkMode={false}
      rootDomain={rootDomain}
      isShowingSearch={false}
      previewImages={previewImagesEnabled}
      pageHeader={<h1 className={`mb-10 text-3xl font-bold tracking-tight text-black md:text-5xl ${nunito.className}`}>{post.properties.title.title[0].plain_text}</h1>}
      components={{
        nextLink: Link,
        Code,
        Collection,
        Equation,
        Pdf,
        Modal,
        Tweet,
      }}
    />
  )
}
