"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Clock } from "lucide-react"

interface CodeChange {
  timestamp: number
  fileId: string
  content: string
  cursorPosition?: number
}

interface CodePlaybackProps {
  changes: CodeChange[]
  onReplay: (change: CodeChange) => void
  currentTime: number
  totalTime: number
}

export function CodePlayback({ changes, onReplay, currentTime, totalTime }: CodePlaybackProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [playbackTime, setPlaybackTime] = useState(0)

  useEffect(() => {
    if (!isPlaying || changes.length === 0) return

    const interval = setInterval(() => {
      setPlaybackTime((prev) => {
        const next = prev + (100 * playbackSpeed)
        if (next >= totalTime) {
          setIsPlaying(false)
          return totalTime
        }
        
        // Find and replay the change at this timestamp
        const change = changes.find((c) => 
          c.timestamp >= prev && c.timestamp <= next
        )
        if (change) {
          onReplay(change)
        }
        
        return next
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying, playbackSpeed, changes, totalTime, onReplay])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleRestart = () => {
    setPlaybackTime(0)
    setIsPlaying(false)
  }

  const handleSeek = (value: number[]) => {
    setPlaybackTime(value[0])
    setIsPlaying(false)
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="border-t bg-card p-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleRestart}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={handlePlayPause}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex-1 flex items-center gap-4">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground min-w-[60px]">
            {formatTime(playbackTime)}
          </span>
          <Slider
            value={[playbackTime]}
            max={totalTime || 1000}
            step={100}
            onValueChange={handleSeek}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground min-w-[60px]">
            {formatTime(totalTime)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Speed:</span>
          <Button
            size="sm"
            variant={playbackSpeed === 0.5 ? "default" : "outline"}
            onClick={() => setPlaybackSpeed(0.5)}
            className="w-12"
          >
            0.5x
          </Button>
          <Button
            size="sm"
            variant={playbackSpeed === 1 ? "default" : "outline"}
            onClick={() => setPlaybackSpeed(1)}
            className="w-12"
          >
            1x
          </Button>
          <Button
            size="sm"
            variant={playbackSpeed === 2 ? "default" : "outline"}
            onClick={() => setPlaybackSpeed(2)}
            className="w-12"
          >
            2x
          </Button>
        </div>
      </div>

      <div className="mt-3 text-xs text-muted-foreground">
        {changes.length} changes recorded
      </div>
    </div>
  )
}
