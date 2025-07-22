"use client";

import { useState, FormEvent, KeyboardEvent } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Save, Plus, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { showSuccessAlert, showErrorAlert } from "@/lib/utils";
import { CreateMedicalIncidentDto } from "@/lib/service/medical-record/incident/IIncident";
import { createMedicalIncident } from "@/lib/service/medical-record/incident/incident";
import { ChildDTO } from "@/types";

interface NewIncidentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    students: ChildDTO[];
}

interface IncidentFormData {
    studentId: number;
    studentName: string;
    incidentType: string;
    description: string;
    symptoms: string[];
    treatment: string;
    severity: string;
    date: Date;
    parentNotified: boolean;
}

const IncidentModal = ({ isOpen, onClose, onSuccess, students }: NewIncidentModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentSymptom, setCurrentSymptom] = useState("");
    const [formData, setFormData] = useState<IncidentFormData>({
        studentId: 0,
        studentName: "",
        incidentType: "",
        description: "",
        symptoms: [],
        treatment: "",
        severity: "",
        date: new Date(),
        parentNotified: false,
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Validation for incident fields
        if (
            !formData.studentId ||
            !formData.studentName ||
            !formData.incidentType ||
            !formData.description ||
            !formData.symptoms.length ||
            !formData.severity ||
            !formData.date
        ) {
            await showErrorAlert("Vui lòng điền đầy đủ thông tin bắt buộc cho sự cố.");
            setIsLoading(false);
            return;
        }

        try {
            const incidentData: CreateMedicalIncidentDto = {
                studentId: formData.studentId,
                nurseId: 2,
                type: formData.incidentType as "Accident" | "Fever" | "Fall" | "Epidemic" | "Other",
                description: formData.description,
                symptoms: formData.symptoms.join(", "),
                treatment: formData.treatment,
                severity: formData.severity as "Low" | "Medium" | "High",
                incidentDate: formData.date.toISOString(),
                parentNotified: formData.parentNotified,
            };

            const response = await createMedicalIncident(incidentData);

            if (response.success) {
                await showSuccessAlert("Ghi nhận sự cố thành công!");
                setTimeout(() => {
                    resetForm();
                    onSuccess?.();
                    onClose();
                }, 1500);
            } else {
                await showErrorAlert(response.message || "Có lỗi xảy ra khi ghi nhận sự cố.");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định.";
            await showErrorAlert(errorMessage);
            console.error("Error creating incident:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            studentId: 0,
            studentName: "",
            incidentType: "",
            description: "",
            symptoms: [],
            treatment: "",
            severity: "",
            date: new Date(),
            parentNotified: false,
        });
        setCurrentSymptom("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleInputChange = <K extends keyof IncidentFormData>(field: K, value: IncidentFormData[K]) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleStudentSelect = (studentId: string) => {
        if (studentId === "") {
            handleInputChange("studentId", 0);
            handleInputChange("studentName", "");
        } else {
            const selectedStudent = students.find((student) => student.id.toString() === studentId);
            if (selectedStudent) {
                handleInputChange("studentId", selectedStudent.id);
                handleInputChange("studentName", selectedStudent.fullName);
            }
        }
    };

    const handleAddSymptom = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && currentSymptom.trim()) {
            e.preventDefault();
            if (!formData.symptoms.includes(currentSymptom.trim())) {
                handleInputChange("symptoms", [...formData.symptoms, currentSymptom.trim()]);
                setCurrentSymptom("");
            }
        }
    };

    const removeSymptom = (index: number) => {
        const newSymptoms = [...formData.symptoms];
        newSymptoms.splice(index, 1);
        handleInputChange("symptoms", newSymptoms);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white sm:max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <DialogHeader>
                        <DialogTitle className="flex items-center text-red-800 space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white">
                                <Plus className="w-5 h-5" />
                            </div>
                            <span>Ghi nhận sự cố y tế</span>
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 pl-13">
                            Ghi nhận sự cố y tế mới cho học sinh
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 px-1">
                        {/* Student Information Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Thông tin học sinh</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="student" className="text-gray-700 font-medium">
                                        Học sinh <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.studentId === 0 ? "" : formData.studentId.toString()}
                                        onValueChange={handleStudentSelect}
                                        disabled={isLoading || students.length === 0}
                                    >
                                        <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                                            <SelectValue
                                                placeholder={students.length === 0 ? "Không có học sinh" : "Chọn học sinh"}
                                            />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            {students.map((student) => (
                                                <SelectItem key={student.id} value={student.id.toString()}>
                                                    {student.fullName} ({student.studentCode} - {student.className})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Incident Details Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Chi tiết sự cố</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="incidentType" className="text-gray-700 font-medium">
                                        Loại sự cố <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.incidentType}
                                        onValueChange={(value) => handleInputChange("incidentType", value)}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                                            <SelectValue placeholder="Chọn loại sự cố" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="Accident">Tai nạn</SelectItem>
                                            <SelectItem value="Fever">Sốt</SelectItem>
                                            <SelectItem value="Fall">Té ngã</SelectItem>
                                            <SelectItem value="Epidemic">Dịch bệnh</SelectItem>
                                            <SelectItem value="Other">Khác</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="severity" className="text-gray-700 font-medium">
                                        Mức độ nghiêm trọng <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.severity}
                                        onValueChange={(value) => handleInputChange("severity", value)}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                                            <SelectValue placeholder="Chọn mức độ" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="Low">Nhẹ</SelectItem>
                                            <SelectItem value="Medium">Trung bình</SelectItem>
                                            <SelectItem value="High">Nghiêm trọng</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-700 font-medium">
                                        Ngày xảy ra <span className="text-red-500">*</span>
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={`border-gray-300 justify-start text-left font-normal w-full ${
                                                    !formData.date && "text-gray-400"
                                                }`}
                                            >
                                                {formData.date ? format(formData.date, "PPP") : <span>Chọn ngày</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-white">
                                            <Calendar
                                                mode="single"
                                                selected={formData.date}
                                                autoFocus={true}
                                                onSelect={(date) => date && handleInputChange("date", date)}
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>

                        {/* Symptoms Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Triệu chứng</h3>
                            <div className="space-y-2">
                                <Label htmlFor="symptoms" className="text-gray-700 font-medium">
                                    Triệu chứng <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md p-2 min-h-12 bg-gray-50">
                                    {formData.symptoms.map((symptom, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                                        >
                                            {symptom}
                                            <button
                                                type="button"
                                                onClick={() => removeSymptom(index)}
                                                className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    <Input
                                        id="symptoms"
                                        name="symptoms"
                                        value={currentSymptom}
                                        onChange={(e) => setCurrentSymptom(e.target.value)}
                                        onKeyDown={handleAddSymptom}
                                        className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 min-w-[100px]"
                                        placeholder="Nhập triệu chứng rồi nhấn Enter"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description and Treatment Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Thông tin bổ sung</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-gray-700 font-medium">
                                        Mô tả <span className="text-red-500">*</span>
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        className="border-gray-300 focus:border-red-500 focus:ring-red-500 min-h-32"
                                        placeholder="Mô tả chi tiết sự cố..."
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="treatment" className="text-gray-700 font-medium">
                                        Các biện pháp xử lý <span className="text-red-500">*</span>
                                    </Label>
                                    <Textarea
                                        id="treatment"
                                        name="treatment"
                                        value={formData.treatment}
                                        onChange={(e) => handleInputChange("treatment", e.target.value)}
                                        className="border-gray-300 focus:border-red-500 focus:ring-red-500 min-h-32"
                                        placeholder="Ví dụ: Băng bó vết thương, uống thuốc hạ sốt..."
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Parent Notification */}
                        <div className="flex items-center space-x-2 pt-2">
                            <Checkbox
                                id="parentNotified"
                                checked={formData.parentNotified}
                                onCheckedChange={(checked) => handleInputChange("parentNotified", checked as boolean)}
                                disabled={isLoading}
                            />
                            <Label htmlFor="parentNotified" className="text-gray-700 font-medium">
                                Đã thông báo cho phụ huynh
                            </Label>
                        </div>
                    </div>

                    <DialogFooter className="border-t pt-4">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isLoading}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Hủy bỏ
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-sm"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Đang ghi nhận...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Ghi nhận sự cố
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default IncidentModal;