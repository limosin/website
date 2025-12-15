interface Project {
  title: string
  description: string
  href: string
  imgSrc?: string
  github?: string
  techStack: string[]
}

const projectsData: Project[] = [
  {
    title: "The Civic Sherpa",
    description: `A platform for citizens to find and vote for their representatives.`,
    imgSrc: "https://res.cloudinary.com/dft5dlcya/image/upload/v1765806142/limosyn.com/projects/civic-sherpa%20thumbnail.png",
    href: "https://ai.studio/apps/drive/1xsHW4QXvfOl_bUs7O4ix72gdHsj-erun",
    github: "https://github.com/limosin/civil-sherpa",
    techStack: ["Typescript", "Gemini", "MongoDB"],
  },
  {
    title: "This Website",
    description: "A notion powered blog and personal portfolio",
    imgSrc: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "https://limosyn.com",
    github: "https://github.com/limosin/website",
    techStack: ["Next.js", "Tailwind CSS", "Typescript", "Notion"],
  },
]

export default projectsData
