"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    ChildDTO,
    User
} from "@/types";
import { getAllStudents } from "@/lib/service/student/student";
import { getUsersByRole} from "@/lib/service/user/user";
import StudentTable from "@/components/MedicalStaff/Student/StudentTable";
import StudentCreateModal from "@/components/MedicalStaff/Student/StudentCreateModal";
import StudentEditModal from "@/components/MedicalStaff/Student/StudentEditModal";
import StudentDetailModal from "@/components/MedicalStaff/Student/StudentDetailModal";

const StudentPage = () => {
    const [students, setStudents] = useState<ChildDTO[]>([]);
    const [parents, setParents] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentResponse, parentResponse] = await Promise.all([
                    getAllStudents(),
                    getUsersByRole("parent"),
                ]);

                if (studentResponse.success && studentResponse.students) {
                    setStudents(studentResponse.students);
                } else {
                    setError(studentResponse.error || "Failed to fetch students");
                }

                if (parentResponse) {
                    setParents(parentResponse);
                } else {
                    setError((prev) => prev || "Failed to fetch parents");
                }
            } catch {
                setError("An error occurred while fetching data");
            } finally {
                setLoading(false);
            }
        };

        void fetchData();
    }, []);

    const handleCreateSuccess = (newStudent: ChildDTO) => {
        setStudents([...students, newStudent]);
        setIsCreateModalOpen(false);
    };

    const handleEditSuccess = (updatedStudent: ChildDTO) => {
        setStudents(students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
        setIsEditModalOpen(false);
        setSelectedStudentId(null);
    };

    const handleEditClick = (id: number) => {
        setSelectedStudentId(id);
        setIsEditModalOpen(true);
    };

    const handleViewDetailsClick = (id: number) => {
        setSelectedStudentId(id);
        setIsDetailModalOpen(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-red-100 mb-4"></div>
                    <p className="text-gray-600">Đang tải dữ liệu học sinh...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-red-100 max-w-md">
                    <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <svg
                            className="w-8 h-8 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Đã xảy ra lỗi</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-md"
                    >
                        Thử lại
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-xl p-6 mb-8 shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Quản lý học sinh</h1>
                            <p className="text-red-100 mt-1">
                                Tổng số học sinh: <span className="font-semibold">{students.length}</span>
                            </p>
                        </div>
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700 shadow-md flex items-center"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Thêm học sinh
                        </Button>
                    </div>
                </div>

                {/* Main content */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-red-100">
                    <StudentTable
                        students={students}
                        onEdit={handleEditClick}
                        onViewDetails={handleViewDetailsClick}
                    />
                </div>

                {/* Modals */}
                <StudentCreateModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSuccess={handleCreateSuccess}
                    parents={parents}
                />
                <StudentEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedStudentId(null);
                    }}
                    studentId={selectedStudentId}
                    onSuccess={handleEditSuccess}
                    parents={parents}
                />
                <StudentDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={() => {
                        setIsDetailModalOpen(false);
                        setSelectedStudentId(null);
                    }}
                    studentId={selectedStudentId}
                />
            </div>
        </div>
    );
};

export default StudentPage;