import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Information = () => {
    return (
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
                            <Button variant="outline" asChild>
                                <Link href="/about">
                                    Tìm hiểu thêm về chương trình
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="relative">
                        <Image
                            src="/images/placeholder.jpg"
                            alt="School Health Facility"
                            width={600}
                            height={600}
                            className="rounded-lg shadow-lg"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Information
