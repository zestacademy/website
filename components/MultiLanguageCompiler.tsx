"use client"

import { useState, useEffect, useRef } from "react"
import Script from "next/script"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Loader2, Terminal, Trash2, Database, Code2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Language = "python" | "javascript" | "sql"

const DEFAULT_CODE = {
    python: "# Write your Python code here\nprint('Hello, Zest Academy!')\n\ndef fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)\n\nprint(f'Fibonacci(10): {fib(10)}')",
    javascript: "// Write your JavaScript code here\nconsole.log('Hello, Zest Academy!');\n\nfunction fib(n) {\n    if (n <= 1) return n;\n    return fib(n-1) + fib(n-2);\n}\n\nconsole.log(`Fibonacci(10): ${fib(10)}`);",
    sql: "-- Write your SQL query here\n-- Available tables: users, products, orders\n\nSELECT * FROM users LIMIT 5;"
}

const LANGUAGE_INFO = {
    python: { icon: Terminal, label: "Python", filename: "main.py", version: "Python 3.11 (Pyodide)" },
    javascript: { icon: Code2, label: "JavaScript", filename: "script.js", version: "Node.js 20" },
    sql: { icon: Database, label: "SQL", filename: "query.sql", version: "SQLite 3" }
}

export default function MultiLanguageCompiler() {
    const [language, setLanguage] = useState<Language>("python")
    const [code, setCode] = useState<string>(DEFAULT_CODE.python)
    const [output, setOutput] = useState<string>("")
    const [isRunning, setIsRunning] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const pyodideRef = useRef<any>(null)

    // Load Pyodide when component mounts
    useEffect(() => {
        if (typeof window !== "undefined") {
            const script = document.createElement("script")
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"
            script.async = true
            script.onload = async () => {
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
                    setIsLoading(false)
                }
            }
            document.body.appendChild(script)
        }
    }, [])

    const runPythonCode = async () => {
        if (!pyodideRef.current) return
        setOutput("")
        try {
            await pyodideRef.current.runPythonAsync(code)
        } catch (error: any) {
            setOutput((prev) => prev + `Error: ${error.message}\n`)
        }
    }

    const runJavaScriptCode = async () => {
        setOutput("")
        try {
            const response = await fetch("https://us-central1-zest-academy.cloudfunctions.net/executeJavascript", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()
            
            let outputText = ""
            if (result.stdout) outputText += result.stdout
            if (result.stderr) outputText += "\n" + result.stderr
            outputText += `\n\n⏱️ Execution time: ${result.time}`
            outputText += `\n💾 Memory usage: ${result.memory}`
            
            setOutput(outputText)
        } catch (error: any) {
            setOutput(`Error: ${error.message}\n\nNote: Make sure Firebase Functions are deployed.`)
        }
    }

    const runSqlCode = async () => {
        setOutput("")
        try {
            const response = await fetch("https://us-central1-zest-academy.cloudfunctions.net/executeSql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: code })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()
            
            let outputText = ""
            if (result.error) {
                outputText = `Error: ${result.error}`
            } else if (result.rows && result.rows.length > 0) {
                // Format results as table
                outputText = "Query Results:\n\n"
                
                // Get column names from first row
                const columns = Object.keys(result.rows[0])
                outputText += columns.join(" | ") + "\n"
                outputText += columns.map(() => "---").join("|") + "\n"
                
                // Add data rows
                result.rows.forEach((row: any) => {
                    outputText += columns.map(col => String(row[col] ?? "NULL")).join(" | ") + "\n"
                })
                
                outputText += `\n${result.rows.length} row(s) returned`
            } else {
                outputText = "Query executed successfully. No rows returned."
            }
            
            outputText += `\n\n⏱️ Execution time: ${result.time}`
            setOutput(outputText)
        } catch (error: any) {
            setOutput(`Error: ${error.message}\n\nNote: Make sure Firebase Functions are deployed.`)
        }
    }

    const runCode = async () => {
        setIsRunning(true)
        try {
            if (language === "python") {
                await runPythonCode()
            } else if (language === "javascript") {
                await runJavaScriptCode()
            } else if (language === "sql") {
                await runSqlCode()
            }
        } finally {
            setIsRunning(false)
        }
    }

    const clearOutput = () => setOutput("")

    const resetCode = () => {
        setCode(DEFAULT_CODE[language])
        setOutput("")
    }

    const handleLanguageChange = (newLanguage: Language) => {
        setLanguage(newLanguage)
        setCode(DEFAULT_CODE[newLanguage])
        setOutput("")
    }

    const LanguageIcon = LANGUAGE_INFO[language].icon

    return (
        <div className="flex flex-col h-[85vh] gap-4">
            <div className="flex items-center justify-between bg-card p-2 rounded-lg border shadow-sm">
                <div className="flex items-center gap-4 px-2">
                    <LanguageIcon className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-lg">Code Playground</span>
                    <Select value={language} onValueChange={handleLanguageChange}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="python">
                                <div className="flex items-center gap-2">
                                    <Terminal className="w-4 h-4" />
                                    Python
                                </div>
                            </SelectItem>
                            <SelectItem value="javascript">
                                <div className="flex items-center gap-2">
                                    <Code2 className="w-4 h-4" />
                                    JavaScript
                                </div>
                            </SelectItem>
                            <SelectItem value="sql">
                                <div className="flex items-center gap-2">
                                    <Database className="w-4 h-4" />
                                    SQL
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
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
                        disabled={(language === "python" && isLoading) || isRunning}
                        className="bg-green-600 hover:bg-green-700 text-white min-w-[100px]"
                    >
                        {(language === "python" && isLoading) ? (
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
                        <span>{LANGUAGE_INFO[language].filename}</span>
                        <span>{LANGUAGE_INFO[language].version}</span>
                    </div>
                    <div className="flex-1 min-h-0">
                        <Editor
                            height="100%"
                            language={language === "sql" ? "sql" : language}
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
                        <span>
                            {language === "sql" ? "Query Results" : "Terminal Output"}
                        </span>
                        {isRunning && <span className="text-green-400 animate-pulse">● Executing...</span>}
                    </div>
                    <div className="flex-1 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
                        {output ? output : (
                            <span className="text-gray-500 italic">
                                {language === "sql" 
                                    ? "# query results will appear here..." 
                                    : "# output will appear here..."}
                            </span>
                        )}
                    </div>
                </Card>
            </div>

            {language === "sql" && (
                <Card className="p-4 bg-muted/50 border-border">
                    <div className="text-sm space-y-2">
                        <p className="font-semibold text-muted-foreground">Available Tables:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
                            <div>
                                <strong>users:</strong> id, name, email, age, created_at
                            </div>
                            <div>
                                <strong>products:</strong> id, name, price, category, stock
                            </div>
                            <div>
                                <strong>orders:</strong> id, user_id, product_id, quantity, order_date
                            </div>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    )
}
