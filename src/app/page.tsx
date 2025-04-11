"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PersonaCard } from "@/components/personaCard"

export default function Home() {
  const router = useRouter()
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)

  const personas = [
    {
      id: "hitesh",
      name: "Hitesh Choudhary",
      title: "Tech Educator & Entrepreneur",
      description:
        "Passionate about teaching programming with a focus on practical knowledge and real-world applications.",
      image: "/images/hitesh.png",
      tags: ["JavaScript", "Python", "Web Development", "DSA", "AI"],
    },
    {
      id: "piyush",
      name: "Piyush Garg",
      title: "Educator & Content Creator",
      description: "Content creator, educator, and entrepreneur known for his expertise in the tech industry.",
      image: "/images/piyush.png",
      tags: ["Docker", "React", "Node.js", "Gen AI", "Career Advice"],
    },
  ]

  const handleSelectPersona = (id: string) => {
    setSelectedPersona(id === selectedPersona ? null : id)
  }

  const handleStartChat = () => {
    if (selectedPersona) {
      router.push(`/chat/${selectedPersona}`)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Image src="/images/chai-icon.jpeg" alt="Chai Icon" width={24} height={24} className="rounded-full" />
          <h1 className="text-xl font-semibold">Chat with AI Persona&apos;s</h1>
        </div>
        <Link href="https://github.com/kushallunkad22" className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image src="/images/chai-icon.jpeg" alt="Chai Icon" width={48} height={48} className="rounded-full" />
          </div>
          <h1 className="text-4xl font-bold text-orange-400 mb-2">Chat with AI Persona&apos;s</h1>
          <p className="text-gray-400">Select who you&apos;d like to chat with today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-6xl">
          {personas.map((persona) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              selected={selectedPersona === persona.id || selectedPersona === "all"}
              onSelect={handleSelectPersona}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
         
          <button
            className={`bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white px-8 py-2 rounded-md ${!selectedPersona ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleStartChat}
            disabled={!selectedPersona}
          >
          {selectedPersona ? "Start Chat with " + selectedPersona : "Please select a Persona"}
          </button>
        </div>
      </main>
    </div>
  )
}
