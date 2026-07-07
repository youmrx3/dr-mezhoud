"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useAuth } from "@/lib/mock-auth-context"
import { mockAppointments, mockPatients } from "@/lib/mock-data"

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

function cancelAppointment(id: string) {
  const a = mockAppointments.find((a) => a.id === id)
  if (a) a.status = "CANCELLED"
}

export default function AppointmentsPage() {
  const { user } = useAuth()
  const [refreshKey, setRefreshKey] = useState(0)

  const patient = useMemo(
    () => mockPatients.find((p) => p.userId === user?.email),
    [user]
  )

  const allAppointments = useMemo(
    () =>
      [...mockAppointments]
        .filter((a) => a.patientId === patient?.id)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [patient, refreshKey]
  )

  const upcoming = useMemo(
    () =>
      allAppointments.filter(
        (a) => a.status !== "CANCELLED" && a.status !== "COMPLETED"
      ),
    [allAppointments]
  )

  const past = useMemo(
    () =>
      allAppointments.filter(
        (a) => a.status === "CANCELLED" || a.status === "COMPLETED"
      ),
    [allAppointments]
  )

  function handleCancel(id: string) {
    cancelAppointment(id)
    setRefreshKey((k) => k + 1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl">Mes rendez-vous</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gérez vos consultations et suivis
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">
            À venir ({upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Passés ({past.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            Tous ({allAppointments.length})
          </TabsTrigger>
        </TabsList>

        {(["upcoming", "past", "all"] as const).map((tab) => {
          const items =
            tab === "upcoming"
              ? upcoming
              : tab === "past"
                ? past
                : allAppointments

          return (
            <TabsContent key={tab} value={tab} className="mt-4">
              {items.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-sm text-muted-foreground">
                    Aucun rendez-vous dans cette catégorie
                  </CardContent>
                </Card>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  {items.map((a) => (
                    <Card key={a.id}>
                      <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 space-y-0.5">
                            <p className="text-sm font-medium">{a.type}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(a.date).toLocaleDateString("fr-FR", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}{" "}
                              — {a.startTime} à {a.endTime}
                            </p>
                            {a.notes && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {a.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant={statusColor[a.status]}>
                            {statusLabel[a.status]}
                          </Badge>
                          {(a.status === "SCHEDULED" ||
                            a.status === "CONFIRMED") && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1.5 text-danger hover:text-danger hover:bg-danger-light"
                              onClick={() => handleCancel(a.id)}
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              Annuler
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
