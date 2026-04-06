"use client"

import { useState } from "react"
import { ExternalLink, Folder } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Sample projects data - in production this would come from Supabase
const projects = [
  {
    id: "1",
    title: "Plateforme E-commerce Artisanat Martiniquais",
    description: "Boutique en ligne complète pour artisans locaux avec paiement sécurisé et gestion des stocks.",
    category: "E-commerce",
    technologies: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    client_name: "Artisans de Martinique",
    featured: true,
  },
  {
    id: "2",
    title: "Application de Réservation Restaurant",
    description: "Système de réservation en temps réel avec gestion des tables et notifications SMS.",
    category: "Application Web",
    technologies: ["React", "Node.js", "PostgreSQL", "Twilio"],
    client_name: "Restaurant Le Créole",
    featured: true,
  },
  {
    id: "3",
    title: "Site Vitrine Cabinet Médical",
    description: "Site responsive avec prise de rendez-vous en ligne et espace patient sécurisé.",
    category: "Site Vitrine",
    technologies: ["Next.js", "Tailwind CSS", "Supabase Auth"],
    client_name: "Cabinet Dr. Laurent",
    featured: false,
  },
  {
    id: "4",
    title: "Tableau de Bord Analytique",
    description: "Dashboard interactif pour suivi des KPIs avec visualisations temps réel.",
    category: "Application Web",
    technologies: ["React", "TypeScript", "Recharts", "Supabase"],
    client_name: "PME Caraïbes",
    featured: true,
  },
  {
    id: "5",
    title: "Site Association Sportive",
    description: "Plateforme communautaire avec gestion des membres, événements et résultats.",
    category: "Site Vitrine",
    technologies: ["Next.js", "Supabase", "Tailwind CSS"],
    client_name: "Club Nautique FDF",
    featured: false,
  },
  {
    id: "6",
    title: "Application Mobile Tourisme",
    description: "Guide touristique interactif avec géolocalisation et avis utilisateurs.",
    category: "Application Mobile",
    technologies: ["React Native", "TypeScript", "Supabase", "Maps API"],
    client_name: "Office du Tourisme",
    featured: true,
  },
]

const categories = ["Tous", "E-commerce", "Application Web", "Site Vitrine", "Application Mobile"]

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("Tous")

  const filteredProjects = activeCategory === "Tous"
    ? projects
    : projects.filter(project => project.category === activeCategory)

  return (
    <section id="projets" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Nos Réalisations
          </h2>
          <p className="text-muted-foreground">
            Découvrez une sélection de projets réalisés pour nos clients en Martinique et ailleurs.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group flex flex-col overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
              {/* Project thumbnail placeholder */}
              <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                <Folder className="h-16 w-16 text-primary/30" />
                {project.featured && (
                  <Badge className="absolute right-3 top-3 bg-primary">
                    En vedette
                  </Badge>
                )}
              </div>
              <CardHeader className="flex-1">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                <CardTitle className="line-clamp-2 text-lg">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs font-normal">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Client: {project.client_name}</span>
                  <Button variant="ghost" size="sm" className="gap-1 px-2">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Voir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
