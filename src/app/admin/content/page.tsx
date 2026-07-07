"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose,
} from "@/components/ui/dialog"
import { mockServices, mockFAQs, mockTestimonials } from "@/lib/mock-data"

interface ServiceForm { id: string; nom: string; slug: string; description: string; duree: number; prix: number; icone: string; categorie: string; actif: boolean }
interface FAQForm { id: string; question: string; reponse: string; category: string; ordre: number }
interface TestimonialForm { id: string; patientId: string; patientNom: string; note: number; commentaire: string; date: string; visible: boolean }

const emptyService: ServiceForm = { id: "", nom: "", slug: "", description: "", duree: 30, prix: 0, icone: "Stethoscope", categorie: "", actif: true }
const emptyFAQ: FAQForm = { id: "", question: "", reponse: "", category: "", ordre: 0 }
const emptyTestimonial: TestimonialForm = { id: "", patientId: "", patientNom: "", note: 5, commentaire: "", date: new Date().toISOString(), visible: true }

let sId = 100; let fId = 100; let tId = 100

export default function AdminContentPage() {
  const [services, setServices] = useState(mockServices)
  const [faqs, setFaqs] = useState(mockFAQs)
  const [testimonials, setTestimonials] = useState(mockTestimonials)

  const [sForm, setSForm] = useState<ServiceForm>(emptyService)
  const [fForm, setFForm] = useState<FAQForm>(emptyFAQ)
  const [tForm, setTForm] = useState<TestimonialForm>(emptyTestimonial)

  const [sOpen, setSOpen] = useState(false)
  const [fOpen, setFOpen] = useState(false)
  const [tOpen, setTOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ type: string; id: string } | null>(null)
  const [sEdit, setSEdit] = useState(false)
  const [fEdit, setFEdit] = useState(false)
  const [tEdit, setTEdit] = useState(false)

  function openCreateService() { setSForm({ ...emptyService, id: `s-${sId++}` }); setSEdit(false); setSOpen(true) }
  function openEditService(s: ServiceForm) { setSForm({ ...s }); setSEdit(true); setSOpen(true) }
  function saveService() {
    if (sEdit) { setServices((prev) => prev.map((x) => (x.id === sForm.id ? sForm : x))) }
    else { setServices((prev) => [...prev, sForm]) }
    setSOpen(false)
  }

  function openCreateFAQ() { setFForm({ ...emptyFAQ, id: `f-${fId++}` }); setFEdit(false); setFOpen(true) }
  function openEditFAQ(f: FAQForm) { setFForm({ ...f }); setFEdit(true); setFOpen(true) }
  function saveFAQ() {
    if (fEdit) { setFaqs((prev) => prev.map((x) => (x.id === fForm.id ? fForm : x))) }
    else { setFaqs((prev) => [...prev, fForm]) }
    setFOpen(false)
  }

  function openCreateTestimonial() { setTForm({ ...emptyTestimonial, id: `t-${tId++}` }); setTEdit(false); setTOpen(true) }
  function openEditTestimonial(t: TestimonialForm) { setTForm({ ...t }); setTEdit(true); setTOpen(true) }
  function saveTestimonial() {
    if (tEdit) { setTestimonials((prev) => prev.map((x) => (x.id === tForm.id ? tForm : x))) }
    else { setTestimonials((prev) => [...prev, tForm]) }
    setTOpen(false)
  }

  function confirmDelete(type: string, id: string) { setDeleteTarget({ type, id }); setDeleteOpen(true) }
  function doDelete() {
    if (!deleteTarget) return
    if (deleteTarget.type === "service") setServices((prev) => prev.filter((x) => x.id !== deleteTarget.id))
    if (deleteTarget.type === "faq") setFaqs((prev) => prev.filter((x) => x.id !== deleteTarget.id))
    if (deleteTarget.type === "testimonial") setTestimonials((prev) => prev.filter((x) => x.id !== deleteTarget.id))
    setDeleteOpen(false); setDeleteTarget(null)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div><h1 className="text-xl">Gestion du contenu</h1><p className="text-sm text-muted-foreground mt-1">Services, FAQ et témoignages</p></div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList>
          <TabsTrigger value="services">Services ({services.length})</TabsTrigger>
          <TabsTrigger value="faq">FAQ ({faqs.length})</TabsTrigger>
          <TabsTrigger value="testimonials">Témoignages ({testimonials.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="mt-4 space-y-4">
          <Button size="sm" className="gap-2" onClick={openCreateService}><Plus className="h-4 w-4" />Nouveau service</Button>
          <div className="space-y-2">
            {services.map((s) => (
              <Card key={s.id}>
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{s.nom}</p>
                    <p className="text-xs text-muted-foreground truncate">{s.description}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">{s.categorie}</Badge>
                      <span className="text-[10px] text-muted-foreground">{s.duree} min</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => openEditService(s)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-danger" onClick={() => confirmDelete("service", s.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="mt-4 space-y-4">
          <Button size="sm" className="gap-2" onClick={openCreateFAQ}><Plus className="h-4 w-4" />Nouvelle FAQ</Button>
          <div className="space-y-2">
            {faqs.map((f) => (
              <Card key={f.id}>
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{f.question}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{f.reponse}</p>
                    <Badge variant="secondary" className="text-[10px] mt-1">{f.category}</Badge>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => openEditFAQ(f)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-danger" onClick={() => confirmDelete("faq", f.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="testimonials" className="mt-4 space-y-4">
          <Button size="sm" className="gap-2" onClick={openCreateTestimonial}><Plus className="h-4 w-4" />Nouveau témoignage</Button>
          <div className="space-y-2">
            {testimonials.map((t) => (
              <Card key={t.id}>
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{t.patientNom}</p>
                      <div className="flex">{Array.from({ length: 5 }).map((_, i) => <span key={i} className={`text-xs ${i < t.note ? "text-warning" : "text-muted"}`}>★</span>)}</div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{t.commentaire}</p>
                    <Badge variant={t.visible ? "success" : "secondary"} className="text-[10px] mt-1">{t.visible ? "Visible" : "Masqué"}</Badge>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => openEditTestimonial(t)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-danger" onClick={() => confirmDelete("testimonial", t.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={sOpen} onOpenChange={setSOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{sEdit ? "Modifier" : "Nouveau"} service</DialogTitle><DialogDescription>Remplissez les informations du service</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><Label>Nom</Label><Input value={sForm.nom} onChange={(e) => setSForm({ ...sForm, nom: e.target.value })} /></div>
            <div className="space-y-2"><Label>Slug</Label><Input value={sForm.slug} onChange={(e) => setSForm({ ...sForm, slug: e.target.value })} /></div>
            <div className="space-y-2"><Label>Description</Label><textarea rows={3} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" value={sForm.description} onChange={(e) => setSForm({ ...sForm, description: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Durée (min)</Label><Input type="number" value={sForm.duree} onChange={(e) => setSForm({ ...sForm, duree: +e.target.value })} /></div>
              <div className="space-y-2"><Label>Prix (DZD)</Label><Input type="number" value={sForm.prix} onChange={(e) => setSForm({ ...sForm, prix: +e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Catégorie</Label><Input value={sForm.categorie} onChange={(e) => setSForm({ ...sForm, categorie: e.target.value })} /></div>
          </div>
          <div className="flex justify-end gap-3"><DialogClose asChild><Button variant="outline">Annuler</Button></DialogClose><Button onClick={saveService}>{sEdit ? "Enregistrer" : "Créer"}</Button></div>
        </DialogContent>
      </Dialog>

      <Dialog open={fOpen} onOpenChange={setFOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{fEdit ? "Modifier" : "Nouvelle"} FAQ</DialogTitle><DialogDescription>Question et réponse</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><Label>Question</Label><Input value={fForm.question} onChange={(e) => setFForm({ ...fForm, question: e.target.value })} /></div>
            <div className="space-y-2"><Label>Réponse</Label><textarea rows={4} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" value={fForm.reponse} onChange={(e) => setFForm({ ...fForm, reponse: e.target.value })} /></div>
            <div className="space-y-2"><Label>Catégorie</Label><Input value={fForm.category} onChange={(e) => setFForm({ ...fForm, category: e.target.value })} /></div>
          </div>
          <div className="flex justify-end gap-3"><DialogClose asChild><Button variant="outline">Annuler</Button></DialogClose><Button onClick={saveFAQ}>{fEdit ? "Enregistrer" : "Créer"}</Button></div>
        </DialogContent>
      </Dialog>

      <Dialog open={tOpen} onOpenChange={setTOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{tEdit ? "Modifier" : "Nouveau"} témoignage</DialogTitle><DialogDescription>Commentaire patient</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><Label>Nom du patient</Label><Input value={tForm.patientNom} onChange={(e) => setTForm({ ...tForm, patientNom: e.target.value })} /></div>
            <div className="space-y-2"><Label>Note (1-5)</Label><Input type="number" min={1} max={5} value={tForm.note} onChange={(e) => setTForm({ ...tForm, note: +e.target.value })} /></div>
            <div className="space-y-2"><Label>Commentaire</Label><textarea rows={4} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" value={tForm.commentaire} onChange={(e) => setTForm({ ...tForm, commentaire: e.target.value })} /></div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={tForm.visible} onChange={(e) => setTForm({ ...tForm, visible: e.target.checked })} className="accent-primary" /> Visible sur le site</label>
          </div>
          <div className="flex justify-end gap-3"><DialogClose asChild><Button variant="outline">Annuler</Button></DialogClose><Button onClick={saveTestimonial}>{tEdit ? "Enregistrer" : "Créer"}</Button></div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Confirmer la suppression</DialogTitle><DialogDescription>Cette action est irréversible.</DialogDescription></DialogHeader>
          <div className="flex justify-end gap-3 pt-2"><DialogClose asChild><Button variant="outline">Annuler</Button></DialogClose><Button variant="destructive" onClick={doDelete}>Supprimer</Button></div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
