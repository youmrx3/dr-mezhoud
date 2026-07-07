"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, AlertCircle, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "@/components/sections/contact-form"
import { CABINET_INFO } from "@/lib/constants"

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: `${CABINET_INFO.adresse}\nAlger, Algérie`,
    href: null,
  },
  {
    icon: Phone,
    title: "Téléphone",
    content: CABINET_INFO.telephone,
    href: `tel:${CABINET_INFO.telephone}`,
  },
  {
    icon: Mail,
    title: "Email",
    content: CABINET_INFO.email,
    href: `mailto:${CABINET_INFO.email}`,
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Dim – Jeu : 08h30 – 16h30\nVen : 08h30 – 12h00",
    href: null,
  },
]

export function ContactContent() {
  return (
    <div className="container-main py-12 md:py-16 space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 max-w-3xl"
      >
        <h1>Contact</h1>
        <p className="text-muted-foreground text-lg">
          Vous souhaitez prendre rendez-vous ou poser une question ? Utilisez le
          formulaire ci-dessous ou contactez-nous directement.
        </p>
      </motion.section>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <ContactForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {contactInfo.map((info) => (
            <Card key={info.title}>
              <CardContent className="p-4 flex items-start gap-3">
                <info.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{info.title}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {info.content}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">Urgence</p>
                <a
                  href={`tel:${CABINET_INFO.urgence}`}
                  className="text-lg font-bold text-amber-700 hover:text-amber-800"
                >
                  {CABINET_INFO.urgence}
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
