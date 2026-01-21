"use client"

import React from 'react'

export default function PythonCompiler() {
    return (
        <div className="w-full h-full min-h-[500px] flex flex-col">
            <iframe
                src="https://trinket.io/python3/embed"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Python Compiler"
                className="flex-1 w-full h-full rounded-md border"
            ></iframe>
        </div>
    )
}
