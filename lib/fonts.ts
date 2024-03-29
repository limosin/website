import { Roboto } from "next/font/google"
import { Nunito } from "next/font/google"
import { Source_Code_Pro } from "next/font/google"
import { NextFont } from "next/dist/compiled/@next/font"

export const roboto: NextFont = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const nunito: NextFont = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const sourceCodePro: NextFont = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
})
