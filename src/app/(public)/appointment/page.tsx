import type { Metadata } from "next"
import { AppointmentWizard } from "./appointment-wizard"

export const metadata: Metadata = {
  title: "Rendez-vous en ligne",
  description:
    "Prenez rendez-vous en ligne avec le Dr Mezhoud Hadj en quelques étapes",
}

export default function AppointmentPage() {
  return <AppointmentWizard />
}
