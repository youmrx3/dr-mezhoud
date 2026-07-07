"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

const forgotSchema = z.object({
  email: z.string().email("Adresse email invalide"),
})

type ForgotData = z.infer<typeof forgotSchema>

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotData>({
    resolver: zodResolver(forgotSchema),
  })

  function onSubmit(_data: ForgotData) {
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1.5">
              <h1 className="text-xl">Mot de passe oublié</h1>
              <p className="text-sm text-muted-foreground">
                Saisissez votre email pour recevoir un lien de réinitialisation
              </p>
            </div>

            {sent ? (
              <div className="text-center space-y-3 py-4">
                <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Si un compte existe avec cette adresse, un email de
                  réinitialisation a été envoyé.
                </p>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-2"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Retour à la connexion
                </Link>
              </div>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@email.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-danger">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    <Mail className="h-4 w-4" />
                    {isSubmitting ? "Envoi..." : "Envoyer"}
                  </Button>
                </form>

                <div className="text-center">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Retour à la connexion
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
