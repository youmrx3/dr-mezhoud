import type { Metadata } from "next"
import { AboutContent } from "./about-content"

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez le parcours du Dr Mezhoud Hadj, néphrologue à Alger",
}

export default function AboutPage() {
  return <AboutContent />
}
