import type { Metadata } from "next"
import { FAQContent } from "./faq-content"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes sur le cabinet de néphrologie du Dr Mezhoud Hadj",
}

export default function FAQPage() {
  return <FAQContent />
}
