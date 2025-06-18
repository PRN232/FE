import Link from "next/link";
import { Button } from "@/components/ui/button";
import TeamMemberGrid from "@/components/AboutUs/TeamMemberCard";
import HealthService from "@/components/AboutUs/HealthService";
import Achievement from "@/components/AboutUs/Achievement";
import Stat from "@/components/AboutUs/Stat";
import MissionAndVision from "@/components/AboutUs/MissionAndVision";
import HeroSection from "@/components/AboutUs/HeroSection";
import Facility from "@/components/AboutUs/Facility";
import Contact from "@/components/AboutUs/Contact";

const AboutUs = () => {
    return (
        <div className="flex flex-col">
            {/* Phần Hero */}
            <HeroSection />

            {/* Phần Sứ mệnh & Tầm nhìn */}
            <section className="py-24 bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <MissionAndVision />
                    </div>
                </div>
            </section>

            {/* Phần Thống kê */}
            <section className="py-16 bg-muted/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Stat />
                </div>
            </section>

            {/* Phần Dịch vụ */}
            <section className="py-24 bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Dịch vụ Sức khỏe của Chúng tôi</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Các dịch vụ chăm sóc sức khỏe toàn diện được thiết kế đặc biệt cho môi trường trường học.
                        </p>
                    </div>
                    <HealthService />
                </div>
            </section>

            {/* Phần Đội ngũ */}
            <section className="py-24 bg-muted/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Gặp gỡ Đội ngũ Y tế của Chúng tôi</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Các chuyên gia chăm sóc sức khỏe giàu kinh nghiệm dành cho sức khỏe học sinh.
                        </p>
                    </div>
                    <TeamMemberGrid />
                </div>
            </section>

            {/* Phần Thành tựu */}
            <section className="py-24 bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Thành tựu của Chúng tôi</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Công nhận vì cam kết xuất sắc trong chăm sóc sức khỏe trường học.
                        </p>
                    </div>
                    <Achievement />
                </div>
            </section>

            {/* Phần Cơ sở vật chất */}
            <section className="py-24 bg-muted/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Facility />
                </div>
            </section>

            {/* Phần Liên hệ */}
            <section className="py-24 bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Liên hệ Trung tâm Y tế của Chúng tôi</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Liên hệ với đội ngũ y tế của chúng tôi cho bất kỳ thắc mắc nào liên quan đến sức khỏe.
                        </p>
                    </div>
                    <Contact />
                </div>
            </section>

            {/* Phần Kêu gọi Hành động */}
            <section className="bg-primary text-primary-foreground">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Sẵn sàng Tìm hiểu Thêm?</h2>
                        <p className="mt-4 text-lg text-primary-foreground/80">
                            Khám phá hệ thống quản lý sức khỏe của chúng tôi và xem cách chúng tôi có thể hỗ trợ sức khỏe của con bạn.
                        </p>
                        <div className="mt-8 flex items-center justify-center gap-x-6">
                            <Button size="lg" variant="secondary" asChild>
                                <Link href="/parents">Cổng Phụ huynh</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
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