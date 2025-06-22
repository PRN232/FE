import React from 'react'
import { CheckCircle } from "lucide-react"
import Image from "next/image"
import { Card } from "@/components/ui/card"

const Facility = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-background to-red-50/20 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-[url('/images/cross-pattern.svg')] bg-[length:100px_100px] opacity-[0.03]" />
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-red-100/30 blur-3xl" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                Cơ sở vật chất Hiện đại
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                                Trung tâm y tế hiện đại của chúng tôi được trang bị công nghệ y tế tiên tiến và được thiết kế để cung cấp môi trường thoải mái, an toàn cho tất cả học sinh.
                            </p>
                        </div>

                        <Card className="border-0 shadow-sm bg-gradient-to-br from-background to-red-50/30">
                            <div className="p-6 space-y-4">
                                {[
                                    "Phòng khám đầy đủ trang thiết bị",
                                    "Khu vực điều trị khẩn cấp",
                                    "Lưu trữ thuốc an toàn",
                                    "Phòng tư vấn riêng tư",
                                    "Hệ thống hồ sơ sức khỏe số"
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-4 p-3 rounded-lg hover:bg-red-50/50 transition-all duration-200 group"
                                    >
                                        <div className="rounded-full bg-red-100/80 p-2 flex-shrink-0 group-hover:bg-red-100 transition-colors">
                                            <CheckCircle className="h-5 w-5 text-red-600 group-hover:scale-110 transition-transform" />
                                        </div>
                                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Image */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative overflow-hidden rounded-xl shadow-2xl border border-muted-foreground/10">
                            <Image
                                src="/images/medical-facility.jpg"
                                alt="Cơ sở vật chất Trung tâm Y tế"
                                width={600}
                                height={400}
                                className="rounded-xl w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-red-600 rounded-full">
                                        Cơ sở đạt chuẩn Bộ Y tế
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Facility