"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Terminal } from "lucide-react"

interface ConsoleProps {
  output: string
}

export function Console({ output }: ConsoleProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll to bottom when output changes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [output])

  return (
    <div className="flex flex-col h-full bg-black text-green-400 font-mono">
      <div className="p-3 border-b border-gray-800 flex items-center gap-2 bg-gray-900">
        <Terminal className="h-4 w-4" />
        <span className="text-sm font-semibold">Output Console</span>
      </div>
      
      <ScrollArea className="flex-1">
        <div ref={scrollRef} className="p-4 text-sm whitespace-pre-wrap">
          {output || "No output yet. Run your code to see results here."}
        </div>
      </ScrollArea>
    </div>
  )
}
