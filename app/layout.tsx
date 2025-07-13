import { ReactNode } from "react";
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { PublicEnvScript } from "next-runtime-env";
import { AuthProvider } from "@/lib/auth/auth-context";
import Navbar from "@/components/Layout/Navbar/Navbar";
import Footer from "@/components/Layout/Footer/Footer";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: 'HealthCare School - Hệ Thống Y Tế Học Đường',
    template: '%s | HealthCare School'
  },
  description: "Comprehensive health management system for schools, managing student health records, medical incidents, vaccinations, and health examinations.",
}

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <head>
            <PublicEnvScript />
        </head>
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
