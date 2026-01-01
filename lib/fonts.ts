import { Outfit } from "next/font/google"
import { Manrope } from "next/font/google"
import { JetBrains_Mono } from "next/font/google"
import { NextFont } from "next/dist/compiled/@next/font"

// Primary font for UI elements, navigation, and general content
export const outfit: NextFont = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-outfit",
})

// Secondary font for blog content and reading experience
export const manrope: NextFont = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  variable: "--font-manrope",
})

// Monospace font for code blocks and technical content
export const jetbrainsMono: NextFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false, // Loaded on-demand for code blocks
  variable: "--font-jetbrains-mono",
})
