"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChildDTO, User } from "@/types";
import { createStudent, getStudentById } from "@/lib/service/student/student";
import { showSuccessAlert, showErrorAlert } from "@/lib/utils";
import { CreateStudentRequest } from "@/lib/service/student/IStudent";
import {vi} from "date-fns/locale";

interface StudentCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (student: ChildDTO) => void;
    parents: User[];
}

const StudentCreateModal = ({
                                isOpen,
                                onClose,
                                onSuccess,
                                parents
}: StudentCreateModalProps) => {
    const [formData, setFormData] = useState<CreateStudentRequest>({
        studentCode: "",
        fullName: "",
        dateOfBirth: "",
        gender: "",
        className: "",
        parentId: 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<Date>();

    const handleInputChange = (
        field: keyof CreateStudentRequest,
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (
            !formData.studentCode ||
            !formData.fullName ||
            !formData.dateOfBirth ||
            !formData.gender ||
            !formData.className ||
            !formData.parentId
        ) {
            await showErrorAlert("Vui lòng điền đầy đủ thông tin bắt buộc.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await createStudent(formData);
            if (response.success && response.student) {
                await showSuccessAlert("Tạo học sinh thành công!");
                const studentResponse = await getStudentById(Number(response.student.id));
                if (studentResponse.success && studentResponse.student) {
                    onSuccess(studentResponse.student);
                }
                onClose();
            } else {
                await showErrorAlert(response.error || "Tạo học sinh thất bại.");
            }
        } catch (error) {
            await showErrorAlert("Đã xảy ra lỗi khi tạo học sinh.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg bg-white">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-red-800">Thêm học sinh mới</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        <div>
                            <Label htmlFor="studentCode" className="text-gray-700">
                                Mã học sinh *
                            </Label>
                            <Input
                                id="studentCode"
                                value={formData.studentCode}
                                onChange={(e) => handleInputChange("studentCode", e.target.value)}
                                className="mt-1 border-red-200 focus:border-red-500"
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <Label htmlFor="fullName" className="text-gray-700">
                                Họ và tên *
                            </Label>
                            <Input
                                id="fullName"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange("fullName", e.target.value)}
                                className="mt-1 border-red-200 focus:border-red-500"
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
                        <div>
                            <Label htmlFor="gender" className="text-gray-700">
                                Giới tính *
                            </Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(value) => handleInputChange("gender", value)}
                                disabled={isLoading}
                            >
                                <SelectTrigger className="mt-1 border-red-200 focus:border-red-500">
                                    <SelectValue placeholder="Chọn giới tính" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="Nam">Nam</SelectItem>
                                    <SelectItem value="Nữ">Nữ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="className" className="text-gray-700">
                                Lớp *
                            </Label>
                            <Input
                                id="className"
                                value={formData.className}
                                onChange={(e) => handleInputChange("className", e.target.value)}
                                className="mt-1 border-red-200 focus:border-red-500"
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
                            className="border-red-200 text-red-700 hover:bg-red-50"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                        >
                            {isLoading ? "Đang tạo..." : "Tạo học sinh"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default StudentCreateModal;