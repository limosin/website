import Link from "next/link"
import { siteMetadata } from "@/lib/siteMetadata"
import Image from "next/image"
import LogoIcon from "public/logo-symbol.svg"

const ExternalLink = ({ href, children }) => (
  <a className="p-4 text-lg text-gray-900 hover:text-teal-600" target="_blank" rel="noopener noreferrer" href={href}>
    {children}
  </a>
)

export default function Nav() {
  return (
    <nav className="mx-auto my-0 flex max-w-2xl flex-row items-center justify-between px-4 py-8 md:px-0">
      <Link href="/" className="">
        <Image src={LogoIcon} alt="Limosyn.com" width="30"></Image>
      </Link>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="flex flex-row justify-around sm:justify-center">
        <Link href="/" className="hidden p-4 text-lg text-gray-900 hover:text-teal-600 sm:block">
          Home
        </Link>
        <ExternalLink href={siteMetadata.linkedin}>Contact</ExternalLink>
        <ExternalLink href={siteMetadata.github}>GitHub</ExternalLink>
      </div>
    </nav>
  )
}
