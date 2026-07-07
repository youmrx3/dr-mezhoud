"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose,
} from "@/components/ui/dialog"
import { mockDietPlans, mockPatients } from "@/lib/mock-data"
import { DIET_CATEGORIES } from "@/lib/constants"

interface DietPlanForm {
  id: string
  titre: string
  description: string
  category: string
  patientId: string
  content: string
  dateDebut: string
  dateFin: string
  createdAt: string
}

let nextId = 100

const emptyForm: DietPlanForm = {
  id: "",
  titre: "",
  description: "",
  category: "",
  patientId: "",
  content: "",
  dateDebut: "",
  dateFin: "",
  createdAt: new Date().toISOString(),
}

export default function AdminDietPlansPage() {
  const [plans, setPlans] = useState(mockDietPlans)
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const [form, setForm] = useState<DietPlanForm>(emptyForm)
  const [editing, setEditing] = useState(false)

  const filtered = useMemo(
    () =>
      plans.filter((p) => !search || p.titre.toLowerCase().includes(search.toLowerCase())),
    [plans, search]
  )

  function openCreate() {
    setForm({ ...emptyForm, id: `plan-${nextId++}`, dateDebut: new Date().toISOString().split("T")[0] })
    setEditing(false)
    setDialogOpen(true)
  }

  function openEdit(plan: (typeof plans)[number]) {
    setForm({ ...plan })
    setEditing(true)
    setDialogOpen(true)
  }

  function save() {
    if (editing) {
      setPlans((prev) => prev.map((p) => (p.id === form.id ? form as typeof p : p)))
    } else {
      setPlans((prev) => [...prev, form as typeof prev[0]])
    }
    setDialogOpen(false)
  }

  function confirmDelete(id: string) {
    setDeleteId(id)
    setDeleteOpen(true)
  }

  function doDelete() {
    setPlans((prev) => prev.filter((p) => p.id !== deleteId))
    setDeleteOpen(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl">Régimes alimentaires</h1>
          <p className="text-sm text-muted-foreground mt-1">{plans.length} plans</p>
        </div>
        <Button className="gap-2" onClick={openCreate}><Plus className="h-4 w-4" />Nouveau régime</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((plan) => (
          <Card key={plan.id} className="group">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <Badge variant="secondary" className="text-[10px]">{plan.category}</Badge>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => openEdit(plan)}>
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-danger" onClick={() => confirmDelete(plan.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <h3 className="text-sm font-medium">{plan.titre}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{plan.description}</p>
              <div className="text-[11px] text-muted-foreground flex items-center justify-between">
                <span>{plan.patientId}</span>
                <span>Du {new Date(plan.dateDebut).toLocaleDateString("fr-FR")}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier le régime" : "Nouveau régime"}</DialogTitle>
            <DialogDescription>Remplissez les informations du plan alimentaire</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Titre</Label>
              <Input value={form.titre} onChange={(e) => setForm({ ...form, titre: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="">Sélectionner</option>
                  {DIET_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Patient</Label>
                <select
                  value={form.patientId}
                  onChange={(e) => setForm({ ...form, patientId: e.target.value })}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="">Sélectionner</option>
                  {mockPatients.map((p) => <option key={p.id} value={p.id}>{p.id}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date début</Label>
                <Input type="date" value={form.dateDebut} onChange={(e) => setForm({ ...form, dateDebut: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Date fin</Label>
                <Input type="date" value={form.dateFin} onChange={(e) => setForm({ ...form, dateFin: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Contenu (HTML)</Label>
              <textarea
                rows={8}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <DialogClose asChild><Button variant="outline">Annuler</Button></DialogClose>
            <Button onClick={save}>{editing ? "Enregistrer" : "Créer"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>Cette action est irréversible.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-2">
            <DialogClose asChild><Button variant="outline">Annuler</Button></DialogClose>
            <Button variant="destructive" onClick={doDelete}>Supprimer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
