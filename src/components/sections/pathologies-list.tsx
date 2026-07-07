"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HeartPulse, Droplets, Scan, Activity, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { pathologies } from "@/lib/mock-data"

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="h-8 w-8" />,
  HeartPulse: <HeartPulse className="h-8 w-8" />,
  Droplets: <Droplets className="h-8 w-8" />,
  Scan: <Scan className="h-8 w-8" />,
  Activity: <Activity className="h-8 w-8" />,
}

export function PathologiesList() {
  const [activeTab, setActiveTab] = useState(pathologies[0]?.id)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="flex-wrap h-auto p-1 mb-8">
        {pathologies.map((p) => (
          <TabsTrigger
            key={p.id}
            value={p.id}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-fg"
          >
            {p.nom}
          </TabsTrigger>
        ))}
      </TabsList>

      <AnimatePresence mode="wait">
        {pathologies.map((pathologie) => (
          <TabsContent key={pathologie.id} value={pathologie.id}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardContent className="p-6 sm:p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                      {iconMap[pathologie.icone] || <Activity className="h-8 w-8" />}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-medium">{pathologie.nom}</h3>
                      <p className="text-muted-foreground">
                        {pathologie.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-danger flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                        Symptômes
                      </h4>
                      <ul className="space-y-1.5">
                        {pathologie.symptomes.map((s) => (
                          <li
                            key={s}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-danger mt-1 shrink-0">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-warning flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                        Causes
                      </h4>
                      <ul className="space-y-1.5">
                        {pathologie.causes.map((c) => (
                          <li
                            key={c}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-warning mt-1 shrink-0">•</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-success flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-success" />
                        Traitements
                      </h4>
                      <ul className="space-y-1.5">
                        {pathologie.traitements.map((t) => (
                          <li
                            key={t}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-success mt-1 shrink-0">•</span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </AnimatePresence>
    </Tabs>
  )
}
