import { Metadata } from "next"
import DigitalElectronicsContent from "./content"

export const metadata: Metadata = {
    title: "Digital Electronics Interview Questions & Answers | Zest Academy",
    description: "Comprehensive collection of digital electronics interview questions covering logic gates, flip-flops, combinational circuits, sequential circuits, and more — for ECE and EEE students.",
    openGraph: {
        title: "Digital Electronics Interview Questions & Answers",
        description: "Master digital electronics concepts for your placement interviews — logic gates, flip-flops, ADC/DAC, and more.",
        type: "article",
        url: "https://zestacademy.tech/articles/digital-electronics-interview-questions",
    },
    authors: [{ name: "Zest Academy Editorial Team" }],
    keywords: ["digital electronics interview questions", "logic gates", "flip flops", "combinational circuits", "sequential circuits", "ECE interview", "VLSI", "microprocessor"],
}

export default function DigitalElectronicsInterviewQuestionsPage() {
    return <DigitalElectronicsContent />
}
