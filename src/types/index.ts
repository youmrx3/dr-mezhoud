export type Role = "ADMIN" | "PATIENT"
export type AppointmentStatus = "SCHEDULED" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
export type Sexe = "M" | "F"
export type GroupeSanguin = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"

export interface User {
  id: string
  email: string
  passwordHash: string
  nom: string
  prenom: string
  role: Role
  telephone: string
  createdAt: string
  updatedAt: string
}

export interface Patient {
  id: string
  userId: string
  dateNaissance: string
  sexe: Sexe
  groupeSanguin: GroupeSanguin
  taille: number
  poids: number
  allergies: string
  antecedent: string
  medecinTraitant: string
  createdAt: string
  updatedAt: string
}

export interface Appointment {
  id: string
  patientId: string
  patientNom: string
  patientPrenom: string
  date: string
  startTime: string
  endTime: string
  type: string
  status: AppointmentStatus
  motif: string
  notes: string
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: string
  nom: string
  slug: string
  description: string
  duree: number
  prix: number
  icone: string
  categorie: string
  actif: boolean
}

export interface DietPlan {
  id: string
  patientId: string
  titre: string
  description: string
  category: string
  content: string
  dateDebut: string
  dateFin: string
  createdAt: string
}

export interface Document {
  id: string
  patientId: string
  type: string
  titre: string
  description: string
  fileUrl: string
  uploadedAt: string
}

export interface Testimonial {
  id: string
  patientId: string
  patientNom: string
  note: number
  commentaire: string
  date: string
  visible: boolean
}

export interface FAQ {
  id: string
  question: string
  reponse: string
  category: string
  ordre: number
}

export interface DashboardStats {
  totalPatients: number
  consultationsJour: number
  consultationsMois: number
  nouveauxPatientsMois: number
  tauxOccupation: number
  rdvConfirmes: number
  rdvEnAttente: number
}

export interface Medecin {
  id: string
  nom: string
  prenom: string
  specialite: string
  titre: string
  bio: string
  photo: string
  email: string
  telephone: string
  diplomes: string[]
  experiences: Experience[]
  horaires: Horaires[]
}

export interface Experience {
  annee: string
  titre: string
  lieu: string
  description: string
}

export interface Horaires {
  jour: string
  matin: string
  apresMidi: string
}

export interface Cabinet {
  nom: string
  adresse: string
  ville: string
  codePostal: string
  telephone: string
  email: string
  urgence: string
  description: string
  services: string[]
  equipements: string[]
  photos: string[]
}

export interface Pathologie {
  id: string
  nom: string
  description: string
  symptomes: string[]
  causes: string[]
  traitements: string[]
  icone: string
}

export interface Article {
  id: string
  slug: string
  titre: string
  resume: string
  contenu: string
  auteur: string
  date: string
  image: string
  tags: string[]
  lectureMin: number
}

export interface Temoignage {
  id: string
  patient: string
  note: number
  commentaire: string
  date: string
  initiales: string
}

export interface Statistique {
  valeur: string
  label: string
  icone: string
}

export interface FormulaireContact {
  nom: string
  email: string
  telephone?: string
  sujet: string
  message: string
}

export interface RendezVous {
  nom: string
  prenom: string
  email: string
  telephone: string
  date: string
  creneau: string
  motif: string
  nouveauPatient: boolean
  notes?: string
}

export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}

export interface EtapeParcours {
  id: string
  titre: string
  description: string
  duree: string
  icone: string
}
