import type { Metadata } from "next"
import { AboutContent } from "./about-content"

export const metadata: Metadata = {
  title: "À propos",
}

export default function AProposPage() {
  return <AboutContent />
}
