import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogPostContent } from "./blog-post-content"
import { getArticleBySlug } from "@/lib/mock-data"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return { title: article.titre }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()
  return <BlogPostContent article={article} />
}
