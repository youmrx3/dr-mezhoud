"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

const contactSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  telephone: z.string().optional(),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(2000, "Le message ne peut pas dépasser 2000 caractères"),
})

type ContactData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
  })

  function onSubmit(data: ContactData) {
    console.log("Contact form data:", data)
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card>
        <CardContent className="p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 text-success" />
              <p className="text-lg font-medium">Message envoyé !</p>
              <p className="text-sm text-muted-foreground max-w-sm">
                Merci de nous avoir contactés. Nous vous répondrons dans les plus
                brefs délais.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom complet *</Label>
                  <Input id="nom" placeholder="Votre nom" {...register("nom")} />
                  {errors.nom && (
                    <p className="text-xs text-danger">{errors.nom.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-danger">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  placeholder="+213 7xx xx xx xx"
                  {...register("telephone")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <textarea
                  id="message"
                  rows={5}
                  className="flex w-full rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[100px]"
                  placeholder="Votre message..."
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-xs text-danger">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className="gap-2">
                <Send className="h-4 w-4" />
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
