import { mkdir, readFile } from "node:fs/promises"
import { spawn } from "node:child_process"
import path from "node:path"

const url = process.env.LIGHTHOUSE_URL || "http://localhost:3000"
const runs = Number.parseInt(process.env.LIGHTHOUSE_RUNS || "3", 10)
const reportDirectory = path.resolve(".lighthouse")
const thresholds = {
  performance: { minimum: 0.9, severity: "warning" },
  accessibility: { minimum: 0.9, severity: "error" },
  "best-practices": { minimum: 0.9, severity: "error" },
  seo: { minimum: 0.9, severity: "error" },
}

if (!Number.isInteger(runs) || runs < 1) {
  throw new Error("LIGHTHOUSE_RUNS must be a positive integer")
}

await mkdir(reportDirectory, { recursive: true })

const runLighthouse = (args) =>
  new Promise((resolve, reject) => {
    const command = process.platform === "win32" ? "lighthouse.cmd" : "lighthouse"
    const child = spawn(command, args, { stdio: "inherit" })

    child.on("error", reject)
    child.on("close", (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Lighthouse exited with code ${code}`))
    })
  })

const scores = Object.fromEntries(Object.keys(thresholds).map((category) => [category, []]))

for (let index = 1; index <= runs; index += 1) {
  const reportBase = path.join(reportDirectory, `run-${index}`)
  console.log(`\nRunning Lighthouse audit ${index} of ${runs} against ${url}`)

  await runLighthouse([url, "--only-categories=performance,accessibility,best-practices,seo", "--output=json", "--output=html", `--output-path=${reportBase}`, "--chrome-flags=--no-sandbox"])

  const report = JSON.parse(await readFile(`${reportBase}.report.json`, "utf8"))
  for (const category of Object.keys(thresholds)) {
    scores[category].push(report.categories[category]?.score ?? 0)
  }
}

let failed = false
console.log("\nAverage Lighthouse scores:")
for (const [category, { minimum, severity }] of Object.entries(thresholds)) {
  const average = scores[category].reduce((total, score) => total + score, 0) / scores[category].length
  const percent = Math.round(average * 100)
  const required = Math.round(minimum * 100)
  const status = average >= minimum ? "PASS" : severity === "error" ? "FAIL" : "WARN"
  console.log(`  ${status.padEnd(4)} ${category}: ${percent}/100 (minimum ${required})`)
  failed ||= severity === "error" && average < minimum
}

if (failed) {
  process.exitCode = 1
}
