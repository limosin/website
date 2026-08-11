import Container from "@/components/Container"

const experience = [
  {
    company: "Agoda",
    period: "Jan 2026 — Present",
    role: "Senior Software Engineer",
    location: "Bangkok, Thailand",
    current: true,
  },
  {
    company: "Simpl",
    period: "Aug 2022 — Oct 2025",
    role: "Staff Software Engineer ← Senior ← SDE",
    location: "Bengaluru, India",
  },
  {
    company: "HSBC Technology India",
    period: "Sep 2020 — Aug 2022",
    role: "Senior Software Engineer ← Software Engineer",
    location: "Pune, India",
  },
  {
    company: "IDfy — Baldor Technologies",
    period: "Jun 2019 — Dec 2019",
    role: "Software Engineering Intern",
    location: "Mumbai, India",
  },
]

const skillGroups = [
  {
    index: "01",
    title: "Languages & frameworks",
    skills: ["Golang", "Java", "Python", "SQL", "Shell", "Gin", "Spring Boot", "FastAPI", "Django"],
  },
  {
    index: "02",
    title: "Data & infrastructure",
    skills: ["Kafka", "Flink", "Redis", "Airflow", "Graph databases", "NoSQL", "Spark", "MCPs"],
  },
  {
    index: "03",
    title: "Cloud & tools",
    skills: ["AWS", "GCP", "Docker", "Kubernetes", "Git", "OpenTelemetry", "LLMs"],
  },
]

const publications = [
  {
    title: "Sliding Mode Control of Ball-on-Wheel System",
    publisher: "ResearchGate",
    href: "https://www.researchgate.net/publication/339903920_Sliding_Mode_Control_of_Ball-on-Wheel_System",
  },
  {
    title: "Air Quality Monitoring and Analysis Network",
    publisher: "IEEE",
    href: "https://ieeexplore.ieee.org/document/9376497",
  },
]

export default function About() {
  return (
    <Container title="About — Limosyn" description="The person, path, and principles behind Limosyn.">
      <div className="atlas-secondary-shell">
        <header className="atlas-page-hero atlas-page-hero--about">
          <div className="atlas-page-index">
            <span>Plate</span>
            <strong>02</strong>
            <small>Profile</small>
          </div>

          <div className="atlas-page-title">
            <p className="atlas-kicker">The person behind the field notes</p>
            <h1>About the cartographer</h1>
            <p>I&apos;m Somil, a software engineer focused on scalable systems, useful abstractions, and solving complicated problems with clarity.</p>
          </div>

          <dl className="atlas-page-facts">
            <div>
              <dt>Currently</dt>
              <dd>Agoda</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>Bangkok</dd>
            </div>
            <div>
              <dt>Coordinates</dt>
              <dd>13.7563° N · 100.5018° E</dd>
            </div>
          </dl>
        </header>

        <div className="atlas-about-grid">
          <section className="atlas-about-section atlas-about-section--experience">
            <div className="atlas-secondary-heading">
              <div>
                <p className="atlas-kicker">Route history</p>
                <h2>Experience</h2>
              </div>
              <span>04 waypoints</span>
            </div>

            <div className="atlas-timeline">
              {experience.map((item, index) => (
                <article className="atlas-timeline-row" key={item.company}>
                  <span className={`atlas-timeline-marker ${item.current ? "is-current" : ""}`}>{(index + 1).toString().padStart(2, "0")}</span>
                  <div>
                    <h3>{item.company}</h3>
                    <p>{item.role}</p>
                  </div>
                  <div className="atlas-timeline-meta">
                    <span>{item.period}</span>
                    <small>{item.location}</small>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="atlas-about-section atlas-about-section--education">
            <div className="atlas-secondary-heading">
              <div>
                <p className="atlas-kicker">Origin point</p>
                <h2>Education</h2>
              </div>
              <span>2016 — 2020</span>
            </div>

            <article className="atlas-education-card">
              <span className="atlas-card-symbol" aria-hidden="true">
                ◇
              </span>
              <div>
                <h3>Birla Institute of Technology and Science</h3>
                <p>B.E. Hons in Electrical and Electronics</p>
                <small>Pilani, Rajasthan, India</small>
              </div>
            </article>
          </section>

          <section className="atlas-about-section atlas-about-section--publications">
            <div className="atlas-secondary-heading">
              <div>
                <p className="atlas-kicker">Published coordinates</p>
                <h2>Research</h2>
              </div>
              <span>02 papers</span>
            </div>

            <div className="atlas-publication-list">
              {publications.map((publication, index) => (
                <a href={publication.href} key={publication.title} target="_blank" rel="noopener noreferrer">
                  <span>{(index + 1).toString().padStart(2, "0")}</span>
                  <div>
                    <strong>{publication.title}</strong>
                    <small>{publication.publisher} publication</small>
                  </div>
                  <i aria-hidden="true">↗</i>
                </a>
              ))}
            </div>
          </section>

          <section className="atlas-about-section atlas-about-section--skills">
            <div className="atlas-secondary-heading">
              <div>
                <p className="atlas-kicker">Working vocabulary</p>
                <h2>Skills & tools</h2>
              </div>
              <span>03 regions</span>
            </div>

            <div className="atlas-skill-grid">
              {skillGroups.map((group) => (
                <article className="atlas-skill-card" key={group.title}>
                  <span>{group.index}</span>
                  <h3>{group.title}</h3>
                  <div>
                    {group.skills.map((skill) => (
                      <small key={skill}>{skill}</small>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Container>
  )
}
