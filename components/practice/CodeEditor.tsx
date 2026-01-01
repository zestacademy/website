"use client"

import { useEffect, useRef } from "react"
import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"

interface File {
  id: string
  name: string
  content: string
}

interface CodeEditorProps {
  file: File
  language: string
  onChange: (content: string) => void
  sessionId: string
}

export function CodeEditor({ file, language, onChange, sessionId }: CodeEditorProps) {
  const { theme } = useTheme()
  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
    
    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      wordWrap: "on",
    })
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value)
    }
  }

  // Map common language extensions to Monaco language IDs
  const getMonacoLanguage = (lang: string): string => {
    const languageMap: { [key: string]: string } = {
      javascript: "javascript",
      python: "python",
      java: "java",
      cpp: "cpp",
      c: "c",
      "c++": "cpp",
      go: "go",
      rust: "rust",
      typescript: "typescript",
      ruby: "ruby",
      php: "php",
      swift: "swift",
      kotlin: "kotlin",
      scala: "scala",
      r: "r",
      sql: "sql",
      html: "html",
      css: "css",
      json: "json",
      yaml: "yaml",
      markdown: "markdown",
      shell: "shell",
      bash: "shell",
    }
    return languageMap[lang.toLowerCase()] || "plaintext"
  }

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        defaultLanguage={getMonacoLanguage(language)}
        language={getMonacoLanguage(language)}
        value={file.content}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={theme === "dark" ? "vs-dark" : "light"}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: "line",
          automaticLayout: true,
        }}
        loading={<div className="flex items-center justify-center h-full">Loading editor...</div>}
      />
    </div>
  )
}
