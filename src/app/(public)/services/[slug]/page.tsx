import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ServiceDetailContent } from "./service-detail-content"
import { getServiceBySlug } from "@/lib/mock-data"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: service.nom,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()
  return <ServiceDetailContent service={service} />
}
