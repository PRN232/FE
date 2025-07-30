"use client"

import { useParams } from "next/navigation"
import { examinationNotifications, vaccinationNotifications } from "@/lib/data/mock-data"
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    Clock,
    Info,
    MapPin,
    Stethoscope,
    Syringe,
    Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getNotificationColor, getPriorityColor } from "@/lib/utils"
import Link from "next/link"

const getStatusIcon = (status: string) => {
    switch (status) {
        case "upcoming":
            return <Clock className="w-4 h-4" />
        case "ongoing":
            return <AlertCircle className="w-4 h-4" />
        case "completed":
            return <CheckCircle className="w-4 h-4" />
        default:
            return <Info className="w-4 h-4" />
    }
}

const NotificationDetailPage = () => {
    const { id } = useParams()

    // Combine both notification types and find the matching one
    const allNotifications = [...examinationNotifications, ...vaccinationNotifications]
    const notification = allNotifications.find(n => n.id === id)

    if (!notification) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50/50 via-white to-red-100/50 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Không tìm thấy thông báo</h1>
                    <p className="text-gray-600 mb-6">Thông báo bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                    <Link href="/parents/notification">
                        <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
                            Quay lại trang thông báo
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    const isExamination = notification.id.startsWith('exam')
    const Icon = isExamination ? Stethoscope : Syringe

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50/50 via-white to-red-100/50 relative">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=300')] bg-[length:300px_300px] opacity-[0.03] animate-[pulse_20s_linear_infinite]" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-50/20 pointer-events-none" />

            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=300')] bg-[length:300px_300px] opacity-[0.03]" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-red-700/30 pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent flex items-center">
                                <Icon className="w-8 h-8 mr-3 text-white" />
                                {notification.title}
                            </h1>
                            <div className="flex items-center space-x-2">
                                <Badge className={`${getNotificationColor(notification.status)}`}>
                                    {getStatusIcon(notification.status)}
                                    <span className="ml-1">
                    {notification.status === "upcoming"
                        ? "Sắp diễn ra"
                        : notification.status === "ongoing"
                            ? "Đang diễn ra"
                            : "Đã hoàn thành"}
                  </span>
                                </Badge>
                                <Badge className={`${getPriorityColor(notification.priority)}`}>
                                    {notification.priority === "high"
                                        ? "Ưu tiên cao"
                                        : notification.priority === "medium"
                                            ? "Ưu tiên trung bình"
                                            : "Ưu tiên thấp"}
                                </Badge>
                            </div>
                        </div>
                        <Link href="/parents/notification">
                            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                                Quay lại
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6 space-y-6">
                                <div className="prose max-w-none text-gray-700">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Thông tin chi tiết</h3>
                                    <p>{notification.description}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-500">Ngày diễn ra</h4>
                                            <p className="text-gray-900 font-medium">
                                                {new Date(notification.date).toLocaleDateString("vi-VN", {
                                                    weekday: 'long',
                                                    day: 'numeric',
                                                    month: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-500">Thời gian</h4>
                                            <p className="text-gray-900 font-medium">{notification.time}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-500">Địa điểm</h4>
                                            <p className="text-gray-900 font-medium">{notification.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-500">Số lượng tham gia</h4>
                                            <p className="text-gray-900 font-medium">
                                                {notification.participants}
                                                {notification.maxParticipants && `/${notification.maxParticipants}`} người
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {notification.requirements && notification.requirements.length > 0 && (
                                    <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                                        <h4 className="font-semibold text-red-800 mb-4 flex items-center text-lg">
                                            <AlertCircle className="w-5 h-5 mr-2" />
                                            Yêu cầu tham gia
                                        </h4>
                                        <ul className="space-y-3">
                                            {notification.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="flex items-center justify-center w-5 h-5 bg-red-100
                                                    text-red-600 rounded-full mr-3 mt-0.5 flex-shrink-0">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-gray-700">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                                {notification.status === "upcoming" && (
                                    <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md">
                                        Đăng ký tham gia
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4">
                                <h3 className="font-semibold text-lg flex items-center">
                                    <Info className="w-5 h-5 mr-2" />
                                    Thông tin bổ sung
                                </h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Loại hoạt động</h4>
                                    <p className="font-medium">
                                        {isExamination ? "Khám sức khỏe" : "Tiêm chủng"}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Mã thông báo</h4>
                                    <p className="font-mono font-medium bg-gray-100 px-2 py-1 rounded inline-block">
                                        {notification.id}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Trạng thái</h4>
                                    <div className="flex items-center">
                                        <Badge className={`${getNotificationColor(notification.status)}`}>
                                            {getStatusIcon(notification.status)}
                                            <span className="ml-1">
                                                {notification.status === "upcoming"
                                                    ? "Sắp diễn ra"
                                                    : notification.status === "ongoing"
                                                        ? "Đang diễn ra"
                                                        : "Đã hoàn thành"}
                                            </span>
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4">
                                <h3 className="font-semibold text-lg flex items-center">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    Lưu ý quan trọng
                                </h3>
                            </div>
                            <div className="p-6 space-y-3 text-sm text-gray-700">
                                <p>• Vui lòng đến đúng giờ theo lịch hẹn</p>
                                <p>• Mang đầy đủ giấy tờ và hồ sơ cần thiết</p>
                                <p>• Liên hệ phòng y tế nếu có thắc mắc</p>
                                {isExamination && (
                                    <p>• Nhịn ăn sáng nếu có xét nghiệm máu</p>
                                )}
                                {!isExamination && (
                                    <p>• Theo dõi phản ứng sau tiêm 30 phút tại chỗ</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationDetailPage