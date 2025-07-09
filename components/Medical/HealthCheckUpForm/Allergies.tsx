"use client";

import { useState, FormEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertTriangle,
    Loader2,
    Save,
    CheckCircle,
    AlertCircle,
} from "lucide-react";

interface AddAllergyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (formData: AllergyFormData) => Promise<void>;
    profileId: number;
}

export interface AllergyFormData {
    medicalProfileId: number;
    allergyName: string;
    severity: string;
    symptoms: string;
    treatment: string;
}

const Allergies = ({
                       open,
                       onOpenChange,
                       onSubmit,
                       profileId,
                   }: AddAllergyDialogProps) => {
    const [formData, setFormData] = useState<AllergyFormData>({
        medicalProfileId: profileId,
        allergyName: "",
        severity: "",
        symptoms: "",
        treatment: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (field: keyof AllergyFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            await onSubmit(formData);
            setSuccessMessage("Thêm dị ứng thành công!");
            setTimeout(() => {
                setFormData({
                    medicalProfileId: profileId,
                    allergyName: "",
                    severity: "",
                    symptoms: "",
                    treatment: "",
                });
                onOpenChange(false);
            }, 1500);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Có lỗi xảy ra");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center text-red-800">
                            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white mr-3">
                                <AlertTriangle className="w-4 h-4" />
                            </div>
                            Thêm thông tin dị ứng
                        </DialogTitle>
                        <DialogDescription>
                            Điền thông tin chi tiết về dị ứng của học sinh để đảm bảo an toàn sức khỏe.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="allergyName" className="text-red-800 font-semibold">
                                Tên dị ứng <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="allergyName"
                                placeholder="Ví dụ: Dị ứng hải sản, dị ứng phấn hoa..."
                                value={formData.allergyName}
                                onChange={(e) => handleInputChange("allergyName", e.target.value)}
                                className="border-red-200 focus:border-red-500"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="severity" className="text-red-800 font-semibold">
                                Mức độ nghiêm trọng <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.severity}
                                onValueChange={(value) => handleInputChange("severity", value)}
                                disabled={isLoading}
                                required
                            >
                                <SelectTrigger className="border-red-200 focus:border-red-500">
                                    <SelectValue placeholder="Chọn mức độ nghiêm trọng" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="Nhẹ">Nhẹ - Triệu chứng nhẹ, không nguy hiểm</SelectItem>
                                    <SelectItem value="Trung bình">Trung bình - Cần theo dõi và xử lý</SelectItem>
                                    <SelectItem value="Nặng">Nặng - Nguy hiểm, cần xử lý khẩn cấp</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="symptoms" className="text-red-800 font-semibold">
                                Triệu chứng <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="symptoms"
                                placeholder="Mô tả chi tiết các triệu chứng khi tiếp xúc với chất gây dị ứng..."
                                value={formData.symptoms}
                                onChange={(e) => handleInputChange("symptoms", e.target.value)}
                                className="border-red-200 focus:border-red-500 min-h-24"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="treatment" className="text-red-800 font-semibold">
                                Cách điều trị và xử lý
                            </Label>
                            <Textarea
                                id="treatment"
                                placeholder="Hướng dẫn cách xử lý khi xảy ra dị ứng, thuốc cần dùng..."
                                value={formData.treatment}
                                onChange={(e) => handleInputChange("treatment", e.target.value)}
                                className="border-red-200 focus:border-red-500 min-h-24"
                                disabled={isLoading}
                            />
                        </div>

                        {successMessage && (
                            <div className="border border-green-200 bg-green-50 p-3 rounded-md">
                                <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                    <span className="text-green-800">{successMessage}</span>
                                </div>
                            </div>
                        )}

                        {errorMessage && (
                            <div className="border border-red-200 bg-red-50 p-3 rounded-md">
                                <div className="flex items-center">
                                    <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                                    <span className="text-red-800">{errorMessage}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isLoading}
                            className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                            onClick={() => onOpenChange(false)}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Đang lưu...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Lưu thông tin
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Allergies
