import { Code2, Globe, Smartphone, Database, GraduationCap, Headphones } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Globe,
    title: "Sites Web Vitrine",
    description: "Sites professionnels et responsives pour présenter votre activité et attirer de nouveaux clients.",
    features: ["Design sur mesure", "Optimisation SEO", "Compatible mobile"],
  },
  {
    icon: Code2,
    title: "Applications Web",
    description: "Applications métier personnalisées pour automatiser et optimiser vos processus.",
    features: ["Développement fullstack", "TypeScript/React", "Base de données"],
  },
  {
    icon: Smartphone,
    title: "Applications Mobiles",
    description: "Applications iOS et Android pour atteindre vos clients sur leurs smartphones.",
    features: ["React Native", "Cross-platform", "Notifications push"],
  },
  {
    icon: Database,
    title: "E-commerce",
    description: "Boutiques en ligne complètes avec paiement sécurisé et gestion des stocks.",
    features: ["Paiement Stripe", "Gestion stocks", "Tableau de bord"],
  },
  {
    icon: Headphones,
    title: "Consulting IT",
    description: "Accompagnement dans votre transformation digitale et choix technologiques.",
    features: ["Audit technique", "Architecture", "Formation équipes"],
  },
  {
    icon: GraduationCap,
    title: "Formations",
    description: "Cours d&apos;informatique et de mathématiques pour adultes et élèves.",
    features: ["Cours individualisés", "À domicile", "20€/heure"],
  },
]

export function Services() {
  return (
    <section id="services" className="bg-secondary/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Nos Services
          </h2>
          <p className="text-muted-foreground">
            Des solutions complètes pour accompagner votre présence numérique et votre croissance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="group transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
