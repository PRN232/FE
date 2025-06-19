import { Button } from "@/components/ui/button";
import { ArrowRight, HeartPulse, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Information = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-muted/50 to-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12"> {/* Added wrapper div for centering */}
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-foreground to-primary bg-clip-text">
                        Giới thiệu chương trình sức khỏe học đường
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Nhà trường cam kết cung cấp tiêu chuẩn chăm sóc sức khỏe cao nhất cho tất cả học sinh.
                            Với cơ sở vật chất hiện đại và đội ngũ y tế chuyên nghiệp, chúng tôi đảm bảo mỗi em đều được chăm sóc tận tình.
                        </p>

                        <div className="mt-8 space-y-6">
                            <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-300">
                                <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Nhân viên y tế chứng nhận</h3>
                                    <p className="text-muted-foreground">Chuyên gia y tế có giấy phép hành nghề với kinh nghiệm giáo dục</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-300">
                                <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                                    <HeartPulse className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Ứng phó khẩn cấp 24/7</h3>
                                    <p className="text-muted-foreground">Hệ thống cảnh báo và xử lý tình huống y tế khẩn cấp</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-300">
                                <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Hồ sơ sức khỏe điện tử</h3>
                                    <p className="text-muted-foreground">Lưu trữ đám mây an toàn với truy cập nhanh chóng mọi lúc</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Button asChild variant="outline" className="group px-6 py-6 text-lg font-medium rounded-xl bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-lg">
                                <Link href="/about" className="flex items-center">
                                    Tìm hiểu thêm về chương trình
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 -z-10"></div>
                        <div className="relative overflow-hidden rounded-xl shadow-2xl">
                            <Image
                                src="/images/placeholder.jpg"
                                alt="School Health Facility"
                                width={600}
                                height={600}
                                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                                    <h3 className="font-bold text-lg">Phòng y tế tiêu chuẩn quốc tế</h3>
                                    <p className="text-sm text-muted-foreground">Đạt chứng nhận JCI về chất lượng chăm sóc sức khỏe</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Information