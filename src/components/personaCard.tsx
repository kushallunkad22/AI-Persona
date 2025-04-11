"use client"

import Image from "next/image"
import { CheckCircle } from "lucide-react"

interface Persona {
  id: string
  name: string
  title: string
  description: string
  image: string
  tags: string[]
}

interface PersonaCardProps {
  persona: Persona
  selected?: boolean
  onSelect?: (id: string) => void
}

export function PersonaCard({ persona, selected = false, onSelect }: PersonaCardProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(persona.id)
    }
  }

  return (
    <div
      className={`relative bg-zinc-900 rounded-lg p-6 border transition-all cursor-pointer
        ${selected ? "border-orange-500" : "border-zinc-800 hover:border-zinc-700"}`}
      onClick={handleClick}
    >
      {selected && (
        <div className="absolute top-2 right-2 text-orange-500">
          <CheckCircle className="w-6 h-6" />
        </div>
      )}

      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-12 h-12 overflow-hidden rounded-full">
          <Image src={persona.image || "/placeholder.svg"} alt={persona.name} fill className="object-cover" />
        </div>
        <h2 className="text-xl font-bold">{persona.name}</h2>
      </div>

      <p className="text-gray-400 mb-2">{persona.title}</p>
      <p className="text-gray-500 mb-4">{persona.description}</p>

      <div className="flex flex-wrap gap-2">
        {persona.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border border-transparent bg-zinc-800 hover:bg-zinc-700 text-gray-300 px-2.5 py-0.5 text-xs font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
