import Link from "next/link"
import { Stethoscope, Phone, Mail, MapPin, Clock, AlertCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  MAIN_NAV,
  CABINET_INFO,
  RESEAUX_SOCIAUX,
} from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-main py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              <span className="font-medium">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground">{SITE_DESCRIPTION}</p>
            <div className="flex gap-3">
              <a
                href={RESEAUX_SOCIAUX.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-fg transition-colors"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold">f</span>
              </a>
              <a
                href={RESEAUX_SOCIAUX.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-fg transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-bold">in</span>
              </a>
              <a
                href={RESEAUX_SOCIAUX.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-fg transition-colors"
                aria-label="YouTube"
              >
                <span className="text-xs font-bold">YT</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </h3>
            <ul className="space-y-2">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Coordonnées
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>
                  {CABINET_INFO.adresse}
                  <br /> Alger, Algérie
                </span>
              </li>
              <li>
                <a
                  href={`tel:${CABINET_INFO.telephone}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  {CABINET_INFO.telephone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CABINET_INFO.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  {CABINET_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Horaires
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <div>
                  <span className="block">Dim – Jeu : 08h30 – 16h30</span>
                  <span className="block">Vendredi : 08h30 – 12h00</span>
                  <span className="block">Samedi : Fermé</span>
                </div>
              </li>
              <li className="flex items-start gap-2 text-sm text-amber-600">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <span className="block font-medium">Urgence</span>
                  <a
                    href={`tel:${CABINET_INFO.urgence}`}
                    className="hover:text-primary transition-colors"
                  >
                    {CABINET_INFO.urgence}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      <div className="container-main py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-primary transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-primary transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
