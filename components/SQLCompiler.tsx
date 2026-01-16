"use client"

import { useState, useEffect, useRef } from "react"
import Script from "next/script"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Database, Loader2, BookOpen, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const EXAMPLE_QUERIES = [
    {
        name: "Select All Students",
        query: "SELECT * FROM students;"
    },
    {
        name: "Students with Marks > 80",
        query: "SELECT s.name, s.age, m.subject, m.marks\nFROM students s\nJOIN marks m ON s.id = m.student_id\nWHERE m.marks > 80\nORDER BY m.marks DESC;"
    },
    {
        name: "Average Marks by Subject",
        query: "SELECT subject, AVG(marks) as avg_marks, COUNT(*) as total_students\nFROM marks\nGROUP BY subject\nORDER BY avg_marks DESC;"
    },
    {
        name: "Create New Table",
        query: "CREATE TABLE courses (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  duration INTEGER\n);\n\nINSERT INTO courses VALUES (1, 'Python', 30);\nINSERT INTO courses VALUES (2, 'JavaScript', 25);\n\nSELECT * FROM courses;"
    },
    {
        name: "Update Student Age",
        query: "UPDATE students SET age = 22 WHERE name = 'Alice';\nSELECT * FROM students;"
    },
    {
        name: "Delete Low Marks",
        query: "DELETE FROM marks WHERE marks < 60;\nSELECT * FROM marks;"
    }
]

const DEFAULT_SQL = `-- Welcome to SQL Practice Lab!
-- Sample tables are already created for you.
-- Try these commands:

SELECT * FROM students;

-- Join students with their marks
SELECT s.name, s.age, m.subject, m.marks
FROM students s
JOIN marks m ON s.id = m.student_id
ORDER BY m.marks DESC;`

const INIT_SQL = `
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    email TEXT
);

CREATE TABLE marks (
    id INTEGER PRIMARY KEY,
    student_id INTEGER,
    subject TEXT,
    marks INTEGER,
    FOREIGN KEY (student_id) REFERENCES students(id)
);

INSERT INTO students VALUES (1, 'Alice', 20, 'alice@example.com');
INSERT INTO students VALUES (2, 'Bob', 21, 'bob@example.com');
INSERT INTO students VALUES (3, 'Charlie', 22, 'charlie@example.com');
INSERT INTO students VALUES (4, 'Diana', 20, 'diana@example.com');
INSERT INTO students VALUES (5, 'Eve', 23, 'eve@example.com');

INSERT INTO marks VALUES (1, 1, 'Mathematics', 95);
INSERT INTO marks VALUES (2, 1, 'Physics', 88);
INSERT INTO marks VALUES (3, 2, 'Mathematics', 78);
INSERT INTO marks VALUES (4, 2, 'Physics', 82);
INSERT INTO marks VALUES (5, 3, 'Mathematics', 92);
INSERT INTO marks VALUES (6, 3, 'Physics', 85);
INSERT INTO marks VALUES (7, 4, 'Mathematics', 70);
INSERT INTO marks VALUES (8, 4, 'Physics', 75);
INSERT INTO marks VALUES (9, 5, 'Mathematics', 88);
INSERT INTO marks VALUES (10, 5, 'Physics', 90);
`

export default function SQLCompiler() {
    const [code, setCode] = useState<string>(DEFAULT_SQL)
    const [output, setOutput] = useState<any[]>([])
    const [error, setError] = useState<string>("")
    const [isRunning, setIsRunning] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [executionTime, setExecutionTime] = useState<number>(0)
    const dbRef = useRef<any>(null)
    const sqlRef = useRef<any>(null)

    const initDatabase = async () => {
        if (!sqlRef.current) return
        try {
            const SQL = sqlRef.current
            const db = new SQL.Database()
            db.run(INIT_SQL)
            dbRef.current = db
            setError("")
        } catch (e: any) {
            setError("Failed to initialize database: " + e.message)
        }
    }

    const runQuery = () => {
        if (!dbRef.current) {
            setError("Database not initialized. Please wait...")
            return
        }

        setIsRunning(true)
        setOutput([])
        setError("")
        
        const startTime = performance.now()

        try {
            // Split by semicolon to handle multiple statements
            const statements = code.split(';').filter(s => s.trim())
            let lastResult: any[] = []

            for (const statement of statements) {
                if (!statement.trim()) continue
                
                try {
                    const results = dbRef.current.exec(statement)
                    
                    if (results.length > 0) {
                        lastResult = results
                    }
                } catch (e: any) {
                    throw new Error(`Error in statement: ${statement.substring(0, 50)}...\n${e.message}`)
                }
            }

            const endTime = performance.now()
            setExecutionTime(endTime - startTime)

            if (lastResult.length > 0) {
                setOutput(lastResult)
            } else {
                setOutput([])
                setError("Query executed successfully. No rows returned.")
            }
        } catch (e: any) {
            setError(e.message)
            setOutput([])
        } finally {
            setIsRunning(false)
        }
    }

    const resetDatabase = async () => {
        setOutput([])
        setError("")
        setCode(DEFAULT_SQL)
        await initDatabase()
    }

    const loadExample = (exampleQuery: string) => {
        setCode(exampleQuery)
    }

    useEffect(() => {
        // Script will be loaded via Script component
    }, [])

    return (
        <div className="flex flex-col h-[85vh] gap-4">
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js"
                strategy="afterInteractive"
                onLoad={async () => {
                    try {
                        // @ts-ignore
                        const initSqlJs = window.initSqlJs
                        const SQL = await initSqlJs({
                            locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
                        })
                        sqlRef.current = SQL
                        await initDatabase()
                        setIsLoading(false)
                    } catch (e) {
                        console.error("Failed to load SQL.js:", e)
                        setError("Failed to load SQL environment. Please refresh.")
                        setIsLoading(false)
                    }
                }}
            />

            <div className="flex items-center justify-between bg-card p-2 rounded-lg border shadow-sm">
                <div className="flex items-center gap-2 px-2">
                    <Database className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-lg">SQL Practice Lab</span>
                </div>
                <div className="flex items-center gap-2">
                    <Select onValueChange={loadExample}>
                        <SelectTrigger className="w-[200px] h-9">
                            <SelectValue placeholder="Load Example..." />
                        </SelectTrigger>
                        <SelectContent>
                            {EXAMPLE_QUERIES.map((ex) => (
                                <SelectItem key={ex.name} value={ex.query}>
                                    {ex.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={resetDatabase}
                        title="Reset Database"
                        disabled={isLoading}
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset DB
                    </Button>
                    <Button
                        onClick={runQuery}
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
                                Run Query
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
                {/* Editor Section */}
                <Card className="flex flex-col overflow-hidden border-border h-full shadow-md">
                    <div className="bg-muted px-4 py-2 border-b text-xs font-mono text-muted-foreground flex justify-between">
                        <span>query.sql</span>
                        <span>SQLite 3.x</span>
                    </div>
                    <div className="flex-1 min-h-0">
                        <Editor
                            height="100%"
                            defaultLanguage="sql"
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
                <Card className="flex flex-col overflow-hidden border-border h-full shadow-md">
                    <div className="bg-muted px-4 py-2 border-b text-xs font-mono text-muted-foreground flex justify-between">
                        <span>Query Results</span>
                        {executionTime > 0 && (
                            <span className="text-green-500">⚡ {executionTime.toFixed(2)}ms</span>
                        )}
                    </div>
                    <div className="flex-1 p-4 overflow-auto bg-background">
                        {error ? (
                            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                <div className="flex items-start gap-2">
                                    <span className="text-red-500 text-lg">❌</span>
                                    <div>
                                        <p className="font-semibold text-red-700 dark:text-red-400 mb-1">Error</p>
                                        <pre className="text-sm text-red-600 dark:text-red-300 whitespace-pre-wrap font-mono">{error}</pre>
                                    </div>
                                </div>
                            </div>
                        ) : output.length > 0 ? (
                            <div className="space-y-4">
                                {output.map((result, idx) => (
                                    <div key={idx} className="overflow-x-auto">
                                        <table className="min-w-full border border-border rounded-lg overflow-hidden">
                                            <thead className="bg-muted">
                                                <tr>
                                                    {result.columns.map((col: string, i: number) => (
                                                        <th key={i} className="px-4 py-2 text-left text-sm font-semibold border-b border-border">
                                                            {col}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {result.values.map((row: any[], rowIdx: number) => (
                                                    <tr key={rowIdx} className="hover:bg-muted/50 transition-colors">
                                                        {row.map((cell: any, cellIdx: number) => (
                                                            <td key={cellIdx} className="px-4 py-2 text-sm border-b border-border">
                                                                {cell === null ? <span className="text-gray-400 italic">NULL</span> : String(cell)}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {result.values.length} row(s) returned
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                <BookOpen className="w-12 h-12 mb-4 opacity-50" />
                                <p className="text-center mb-2">Run a query to see results</p>
                                <p className="text-xs text-center">Sample tables: <code className="bg-muted px-2 py-1 rounded">students</code>, <code className="bg-muted px-2 py-1 rounded">marks</code></p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}
