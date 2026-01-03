import Container from "@/components/Container"
import ProjectCard from "@/components/ProjectCard"
import projectsData from "@/data/projectsData"
import { outfit } from "@/lib/fonts"

export default function Projects() {
  return (
    <Container>
      <div className="mx-auto mb-16 px-4 max-w-3xl">
        <div className="mb-12 text-center">
          <h1
            className={`mx-auto mb-4 w-full text-4xl font-bold tracking-tight text-black dark:text-white md:text-6xl lg:text-7xl font-sans transition-colors ${outfit.className}`}
          >
            Projects
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed transition-colors">
            A showcase of my projects and experiments.
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {projectsData.map((d) => (
              <ProjectCard
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                github={d.github}
                techStack={d.techStack}
              />
            ))}
        </div>
      </div>
    </Container>
  )
}
