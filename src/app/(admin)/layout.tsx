import Link from "next/link"
import { Stethoscope, LayoutDashboard, Users, Calendar, FileText, Settings, LogOut } from "lucide-react"

const adminNav = [
  { label: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { label: "Patients", href: "/admin/patients", icon: Users },
  { label: "Rendez-vous", href: "/admin/rendezvous", icon: Calendar },
  { label: "Articles", href: "/admin/articles", icon: FileText },
  { label: "Paramètres", href: "/admin/parametres", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-surface flex">
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-background">
        <div className="p-5 border-b border-border">
          <Link href="/admin" className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            <span className="font-medium text-sm">Dr Mezhoud — Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-danger hover:bg-surface transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Retour au site
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-border bg-background flex items-center px-6 lg:px-8">
          <p className="text-sm font-medium">Tableau de bord</p>
        </header>
        <div className="flex-1 p-6 lg:p-8">{children}</div>
      </div>
    </div>
  )
}
