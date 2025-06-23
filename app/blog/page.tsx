import { Button } from "@/components/ui/button"
import FilterAndSearch from "@/components/Blog/MainBlog/FilterAndSearch";
import FeaturedArticles from "@/components/Blog/MainBlog/FeaturedArticles";
import BlogGrid from "@/components/Blog/MainBlog/BlogGrid";

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
            <FilterAndSearch />

            {/* Bài viết nổi bật */}
            <FeaturedArticles />

            {/* Lưới bài viết */}
            <BlogGrid />

            {/* Nút tải thêm */}
            <div className="text-center">
                <Button variant="outline" size="lg" className="transition-all duration-300 hover:scale-105 hover:shadow-md">
                    Tải thêm bài viết
                </Button>
            </div>
        </div>
    )
}
