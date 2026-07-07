"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Save, Key, Phone, User as UserIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/mock-auth-context"
import { mockPatients } from "@/lib/mock-data"

const patientProfileSchema = z.object({
  nom: z.string().min(2, "Minimum 2 caractères"),
  prenom: z.string().min(2, "Minimum 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z
    .string()
    .regex(
      /^(\+213|0)[5-7][0-9]{8}$/,
      "Format algérien invalide"
    ),
  dateNaissance: z.string().min(1, "Requis"),
  groupeSanguin: z.string().optional(),
  allergies: z.string().optional(),
  antecedent: z.string().optional(),
  medecinTraitant: z.string().optional(),
  contactUrgence: z.string().optional(),
  telephoneUrgence: z
    .string()
    .regex(/^(\+213|0)[5-7][0-9]{8}$/, "Format invalide")
    .or(z.literal(""))
    .optional(),
})

type PatientProfileData = z.infer<typeof patientProfileSchema>

export default function ProfilePage() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)

  const patient = useMemo(
    () => mockPatients.find((p) => p.userId === user?.email),
    [user]
  )

  const profileForm = useForm<PatientProfileData>({
    resolver: zodResolver(patientProfileSchema),
    defaultValues: {
      nom: user?.name.split(" ")[0] ?? "",
      prenom: user?.name.split(" ").slice(1).join(" ") ?? "",
      email: user?.email ?? "",
      telephone: "0551234567",
      dateNaissance: patient?.dateNaissance ?? "",
      groupeSanguin: patient?.groupeSanguin ?? "",
      allergies: patient?.allergies ?? "",
      antecedent: patient?.antecedent ?? "",
      medecinTraitant: patient?.medecinTraitant ?? "",
      contactUrgence: "",
      telephoneUrgence: "",
    },
  })

  const passwordForm = useForm<{
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }>({
    resolver: zodResolver(
      z
        .object({
          currentPassword: z.string().min(1, "Requis"),
          newPassword: z
            .string()
            .min(8, "Minimum 8 caractères")
            .regex(/[A-Z]/, "Doit contenir une majuscule")
            .regex(/[a-z]/, "Doit contenir une minuscule")
            .regex(/[0-9]/, "Doit contenir un chiffre"),
          confirmPassword: z.string().min(1, "Confirmation requise"),
        })
        .refine((d) => d.newPassword === d.confirmPassword, {
          message: "Les mots de passe ne correspondent pas",
          path: ["confirmPassword"],
        })
    ),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  })

  function onSaveProfile(_data: PatientProfileData) {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function onSavePassword(_data: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }) {
    setPasswordSaved(true)
    passwordForm.reset()
    setTimeout(() => setPasswordSaved(false), 3000)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-xl">Mon profil</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gérez vos informations personnelles et votre mot de passe
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-6 space-y-5">
            <h2 className="text-sm font-medium flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-primary" />
              Informations personnelles
            </h2>

            <form
              onSubmit={profileForm.handleSubmit(onSaveProfile)}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    {...profileForm.register("nom")}
                  />
                  {profileForm.formState.errors.nom && (
                    <p className="text-xs text-danger">
                      {profileForm.formState.errors.nom.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    {...profileForm.register("prenom")}
                  />
                  {profileForm.formState.errors.prenom && (
                    <p className="text-xs text-danger">
                      {profileForm.formState.errors.prenom.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...profileForm.register("email")}
                  />
                  {profileForm.formState.errors.email && (
                    <p className="text-xs text-danger">
                      {profileForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    {...profileForm.register("telephone")}
                  />
                  {profileForm.formState.errors.telephone && (
                    <p className="text-xs text-danger">
                      {profileForm.formState.errors.telephone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateNaissance">
                    Date de naissance
                  </Label>
                  <Input
                    id="dateNaissance"
                    type="date"
                    {...profileForm.register("dateNaissance")}
                  />
                  {profileForm.formState.errors.dateNaissance && (
                    <p className="text-xs text-danger">
                      {profileForm.formState.errors.dateNaissance.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groupeSanguin">
                    Groupe sanguin
                  </Label>
                  <Input
                    id="groupeSanguin"
                    placeholder="A+, O-..."
                    {...profileForm.register("groupeSanguin")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medecinTraitant">
                  Médecin traitant
                </Label>
                <Input
                  id="medecinTraitant"
                  {...profileForm.register("medecinTraitant")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  id="allergies"
                  placeholder="Liste des allergies connues"
                  {...profileForm.register("allergies")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="antecedent">
                  Antécédents médicaux
                </Label>
                <Input
                  id="antecedent"
                  placeholder="Principaux antécédents"
                  {...profileForm.register("antecedent")}
                />
              </div>

              <div className="pt-2 border-t border-border">
                <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  Contact d&apos;urgence
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactUrgence">
                      Nom du contact
                    </Label>
                    <Input
                      id="contactUrgence"
                      placeholder="Nom et prénom"
                      {...profileForm.register("contactUrgence")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephoneUrgence">
                      Téléphone d&apos;urgence
                    </Label>
                    <Input
                      id="telephoneUrgence"
                      type="tel"
                      placeholder="0551234567"
                      {...profileForm.register("telephoneUrgence")}
                    />
                    {profileForm.formState.errors.telephoneUrgence && (
                      <p className="text-xs text-danger">
                        {
                          profileForm.formState.errors.telephoneUrgence
                            .message
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="submit"
                  className="gap-2"
                  disabled={profileForm.formState.isSubmitting}
                >
                  <Save className="h-4 w-4" />
                  Enregistrer
                </Button>
                {saved && (
                  <span className="text-xs text-success">
                    Informations mises à jour
                  </span>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6 space-y-5">
            <h2 className="text-sm font-medium flex items-center gap-2">
              <Key className="h-4 w-4 text-primary" />
              Mot de passe
            </h2>
            <form
              onSubmit={passwordForm.handleSubmit(onSavePassword)}
              className="space-y-4"
            >
              <div className="sm:w-72 space-y-2">
                <Label htmlFor="currentPassword">
                  Mot de passe actuel
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  {...passwordForm.register("currentPassword")}
                />
                {passwordForm.formState.errors.currentPassword && (
                  <p className="text-xs text-danger">
                    {
                      passwordForm.formState.errors.currentPassword
                        .message
                    }
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">
                    Nouveau mot de passe
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Min 8 car., maj, min, chiffre"
                    {...passwordForm.register("newPassword")}
                  />
                  {passwordForm.formState.errors.newPassword && (
                    <p className="text-xs text-danger">
                      {
                        passwordForm.formState.errors.newPassword
                          .message
                      }
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirmer le mot de passe
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...passwordForm.register("confirmPassword")}
                  />
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="text-xs text-danger">
                      {
                        passwordForm.formState.errors.confirmPassword
                          .message
                      }
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  className="gap-2"
                  disabled={passwordForm.formState.isSubmitting}
                >
                  <Key className="h-4 w-4" />
                  Modifier le mot de passe
                </Button>
                {passwordSaved && (
                  <span className="text-xs text-success">
                    Mot de passe mis à jour
                  </span>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
