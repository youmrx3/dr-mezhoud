"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ArrowRight, Stethoscope, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-surface-2 to-surface">
      <div className="container-main py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-pill bg-primary-light px-4 py-1.5 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Cabinet de Néphrologie — Alger
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-h1 leading-tight">
              Votre santé rénale,{" "}
              <span className="text-primary">notre priorité</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Le Dr Mezhoud Hadj vous accueille pour des consultations spécialisées
              en néphrologie. Une prise en charge personnalisée, de la prévention
              au suivi des maladies rénales.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/rendezvous">
                <Button size="lg" className="gap-2">
                  <Calendar className="h-5 w-5" />
                  Prendre rendez-vous
                </Button>
              </Link>
              <Link href="/apropos">
                <Button variant="outline" size="lg" className="gap-2">
                  En savoir plus
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
              <div className="absolute inset-4 rounded-full bg-primary-light" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Stethoscope className="h-20 w-20 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium text-primary">Dr Mezhoud Hadj</p>
                  <p className="text-sm text-muted-foreground">Néphrologue</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
