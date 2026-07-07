"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { articles } from "@/lib/mock-data"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export function BlogListContent() {
  return (
    <div className="container-main py-12 md:py-16 space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 max-w-3xl"
      >
        <h1>Blog & Actualités</h1>
        <p className="text-muted-foreground text-lg">
          Articles, conseils et informations sur la santé rénale rédigés par le
          Dr Mezhoud Hadj.
        </p>
      </motion.section>

      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="default" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-h3 group-hover:text-primary transition-colors">
                    {article.titre}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.resume}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(article.date), "dd MMM yyyy", {
                          locale: fr,
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.lectureMin} min
                      </span>
                    </div>
                    <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lire <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
