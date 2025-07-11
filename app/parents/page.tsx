"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import {
    features,
    steps,
    benefits
} from "@/lib/data/mock-data";

const ParentPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center">
                        <div
                            className="inline-flex items-center justify-center
                            w-20 h-20 bg-white/10 rounded-full mb-6">
                            <Heart className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Hệ thống Quản lý
                            <br />
                            <span className="text-red-200">
                                Sức khỏe Học sinh
                            </span>
                        </h1>
                        <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
                            Giải pháp toàn diện giúp phụ huynh và nhà trường quản lý, theo dõi sức khỏe học sinh một cách hiệu quả và
                            an toàn nhất
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <Badge className="bg-red-100 text-red-800 border-red-200 mb-4">
                        Tính năng nổi bật
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Tại sao chọn hệ thống của chúng tôi?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Chúng tôi cung cấp giải pháp toàn diện để đảm bảo sức khỏe và an toàn cho con em bạn tại trường học
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="shadow-lg border-0 bg-white/80
                            backdrop-blur hover:shadow-xl transition-all duration-300 group"
                        >
                            <CardHeader>
                                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-gray-900 group-hover:text-red-600 transition-colors">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-gradient-to-r from-red-50 to-red-100/50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Lợi ích vượt trội
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Hệ thống được thiết kế với tiêu chuẩn cao nhất về bảo mật và tiện ích
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center">
                                <div
                                    className="w-16 h-16 bg-gradient-to-r
                                    from-red-500 to-red-600 rounded-full
                                    flex items-center justify-center mx-auto mb-6">
                                    <benefit.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How it Works Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <Badge className="bg-red-100 text-red-800 border-red-200 mb-4">
                        Cách thức hoạt động
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Bắt đầu chỉ với 3 bước đơn giản
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Quy trình đăng ký và sử dụng được thiết kế đơn giản, dễ hiểu cho mọi phụ huynh
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="text-center">
                                <div
                                    className="w-16 h-16 bg-gradient-to-r
                                    from-red-500 to-red-600 rounded-full
                                    flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-white">
                                        {step.step}
                                    </span>
                                </div>
                                <h3
                                    className="text-xl font-semibold
                                    text-gray-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">1,000+</div>
                            <div className="text-red-200">
                                Học sinh được bảo vệ
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">50+</div>
                            <div className="text-red-200">
                                Trường học tin dùng
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">99.9%</div>
                            <div className="text-red-200">
                                Thời gian hoạt động
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">24/7</div>
                            <div className="text-red-200">
                                Hỗ trợ khẩn cấp
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-red-50 to-red-100/50 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Sẵn sàng bảo vệ sức khỏe con em bạn?
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Tham gia cùng hàng nghìn phụ huynh đã tin tưởng sử dụng hệ thống của chúng tôi
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ParentPage
