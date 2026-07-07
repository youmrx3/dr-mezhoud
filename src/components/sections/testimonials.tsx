"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { temoignages } from "@/lib/mock-data"

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2>Ce que disent nos patients</h2>
          <p className="text-muted-foreground">
            La satisfaction de nos patients est notre meilleure récompense.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {temoignages.map((temoignage, index) => (
            <motion.div
              key={temoignage.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full relative">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < temoignage.note
                            ? "fill-warning text-warning"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    &ldquo;{temoignage.commentaire}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary-light text-primary text-xs">
                        {temoignage.initiales}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{temoignage.patient}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
