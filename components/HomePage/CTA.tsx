import React from 'react'
import {Button} from "@/components/ui/button";

const Cta = () => {
    return (
        <section className="bg-primary text-primary-foreground">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Sẵn sàng bắt đầu?
                    </h2>
                    <p className="mt-4 text-lg text-primary-foreground/80">
                        Tham gia hệ thống quản lý sức khỏe học đường của chúng tôi để đảm bảo sự chăm sóc tốt nhất cho học sinh.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-x-6">
                        <Button size="lg" variant="outline">
                            Cổng phụ huynh
                        </Button>
                        <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                            Đăng nhập Nhân viên Y tế
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Cta
