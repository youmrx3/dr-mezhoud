"use client"

import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { mockFAQs } from "@/lib/mock-data"

const categories = [
  "Toutes",
  ...Array.from(new Set(mockFAQs.map((f) => f.category))),
]

export function FAQContent() {
  return (
    <div className="container-main py-12 md:py-16 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 max-w-3xl"
      >
        <h1>Questions fréquentes</h1>
        <p className="text-muted-foreground text-lg">
          Retrouvez les réponses aux questions les plus courantes concernant
          notre cabinet et la néphrologie.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="Toutes">
          <TabsList className="mb-8 flex-wrap h-auto gap-1">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat} value={cat}>
              <Accordion type="single" collapsible className="max-w-3xl">
                {mockFAQs
                  .filter((faq) => cat === "Toutes" || faq.category === cat)
                  .sort((a, b) => a.ordre - b.ordre)
                  .map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.reponse}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  )
}
