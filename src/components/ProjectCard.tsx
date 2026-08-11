import Image from "next/image"

interface ProjectProps {
  index: number
  title: string
  description: string
  imgSrc?: string
  href: string
  github?: string
  techStack: string[]
}

const ProjectCard = ({ index, title, description, imgSrc, href, github, techStack }: ProjectProps) => (
  <article className="atlas-project-card">
    <div className="atlas-project-media">
      {imgSrc ? (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${title}`}>
          <Image alt="" src={imgSrc} className="atlas-project-image" fill sizes="(max-width: 768px) 100vw, 50vw" />
        </a>
      ) : (
        <span className="atlas-project-placeholder" aria-hidden="true">
          ◈
        </span>
      )}
      <span className="atlas-project-number">{index.toString().padStart(2, "0")}</span>
      <span className="atlas-project-status">Mapped project</span>
    </div>

    <div className="atlas-project-copy">
      <p className="atlas-kicker">Field record {index.toString().padStart(2, "0")}</p>
      <h2>{title}</h2>
      <p>{description}</p>

      <div className="atlas-project-stack" aria-label="Technology stack">
        {techStack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>

      <div className="atlas-project-actions">
        <a href={href} target="_blank" rel="noopener noreferrer">
          Visit project <span aria-hidden="true">↗</span>
        </a>
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer">
            View source <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </div>
  </article>
)

export default ProjectCard
