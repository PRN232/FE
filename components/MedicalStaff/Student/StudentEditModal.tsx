"use client";

import { useState, useEffect, FormEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
    Loader2,
    UserCog,
    Calendar as CalendarIcon
} from "lucide-react";
import {
    getStudentById,
    updateStudent
} from "@/lib/service/student/student";
import {
    showSuccessAlert,
    showErrorAlert,
    cn
} from "@/lib/utils";
import {
    UpdateStudentRequest
} from "@/lib/service/student/IStudent";
import { ChildDTO, User } from "@/types";
import {vi} from "date-fns/locale";

interface StudentEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    studentId: number | null;
    onSuccess: (student: ChildDTO) => void;
    parents: User[]
}

const StudentEditModal = ({
                              isOpen,
                              onClose,
                              studentId,
                              onSuccess,
                              parents
}: StudentEditModalProps) => {
    const [formData, setFormData] = useState<UpdateStudentRequest>({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        className: "",
        parentId: 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<Date>();

    useEffect(() => {
        if (studentId) {
            const fetchStudent = async () => {
                setIsLoading(true);
                const response = await getStudentById(studentId);
                if (response.success && response.student) {
                    setFormData({
                        fullName: response.student.fullName,
                        dateOfBirth: new Date(response.student.dateOfBirth).toISOString().split("T")[0],
                        gender: response.student.gender,
                        className: response.student.className,
                        parentId: response.student.parentId,
                    });
                }
                setIsLoading(false);
            };
            void fetchStudent();
        }
    }, [studentId]);

    const handleInputChange = (
        field: keyof UpdateStudentRequest,
        value: string | number
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate);
            handleInputChange("dateOfBirth", selectedDate.toISOString().split("T")[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!studentId) return;

        setIsLoading(true);
        try {
            const response = await updateStudent(studentId, formData);
            if (response.success && response.student) {
                await showSuccessAlert("Cập nhật học sinh thành công!");
                onSuccess(response.student);
                onClose();
            } else {
                await showErrorAlert(response.error || "Cập nhật học sinh thất bại.");
            }
        } catch (error) {
            await showErrorAlert("Đã xảy ra lỗi khi cập nhật học sinh.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg bg-white rounded-xl shadow-xl border-0">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-400 rounded-t-xl" />
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="pt-4">
                        <div className="flex items-center">
                            <div className="p-2 mr-3 rounded-lg bg-red-100 text-red-600">
                                <UserCog className="w-5 h-5" />
                            </div>
                            <div>
                                <DialogTitle className="text-gray-800 text-xl">Cập nhật học sinh</DialogTitle>
                                <p className="text-sm text-gray-500 mt-1">Chỉnh sửa thông tin học sinh</p>
                            </div>
                        </div>
                    </DialogHeader>
                    <div className="space-y-4 mt-6 px-1">
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-gray-700 font-medium">Họ và tên *</Label>
                            <Input
                                id="fullName"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange("fullName", e.target.value)}
                                className="border-gray-300 focus:border-red-300 focus:ring-red-200"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth" className="text-gray-700 font-medium">Ngày sinh *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal border-gray-300 hover:bg-red-50",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 text-red-600" />
                                        {date ? format(date, "PPP") : <span>Chọn ngày sinh</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={handleDateSelect}
                                        autoFocus={true}
                                        locale={vi}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        className="border-0"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender" className="text-gray-700 font-medium">Giới tính *</Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(value) => handleInputChange("gender", value)}
                                disabled={isLoading}
                            >
                                <SelectTrigger className="border-gray-300 focus:border-red-300 focus:ring-red-200">
                                    <SelectValue placeholder="Chọn giới tính" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="Nam">Nam</SelectItem>
                                    <SelectItem value="Nữ">Nữ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="className" className="text-gray-700 font-medium">Lớp *</Label>
                            <Input
                                id="className"
                                value={formData.className}
                                onChange={(e) => handleInputChange("className", e.target.value)}
                                className="border-gray-300 focus:border-red-300 focus:ring-red-200"
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <Label htmlFor="parentId" className="text-gray-700">
                                Phụ huynh *
                            </Label>
                            <Select
                                value={formData.parentId?.toString() || ""}
                                onValueChange={(value) => handleInputChange("parentId", Number(value))}
                                disabled={isLoading || parents.length === 0}
                            >
                                <SelectTrigger className="mt-1 border-red-200 focus:border-red-500">
                                    <SelectValue placeholder={parents.length === 0 ? "Không có phụ huynh" : "Chọn phụ huynh"} />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    {parents.map((parent) => (
                                        <SelectItem key={parent.id} value={parent.id}>
                                            {parent.name} ({parent.email})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-sm"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Đang cập nhật...
                                </>
                            ) : "Cập nhật"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default StudentEditModal;