import type { NavigationItem, Statistique } from "@/types"

export const SITE_NAME = "Dr Mezhoud Hadj"
export const SITE_DESCRIPTION =
  "Cabinet de Néphrologie — Prise en charge spécialisée des maladies rénales à Alger"
export const CONTACT_EMAIL = "contact@drmezhoud.dz"
export const CONTACT_PHONE = "+213 21 63 12 45"
export const ADDRESS = "42 Rue Didouche Mourad, Alger Centre 16000, Algérie"

export const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.5!2d3.058!3d36.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ1JzAwLjAiTiAzwrAwMyczMC4wIkU!5e0!3m2!1sfr!2sdz!4v1"

export const APPOINTMENT_DURATION = 30
export const MAX_FUTURE_DAYS = 60
export const SLOT_START_HOUR = 8
export const SLOT_END_HOUR = 17
export const CLOSED_DAY = "Saturday"

export const WORKING_HOURS = [
  { day: "Dimanche", open: "08:30", close: "16:30" },
  { day: "Lundi", open: "08:30", close: "16:30" },
  { day: "Mardi", open: "08:30", close: "16:30" },
  { day: "Mercredi", open: "08:30", close: "16:30" },
  { day: "Jeudi", open: "08:30", close: "16:30" },
  { day: "Vendredi", open: "08:30", close: "12:00" },
  { day: "Samedi", open: "", close: "" },
]

export const DIET_CATEGORIES = [
  "Régime hyposodé",
  "Régime hypoprotidique",
  "Régime contrôlé en potassium",
  "Régime contrôlé en phosphore",
  "Régime pour dialyse",
  "Régime post-transplantation",
  "Régime pour lithiase urinaire",
  "Régime pour diabétique",
]

export const APPOINTMENT_TYPES = [
  "Consultation initiale",
  "Suivi de maladie rénale chronique",
  "Hypertension artérielle",
  "Bilan pré-transplantation",
  "Résultats d'analyses",
  "Échographie rénale",
  "Urgence (contactez le cabinet)",
  "Autre",
]

export const DOCUMENT_TYPES = [
  "Ordonnance",
  "Compte-rendu de consultation",
  "Compte-rendu d'hospitalisation",
  "Bilan biologique",
  "Compte-rendu d'échographie",
  "Compte-rendu opératoire",
  "Certificat médical",
  "Courrier de correspondance",
  "Résultat d'examen",
  "Autre",
]

export const MAIN_NAV: NavigationItem[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/apropos" },
  { label: "Services", href: "/services" },
  { label: "Le Cabinet", href: "/cabinet" },
  { label: "Parcours de soins", href: "/parcours" },
  { label: "Éducation", href: "/education" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export const STATISTIQUES: Statistique[] = [
  { valeur: "15+", label: "Années d'expérience", icone: "Calendar" },
  { valeur: "10 000+", label: "Patients suivis", icone: "Users" },
  { valeur: "98%", label: "Satisfaction patient", icone: "Heart" },
  { valeur: "50+", label: "Articles publiés", icone: "FileText" },
]

export const RESEAUX_SOCIAUX = {
  facebook: "https://facebook.com/drmezhoud",
  linkedin: "https://linkedin.com/in/drmezhoud",
  youtube: "https://youtube.com/@drmezhoud",
}

export const CABINET_INFO = {
  adresse: "42 Rue Didouche Mourad, Alger Centre",
  telephone: "+213 21 63 12 45",
  urgence: "+213 770 12 34 56",
  email: "contact@drmezhoud.dz",
  horaires: {
    semaine: "08h30 – 16h30",
    vendredi: "08h30 – 12h00",
    weekEnd: "Fermé",
  },
}

export const URGENCE_PHONE = "+213 770 12 34 56"
