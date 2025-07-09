import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    AlertTriangle,
    Heart,
    ClipboardList,
    Activity,
    Stethoscope,
} from "lucide-react";
import { ApiMedicalProfile } from "@/lib/service/medicalProfile/IMedical";

const OverviewTab = ({
                         profile
}: {
    profile?: ApiMedicalProfile
}) => {
    const allergyCount = profile?.allergies?.length || 0;
    const conditionCount = profile?.chronicDiseases?.length || 0;
    const hasFollowUp = profile?.requiresFollowup || false;
    const lastCheckup = profile?.lastCheckupDate
        ? new Date(profile.lastCheckupDate).toLocaleDateString("vi-VN")
        : "Chưa có dữ liệu";

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Allergies Card */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-50/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardContent className="p-6 relative">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">
                                    {allergyCount}
                                </p>
                                <p className="text-sm text-gray-600">Dị ứng</p>
                                {allergyCount > 0 && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {profile?.allergies?.[0]?.allergyName}
                                        {allergyCount > 1 ? ` +${allergyCount - 1} khác` : ''}
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Conditions Card */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardContent className="p-6 relative">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                                <Heart className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">
                                    {conditionCount}
                                </p>
                                <p className="text-sm text-gray-600">Bệnh mãn tính</p>
                                {conditionCount > 0 && (
                                    <p className="text-xs text-blue-500 mt-1">
                                        {profile?.chronicDiseases?.[0]?.diseaseName}
                                        {conditionCount > 1 ? ` +${conditionCount - 1} khác` : ''}
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Health Summary Card */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
                    <CardTitle className="flex items-center text-red-800">
                        <Activity className="w-5 h-5 mr-2" />
                        Tổng quan sức khỏe
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800 flex items-center">
                                <Stethoscope className="w-4 h-4 mr-2 text-red-500" />
                                Thông tin chung
                            </h3>
                            <div className="space-y-2 pl-6">
                                <p>
                                    <span className="font-medium">Huyết áp:</span>
                                    {profile?.bloodPressure || "Chưa có dữ liệu"}
                                </p>
                                <p>
                                    <span className="font-medium">Kiểm tra mắt:</span>
                                    {profile?.visionTest || "Chưa có dữ liệu"}
                                </p>
                                <p>
                                    <span className="font-medium">Kiểm tra tai:</span>
                                    {profile?.hearingTest || "Chưa có dữ liệu"}
                                </p>
                                <p>
                                    <span className="font-medium">Kiểm tra cuối:</span>
                                    {lastCheckup}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800 flex items-center">
                                <ClipboardList className="w-4 h-4 mr-2 text-red-500" />
                                Đánh giá & Khuyến nghị
                            </h3>
                            <div className="space-y-2 pl-6">
                                <p className="font-medium">Tình trạng sức khỏe:</p>
                                <p className="text-sm text-gray-600">
                                    {profile?.generalHealth || "Chưa có đánh giá"}
                                </p>

                                {profile?.recommendations && (
                                    <>
                                        <p className="font-medium mt-3">Khuyến nghị:</p>
                                        <p className="text-sm text-gray-600">
                                            {profile.recommendations}
                                        </p>
                                    </>
                                )}

                                {hasFollowUp && (
                                    <Badge className="mt-3 bg-red-100 text-red-800 border-red-200">
                                        Cần theo dõi thêm
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default OverviewTab;