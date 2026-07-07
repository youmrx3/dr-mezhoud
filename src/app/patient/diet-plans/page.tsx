"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Apple, ArrowRight, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/mock-auth-context"
import { mockDietPlans, mockPatients } from "@/lib/mock-data"
import { DIET_CATEGORIES } from "@/lib/constants"
import { getPlansByCategory } from "@/data/diet-plans"

function categorySlug(cat: string): string {
  return cat
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
}

export default function DietPlansPage() {
  const { user } = useAuth()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  const patient = useMemo(
    () => mockPatients.find((p) => p.userId === user?.email),
    [user]
  )

  const plans = useMemo(
    () => mockDietPlans.filter((p) => p.patientId === patient?.id),
    [patient]
  )

  const filtered = useMemo(
    () =>
      plans.filter((p) => {
        const matchSearch =
          !search ||
          p.titre.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
        const matchCategory = !category || p.category === category
        return matchSearch && matchCategory
      }),
    [plans, search, category]
  )

  function getEducationLink(plan: (typeof plans)[number]): string {
    const entries = getPlansByCategory(plan.category)
    if (entries.length > 0) {
      return `/education/${categorySlug(plan.category)}/${entries[0].slug}`
    }
    return `/education/${categorySlug(plan.category)}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl">Mes régimes alimentaires</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Plans nutritionnels personnalisés pour votre santé rénale
        </p>
      </div>

      {plans.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center space-y-3">
            <Apple className="h-10 w-10 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">
              Aucun plan alimentaire pour le moment
            </p>
            <Link href="/education">
              <Button variant="outline" size="sm" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Explorer les guides
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un régime..."
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
              <option value="">Toutes catégories</option>
              {DIET_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-sm text-muted-foreground">
                Aucun résultat trouvé
              </CardContent>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {filtered.map((plan) => (
                <Link key={plan.id} href={getEducationLink(plan)}>
                  <Card className="h-full group hover:shadow-md transition-all hover:-translate-y-0.5">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Apple className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] text-muted-foreground bg-surface px-2 py-0.5 rounded-full">
                          {plan.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                        {plan.titre}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {plan.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                        <span>
                          Du{" "}
                          {new Date(plan.dateDebut).toLocaleDateString("fr-FR")}
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium text-primary group-hover:gap-1.5 transition-all">
                          Voir le plan <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}
