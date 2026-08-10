import { JetBrains_Mono, Manrope, Outfit, Source_Serif_4, Syne } from "next/font/google"
import { NextFontWithVariable } from "next/dist/compiled/@next/font"

// Display font - Bold geometric typeface for headlines
export const syne: NextFontWithVariable = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  variable: "--font-syne",
})

// Primary font for UI elements, navigation, and general content
export const outfit: NextFontWithVariable = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-outfit",
})

// Secondary font for blog content and reading experience
export const manrope: NextFontWithVariable = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-manrope",
})

// Monospace font for code blocks and technical content
export const jetbrainsMono: NextFontWithVariable = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false, // Loaded on-demand for code blocks
  variable: "--font-jetbrains-mono",
})

// Editorial serif used throughout the Knowledge Atlas visual system
export const sourceSerif: NextFontWithVariable = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-source-serif",
})
