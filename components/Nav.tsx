import Link from "next/link"
import { siteMetadata } from "@/lib/siteMetadata"

const ExternalLink = ({ href, children }) => (
  <a className="p-1 text-gray-900 hover:underline sm:p-4" target="_blank" rel="noopener noreferrer" href={href}>
    {children}
  </a>
)

export default function Nav() {
  return (
    <nav className="my-0 mx-auto flex w-full max-w-4xl items-center justify-center p-8 md:my-8">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <div>
        <Link href="/" className="p-1 text-gray-900 hover:underline sm:p-4">
          Home
        </Link>
        <ExternalLink href={siteMetadata.linkedin}>Contact</ExternalLink>
        <ExternalLink href={siteMetadata.github}>GitHub</ExternalLink>
      </div>
    </nav>
  )
}
