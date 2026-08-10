import { useMemo, useState } from "react"
import { InferGetStaticPropsType } from "next"
import Link from "next/link"

import Container from "@/components/Container"
import { BlogPost, getAllPublishedBlogPosts } from "@/lib/notion"
import { siteMetadata } from "@/lib/siteMetadata"

export const getStaticProps = async () => {
  const posts = await getAllPublishedBlogPosts(process.env.NOTION_BLOG_DATABASE_ID)

  return {
    props: { posts },
    revalidate: process.env.NODE_ENV === "production" ? 3600 : 1,
  }
}

type TopicKey = "all" | "distributed" | "patterns" | "ml" | "infrastructure" | "craft"

type TopicDefinition = {
  key: TopicKey
  label: string
  icon: string
  className: string
  match: (post: BlogPost) => boolean
}

const normalise = (value = "") => value.toLowerCase().replace(/[^a-z0-9]+/g, " ")

const hasAnyTag = (post: BlogPost, needles: string[]) => {
  const tags = (post.tags ?? []).map(normalise)
  return needles.some((needle) => tags.some((tag) => tag.includes(needle)))
}

const topics: TopicDefinition[] = [
  {
    key: "distributed",
    label: "Distributed systems",
    icon: "⌬",
    className: "atlas-node--distributed",
    match: (post) => hasAnyTag(post, ["system design", "kafka", "networks", "apis"]),
  },
  {
    key: "patterns",
    label: "Patterns",
    icon: "⌘",
    className: "atlas-node--patterns",
    match: (post) => hasAnyTag(post, ["design patterns", "software dev"]),
  },
  {
    key: "ml",
    label: "Machine learning",
    icon: "◌",
    className: "atlas-node--ml",
    match: (post) => hasAnyTag(post, ["ml", "machine learning"]),
  },
  {
    key: "infrastructure",
    label: "Infrastructure",
    icon: "▤",
    className: "atlas-node--infrastructure",
    match: (post) => hasAnyTag(post, ["devops", "kubernetes", "docker", "cloud"]),
  },
  {
    key: "craft",
    label: "Developer craft",
    icon: "</>",
    className: "atlas-node--craft",
    match: (post) => hasAnyTag(post, ["dev tools", "productivity", "web dev", "software dev", "testing"]),
  },
]

const formatDate = (date?: string) => {
  if (!date) return "Undated"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

const postMatchesSearch = (post: BlogPost, query: string) => {
  const searchable = [post.title, post.description, ...(post.tags ?? [])].join(" ").toLowerCase()
  return searchable.includes(query.trim().toLowerCase())
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [activeTopic, setActiveTopic] = useState<TopicKey>("all")
  const [query, setQuery] = useState("")

  const filteredPosts = useMemo(() => {
    const activeDefinition = topics.find((topic) => topic.key === activeTopic)

    return posts.filter((post) => {
      const matchesTopic = activeTopic === "all" || activeDefinition?.match(post)
      const matchesSearch = !query.trim() || postMatchesSearch(post, query)
      return matchesTopic && matchesSearch
    })
  }, [activeTopic, posts, query])

  const recentPosts = filteredPosts.slice(0, 5)

  const handleRandomBlog = () => {
    if (!posts.length) return
    const randomPost = posts[Math.floor(Math.random() * posts.length)]
    window.location.assign(`/posts/${randomPost.slug}`)
  }

  return (
    <Container title="The Knowledge Atlas — Limosyn" description={siteMetadata.description} image="/logo.png">
      <div className="atlas-shell">
        <section className="atlas-stage" aria-labelledby="atlas-title">
          <div className="atlas-map">
            <div className="atlas-intro">
              <p className="atlas-kicker">A field guide to building software</p>
              <h1 id="atlas-title">The Knowledge Atlas</h1>
              <p className="atlas-deck">A map of ideas about software, systems, and building well.</p>
              <p className="atlas-coordinates" aria-label="Digital atlas coordinates">
                18.5204° N&nbsp;&nbsp; 73.8567° E
              </p>
            </div>

            <div className="atlas-legend" aria-label="Map legend">
              <span>
                <i className="legend-mark legend-mark--hub" /> Hub
              </span>
              <span>
                <i className="legend-mark legend-mark--topic" /> Topic cluster
              </span>
              <span>
                <i className="legend-mark legend-mark--route" /> Connection
              </span>
              <span>
                <i className="legend-mark legend-mark--contour" /> Topography
              </span>
            </div>

            <div className="atlas-route atlas-route--north" aria-hidden="true" />
            <div className="atlas-route atlas-route--west" aria-hidden="true" />
            <div className="atlas-route atlas-route--east" aria-hidden="true" />
            <div className="atlas-route atlas-route--south-west" aria-hidden="true" />
            <div className="atlas-route atlas-route--south-east" aria-hidden="true" />

            <button className={`atlas-hub ${activeTopic === "all" ? "is-active" : ""}`} type="button" onClick={() => setActiveTopic("all")} aria-pressed={activeTopic === "all"}>
              <span className="atlas-hub-icon" aria-hidden="true">
                ◈
              </span>
              <strong>Systems</strong>
              <span>[ {posts.length} blogs ]</span>
            </button>

            {topics.map((topic) => {
              const topicPosts = posts.filter(topic.match)
              const leadPost = topicPosts[0]

              return (
                <button
                  key={topic.key}
                  className={`atlas-node ${topic.className} ${activeTopic === topic.key ? "is-active" : ""}`}
                  type="button"
                  onClick={() => setActiveTopic(topic.key)}
                  aria-pressed={activeTopic === topic.key}
                >
                  <span className="atlas-node-orbit" aria-hidden="true">
                    {topic.icon}
                  </span>
                  <span className="atlas-node-copy">
                    <strong>{topic.label}</strong>
                    <small>[ {topicPosts.length} blogs ]</small>
                    {leadPost && <em>{leadPost.title}</em>}
                  </span>
                </button>
              )
            })}
          </div>

          <aside className="atlas-recents" aria-labelledby="recent-essays">
            <div className="atlas-recents-heading">
              <div>
                <p className="atlas-kicker">Chronology</p>
                <h2 id="recent-essays">Recent blogs</h2>
              </div>
              <span>{filteredPosts.length.toString().padStart(2, "0")}</span>
            </div>

            <label className="atlas-search" htmlFor="essay-search">
              <span className="sr-only">Search blogs, topics, and ideas</span>
              <span aria-hidden="true">⌕</span>
              <input id="essay-search" type="search" placeholder="Search blogs, topics, ideas" value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>

            <div className="atlas-active-filter" aria-live="polite">
              <span>{activeTopic === "all" ? "All writing" : topics.find((topic) => topic.key === activeTopic)?.label}</span>
              {(activeTopic !== "all" || query) && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveTopic("all")
                    setQuery("")
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <div className="atlas-essay-list">
              {recentPosts.map((post) => (
                <Link key={post.id} href={`/posts/${post.slug}`} className="atlas-essay-row">
                  <span className="atlas-essay-date">{formatDate(post.date)}</span>
                  <strong>{post.title}</strong>
                  <span className="atlas-essay-meta">
                    {(post.tags ?? []).slice(0, 2).join(" · ") || "Blog"}
                    <i aria-hidden="true">↗</i>
                  </span>
                </Link>
              ))}

              {!recentPosts.length && (
                <div className="atlas-empty">
                  <strong>No matching coordinates.</strong>
                  <p>Try another term or reset the atlas.</p>
                </div>
              )}
            </div>

            <Link href="#all-essays" className="atlas-view-all">
              View all blogs <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </section>

        <section className="atlas-actions" aria-label="Explore Limosyn">
          <Link href={posts[0] ? `/posts/${posts[0].slug}` : "/"} className="atlas-action">
            <span className="atlas-action-icon" aria-hidden="true">
              ◒
            </span>
            <span>
              <strong>Start here</strong>
              <small>Begin with the newest field note.</small>
            </span>
            <i aria-hidden="true">→</i>
          </Link>

          <button type="button" className="atlas-action" onClick={handleRandomBlog}>
            <span className="atlas-action-icon" aria-hidden="true">
              ⠿
            </span>
            <span>
              <strong>Random blog</strong>
              <small>Explore an unexpected idea.</small>
            </span>
            <i aria-hidden="true">→</i>
          </button>

          <Link href="#all-essays" className="atlas-action">
            <span className="atlas-action-icon" aria-hidden="true">
              ▦
            </span>
            <span>
              <strong>Browse chronology</strong>
              <small>See every blog in sequence.</small>
            </span>
            <i aria-hidden="true">→</i>
          </Link>
        </section>

        <section className="atlas-archive" id="all-essays" aria-labelledby="all-essays-title">
          <div className="atlas-section-heading">
            <div>
              <p className="atlas-kicker">The complete index</p>
              <h2 id="all-essays-title">All blogs</h2>
            </div>
            <p>
              {filteredPosts.length} result{filteredPosts.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="atlas-archive-list">
            {filteredPosts.map((post, index) => (
              <Link key={post.id} href={`/posts/${post.slug}`} className="atlas-archive-row">
                <span>{(index + 1).toString().padStart(2, "0")}</span>
                <div>
                  <strong>{post.title}</strong>
                  <p>{post.description}</p>
                </div>
                <small>{formatDate(post.date)}</small>
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Container>
  )
}
