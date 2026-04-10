"use client"

// Force dynamic rendering to avoid SSR Firebase initialization issues
export const dynamic = 'force-dynamic'

import AdminDashboard from "@/components/admin/AdminDashboard"

export default function AdminPage() {
    return <AdminDashboard />
}
