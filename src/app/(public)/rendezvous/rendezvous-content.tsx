"use client"

import { motion } from "framer-motion"
import { Info, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AppointmentForm } from "@/components/sections/appointment-form"
import { CABINET_INFO } from "@/lib/constants"

export function RendezVousContent() {
  return (
    <div className="container-main py-12 md:py-16 space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 max-w-3xl"
      >
        <h1>Prendre rendez-vous</h1>
        <p className="text-muted-foreground text-lg">
          Réservez votre consultation en ligne. Vous pouvez également nous
          contacter par téléphone pour un rendez-vous plus rapide.
        </p>
      </motion.section>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <AppointmentForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <Card>
            <CardContent className="p-5 space-y-4">
              <h3 className="font-medium">Vous préférez téléphoner ?</h3>
              <p className="text-sm text-muted-foreground">
                Appelez-nous directement pour prendre rendez-vous :
              </p>
              <a
                href={`tel:${CABINET_INFO.telephone}`}
                className="flex items-center gap-2 text-lg font-bold text-primary hover:text-primary-hover"
              >
                <Phone className="h-5 w-5" />
                {CABINET_INFO.telephone}
              </a>
            </CardContent>
          </Card>

          <Card className="bg-surface border-0">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Les rendez-vous sont confirmés dans un délai de 24h par
                    téléphone ou email.
                  </p>
                  <p>
                    En cas d&apos;urgence, veuillez appeler directement le
                    cabinet.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
