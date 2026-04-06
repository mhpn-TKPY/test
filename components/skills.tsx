import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML / CSS", level: 98 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Supabase", level: 92 },
      { name: "PostgreSQL", level: 85 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    title: "Outils & DevOps",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "Vercel", level: 95 },
      { name: "Docker", level: 75 },
      { name: "CI/CD", level: 80 },
    ],
  },
  {
    title: "Mobile & Autres",
    skills: [
      { name: "React Native", level: 82 },
      { name: "PWA", level: 88 },
      { name: "SEO", level: 85 },
      { name: "Stripe", level: 90 },
    ],
  },
]

export function Skills() {
  return (
    <section id="competences" className="bg-secondary/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Compétences Techniques
          </h2>
          <p className="text-muted-foreground">
            Une expertise fullstack moderne pour réaliser vos projets web avec les meilleures technologies.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
