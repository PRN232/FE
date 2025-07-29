import { ChildDTO } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Calendar, User, Hash, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface StudentTableProps {
    students: ChildDTO[];
    onEdit: (id: number) => void;
    onViewDetails: (id: number) => void;
}

const StudentTable = ({
                          students,
                          onEdit,
                          onViewDetails
}: StudentTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5);

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(students.length / studentsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
            <Table className="border-collapse">
                <TableHeader className="bg-gradient-to-r from-red-50 to-red-100">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="py-4 px-6 font-semibold text-gray-700 text-base">
                            <div className="flex items-center">
                                <Hash className="w-5 h-5 mr-2 text-red-600" />
                                Mã học sinh
                            </div>
                        </TableHead>
                        <TableHead className="py-4 px-6 font-semibold text-gray-700 text-base">
                            <div className="flex items-center">
                                <User className="w-5 h-5 mr-2 text-red-600" />
                                Họ và tên
                            </div>
                        </TableHead>
                        <TableHead className="py-4 px-6 font-semibold text-gray-700 text-base">
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-red-600" />
                                Ngày sinh
                            </div>
                        </TableHead>
                        <TableHead className="py-4 px-6 font-semibold text-gray-700 text-base">
                            Giới tính
                        </TableHead>
                        <TableHead className="py-4 px-6 font-semibold text-gray-700 text-base">
                            <div className="flex items-center">
                                <Users className="w-5 h-5 mr-2 text-red-600" />
                                Lớp
                            </div>
                        </TableHead>
                        <TableHead className="py-4 px-6 font-semibold text-gray-700 text-base text-right">
                            Hành động
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="text-center text-gray-500 py-8 bg-red-50/50 text-lg"
                            >
                                <div className="flex flex-col items-center justify-center">
                                    <User className="w-12 h-12 text-gray-400 mb-4" />
                                    <p>Không có học sinh nào</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        currentStudents.map((student) => (
                            <TableRow
                                key={student.id}
                                className="border-t border-red-50 hover:bg-red-50/30 transition-colors duration-150"
                            >
                                <TableCell className="py-4 px-6 font-medium text-gray-900 text-base">
                                    {student.studentCode}
                                </TableCell>
                                <TableCell className="py-4 px-6 text-base">
                                    <div className="font-medium text-gray-900">
                                        {student.fullName}
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-gray-600 text-base">
                                    {new Date(student.dateOfBirth).toLocaleDateString("vi-VN")}
                                </TableCell>
                                <TableCell className="py-4 px-6 text-base">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        student.gender === 'Nam'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-pink-100 text-pink-800'
                                    }`}>
                                        {student.gender}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-gray-600 text-base">
                                    {student.className}
                                </TableCell>
                                <TableCell className="py-4 px-6 text-base">
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(student.id)}
                                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm text-sm"
                                        >
                                            <Edit className="w-4 h-4 mr-2" />
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onViewDetails(student.id)}
                                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm text-sm"
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            Chi tiết
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Pagination */}
            {students.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-red-100 bg-red-50/50">
                    <div className="text-sm text-gray-600">
                        Hiển thị {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, students.length)} của {students.length} học sinh
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <Button
                                key={number}
                                variant={currentPage === number ? "default" : "outline"}
                                size="sm"
                                onClick={() => paginate(number)}
                                className={`${
                                    currentPage === number
                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                        : 'border-red-200 text-red-600 hover:bg-red-50'
                                }`}
                            >
                                {number}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentTable;