# Dr Mezhoud Hadj — Cabinet de Néphrologie

Plateforme web complète pour un cabinet de néphrologie à Alger, combinant site public, éducation nutritionnelle, prise de rendez-vous en ligne, et dashboards patient/administrateur.

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| Langage | TypeScript 5 |
| Style | Tailwind CSS v4 + tw-animate-css |
| Formulaires | react-hook-form + @hookform/resolvers + Zod |
| Animations | Framer Motion |
| Icons | Lucide React |
| Graphiques | Recharts |
| UI Base | Radix UI (Dialog, Tabs, Avatar, Tooltip, Sheet, Toast, Select, Accordion, DropdownMenu, NavigationMenu, Separator, Label, Slot) |
| Base de données | Prisma (PostgreSQL — prêt pour Phase 2) |
| Polices | Geist Sans / Geist Mono |

---

## Structure du projet

```
src/
├── app/
│   ├── layout.tsx              # Root layout (AuthProvider wrapper)
│   ├── globals.css             # Thème Tailwind + variables CSS
│   ├── (public)/               # Site public (header + footer)
│   │   ├── page.tsx            # Accueil (hero, services, stats, blog, CTA)
│   │   ├── apropos/            # À propos du Dr Mezhoud
│   │   ├── services/           # Liste des services + détails [slug]
│   │   ├── cabinet/            # Le cabinet
│   │   ├── parcours/           # Parcours de soins
│   │   ├── blog/               # Articles + [slug]
│   │   ├── education/          # Guides nutritionnels (catégories + plans)
│   │   ├── contact/            # Formulaire de contact
│   │   ├── faq/                # FAQ
│   │   ├── appointment/        # Prise de rendez-vous (wizard)
│   │   ├── rendezvous/         # Page rendez-vous alternative
│   │   └── about/              # About page
│   ├── auth/
│   │   ├── login/              # Connexion (mock: admin + patient)
│   │   ├── register/           # Inscription patient
│   │   └── forgot-password/    # Mot de passe oublié
│   ├── patient/                # Dashboard patient (auth required)
│   │   ├── page.tsx            # Stats, activité, actions rapides
│   │   ├── appointments/       # RDV (À venir / Passés / Tous)
│   │   ├── documents/          # Documents groupés par type
│   │   ├── diet-plans/         # Régimes alimentaires (search + filtre)
│   │   └── profile/            # Profil + mot de passe + contact urgence
│   └── admin/                  # Dashboard admin (auth required)
│       ├── page.tsx            # Stats + graphiques Recharts
│       ├── patients/           # Tableau des patients (search + pagination)
│       ├── appointments/       # Gestion RDV (confirmer/annuler/terminer)
│       ├── calendar/           # Calendrier mensuel
│       ├── diet-plans/         # CRUD régimes alimentaires
│       ├── documents/          # Upload + assignation patient
│       ├── content/            # CRUD Services / FAQ / Témoignages
│       └── parametres/         # Infos cabinet, horaires, notifications
├── components/
│   ├── layout/                 # Header, Footer
│   ├── sections/               # Hero, Services, Stats, Blog, CTA, FAQ, etc.
│   └── ui/                     # Button, Card, Input, Badge, Dialog, Tabs, Avatar...
├── data/
│   └── diet-plans.ts           # 24 plans nutritionnels (8 catégories)
├── lib/
│   ├── constants.ts            # Site config, nav, heures, catégories
│   ├── mock-data.ts            # Toutes les données mock
│   ├── mock-auth-context.tsx    # Contexte d'auth mock (Phase 1)
│   └── utils.ts                # cn() helper
└── types/
    └── index.ts                # Tous les types TypeScript
```

---

## Pages et fonctionnalités

### Site public (18 pages)

| Route | Description |
|---|---|
| `/` | Accueil : Hero, Services, Statistiques, Blog, Témoignages, CTA |
| `/apropos` | Biographie, diplômes, expériences du Dr Mezhoud |
| `/services` | Grille des services avec recherche + filtre catégorie |
| `/services/[slug]` | Détail d'un service |
| `/cabinet` | Infos du cabinet, horaires, équipements |
| `/parcours` | Parcours de soins en 5 étapes |
| `/blog` | Liste des articles |
| `/blog/[slug]` | Article complet |
| `/education` | 8 catégories nutritionnelles + Pathologies rénales (tabs) |
| `/education/[slug]` | 3 plans par catégorie |
| `/education/[slug]/[planSlug]` | Contenu HTML complet du plan |
| `/contact` | Formulaire de contact + infos |
| `/faq` | FAQ par catégories |
| `/appointment` | Wizard de prise de rendez-vous (6 étapes) |
| `/rendezvous` | Page RDV alternative |

### Authentification (3 pages)

| Route | Description |
|---|---|
| `/auth/login` | Connexion (mock credentials) |
| `/auth/register` | Inscription avec validation Zod (nom, email, téléphone algérien, mot de passe fort) |
| `/auth/forgot-password` | Email → message générique de confirmation |

### Patient dashboard (5 pages)

| Route | Description |
|---|---|
| `/patient` | Stats (prochain RDV, total, docs, régimes), activité récente, quick actions |
| `/patient/appointments` | Tabs À venir / Passés / Tous, annulation mock |
| `/patient/documents` | Documents groupés par type, upload UI, preview/download mock |
| `/patient/diet-plans` | Search + filtre catégorie, liens vers guides éducation |
| `/patient/profile` | Infos personnelles, contact urgence, changement mot de passe |

### Admin dashboard (8 pages)

| Route | Description |
|---|---|
| `/admin` | Stats + BarChart (consultations/semaine) + LineChart (patients/6 mois) |
| `/admin/patients` | Table avec search + pagination, actions view/edit/delete |
| `/admin/appointments` | Filtre statut, actions Confirmer/Annuler/Terminer (mock state) |
| `/admin/calendar` | Calendrier mensuel, clique jour → détail RDV |
| `/admin/diet-plans` | CRUD grid, dialog création/édition avec champ HTML, confirmation suppression |
| `/admin/documents` | Upload + assignation patient, groupé par type |
| `/admin/content` | 3 tabs (Services / FAQ / Témoignages) avec CRUD complet |
| `/admin/parametres` | Infos cabinet, horaires 7 jours, toggles notifications |

---

## Authentification (Phase 1 — Mock)

Les credentials mock sont définis dans `src/lib/mock-auth-context.tsx` :

| Rôle | Email | Mot de passe |
|---|---|---|
| **Admin** | `admin@drmezhoud.dz` | `Admin123!` |
| **Patient** | `patient@drmezhoud.dz` | `Patient123!` |

Le `AuthProvider` wrappe le root layout. `useAuth()` expose `{ user, login, logout, isAuthenticated }`.  
Les dashboards sont protégés côté client (redirect si non-auth ou mauvais rôle).  
*Remplacement par JWT réel en Phase 2.*

---

## Données mock

Toutes les données de démonstration sont dans `src/lib/mock-data.ts` :

- **Utilisateurs** : 1 admin + 5 patients
- **Patients** : 5 profils médicaux
- **Rendez-vous** : 8 consultations
- **Services** : 7 services médicaux
- **Régimes** : 6 plans alimentaires assignés
- **Documents** : 7 documents patients
- **Témoignages** : 6 avis patients
- **FAQ** : 8 questions/réponses
- **Articles** : 8 articles de blog
- **Pathologies** : 6 fiches pathologies

24 plans nutritionnels additionnels dans `src/data/diet-plans.ts` (8 catégories × 3 plans).

---

## Commandes

```bash
npm run dev       # Développement (http://localhost:3000)
npm run build     # Production build
npm run start     # Démarrer le build production
npm run lint      # ESLint
```

---

## Phases futures (Phase 2)

- Backend API (Next.js API Routes)
- Authentification JWT réelle (cookies, middleware)
- Base de données PostgreSQL via Prisma (déjà configuré)
- Upload de fichiers réel
- Notifications email
- Paiement en ligne
- Mode sombre
- i18n (Arabe/Français)
