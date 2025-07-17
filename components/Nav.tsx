import Link from "next/link"
import { siteMetadata } from "@/lib/siteMetadata"
import Image from "next/image"
import LogoIcon from "public/logo-symbol.svg"
import { inter } from "@/lib/fonts"
import ThemeToggle from "./ThemeToggle"

const ExternalLink = ({ href, children }) => (
  <a
    className={`p-4 text-lg text-gray-900 dark:text-gray-100 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors ${inter.className}`}
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
)

export default function Nav() {
  return (
    <nav className="mx-auto my-0 flex max-w-3xl flex-row items-center justify-between px-4 py-8 md:px-0">
      <Link href="/" className="">
        <Image src={LogoIcon} alt="Limosyn.com" width="30"></Image>
      </Link>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="flex flex-row items-center justify-around sm:justify-center">
        <ExternalLink href={siteMetadata.linkedin}>Contact</ExternalLink>
        <ExternalLink href={siteMetadata.github}>GitHub</ExternalLink>
        <div className="ml-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
