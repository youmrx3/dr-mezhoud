"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Check, X, CheckCheck, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { mockAppointments } from "@/lib/mock-data"

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

export default function AdminAppointmentsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [appointments, setAppointments] = useState(mockAppointments)

  const filtered = useMemo(
    () =>
      appointments.filter((a) => {
        const matchSearch =
          !search ||
          a.patientNom.toLowerCase().includes(search.toLowerCase()) ||
          a.patientPrenom.toLowerCase().includes(search.toLowerCase()) ||
          a.type.toLowerCase().includes(search.toLowerCase())
        const matchStatus = !statusFilter || a.status === statusFilter
        return matchSearch && matchStatus
      }),
    [appointments, search, statusFilter]
  )

  function updateStatus(id: string, status: string) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: status as typeof a.status } : a))
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-xl">Rendez-vous</h1>
        <p className="text-sm text-muted-foreground mt-1">Gérez les consultations</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="">Tous les statuts</option>
          <option value="SCHEDULED">Planifié</option>
          <option value="CONFIRMED">Confirmé</option>
          <option value="COMPLETED">Effectué</option>
          <option value="CANCELLED">Annulé</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">Aucun rendez-vous trouvé</CardContent></Card>
        ) : (
          filtered.map((a) => (
            <Card key={a.id}>
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-sm font-medium">{a.patientNom} {a.patientPrenom}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(a.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} — {a.startTime} à {a.endTime}
                  </p>
                  <p className="text-xs text-muted-foreground">{a.type}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={statusColor[a.status]}>{statusLabel[a.status]}</Badge>
                  {a.status === "SCHEDULED" && (
                    <>
                      <Button variant="ghost" size="sm" className="h-8 gap-1 text-success hover:text-success hover:bg-success-light" onClick={() => updateStatus(a.id, "CONFIRMED")}>
                        <Check className="h-3.5 w-3.5" />Confirmer
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1 text-danger hover:text-danger hover:bg-danger-light" onClick={() => updateStatus(a.id, "CANCELLED")}>
                        <X className="h-3.5 w-3.5" />Annuler
                      </Button>
                    </>
                  )}
                  {a.status === "CONFIRMED" && (
                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-info hover:text-info hover:bg-info-light" onClick={() => updateStatus(a.id, "COMPLETED")}>
                      <CheckCheck className="h-3.5 w-3.5" />Terminer
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </motion.div>
  )
}
