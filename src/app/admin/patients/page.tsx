"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, ChevronLeft, ChevronRight, Eye, Edit, Trash2, UserPlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockPatients } from "@/lib/mock-data"
import { useAuth } from "@/lib/mock-auth-context"

const PAGE_SIZE = 6

export default function AdminPatientsPage() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)

  const filtered = useMemo(
    () =>
      mockPatients.filter(
        (p) =>
          !search ||
          p.id.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl">Patients</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} patients</p>
        </div>
        <Button className="gap-2"><UserPlus className="h-4 w-4" />Ajouter un patient</Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par ID..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0) }}
            className="pl-9"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-muted-foreground text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-3 font-medium">ID</th>
              <th className="text-left px-4 py-3 font-medium">Sexe</th>
              <th className="text-left px-4 py-3 font-medium">Date naissance</th>
              <th className="text-left px-4 py-3 font-medium">Groupe sanguin</th>
              <th className="text-left px-4 py-3 font-medium">Médecin traitant</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paged.map((p) => (
              <tr key={p.id} className="hover:bg-surface/50 transition-colors">
                <td className="px-4 py-3 font-medium">{p.id}</td>
                <td className="px-4 py-3">{p.sexe === "M" ? "Homme" : "Femme"}</td>
                <td className="px-4 py-3">{new Date(p.dateNaissance).toLocaleDateString("fr-FR")}</td>
                <td className="px-4 py-3"><Badge variant="secondary">{p.groupeSanguin}</Badge></td>
                <td className="px-4 py-3 text-muted-foreground">{p.medecinTraitant}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-danger hover:text-danger"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Page {page + 1} sur {totalPages}</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={page === 0} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
