import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import { siteMetadata } from "@/lib/siteMetadata"
import ThemeToggle from "./ThemeToggle"

const links = [
  { href: "/", label: "Atlas" },
  { href: "/#all-essays", label: "Blogs" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
]

export default function Nav() {
  const router = useRouter()

  return (
    <header className="atlas-header">
      <nav className="atlas-nav" aria-label="Primary navigation">
        <a href="#skip" className="sr-only focus:not-sr-only">
          Skip to content
        </a>

        <Link href="/" className="atlas-brand" aria-label={`${siteMetadata.headerTitle}, home`}>
          <span className="atlas-brand-mark">
            <Image src="/logo/logo-light.png" alt="" width={54} height={54} className="block dark:hidden" priority />
            <Image src="/logo/logo-dark.png" alt="" width={54} height={54} className="hidden dark:block" priority />
          </span>
          <span className="atlas-brand-divider" aria-hidden="true" />
          <span className="atlas-brand-name">Limosyn.com</span>
        </Link>

        <div className="atlas-nav-links">
          {links.map((link) => {
            const isBlogAnchor = link.href.startsWith("/#")
            const hasBlogHash = router.asPath.includes("#all-essays") || router.asPath.includes("#essay-search")
            const isActive = link.href === "/" ? router.pathname === "/" && !hasBlogHash : isBlogAnchor ? router.pathname === "/" && hasBlogHash : router.pathname.startsWith(link.href)

            return (
              <Link key={link.label} href={link.href} className={isActive ? "is-active" : undefined} aria-current={isActive ? "page" : undefined}>
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="atlas-nav-tools">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
