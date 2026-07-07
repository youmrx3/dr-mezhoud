"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CABINET_INFO } from "@/lib/constants"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-hover">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container-main text-center space-y-6"
      >
        <h2 className="text-primary-fg">Prenez soin de vos reins</h2>
        <p className="text-primary-fg/80 max-w-xl mx-auto text-lg">
          Une consultation précoce peut faire toute la différence. Le Dr Mezhoud
          Hadj est à votre écoute.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/rendezvous">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 bg-white text-primary hover:bg-white/90"
            >
              <Calendar className="h-5 w-5" />
              Prendre rendez-vous
            </Button>
          </Link>
          <a href={`tel:${CABINET_INFO.telephone}`}>
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 bg-white text-primary hover:bg-white/90"
            >
              <Phone className="h-5 w-5" />
              {CABINET_INFO.telephone}
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
