import Container from "@/components/Container"
import ProjectCard from "@/components/ProjectCard"
import projectsData from "@/data/projectsData"

export default function Projects() {
  return (
    <Container title="Projects — Limosyn" description="Selected systems, products, and experiments built by Somil Singhai.">
      <div className="atlas-secondary-shell">
        <header className="atlas-page-hero atlas-page-hero--projects">
          <div className="atlas-page-index">
            <span>Plate</span>
            <strong>03</strong>
            <small>Projects</small>
          </div>

          <div className="atlas-page-title">
            <p className="atlas-kicker">Selected builds and experiments</p>
            <h1>Projects in the field</h1>
            <p>A working collection of products, experiments, and open-source systems—each one a record of learning by building.</p>
          </div>

          <dl className="atlas-page-facts">
            <div>
              <dt>Collection</dt>
              <dd>{projectsData.length.toString().padStart(2, "0")} projects</dd>
            </div>
            <div>
              <dt>Primary terrain</dt>
              <dd>Software systems</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Continuously mapped</dd>
            </div>
          </dl>
        </header>

        <section className="atlas-projects-section" aria-labelledby="featured-work-title">
          <div className="atlas-secondary-heading">
            <div>
              <p className="atlas-kicker">The project index</p>
              <h2 id="featured-work-title">Featured work</h2>
            </div>
            <span>{projectsData.length.toString().padStart(2, "0")} entries</span>
          </div>

          <div className="atlas-project-grid">
            {projectsData.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index + 1} />
            ))}
          </div>
        </section>
      </div>
    </Container>
  )
}
