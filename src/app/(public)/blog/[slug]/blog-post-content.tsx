"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowLeft, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { Article } from "@/types"

export function BlogPostContent({ article }: { article: Article }) {
  return (
    <div className="container-main py-12 md:py-16">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        <div className="space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux articles
          </Link>

          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <h1>{article.titre}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {article.auteur}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {format(new Date(article.date), "dd MMMM yyyy", { locale: fr })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {article.lectureMin} min de lecture
            </span>
          </div>
        </div>

        <div className="aspect-[16/9] bg-surface-2 rounded-card flex items-center justify-center">
          <span className="text-primary/20 text-8xl font-bold font-mono">
            {article.slug.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p className="text-lg text-foreground font-medium">
            {article.resume}
          </p>
          <p>{article.contenu}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Tous les articles
            </Button>
          </Link>
        </div>
      </motion.article>
    </div>
  )
}
