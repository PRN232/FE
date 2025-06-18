import Link from "next/link"
import { ArrowRight, Shield, Users, Activity, FileText, Calendar, Stethoscope } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockBlogPosts } from "@/lib/data/mock-data"
import Image from "next/image";

const HomePage = () => {
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
        <div className="flex flex-col">
            {/* Hero Section */}
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
                            <Button size="lg" variant="secondary">
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

            {/* Features Section */}
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
                            <Card key={index} className="relative overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <feature.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* School Information Section */}
            <section className="py-24 bg-muted/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Giới thiệu Chương trình Sức khỏe Học đường
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Nhà trường cam kết cung cấp tiêu chuẩn chăm sóc sức khỏe cao nhất cho tất cả học sinh.
                                Với cơ sở vật chất hiện đại và đội ngũ y tế chuyên nghiệp, chúng tôi đảm bảo mỗi em đều được chăm sóc tận tình.
                            </p>
                            <div className="mt-8 space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Badge variant="secondary">Nhân viên y tế chứng nhận</Badge>
                                    <span className="text-sm text-muted-foreground">Chuyên gia y tế có giấy phép hành nghề</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Badge variant="secondary">Ứng phó khẩn cấp 24/7</Badge>
                                    <span className="text-sm text-muted-foreground">Sẵn sàng xử lý mọi tình huống y tế</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Badge variant="secondary">Hồ sơ sức khỏe điện tử</Badge>
                                    <span className="text-sm text-muted-foreground">Thông tin sức khỏe an toàn và dễ truy cập</span>
                                </div>
                            </div>
                            <div className="mt-8">
                                <Button asChild>
                                    <Link href="/about">
                                        Tìm hiểu thêm về chương trình
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <Image
                                src="/images/placeholder.svg"
                                alt="School Health Facility"
                                width={600}
                                height={500}
                                className="rounded-lg shadow-lg"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="py-24 bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Giáo dục & Tài liệu sức khỏe
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Cập nhật các mẹo sức khỏe và nội dung giáo dục mới nhất
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {mockBlogPosts.map((post) => (
                            <Card key={post.id} className="overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline">{post.category}</Badge>
                                        <span className="text-sm text-muted-foreground">
                                            {post.publishedAt.toLocaleDateString()}
                                        </span>
                                    </div>
                                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="line-clamp-3">
                                        {post.excerpt}
                                    </CardDescription>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Bởi {post.author}</span>
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/blog/${post.id}`}>
                                                Đọc thêm
                                                <ArrowRight className="ml-1 h-3 w-3" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Button asChild variant="outline" size="lg">
                            <Link href="/blog">
                                Xem tất cả bài viết
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary text-primary-foreground">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Sẵn sàng bắt đầu?
                        </h2>
                        <p className="mt-4 text-lg text-primary-foreground/80">
                            Tham gia hệ thống quản lý sức khỏe học đường của chúng tôi để đảm bảo sự chăm sóc tốt nhất cho học sinh.
                        </p>
                        <div className="mt-8 flex items-center justify-center gap-x-6">
                            <Button size="lg" variant="secondary">
                                Cổng phụ huynh
                            </Button>
                            <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                                Đăng nhập Nhân viên Y tế
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage
