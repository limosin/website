import Container from "@/components/Container"
import ProjectCard from "@/components/ProjectCard"
import projectsData from "@/data/projectsData"
import * as Separator from "@radix-ui/react-separator"
import { outfit, manrope } from "@/lib/fonts"

export default function Projects() {
  return (
    <Container>
      <div className="mx-auto mb-16 px-4 max-w-3xl">
        {/* Hero Section */}
        <div className="mb-16 md:mb-20 pt-8 md:pt-16">
          <h1
            className={`mb-4 pb-4 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl ${outfit.className} animate-gradient-text`}
          >
            Projects
          </h1>
          <div className="md:ml-auto md:max-w-md md:text-right">
            <p
              className={`text-lg text-gray-600 dark:text-gray-400 leading-relaxed animate-fade-in-up stagger-2 ${manrope.className}`}
            >
              A showcase of my projects and experiments.
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 animate-fade-in-up stagger-3">
          <h2
            className={`text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 ${manrope.className}`}
          >
            Featured Work
          </h2>
          <div className="flex-1 mx-6 h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
          <span className="text-sm text-gray-400 dark:text-gray-600 font-mono">
            {projectsData.length.toString().padStart(2, "0")} projects
          </span>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {projectsData.map((d, index) => (
            <div
              key={d.title}
              className={`animate-fade-in-up stagger-${Math.min(index + 4, 8)}`}
            >
              <ProjectCard
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                github={d.github}
                techStack={d.techStack}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
