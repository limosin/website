import Container from "@/components/Container"
import * as Separator from "@radix-ui/react-separator"
import { outfit, manrope } from "@/lib/fonts"

const About = () => {
  return (
    <Container>
      <div className="mx-auto mb-16 px-4 max-w-3xl">
        {/* Hero Section */}
        <div className="mb-20 md:mb-24 pt-8 md:pt-16">
          <h1
            className={`mb-6 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl ${outfit.className} animate-gradient-text`}
          >
            About Me
          </h1>
          <div className="md:ml-auto md:max-w-md md:text-right">
            <p
              className={`text-lg text-gray-600 dark:text-gray-400 leading-relaxed animate-fade-in-up stagger-2 ${manrope.className}`}
            >
              Software Engineer with a passion for building scalable systems and solving complex problems.
            </p>
          </div>
        </div>

        {/* Education Section */}
        <section className="mb-16 animate-fade-in-up stagger-3">
          <div className="flex items-center justify-between mb-8">
            <h2
              className={`text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 ${manrope.className}`}
            >
              Education
            </h2>
            <div className="flex-1 mx-6 h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
            <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <div className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
              <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${outfit.className}`}>
                Birla Institute of Technology and Science
              </h3>
              <span className="text-teal-600 dark:text-teal-400 font-medium whitespace-nowrap bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded-full text-sm mt-2 md:mt-0 w-fit">
                Aug. 2016 – May 2020
              </span>
            </div>
            <p className={`text-gray-700 dark:text-gray-300 font-medium mb-1 ${manrope.className}`}>
              B.E. Hons in Electrical and Electronics
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">Pilani, Rajasthan, India</p>
          </div>
        </section>

        <Separator.Root className="h-px bg-gray-100 dark:bg-gray-800 mb-16" decorative />

        {/* Experience Section */}
        <section className="mb-16 animate-fade-in-up stagger-4">
          <div className="flex items-center justify-between mb-8">
            <h2
              className={`text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 ${manrope.className}`}
            >
              Experience
            </h2>
            <div className="flex-1 mx-6 h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <div className="relative pl-8 border-l border-gray-200 dark:border-gray-800 space-y-12 ml-3">
            {/* Agoda */}
            <div className="relative">
              <span className="absolute -left-[43px] top-1 h-5 w-5 rounded-full border-4 border-white bg-teal-500 dark:border-black dark:bg-teal-500 ring-4 ring-teal-500/20 dark:ring-teal-500/20 animate-ping" />
              <span className="absolute -left-[43px] top-1 h-5 w-5 rounded-full border-4 border-white bg-indigo-500 dark:border-black dark:bg-indigo-500 ring-4 ring-indigo-500/20 dark:ring-indigo-500/20" />
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${outfit.className}`}>
                  Agoda
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 w-fit">
                  Jan 2026 – Present
                </span>
              </div>
              <div className="text-teal-600 dark:text-teal-400 font-medium mb-1">Senior Software Engineer</div>
              <p className="text-gray-500 text-sm">Bangkok, Thailand</p>
            </div>

            {/* Simpl */}
            <div className="relative">
              <span className="absolute -left-[43px] top-1 h-5 w-5 rounded-full border-4 border-white bg-indigo-500 dark:border-black dark:bg-indigo-500 ring-4 ring-indigo-500/20 dark:ring-indigo-500/20" />
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${outfit.className}`}>
                  Simpl
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 w-fit">
                  Aug 2022 – Oct 2025
                </span>
              </div>
              <div className="text-blue-600 dark:text-blue-400 font-medium mb-1">Staff Software Engineer ← Senior ← SDE</div>
              <p className="text-gray-500 text-sm">Bengaluru, India</p>
            </div>

            {/* HSBC */}
            <div className="relative">
              <span className="absolute -left-[43px] top-1 h-5 w-5 rounded-full border-4 border-white bg-indigo-500 dark:border-black dark:bg-indigo-500 ring-4 ring-indigo-500/20 dark:ring-indigo-500/20" />
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${outfit.className}`}>
                  HSBC Technology India
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 w-fit">
                  Sep 2020 – Aug 2022
                </span>
              </div>
              <div className="text-indigo-600 dark:text-indigo-400 font-medium mb-1">Senior Software Engineer ← Software Engineer</div>
              <p className="text-gray-500 text-sm">Pune, India</p>
            </div>

            {/* IDfy */}
            <div className="relative">
              <span className="absolute -left-[43px] top-1 h-5 w-5 rounded-full border-4 border-white bg-purple-500 dark:border-black dark:bg-purple-500 ring-4 ring-purple-500/20 dark:ring-purple-500/20" />
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${outfit.className}`}>
                  IDfy - Baldor Technologies
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 w-fit">
                  Jun 2019 – Dec 2019
                </span>
              </div>
              <div className="text-purple-600 dark:text-purple-400 font-medium mb-1">Software Engineering Intern</div>
              <p className="text-gray-500 text-sm">Mumbai, India</p>
            </div>
          </div>
        </section>

        <Separator.Root className="h-px bg-gray-100 dark:bg-gray-800 mb-16" decorative />

        {/* Skills Section */}
        <section className="mb-16 animate-fade-in-up stagger-5">
          <div className="flex items-center justify-between mb-8">
            <h2
              className={`text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 ${manrope.className}`}
            >
              Skills
            </h2>
            <div className="flex-1 mx-6 h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <div className="space-y-8">
            {/* Languages & Frameworks */}
            <div>
              <h3 className={`text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center ${outfit.className}`}>
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-3" />
                Languages & Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Golang", "Java", "Python", "SQL", "Shell", "Gin", "Springboot", "FastAPI", "Django"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-800 transition-colors hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <Separator.Root className="h-px bg-gray-100 dark:bg-gray-800" decorative />

            {/* Data & Infra */}
            <div>
              <h3 className={`text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center ${outfit.className}`}>
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                Data & Infra
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Kafka", "Flink", "Redis", "Airflow", "GraphDBs", "SQL", "NoSQL", "Spark", "MCPs"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-800 transition-colors hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <Separator.Root className="h-px bg-gray-100 dark:bg-gray-800" decorative />

            {/* Cloud & Tools */}
            <div>
              <h3 className={`text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center ${outfit.className}`}>
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                Cloud & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {["AWS", "GCP", "Docker", "K8s", "Git", "OpenTelemetry", "LLMs"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-800 transition-colors hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator.Root className="h-px bg-gray-100 dark:bg-gray-800 mb-16" decorative />

        {/* Publications Section */}
        <section className="animate-fade-in-up stagger-6">
          <div className="flex items-center justify-between mb-8">
            <h2
              className={`text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 ${manrope.className}`}
            >
              Publications
            </h2>
            <div className="flex-1 mx-6 h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
            <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>

          <div className="space-y-4">
            <a
              href="https://www.researchgate.net/publication/339903920_Sliding_Mode_Control_of_Ball-on-Wheel_System"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-teal-500 dark:hover:border-teal-500 transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <span className={`text-2xl font-bold text-gray-200 dark:text-gray-800 group-hover:text-teal-600 transition-colors ${outfit.className}`}>
                  01
                </span>
                <div>
                  <h3 className={`text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors ${outfit.className}`}>
                    Sliding Mode Control of Ball-on-Wheel System
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ResearchGate Publication</p>
                </div>
              </div>
            </a>

            <a
              href="https://ieeexplore.ieee.org/document/9376497"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-teal-500 dark:hover:border-teal-500 transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <span className={`text-2xl font-bold text-gray-200 dark:text-gray-800 group-hover:text-teal-600 transition-colors ${outfit.className}`}>
                  02
                </span>
                <div>
                  <h3 className={`text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors ${outfit.className}`}>
                    Air Quality Monitoring and Analysis Network
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">IEEE Publication</p>
                </div>
              </div>
            </a>
          </div>
        </section>
      </div>
    </Container>
  )
}

export default About
