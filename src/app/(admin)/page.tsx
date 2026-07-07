"use client"

import { motion } from "framer-motion"
import { Users, Calendar, FileText, Activity } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    label: "Patients actifs",
    valeur: "1 247",
    evolution: "+12%",
    icone: Users,
    color: "text-primary",
    bg: "bg-primary-light",
  },
  {
    label: "Rendez-vous (mois)",
    valeur: "89",
    evolution: "+5%",
    icone: Calendar,
    color: "text-info",
    bg: "bg-info-light",
  },
  {
    label: "Articles",
    valeur: "12",
    evolution: "+2",
    icone: FileText,
    color: "text-success",
    bg: "bg-success-light",
  },
  {
    label: "Taux d'occupation",
    valeur: "78%",
    evolution: "+8%",
    icone: Activity,
    color: "text-warning",
    bg: "bg-warning-light",
  },
]

export default function AdminDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-h2">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Aperçu de l&apos;activité du cabinet
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5 space-y-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icone className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.valeur}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className="text-xs text-success font-medium">{stat.evolution}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Prochains rendez-vous</h3>
            <div className="space-y-3">
              {[
                { patient: "Fatima Z.", heure: "09h00", motif: "Suivi MRC" },
                { patient: "Mohamed K.", heure: "10h30", motif: "Hypertension" },
                { patient: "Sarah B.", heure: "14h00", motif: "Bilan post-greffe" },
              ].map((rdv) => (
                <div
                  key={rdv.patient}
                  className="flex items-center justify-between p-3 rounded-lg bg-surface"
                >
                  <div>
                    <p className="text-sm font-medium">{rdv.patient}</p>
                    <p className="text-xs text-muted-foreground">{rdv.motif}</p>
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary-light px-2 py-1 rounded-pill">
                    {rdv.heure}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Notifications récentes</h3>
            <div className="space-y-3">
              {[
                { message: "Nouveau patient inscrit", time: "Il y a 2h", type: "info" },
                { message: "Rendez-vous confirmé pour demain", time: "Il y a 3h", type: "success" },
                { message: "Annulation de rendez-vous", time: "Il y a 5h", type: "warning" },
              ].map((notif) => (
                <div
                  key={notif.message}
                  className="flex items-start gap-3 p-3 rounded-lg bg-surface"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      notif.type === "info"
                        ? "bg-info"
                        : notif.type === "success"
                          ? "bg-success"
                          : "bg-warning"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{notif.message}</p>
                    <p className="text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
