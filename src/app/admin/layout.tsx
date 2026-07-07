"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Stethoscope,
  LayoutDashboard,
  Users,
  Calendar,
  Apple,
  FileText,
  PenSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/lib/mock-auth-context"

const adminNav = [
  { label: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { label: "Patients", href: "/admin/patients", icon: Users },
  { label: "Rendez-vous", href: "/admin/appointments", icon: Calendar },
  { label: "Régimes", href: "/admin/diet-plans", icon: Apple },
  { label: "Documents", href: "/admin/documents", icon: FileText },
  { label: "Contenu", href: "/admin/content", icon: PenSquare },
  { label: "Paramètres", href: "/admin/parametres", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    } else if (user?.role !== "admin") {
      router.push("/patient")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") return null

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-surface flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col border-r border-border bg-background transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <Link href="/admin" className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            <span className="font-medium text-sm">Dr Mezhoud — Admin</span>
          </Link>
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {adminNav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-primary-light text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
          >
            <Stethoscope className="h-4 w-4" />
            Retour au site
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-danger hover:bg-surface transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4 lg:px-6">
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <p className="text-sm font-medium hidden sm:block">Administration</p>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 py-1.5 pl-2.5 pr-3 rounded-lg hover:bg-surface transition-colors"
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src="" alt={user.name} />
                <AvatarFallback className="text-xs bg-primary-light text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:block">
                {user.name}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1.5 w-56 z-20 rounded-xl border border-border bg-background shadow-lg p-1.5 space-y-0.5">
                  <Link
                    href="/admin/parametres"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Paramètres
                  </Link>
                  <hr className="border-border mx-2" />
                  <button
                    onClick={() => {
                      setDropdownOpen(false)
                      logout()
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-danger hover:bg-surface transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-8 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
