"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { CalendarCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { RendezVous } from "@/types"

const rendezvousSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  telephone: z.string().min(8, "Numéro de téléphone invalide"),
  date: z.string().min(1, "Veuillez choisir une date"),
  creneau: z.string().min(1, "Veuillez choisir un créneau"),
  motif: z.string().min(3, "Veuillez préciser le motif"),
})

type RendezVousData = z.infer<typeof rendezvousSchema>

const creneaux = [
  "09h00 – 09h30",
  "09h30 – 10h00",
  "10h00 – 10h30",
  "10h30 – 11h00",
  "11h00 – 11h30",
  "11h30 – 12h00",
  "13h00 – 13h30",
  "13h30 – 14h00",
  "14h00 – 14h30",
  "14h30 – 15h00",
  "15h00 – 15h30",
  "15h30 – 16h00",
]

const motifs = [
  "Consultation initiale",
  "Suivi de maladie rénale chronique",
  "Hypertension artérielle",
  "Bilan pré-transplantation",
  "Résultats d'analyses",
  "Urgence (contactez le cabinet)",
  "Autre",
]

export function AppointmentForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RendezVousData>({
    resolver: zodResolver(rendezvousSchema),
  })

  function onSubmit(data: RendezVousData) {
    console.log("Appointment data:", data)
    reset()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card>
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom *</Label>
                <Input id="nom" placeholder="Votre nom" {...register("nom")} />
                {errors.nom && (
                  <p className="text-xs text-danger">{errors.nom.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom *</Label>
                <Input id="prenom" placeholder="Votre prénom" {...register("prenom")} />
                {errors.prenom && (
                  <p className="text-xs text-danger">{errors.prenom.message}</p>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-danger">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone *</Label>
                <Input
                  id="telephone"
                  placeholder="+213 7xx xx xx xx"
                  {...register("telephone")}
                />
                {errors.telephone && (
                  <p className="text-xs text-danger">{errors.telephone.message}</p>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="date">Date souhaitée *</Label>
                <Input id="date" type="date" {...register("date")} />
                {errors.date && (
                  <p className="text-xs text-danger">{errors.date.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Créneau *</Label>
                <Select
                  onValueChange={(value) => setValue("creneau", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un créneau" />
                  </SelectTrigger>
                  <SelectContent>
                    {creneaux.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.creneau && (
                  <p className="text-xs text-danger">{errors.creneau.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Motif de la consultation *</Label>
              <Select onValueChange={(value) => setValue("motif", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un motif" />
                </SelectTrigger>
                <SelectContent>
                  {motifs.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.motif && (
                <p className="text-xs text-danger">{errors.motif.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} size="lg" className="gap-2 w-full sm:w-auto">
              <CalendarCheck className="h-5 w-5" />
              {isSubmitting ? "Envoi en cours..." : "Confirmer le rendez-vous"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
