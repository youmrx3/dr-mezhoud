import type { Metadata } from "next"
import { CabinetContent } from "./cabinet-content"

export const metadata: Metadata = {
  title: "Le Cabinet",
}

export default function CabinetPage() {
  return <CabinetContent />
}
