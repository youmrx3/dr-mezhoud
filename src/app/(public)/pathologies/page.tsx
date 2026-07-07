import type { Metadata } from "next"
import { PathologiesContent } from "./pathologies-content"

export const metadata: Metadata = {
  title: "Pathologies",
}

export default function PathologiesPage() {
  return <PathologiesContent />
}
