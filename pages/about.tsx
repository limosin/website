import Container from "@/components/Container"
import { inter } from "@/lib/fonts"

const About = () => {
  return (
    <Container>
      <div className="mx-auto mb-16 px-4 max-w-3xl">
        <div className="mb-24 text-center">
          <h1
            className={`mx-auto mb-4 w-full text-4xl font-bold tracking-tight text-black dark:text-white md:text-6xl lg:text-7xl font-sans transition-colors ${inter.className}`}
          >
            About Me
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed transition-colors">
            Staff Software Engineer with a passion for building scalable systems and solving complex problems.
          </p>
        </div>

        {/* Education Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg mr-4">
              <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <h2 className={`text-3xl font-bold text-gray-900 dark:text-white ${inter.className}`}>Education</h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Birla Institute of Technology and Science</h3>
              <span className="text-teal-600 dark:text-teal-400 font-medium whitespace-nowrap bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded-full text-sm mt-2 md:mt-0 w-fit">Aug. 2016 – May 2020</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">B.E. Hons in Electrical and Electronics</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Pilani, Rajasthan, India</p>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className={`text-3xl font-bold text-gray-900 dark:text-white ${inter.className}`}>Experience</h2>
          </div>

          <div className="space-y-8">
            {/* Simpl */}
            <div className="relative pl-8 border-l-2 border-teal-200 dark:border-teal-800 space-y-8">
              <div className="relative">
                <div className="absolute -left-[41px] bg-white dark:bg-black border-4 border-teal-500 rounded-full w-5 h-5"></div>
                <div className="mb-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Simpl</h3>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">Aug 2022 – Oct 2025</span>
                  </div>
                  <div className="text-teal-600 dark:text-teal-400 font-medium mt-1">Staff Software Engineer ← Senior Software Engineer ← Software Engineer</div>
                  <div className="text-gray-500 dark:text-gray-500 text-sm">Bengaluru, India</div>
                </div>
              </div>

              {/* HSBC */}
              <div className="relative">
                <div className="absolute -left-[41px] bg-white dark:bg-black border-4 border-blue-500 rounded-full w-5 h-5"></div>
                <div className="mb-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">HSBC Technology India</h3>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">Sep 2020 – Aug 2022</span>
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 font-medium mt-1">Senior Software Engineer ← Software Engineer</div>
                  <div className="text-gray-500 dark:text-gray-500 text-sm">Pune, India</div>
                </div>
              </div>

               {/* IDfy */}
               <div className="relative">
                <div className="absolute -left-[41px] bg-white dark:bg-black border-4 border-purple-500 rounded-full w-5 h-5"></div>
                <div className="mb-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">IDfy - Baldor Technologies</h3>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">Jun 2019 – Dec 2019</span>
                  </div>
                  <div className="text-purple-600 dark:text-purple-400 font-medium mt-1">Software Engineering Intern</div>
                  <div className="text-gray-500 dark:text-gray-500 text-sm">Mumbai, India</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-4">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className={`text-3xl font-bold text-gray-900 dark:text-white ${inter.className}`}>Skills</h2>
          </div>
          <div className="bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                  Languages & Frameworks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Golang", "Java", "Python", "SQL", "Shell", "Gin", "Springboot", "FastAPI", "Django"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Data & Infra
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Kafka", "Flink", "Redis", "Airflow", "GraphDBs", "SQL", "NoSQL", "Spark", "MCPs"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Cloud & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["AWS", "GCP", "Docker", "K8s", "Git", "OpenTelemetry", "LLMs"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications/Others Section */}
        <section>
          <div className="flex items-center mb-8">
             <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg mr-4">
              <svg className="w-8 h-8 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className={`text-3xl font-bold text-gray-900 dark:text-white ${inter.className}`}>Publications</h2>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/10 dark:to-orange-900/10 rounded-2xl p-8 border border-pink-100 dark:border-pink-900/30">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2 text-xl">•</span>
                <a href="https://www.researchgate.net/publication/339903920_Sliding_Mode_Control_of_Ball-on-Wheel_System" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 text-lg hover:text-pink-600 dark:hover:text-pink-400 underline transition-colors">
                  Sliding motor control of ball on wheel system
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2 text-xl">•</span>
                <a href="https://ieeexplore.ieee.org/document/9376497" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 text-lg hover:text-pink-600 dark:hover:text-pink-400 underline transition-colors">
                  Air Quality Monitoring and Analysis Network
                </a>
              </li>
            </ul>
          </div>
        </section>

      </div>
    </Container>
  )
}

export default About
