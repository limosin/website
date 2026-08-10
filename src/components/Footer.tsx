import Link from "next/link"

import { siteMetadata } from "@/lib/siteMetadata"

export default function Footer() {
  return (
    <footer className="atlas-footer">
      <div className="atlas-footer-inner">
        <div>
          <p className="atlas-footer-brand">Limosyn</p>
          <p>Independent notes on software, systems, and the craft of building.</p>
        </div>

        <div className="atlas-footer-links" aria-label="Footer links">
          <Link href="/">Atlas</Link>
          <Link href="/#all-essays">Blogs</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>
        </div>

        <div className="atlas-footer-links" aria-label="Social links">
          <a href={siteMetadata.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={siteMetadata.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${siteMetadata.email}`}>Email</a>
        </div>

        <div className="atlas-footer-meta">
          <span>© {new Date().getFullYear()} Somil Singhai</span>
          <span>18.5204° N · 73.8567° E</span>
        </div>
      </div>
    </footer>
  )
}
