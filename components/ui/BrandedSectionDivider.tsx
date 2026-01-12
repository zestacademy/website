import Image from "next/image"

interface BrandedSectionDividerProps {
    className?: string
}

export function BrandedSectionDivider({ className = "" }: BrandedSectionDividerProps) {
    return (
        <div className={`flex items-center justify-center gap-3 py-8 ${className}`}>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="flex items-center gap-2">
                <div className="relative h-6 w-6">
                    <Image
                        src="/logo.png"
                        alt="Zest Academy"
                        fill
                        className="object-contain"
                    />
                </div>
                <span className="text-sm font-semibold text-muted-foreground">Zest Academy</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>
    )
}
