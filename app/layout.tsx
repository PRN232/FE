import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Layout/Navbar/Navbar";
import Footer from "@/components/Layout/Footer/Footer";

import {AuthProvider} from "@/lib/auth/auth-context";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "HealthCare School - Hệ Thống Y Tế Học Đường",
    description:
        "Comprehensive health management system for schools, managing student health records, medical incidents, vaccinations, and health examinations.",
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AuthProvider>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </AuthProvider>
        </body>
        </html>
    )
}
