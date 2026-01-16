"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Code, Loader2, Terminal, Clock, MemoryStick } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

const DEFAULT_CODE = `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    printf("Welcome to C Programming Compiler!\\n");
    
    int a = 10, b = 20;
    printf("Sum of %d and %d is %d\\n", a, b, a + b);
    
    return 0;
}`

export default function CCompiler() {
    const [code, setCode] = useState<string>(DEFAULT_CODE)
    const [input, setInput] = useState<string>("")
    const [output, setOutput] = useState<string>("")
    const [compileError, setCompileError] = useState<string>("")
    const [isRunning, setIsRunning] = useState(false)
    const [executionTime, setExecutionTime] = useState<number>(0)
    const [status, setStatus] = useState<"idle" | "compiling" | "running" | "success" | "error">("idle")

    const runCode = async () => {
        setIsRunning(true)
        setOutput("")
        setCompileError("")
        setStatus("compiling")
        
        const startTime = performance.now()

        try {
            // Use JDoodle API for C compilation
            const response = await fetch('https://api.jdoodle.com/v1/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId: process.env.NEXT_PUBLIC_JDOODLE_CLIENT_ID || 'b6f84d43daa610b16b2e70fd2db6ef2c',
                    clientSecret: process.env.NEXT_PUBLIC_JDOODLE_CLIENT_SECRET || 'ed86f7a5f5d8eb827847a2c55d6f8b2fe19bf321e45bfbb5edc7ef07f6c285e9',
                    script: code,
                    stdin: input,
                    language: 'c',
                    versionIndex: '5', // GCC 9.1.0
                })
            })

            const result = await response.json()
            const endTime = performance.now()
            setExecutionTime(endTime - startTime)

            if (result.error) {
                setCompileError(result.error)
                setStatus("error")
            } else if (result.compilationStatus === "failed" || result.statusCode === 11) {
                setCompileError(result.output || "Compilation failed")
                setStatus("error")
            } else {
                setOutput(result.output || "(no output)")
                setStatus("success")
            }
        } catch (error: any) {
            setCompileError(`Network Error: ${error.message}\n\nNote: This compiler uses an external API. If it's not working, the service might be temporarily unavailable.`)
            setStatus("error")
        } finally {
            setIsRunning(false)
        }
    }

    const resetCode = () => {
        setCode(DEFAULT_CODE)
        setInput("")
        setOutput("")
        setCompileError("")
        setStatus("idle")
        setExecutionTime(0)
    }

    const getStatusBadge = () => {
        switch (status) {
            case "compiling":
                return <span className="text-yellow-500">⚙️ Compiling...</span>
            case "running":
                return <span className="text-blue-500">▶️ Running...</span>
            case "success":
                return <span className="text-green-500">✅ Success</span>
            case "error":
                return <span className="text-red-500">❌ Error</span>
            default:
                return <span className="text-gray-500">⏸️ Ready</span>
        }
    }

    return (
        <div className="flex flex-col h-[85vh] gap-4">
            <div className="flex items-center justify-between bg-card p-2 rounded-lg border shadow-sm">
                <div className="flex items-center gap-4 px-2">
                    <div className="flex items-center gap-2">
                        <Code className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-lg">C Programming Compiler</span>
                    </div>
                    <div className="text-sm">
                        {getStatusBadge()}
                    </div>
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
                        onClick={runCode}
                        disabled={isRunning}
                        className="bg-green-600 hover:bg-green-700 text-white min-w-[100px]"
                    >
                        {isRunning ? (
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
                <div className="flex flex-col gap-4 h-full min-h-0">
                    <Card className="flex flex-col overflow-hidden border-border flex-[3] shadow-md">
                        <div className="bg-muted px-4 py-2 border-b text-xs font-mono text-muted-foreground flex justify-between">
                            <span>main.c</span>
                            <span>GCC 9.1.0</span>
                        </div>
                        <div className="flex-1 min-h-0">
                            <Editor
                                height="100%"
                                defaultLanguage="c"
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

                    {/* Input Section */}
                    <Card className="flex flex-col overflow-hidden border-border flex-1 shadow-md">
                        <div className="bg-muted px-4 py-2 border-b text-xs font-mono text-muted-foreground">
                            <span>Standard Input (stdin)</span>
                        </div>
                        <div className="flex-1 p-4">
                            <Textarea
                                placeholder="Enter input here (if your program uses scanf, gets, etc.)"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full h-full resize-none font-mono text-sm"
                            />
                        </div>
                    </Card>
                </div>

                {/* Output Section */}
                <div className="flex flex-col gap-4 h-full min-h-0">
                    {/* Compilation Errors */}
                    {compileError && (
                        <Card className="flex flex-col overflow-hidden border-red-500 bg-red-50 dark:bg-red-950/20 shadow-md">
                            <div className="bg-red-100 dark:bg-red-900/30 px-4 py-2 border-b border-red-300 dark:border-red-800 text-xs font-mono flex items-center gap-2">
                                <span className="text-red-600 dark:text-red-400 font-semibold">❌ Compilation Error</span>
                            </div>
                            <div className="flex-1 p-4 overflow-auto">
                                <pre className="text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap font-mono">{compileError}</pre>
                            </div>
                        </Card>
                    )}

                    {/* Standard Output */}
                    <Card className="flex flex-col overflow-hidden border-border bg-[#1e1e1e] text-white flex-1 min-h-0 shadow-md">
                        <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#3e3e3e] text-xs font-mono text-gray-400 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4" />
                                <span>Program Output</span>
                            </div>
                            {executionTime > 0 && (
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1 text-green-400">
                                        <Clock className="w-3 h-3" />
                                        {executionTime.toFixed(0)}ms
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
                            {output ? output : <span className="text-gray-500 italic"># program output will appear here...</span>}
                        </div>
                    </Card>

                    {/* Tips Card */}
                    <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                        <h3 className="font-semibold text-sm mb-2 text-blue-700 dark:text-blue-400">💡 Tips:</h3>
                        <ul className="text-xs space-y-1 text-blue-600 dark:text-blue-300">
                            <li>• Don't forget semicolons at the end of statements</li>
                            <li>• Check that main() has the correct signature</li>
                            <li>• Use printf() for output, scanf() for input</li>
                            <li>• Remember to include necessary headers</li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    )
}
