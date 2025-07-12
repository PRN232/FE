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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Save, Plus, CheckCircle, AlertTriangle, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
    createIncidentWithMedication
} from "@/lib/service/medical-record/incident-medication-service";
import {
    CreateMedicalIncidentDto
} from "@/lib/service/medical-record/incident/IIncident";
import {
    CreateMedicationGivenDto
} from "@/lib/service/medical-record/medication-given/IMedication-given";

interface NewIncidentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

interface IncidentFormData {
    studentId: number;
    nurseId: number;
    studentName: string;
    incidentType: string;
    description: string;
    symptoms: string[];
    treatment: string;
    severity: string;
    date: Date;
    medicationId: string;
    dosage: string;
    request: string;
}

const IncidentModal = ({
                           isOpen,
                           onClose,
                           onSuccess
}: NewIncidentModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentSymptom, setCurrentSymptom] = useState("");
    const [formData, setFormData] = useState<IncidentFormData>({
        studentId: 0,
        nurseId: 0,
        studentName: "",
        incidentType: "",
        description: "",
        symptoms: [],
        treatment: "",
        severity: "",
        date: new Date(),
        medicationId: "",
        dosage: "",
        request: "",
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        // Validation for incident fields
        if (
            !formData.studentId ||
            !formData.nurseId ||
            !formData.studentName ||
            !formData.incidentType ||
            !formData.description ||
            !formData.symptoms.length ||
            !formData.severity ||
            !formData.date ||
            !formData.request
        ) {
            setErrorMessage("Vui lòng điền đầy đủ thông tin bắt buộc cho sự cố, bao gồm yêu cầu.");
            setIsLoading(false);
            return;
        }

        // Validation for medication fields
        if (formData.medicationId || formData.dosage) {
            if (!formData.medicationId || !formData.dosage) {
                setErrorMessage("Vui lòng điền đầy đủ thông tin thuốc (ID và liều lượng) nếu sử dụng thuốc.");
                setIsLoading(false);
                return;
            }
            if (isNaN(parseInt(formData.medicationId, 10))) {
                setErrorMessage("ID thuốc phải là một số hợp lệ.");
                setIsLoading(false);
                return;
            }
        }

        try {
            const incidentData: CreateMedicalIncidentDto = {
                studentId: formData.studentId,
                nurseId: formData.nurseId,
                type: formData.incidentType as "Accident" | "Fever" | "Fall" | "Epidemic" | "Other",
                description: formData.description,
                symptoms: formData.symptoms.join(", "),
                treatment: formData.treatment,
                severity: formData.severity as "Low" | "Medium" | "High",
                incidentDate: formData.date.toISOString(),
                parentNotified: false,
                request: formData.request,
            };

            const medicationData: CreateMedicationGivenDto | undefined =
                formData.medicationId && formData.dosage
                    ? {
                        incidentId: 0, // Will be updated by service
                        medicationId: parseInt(formData.medicationId, 10),
                        dosage: formData.dosage,
                    }
                    : undefined;

            const response = await createIncidentWithMedication(
                incidentData,
                medicationData
            );

            if (response.success) {
                setSuccessMessage("Ghi nhận sự cố và thuốc (nếu có) thành công!");
                setTimeout(() => {
                    resetForm();
                    onSuccess?.();
                    onClose();
                }, 1500);
            } else {
                setErrorMessage(response.error || "Không thể ghi nhận sự cố hoặc thuốc.");
            }
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định.");
            console.error("Error creating incident or medication:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            studentId: 0,
            nurseId: 0,
            studentName: "",
            incidentType: "",
            description: "",
            symptoms: [],
            treatment: "",
            severity: "",
            date: new Date(),
            medicationId: "",
            dosage: "",
            request: "",
        });
        setCurrentSymptom("");
        setSuccessMessage("");
        setErrorMessage("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleInputChange = <K extends keyof IncidentFormData>(
        field: K,
        value: IncidentFormData[K]
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddSymptom = (
        e: KeyboardEvent<HTMLInputElement>
    ) => {
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
            <DialogContent className="bg-white sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center text-red-800">
                            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white mr-3">
                                <Plus className="w-4 h-4" />
                            </div>
                            Ghi nhận sự cố y tế
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Ghi nhận sự cố y tế mới cho học sinh
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Student and Nurse Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="studentId" className="text-red-800 font-semibold">
                                        ID Học sinh <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="studentId"
                                        name="studentId"
                                        type="number"
                                        placeholder="Nhập ID học sinh"
                                        value={formData.studentId || ""}
                                        onChange={(e) => handleInputChange("studentId", parseInt(e.target.value, 10) || 0)}
                                        className="border-red-200 focus:border-red-500"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="studentName" className="text-red-800 font-semibold">
                                        Tên học sinh <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="studentName"
                                        name="studentName"
                                        placeholder="Tên học sinh"
                                        value={formData.studentName}
                                        onChange={(e) => handleInputChange("studentName", e.target.value)}
                                        className="border-red-200 focus:border-red-500"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="nurseId" className="text-red-800 font-semibold">
                                        ID Y tá <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="nurseId"
                                        name="nurseId"
                                        type="number"
                                        placeholder="Nhập ID y tá"
                                        value={formData.nurseId || ""}
                                        onChange={(e) => handleInputChange("nurseId", parseInt(e.target.value, 10) || 0)}
                                        className="border-red-200 focus:border-red-500"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="incidentType" className="text-red-800 font-semibold">
                                        Loại sự cố <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.incidentType}
                                        onValueChange={(value) => handleInputChange("incidentType", value)}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger className="border-red-200 focus:border-red-500">
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
                            </div>
                        </div>

                        {/* Severity and Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="severity" className="text-red-800 font-semibold">
                                    Mức độ nghiêm trọng <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.severity}
                                    onValueChange={(value) => handleInputChange("severity", value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="border-red-200 focus:border-red-500">
                                        <SelectValue placeholder="Chọn mức độ" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="Low">Nhẹ</SelectItem>
                                        <SelectItem value="Medium">Trung bình</SelectItem>
                                        <SelectItem value="High">Nghiêm trọng</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-red-800 font-semibold">
                                    Ngày xảy ra <span className="text-red-500">*</span>
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`border-red-200 justify-start text-left font-normal ${
                                                !formData.date && "text-muted-foreground"
                                            }`}
                                        >
                                            {formData.date ? format(formData.date, "PPP") : <span>Chọn ngày</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={formData.date}
                                            onSelect={(date) => date && handleInputChange("date", date)}
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {/* Request Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="request" className="text-red-800 font-semibold">
                                Yêu cầu <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="request"
                                name="request"
                                placeholder="Nhập yêu cầu (ví dụ: Yêu cầu sơ cứu)"
                                value={formData.request}
                                onChange={(e) => handleInputChange("request", e.target.value)}
                                className="border-red-200 focus:border-red-500"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Symptoms */}
                        <div className="grid gap-2">
                            <Label htmlFor="symptoms" className="text-red-800 font-semibold">
                                Triệu chứng <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex flex-wrap gap-2 border border-red-200 rounded-md p-2 min-h-10">
                                {formData.symptoms.map((symptom, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {symptom}
                                        <button
                                            type="button"
                                            onClick={() => removeSymptom(index)}
                                            className="ml-2 text-red-500 hover:text-red-700"
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
                                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 min-w-[100px]"
                                    placeholder="Nhập triệu chứng"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Description and Treatment */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="description" className="text-red-800 font-semibold">
                                    Mô tả <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    className="border-red-200 focus:border-red-500 min-h-24"
                                    placeholder="Mô tả chi tiết sự cố..."
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="treatment" className="text-red-800 font-semibold">
                                    Các biện pháp xử lý <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="treatment"
                                    name="treatment"
                                    value={formData.treatment}
                                    onChange={(e) => handleInputChange("treatment", e.target.value)}
                                    className="border-red-200 focus:border-red-500 min-h-24"
                                    placeholder="Các biện pháp xử lý đã thực hiện..."
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Medication Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="medicationId" className="text-red-800 font-semibold">
                                    ID Thuốc
                                </Label>
                                <Input
                                    id="medicationId"
                                    name="medicationId"
                                    type="number"
                                    placeholder="Nhập ID thuốc (nếu có)"
                                    value={formData.medicationId}
                                    onChange={(e) => handleInputChange("medicationId", e.target.value)}
                                    className="border-red-200 focus:border-red-500"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="dosage" className="text-red-800 font-semibold">
                                    Liều lượng
                                </Label>
                                <Input
                                    id="dosage"
                                    name="dosage"
                                    placeholder="Nhập liều lượng (nếu có)"
                                    value={formData.dosage}
                                    onChange={(e) => handleInputChange("dosage", e.target.value)}
                                    className="border-red-200 focus:border-red-500"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Success and Error Messages */}
                        {successMessage && (
                            <Alert className="border-green-200 bg-green-50">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
                            </Alert>
                        )}
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
                                Hủy bỏ
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