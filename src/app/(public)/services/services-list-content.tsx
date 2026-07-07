"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, ArrowRight, Stethoscope, Activity, Heart, Scan, Droplets, ClipboardList } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockServices, getServiceCategories } from "@/lib/mock-data"

const iconMap: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope className="h-6 w-6" />,
  Activity: <Activity className="h-6 w-6" />,
  HeartPulse: <Activity className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
  Scan: <Scan className="h-6 w-6" />,
  Droplets: <Droplets className="h-6 w-6" />,
  ClipboardList: <ClipboardList className="h-6 w-6" />,
}

const categories = getServiceCategories()

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ServicesListContent() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  const filtered = useMemo(
    () =>
      mockServices.filter((s) => {
        const matchSearch =
          !search ||
          s.nom.toLowerCase().includes(search.toLowerCase()) ||
          s.description.toLowerCase().includes(search.toLowerCase())
        const matchCategory = !category || s.categorie === category
        return matchSearch && matchCategory && s.actif
      }),
    [search, category]
  )

  return (
    <div className="container-main py-12 md:py-16 space-y-10">
      <div className="space-y-4 max-w-3xl">
        <h1>Nos services</h1>
        <p className="text-muted-foreground text-lg">
          Découvrez l&apos;ensemble des services de néphrologie proposés par le
          Dr Mezhoud Hadj pour votre santé rénale.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((service) => (
          <motion.div key={service.id} variants={item}>
            <Link href={`/services/${service.slug}`}>
              <Card className="h-full group hover:shadow-md transition-all hover:-translate-y-1">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      {iconMap[service.icone] || <Stethoscope className="h-6 w-6" />}
                    </div>
                    <Badge variant="secondary" className="text-[10px]">
                      {service.categorie}
                    </Badge>
                  </div>
                  <h3 className="font-medium">{service.nom}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 text-sm">
                    <span className="text-muted-foreground">{service.duree} min</span>
                    <span className="inline-flex items-center gap-1 font-medium text-primary group-hover:gap-2 transition-all">
                      Détails <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">Aucun service trouvé</p>
          <p className="text-sm mt-1">
            Essayez de modifier vos filtres ou votre recherche.
          </p>
        </div>
      )}
    </div>
  )
}
