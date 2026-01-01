"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Pause, StepForward, Circle, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Breakpoint {
  line: number
  condition?: string
}

interface Variable {
  name: string
  value: string
  type: string
}

interface DebuggerProps {
  breakpoints: Breakpoint[]
  variables: Variable[]
  currentLine?: number
  onAddBreakpoint: (line: number) => void
  onRemoveBreakpoint: (line: number) => void
  onStepOver: () => void
  onStepInto: () => void
  onContinue: () => void
  onPause: () => void
  isRunning: boolean
}

export function Debugger({
  breakpoints,
  variables,
  currentLine,
  onAddBreakpoint,
  onRemoveBreakpoint,
  onStepOver,
  onStepInto,
  onContinue,
  onPause,
  isRunning,
}: DebuggerProps) {
  const [newBreakpoint, setNewBreakpoint] = useState("")
  const [watchExpression, setWatchExpression] = useState("")
  const [watchedExpressions, setWatchedExpressions] = useState<string[]>([])

  const handleAddBreakpoint = () => {
    const line = parseInt(newBreakpoint)
    if (!isNaN(line) && line > 0) {
      onAddBreakpoint(line)
      setNewBreakpoint("")
    }
  }

  const handleAddWatch = () => {
    if (watchExpression.trim()) {
      setWatchedExpressions([...watchedExpressions, watchExpression.trim()])
      setWatchExpression("")
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Debug Controls */}
      <div className="p-3 border-b">
        <div className="flex items-center gap-2">
          {isRunning ? (
            <Button size="sm" variant="outline" onClick={onPause}>
              <Pause className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={onContinue}>
              <Play className="h-4 w-4" />
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={onStepOver}>
            <StepForward className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={onStepInto}>
            Step Into
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        {/* Breakpoints */}
        <div className="p-4 border-b">
          <h4 className="text-sm font-semibold mb-2">Breakpoints</h4>
          <div className="space-y-2 mb-3">
            {breakpoints.length === 0 ? (
              <div className="text-xs text-muted-foreground">No breakpoints set</div>
            ) : (
              breakpoints.map((bp) => (
                <div
                  key={bp.line}
                  className={cn(
                    "flex items-center justify-between p-2 rounded text-sm",
                    currentLine === bp.line ? "bg-yellow-100 dark:bg-yellow-900" : "bg-muted"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Circle className="h-3 w-3 fill-red-500 text-red-500" />
                    <span>Line {bp.line}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveBreakpoint(bp.line)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Line number"
              value={newBreakpoint}
              onChange={(e) => setNewBreakpoint(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddBreakpoint()}
              className="h-8 text-sm"
            />
            <Button size="sm" onClick={handleAddBreakpoint}>
              Add
            </Button>
          </div>
        </div>

        {/* Variables */}
        <div className="p-4 border-b">
          <h4 className="text-sm font-semibold mb-2">Variables</h4>
          {variables.length === 0 ? (
            <div className="text-xs text-muted-foreground">No variables in scope</div>
          ) : (
            <div className="space-y-2">
              {variables.map((variable, index) => (
                <div key={index} className="text-sm">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-blue-600 dark:text-blue-400">
                      {variable.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{variable.type}</span>
                  </div>
                  <div className="ml-4 font-mono text-xs text-muted-foreground">
                    = {variable.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Watch Expressions */}
        <div className="p-4">
          <h4 className="text-sm font-semibold mb-2">Watch</h4>
          <div className="space-y-2 mb-3">
            {watchedExpressions.map((expr, index) => (
              <div key={index} className="flex items-center justify-between text-sm bg-muted p-2 rounded">
                <span className="font-mono">{expr}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setWatchedExpressions(watchedExpressions.filter((_, i) => i !== index))}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Expression to watch"
              value={watchExpression}
              onChange={(e) => setWatchExpression(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddWatch()}
              className="h-8 text-sm"
            />
            <Button size="sm" onClick={handleAddWatch}>
              Add
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
