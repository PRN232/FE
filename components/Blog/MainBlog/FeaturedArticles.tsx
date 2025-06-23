import React from 'react'
import Image from "next/image";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {ArrowRight, Calendar, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";

const FeaturedArticles = () => {
    return (
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
                            <Link href={`/blog/${1}`}>
                                Đọc bài
                            </Link>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}
export default FeaturedArticles
