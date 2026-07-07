import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DIET_CATEGORIES } from "@/lib/constants"
import { getPlanBySlug } from "@/data/diet-plans"

interface Props {
  params: Promise<{ slug: string; planSlug: string }>
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
  const { planSlug } = await params
  const plan = getPlanBySlug(planSlug)
  if (!plan) return {}
  return { title: plan.titre }
}

export default async function PlanPage({ params }: Props) {
  const { slug, planSlug } = await params
  const category = reverseSlug(slug)
  if (!category) notFound()

  const plan = getPlanBySlug(planSlug)
  if (!plan || plan.category !== category) notFound()

  return (
    <div className="container-main py-12 md:py-16 space-y-8">
      <div className="space-y-4">
        <Link
          href={`/education/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à {category}
        </Link>
        <h1>{plan.titre}</h1>
        <p className="text-muted-foreground">{plan.description}</p>
      </div>

      <div
        className="prose prose-sm sm:prose-base max-w-none prose-headings:text-foreground prose-headings:font-medium prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-ul:space-y-1"
        dangerouslySetInnerHTML={{ __html: plan.content }}
      />

      <div className="pt-4 border-t border-border">
        <Button variant="outline" className="gap-2" disabled>
          <FileText className="h-4 w-4" />
          Télécharger en PDF
        </Button>
      </div>
    </div>
  )
}
