"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Upload, FileText, Download, Eye, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose,
} from "@/components/ui/dialog"
import { mockDocuments, mockPatients } from "@/lib/mock-data"
import { DOCUMENT_TYPES } from "@/lib/constants"

export default function AdminDocumentsPage() {
  const [search, setSearch] = useState("")
  const [docs, setDocs] = useState(mockDocuments)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [newDoc, setNewDoc] = useState({ titre: "", type: "", patientId: "" })

  const filtered = useMemo(
    () => docs.filter((d) => !search || d.titre.toLowerCase().includes(search.toLowerCase()) || d.type.toLowerCase().includes(search.toLowerCase())),
    [docs, search]
  )

  const grouped = useMemo(() => {
    const g: Record<string, typeof docs> = {}
    for (const doc of filtered) {
      if (!g[doc.type]) g[doc.type] = []
      g[doc.type].push(doc)
    }
    return g
  }, [filtered])

  function handleUpload() {
    setDocs((prev) => [...prev, { id: `doc-${Date.now()}`, patientId: newDoc.patientId, type: newDoc.type, titre: newDoc.titre, description: "", fileUrl: "", uploadedAt: new Date().toISOString() }])
    setUploadOpen(false)
    setNewDoc({ titre: "", type: "", patientId: "" })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl">Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">{docs.length} documents</p>
        </div>
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Upload className="h-4 w-4" />Ajouter un document</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouveau document</DialogTitle>
              <DialogDescription>Associez un document à un patient</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input value={newDoc.titre} onChange={(e) => setNewDoc({ ...newDoc, titre: e.target.value })} placeholder="ex: Bilan sanguin" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <select value={newDoc.type} onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  <option value="">Sélectionner</option>
                  {DOCUMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Patient</Label>
                <select value={newDoc.patientId} onChange={(e) => setNewDoc({ ...newDoc, patientId: e.target.value })}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  <option value="">Sélectionner</option>
                  {mockPatients.map((p) => <option key={p.id} value={p.id}>{p.id}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <DialogClose asChild><Button variant="outline">Annuler</Button></DialogClose>
              <Button onClick={handleUpload} disabled={!newDoc.titre || !newDoc.type || !newDoc.patientId}>Ajouter</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {Object.keys(grouped).length === 0 ? (
        <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">Aucun document trouvé</CardContent></Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([type, items]) => (
            <div key={type}>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-medium">{type}</h2>
                <Badge variant="secondary" className="text-[10px]">{items.length}</Badge>
              </div>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-surface text-muted-foreground text-xs uppercase">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">Titre</th>
                      <th className="text-left px-4 py-3 font-medium">Patient</th>
                      <th className="text-left px-4 py-3 font-medium">Date</th>
                      <th className="text-right px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {items.map((doc) => (
                      <tr key={doc.id} className="hover:bg-surface/50 transition-colors">
                        <td className="px-4 py-3 font-medium">{doc.titre}</td>
                        <td className="px-4 py-3 text-muted-foreground">{doc.patientId}</td>
                        <td className="px-4 py-3 text-muted-foreground">{new Date(doc.uploadedAt).toLocaleDateString("fr-FR")}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Download className="h-4 w-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
