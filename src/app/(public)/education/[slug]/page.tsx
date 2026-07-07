import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { DIET_CATEGORIES } from "@/lib/constants"
import { getPlansByCategory } from "@/data/diet-plans"

interface Props {
  params: Promise<{ slug: string }>
}

function reverseSlug(slug: string): string | undefined {
  return DIET_CATEGORIES.find((cat) => {
    const normalized = cat
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
    return normalized === slug
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = reverseSlug(slug)
  if (!category) return {}
  return { title: category }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = reverseSlug(slug)
  if (!category) notFound()

  const plans = getPlansByCategory(category)

  return (
    <div className="container-main py-12 md:py-16 space-y-10">
      <div className="space-y-4">
        <Link
          href="/education"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Retour à l&apos;éducation nutritionnelle
        </Link>
        <h1>{category}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {plans.length} guide{plans.length > 1 ? "s" : ""} disponible
          {plans.length > 1 ? "s" : ""} pour cette catégorie.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <Link key={plan.slug} href={`/education/${slug}/${plan.slug}`}>
            <Card className="h-full group hover:shadow-md transition-all hover:-translate-y-0.5">
              <CardContent className="p-5 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">
                  {plan.titre}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-1.5 transition-all">
                  Lire le guide
                  <ArrowRight className="h-3 w-3" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
