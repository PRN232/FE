"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Info, Loader2 } from "lucide-react";
import { ChildDTO } from "@/types";
import { getStudentById } from "@/lib/service/student/student";

interface StudentDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    studentId: number | null;
}

const StudentDetailModal = ({
                                isOpen,
                                onClose,
                                studentId
}: StudentDetailModalProps) => {
    const [student, setStudent] = useState<ChildDTO | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (studentId) {
            const fetchStudent = async () => {
                setIsLoading(true);
                const response = await getStudentById(studentId);
                if (response.success && response.student) {
                    setStudent(response.student);
                }
                setIsLoading(false);
            };
            void fetchStudent();
        }
    }, [studentId]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-xl border-0">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-400 rounded-t-xl" />
                <DialogHeader className="pt-4">
                    <div className="flex items-center">
                        <div className="p-2 mr-3 rounded-lg bg-red-100 text-red-600">
                            <Info className="w-5 h-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-gray-800 text-xl">Chi tiết học sinh</DialogTitle>
                            <p className="text-sm text-gray-500 mt-1">Thông tin chi tiết về học sinh</p>
                        </div>
                    </div>
                </DialogHeader>
                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
                    </div>
                ) : student ? (
                    <div className="space-y-4 mt-2 px-1">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-red-50/50 p-3 rounded-lg">
                                <p className="text-xs font-medium text-gray-500">Mã học sinh</p>
                                <p className="font-medium text-gray-800">{student.studentCode}</p>
                            </div>
                            <div className="bg-red-50/50 p-3 rounded-lg">
                                <p className="text-xs font-medium text-gray-500">Họ và tên</p>
                                <p className="font-medium text-gray-800">{student.fullName}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-red-50/50 p-3 rounded-lg">
                                <p className="text-xs font-medium text-gray-500">Ngày sinh</p>
                                <p className="font-medium text-gray-800">
                                    {new Date(student.dateOfBirth).toLocaleDateString("vi-VN")}
                                </p>
                            </div>
                            <div className="bg-red-50/50 p-3 rounded-lg">
                                <p className="text-xs font-medium text-gray-500">Giới tính</p>
                                <p className="font-medium text-gray-800">{student.gender}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-red-50/50 p-3 rounded-lg">
                                <p className="text-xs font-medium text-gray-500">Lớp</p>
                                <p className="font-medium text-gray-800">{student.className}</p>
                            </div>
                            <div className="bg-red-50/50 p-3 rounded-lg">
                                <p className="text-xs font-medium text-gray-500">Phụ huynh</p>
                                <p className="font-medium text-gray-800">{student.parentName || "Không có thông tin"}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-red-50/50 p-3 rounded-lg">
                                <p className="text-xs font-medium text-gray-500">SĐT Phụ huynh</p>
                                <p className="font-medium text-gray-800">{student.parentPhone || "Không có thông tin"}</p>
                            </div>
                            <div className="bg-red-50/50 p-3 rounded-lg">
                                <p className="text-xs font-medium text-gray-500">Hồ sơ y tế</p>
                                <p className="font-medium text-gray-800">
                                    {student.hasMedicalProfile ? (
                                        <span className="text-green-600">Có</span>
                                    ) : (
                                        <span className="text-red-600">Không</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <User className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-red-600 font-medium">Không tìm thấy thông tin học sinh</p>
                    </div>
                )}
                <DialogFooter className="mt-6">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Đóng
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default StudentDetailModal;