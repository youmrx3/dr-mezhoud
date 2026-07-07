"use client"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4 p-8">
        <p className="text-6xl font-mono font-bold text-danger">!</p>
        <h1 className="text-2xl font-medium">Une erreur est survenue</h1>
        <p className="text-muted-foreground max-w-sm">
          Veuillez réessayer ou revenir à l&apos;accueil.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset}>Réessayer</Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Accueil
          </Button>
        </div>
      </div>
    </div>
  )
}
