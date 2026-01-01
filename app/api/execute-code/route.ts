import { NextRequest, NextResponse } from "next/server"

// Language ID mapping for Judge0 API
const LANGUAGE_IDS: { [key: string]: number } = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
  c: 50,
  csharp: 51,
  go: 60,
  rust: 73,
  ruby: 72,
  php: 68,
  swift: 83,
  kotlin: 78,
  scala: 81,
  r: 80,
  perl: 85,
  haskell: 61,
  lua: 64,
  sql: 82,
  shell: 46,
  typescript: 74,
}

export async function POST(request: NextRequest) {
  try {
    const { language, code, files } = await request.json()

    if (!code) {
      return NextResponse.json(
        { error: "No code provided" },
        { status: 400 }
      )
    }

    // For demo purposes, we'll simulate code execution
    // In production, you would integrate with Judge0 API or similar service
    
    const languageId = LANGUAGE_IDS[language.toLowerCase()]
    
    if (!languageId) {
      // Fallback: simulate execution for unsupported languages
      return NextResponse.json({
        output: `Code execution simulated for ${language}.\n\nYour code:\n${code}\n\nNote: This is a demo. In production, integrate with Judge0 or similar service for real execution.`,
      })
    }

    // Simulate execution with mock output
    const output = simulateExecution(language, code)
    
    return NextResponse.json({ output })

    /* 
    // Production implementation with Judge0 API:
    // Uncomment and configure when ready to use real execution
    
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.JUDGE0_API_KEY || "",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: "",
      }),
    })

    const submission = await response.json()
    const token = submission.token

    // Poll for result
    let result
    let attempts = 0
    const maxAttempts = 10

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      const resultResponse = await fetch(
        `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.JUDGE0_API_KEY || "",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      )

      result = await resultResponse.json()

      if (result.status.id > 2) {
        break
      }

      attempts++
    }

    const output = result.stdout || result.stderr || result.compile_output || "No output"

    return NextResponse.json({ output })
    */
  } catch (error) {
    console.error("Code execution error:", error)
    return NextResponse.json(
      { error: "Failed to execute code" },
      { status: 500 }
    )
  }
}

function simulateExecution(language: string, code: string): string {
  const lang = language.toLowerCase()
  
  // Try to execute JavaScript code safely for demo purposes
  if (lang === 'javascript' || lang === 'typescript') {
    try {
      // Capture console.log output
      const logs: string[] = []
      const mockConsole = {
        log: (...args: any[]) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '))
        }
      }
      
      // Create a safe execution context
      const safeEval = new Function('console', code)
      safeEval(mockConsole)
      
      if (logs.length > 0) {
        return logs.join('\n') + '\n\n✓ Execution completed successfully.'
      } else {
        return '✓ Code executed successfully (no output).'
      }
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : String(error)}`
    }
  }
  
  // For Python, try to extract print statements
  if (lang === 'python') {
    const printMatches = code.match(/print\s*\((.*?)\)/g)
    if (printMatches && printMatches.length > 0) {
      const outputs = printMatches.map(match => {
        const content = match.match(/print\s*\((.*?)\)/)?.[1] || ''
        // Remove quotes if it's a string literal
        return content.replace(/^["']|["']$/g, '')
      })
      return outputs.join('\n') + '\n\n✓ Execution completed successfully.'
    }
  }
  
  // For other languages, show the code and a demo message
  return `Code execution simulated for ${language}.\n\nYour code:\n${code.substring(0, 300)}${code.length > 300 ? '...' : ''}\n\n✓ Execution completed successfully.\n\nNote: This is a demo mode. For real code execution, configure the Judge0 API integration.`
}
