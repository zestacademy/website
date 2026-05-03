import { Metadata } from "next"
import WhatIsQuantumComputingContent from "./content"

export const metadata: Metadata = {
    title: "What Is Quantum Computing? A Complete Guide | Zest Academy",
    description: "Explore quantum computing from the ground up — qubits, superposition, entanglement, quantum gates, real hardware, and industry applications in cryptography, drug discovery, and finance.",
    openGraph: {
        title: "What Is Quantum Computing? A Complete Guide",
        description: "From qubits to quantum advantage — a comprehensive deep-dive into quantum computing for engineers and students.",
        type: "article",
        url: "https://zestacademy.tech/articles/what-is-quantum-computing",
    },
    authors: [{ name: "Zest Academy Editorial Team" }],
    keywords: ["quantum computing", "qubits", "superposition", "entanglement", "quantum gates", "Shor's algorithm", "quantum cryptography", "IBM quantum", "Google Sycamore"],
}

export default function WhatIsQuantumComputingPage() {
    return <WhatIsQuantumComputingContent />
}
