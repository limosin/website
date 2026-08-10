import { describe, expect, it } from "vitest"

import { getSafeLinkUrl, getSafeWebUrl, toAbsoluteSiteUrl, toCanonicalUrl, toIsoDate } from "./urls"

describe("URL helpers", () => {
  it("accepts safe web URLs and rejects credentials or unsafe protocols", () => {
    expect(getSafeWebUrl("https://example.com/path")?.hostname).toBe("example.com")
    expect(getSafeWebUrl("https://user:password@example.com")).toBeNull()
    expect(getSafeWebUrl("javascript:alert(1)")).toBeNull()
    expect(getSafeWebUrl("/relative")).toBeNull()
  })

  it("normalizes internal links and permits mail links", () => {
    expect(getSafeLinkUrl("/about")).toBe("https://limosyn.com/about")
    expect(getSafeLinkUrl("mailto:somil@limosyn.com")).toBe("mailto:somil@limosyn.com")
    expect(getSafeLinkUrl("data:text/html,test")).toBeNull()
  })

  it("preserves absolute social images and resolves relative ones", () => {
    expect(toAbsoluteSiteUrl("https://images.example.com/card.png")).toBe("https://images.example.com/card.png")
    expect(toAbsoluteSiteUrl("/logo.png")).toBe("https://limosyn.com/logo.png")
  })

  it("removes query strings and fragments from canonical URLs", () => {
    expect(toCanonicalUrl("/posts/example?preview=true#section")).toBe("https://limosyn.com/posts/example")
  })

  it("serializes valid dates and ignores invalid ones", () => {
    expect(toIsoDate("2026-08-10")).toBe("2026-08-10T00:00:00.000Z")
    expect(toIsoDate("not-a-date")).toBeUndefined()
  })
})
