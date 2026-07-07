import type { Metadata } from "next"
import { ParcoursContent } from "./parcours-content"

export const metadata: Metadata = {
  title: "Parcours de soins",
}

export default function ParcoursPage() {
  return <ParcoursContent />
}
