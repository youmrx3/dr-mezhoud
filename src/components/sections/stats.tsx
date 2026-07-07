"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, Users, Heart, FileText } from "lucide-react"
import { STATISTIQUES } from "@/lib/constants"

const iconMap: Record<string, React.ReactNode> = {
  Calendar: <Calendar className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
}

function parseValue(val: string): { num: number; suffix: string } {
  const cleaned = val.replace(/\s/g, "")
  const match = cleaned.match(/^([\d]+)(.*)$/)
  if (!match) return { num: 0, suffix: val }
  return { num: Number.parseInt(match[1]), suffix: match[2] }
}

function CountUp({
  value,
  suffix,
  duration = 2,
}: {
  value: number
  suffix: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    let raf: number

    function animate(time: number) {
      const elapsed = (time - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString("fr-FR")}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-hover">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-accent-light blur-3xl" />
      </div>

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {STATISTIQUES.map((stat, i) => {
            const { num, suffix } = parseValue(stat.valeur)
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative group"
              >
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center space-y-3 border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/15 text-white">
                    {iconMap[stat.icone]}
                  </div>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tabular-nums tracking-tight">
                    <CountUp value={num} suffix={suffix} duration={2.2} />
                  </p>
                  <p className="text-sm text-white/70 leading-snug max-w-[140px] mx-auto">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
