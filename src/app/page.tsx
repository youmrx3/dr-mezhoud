import { HeroSection } from "@/components/sections/hero"
import { ServicesSection } from "@/components/sections/services"
import { StatsSection } from "@/components/sections/stats"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { BlogSection } from "@/components/sections/blog-section"
import { FAQSection } from "@/components/sections/faq-section"
import { CTASection } from "@/components/sections/cta-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <TestimonialsSection />
        <BlogSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
