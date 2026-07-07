"use client"

import { motion } from "framer-motion"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Shield,
  Syringe,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cabinet } from "@/lib/mock-data"
import { CABINET_INFO } from "@/lib/constants"

export function CabinetContent() {
  return (
    <div className="container-main py-12 md:py-16 space-y-16">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1>Le Cabinet</h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          {cabinet.description}
        </p>
      </motion.section>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-8"
        >
          <section className="space-y-4">
            <h2>Nos services</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {cabinet.services.map((service) => (
                <div
                  key={service}
                  className="flex items-start gap-3 p-3 rounded-lg bg-surface"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm">{service}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2>Équipements</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {cabinet.equipements.map((equip) => (
                <div
                  key={equip}
                  className="flex items-start gap-3 p-3 rounded-lg bg-surface"
                >
                  <Shield className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-sm">{equip}</span>
                </div>
              ))}
            </div>
          </section>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <Card>
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Informations pratiques
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-muted-foreground">
                      {CABINET_INFO.adresse}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <a
                      href={`tel:${CABINET_INFO.telephone}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {CABINET_INFO.telephone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${CABINET_INFO.email}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {CABINET_INFO.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Horaires</p>
                    <div className="text-muted-foreground space-y-0.5">
                      <p>Dim – Jeu : 08h30 – 16h30</p>
                      <p>Vendredi : 08h30 – 12h00</p>
                      <p>Samedi : Fermé</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center gap-2">
                <Syringe className="h-5 w-5 text-amber-600" />
                <p className="font-medium text-amber-800">Urgence médicale</p>
              </div>
              <a
                href={`tel:${CABINET_INFO.urgence}`}
                className="text-lg font-bold text-amber-700 hover:text-amber-800"
              >
                {CABINET_INFO.urgence}
              </a>
              <p className="text-xs text-amber-600">
                En cas d&apos;urgence, contactez ce numéro.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
