"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    AlertCircle,
    Calendar,
    CalendarDays,
    Check,
    CheckCircle,
    Clock,
    Info,
    MapPin,
    NotepadText,
    PenLine,
    Stethoscope,
    Syringe,
    Users
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    getNotificationColor,
    showErrorAlert,
    showSuccessAlert
} from "@/lib/utils";
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
    notification: NotificationItem & {
        campaignId: number;
        medicalConsentId: number;
    };
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
    const Icon = type === "examination" ? Stethoscope : Syringe;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [signature, setSignature] = useState(notification.parentSignature || "");
    const [note, setNote] = useState(notification.note || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmitConsent = async (consentGiven: boolean) => {
        setIsSubmitting(true);
        try {
            await onUpdateConsent(
                notification.medicalConsentId,
                consentGiven,
                signature,
                note
            );

            await showSuccessAlert("Đã cập nhật đồng ý thành công!");
            setIsSuccess(true);

            setTimeout(() => {
                setIsDialogOpen(false);
                setIsSuccess(false);
            }, 1500);
        } catch (error) {
            await showErrorAlert(
                error instanceof Error ? error.message : "Có lỗi xảy ra khi cập nhật đồng ý",
                3000
            );
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
                                        <Badge className={`${getNotificationColor(notification.consentGiven ? "approved" : "pending")} text-xs transition-all duration-300 group-hover:shadow-md`}>
                                            {getStatusIcon(notification.consentGiven ? "approved" : "pending")}
                                            <span className="ml-1">
                                                {notification.consentGiven ? "Đã đồng ý" : "Chưa đồng ý"}
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
                        {notification.status === "pending" && !notification.consentGiven && (
                            <Button
                                className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                Đăng ký tham gia
                            </Button>
                        )}
                        {notification.consentGiven && (
                            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Đã đăng ký tham gia
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
                <DialogContent className="bg-gradient-to-br from-white to-red-50 border-2 border-red-200 rounded-xl shadow-xl max-w-md md:max-w-lg">
                    <DialogHeader className="px-6 pt-6 pb-2">
                        <DialogTitle className="text-2xl font-bold text-red-800 flex items-center gap-2">
                            <CheckCircle className="w-6 h-6" />
                            Xác nhận đồng ý tham gia
                        </DialogTitle>
                        <DialogDescription className="text-red-600/90 mt-1">
                            Vui lòng điền thông tin để xác nhận đồng ý tham gia chiến dịch <span className="font-medium">{notification.title}</span>
                        </DialogDescription>
                    </DialogHeader>

                    {isSuccess ? (
                        <div className="text-center py-8 px-6">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                                <CheckCircle className="h-10 w-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-green-800 mb-2">Đã gửi đồng ý thành công!</h3>
                            <p className="text-green-600/90">Thông tin của bạn đã được cập nhật</p>
                            <Button
                                onClick={() => setIsDialogOpen(false)}
                                className="mt-6 bg-green-600 hover:bg-green-700 text-white"
                            >
                                Đóng
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="px-6 py-2 space-y-5">
                                <div className="bg-blue-50/80 p-4 rounded-lg border border-blue-200 shadow-sm">
                                    <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                                        <Info className="w-4 h-4" />
                                        Thông tin chiến dịch
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="space-y-1">
                                            <p className="text-gray-500 flex items-center gap-1">
                                                <CalendarDays className="w-4 h-4" />
                                                Ngày:
                                            </p>
                                            <p className="font-medium text-gray-800">{formattedDate}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-gray-500 flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                Thời gian:
                                            </p>
                                            <p className="font-medium text-gray-800">{notification.time}</p>
                                        </div>
                                        <div className="col-span-2 space-y-1">
                                            <p className="text-gray-500 flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                Địa điểm:
                                            </p>
                                            <p className="font-medium text-gray-800">{notification.location}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="signature" className="text-red-700 flex items-center gap-1">
                                            <PenLine className="w-4 h-4" />
                                            Chữ ký phụ huynh*
                                        </Label>
                                        <Input
                                            id="signature"
                                            value={signature}
                                            onChange={(e) => setSignature(e.target.value)}
                                            placeholder="Nhập họ tên đầy đủ"
                                            className="border-2 border-red-200 focus:border-red-500 focus:ring-1 focus:ring-red-300 h-11 rounded-lg"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="note" className="text-red-700 flex items-center gap-1">
                                            <NotepadText className="w-4 h-4" />
                                            Ghi chú
                                        </Label>
                                        <Textarea
                                            id="note"
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            placeholder="Nhập ghi chú (nếu có)"
                                            className="border-2 border-red-200 focus:border-red-500 focus:ring-1 focus:ring-red-300 min-h-[100px] rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="px-6 pb-6 pt-4 bg-gray-50/50 rounded-b-xl">
                                <div className="flex w-full gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsDialogOpen(false)}
                                        disabled={isSubmitting}
                                        className="border-2 border-red-200 text-red-600 hover:bg-red-50/80 hover:text-red-700 flex-1 h-11 rounded-lg"
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-300 flex-1 h-11 rounded-lg"
                                        onClick={() => handleSubmitConsent(true)}
                                        disabled={isSubmitting || !signature.trim()}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang xử lý...
                                </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-1">
                                    <Check className="w-4 h-4" />
                                    Xác nhận đồng ý
                                </span>
                                        )}
                                    </Button>
                                </div>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default NotificationCard;