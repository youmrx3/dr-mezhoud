"use client"

import { motion } from "framer-motion"
import {
  GraduationCap,
  Briefcase,
  Award,
  Quote,
  Stethoscope,
  MapPin,
  Mail,
  Phone,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { medecin } from "@/lib/mock-data"
import { CABINET_INFO } from "@/lib/constants"

export function AboutContent() {
  return (
    <div className="container-main py-12 md:py-16 space-y-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1>À propos du Dr Mezhoud Hadj</h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Néphrologue passionné, dédié à la santé rénale de ses patients depuis
          plus de 15 ans.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-40 h-40 mb-4">
              <AvatarFallback className="text-4xl bg-primary-light text-primary">
                MH
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-medium">
              Dr {medecin.prenom} {medecin.nom}
            </h2>
            <p className="text-primary font-medium">{medecin.specialite}</p>
            <div className="space-y-2 mt-4 text-sm text-muted-foreground text-left">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                Alger, Algérie
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                {CABINET_INFO.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                {CABINET_INFO.telephone}
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Diplômes</h3>
              </div>
              <ul className="space-y-3">
                {medecin.diplomes.map((d, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="text-primary mt-1 shrink-0">•</span>
                    <span className="text-muted-foreground">{d}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-10"
        >
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              <h2 className="text-h3">Biographie</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {medecin.bio}
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-h3">Expérience</h2>
            </div>
            <div className="space-y-0">
              {medecin.experiences.map((exp, i) => (
                <div key={i} className="relative pl-8 pb-8 last:pb-0">
                  <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                  {i < medecin.experiences.length - 1 && (
                    <div className="absolute left-[5px] top-4 bottom-0 w-[2px] bg-border" />
                  )}
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-primary font-medium">
                      {exp.annee}
                    </span>
                    <h3 className="font-medium">{exp.titre}</h3>
                    <p className="text-sm text-primary">{exp.lieu}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h2 className="text-h3">Formation</h2>
            </div>
            <div className="space-y-0">
              {medecin.diplomes.map((d, i) => (
                <div key={i} className="flex gap-3 py-3 border-b border-border last:border-0">
                  <span className="text-xs font-mono text-muted-foreground shrink-0 mt-0.5 w-12">
                    {i === 0 ? "2008" : i === 1 ? "2012" : i === 2 ? "2014" : "2016"}
                  </span>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </section>

          <Card className="bg-primary-light border-primary/20">
            <CardContent className="p-6 flex gap-4">
              <Quote className="h-8 w-8 text-primary shrink-0 mt-1" />
              <div>
                <p className="text-foreground italic leading-relaxed">
                  &laquo; La médecine rénale ne se limite pas à traiter des chiffres
                  et des analyses. C&apos;est avant tout une relation humaine, un
                  accompagnement dans la durée pour offrir à chaque patient la
                  meilleure qualité de vie possible. &raquo;
                </p>
                <p className="text-sm text-primary font-medium mt-3">
                  — Dr Mezhoud Hadj
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
