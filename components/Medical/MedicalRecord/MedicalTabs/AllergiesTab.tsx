"use client";

import { useState } from "react";
import Swal from "sweetalert2";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    AlertTriangle,
    Plus,
    Edit,
    Trash2,
    Check,
    X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import Allergies from "@/components/Medical/HealthCheckUpForm/Allergies";
import type { Allergy } from "@/lib/service/medical-record/allergies/IAllergies";
import type { ApiMedicalProfile } from "@/lib/service/medical-profile/IMedical";
import type { AllergyFormData } from "@/components/Medical/HealthCheckUpForm/Allergies";
import {
    getSeverityColor,
    getSeverityText,
    showSuccessAlert,
    showErrorAlert
} from "@/lib/utils";
import {
    createAllergy,
    updateAllergy,
    deleteAllergy
} from "@/lib/service/medical-record/allergies/allergies";

interface AllergiesTabProps {
    profile?: ApiMedicalProfile;
    onUpdate?: () => void;
}

type SeverityLevel = "Nhẹ" | "Trung bình" | "Nặng";

const AllergiesTab = ({
                          profile,
                          onUpdate
}: AllergiesTabProps) => {
    console.log(profile)

    const [allergies, setAllergies] = useState<Allergy[]>(profile?.allergies || []);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [editingAllergy, setEditingAllergy] = useState<Allergy | null>(null);
    const [tempAllergy, setTempAllergy] = useState<Partial<Allergy> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const hasAllergies = allergies.length > 0;

    const handleAddAllergy = async (formData: AllergyFormData): Promise<void> => {
        if (!profile?.id) {
            showErrorAlert("Không tìm thấy thông tin hồ sơ y tế.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const newAllergy = await createAllergy(profile.id, formData);
            setAllergies([...allergies, newAllergy]);
            onUpdate?.();
            showSuccessAlert("Đã thêm dị ứng thành công!");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi thêm dị ứng";
            setError(errorMessage);
            showErrorAlert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditAllergy = (
        allergy: Allergy
    ): void => {
        setEditingAllergy(allergy);
        setTempAllergy({ ...allergy });
    };

    const handleCancelEdit = (): void => {
        setEditingAllergy(null);
        setTempAllergy(null);
    };

    const handleUpdateAllergy = async (): Promise<void> => {
        if (!tempAllergy || !profile?.id || !editingAllergy) return;

        setIsLoading(true);
        setError(null);

        try {
            const updatedAllergy = await updateAllergy(profile.id, {
                ...tempAllergy,
                id: editingAllergy.id,
                medicalProfileId: profile.id
            } as Allergy);

            setAllergies(allergies.map(a =>
                a.id === editingAllergy.id ? updatedAllergy : a
            ));
            setEditingAllergy(null);
            setTempAllergy(null);
            onUpdate?.();
            showSuccessAlert("Đã cập nhật thông tin dị ứng thành công!");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi cập nhật dị ứng";
            setError(errorMessage);
            showErrorAlert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAllergy = async (allergyId: number): Promise<void> => {
        if (!profile?.id) return;

        const result = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: "Bạn sẽ không thể hoàn tác hành động này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });

        if (!result.isConfirmed) return;

        setIsLoading(true);
        setError(null);

        try {
            await deleteAllergy(profile.id, allergyId);
            setAllergies(allergies.filter(a => a.id !== allergyId));
            onUpdate?.();
            showSuccessAlert("Đã xóa thông tin dị ứng thành công!");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi xóa dị ứng";
            setError(errorMessage);
            showErrorAlert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-50 to-red-100/80 border-b border-red-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <CardTitle className="flex items-center text-red-800">
                            <div className="p-2 mr-2 rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200 transition-colors duration-300">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <span>Thông tin dị ứng</span>
                        </CardTitle>
                        <Button
                            onClick={() => setIsDialogOpen(true)}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-md transition-all duration-300"
                            size="sm"
                            disabled={isLoading}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Thêm dị ứng
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    {hasAllergies ? (
                        <div className="space-y-4">
                            {allergies.map((allergy) => (
                                <div
                                    key={allergy.id}
                                    className="relative p-4 border border-red-200 rounded-lg bg-gradient-to-r from-red-50 to-white hover:shadow-md transition-all duration-200"
                                >
                                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-500 to-red-600 rounded-l-lg" />
                                    <div className="pl-4">
                                        {editingAllergy?.id === allergy.id ? (
                                            <div className="space-y-4">
                                                <Input
                                                    value={tempAllergy?.allergyName || ""}
                                                    onChange={(e) => setTempAllergy({
                                                        ...tempAllergy!,
                                                        allergyName: e.target.value
                                                    })}
                                                    className="font-semibold text-gray-900"
                                                />

                                                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                            Mức độ
                                                        </p>
                                                        <Select
                                                            value={tempAllergy?.severity || ""}
                                                            onValueChange={(value: SeverityLevel) => setTempAllergy({
                                                                ...tempAllergy!,
                                                                severity: value
                                                            })}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Chọn mức độ" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-white">
                                                                <SelectItem value="Nhẹ">Nhẹ</SelectItem>
                                                                <SelectItem value="Trung bình">Trung bình</SelectItem>
                                                                <SelectItem value="Nặng">Nặng</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Triệu chứng</p>
                                                        <Textarea
                                                            value={tempAllergy?.symptoms || ""}
                                                            onChange={(e) => setTempAllergy({
                                                                ...tempAllergy!,
                                                                symptoms: e.target.value
                                                            })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                            Điều trị
                                                        </p>
                                                        <Textarea
                                                            value={tempAllergy?.treatment || ""}
                                                            onChange={(e) => setTempAllergy({
                                                                ...tempAllergy!,
                                                                treatment: e.target.value
                                                            })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex justify-end space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={handleCancelEdit}
                                                        disabled={isLoading}
                                                    >
                                                        <X className="w-4 h-4 mr-2" />
                                                        Hủy
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className="bg-red-600 hover:bg-red-700"
                                                        onClick={handleUpdateAllergy}
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? (
                                                            <span className="animate-spin">↻</span>
                                                        ) : (
                                                            <Check className="w-4 h-4 mr-2" />
                                                        )}
                                                        Lưu
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900">
                                                            {allergy.allergyName}
                                                        </h3>
                                                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-3">
                                                            <div>
                                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Mức độ</p>
                                                                <p className="text-sm font-semibold text-gray-900">
                                                                    {getSeverityText(allergy.severity)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end space-y-2">
                                                        <Badge className={getSeverityColor(allergy.severity)} variant="outline">
                                                            {getSeverityText(allergy.severity)}
                                                        </Badge>
                                                        <div className="flex space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 bg-transparent"
                                                                onClick={() => handleEditAllergy(allergy)}
                                                                disabled={isLoading}
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 bg-transparent"
                                                                onClick={() => handleDeleteAllergy(allergy.id)}
                                                                disabled={isLoading}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                            Triệu chứng
                                                        </p>
                                                        <p className="text-sm text-gray-600 bg-white/80 p-2 rounded">
                                                            {allergy.symptoms || "Không có thông tin"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                            Điều trị
                                                        </p>
                                                        <p className="text-sm text-gray-600 bg-white/80 p-2 rounded">
                                                            {allergy.treatment || "Không có thông tin"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                                <AlertTriangle className="h-8 w-8" />
                            </div>
                            <h3 className="mt-4 text-sm font-medium text-gray-900">
                                Không có dị ứng nào được ghi nhận
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 mb-4">
                                Nhấn nút thêm dị ứng để bổ sung thông tin
                            </p>
                            <Button
                                onClick={() => setIsDialogOpen(true)}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                                size="sm"
                                disabled={isLoading}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Thêm dị ứng
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Allergies
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSubmit={handleAddAllergy}
                profileId={profile?.id || 0}
            />
        </div>
    );
};

export default AllergiesTab;