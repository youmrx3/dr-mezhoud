import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4 p-8">
        <p className="text-6xl font-mono font-bold text-primary">404</p>
        <h1 className="text-2xl font-medium">Page introuvable</h1>
        <p className="text-muted-foreground max-w-sm">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/">
          <Button>Retour à l&apos;accueil</Button>
        </Link>
      </div>
    </div>
  )
}
