import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Nom, email, service et message sont requis" },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      )
    }

    let supabaseSuccess = false
    let web3formsSuccess = false
    let autoReplySuccess = false

    // 1. Insert into Supabase
    try {
      const supabase = await createClient()
      const { error: supabaseError } = await supabase.from("contacts").insert({
        name,
        email,
        phone: phone || null,
        service: service || "Autre",
        message,
      })

      if (!supabaseError) {
        supabaseSuccess = true
      } else {
        console.error("Supabase error:", supabaseError)
      }
    } catch (error) {
      console.error("Supabase connection error:", error)
    }

    // 2. Send notification to admin via Web3Forms
    try {
      const web3FormData = new FormData()
      web3FormData.append("access_key", process.env.WEB3FORMS_ACCESS_KEY || "")
      web3FormData.append("name", name)
      web3FormData.append("email", email)
      web3FormData.append("phone", phone || "Non fourni")
      web3FormData.append("service", service)
      web3FormData.append("message", message)
      web3FormData.append("subject", `Nouveau devis de ${name} - ${service}`)
      web3FormData.append("from_name", "TEKNOPY Concept")
      web3FormData.append("replyto", email)
      web3FormData.append("redirect", process.env.WEB3FORMS_REDIRECT_URL || "https://plistech.com/contact")

      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormData
      })

      if (web3Response.ok) {
        const web3Result = await web3Response.json()
        if (web3Result.success) {
          web3formsSuccess = true
          console.log("Web3Forms notification sent successfully")
        }
      }
    } catch (error) {
      console.error("Web3Forms error:", error)
    }

    // 3. Send auto-reply to client
    try {
      const autoReplyData = new FormData()
      autoReplyData.append("access_key", process.env.WEB3FORMS_ACCESS_KEY || "")
      autoReplyData.append("name", name)
      autoReplyData.append("email", email)
      autoReplyData.append("subject", "Confirmation de votre demande - TEKNOPY Concept")
      autoReplyData.append("message", `
Bonjour ${name},

Nous avons bien reçu votre demande de devis pour le service : ${service}.

Voici un récapitulatif de votre demande :
- Nom : ${name}
- Email : ${email}
- Téléphone : ${phone || "Non fourni"}
- Service : ${service}

Votre message :
${message}

Nous vous répondrons dans les plus brefs délais (sous 24h ouvrées).

Cordialement,
L'équipe TEKNOPY Concept
      `)
      autoReplyData.append("from_name", "TEKNOPY Concept")
      autoReplyData.append("replyto", process.env.ADMIN_EMAIL || "manuel.harpon@teknopy.com")

      const autoReplyResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: autoReplyData
      })

      if (autoReplyResponse.ok) {
        const autoReplyResult = await autoReplyResponse.json()
        if (autoReplyResult.success) {
          autoReplySuccess = true
          console.log("Auto-reply sent successfully")
        }
      }
    } catch (error) {
      console.error("Auto-reply error:", error)
    }

    // Return appropriate response
    if (supabaseSuccess || web3formsSuccess) {
      return NextResponse.json({
        success: true,
        message: "Message envoyé avec succès! Vous recevrez une confirmation par email.",
        details: {
          supabase: supabaseSuccess,
          notification: web3formsSuccess,
          autoReply: autoReplySuccess
        }
      })
    } else {
      return NextResponse.json({
        success: false,
        error: "Une erreur technique est survenue. Veuillez nous contacter directement par téléphone."
      }, { status: 500 })
    }
  } catch (error) {
    console.error("Global error:", error)
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer plus tard." },
      { status: 500 }
    )
  }
}