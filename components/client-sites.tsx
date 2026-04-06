"use client"

import { ExternalLink, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const clientSites = [
  {
    name: "Lakou Sankofa",
    url: "https://lakousankofa.com",
    description: "Site culturel dédié à la mémoire et aux traditions",
    category: "Culture"
  },
  {
    name: "Full Belly",
    url: "https://fullbelly.fr",
    description: "Restauration et gastronomie",
    category: "Restauration"
  },
  {
    name: "Afrocentricité",
    url: "https://afrocentricite.com",
    description: "Boutique et contenu afro-centré",
    category: "E-commerce"
  },
  {
    name: "Golden Star 1919",
    url: "https://goldenstar1919.org",
    description: "Club sportif et associatif",
    category: "Sport"
  },
  {
    name: "Kanté Kant",
    url: "https://kantekant.com",
    description: "Création et artisanat local",
    category: "Artisanat"
  },
  {
    name: "Open IT 972",
    url: "https://openit972.org",
    description: "Solutions et services informatiques",
    category: "Technologie"
  }
]

export function ClientSites() {
  return (
    <section id="clients" className="bg-secondary/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Sites de nos clients
          </h2>
          <p className="text-muted-foreground">
            Découvrez quelques-uns des sites web que nous avons créés pour nos partenaires.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clientSites.map((site) => (
            <Card key={site.name} className="group transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{site.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {site.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {site.category}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                  onClick={() => window.open(site.url, "_blank")}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Visiter le site
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}