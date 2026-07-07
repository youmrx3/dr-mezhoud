"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Stethoscope, Activity, Heart, Scan, Droplets, ClipboardList } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Service } from "@/types"

const iconMap: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope className="h-12 w-12" />,
  Activity: <Activity className="h-12 w-12" />,
  HeartPulse: <Activity className="h-12 w-12" />,
  Heart: <Heart className="h-12 w-12" />,
  Scan: <Scan className="h-12 w-12" />,
  Droplets: <Droplets className="h-12 w-12" />,
  ClipboardList: <ClipboardList className="h-12 w-12" />,
}

export function ServiceDetailContent({ service }: { service: Service }) {
  return (
    <div className="container-main py-12 md:py-16">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux services
        </Link>

        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex items-center justify-center shrink-0">
            {iconMap[service.icone] || <Stethoscope className="h-8 w-8" />}
          </div>
          <div className="space-y-2">
            <Badge variant="default">{service.categorie}</Badge>
            <h1 className="text-h1">{service.nom}</h1>
            <p className="text-lg text-muted-foreground">{service.description}</p>
          </div>
        </div>

        <Separator />

        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Durée</p>
                <p className="text-sm font-medium">{service.duree} minutes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Tarif</p>
                <p className="text-sm font-medium">{service.prix.toLocaleString("fr-DZ")} DA</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Activity className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Catégorie</p>
                <p className="text-sm font-medium">{service.categorie}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-surface rounded-card p-6 border border-border space-y-4">
          <h2>À propos de ce service</h2>
          <p className="text-muted-foreground leading-relaxed">
            Ce service vous est proposé par le Dr Mezhoud Hadj, néphrologue
            consultant. Chaque consultation est adaptée à vos besoins spécifiques
            et à votre état de santé.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Le cabinet est équipé des outils de diagnostic modernes pour vous
            offrir une prise en charge complète et personnalisée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/rendezvous">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              <Calendar className="h-5 w-5" />
              Prendre rendez-vous
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
              Nous contacter
            </Button>
          </Link>
        </div>
      </motion.article>
    </div>
  )
}
