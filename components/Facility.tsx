import React from 'react'
import {CheckCircle} from "lucide-react";
import Image from "next/image";

const Facility = () => {
    return (
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
    )
}
export default Facility
