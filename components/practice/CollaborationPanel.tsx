"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Send, Copy, Check } from "lucide-react"
import { useAuth } from "@/lib/hooks/useAuth"

interface CollaborationPanelProps {
  sessionId: string
}

interface User {
  id: string
  name: string
  color: string
}

interface ChatMessage {
  id: string
  userId: string
  userName: string
  message: string
  timestamp: Date
}

export function CollaborationPanel({ sessionId }: CollaborationPanelProps) {
  const [users, setUsers] = useState<User[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [copied, setCopied] = useState(false)
  const { user } = useAuth()

  const currentUserName = user?.displayName || user?.email || "Guest"

  const copySessionLink = () => {
    const link = `${window.location.origin}/practice?session=${sessionId}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: `${Date.now()}`,
      userId: user?.uid || "guest",
      userName: currentUserName,
      message: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Active Users */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4" />
          <span className="text-sm font-semibold">Active Users (1)</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-500 text-white text-xs">
                {currentUserName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{currentUserName} (You)</span>
          </div>
        </div>
      </div>

      {/* Session Link */}
      <div className="p-4 border-b">
        <div className="text-xs text-muted-foreground mb-2">Share Session</div>
        <div className="flex gap-2">
          <Input
            value={sessionId}
            readOnly
            className="text-xs"
          />
          <Button size="sm" onClick={copySessionLink} variant="outline">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b">
          <span className="text-sm font-semibold">Chat</span>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-8">
                No messages yet. Start a conversation!
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold">{msg.userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-sm bg-muted p-2 rounded">
                    {msg.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="p-3 border-t">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button size="sm" onClick={sendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
