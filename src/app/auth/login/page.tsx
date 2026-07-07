"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { LogIn, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/lib/mock-auth-context"

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
})

type LoginData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginData) {
    setError("")
    const result = await login(data.email, data.password)
    if (result === "invalid") setError("Email ou mot de passe incorrect")
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
              <h1 className="text-xl">Connexion</h1>
              <p className="text-sm text-muted-foreground">
                Accédez à votre espace patient ou administrateur
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@email.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-danger">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    className="pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-danger">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-primary focus:ring-ring accent-primary"
                  />
                  <span className="text-muted-foreground">Se souvenir de moi</span>
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-primary hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {error && (
                <p className="text-sm text-danger bg-danger-light rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                <LogIn className="h-4 w-4" />
                {isSubmitting ? "Connexion..." : "Se connecter"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link href="/auth/register" className="text-primary hover:underline">
                Créer un compte
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
