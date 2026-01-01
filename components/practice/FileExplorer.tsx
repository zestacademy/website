"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { File, Plus, Trash2, Folder } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileItem {
  id: string
  name: string
  content: string
}

interface FileExplorerProps {
  files: FileItem[]
  activeFileId: string
  onFileSelect: (fileId: string) => void
  onFileCreate: (name: string) => void
  onFileDelete: (fileId: string) => void
}

export function FileExplorer({
  files,
  activeFileId,
  onFileSelect,
  onFileCreate,
  onFileDelete,
}: FileExplorerProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [newFileName, setNewFileName] = useState("")

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      onFileCreate(newFileName.trim())
      setNewFileName("")
      setIsCreating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreateFile()
    } else if (e.key === "Escape") {
      setIsCreating(false)
      setNewFileName("")
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Folder className="h-4 w-4" />
          Files
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsCreating(true)}
          className="h-7 w-7 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {isCreating && (
          <div className="mb-2 px-2">
            <Input
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleCreateFile}
              placeholder="filename.js"
              className="h-8 text-sm"
              autoFocus
            />
          </div>
        )}

        <div className="space-y-1">
          {files.map((file) => (
            <div
              key={file.id}
              className={cn(
                "flex items-center justify-between p-2 rounded cursor-pointer hover:bg-accent group",
                activeFileId === file.id && "bg-accent"
              )}
              onClick={() => onFileSelect(file.id)}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <File className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm truncate">{file.name}</span>
              </div>
              {files.length > 1 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    onFileDelete(file.id)
                  }}
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
