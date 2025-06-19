import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, ArrowRight } from "lucide-react"
import { mockBlogPosts } from "@/lib/data/mock-data"
import Image from "next/image"
import BlogCard from "@/components/Blog/BlogCard"

const categories = [
    "Tất cả",
    "Khám sức khỏe",
    "Dị ứng",
    "Tiêm chủng",
    "Dinh dưỡng",
    "Sức khỏe tinh thần",
    "Sơ cứu khẩn cấp",
]

export default function BlogPage() {
    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Blog Giáo Dục Sức Khỏe</h2>
                    <p className="text-muted-foreground">Lời khuyên từ chuyên gia và tài nguyên về quản lý sức khỏe học đường</p>
                </div>
            </div>

            {/* Tìm kiếm và Bộ lọc */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Tìm bài viết..." className="pl-10" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={category === "Tất cả" ? "default" : "outline"}
                            size="sm"
                            className="whitespace-nowrap transition-all duration-200 hover:scale-105"
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Bài viết nổi bật */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="md:flex">
                    <div className="md:w-1/3 overflow-hidden">
                        <Image
                            src="/images/picture.jpg"
                            alt="Bài viết nổi bật"
                            className="h-48 w-full object-cover md:h-full transition-transform duration-300 hover:scale-105"
                            width={400}
                            height={300}
                            priority
                        />
                    </div>
                    <div className="p-6 md:w-2/3">
                        <div className="flex items-center space-x-2 mb-2">
                            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">Nổi bật</Badge>
                            <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                                Khám sức khỏe
                            </Badge>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 hover:text-primary transition-colors duration-200">
                            Hướng dẫn toàn diện về Khám sức khỏe học đường
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            Mọi điều phụ huynh và giáo viên cần biết về khám sức khỏe định kỳ: cách chuẩn bị, quy trình và cách hiểu
                            kết quả.
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                    <User className="h-4 w-4" />
                                    <span>TS. Sarah Johnson</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>20 Tháng 9, 2023</span>
                                </div>
                            </div>
                            <Button
                                className="group transition-all duration-300 hover:scale-105"
                                variant="outline"
                            >
                                Đọc bài
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Lưới bài viết */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockBlogPosts.map((post) => (
                    <BlogCard {...post} key={post.id} />
                ))}
            </div>

            {/* Nút tải thêm */}
            <div className="text-center">
                <Button variant="outline" size="lg" className="transition-all duration-300 hover:scale-105 hover:shadow-md">
                    Tải thêm bài viết
                </Button>
            </div>
        </div>
    )
}
