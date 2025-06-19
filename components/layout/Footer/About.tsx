import React from 'react'
import Link from "next/link";
import {Facebook, Instagram, Twitter} from "lucide-react";

const About = () => {
    return (
        <div className="col-span-1 md:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hệ Thống Y Tế Học Đường
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
                Chuyên cung cấp dịch vụ quản lý sức khỏe toàn diện cho cộng đồng nhà trường.
                Đảm bảo sự phát triển lành mạnh của mọi học sinh thông qua chăm sóc y tế chuyên nghiệp và giáo dục sức khỏe.
            </p>
            <div className="flex items-center space-x-5 pt-2">
                <Link
                    href="#"
                    className="text-muted-foreground hover:text-blue-600 transition-colors duration-300"
                    aria-label="Facebook"
                >
                    <Facebook className="h-6 w-6" />
                </Link>
                <Link
                    href="#"
                    className="text-muted-foreground hover:text-sky-500 transition-colors duration-300"
                    aria-label="Twitter"
                >
                    <Twitter className="h-6 w-6" />
                </Link>
                <Link
                    href="#"
                    className="text-muted-foreground hover:text-pink-600 transition-colors duration-300"
                    aria-label="Instagram"
                >
                    <Instagram className="h-6 w-6" />
                </Link>
            </div>
        </div>
    )
}
export default About
