"use client"

import { CheckCircle } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const MissionAndVision = () => {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Mission Card */}
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-bold tracking-tight mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                Sứ mệnh của Chúng tôi
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Cung cấp các dịch vụ chăm sóc sức khỏe toàn diện, dễ tiếp cận và chất lượng cao, hỗ trợ sức khỏe thể chất, tinh thần và cảm xúc của tất cả học sinh, giúp họ đạt được tiềm năng học tập đầy đủ.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Thúc đẩy chăm sóc sức khỏe phòng ngừa và giáo dục sức khỏe",
                                    "Đảm bảo phản hồi nhanh với các tình huống khẩn cấp y tế",
                                    "Duy trì hồ sơ và theo dõi sức khỏe toàn diện",
                                    "Thúc đẩy sự hợp tác giữa gia đình và nhà cung cấp dịch vụ y tế"
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 group-hover:translate-x-1"
                                    >
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vision Card */}
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-bold tracking-tight mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                Tầm nhìn của Chúng tôi
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Trở thành mô hình hàng đầu về chăm sóc sức khỏe dựa trên trường học, tạo ra một môi trường học tập lành mạnh nơi mỗi học sinh phát triển về thể chất, tinh thần và học thuật.
                            </p>
                            <div className="relative overflow-hidden rounded-lg">
                                <Image
                                    src="/images/placeholder.jpg"
                                    alt="Tầm nhìn Sức khỏe Trường học"
                                    width={500}
                                    height={300}
                                    className="rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Add this to your globals.css */}
            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </section>
    )
}

export default MissionAndVision