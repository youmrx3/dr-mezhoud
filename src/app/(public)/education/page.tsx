import type { Metadata } from "next"
import Link from "next/link"
import {
  ChefHat,
  Apple,
  Wheat,
  Bone,
  Droplets,
  Heart,
  Filter,
  Activity,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { DIET_CATEGORIES } from "@/lib/constants"
import { PathologiesList } from "@/components/sections/pathologies-list"

export const metadata: Metadata = {
  title: "Éducation nutritionnelle",
  description:
    "Découvrez nos guides alimentaires adaptés aux maladies rénales",
}

const iconMap: Record<string, React.ReactNode> = {
  "Régime hyposodé": <Droplets className="h-6 w-6" />,
  "Régime hypoprotidique": <Wheat className="h-6 w-6" />,
  "Régime contrôlé en potassium": <Apple className="h-6 w-6" />,
  "Régime contrôlé en phosphore": <Bone className="h-6 w-6" />,
  "Régime pour dialyse": <Filter className="h-6 w-6" />,
  "Régime post-transplantation": <Heart className="h-6 w-6" />,
  "Régime pour lithiase urinaire": <Activity className="h-6 w-6" />,
  "Régime pour diabétique": <ChefHat className="h-6 w-6" />,
}

const descriptions: Record<string, string> = {
  "Régime hyposodé":
    "Réduire le sodium pour protéger vos reins et votre cœur.",
  "Régime hypoprotidique":
    "Adapter les protéines pour ralentir la progression de l'insuffisance rénale.",
  "Régime contrôlé en potassium":
    "Équilibrer le potassium pour éviter les complications cardiaques.",
  "Régime contrôlé en phosphore":
    "Limiter le phosphore pour protéger vos os et vos artères.",
  "Régime pour dialyse":
    "Adapter votre alimentation pendant les séances de dialyse.",
  "Régime post-transplantation":
    "Retrouver une alimentation équilibrée après une greffe rénale.",
  "Régime pour lithiase urinaire":
    "Prévenir la formation de calculs rénaux par l'alimentation.",
  "Régime pour diabétique":
    "Contrôler votre glycémie pour protéger vos reins.",
}

function categorySlug(cat: string): string {
  return cat
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
}

export default function EducationPage() {
  return (
    <div className="container-main py-12 md:py-16 space-y-16">
      <div className="space-y-4 max-w-3xl">
        <h1>Éducation nutritionnelle</h1>
        <p className="text-muted-foreground text-lg">
          Guides alimentaires adaptés aux maladies rénales, élaborés par le
          Dr Mezhoud Hadj.
        </p>
      </div>

      <section id="pathologies" className="scroll-mt-20 space-y-6">
        <h2>Pathologies rénales</h2>
        <p className="text-muted-foreground">
          Informations détaillées sur les principales pathologies rénales
          prises en charge par le Dr Mezhoud Hadj.
        </p>
        <PathologiesList />
      </section>

      <section id="regimes" className="scroll-mt-20 space-y-6">
        <h2>Régimes alimentaires</h2>
        <p className="text-muted-foreground">
          Plans alimentaires thérapeutiques adaptés à chaque pathologie rénale.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {DIET_CATEGORIES.map((cat) => (
            <Link key={cat} href={`/education/${categorySlug(cat)}`}>
              <Card className="h-full group hover:shadow-md transition-all hover:-translate-y-0.5">
                <CardContent className="p-5 space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    {iconMap[cat]}
                  </div>
                  <h3 className="text-sm font-medium leading-snug">{cat}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {descriptions[cat]}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
