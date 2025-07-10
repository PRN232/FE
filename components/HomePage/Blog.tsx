import React from 'react'
import {mockBlogPosts} from "@/lib/data/mock-data";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight} from "lucide-react";

const Blog = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-background to-muted/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-foreground to-primary bg-clip-text">
                        Giáo dục & Tài liệu sức khỏe
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground">
                        Cập nhật các mẹo sức khỏe và nội dung giáo dục mới nhất
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {mockBlogPosts.map((post) => (
                        <Card
                            key={post.id}
                            className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <CardHeader className="relative">
                                <div className="flex items-center justify-between">
                                    <Badge variant="secondary" className="px-3 py-1">
                                        {post.category}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                        {post.publishedAt.toLocaleDateString()}
                                    </span>
                                </div>
                                <CardTitle className="mt-4 text-xl line-clamp-2 group-hover:text-primary transition-colors duration-300">
                                    {post.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base line-clamp-3">
                                    {post.excerpt}
                                </CardDescription>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">Bởi {post.author}</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                                        asChild
                                    >
                                        <Link href={`/blog/${post.id}`} className="flex items-center">
                                            Đọc thêm
                                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="px-8 py-6 text-lg rounded-xl border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-md"
                    >
                        <Link href="/blog" className="flex items-center">
                            Xem tất cả bài viết
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
export default Blog