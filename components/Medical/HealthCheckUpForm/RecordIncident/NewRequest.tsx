"use client";

import { useState, FormEvent } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Save, Plus, CheckCircle, AlertTriangle } from "lucide-react";
import {
    createHealthCheckupResult
} from "@/lib/service/health-checkup-result/health-checkup-result";
import { ChildDTO } from "@/types";
import {
    CreateHealthCheckupResultDto
} from "@/lib/service/health-checkup-result/IHealth-checkup-result";

interface NewHealthRecordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    selectedChild?: ChildDTO;
}

const NewRequest = ({
                        isOpen,
                        onClose,
                        onSuccess,
                        selectedChild
}: NewHealthRecordModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState<CreateHealthCheckupResultDto>({
        studentId: selectedChild?.id || 0,
        studentName: selectedChild?.fullName || "",
        height: 0,
        weight: 0,
        bloodPressure: "",
        visionTest: "",
        hearingTest: "",
        generalHealth: "",
        requiresFollowup: false,
        recommendations: "",
        checkupDate: new Date().toISOString(),
    });

    const handleSubmit = async (
        e: FormEvent
    ) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        // Validation
        if (
            !formData.studentId ||
            !formData.studentName ||
            !formData.height ||
            !formData.weight ||
            !formData.bloodPressure ||
            !formData.visionTest ||
            !formData.hearingTest ||
            !formData.generalHealth
        ) {
            setErrorMessage("Vui lòng điền đầy đủ thông tin bắt buộc.");
            setIsLoading(false);
            return;
        }

        try {
            const resultData: CreateHealthCheckupResultDto = {
                ...formData,
                studentId: selectedChild?.id || formData.studentId,
            };

            await createHealthCheckupResult(resultData);

            setSuccessMessage("Ghi nhận hồ sơ sức khỏe thành công!");

            setTimeout(() => {
                resetForm();
                onSuccess?.();
                onClose();
            }, 1500);
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : "Failed to create health record"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            studentId: selectedChild?.id || 0,
            studentName: selectedChild?.fullName || "",
            height: 0,
            weight: 0,
            bloodPressure: "",
            visionTest: "",
            hearingTest: "",
            generalHealth: "",
            requiresFollowup: false,
            recommendations: "",
            checkupDate: new Date().toISOString(),
        });
        setSuccessMessage("");
        setErrorMessage("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleInputChange = (
        field: keyof CreateHealthCheckupResultDto,
        value: string | number | boolean
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
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
                            Khai báo hồ sơ sức khỏe
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Ghi nhận hồ sơ sức khỏe mới cho học sinh
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Student Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    disabled={isLoading || !!selectedChild}
                                />
                            </div>
                        </div>

                        {/* Health Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="height" className="text-red-800 font-semibold">
                                    Chiều cao (cm) <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="height"
                                    name="height"
                                    type="number"
                                    placeholder="Chiều cao (cm)"
                                    value={formData.height || ""}
                                    onChange={(e) => handleInputChange("height", parseInt(e.target.value) || 0)}
                                    className="border-red-200 focus:border-red-500"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="weight" className="text-red-800 font-semibold">
                                    Cân nặng (kg) <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="weight"
                                    name="weight"
                                    type="number"
                                    placeholder="Cân nặng (kg)"
                                    value={formData.weight || ""}
                                    onChange={(e) => handleInputChange("weight", parseInt(e.target.value) || 0)}
                                    className="border-red-200 focus:border-red-500"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="bloodPressure" className="text-red-800 font-semibold">
                                    Huyết áp <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="bloodPressure"
                                    name="bloodPressure"
                                    placeholder="Huyết áp (e.g., 100/65 mmHg)"
                                    value={formData.bloodPressure}
                                    onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                                    className="border-red-200 focus:border-red-500"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Health Assessments */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="visionTest" className="text-red-800 font-semibold">
                                    Kết quả thị lực <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="visionTest"
                                    name="visionTest"
                                    placeholder="Kết quả thị lực"
                                    value={formData.visionTest}
                                    onChange={(e) => handleInputChange("visionTest", e.target.value)}
                                    className="border-red-200 focus:border-red-500"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="hearingTest" className="text-red-800 font-semibold">
                                    Kết quả thính lực <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="hearingTest"
                                    name="hearingTest"
                                    placeholder="Kết quả thính lực"
                                    value={formData.hearingTest}
                                    onChange={(e) => handleInputChange("hearingTest", e.target.value)}
                                    className="border-red-200 focus:border-red-500"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* General Health and Recommendations */}
                        <div className="grid gap-2">
                            <Label htmlFor="generalHealth" className="text-red-800 font-semibold">
                                Sức khỏe tổng thể <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="generalHealth"
                                name="generalHealth"
                                value={formData.generalHealth}
                                onChange={(e) => handleInputChange("generalHealth", e.target.value)}
                                className="border-red-200 focus:border-red-500 min-h-24"
                                placeholder="Sức khỏe tổng thể..."
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="recommendations" className="text-red-800 font-semibold">
                                Khuyến nghị
                            </Label>
                            <Textarea
                                id="recommendations"
                                name="recommendations"
                                value={formData.recommendations}
                                onChange={(e) => handleInputChange("recommendations", e.target.value)}
                                className="border-red-200 focus:border-red-500 min-h-20"
                                placeholder="Khuyến nghị..."
                                disabled={isLoading}
                            />
                        </div>

                        {/* Checkboxes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="requiresFollowup"
                                    checked={formData.requiresFollowup}
                                    onChange={(e) => handleInputChange("requiresFollowup", e.target.checked)}
                                    className="rounded border-red-300 text-red-600 focus:ring-red-500"
                                    disabled={isLoading}
                                />
                                <Label htmlFor="requiresFollowup" className="text-sm text-gray-700">
                                    Cần theo dõi thêm
                                </Label>
                            </div>
                        </div>

                        {/* Success Message */}
                        {successMessage && (
                            <Alert className="border-green-200 bg-green-50">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800">
                                    {successMessage}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Error Message */}
                        {errorMessage && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>
                                    {errorMessage}
                                </AlertDescription>
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
                                    Đang ghi nhận...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Ghi nhận hồ sơ sức khỏe
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewRequest;