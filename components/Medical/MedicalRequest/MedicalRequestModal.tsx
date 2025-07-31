"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Save, Plus, CheckCircle, AlertTriangle, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { createStudentMedication } from "@/lib/service/medical-record/student-medication/student-medication";
import { CreateStudentMedicationDto } from "@/lib/service/medical-record/student-medication/IStudent-medication";
import { getAllMedications } from "@/lib/service/medications/medications";
import { getChildrenByParentId } from "@/lib/service/parent/parent";
import { ChildDTO, Medication } from "@/types";

interface MedicalRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

interface MedicalRequestFormData {
    studentId: number;
    studentName: string;
    MedicationName: string;
    Dosage: string;
    Instructions: string;
    administrationTime: string;
    startDate: Date;
    endDate: Date;
    parentConsent: boolean;
}

const MedicalRequestModal = ({
                                 isOpen,
                                 onClose,
                                 onSuccess
}: MedicalRequestModalProps) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const parentId = user?.parentId;
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [medications, setMedications] = useState<Medication[]>([]);
    const [isMedicationsLoading, setIsMedicationsLoading] = useState(true);
    const [children, setChildren] = useState<ChildDTO[]>([]);
    const [isChildrenLoading, setIsChildrenLoading] = useState(true);
    const [formData, setFormData] = useState<MedicalRequestFormData>({
        studentId: 0,
        studentName: "",
        MedicationName: "",
        Dosage: "",
        Instructions: "",
        administrationTime: "",
        startDate: new Date(),
        endDate: new Date(),
        parentConsent: false,
    });

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                setIsMedicationsLoading(true);
                const response = await getAllMedications();
                if (response.success && response.data) {
                    setMedications(response.data);
                } else {
                    setErrorMessage("Không thể tải danh sách thuốc.");
                }
            } catch (error) {
                console.error("Error fetching medications:", error);
                setErrorMessage("Không thể tải danh sách thuốc. Vui lòng thử lại.");
            } finally {
                setIsMedicationsLoading(false);
            }
        };

        void fetchMedications();
    }, []);

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                setIsChildrenLoading(true);
                const response = await getChildrenByParentId(parentId);
                if (response.success && response.children) {
                    setChildren(response.children);
                } else {
                    setErrorMessage("Không thể tải danh sách con em.");
                }
            } catch (error) {
                console.error("Error fetching children:", error);
                setErrorMessage("Không thể tải danh sách con em. Vui lòng thử lại.");
            } finally {
                setIsChildrenLoading(false);
            }
        };

        void fetchChildren();
    }, [parentId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        const errors: string[] = [];
        if (!formData.studentId) errors.push("Vui lòng chọn con em.");
        if (!formData.MedicationName) errors.push("Vui lòng chọn tên thuốc.");
        if (!formData.Dosage) errors.push("Vui lòng nhập liều dùng.");
        if (!formData.Instructions) errors.push("Vui lòng nhập hướng dẫn sử dụng.");
        if (!formData.administrationTime) errors.push("Vui lòng nhập thời gian sử dụng.");
        if (!/^\d{2}:\d{2}:\d{2}$/.test(formData.administrationTime)) {
            errors.push("Thời gian sử dụng phải có định dạng HH:mm:ss (ví dụ: 22:00:00).");
        }
        if (formData.startDate > formData.endDate) {
            errors.push("Ngày bắt đầu phải trước ngày kết thúc.");
        }
        if (!formData.parentConsent) errors.push("Vui lòng xác nhận đồng ý.");

        if (errors.length > 0) {
            setErrorMessage(errors.join(" "));
            setIsLoading(false);
            return;
        }

        try {
            const medicationData: CreateStudentMedicationDto = {
                studentId: formData.studentId,
                medicationName: formData.MedicationName,
                dosage: formData.Dosage,
                instructions: formData.Instructions,
                administrationTime: `${formData.administrationTime}.0000000`,
                startDate: formData.startDate.toISOString(),
                endDate: formData.endDate.toISOString(),
            };

            const response = await createStudentMedication(medicationData);

            if (response.success) {
                setSuccessMessage("Yêu cầu y tế đã được gửi thành công!");
                setTimeout(() => {
                    resetForm();
                    onSuccess?.();
                    onClose();
                }, 1500);
            } else {
                setErrorMessage(response.message || "Có lỗi xảy ra khi gửi yêu cầu.");
            }
        } catch (error) {
            console.error("Error creating student medication:", error);
            setErrorMessage(error instanceof Error ? error.message : "Không thể gửi yêu cầu. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            studentId: 0,
            studentName: "",
            MedicationName: "",
            Dosage: "",
            Instructions: "",
            administrationTime: "",
            startDate: new Date(),
            endDate: new Date(),
            parentConsent: false,
        });
        setSuccessMessage("");
        setErrorMessage("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleInputChange = (
        field: keyof MedicalRequestFormData,
        value: any
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleChildSelect = (childId: string) => {
        const selectedChild = children.find((child) => child.id.toString() === childId);
        if (selectedChild) {
            handleInputChange("studentId", selectedChild.id);
            handleInputChange("studentName", selectedChild.fullName);
        } else {
            handleInputChange("studentId", 0);
            handleInputChange("studentName", "");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center text-red-800">
                            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white mr-3">
                                <Plus className="w-4 h-4" />
                            </div>
                            Tạo Yêu Cầu Y Tế
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Gửi yêu cầu sử dụng thuốc cho con em của bạn tại trường
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        {/* Student Selection */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                Thông tin học sinh
                            </h3>
                            <div className="grid gap-2">
                                <Label htmlFor="studentId" className="text-red-800 font-semibold">
                                    Chọn con em <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.studentId.toString()}
                                    onValueChange={handleChildSelect}
                                    disabled={isLoading || isChildrenLoading || children.length === 0}
                                >
                                    <SelectTrigger className="border-red-200 focus:border-red-500">
                                        <SelectValue
                                            placeholder={
                                                isChildrenLoading
                                                    ? "Đang tải danh sách con em..."
                                                    : children.length === 0
                                                        ? "Không có con em nào"
                                                        : "Chọn con em"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {children.map((child) => (
                                            <SelectItem key={child.id} value={child.id.toString()}>
                                                {child.fullName} (Mã: {child.studentCode}, Tuổi: {child.age}, Giới tính: {child.gender})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Medication Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Thông tin thuốc</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="MedicationName" className="text-red-800 font-semibold">
                                        Tên thuốc <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.MedicationName}
                                        onValueChange={(value) => handleInputChange("MedicationName", value)}
                                        disabled={isLoading || isMedicationsLoading || medications.length === 0}
                                    >
                                        <SelectTrigger className="border-red-200 focus:border-red-500">
                                            <SelectValue
                                                placeholder={
                                                    isMedicationsLoading
                                                        ? "Đang tải danh sách thuốc..."
                                                        : medications.length === 0
                                                            ? "Không có thuốc nào"
                                                            : "Chọn thuốc"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            {medications.map((medication) => (
                                                <SelectItem key={medication.id} value={medication.name}>
                                                    {medication.name} ({medication.type})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="Dosage" className="text-red-800 font-semibold">
                                        Liều dùng <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="Dosage"
                                        name="Dosage"
                                        placeholder="Ví dụ: 2 viên"
                                        value={formData.Dosage}
                                        onChange={(e) => handleInputChange("Dosage", e.target.value)}
                                        className="border-red-200 focus:border-red-500"
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="Instructions" className="text-red-800 font-semibold">
                                        Hướng dẫn sử dụng <span className="text-red-500">*</span>
                                    </Label>
                                    <Textarea
                                        id="Instructions"
                                        name="Instructions"
                                        placeholder="Ví dụ: Dùng nếu đau đầu"
                                        value={formData.Instructions}
                                        onChange={(e) => handleInputChange("Instructions", e.target.value)}
                                        className="border-red-200 focus:border-red-500 min-h-20"
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="administrationTime" className="text-red-800 font-semibold">
                                        Thời gian sử dụng mỗi ngày <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="administrationTime"
                                        name="administrationTime"
                                        type="time"
                                        step="1"
                                        value={formData.administrationTime}
                                        onChange={(e) => handleInputChange("administrationTime", e.target.value)}
                                        className="border-red-200 focus:border-red-500"
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label className="text-red-800 font-semibold">
                                        Ngày bắt đầu <span className="text-red-500">*</span>
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={`border-red-200 focus:border-red-500 justify-start text-left font-normal w-full ${
                                                    !formData.startDate && "text-gray-400"
                                                }`}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {formData.startDate ? format(formData.startDate, "PPP", { locale: vi }) : <span>Chọn ngày bắt đầu</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-white">
                                            <Calendar
                                                mode="single"
                                                selected={formData.startDate}
                                                onSelect={(date) => date && handleInputChange("startDate", date)}
                                                autoFocus={true}
                                                locale={vi}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="grid gap-2">
                                    <Label className="text-red-800 font-semibold">
                                        Ngày kết thúc <span className="text-red-500">*</span>
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={`border-red-200 focus:border-red-500 justify-start text-left font-normal w-full ${
                                                    !formData.endDate && "text-gray-400"
                                                }`}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {formData.endDate ? format(formData.endDate, "PPP", { locale: vi }) : <span>Chọn ngày kết thúc</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-white">
                                            <Calendar
                                                mode="single"
                                                selected={formData.endDate}
                                                onSelect={(date) => date && handleInputChange("endDate", date)}
                                                autoFocus={true}
                                                locale={vi}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>

                        {/* Parent Consent */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="parentConsent"
                                checked={formData.parentConsent}
                                onCheckedChange={(checked) => handleInputChange("parentConsent", checked)}
                                className="border-red-300"
                                disabled={isLoading}
                            />
                            <Label htmlFor="parentConsent" className="text-sm text-gray-700">
                                Tôi xác nhận thông tin trên là chính xác và đồng ý cho nhà trường thực hiện yêu cầu này{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                        </div>

                        {/* Success Message */}
                        {successMessage && (
                            <Alert className="border-green-200 bg-green-50">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
                            </Alert>
                        )}

                        {/* Error Message */}
                        {errorMessage && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>{errorMessage}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isLoading}
                                className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                            >
                                Hủy
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Đang gửi...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Gửi Yêu Cầu
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default MedicalRequestModal;