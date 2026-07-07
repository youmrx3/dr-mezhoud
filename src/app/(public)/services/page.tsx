import type { Metadata } from "next"
import { ServicesListContent } from "./services-list-content"

export const metadata: Metadata = {
  title: "Services",
}

export default function ServicesPage() {
  return <ServicesListContent />
}
