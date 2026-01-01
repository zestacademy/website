"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Pen, Eraser, Square, Circle, Type, Trash2, Undo, Redo } from "lucide-react"
import { cn } from "@/lib/utils"

interface WhiteboardProps {
  sessionId: string
}

type Tool = "pen" | "eraser" | "rectangle" | "circle" | "text"

export function Whiteboard({ sessionId }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<Tool>("pen")
  const [color, setColor] = useState("#000000")
  const [lineWidth, setLineWidth] = useState(2)
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyStep, setHistoryStep] = useState(-1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      
      // Fill with white background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Save initial state
      if (history.length === 0) {
        saveState()
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  const saveState = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const newHistory = history.slice(0, historyStep + 1)
    newHistory.push(imageData)
    setHistory(newHistory)
    setHistoryStep(newHistory.length - 1)
  }

  const undo = () => {
    if (historyStep <= 0) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    setHistoryStep(historyStep - 1)
    ctx.putImageData(history[historyStep - 1], 0, 0)
  }

  const redo = () => {
    if (historyStep >= history.length - 1) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    setHistoryStep(historyStep + 1)
    ctx.putImageData(history[historyStep + 1], 0, 0)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    saveState()
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)

    if (tool === "pen" || tool === "eraser") {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color
      ctx.lineWidth = tool === "eraser" ? lineWidth * 3 : lineWidth
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === "pen" || tool === "eraser") {
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      saveState()
    }
  }

  const colors = [
    "#000000", // Black
    "#FF0000", // Red
    "#0000FF", // Blue
    "#00FF00", // Green
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#FFA500", // Orange
  ]

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Toolbar */}
      <div className="border-b p-2 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant={tool === "pen" ? "default" : "outline"}
            onClick={() => setTool("pen")}
          >
            <Pen className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={tool === "eraser" ? "default" : "outline"}
            onClick={() => setTool("eraser")}
          >
            <Eraser className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={tool === "rectangle" ? "default" : "outline"}
            onClick={() => setTool("rectangle")}
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={tool === "circle" ? "default" : "outline"}
            onClick={() => setTool("circle")}
          >
            <Circle className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={tool === "text" ? "default" : "outline"}
            onClick={() => setTool("text")}
          >
            <Type className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex items-center gap-1">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={cn(
                "w-6 h-6 rounded border-2 transition-all",
                color === c ? "border-primary scale-110" : "border-transparent"
              )}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" onClick={undo} disabled={historyStep <= 0}>
            <Undo className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={redo} disabled={historyStep >= history.length - 1}>
            <Redo className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={clearCanvas}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-full cursor-crosshair"
        />
      </div>
    </div>
  )
}
