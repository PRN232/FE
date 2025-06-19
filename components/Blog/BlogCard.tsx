import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BlogCardProps {
    id: string
    title: string
    excerpt: string
    content: string
    author: string
    publishedAt: Date
    category: string
}

const BlogCard = ({ id, title, excerpt, author, publishedAt, category }: BlogCardProps) => {
    return (
        <Card key={id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="aspect-video bg-muted overflow-hidden">
                <Image
                    src={`/images/picture${id}.jpg`}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    width={400}
                    height={225}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <CardHeader>
                <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="transition-colors hover:bg-primary hover:text-primary-foreground">
                        {category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
            {publishedAt ? new Date(publishedAt).toLocaleDateString("vi-VN") : "N/A"}
          </span>
                </div>
                <CardTitle className="line-clamp-2 hover:text-primary transition-colors duration-200">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="line-clamp-3 mb-4">{excerpt}</CardDescription>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{author}</span>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="group flex items-center space-x-1 transition-all duration-300 hover:scale-105 hover:text-primary hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    >
                        <Link href={`/blog/${id}`}>
                            <span>Đọc tiếp</span>
                            <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default BlogCard
