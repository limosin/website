import "tailwindcss/tailwind.css"
import "react-notion-x/src/styles.css"
import "prism-themes/themes/prism-one-light.min.css"
import "katex/dist/katex.min.css"

import { nunito } from "@/lib/fonts"

function App({ Component, pageProps }) {
  return (
    <main className={nunito.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default App
