"use client"

import { motion } from "framer-motion"
import { Calendar, Users, Heart, FileText } from "lucide-react"
import { STATISTIQUES } from "@/lib/constants"

const bgIconMap: Record<string, React.ReactNode> = {
  Calendar: <Calendar className="h-8 w-8" />,
  Users: <Users className="h-8 w-8" />,
  Heart: <Heart className="h-8 w-8" />,
  FileText: <FileText className="h-8 w-8" />,
}

export function StatsSection() {
  return (
    <section className="py-16 bg-primary">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {STATISTIQUES.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <div className="flex justify-center text-primary-fg/80">
                {bgIconMap[stat.icone]}
              </div>
              <p className="text-3xl md:text-4xl font-bold text-primary-fg">
                {stat.valeur}
              </p>
              <p className="text-sm text-primary-fg/80">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
