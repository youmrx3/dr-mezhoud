"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ArrowRight, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { articles } from "@/lib/mock-data"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export function BlogSection() {
  const recentArticles = articles.slice(0, 3)

  return (
    <section className="py-20 bg-background">
      <div className="container-main">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-4 max-w-2xl">
            <h2>Dernières actualités</h2>
            <p className="text-muted-foreground">
              Articles, conseils et informations sur la santé rénale rédigés par
              le Dr Mezhoud Hadj.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Voir tous les articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recentArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${article.slug}`}>
                <Card className="h-full group hover:shadow-md transition-all">
                  <div className="aspect-[16/9] bg-surface-2 relative overflow-hidden rounded-t-card">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light to-accent-light flex items-center justify-center">
                      <span className="text-primary/30 text-6xl font-bold font-mono">
                        {article.slug.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="default" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-medium leading-snug group-hover:text-primary transition-colors">
                      {article.titre}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.resume}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(article.date), "dd MMM yyyy", { locale: fr })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.lectureMin} min
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              Voir tous les articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
