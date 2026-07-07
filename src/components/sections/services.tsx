"use client"

import { motion } from "framer-motion"
import {
  Stethoscope,
  Activity,
  HeartPulse,
  Droplets,
  Scan,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { services } from "@/lib/mock-data"

const iconMap: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope className="h-6 w-6" />,
  Activity: <Activity className="h-6 w-6" />,
  HeartPulse: <HeartPulse className="h-6 w-6" />,
  Droplets: <Droplets className="h-6 w-6" />,
  Scan: <Scan className="h-6 w-6" />,
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ServicesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
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
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={item}>
              <Card className="h-full group hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    {iconMap[service.icone]}
                  </div>
                  <h3 className="text-lg font-medium">{service.titre}</h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
