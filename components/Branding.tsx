import React from 'react'

const Branding = () => {
    return (
        <div className="hidden lg:flex lg:flex-1 lg:relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-600 opacity-90" />
            <div className="absolute inset-0 bg-[length:300px_300px] opacity-10" />
            <div className="relative flex flex-col justify-center items-center text-white p-12">
                <div className="max-w-md text-center space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight drop-shadow-md">
                        HealthCare School
                    </h1>
                    <p className="text-lg text-red-100/90">
                        Giải pháp số toàn diện cho việc quản lý hồ sơ sức khỏe học sinh, sự cố y tế và các chương trình chăm sóc sức khỏe.
                    </p>
                    <div className="space-y-4">
                        {[
                            "Quản lý hồ sơ sức khỏe bảo mật",
                            "Theo dõi sự cố y tế thời gian thực",
                            "Quản lý chương trình tiêm chủng",
                            "Kênh liên lạc giữa nhà trường và phụ huynh"
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3 group">
                                <div className="w-2 h-2 bg-white rounded-full transition-all duration-300 group-hover:bg-red-300 group-hover:scale-150" />
                                <span className="transition-all duration-300 group-hover:text-red-200">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Branding
