"use client"

import { useState, useEffect, useRef } from "react"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Code2, Palette, FileCode, Eye, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Playground</title>
</head>
<body>
    <h1>Welcome to Web Playground! 🎨</h1>
    <p>Edit HTML, CSS, and JavaScript to see live changes.</p>
    <button id="btn">Click Me!</button>
</body>
</html>`

const DEFAULT_CSS = `body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 40px;
    margin: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
    font-size: 1.2rem;
    margin-bottom: 30px;
}

button {
    background: white;
    color: #667eea;
    border: none;
    padding: 15px 30px;
    font-size: 1.1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0,0,0,0.3);
}`

const DEFAULT_JS = `// JavaScript code
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('btn');
    let clickCount = 0;
    
    btn.addEventListener('click', function() {
        clickCount++;
        alert('Button clicked ' + clickCount + ' time(s)!');
        console.log('Click count:', clickCount);
    });
    
    console.log('Web Playground is ready! 🚀');
});`

export default function WebPlaygroundCompiler() {
    const [html, setHtml] = useState<string>(DEFAULT_HTML)
    const [css, setCss] = useState<string>(DEFAULT_CSS)
    const [js, setJs] = useState<string>(DEFAULT_JS)
    const [srcDoc, setSrcDoc] = useState<string>("")
    const [consoleOutput, setConsoleOutput] = useState<string[]>([])
    const [isRunning, setIsRunning] = useState(false)
    const iframeRef = useRef<HTMLIFrameElement>(null)

    const runCode = () => {
        setIsRunning(true)
        setConsoleOutput([])
        
        // Create the full HTML document with CSS and JS injected
        const fullDocument = `
<!DOCTYPE html>
<html>
<head>
    <style>${css}</style>
</head>
<body>
    ${html}
    <script>
        // Capture console.log, console.error, console.warn
        (function() {
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            
            console.log = function(...args) {
                window.parent.postMessage({ 
                    type: 'console', 
                    level: 'log', 
                    message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
                }, window.location.origin);
                originalLog.apply(console, args);
            };
            
            console.error = function(...args) {
                window.parent.postMessage({ 
                    type: 'console', 
                    level: 'error', 
                    message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
                }, window.location.origin);
                originalError.apply(console, args);
            };
            
            console.warn = function(...args) {
                window.parent.postMessage({ 
                    type: 'console', 
                    level: 'warn', 
                    message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
                }, window.location.origin);
                originalWarn.apply(console, args);
            };
            
            // Capture runtime errors
            window.addEventListener('error', function(e) {
                window.parent.postMessage({ 
                    type: 'console', 
                    level: 'error', 
                    message: 'Error: ' + e.message + ' at line ' + e.lineno
                }, window.location.origin);
            });
        })();
    </script>
    <script>
        try {
            ${js}
        } catch (error) {
            console.error('JavaScript Error:', error.message);
        }
    </script>
</body>
</html>`
        
        setSrcDoc(fullDocument)
        setTimeout(() => setIsRunning(false), 500)
    }

    const resetCode = () => {
        setHtml(DEFAULT_HTML)
        setCss(DEFAULT_CSS)
        setJs(DEFAULT_JS)
        setSrcDoc("")
        setConsoleOutput([])
    }

    // Listen for console messages from iframe
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'console') {
                const timestamp = new Date().toLocaleTimeString()
                const prefix = event.data.level === 'error' ? '❌' : event.data.level === 'warn' ? '⚠️' : 'ℹ️'
                setConsoleOutput(prev => [...prev, `[${timestamp}] ${prefix} ${event.data.message}`])
            }
        }
        
        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [])

    return (
        <div className="flex flex-col h-[85vh] gap-4">
            <div className="flex items-center justify-between bg-card p-2 rounded-lg border shadow-sm">
                <div className="flex items-center gap-2 px-2">
                    <Code2 className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-lg">Web Playground</span>
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
                {/* Editors Section */}
                <Card className="flex flex-col overflow-hidden border-border h-full shadow-md">
                    <Tabs defaultValue="html" className="flex flex-col h-full">
                        <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
                            <TabsTrigger value="html" className="flex items-center gap-2">
                                <FileCode className="w-4 h-4" />
                                HTML
                            </TabsTrigger>
                            <TabsTrigger value="css" className="flex items-center gap-2">
                                <Palette className="w-4 h-4" />
                                CSS
                            </TabsTrigger>
                            <TabsTrigger value="js" className="flex items-center gap-2">
                                <Code2 className="w-4 h-4" />
                                JavaScript
                            </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="html" className="flex-1 m-0 min-h-0">
                            <Editor
                                height="100%"
                                defaultLanguage="html"
                                value={html}
                                onChange={(value) => setHtml(value || "")}
                                theme="vs-dark"
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    padding: { top: 16 }
                                }}
                            />
                        </TabsContent>
                        
                        <TabsContent value="css" className="flex-1 m-0 min-h-0">
                            <Editor
                                height="100%"
                                defaultLanguage="css"
                                value={css}
                                onChange={(value) => setCss(value || "")}
                                theme="vs-dark"
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    padding: { top: 16 }
                                }}
                            />
                        </TabsContent>
                        
                        <TabsContent value="js" className="flex-1 m-0 min-h-0">
                            <Editor
                                height="100%"
                                defaultLanguage="javascript"
                                value={js}
                                onChange={(value) => setJs(value || "")}
                                theme="vs-dark"
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    padding: { top: 16 }
                                }}
                            />
                        </TabsContent>
                    </Tabs>
                </Card>

                {/* Preview and Console Section */}
                <div className="flex flex-col gap-4 h-full min-h-0">
                    {/* Preview */}
                    <Card className="flex flex-col overflow-hidden border-border flex-[2] min-h-0 shadow-md">
                        <div className="bg-muted px-4 py-2 border-b text-xs font-mono text-muted-foreground flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>Live Preview</span>
                        </div>
                        <div className="flex-1 bg-white min-h-0">
                            {srcDoc ? (
                                <iframe
                                    ref={iframeRef}
                                    srcDoc={srcDoc}
                                    title="output"
                                    sandbox="allow-scripts"
                                    className="w-full h-full border-0"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <div className="text-center">
                                        <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                        <p>Click Run to see your code in action</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Console */}
                    <Card className="flex flex-col overflow-hidden border-border bg-[#1e1e1e] text-white flex-1 min-h-0 shadow-md">
                        <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#3e3e3e] text-xs font-mono text-gray-400 flex justify-between">
                            <span>Console</span>
                            {consoleOutput.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setConsoleOutput([])}
                                    className="h-6 px-2 text-xs"
                                >
                                    Clear
                                </Button>
                            )}
                        </div>
                        <div className="flex-1 p-4 font-mono text-xs overflow-auto whitespace-pre-wrap">
                            {consoleOutput.length > 0 ? (
                                consoleOutput.map((log, i) => (
                                    <div key={i} className="mb-1">{log}</div>
                                ))
                            ) : (
                                <span className="text-gray-500 italic"># console output will appear here...</span>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
