import React from 'react'
import {mockBlogPosts} from "@/lib/data/mock-data";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight} from "lucide-react";

const Blog = () => {
    return (
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
                                    <Button variant="outline" size="sm" asChild>
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
    )
}
export default Blog
