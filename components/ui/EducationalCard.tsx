import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

interface EducationalCardProps {
    title: string
    children: ReactNode
    icon?: ReactNode
    variant?: "default" | "primary" | "success" | "warning"
}

export function EducationalCard({ title, children, icon, variant = "default" }: EducationalCardProps) {
    const variantStyles = {
        default: "border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/20",
        primary: "border-l-4 border-l-blue-600 bg-gradient-to-r from-blue-100/50 to-transparent dark:from-blue-900/30",
        success: "border-l-4 border-l-green-500 bg-gradient-to-r from-green-50/50 to-transparent dark:from-green-950/20",
        warning: "border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50/50 to-transparent dark:from-amber-950/20"
    }

    return (
        <Card className={variantStyles[variant]}>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    {icon || <GraduationCap className="h-6 w-6 text-blue-600" />}
                    <span>{title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}
