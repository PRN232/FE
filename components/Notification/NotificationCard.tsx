"use client"

import { useRouter } from "next/navigation";
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
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    getNotificationColor,
    getPriorityColor
} from "@/lib/utils";

interface NotificationItem {
    id: string
    title: string
    description: string
    date: string
    time: string
    location: string
    status: "upcoming" | "ongoing" | "completed"
    participants: number
    maxParticipants?: number
    priority: "high" | "medium" | "low"
    requirements?: string[]
}

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

const NotificationCard = ({
                              notification,
                              type
                          }: {
    notification: NotificationItem;
    type: "examination" | "vaccination"
}) => {
    const router = useRouter()
    const Icon = type === "examination" ? Stethoscope : Syringe

    const handleViewDetails = (id: string) => {
        router.push(`/notification/${id}`)
    }

    return (
        <Card className="group relative overflow-hidden rounded-xl border-0 bg-white/90 shadow-lg transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-red-500/20">
            {/* Animated background effect */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/5 via-white/90 to-white/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Glow effect on hover */}
            <div className="absolute inset-0 -z-20 bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Header with improved gradient */}
            <CardHeader className="relative bg-gradient-to-r from-red-500 to-red-600 text-white">
                <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-[length:100px_100px] opacity-10 mix-blend-overlay" />
                <div className="relative z-10">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="rounded-lg bg-white/10 p-2 backdrop-blur-sm">
                                <Icon className="h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-semibold">{notification.title}</CardTitle>
                                <div className="mt-2 flex items-center space-x-2">
                                    <Badge className={`${getNotificationColor(notification.status)} text-xs`}>
                                        {getStatusIcon(notification.status)}
                                        <span className="ml-1">
                                            {notification.status === "upcoming"
                                                ? "Sắp diễn ra"
                                                : notification.status === "ongoing"
                                                    ? "Đang diễn ra"
                                                    : "Đã hoàn thành"}
                                        </span>
                                    </Badge>
                                    <Badge className={`${getPriorityColor(notification.priority)} text-xs`}>
                                        {notification.priority === "high"
                                            ? "Ưu tiên cao"
                                            : notification.priority === "medium"
                                                ? "Ưu tiên trung bình"
                                                : "Ưu tiên thấp"}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
                <p className="text-gray-700 leading-relaxed">{notification.description}</p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                        { icon: Calendar, text: new Date(notification.date).toLocaleDateString("vi-VN") },
                        { icon: Clock, text: notification.time },
                        { icon: MapPin, text: notification.location },
                        {
                            icon: Users,
                            text: `${notification.participants}${notification.maxParticipants ? `/${notification.maxParticipants}` : ''} người tham gia`
                        }
                    ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <item.icon className="h-4 w-4 text-red-500" />
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>

                {notification.requirements && notification.requirements.length > 0 && (
                    <div className="rounded-lg border border-red-100 bg-red-50 p-4 transition-all duration-300 hover:border-red-200">
                        <h4 className="mb-2 flex items-center font-semibold text-red-800">
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Yêu cầu cần thiết:
                        </h4>
                        <ul className="list-inside list-disc space-y-1 text-sm text-red-700">
                            {notification.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex space-x-3 pt-4">
                    {notification.status === "upcoming" && (
                        <>
                            <Button
                                className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg"
                            >
                                Đăng ký tham gia
                            </Button>
                            <Button
                                variant="outline"
                                className="border-red-200 bg-transparent text-red-600 shadow-sm hover:bg-red-50 hover:shadow-md"
                                onClick={() => handleViewDetails(notification.id)}
                            >
                                Xem chi tiết
                            </Button>
                        </>
                    )}
                    {notification.status === "completed" && (
                        <Button
                            variant="outline"
                            className="border-gray-200 bg-transparent text-gray-600 hover:bg-gray-50"
                        >
                            Xem kết quả
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default NotificationCard