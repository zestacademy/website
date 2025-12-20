import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function ExploreSection() {
    return (
        <section className="container mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Explore Courses</h2>
                <div className="flex w-full md:w-auto items-center gap-2">
                    <div className="relative flex-1 md:w-[300px]">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search for courses..." className="pl-8" />
                    </div>
                    <Button variant="outline" size="icon">
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                    <Select>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popular">Most Popular</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Filters (Visual representation of active filters) */}
            <div className="flex gap-2 overflow-x-auto pb-4">
                <Button variant="secondary" className="rounded-full text-sm font-normal">All</Button>
                <Button variant="ghost" className="rounded-full text-sm font-normal">Development</Button>
                <Button variant="ghost" className="rounded-full text-sm font-normal">Design</Button>
                <Button variant="ghost" className="rounded-full text-sm font-normal">Marketing</Button>
                <Button variant="ghost" className="rounded-full text-sm font-normal">Business</Button>
                <Button variant="ghost" className="rounded-full text-sm font-normal">Health</Button>
            </div>
        </section>
    )
}
