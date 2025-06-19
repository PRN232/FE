import React from 'react'
import {Button} from "@/components/ui/button";
import {ArrowRight, User, Stethoscope} from "lucide-react";

const Cta = () => {
    return (
        <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Sẵn sàng bắt đầu?
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-xl text-primary-foreground/90 leading-relaxed">
                        Tham gia hệ thống quản lý sức khỏe học đường của chúng tôi để đảm bảo sự chăm sóc tốt nhất cho học sinh.
                    </p>
                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button
                            size="lg"
                            className="group px-8 py-6 text-lg font-medium rounded-xl border-2 border-primary-foreground/30 hover:border-primary-foreground bg-transparent hover:bg-primary-foreground/10 transition-all duration-300"
                        >
                            <User className="mr-3 h-5 w-5" />
                            <span>Cổng phụ huynh</span>
                            <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </Button>
                        <Button
                            size="lg"
                            className="group px-8 py-6 text-lg font-medium rounded-xl bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:shadow-lg transition-all duration-300"
                        >
                            <Stethoscope className="mr-3 h-5 w-5" />
                            <span>Đăng nhập Nhân viên Y tế</span>
                            <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </Button>
                    </div>

                    <div className="mt-12 pt-6 border-t border-primary-foreground/10">
                        <p className="text-lg text-primary-foreground/70">
                            Cần hỗ trợ? Liên hệ với chúng tôi qua email support@example.com
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Cta