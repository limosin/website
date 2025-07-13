import Link from "next/link"
import { siteMetadata } from "@/lib/siteMetadata"
import { inter } from "@/lib/fonts"

const ExternalLink = ({ href, children }) => (
  <a className={`text-gray-500 transition hover:text-gray-600 ${inter.className}`} target="_blank" rel="noopener noreferrer" href={href}>
    {children}
  </a>
)

export default function Footer() {
  return (
    <footer className="mx-auto mb-8 flex w-full max-w-3xl flex-col items-start justify-center">
      <hr className="mb-8 w-full border border-gray-200" />

      <div className="grid w-full max-w-3xl grid-cols-1 pb-16 sm:grid-cols-3">
        <div className="flex flex-col items-center space-y-4">
          <Link href="/" className={`text-gray-500 transition hover:text-gray-600 ${inter.className}`}>
            Home
          </Link>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <ExternalLink href={siteMetadata.linkedin}>Contact</ExternalLink>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <ExternalLink href={siteMetadata.github}>GitHub</ExternalLink>
        </div>
      </div>
      <div className={`flex w-full justify-center text-center text-sm text-gray-500 ${inter.className}`}>
        © {new Date().getFullYear()} {siteMetadata.siteHostname}
      </div>
    </footer>
  )
}
