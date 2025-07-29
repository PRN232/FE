"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Pill,
    AlertTriangle,
    User,
    CalendarIcon,
    Search,
    Plus,
    Eye
} from "lucide-react";
import { getStatusColor } from "@/lib/utils";
import MedicalRequestModal from "@/components/Medical/MedicalRequest/MedicalRequestModal";
import { ChildDTO } from "@/types";
import { getChildrenByParentId } from "@/lib/service/parent/parent";
import { StudentMedication } from "@/lib/service/medical-record/student-medication/IStudent-medication";

interface RequestsTabProps {
    searchTerm: string;
    filterStatus: string;
    setSearchTerm: (value: string) => void;
    setFilterStatus: (value: string) => void;
    medicalRequests: StudentMedication[];
    onRefresh: () => void;
}

const RequestsTab = ({
                         searchTerm,
                         filterStatus,
                         setSearchTerm,
                         setFilterStatus,
                         medicalRequests,
                         onRefresh
}: RequestsTabProps) => {
    const [isMedicalRequestModalOpen, setIsMedicalRequestModalOpen] = useState(false);
    const [students, setStudents] = useState<ChildDTO[]>([]);
    const [studentsLoading, setStudentsLoading] = useState(true);
    const [studentsError, setStudentsError] = useState<string | null>(null);

    const parentId = JSON.parse(localStorage.getItem("user") || "{}")?.id;

    useEffect(() => {
        const fetchStudents = async () => {
            if (!parentId) {
                setStudentsError("Parent ID not found");
                setStudentsLoading(false);
                return;
            }

            try {
                const response = await getChildrenByParentId(parentId);
                if (response.success && response.children) {
                    setStudents(response.children);
                } else {
                    setStudentsError(response.error || "Failed to fetch children");
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
                setStudentsError(errorMessage);
            } finally {
                setStudentsLoading(false);
            }
        };

        void fetchStudents();
    }, [parentId]);

    const getRequestStatus = (request: StudentMedication) => {
        if (!request.isApproved) return "pending";
        if (request.isApproved && request.isActive) return "approved";
        if (request.isApproved && !request.isActive) return "completed";
        return "rejected";
    };

    const filteredRequests = medicalRequests.filter((request) => {
        const student = students.find((s) => s.id === request.studentId);
        const studentName = student?.fullName || "";
        const matchesSearch =
            studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.medicationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.instructions.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "all" || getRequestStatus(request) === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const handleMedicalRequestSuccess = () => {
        onRefresh();
    };

    if (studentsLoading) {
        return <div className="p-6 text-center">Loading students...</div>;
    }

    if (studentsError) {
        return (
            <div className="p-6 text-center text-red-600">
                Error: {studentsError}
                <Button onClick={() => window.location.reload()} className="mt-4">
                    Thử lại
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Search and Filter */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
                <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                            <Search className="w-5 h-5 mr-2" />
                            Tìm kiếm và Lọc
                        </CardTitle>
                        <Button
                            onClick={() => setIsMedicalRequestModalOpen(true)}
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            size="sm"
                            disabled={students.length === 0}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Yêu Cầu Mới
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Tìm kiếm theo tên học sinh, thuốc, hoặc hướng dẫn..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-red-200 focus:border-red-500"
                            />
                        </div>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-full md:w-48 border-red-200 focus:border-red-500">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                                <SelectItem value="pending">Đang chờ</SelectItem>
                                <SelectItem value="approved">Đã duyệt</SelectItem>
                                <SelectItem value="completed">Hoàn thành</SelectItem>
                                <SelectItem value="rejected">Từ chối</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Requests List */}
            <div className="grid gap-6">
                {filteredRequests.length === 0 ? (
                    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                        <CardContent className="p-12 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Pill className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có yêu cầu y tế nào</h3>
                            <p className="text-gray-600 mb-4">Bạn chưa có yêu cầu y tế nào cho con em của mình.</p>
                            <Button
                                onClick={() => setIsMedicalRequestModalOpen(true)}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                                disabled={students.length === 0}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Tạo Yêu Cầu Đầu Tiên
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    filteredRequests.map((request) => {
                        const student = students.find((s) => s.id === request.studentId);
                        return (
                            <Card
                                key={request.id}
                                className="shadow-lg border-0 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300"
                            >
                                <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-3 h-3 rounded-full ${getStatusColor(getRequestStatus(request))}`}></div>
                                            <div>
                                                <CardTitle className="text-red-700">{student?.fullName || "Unknown Student"}</CardTitle>
                                                <CardDescription className="text-red-600">
                                                    {student?.studentCode || "N/A"} • ID Yêu cầu: {request.id}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getStatusColor(getRequestStatus(request))}>
                                                {getRequestStatus(request) === "pending" && "Đang chờ"}
                                                {getRequestStatus(request) === "approved" && "Đã duyệt"}
                                                {getRequestStatus(request) === "completed" && "Hoàn thành"}
                                                {getRequestStatus(request) === "rejected" && "Từ chối"}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-start space-x-3">
                                                <Pill className="w-5 h-5 text-red-500 mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-gray-800">Chi tiết thuốc</p>
                                                    <p className="text-gray-600">{request.medicationName}</p>
                                                    <p className="text-sm text-gray-500">
                                                        Liều dùng: {request.dosage} • Thời gian: {request.administrationTimeDisplay}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-gray-800">Hướng dẫn</p>
                                                    <p className="text-gray-600">{request.instructions}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-start space-x-3">
                                                <CalendarIcon className="w-5 h-5 text-red-500 mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-gray-800">Thời gian sử dụng</p>
                                                    <p className="text-gray-600">
                                                        Từ {new Date(request.startDate).toLocaleDateString("vi-VN")} đến{" "}
                                                        {new Date(request.endDate).toLocaleDateString("vi-VN")}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                                <User className="w-5 h-5 text-red-500 mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-gray-800">Phụ huynh</p>
                                                    <p className="text-gray-600">{parentId ? "Bạn" : "N/A"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-red-100">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            Xem Chi Tiết
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>

            <MedicalRequestModal
                isOpen={isMedicalRequestModalOpen}
                onClose={() => setIsMedicalRequestModalOpen(false)}
                onSuccess={handleMedicalRequestSuccess}
            />
        </div>
    );
};

export default RequestsTab;