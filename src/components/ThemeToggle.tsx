import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

const subscribe = () => () => undefined

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
  const { setTheme, resolvedTheme } = useTheme()

  if (!mounted) {
    return <span className="atlas-theme-toggle atlas-theme-toggle--loading" aria-hidden="true" />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button type="button" onClick={() => setTheme(isDark ? "light" : "dark")} className="atlas-theme-toggle" aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} aria-pressed={isDark}>
      <span className={!isDark ? "is-active" : ""} aria-hidden="true">
        ☼
      </span>
      <span className={isDark ? "is-active" : ""} aria-hidden="true">
        ◐
      </span>
    </button>
  )
}
