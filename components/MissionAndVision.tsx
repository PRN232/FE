import React from 'react'
import {CheckCircle} from "lucide-react";
import Image from "next/image";

const MissionAndVision = () => {
    return (
        <>
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
                        src="/images/placeholder.jpg"
                        alt="Tầm nhìn Sức khỏe Trường học"
                        width={500}
                        height={300}
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </>
    )
}
export default MissionAndVision
