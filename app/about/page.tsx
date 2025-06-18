import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Heart, Shield, Users, Award, Clock, Phone, Mail, MapPin, CheckCircle, Star, Calendar, Activity } from 'lucide-react';

const AboutUs = () => {
    const teamMembers = [
        {
            id: "1",
            name: "Bác sĩ Sarah Johnson",
            role: "Giám đốc Y tế",
            specialization: "Y học Nhi khoa",
            experience: "15+ năm",
            image: "/images/placeholder.svg",
            description: "Dẫn dắt đội ngũ y tế của chúng tôi với nhiều kinh nghiệm trong các chương trình sức khỏe trường học.",
        },
        {
            id: "2",
            name: "Y tá Mary Wilson",
            role: "Trưởng Y tá",
            specialization: "Dịch vụ Sức khỏe Trường học",
            experience: "12+ năm",
            image: "/images/placeholder.svg",
            description: "Phối hợp các dịch vụ sức khỏe hàng ngày và giao thức ứng phó khẩn cấp.",
        },
        {
            id: "3",
            name: "Bác sĩ Michael Chen",
            role: "Bác sĩ Trường học",
            specialization: "Y học Gia đình",
            experience: "10+ năm",
            image: "/images/placeholder.svg",
            description: "Cung cấp dịch vụ chăm sóc y tế toàn diện và các chương trình giáo dục sức khỏe.",
        },
        {
            id: "4",
            name: "Lisa Rodriguez",
            role: "Điều phối viên Sức khỏe",
            specialization: "Y tế Công cộng",
            experience: "8+ năm",
            image: "/images/placeholder.svg",
            description: "Quản lý các chương trình tiêm chủng và sáng kiến kiểm tra sức khỏe.",
        },
    ];

    const services = [
        {
            icon: Stethoscope,
            title: "Khám sức khỏe",
            description: "Kiểm tra sức khỏe toàn diện hàng năm và kiểm tra định kỳ cho tất cả học sinh.",
        },
        {
            icon: Shield,
            title: "Chương trình Tiêm chủng",
            description: "Dịch vụ tiêm chủng đầy đủ theo lịch tiêm chủng quốc gia.",
        },
        {
            icon: Heart,
            title: "Chăm sóc Khẩn cấp",
            description: "Phản hồi khẩn cấp 24/7 và dịch vụ sơ cứu trong giờ học.",
        },
        {
            icon: Activity,
            title: "Theo dõi Sức khỏe",
            description: "Theo dõi liên tục tình trạng sức khỏe và bệnh mãn tính của học sinh.",
        },
        {
            icon: Users,
            title: "Giáo dục Sức khỏe",
            description: "Các chương trình giáo dục thúc đẩy lối sống lành mạnh và phòng ngừa bệnh tật.",
        },
        {
            icon: Calendar,
            title: "Lịch hẹn",
            description: "Lịch hẹn trực tuyến dễ dàng cho tư vấn và các cuộc hẹn theo dõi.",
        },
    ];

    const achievements = [
        {
            icon: Award,
            title: "Giải thưởng Xuất sắc Quốc gia về Sức khỏe",
            year: "2023",
            description: "Được công nhận vì thực hiện xuất sắc chương trình sức khỏe trường học.",
        },
        {
            icon: Star,
            title: "100% Phủ sóng Tiêm chủng",
            year: "2022-2023",
            description: "Đạt được 100% phủ sóng tiêm chủng cho tất cả học sinh đăng ký.",
        },
        {
            icon: CheckCircle,
            title: "Cơ sở Y tế Được Công nhận",
            year: "2021",
            description: "Được Hiệp hội Sức khỏe Trường học Quốc gia chứng nhận.",
        },
    ];

    const stats = [
        { number: "2,500+", label: "Học sinh Được Phục vụ" },
        { number: "15+", label: "Năm Hoạt động" },
        { number: "24/7", label: "Phản hồi Khẩn cấp" },
        { number: "100%", label: "Sự Hài lòng của Phụ huynh" },
    ];

    return (
        <div className="flex flex-col">
            {/* Phần Hero */}
            <section className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white">
                <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Về Chương trình Sức khỏe của Chúng tôi</h1>
                        <p className="mt-6 text-lg leading-8 text-blue-100">
                            Cam kết cung cấp các dịch vụ chăm sóc sức khỏe xuất sắc và thúc đẩy sức khỏe cho mọi học sinh trong cộng đồng trường học của chúng tôi.
                        </p>
                    </div>
                </div>
            </section>

            {/* Phần Sứ mệnh & Tầm nhìn */}
            <section className="py-24 bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-6">Sứ mệnh của Chúng tôi</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Cung cấp các dịch vụ chăm sóc sức khỏe toàn diện, dễ tiếp cận và chất lượng cao, hỗ trợ sức khỏe thể chất, tinh thần và cảm xúc của tất cả học sinh, giúp họ đạt được tiềm năng học tập đầy đủ.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>Thúc đẩy chăm sóc sức khỏe phòng ngừa và giáo dục sức khỏe</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>Đảm bảo phản hồi nhanh với các tình huống khẩn cấp y tế</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>Duy trì hồ sơ và theo dõi sức khỏe toàn diện</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>Thúc đẩy sự hợp tác giữa gia đình và nhà cung cấp dịch vụ y tế</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-6">Tầm nhìn của Chúng tôi</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Trở thành mô hình hàng đầu về chăm sóc sức khỏe dựa trên trường học, tạo ra một môi trường học tập lành mạnh nơi mỗi học sinh phát triển về thể chất, tinh thần và học thuật.
                            </p>
                            <div className="relative">
                                <Image
                                    src="/images/placeholder.svg"
                                    alt="Tầm nhìn Sức khỏe Trường học"
                                    width={500}
                                    height={300}
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Phần Thống kê */}
            <section className="py-16 bg-muted/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold text-primary">{stat.number}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
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

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <Card key={index} className="text-center">
                                <CardHeader>
                                    <div className="mx-auto rounded-lg bg-primary/10 p-3 w-fit">
                                        <service.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">{service.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
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

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member) => (
                            <Card key={member.id} className="text-center">
                                <CardHeader>
                                    <div className="mx-auto">
                                        <Image
                                            src={member.image || "/placeholder.svg"}
                                            alt={member.name}
                                            width={120}
                                            height={120}
                                            className="rounded-full mx-auto"
                                        />
                                    </div>
                                    <CardTitle className="text-lg">{member.name}</CardTitle>
                                    <Badge variant="secondary" className="mx-auto w-fit">
                                        {member.role}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <p className="text-sm font-medium text-primary">{member.specialization}</p>
                                    <p className="text-sm text-muted-foreground">{member.experience}</p>
                                    <p className="text-sm">{member.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
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

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {achievements.map((achievement, index) => (
                            <Card key={index} className="text-center">
                                <CardHeader>
                                    <div className="mx-auto rounded-lg bg-yellow-100 p-3 w-fit">
                                        <achievement.icon className="h-8 w-8 text-yellow-600" />
                                    </div>
                                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                                    <Badge variant="outline">{achievement.year}</Badge>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">{achievement.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Phần Cơ sở vật chất */}
            <section className="py-24 bg-muted/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Cơ sở vật chất Hiện đại</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Trung tâm y tế hiện đại của chúng tôi được trang bị công nghệ y tế tiên tiến và được thiết kế để cung cấp môi trường thoải mái, an toàn cho tất cả học sinh.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-full bg-primary/10 p-1">
                                        <CheckCircle className="h-4 w-4 text-primary" />
                                    </div>
                                    <span>Phòng khám đầy đủ trang thiết bị</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-full bg-primary/10 p-1">
                                        <CheckCircle className="h-4 w-4 text-primary" />
                                    </div>
                                    <span>Khu vực điều trị khẩn cấp</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-full bg-primary/10 p-1">
                                        <CheckCircle className="h-4 w-4 text-primary" />
                                    </div>
                                    <span>Lưu trữ thuốc an toàn</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-full bg-primary/10 p-1">
                                        <CheckCircle className="h-4 w-4 text-primary" />
                                    </div>
                                    <span>Phòng tư vấn riêng tư</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-full bg-primary/10 p-1">
                                        <CheckCircle className="h-4 w-4 text-primary" />
                                    </div>
                                    <span>Hệ thống hồ sơ sức khỏe số</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <Image
                                src="/images/placeholder.svg"
                                alt="Cơ sở vật chất Trung tâm Y tế"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
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

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <Card className="text-center">
                            <CardHeader>
                                <div className="mx-auto rounded-lg bg-blue-100 p-3 w-fit">
                                    <Phone className="h-6 w-6 text-blue-600" />
                                </div>
                                <CardTitle>Điện thoại</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-semibold">(555) 123-4567</p>
                                <p className="text-sm text-muted-foreground">Khẩn cấp: (555) 911-HELP</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <div className="mx-auto rounded-lg bg-green-100 p-3 w-fit">
                                    <Mail className="h-6 w-6 text-green-600" />
                                </div>
                                <CardTitle>Email</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-semibold">health@school.edu</p>
                                <p className="text-sm text-muted-foreground">Phản hồi trong vòng 24 giờ</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardHeader>
                                <div className="mx-auto rounded-lg bg-purple-100 p-3 w-fit">
                                    <MapPin className="h-6 w-6 text-purple-600" />
                                </div>
                                <CardTitle>Vị trí</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-semibold">Trung tâm Y tế</p>
                                <p className="text-sm text-muted-foreground">Tòa nhà chính, Tầng 1</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-12 text-center">
                        <Card className="inline-block p-6">
                            <div className="flex items-center space-x-4">
                                <Clock className="h-6 w-6 text-primary" />
                                <div>
                                    <h3 className="font-semibold">Giờ Hoạt động</h3>
                                    <p className="text-sm text-muted-foreground">Thứ Hai - Thứ Sáu: 7:00 - 18:00</p>
                                    <p className="text-sm text-muted-foreground">Dịch vụ khẩn cấp 24/7</p>
                                </div>
                            </div>
                        </Card>
                    </div>
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