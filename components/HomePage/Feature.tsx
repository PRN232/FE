import React from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Activity, Calendar, FileText, Shield, Stethoscope, Users} from "lucide-react";

const Feature = () => {
    const features = [
        {
            icon: Shield,
            title: "Quản lý hồ sơ sức khỏe",
            description: "Lưu trữ hồ sơ sức khỏe kỹ thuật số an toàn cho tất cả học sinh bao gồm dị ứng, tiền sử bệnh và tiêm chủng."
        },
        {
            icon: Users,
            title: "Cổng thông tin phụ huynh",
            description: "Cổng thông tin thân thiện giúp phụ huynh quản lý thông tin sức khỏe và yêu cầu thuốc của con em mình."
        },
        {
            icon: Activity,
            title: "Theo dõi sự cố y tế",
            description: "Theo dõi và quản lý sự cố y tế, khẩn cấp tại trường học theo thời gian thực."
        },
        {
            icon: Calendar,
            title: "Quản lý tiêm chủng",
            description: "Tổ chức chiến dịch tiêm chủng hiệu quả với thu thập sự đồng thuận và giám sát."
        },
        {
            icon: Stethoscope,
            title: "Khám sức khỏe định kỳ",
            description: "Tổ chức khám sức khỏe định kỳ với hệ thống lên lịch và báo cáo tự động."
        },
        {
            icon: FileText,
            title: "Báo cáo & phân tích",
            description: "Cung cấp báo cáo toàn diện và phân tích xu hướng sức khỏe và tuân thủ."
        }
    ]

    return (
        <section className="py-24 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Tính năng quản lý sức khỏe toàn diện
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Mọi thứ bạn cần để quản lý sức khỏe học sinh trong một nền tảng tích hợp
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="relative overflow-hidden border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-xl bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors duration-300">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl text-black group-hover:text-primary transition-colors duration-300">
                                        {feature.title}
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-black">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Feature