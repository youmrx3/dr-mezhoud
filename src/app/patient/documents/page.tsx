"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Download,
  Eye,
  Upload,
  FolderOpen,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/mock-auth-context"
import { mockDocuments, mockPatients } from "@/lib/mock-data"
import { DOCUMENT_TYPES } from "@/lib/constants"

export default function DocumentsPage() {
  const { user } = useAuth()

  const patient = useMemo(
    () => mockPatients.find((p) => p.userId === user?.email),
    [user]
  )

  const documents = useMemo(
    () => mockDocuments.filter((d) => d.patientId === patient?.id),
    [patient]
  )

  const grouped = useMemo(() => {
    const groups: Record<string, typeof documents> = {}
    for (const doc of documents) {
      if (!groups[doc.type]) groups[doc.type] = []
      groups[doc.type].push(doc)
    }
    return groups
  }, [documents])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl">Mes documents</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Consultez et gérez vos documents médicaux
          </p>
        </div>
        <Button className="gap-2 shrink-0">
          <Upload className="h-4 w-4" />
          Ajouter un document
        </Button>
      </div>

      {documents.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center space-y-3">
            <FolderOpen className="h-10 w-10 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">
              Aucun document pour le moment
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Télécharger un document
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {DOCUMENT_TYPES.map((type) => {
            const docs = grouped[type]
            if (!docs || docs.length === 0) return null
            return (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-medium">{type}</h2>
                  <Badge variant="secondary" className="text-[10px]">
                    {docs.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {docs.map((doc) => (
                    <Card key={doc.id}>
                      <CardContent className="p-3.5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {doc.titre}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(doc.uploadedAt).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
