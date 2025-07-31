import React from 'react'
import { ShieldCheck, HeartPulse, Stethoscope, BellRing } from 'lucide-react'

const SignUpInfo = () => {
    return (
        <div className="hidden lg:flex lg:flex-1 lg:relative overflow-hidden">
            {/* Animated gradient background with pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-600 animate-[pulse_15s_ease-in-out_infinite]">
                <div
                    className="absolute inset-0 bg-[url('/images/medical-pattern-light.svg')] bg-[length:300px_300px] opacity-10"
                    style={{ animation: "moveBackground 20s linear infinite" }}
                />
            </div>

            {/* Content container with subtle glow */}
            <div className="relative flex flex-col justify-center items-center p-12 text-white">
                <div className="max-w-md space-y-8 relative z-10">
                    {/* Header with animated icon */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full backdrop-blur-sm hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-red-500/20">
                            <HeartPulse className="w-10 h-10 animate-[pulse_2s_ease-in-out_infinite]" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-red-100">
                            Tham Gia Cộng Đồng Y Tế Của Chúng Tôi
                        </h1>
                        <p className="text-lg text-red-100/90">
                            Trở thành một phần của hệ thống quản lý y tế học đường toàn diện, đảm bảo chăm sóc tốt nhất cho học sinh.
                        </p>
                    </div>

                    {/* Features list with hover effects */}
                    <div className="space-y-5">
                        <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1 hover:shadow-md hover:shadow-red-500/10">
                            <div className="p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors duration-300">
                                <ShieldCheck className="flex-shrink-0 w-6 h-6 text-red-200" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Hồ Sơ Sức Khỏe Toàn Diện</h3>
                                <p className="text-sm text-red-100/80 mt-1">Dữ liệu số bảo mật, truy cập mọi lúc</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1 hover:shadow-md hover:shadow-red-500/10">
                            <div className="p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors duration-300">
                                <Stethoscope className="flex-shrink-0 w-6 h-6 text-red-200" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Liên Lạc Nhân Viên Y Tế</h3>
                                <p className="text-sm text-red-100/80 mt-1">Cập nhật và nhắn tin theo thời gian thực</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1 hover:shadow-md hover:shadow-red-500/10">
                            <div className="p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors duration-300">
                                <HeartPulse className="flex-shrink-0 w-6 h-6 text-red-200" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Hệ Thống Yêu Cầu Thuốc</h3>
                                <p className="text-sm text-red-100/80 mt-1">Quy trình theo dõi và phê duyệt dễ dàng</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1 hover:shadow-md hover:shadow-red-500/10">
                            <div className="p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors duration-300">
                                <BellRing className="flex-shrink-0 w-6 h-6 text-red-200" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Theo Dõi Tiêm Chủng</h3>
                                <p className="text-sm text-red-100/80 mt-1">
                                    Nhắc nhở tự động và lưu trữ hồ sơ
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-red-500/10 blur-xl" />
                <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-orange-500/10 blur-xl" />
            </div>
        </div>
    )
}

export default SignUpInfo