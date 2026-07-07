"use client"

import { motion } from "framer-motion"
import { GraduationCap, Briefcase, Clock, Award, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { medecin } from "@/lib/mock-data"
import { CABINET_INFO } from "@/lib/constants"

export function AboutContent() {
  return (
    <div className="container-main py-12 md:py-16 space-y-16">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary-light to-accent-light flex items-center justify-center shrink-0">
            <span className="text-5xl font-bold text-primary font-mono">
              {medecin.prenom.charAt(0)}
              {medecin.nom.charAt(0)}
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <h1 className="mb-2">
                {medecin.titre} {medecin.prenom} {medecin.nom}
              </h1>
              <p className="text-lg text-primary font-medium">
                {medecin.specialite}
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">{medecin.bio}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                {CABINET_INFO.adresse}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                {medecin.horaires[0].matin} – {medecin.horaires[0].apresMidi}
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h2>Diplômes & Formation</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {medecin.diplomes.map((diplome) => (
            <Card key={diplome} className="bg-surface border-0">
              <CardContent className="p-5 flex items-start gap-3">
                <Award className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">{diplome}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <Briefcase className="h-6 w-6 text-primary" />
          <h2>Parcours professionnel</h2>
        </div>
        <div className="space-y-4">
          {medecin.experiences.map((exp, index) => (
            <div key={exp.titre}>
              <Card>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-medium">{exp.titre}</h3>
                      <p className="text-sm text-primary">{exp.lieu}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap bg-surface-2 px-2.5 py-1 rounded-pill self-start">
                      {exp.annee}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {exp.description}
                  </p>
                </CardContent>
              </Card>
              {index < medecin.experiences.length - 1 && <Separator className="my-0" />}
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
