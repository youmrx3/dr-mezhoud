"use client"

import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { PathologiesList } from "@/components/sections/pathologies-list"

export function PathologiesContent() {
  return (
    <div className="container-main py-12 md:py-16 space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 max-w-3xl"
      >
        <h1>Pathologies rénales</h1>
        <p className="text-muted-foreground text-lg">
          Informations détaillées sur les principales pathologies rénales prises en
          charge par le Dr Mezhoud Hadj. Ces contenus sont fournis à titre
          informatif et ne remplacent pas une consultation médicale.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <PathologiesList />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="border-warning/30 bg-warning-light">
          <CardContent className="p-5 flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-warning shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-warning">Information importante</p>
              <p className="text-sm text-warning/80">
                Les informations présentées sur cette page sont à but éducatif.
                En cas de symptômes ou de doute sur votre santé, consultez
                rapidement un médecin. Le diagnostic et le traitement des
                maladies rénales nécessitent un suivi médical personnalisé.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  )
}
