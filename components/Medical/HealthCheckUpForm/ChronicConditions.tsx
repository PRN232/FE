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
    Loader2,
    Save,
    CheckCircle,
    AlertCircle,
    HeartPulse
} from "lucide-react";

export interface ChronicDiseaseFormData {
    medicalProfileId: number;
    diseaseName: string;
    medication: string;
    instructions: string;
}

interface ChronicDiseaseFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: ChronicDiseaseFormData) => Promise<void>;
    profileId: number;
}

const ChronicConditions = ({
                               open,
                               onOpenChange,
                               onSubmit,
                               profileId
                           }: ChronicDiseaseFormProps) => {
    const [formData, setFormData] = useState<ChronicDiseaseFormData>({
        medicalProfileId: profileId,
        diseaseName: "",
        medication: "",
        instructions: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (
        field: keyof ChronicDiseaseFormData,
        value: string
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (
        e: FormEvent
    ) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            await onSubmit(formData);
            setSuccessMessage("Thêm bệnh mãn tính thành công!");
            setTimeout(() => {
                setFormData({
                    medicalProfileId: profileId,
                    diseaseName: "",
                    medication: "",
                    instructions: ""
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
                                <HeartPulse className="w-4 h-4" />
                            </div>
                            Thêm thông tin bệnh mãn tính
                        </DialogTitle>
                        <DialogDescription>
                            Điền thông tin chi tiết về bệnh mãn tính để đảm bảo theo dõi và chăm sóc sức khỏe tốt nhất.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="diseaseName" className="text-red-800 font-semibold">
                                Tên bệnh <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="diseaseName"
                                placeholder="Ví dụ: Hen suyễn, tiểu đường, cao huyết áp..."
                                value={formData.diseaseName}
                                onChange={(e) => handleInputChange("diseaseName", e.target.value)}
                                className="border-red-200 focus:border-red-500"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="medication" className="text-red-800 font-semibold">
                                Thuốc điều trị <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="medication"
                                placeholder="Liệt kê các loại thuốc đang sử dụng, liều lượng..."
                                value={formData.medication}
                                onChange={(e) => handleInputChange("medication", e.target.value)}
                                className="border-red-200 focus:border-red-500 min-h-24"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="instructions" className="text-red-800 font-semibold">
                                Hướng dẫn chăm sóc
                            </Label>
                            <Textarea
                                id="instructions"
                                placeholder="Hướng dẫn chăm sóc, lưu ý đặc biệt, chế độ sinh hoạt..."
                                value={formData.instructions}
                                onChange={(e) => handleInputChange("instructions", e.target.value)}
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

export default ChronicConditions;