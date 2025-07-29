import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { getStatusColor } from "@/lib/utils";
import { StudentMedication } from "@/lib/service/medical-record/student-medication/IStudent-medication";
import { ChildDTO } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MedicationRequestCard = ({
                                   medication,
                                   student,
                                   onApprove,
                                   onReject
                               }: {
    medication: StudentMedication;
    student?: ChildDTO;
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
}) => {
    const getRequestStatus = (med: StudentMedication) => {
        if (!med.isApproved && med.isActive) return "pending";
        if (med.isApproved && med.isActive) return "approved";
        if (med.isApproved && !med.isActive) return "completed";
        return "rejected";
    };

    const status = getRequestStatus(medication);

    return (
        <Card className="relative overflow-hidden shadow-lg border-0 bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
            {/* Gradient background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Decorative elements */}
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-red-100/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -left-5 -bottom-5 w-20 h-20 rounded-full bg-red-200/20 blur-lg" />

            <CardHeader className="relative bg-gradient-to-r from-red-50 to-red-100/80 border-b border-red-200/50 p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} animate-pulse`} />
                        <div>
                            <CardTitle className="text-red-800 font-semibold tracking-tight">
                                {student?.fullName || "Unknown Student"}
                            </CardTitle>
                            <p className="text-red-600/90 text-sm font-medium">
                                {student?.studentCode || "N/A"} • ID: {medication.id}
                            </p>
                        </div>
                    </div>
                    <Badge
                        className={`${getStatusColor(status)} shadow-sm transition-all duration-300 group-hover:scale-105`}
                        variant="outline"
                    >
                        {status === "pending" && "Đang chờ"}
                        {status === "approved" && "Đã duyệt"}
                        {status === "completed" && "Hoàn thành"}
                        {status === "rejected" && "Từ chối"}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-6 relative">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Medication Details */}
                    <div className="space-y-5">
                        <div className="bg-gradient-to-r from-red-50/50 to-white p-4 rounded-lg border border-red-100/50">
                            <p className="font-semibold text-red-800 mb-2">
                                Chi tiết thuốc
                            </p>
                            <p className="text-gray-800 font-medium">
                                {medication.medicationName}
                            </p>
                            <p className="text-sm text-red-600/90 mt-1">
                                Liều dùng: <span className="font-medium">
                                {medication.dosage}
                            </span>
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-red-50/50 to-white p-4 rounded-lg border border-red-100/50">
                            <p className="font-semibold text-red-800 mb-2">
                                Hướng dẫn
                            </p>
                            <p className="text-gray-800">
                                {medication.instructions}
                            </p>
                        </div>
                    </div>

                    {/* Usage Details */}
                    <div className="space-y-5">
                        <div className="bg-gradient-to-r from-red-50/50 to-white p-4 rounded-lg border border-red-100/50">
                            <p className="font-semibold text-red-800 mb-2">
                                Thời gian sử dụng
                            </p>
                            <div className="flex items-center space-x-2 text-gray-800">
                                <span className="font-medium">Từ:</span>
                                <span className="bg-red-100/30 px-2 py-1 rounded text-sm">
                                    {new Date(medication.startDate).toLocaleDateString("vi-VN")}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1 text-gray-800">
                                <span className="font-medium">Đến:</span>
                                <span className="bg-red-100/30 px-2 py-1 rounded text-sm">
                  {new Date(medication.endDate).toLocaleDateString("vi-VN")}
                </span>
                            </div>
                            <p className="text-sm text-red-600/90 mt-2">
                                Thời điểm: <span className="font-medium">
                                {medication.administrationTimeDisplay}
                            </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                {status === "pending" && (
                    <div className="flex justify-end space-x-3 mt-6 pt-5 border-t border-red-100/50">
                        <Button
                            variant="outline"
                            size="sm"
                            className="relative overflow-hidden border-green-200 text-green-700 hover:bg-green-50/80 hover:text-green-800 transition-colors"
                            onClick={() => onApprove(medication.id)}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-green-100/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                            <Check className="w-4 h-4 mr-2" />
                            Duyệt
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="relative overflow-hidden border-red-200 text-red-700 hover:bg-red-50/80 hover:text-red-800 transition-colors"
                            onClick={() => onReject(medication.id)}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-red-100/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                            <X className="w-4 h-4 mr-2" />
                            Từ chối
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default MedicationRequestCard;