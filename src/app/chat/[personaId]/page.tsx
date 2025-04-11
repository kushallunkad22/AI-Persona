"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import {use } from "react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface Persona {
  id: string
  name: string
  image: string
  greeting: string
}

export default function ChatPage({ params }: { params: Promise<{ personaId: string }> }) {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const personas: Record<string, Persona> = {
    hitesh: {
      id: "hitesh",
      name: "Hitesh Choudhary",
      image: "/images/hitesh.png",
      greeting:
        "Hanji! Hello bhai/behen! Hitesh Choudhary hu, Chai aur code se pyar karne wala tech educator aur entrepreneur. Aapko Python, JavaScript, aur bahut saara masti se programming sikhaunga! 😊",
    },
    piyush: {
      id: "piyush",
      name: "Piyush Garg",
      image: "/images/piyush.png",
      greeting:
        "Hello there! I'm Piyush Garg, your friendly tech educator and content creator. Let's dive into Docker, React, Node.js, or anything tech-related you want to learn about!",
    },
  }
  const { personaId } = use(params)
  const currentPersona = personas[personaId]
  const greetingAddedRef = useRef(false)

  useEffect(() => {
    if (!currentPersona) {
      router.push("/")
      return
    }

    // Add initial greeting message
    if(!greetingAddedRef.current) {
      greetingAddedRef.current = true
    setMessages([
      {
        id: "1",
        content: currentPersona.greeting,
        sender: "ai",
        timestamp: new Date(),
      },
    ])
}
  }, [currentPersona, router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response

    setIsLoading(true)

try {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      personaId: personaId,
      userMessage: inputValue, 
    }),
  })

  const data = await res.json()

  const aiMessage: Message = {
    id: (Date.now() + 1).toString(),
    content: data.response || "I'm not sure how to respond to that!",
    sender: "ai",
    timestamp: new Date(),
  }

  setMessages((prev) => [...prev, aiMessage])
} catch (error) {
  console.error("Error fetching AI response", error)
} finally {
  setIsLoading(false)
}
    }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!currentPersona) {
    return null // Will redirect in useEffect
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white">
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
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 overflow-hidden rounded-full">
              <Image
                src={currentPersona.image || "/placeholder.svg"}
                alt={currentPersona.name}
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-xl font-semibold">{currentPersona.name}</h1>
          </div>
        </div>
        <Link href="https://github.com" className="text-white">
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

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`max-w-3xl mx-auto ${message.sender === "user" ? "ml-auto" : ""}`}>
            <div className="flex items-start gap-3">
              {message.sender === "ai" && (
                <div className="relative w-10 h-10 overflow-hidden rounded-full flex-shrink-0 mt-1">
                  <Image
                    src={currentPersona.image || "/placeholder.svg"}
                    alt={currentPersona.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <div
                  className={`p-4 rounded-lg ${
                    message.sender === "ai" ? "bg-zinc-900 border border-zinc-800" : "bg-orange-600"
                  }`}
                >
               <div className="prose dark:prose-invert">
                <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  {message.sender === "ai" && <span className="mr-1">{currentPersona.name}</span>}
                  <span>{formatTime(message.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-full flex-shrink-0 mt-1">
                <Image
                  src={currentPersona.image || "/placeholder.svg"}
                  alt={currentPersona.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-800">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <div className="relative flex-1">
            <textarea
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 px-4 text-white resize-none focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Type your message..."
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ minHeight: "50px", maxHeight: "150px" }}
            />
            <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-300" aria-label="Settings">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
          </div>
          <button
            className={`bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg flex-shrink-0 ${
              !inputValue.trim() || isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
