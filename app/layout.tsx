import { ReactNode } from "react";
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { PublicEnvScript } from "next-runtime-env";
import { AuthProvider } from "@/lib/auth/auth-context";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://schoolmedical.hyudequeue.xyz'),

  title: {
    default: 'HealthCare School - Hệ Thống Y Tế Học Đường',
    template: '%s | HealthCare School',
  },
  description: "Nền tảng quản lý y tế học đường toàn diện, hỗ trợ theo dõi hồ sơ sức khỏe học sinh, xử lý sự cố y tế, quản lý tiêm chủng và khám sức khỏe định kỳ.",

  openGraph: {
    title: 'HealthCare School - Hệ Thống Y Tế Học Đường',
    description: 'Nền tảng quản lý y tế học đường toàn diện, hỗ trợ theo dõi hồ sơ sức khỏe học sinh, xử lý sự cố y tế, quản lý tiêm chủng và khám sức khỏe định kỳ.',
    url: 'https://schoolmedical.hyudequeue.xyz/',
    siteName: 'HealthCare School',
    images: [
      {
        url: '/images/previewcard.jpg',
        width: 1200,
        height: 630,
        alt: 'HealthCare School Preview',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'HealthCare School - Hệ Thống Y Tế Học Đường',
    description: 'Giải pháp số hóa và quản lý toàn diện y tế học đường cho các trường học tại Việt Nam.',
    images: ['/images/previewcard.jpg'],
  },
};

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
