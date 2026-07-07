"use client"

import { motion } from "framer-motion"
import { Phone, Stethoscope, FileText, ClipboardList, Calendar } from "lucide-react"
import { parcoursEtapes } from "@/lib/mock-data"

const iconMap: Record<string, React.ReactNode> = {
  Phone: <Phone className="h-6 w-6" />,
  Stethoscope: <Stethoscope className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
  ClipboardList: <ClipboardList className="h-6 w-6" />,
  Calendar: <Calendar className="h-6 w-6" />,
}

export function ParcoursSteps() {
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

      <div className="space-y-10">
        {parcoursEtapes.map((etape, index) => (
          <motion.div
            key={etape.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-0 md:pl-20"
          >
            <div className="hidden md:flex absolute left-4 top-1 w-9 h-9 rounded-full bg-primary-light text-primary items-center justify-center -translate-x-1/2 ring-4 ring-background">
              {iconMap[etape.icone]}
            </div>

            <div className="bg-surface rounded-card p-6 border border-border">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-medium flex items-center gap-2">
                  <span className="flex md:hidden w-8 h-8 rounded-full bg-primary-light text-primary items-center justify-center text-sm font-bold shrink-0">
                    {index + 1}
                  </span>
                  {etape.titre}
                </h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap bg-surface-2 px-2.5 py-1 rounded-pill">
                  {etape.duree}
                </span>
              </div>
              <p className="text-sm text-muted-foreground ml-0 md:ml-10">
                {etape.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
