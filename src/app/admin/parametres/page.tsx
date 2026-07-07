"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Bell, Clock, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function AdminSettingsPage() {
  const [clinic, setClinic] = useState({
    nom: "Dr Mezhoud Hadj",
    adresse: "42 Rue Didouche Mourad, Alger Centre",
    telephone: "+213 21 63 12 45",
    urgence: "+213 770 12 34 56",
    email: "contact@drmezhoud.dz",
  })

  const [hours, setHours] = useState([
    { day: "Dimanche", open: "08:30", close: "16:30" },
    { day: "Lundi", open: "08:30", close: "16:30" },
    { day: "Mardi", open: "08:30", close: "16:30" },
    { day: "Mercredi", open: "08:30", close: "16:30" },
    { day: "Jeudi", open: "08:30", close: "16:30" },
    { day: "Vendredi", open: "08:30", close: "12:00" },
    { day: "Samedi", open: "", close: "" },
  ])

  const [notifications, setNotifications] = useState({
    email: true,
    nouveauPatient: true,
    annulationRdv: true,
    rappelRdv: false,
  })

  const [saved, setSaved] = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-3xl"
    >
      <div>
        <h1 className="text-xl">Paramètres</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gérez les informations du cabinet
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-5">
            <h2 className="text-sm font-medium flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-primary" />
              Informations du cabinet
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nom du cabinet</Label>
                <Input value={clinic.nom} onChange={(e) => setClinic({ ...clinic, nom: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={clinic.email} onChange={(e) => setClinic({ ...clinic, email: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Adresse</Label>
              <Input value={clinic.adresse} onChange={(e) => setClinic({ ...clinic, adresse: e.target.value })} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input value={clinic.telephone} onChange={(e) => setClinic({ ...clinic, telephone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Urgence</Label>
                <Input value={clinic.urgence} onChange={(e) => setClinic({ ...clinic, urgence: e.target.value })} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-5">
            <h2 className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Horaires d&apos;ouverture
            </h2>
            <div className="space-y-3">
              {hours.map((h, i) => (
                <div key={h.day} className="flex items-center gap-4">
                  <span className="text-sm w-28 shrink-0 font-medium">{h.day}</span>
                  <Input
                    type="time"
                    className="w-32"
                    value={h.open}
                    onChange={(e) => {
                      const newHours = [...hours]
                      newHours[i] = { ...newHours[i], open: e.target.value }
                      setHours(newHours)
                    }}
                  />
                  <span className="text-sm text-muted-foreground">à</span>
                  <Input
                    type="time"
                    className="w-32"
                    value={h.close}
                    onChange={(e) => {
                      const newHours = [...hours]
                      newHours[i] = { ...newHours[i], close: e.target.value }
                      setHours(newHours)
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-5">
            <h2 className="text-sm font-medium flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              Notifications
            </h2>
            <div className="space-y-4">
              {[
                { key: "email", label: "Recevoir les notifications par email" },
                { key: "nouveauPatient", label: "Nouveau patient inscrit" },
                { key: "annulationRdv", label: "Annulation de rendez-vous" },
                { key: "rappelRdv", label: "Rappel de rendez-vous (24h avant)" },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[item.key as keyof typeof notifications]}
                    onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-ring accent-primary"
                  />
                  <span className="text-sm">{item.label}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit" className="gap-2">
            <Save className="h-4 w-4" />
            Enregistrer
          </Button>
          {saved && (
            <span className="text-xs text-success">Paramètres mis à jour</span>
          )}
        </div>
      </form>
    </motion.div>
  )
}
