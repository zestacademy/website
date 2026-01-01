"use client"

import { useState } from "react"
import { CodeEditor } from "@/components/practice/CodeEditor"
import { Whiteboard } from "@/components/practice/Whiteboard"
import { Console } from "@/components/practice/Console"
import { FileExplorer } from "@/components/practice/FileExplorer"
import { LanguageSelector } from "@/components/practice/LanguageSelector"
import { CollaborationPanel } from "@/components/practice/CollaborationPanel"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Save, Share2, Users, Code2, Presentation } from "lucide-react"

export default function PracticePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [files, setFiles] = useState([
    { id: "1", name: "main.js", content: "// Write your code here\nconsole.log('Hello, World!');" }
  ])
  const [activeFileId, setActiveFileId] = useState("1")
  const [output, setOutput] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [sessionId] = useState(`session-${Date.now()}`)
  const [activeView, setActiveView] = useState<"code" | "whiteboard">("code")

  const activeFile = files.find(f => f.id === activeFileId)

  const handleFileUpdate = (fileId: string, content: string) => {
    setFiles(files.map(f => f.id === fileId ? { ...f, content } : f))
  }

  const handleCreateFile = (name: string) => {
    const newFile = {
      id: `${Date.now()}`,
      name,
      content: ""
    }
    setFiles([...files, newFile])
    setActiveFileId(newFile.id)
  }

  const handleDeleteFile = (fileId: string) => {
    if (files.length === 1) return // Keep at least one file
    setFiles(files.filter(f => f.id !== fileId))
    if (activeFileId === fileId) {
      setActiveFileId(files[0].id)
    }
  }

  const handleRunCode = async () => {
    if (!activeFile) return
    
    setIsExecuting(true)
    setOutput("Executing code...\n")

    try {
      // Use Judge0 API for code execution
      const response = await fetch("/api/execute-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLanguage,
          code: activeFile.content,
          files: files
        })
      })

      const data = await response.json()
      
      if (data.error) {
        setOutput(`Error: ${data.error}\n`)
      } else {
        setOutput(data.output || "Execution completed successfully.\n")
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`)
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                Zest Academy IDE
              </h1>
              <LanguageSelector 
                value={selectedLanguage} 
                onChange={setSelectedLanguage}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleRunCode}
                disabled={isExecuting}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="h-4 w-4 mr-2" />
                {isExecuting ? "Running..." : "Run"}
              </Button>
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Collaborate
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - File Explorer */}
        <div className="w-64 border-r bg-card overflow-auto">
          <FileExplorer
            files={files}
            activeFileId={activeFileId}
            onFileSelect={setActiveFileId}
            onFileCreate={handleCreateFile}
            onFileDelete={handleDeleteFile}
          />
        </div>

        {/* Center - Editor/Whiteboard */}
        <div className="flex-1 flex flex-col">
          {/* View Toggle */}
          <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "code" | "whiteboard")} className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-card h-10">
              <TabsTrigger value="code" className="gap-2">
                <Code2 className="h-4 w-4" />
                Code Editor
              </TabsTrigger>
              <TabsTrigger value="whiteboard" className="gap-2">
                <Presentation className="h-4 w-4" />
                Whiteboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="flex-1 m-0 h-full">
              {activeFile && (
                <CodeEditor
                  file={activeFile}
                  language={selectedLanguage}
                  onChange={(content) => handleFileUpdate(activeFile.id, content)}
                  sessionId={sessionId}
                />
              )}
            </TabsContent>

            <TabsContent value="whiteboard" className="flex-1 m-0 h-full">
              <Whiteboard sessionId={sessionId} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar - Console & Collaboration */}
        <div className="w-96 border-l flex flex-col">
          <Tabs defaultValue="console" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b bg-card h-10">
              <TabsTrigger value="console">Console</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            </TabsList>

            <TabsContent value="console" className="flex-1 m-0 overflow-auto">
              <Console output={output} />
            </TabsContent>

            <TabsContent value="collaboration" className="flex-1 m-0 overflow-auto">
              <CollaborationPanel sessionId={sessionId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
