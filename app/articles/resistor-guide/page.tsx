import { Metadata } from "next"
import ResistorGuideContent from "./content"

export const metadata: Metadata = {
    title: "The Complete Resistor Guide: Types, Colour Codes & Applications | Zest Academy",
    description: "Everything you need to know about resistors — how they work, resistor colour codes, types (fixed, variable, thermistor, LDR), power ratings, and practical circuit applications.",
    openGraph: {
        title: "The Complete Resistor Guide: Types, Colour Codes & Applications",
        description: "A comprehensive guide to resistors for electronics students and hobbyists — colour codes, types, and real-world circuit applications.",
        type: "article",
        url: "https://zestacademy.tech/articles/resistor-guide",
    },
    authors: [{ name: "Zest Academy Editorial Team" }],
    keywords: ["resistor guide", "resistor colour code", "types of resistors", "fixed resistor", "variable resistor", "thermistor", "LDR", "ohm's law", "electronics basics"],
}

export default function ResistorGuidePage() {
    return <ResistorGuideContent />
}
