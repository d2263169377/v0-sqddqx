"use client"

import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  children?: React.ReactNode
}

export function ChatMessage({ role, content, children }: ChatMessageProps) {
  const isUser = role === "user"

  return (
    <div className={cn("flex gap-4", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-smart-green/20" : "bg-tech-blue/20"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-smart-green" />
        ) : (
          <Bot className="w-4 h-4 text-tech-blue" />
        )}
      </div>
      <div className={cn("flex-1 max-w-[80%] space-y-3", isUser && "flex flex-col items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-smart-green/20 text-foreground rounded-tr-sm"
              : "bg-secondary/50 text-foreground rounded-tl-sm"
          )}
        >
          {content}
        </div>
        {children}
      </div>
    </div>
  )
}
