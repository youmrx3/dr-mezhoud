"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Stethoscope,
  Activity,
  HeartPulse,
  Droplets,
  Scan,
  ClipboardList,
  Heart,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { services } from "@/lib/mock-data"

const iconMap: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope className="h-5 w-5" />,
  Activity: <Activity className="h-5 w-5" />,
  HeartPulse: <HeartPulse className="h-5 w-5" />,
  Droplets: <Droplets className="h-5 w-5" />,
  Scan: <Scan className="h-5 w-5" />,
  ClipboardList: <ClipboardList className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function ServicesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <h2>Nos services</h2>
          <p className="text-muted-foreground">
            Une gamme complète de services de néphrologie pour prendre en charge
            l&apos;ensemble de vos besoins en santé rénale.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-3"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={item}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border bg-card hover:border-primary/40 hover:bg-primary-light/50 hover:shadow-sm transition-all"
              >
                <span className="text-primary group-hover:scale-110 transition-transform">
                  {iconMap[service.icone]}
                </span>
                <span className="text-sm font-medium whitespace-nowrap">
                  {service.titre}
                </span>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <span className="block bg-background text-foreground rounded-xl shadow-xl border border-border p-3 text-left">
                    <span className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-primary-light text-primary flex items-center justify-center">
                        {iconMap[service.icone]}
                      </span>
                      <span className="text-sm font-semibold">{service.titre}</span>
                    </span>
                    <span className="text-xs text-muted-foreground leading-relaxed block">
                      {service.description}
                    </span>
                    <span className="block mt-2 text-[11px] font-medium text-primary">
                      En savoir plus →
                    </span>
                  </span>
                  <span className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-background border-r border-b border-border rotate-45 -mt-[6px]" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-8">
          <Link href="/services">
            <Button variant="outline" className="gap-2 rounded-full">
              Voir tous nos services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
