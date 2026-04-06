"use client"

import { useState, useRef } from "react"
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  "Site Web Vitrine",
  "Application Web",
  "Application Mobile",
  "E-commerce",
  "Consulting IT",
  "Formation Informatique",
  "Formation Mathématiques",
  "Autre",
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string>("")
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setIsSuccess(true)
        setSuccessMessage(result.message || "Message envoyé avec succès!")

        // Reset form
        if (formRef.current) {
          formRef.current.reset()
          // Reset select value
          const selectTrigger = document.querySelector('[data-state="closed"]') as HTMLElement
          if (selectTrigger) {
            const selectValue = selectTrigger.querySelector('[data-placeholder]')
            if (selectValue) {
              selectValue.textContent = "Sélectionnez un service"
            }
          }
        }
      } else {
        setErrorMessage(result.error || "Une erreur est survenue")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-secondary/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Contactez-nous
          </h2>
          <p className="text-muted-foreground">
            Devenez client en 3 clics! Remplissez le formulaire et nous vous répondrons sous 24h.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations de contact</CardTitle>
                <CardDescription>
                  N&apos;hésitez pas à nous contacter directement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <a
                  href="tel:+596696617151"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-muted-foreground">+596 696 617 151</p>
                  </div>
                </a>

                <a
                  href="mailto:manuel.harpon@teknopy.com"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">manuel.harpon@teknopy.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Localisation</p>
                    <p className="text-muted-foreground">Fort-de-France, Martinique</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6">
                <p className="text-center text-sm text-muted-foreground">
                  <strong className="text-foreground">Devis gratuit</strong> pour tous vos projets web. Réponse garantie sous 24 heures ouvrées.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact form */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Demander un devis</CardTitle>
              <CardDescription>
                Décrivez votre projet et nous vous contacterons rapidement
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Message envoyé!</h3>
                  <p className="text-muted-foreground">
                    {successMessage}
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => setIsSuccess(false)}
                  >
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit}>
                  {errorMessage && (
                    <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                      {errorMessage}
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nom complet *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="votre@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Téléphone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+596 696 ..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="service" className="text-sm font-medium">
                        Service souhaité *
                      </label>
                      <Select name="service" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Votre message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Décrivez votre projet ou votre besoin..."
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
