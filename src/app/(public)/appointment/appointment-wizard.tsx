"use client"

import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {
  APPOINTMENT_DURATION,
  APPOINTMENT_TYPES,
  CLOSED_DAY,
  MAX_FUTURE_DAYS,
  WORKING_HOURS,
  CABINET_INFO,
} from "@/lib/constants"
import { mockAppointments } from "@/lib/mock-data"

const DAYS_FR = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
]

const steps = [
  { id: 1, label: "Date", icon: Calendar },
  { id: 2, label: "Horaire", icon: Clock },
  { id: 3, label: "Informations", icon: FileText },
]

const appointmentSchema = z.object({
  type: z.string().min(1, "Veuillez choisir un type de rendez-vous"),
  symptomes: z
    .string()
    .max(500, "Maximum 500 caractères")
    .optional()
    .or(z.literal("")),
  notes: z
    .string()
    .max(1000, "Maximum 1000 caractères")
    .optional()
    .or(z.literal("")),
})

type AppointmentData = z.infer<typeof appointmentSchema>

const today = new Date()
today.setHours(0, 0, 0, 0)

const maxDate = new Date(today)
maxDate.setDate(maxDate.getDate() + MAX_FUTURE_DAYS)

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

function isSunday(dateStr: string): boolean {
  const d = new Date(dateStr + "T12:00:00")
  return (
    DAYS_FR[d.getDay()] ===
    DAYS_FR[
      ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(
        CLOSED_DAY
      )
    ]
  )
}

function getDayName(dateStr: string): string {
  return DAYS_FR[new Date(dateStr + "T12:00:00").getDay()]
}

function getWorkingHoursForDate(dateStr: string): { open: string; close: string } | null {
  const dayName = getDayName(dateStr)
  const wh = WORKING_HOURS.find((h) => h.day === dayName)
  return wh && wh.open ? wh : null
}

function generateSlots(dateStr: string): string[] {
  const wh = getWorkingHoursForDate(dateStr)
  if (!wh) return []

  const [openH, openM] = wh.open.split(":").map(Number)
  const [closeH, closeM] = wh.close.split(":").map(Number)
  const openMinutes = openH * 60 + openM
  const closeMinutes = closeH * 60 + closeM
  const slots: string[] = []

  for (let m = openMinutes; m + APPOINTMENT_DURATION <= closeMinutes; m += APPOINTMENT_DURATION) {
    const startH = Math.floor(m / 60)
    const startM = m % 60
    const endM = m + APPOINTMENT_DURATION
    const endH = Math.floor(endM / 60)
    const endMin = endM % 60
    slots.push(
      `${String(startH).padStart(2, "0")}:${String(startM).padStart(2, "0")} – ${String(endH).padStart(2, "0")}:${String(endMin).padStart(2, "0")}`
    )
  }
  return slots
}

function getBookedSlots(dateStr: string): string[] {
  return mockAppointments
    .filter((a) => a.date === dateStr && a.status !== "CANCELLED")
    .map((a) => `${a.startTime} – ${a.endTime}`)
}

export function AppointmentWizard() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")
  const [confirmed, setConfirmed] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AppointmentData>({
    resolver: zodResolver(appointmentSchema),
  })

  const slots = useMemo(() => (selectedDate ? generateSlots(selectedDate) : []), [selectedDate])
  const bookedSlots = useMemo(() => (selectedDate ? getBookedSlots(selectedDate) : []), [selectedDate])
  const dateError = selectedDate ? (isSunday(selectedDate) ? "Ce jour est fermé" : null) : null
  const wh = selectedDate ? getWorkingHoursForDate(selectedDate) : null

  const minDateStr = formatDate(today)
  const maxDateStr = formatDate(maxDate)

  function canGoNext(): boolean {
    if (step === 1) return !!selectedDate && !dateError
    if (step === 2) return !!selectedSlot
    return true
  }

  function onSubmit(data: AppointmentData) {
    console.log("Appointment confirmed:", { date: selectedDate, slot: selectedSlot, ...data })
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <div className="container-main py-12 md:py-16">
        <Card className="max-w-lg mx-auto">
          <CardContent className="p-8 sm:p-12 flex flex-col items-center text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-success" />
            <h2>Rendez-vous confirmé !</h2>
            <p className="text-muted-foreground">
              Votre demande de rendez-vous a bien été enregistrée. Nous vous
              contacterons dans les plus brefs délais pour confirmer.
            </p>
            <div className="bg-surface rounded-lg p-4 w-full space-y-1 text-sm">
              <p>
                <span className="font-medium">Date :</span>{" "}
                {new Date(selectedDate + "T12:00:00").toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>
                <span className="font-medium">Horaire :</span> {selectedSlot}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>Urgence ? Appelez le {CABINET_INFO.urgence}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container-main py-12 md:py-16 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 max-w-3xl"
      >
        <h1>Prendre rendez-vous</h1>
        <p className="text-muted-foreground text-lg">
          Réservez votre consultation en ligne en trois étapes.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step === s.id
                      ? "bg-primary text-primary-fg"
                      : step > s.id
                        ? "bg-primary-light text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <s.icon className="h-4 w-4" />
                </div>
                <span
                  className={`text-sm font-medium hidden sm:inline ${
                    step === s.id
                      ? "text-foreground"
                      : step > s.id
                        ? "text-primary"
                        : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 sm:w-12 h-px ${
                    step > s.id ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && (
              <Card>
                <CardContent className="p-6 sm:p-8 space-y-6">
                  <h2 className="text-h3">Choisissez une date</h2>
                  <p className="text-sm text-muted-foreground">
                    Sélectionnez un jour ouvrable (fermé le{" "}
                    {DAYS_FR[["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(CLOSED_DAY)]}
                    ).
                  </p>

                  <div className="space-y-2">
                    <Label htmlFor="appointment-date">Date</Label>
                    <Input
                      id="appointment-date"
                      type="date"
                      min={minDateStr}
                      max={maxDateStr}
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value)
                        setSelectedSlot("")
                      }}
                    />
                    {dateError && (
                      <p className="text-xs text-danger">
                        {dateError}
                      </p>
                    )}
                  </div>

                  {selectedDate && !dateError && wh && (
                    <div className="text-sm text-muted-foreground bg-surface rounded-lg p-3">
                      Horaires du {getDayName(selectedDate)} : {wh.open} – {wh.close}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardContent className="p-6 sm:p-8 space-y-6">
                  <h2 className="text-h3">Choisissez un horaire</h2>
                  <p className="text-sm text-muted-foreground">
                    Créneaux disponibles pour le{" "}
                    {selectedDate
                      ? new Date(selectedDate + "T12:00:00").toLocaleDateString("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })
                      : ""}
                  </p>

                  {slots.length === 0 ? (
                    <p className="text-sm text-danger">Aucun créneau disponible ce jour.</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {slots.map((slot) => {
                        const isBooked = bookedSlots.includes(slot)
                        const isSelected = selectedSlot === slot
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isBooked}
                            onClick={() => setSelectedSlot(slot)}
                            className={`text-sm py-2.5 px-3 rounded-lg border text-center transition-all ${
                              isSelected
                                ? "border-primary bg-primary text-primary-fg font-medium"
                                : isBooked
                                  ? "border-border bg-muted text-muted-foreground line-through cursor-not-allowed"
                                  : "border-border bg-background text-foreground hover:border-primary hover:text-primary"
                            }`}
                          >
                            {slot}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <h2 className="text-h3 mb-1">Vos informations</h2>
                      <p className="text-sm text-muted-foreground mb-6">
                        Détails de votre consultation.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Type de rendez-vous *</Label>
                      <Select onValueChange={(v) => setValue("type", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          {APPOINTMENT_TYPES.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.type && (
                        <p className="text-xs text-danger">{errors.type.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="symptomes">Symptômes (optionnel)</Label>
                      <textarea
                        id="symptomes"
                        rows={3}
                        maxLength={500}
                        className="flex w-full rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[80px]"
                        placeholder="Décrivez vos symptômes..."
                        {...register("symptomes")}
                      />
                      {errors.symptomes && (
                        <p className="text-xs text-danger">{errors.symptomes.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes supplémentaires (optionnel)</Label>
                      <textarea
                        id="notes"
                        rows={3}
                        maxLength={1000}
                        className="flex w-full rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[80px]"
                        placeholder="Informations complémentaires..."
                        {...register("notes")}
                      />
                      {errors.notes && (
                        <p className="text-xs text-danger">{errors.notes.message}</p>
                      )}
                    </div>

                    <div className="bg-surface rounded-lg p-4 space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Date :</span>{" "}
                        {new Date(selectedDate + "T12:00:00").toLocaleDateString("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p>
                        <span className="font-medium">Horaire :</span> {selectedSlot}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Button type="submit" size="lg" className="gap-2 w-full sm:w-auto">
                        Confirmer le rendez-vous
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour
          </Button>
          {step < 3 && (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canGoNext()}
              className="gap-2"
            >
              Suivant
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
