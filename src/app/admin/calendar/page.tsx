"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockAppointments } from "@/lib/mock-data"

const statusLabel: Record<string, string> = { SCHEDULED: "Planifié", CONFIRMED: "Confirmé", CANCELLED: "Annulé", COMPLETED: "Effectué" }
const statusColor: Record<string, "warning" | "success" | "danger" | "info"> = { SCHEDULED: "warning", CONFIRMED: "success", CANCELLED: "danger", COMPLETED: "info" }

export default function AdminCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const startOffset = firstDay === 0 ? 6 : firstDay - 1

  const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

  function prevMonth() { setCurrentDate(new Date(year, month - 1, 1)); setSelectedDate(null) }
  function nextMonth() { setCurrentDate(new Date(year, month + 1, 1)); setSelectedDate(null) }

  const appointmentsByDate = useMemo(() => {
    const map: Record<string, typeof mockAppointments> = {}
    for (const a of mockAppointments) {
      if (!map[a.date]) map[a.date] = []
      map[a.date].push(a)
    }
    return map
  }, [])

  const selectedAppts = selectedDate
    ? appointmentsByDate[selectedDate.toISOString().split("T")[0]] || []
    : []

  const todayStr = new Date().toISOString().split("T")[0]

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-xl">Calendrier</h1>
        <p className="text-sm text-muted-foreground mt-1">Vue mensuelle des rendez-vous</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-5">
                <Button variant="ghost" size="sm" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
                <p className="text-sm font-medium">
                  {currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                </p>
                <Button variant="ghost" size="sm" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground mb-2">
                {dayNames.map((d) => <div key={d} className="py-1.5 font-medium">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: startOffset }).map((_, i) => <div key={`empty-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const date = new Date(year, month, day)
                  const dateStr = date.toISOString().split("T")[0]
                  const appts = appointmentsByDate[dateStr]
                  const isToday = dateStr === todayStr
                  const isSelected = selectedDate && dateStr === selectedDate.toISOString().split("T")[0]

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(date)}
                      className={`relative p-1.5 rounded-lg text-sm transition-colors min-h-[48px] ${
                        isSelected
                          ? "bg-primary text-primary-fg"
                          : isToday
                            ? "bg-primary-light text-primary font-semibold"
                            : "hover:bg-surface"
                      }`}
                    >
                      <span>{day}</span>
                      {appts && appts.length > 0 && (
                        <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                          isSelected ? "bg-primary-fg" : "bg-primary"
                        }`} />
                      )}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">
                  {selectedDate
                    ? selectedDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
                    : "Sélectionnez une date"}
                </p>
              </div>
              {selectedAppts.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  {selectedDate ? "Aucun rendez-vous ce jour" : "Cliquez sur un jour pour voir les rendez-vous"}
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedAppts.map((a) => (
                    <div key={a.id} className="p-3 rounded-lg bg-surface space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{a.patientNom} {a.patientPrenom}</p>
                        <Badge variant={statusColor[a.status]}>{statusLabel[a.status]}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{a.startTime} — {a.endTime}</p>
                      <p className="text-xs text-muted-foreground">{a.type}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
