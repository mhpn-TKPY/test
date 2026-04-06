import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Trainings } from "@/components/trainings"
import { ClientSites } from "@/components/client-sites"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { Providers } from "@/components/providers"

export default function HomePage() {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <Services />
          <Projects />
          <ClientSites />
          <Skills />
          <Trainings />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </Providers>
  )
}