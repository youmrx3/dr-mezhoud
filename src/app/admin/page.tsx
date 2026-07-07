"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Calendar,
  FileText,
  Activity,
  TrendingUp,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockAppointments, mockPatients, mockStats } from "@/lib/mock-data"

const weekData = [
  { jour: "Lun", consultations: 8, nouveaux: 2 },
  { jour: "Mar", consultations: 12, nouveaux: 3 },
  { jour: "Mer", consultations: 10, nouveaux: 1 },
  { jour: "Jeu", consultations: 14, nouveaux: 4 },
  { jour: "Ven", consultations: 9, nouveaux: 2 },
  { jour: "Sam", consultations: 0, nouveaux: 0 },
  { jour: "Dim", consultations: 0, nouveaux: 0 },
]

const monthData = [
  { mois: "Jan", patients: 15 },
  { mois: "Fév", patients: 18 },
  { mois: "Mar", patients: 22 },
  { mois: "Avr", patients: 19 },
  { mois: "Mai", patients: 25 },
  { mois: "Juin", patients: 28 },
]

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

export default function AdminDashboard() {
  const todayAppts = useMemo(
    () =>
      mockAppointments
        .filter((a) => a.status !== "CANCELLED")
        .sort(
          (a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        .slice(0, 5),
    []
  )

  const recentPatients = useMemo(
    () =>
      [...mockPatients]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 4),
    []
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-xl">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Aperçu de l&apos;activité du cabinet
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Patients actifs", valeur: mockStats.totalPatients.toString(), evolution: "+12%", icone: Users, color: "text-primary", bg: "bg-primary-light" },
          { label: "Consultations (mois)", valeur: mockStats.consultationsMois.toString(), evolution: "+5%", icone: Calendar, color: "text-info", bg: "bg-info-light" },
          { label: "Rendez-vous confirmés", valeur: mockStats.rdvConfirmes.toString(), evolution: "+8%", icone: FileText, color: "text-success", bg: "bg-success-light" },
          { label: "Taux d'occupation", valeur: `${mockStats.tauxOccupation}%`, evolution: "+3%", icone: Activity, color: "text-warning", bg: "bg-warning-light" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5 space-y-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icone className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.valeur}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className="text-xs text-success font-medium flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" />{stat.evolution}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-sm font-medium">Consultations de la semaine</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="jour" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)" }} />
                  <Bar dataKey="consultations" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="nouveaux" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-sm font-medium">Nouveaux patients (6 mois)</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="mois" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)" }} />
                  <Line type="monotone" dataKey="patients" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 4, fill: "var(--color-primary)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Prochains rendez-vous</h3>
              <span className="text-xs text-muted-foreground">{todayAppts.length} à venir</span>
            </div>
            <div className="space-y-3">
              {todayAppts.map((a) => (
                <div key={a.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-sm font-medium truncate">{a.patientNom} {a.patientPrenom}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(a.date).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })} — {a.startTime}
                    </p>
                    <p className="text-xs text-muted-foreground">{a.type}</p>
                  </div>
                  <Badge variant={statusColor[a.status]}>{statusLabel[a.status]}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Nouveaux patients</h3>
              <span className="text-xs text-muted-foreground">{mockStats.nouveauxPatientsMois} ce mois</span>
            </div>
            <div className="space-y-3">
              {recentPatients.map((p) => (
                <div key={p.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className="w-9 h-9 rounded-full bg-primary-light text-primary flex items-center justify-center text-sm font-medium shrink-0">
                    {p.id.slice(-2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.id}</p>
                    <p className="text-xs text-muted-foreground">Inscrit le {new Date(p.createdAt).toLocaleDateString("fr-FR")}</p>
                  </div>
                  <Badge variant="secondary">{p.sexe === "M" ? "Homme" : "Femme"}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
