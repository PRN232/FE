"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getNotificationColor, showErrorAlert, showSuccessAlert } from "@/lib/utils";
import { NotificationItem } from "@/types";

const getStatusIcon = (status: string) => {
    switch (status) {
        case "upcoming": return <Clock className="w-4 h-4" />;
        case "ongoing": return <AlertCircle className="w-4 h-4" />;
        case "completed": return <CheckCircle className="w-4 h-4" />;
        case "pending": return <Clock className="w-4 h-4" />;
        case "approved": return <CheckCircle className="w-4 h-4" />;
        default: return <Info className="w-4 h-4" />;
    }
};

interface NotificationCardProps {
    notification: NotificationItem;
    type: "examination" | "vaccination";
    onUpdateConsent: (
        id: number,
        consentGiven: boolean,
        signature: string,
        note: string
    ) => Promise<void>;
}

const NotificationCard = ({
                              notification,
                              type,
                              onUpdateConsent
                          }: NotificationCardProps) => {
    const router = useRouter();
    const Icon = type === "examination" ? Stethoscope : Syringe;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [signature, setSignature] = useState(notification.parentSignature || "");
    const [note, setNote] = useState(notification.note || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmitConsent = async (consentGiven: boolean) => {
        setIsSubmitting(true);
        try {
            await onUpdateConsent(Number(notification.id), consentGiven, signature, note);
            await showSuccessAlert("Đã cập nhật đồng ý thành công!");
            setIsSuccess(true);
            setTimeout(() => {
                setIsDialogOpen(false);
                setIsSuccess(false);
                setSignature("");
                setNote("");
            }, 1500);
        } catch {
            await showErrorAlert("Có lỗi xảy ra khi cập nhật đồng ý", 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formattedDate = new Date(notification.date).toLocaleDateString("vi-VN", {
        weekday: 'long',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });

    const participationPercentage = notification.maxParticipants > 0
        ? Math.round((notification.participants / notification.maxParticipants) * 100)
        : 0;

    return (
        <>
            <Card className="group relative overflow-hidden rounded-xl border border-red-100 bg-gradient-to-br from-white to-red-50 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-red-200 hover:scale-[1.01]">
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-red-500/20 transition-all duration-500 pointer-events-none" />

                <CardHeader className="relative bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-[length:100px_100px] opacity-10 mix-blend-overlay" />

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-red-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="rounded-lg bg-white/10 p-2 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-semibold tracking-tight">{notification.title}</CardTitle>
                                    <div className="mt-2 flex items-center space-x-2">
                                        <Badge className={`${getNotificationColor(notification.status)} text-xs transition-all duration-300 group-hover:shadow-md`}>
                                            {getStatusIcon(notification.status)}
                                            <span className="ml-1">
                                                {notification.status === "upcoming"
                                                    ? "Sắp diễn ra"
                                                    : notification.status === "ongoing"
                                                        ? "Đang diễn ra"
                                                        : notification.status === "completed"
                                                            ? "Đã hoàn thành"
                                                            : notification.status === "pending"
                                                                ? "Chưa đồng ý"
                                                                : "Đã đồng ý"}
                                            </span>
                                        </Badge>
                                        <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                                            {type === "examination" ? "Khám sức khỏe" : "Tiêm chủng"}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                    <div>
                        <p className="text-gray-700 leading-relaxed">{notification.description}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 text-red-500 mr-1" />
                            <span>{notification.location}</span>
                        </div>
                    </div>

                    {/* Target Grades */}
                    {notification.targetGrades && (
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                            <h4 className="text-sm font-medium text-blue-800 mb-1 flex items-center">
                                <Users className="h-4 w-4 mr-2" />
                                Lớp áp dụng:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {notification.targetGrades.split(', ').map((grade, index) => (
                                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                        {grade.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 text-red-500" />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4 text-red-500" />
                            <span>{notification.time}</span>
                        </div>
                    </div>

                    {/* Participation Progress */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Đăng ký tham gia:</span>
                            <span className="font-medium">
                                {notification.participants}/{notification.maxParticipants} ({participationPercentage}%)
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-red-600 h-2.5 rounded-full"
                                style={{ width: `${participationPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {notification.requirements && notification.requirements.length > 0 && (
                        <div className="rounded-lg border border-red-100 bg-gradient-to-br from-red-50 to-red-100 p-4 transition-all duration-300 hover:border-red-200 hover:shadow-sm">
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
                        {notification.status === "pending" ? (
                            <>
                                <Button
                                    className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    Đăng ký tham gia
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-red-200 bg-transparent text-red-600 shadow-sm hover:bg-red-50 hover:shadow-md transition-all duration-300"
                                    onClick={() => router.push(`/notification/${notification.id}`)}
                                >
                                    Xem chi tiết
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="outline"
                                className="border-gray-200 bg-transparent text-gray-600 hover:bg-gray-50 transition-all duration-300 hover:border-red-200 hover:text-red-600"
                                onClick={() => router.push(`/notification/${notification.id}`)}
                            >
                                Xem kết quả
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Consent Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
                if (!open && !isSubmitting) {
                    setIsDialogOpen(false);
                    setIsSuccess(false);
                }
            }}>
                <DialogContent className="bg-gradient-to-br from-white to-red-50 border border-red-100 rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="text-red-800">Xác nhận đồng ý tham gia</DialogTitle>
                        <DialogDescription className="text-red-600">
                            Vui lòng điền thông tin để xác nhận đồng ý tham gia chiến dịch {notification.title}
                        </DialogDescription>
                    </DialogHeader>

                    {isSuccess ? (
                        <div className="text-center py-4">
                            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                            <h3 className="text-lg font-medium text-green-800">Đã gửi đồng ý thành công!</h3>
                            <p className="text-green-600 mt-2">Thông tin của bạn đã được cập nhật</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <h4 className="text-sm font-medium text-blue-800 mb-2">Thông tin chiến dịch</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="text-gray-500">Ngày:</span>
                                            <span className="font-medium ml-1">{formattedDate}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Thời gian:</span>
                                            <span className="font-medium ml-1">{notification.time}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Địa điểm:</span>
                                            <span className="font-medium ml-1">{notification.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="signature" className="text-red-700">Chữ ký phụ huynh*</Label>
                                    <Input
                                        id="signature"
                                        value={signature}
                                        onChange={(e) => setSignature(e.target.value)}
                                        placeholder="Nhập họ tên đầy đủ"
                                        className="border-red-200 focus:border-red-500 focus:ring-red-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="note" className="text-red-700">Ghi chú</Label>
                                    <Textarea
                                        id="note"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Nhập ghi chú (nếu có)"
                                        className="border-red-200 focus:border-red-500 focus:ring-red-500"
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                    disabled={isSubmitting}
                                    className="border-red-200 text-red-600 hover:bg-red-50"
                                >
                                    Hủy
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-300"
                                    onClick={() => handleSubmitConsent(true)}
                                    disabled={isSubmitting || !signature.trim()}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Đang xử lý...
                                        </span>
                                    ) : "Xác nhận đồng ý"}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default NotificationCard;