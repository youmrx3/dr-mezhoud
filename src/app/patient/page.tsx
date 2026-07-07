"use client"

import { useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Calendar,
  FileText,
  Apple,
  Clock,
  ArrowRight,
  Plus,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/mock-auth-context"
import {
  mockPatients,
  mockAppointments,
  mockDietPlans,
  mockDocuments,
} from "@/lib/mock-data"

const statusLabel: Record<string, string> = {
  SCHEDULED: "Planifié",
  CONFIRMED: "Confirmé",
  CANCELLED: "Annulé",
  COMPLETED: "Effectué",
}

const statusColor: Record<string, "warning" | "success" | "danger" | "info"> = {
  SCHEDULED: "warning",
  CONFIRMED: "success",
  CANCELLED: "danger",
  COMPLETED: "info",
}

export default function PatientDashboardPage() {
  const { user } = useAuth()
  const patient = useMemo(
    () => mockPatients.find((p) => p.userId === user?.email),
    [user]
  )
  const patientId = patient?.id

  const appointments = useMemo(
    () => mockAppointments.filter((a) => a.patientId === patientId),
    [patientId]
  )
  const dietPlans = useMemo(
    () => mockDietPlans.filter((p) => p.patientId === patientId),
    [patientId]
  )
  const documents = useMemo(
    () => mockDocuments.filter((d) => d.patientId === patientId),
    [patientId]
  )

  const nextAppt = useMemo(
    () =>
      appointments
        .filter((a) => a.status !== "CANCELLED" && a.status !== "COMPLETED")
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0],
    [appointments]
  )

  const upcoming = useMemo(
    () =>
      appointments
        .filter((a) => a.status !== "CANCELLED" && a.status !== "COMPLETED")
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 4),
    [appointments]
  )

  const recentDocs = useMemo(
    () =>
      [...documents]
        .sort(
          (a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        )
        .slice(0, 3),
    [documents]
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Bienvenue dans votre espace patient
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Prochain RDV</span>
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xl font-medium">
                {nextAppt
                  ? new Date(nextAppt.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                    })
                  : "—"}
              </p>
              <p className="text-xs text-muted-foreground">
                {nextAppt
                  ? `${nextAppt.startTime} — ${nextAppt.type}`
                  : "Aucun rendez-vous"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Total RDV
                </span>
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xl font-medium">{appointments.length}</p>
              <p className="text-xs text-muted-foreground">
                {appointments.filter((a) => a.status === "COMPLETED").length}{" "}
                effectués
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Documents</span>
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xl font-medium">{documents.length}</p>
              <p className="text-xs text-muted-foreground">
                {documents.length} fichier{documents.length > 1 ? "s" : ""}{" "}
                téléchargé{documents.length > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Régimes
                </span>
                <Apple className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xl font-medium">{dietPlans.length}</p>
              <p className="text-xs text-muted-foreground">
                Plan{dietPlans.length > 1 ? "s" : ""} alimentaire{dietPlans.length > 1 ? "s" : ""}{" "}
                actif{dietPlans.length > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Prochains rendez-vous</h2>
              <Link
                href="/patient/appointments"
                className="text-xs text-primary hover:underline"
              >
                Voir tout
              </Link>
            </div>
            {upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Aucun rendez-vous à venir
              </p>
            ) : (
              <div className="space-y-3">
                {upcoming.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">{a.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(a.date).toLocaleDateString("fr-FR", {
                          weekday: "short",
                          day: "numeric",
                          month: "long",
                        })}{" "}
                        — {a.startTime}
                      </p>
                    </div>
                    <Badge variant={statusColor[a.status]}>
                      {statusLabel[a.status]}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Activité récente</h2>
              <Link
                href="/patient/documents"
                className="text-xs text-primary hover:underline"
              >
                Voir tout
              </Link>
            </div>
            {recentDocs.length === 0 && upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Aucune activité récente
              </p>
            ) : (
              <div className="space-y-3">
                {recentDocs.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{d.titre}</p>
                      <p className="text-xs text-muted-foreground">
                        {d.type} ·{" "}
                        {new Date(d.uploadedAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/patient/appointments">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Prendre un rendez-vous
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="/patient/documents">
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un document
          </Button>
        </Link>
        <Link href="/patient/diet-plans">
          <Button variant="outline" className="gap-2">
            <Apple className="h-4 w-4" />
            Voir mes régimes
          </Button>
        </Link>
      </div>
    </div>
  )
}
