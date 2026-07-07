"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-surface-2">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/models/kidney/Make_kidney_more_right_2K_202607071701.jpeg)",
          opacity: 0.60,
        }}
      />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-7"
          >
            <div className="inline-flex items-center gap-2 rounded-pill bg-primary-light px-5 py-2 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Cabinet de Néphrologie — Alger
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-6xl leading-tight tracking-tight text-foreground">
              Votre santé rénale,{" "}
              <span className="text-primary">notre priorité</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Le Dr Mezhoud Hadj vous accueille pour des consultations spécialisées
              en néphrologie. Une prise en charge personnalisée, de la prévention
              au suivi des maladies rénales.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/rendezvous">
                <Button size="lg" className="gap-2 px-8 py-6 text-base">
                  <Calendar className="h-5 w-5" />
                  Prendre rendez-vous
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="gap-2 px-8 py-6 text-base">
                  Nos services
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="hidden lg:block" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  )
}
