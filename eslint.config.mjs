import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    files: ["next.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", ".notion-cache/**", "next-env.d.ts"]),
])
