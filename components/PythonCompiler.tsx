"use client"

import { useState, useEffect, useRef } from "react"
import Script from "next/script"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Loader2, Terminal, Download, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function PythonCompiler() {
    const [code, setCode] = useState<string>("# Write your Python code here\nprint('Hello, Zest Academy!')\n\ndef fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)\n\nprint(f'Fibonacci(10): {fib(10)}')")
    const [output, setOutput] = useState<string>("")
    const [isRunning, setIsRunning] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const pyodideRef = useRef<any>(null)

    // Clear output when code changes is annoying for some, so we keep it until manual clear or run
    // But usually clearing on new run is expected.

    const runCode = async () => {
        if (!pyodideRef.current) return
        setIsRunning(true)
        // We don't clear output automatically on run to allow accumulating logs, 
        // but typically a "fresh run" feels better if it clears. 
        // Let's clear it for this use case.
        setOutput("")
        try {
            await pyodideRef.current.runPythonAsync(code)
        } catch (error: any) {
            setOutput((prev) => prev + `Error: ${error.message}\n`)
        } finally {
            setIsRunning(false)
        }
    }

    const clearOutput = () => setOutput("")

    const resetCode = () => {
        setCode("# Write your Python code here\nprint('Hello, Zest Academy!')\n\ndef fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)\n\nprint(f'Fibonacci(10): {fib(10)}')")
        setOutput("")
    }

    return (
        <div className="flex flex-col h-[85vh] gap-4">
            <Script
                src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"
                strategy="afterInteractive"
                onLoad={async () => {
                    try {
                        // @ts-ignore
                        const pyodide = await window.loadPyodide({
                            stdout: (text: string) => {
                                setOutput((prev) => prev + text + "\n")
                            },
                            stderr: (text: string) => {
                                setOutput((prev) => prev + "Error: " + text + "\n")
                            }
                        })
                        pyodideRef.current = pyodide
                        setIsLoading(false)
                    } catch (e) {
                        console.error("Failed to load Pyodide:", e)
                        setOutput("Failed to load Python environment. Please refresh.")
                    }
                }}
            />

            <div className="flex items-center justify-between bg-card p-2 rounded-lg border shadow-sm">
                <div className="flex items-center gap-2 px-2">
                    <Terminal className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-lg">Python Playground</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={resetCode}
                        title="Reset Code"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={clearOutput}
                        title="Clear Output"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Out
                    </Button>
                    <Button
                        onClick={runCode}
                        disabled={isLoading || isRunning}
                        className="bg-green-600 hover:bg-green-700 text-white min-w-[100px]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Loading...
                            </>
                        ) : isRunning ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Running...
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4 mr-2" />
                                Run
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
                {/* Editor Section */}
                <Card className="flex flex-col overflow-hidden border-border h-full shadow-md">
                    <div className="bg-muted px-4 py-2 border-b text-xs font-mono text-muted-foreground flex justify-between">
                        <span>main.py</span>
                        <span>Python 3.11 (Pyodide)</span>
                    </div>
                    <div className="flex-1 min-h-0">
                        <Editor
                            height="100%"
                            defaultLanguage="python"
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 16 }
                            }}
                        />
                    </div>
                </Card>

                {/* Output Section */}
                <Card className="flex flex-col overflow-hidden border-border bg-[#1e1e1e] text-white h-full shadow-md">
                    <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#3e3e3e] text-xs font-mono text-gray-400 flex justify-between">
                        <span>Terminal Output</span>
                        {isRunning && <span className="text-green-400 animate-pulse">● Executing...</span>}
                    </div>
                    <div className="flex-1 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
                        {output ? output : <span className="text-gray-500 italic"># output will appear here...</span>}
                    </div>
                </Card>
            </div>
        </div>
    )
}
