import "tailwindcss/tailwind.css"
import { nunito } from "@/lib/fonts"

function App({ Component, pageProps }) {
  return (
    <main className={nunito.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default App
