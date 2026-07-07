"use client"

import { motion } from "framer-motion"
import { Heart, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ParcoursSteps } from "@/components/sections/parcours-steps"
import { CTASection } from "@/components/sections/cta-section"

export function ParcoursContent() {
  return (
    <>
      <div className="container-main py-12 md:py-16 space-y-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 max-w-3xl"
        >
          <h1>Parcours de soins</h1>
          <p className="text-muted-foreground text-lg">
            Découvrez comment se déroule votre prise en charge au cabinet du
            Dr Mezhoud Hadj, du premier contact jusqu&apos;au suivi personnalisé.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <ParcoursSteps />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <Info className="h-6 w-6 text-primary" />
            <h2>Bon à savoir</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "Documents à apporter",
                items: [
                  "Pièce d'identité",
                  "Ordonnances et bilans récents",
                  "Liste des médicaments",
                  "Compte-rendus hospitaliers",
                ],
              },
              {
                title: "Avant la consultation",
                items: [
                  "Arrivez 15 min à l'avance",
                  "Jeûne non nécessaire sauf avis",
                  "Apportez vos examens",
                  "Notez vos questions",
                ],
              },
              {
                title: "Après la consultation",
                items: [
                  "Suivez le traitement prescrit",
                  "Respectez le plan de suivi",
                  "Contactez-nous si besoin",
                  "Tenez votre carnet de suivi",
                ],
              },
            ].map((section) => (
              <Card key={section.title} className="bg-surface border-0">
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-medium text-sm">{section.title}</h3>
                  <ul className="space-y-1.5">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <Heart className="h-3.5 w-3.5 text-primary mt-1 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>
      </div>
      <CTASection />
    </>
  )
}
