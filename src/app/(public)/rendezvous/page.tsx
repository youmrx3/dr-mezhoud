import type { Metadata } from "next"
import { RendezVousContent } from "./rendezvous-content"

export const metadata: Metadata = {
  title: "Rendez-vous",
}

export default function RendezVousPage() {
  return <RendezVousContent />
}
