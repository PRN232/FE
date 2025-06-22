import Link from "next/link";
import { Button } from "@/components/ui/button";
import TeamMemberGrid from "@/components/AboutUs/TeamMemberCard";
import HealthService from "@/components/AboutUs/HealthService";
import Achievement from "@/components/AboutUs/Achievement";
import Stat from "@/components/AboutUs/Stat";
import MissionAndVision from "@/components/AboutUs/MissionAndVision";
import HeroSection from "@/components/AboutUs/HeroSection";
import Facility from "@/components/AboutUs/Facility";

const AboutUs = () => {
    return (
        <div className="flex flex-col">
            {/* Phần Hero */}
            <HeroSection />

            {/* Phần Sứ mệnh & Tầm nhìn */}
            <MissionAndVision />

            {/* Phần Thống kê */}
            <Stat />

            {/* Phần Dịch vụ */}
            <HealthService />

            {/* Phần Đội ngũ */}
            <TeamMemberGrid />

            {/* Phần Thành tựu */}
            <Achievement />

            {/* Phần Cơ sở vật chất */}
            <Facility />

            {/* Phần Kêu gọi Hành động */}
            {/* Phần Kêu gọi Hành động */}
            <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/cross-pattern.svg')] bg-[length:100px_100px] opacity-[0.03]"></div>

                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl drop-shadow-md">
                            Sẵn sàng Tìm hiểu Thêm?
                        </h2>
                        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                            Khám phá hệ thống quản lý sức khỏe của chúng tôi và xem cách chúng tôi có thể hỗ trợ sức khỏe của con bạn.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="bg-white text-red-600 hover:bg-red-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 shadow-md"
                                asChild
                            >
                                <Link href="/parents">Cổng Phụ huynh</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-white border-white hover:bg-white/10 hover:border-white/80 transition-all duration-300 hover:-translate-y-1 shadow-md"
                                asChild
                            >
                                <Link href="/blog">Tài nguyên Sức khỏe</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;