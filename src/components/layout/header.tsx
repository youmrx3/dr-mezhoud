"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Phone, Stethoscope, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MAIN_NAV, SITE_NAME } from "@/lib/constants"

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-main flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Stethoscope className="h-6 w-6 text-primary" />
          <span className="font-medium text-base">{SITE_NAME}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {MAIN_NAV.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/rendezvous">
            <Button size="sm" className="hidden sm:inline-flex gap-2">
              <Phone className="h-4 w-4" />
              Rendez-vous
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-72 bg-background border-l border-border shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-medium">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col p-4 gap-1">
                {MAIN_NAV.map((item) => {
                  const isActive =
                    pathname === item.href || pathname.startsWith(item.href + "/")
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary-light text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-surface"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
                <div className="mt-4 pt-4 border-t border-border">
                  <Link href="/rendezvous" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      Prendre rendez-vous
                    </Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
