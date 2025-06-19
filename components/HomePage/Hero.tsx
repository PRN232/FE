import React from 'react'
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        Hệ thống Quản lý Sức khỏe Trường học
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-blue-100">
                        Giải pháp số toàn diện để quản lý hồ sơ sức khỏe học sinh, sự cố y tế, tiêm chủng và khám sức khỏe trong các cơ sở giáo dục.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-white border-white hover:bg-white hover:text-blue-600">
                            Bắt đầu ngay
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                            Tìm hiểu thêm
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Hero
