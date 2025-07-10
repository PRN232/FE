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
    Heart,
    Plus,
    Edit,
    Trash2,
    Check,
    X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    ChronicDisease
} from "@/lib/service/medical-record/chronic-diseases/IChronic-diseases";
import type { ApiMedicalProfile } from "@/lib/service/medical-profile/IMedical";
import {
    createChronicDisease,
    updateChronicDisease,
    deleteChronicDisease
} from "@/lib/service/medical-record/chronic-diseases/chronic-diseases";
import ChronicConditions from "@/components/Medical/HealthCheckUpForm/ChronicConditions";
import type {
    ChronicDiseaseFormData
} from "@/components/Medical/HealthCheckUpForm/ChronicConditions";

import {
    showErrorAlert,
    showSuccessAlert
} from "@/lib/utils";

interface ConditionsTabProps {
    profile?: ApiMedicalProfile;
    onUpdate?: () => void;
}

const ConditionsTab = ({
                           profile,
                           onUpdate
}: ConditionsTabProps) => {
    const [chronicDiseases, setChronicDiseases] = useState<ChronicDisease[]>(profile?.chronicDiseases || []);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingDisease, setEditingDisease] = useState<ChronicDisease | null>(null);
    const [tempDisease, setTempDisease] = useState<Partial<ChronicDisease> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const hasConditions = chronicDiseases.length > 0;

    const handleAddChronicDisease = async (
        formData: ChronicDiseaseFormData
    ): Promise<void> => {
        if (!profile?.id) {
            showErrorAlert("Không tìm thấy thông tin hồ sơ y tế.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const newDisease = await createChronicDisease(profile.id, formData);
            setChronicDiseases([...chronicDiseases, newDisease]);
            onUpdate?.();
            showSuccessAlert("Đã thêm bệnh mãn tính thành công!");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi thêm bệnh mãn tính";
            setError(errorMessage);
            showErrorAlert(errorMessage);
        } finally {
            setIsLoading(false);
            setIsDialogOpen(false);
        }
    };

    const handleEditDisease = (disease: ChronicDisease): void => {
        setEditingDisease(disease);
        setTempDisease({ ...disease });
    };

    const handleCancelEdit = (): void => {
        setEditingDisease(null);
        setTempDisease(null);
    };

    const handleUpdateDisease = async (): Promise<void> => {
        if (!tempDisease || !profile?.id || !editingDisease) return;

        setIsLoading(true);
        setError(null);

        try {
            const updatedDisease = await updateChronicDisease(profile.id, {
                ...tempDisease,
                id: editingDisease.id,
                medicalProfileId: profile.id
            } as ChronicDisease);

            setChronicDiseases(chronicDiseases.map(d =>
                d.id === editingDisease.id ? updatedDisease : d
            ));
            setEditingDisease(null);
            setTempDisease(null);
            onUpdate?.();
            showSuccessAlert("Đã cập nhật thông tin bệnh thành công!");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi cập nhật bệnh";
            setError(errorMessage);
            showErrorAlert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteDisease = async (diseaseId: number): Promise<void> => {
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
            await deleteChronicDisease(profile.id, diseaseId);
            setChronicDiseases(chronicDiseases.filter(d => d.id !== diseaseId));
            onUpdate?.();
            showSuccessAlert("Đã xóa thông tin bệnh thành công!");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi xóa bệnh";
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
                                <Heart className="w-5 h-5" />
                            </div>
                            <span>Bệnh mãn tính</span>
                        </CardTitle>
                        <Button
                            onClick={() => setIsDialogOpen(true)}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-md transition-all duration-300"
                            size="sm"
                            disabled={isLoading}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Thêm bệnh
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    {hasConditions ? (
                        <div className="space-y-4">
                            {chronicDiseases.map((disease) => (
                                <div
                                    key={disease.id}
                                    className="relative p-4 border border-red-200 rounded-lg bg-gradient-to-r from-red-50 to-white hover:shadow-md transition-all duration-200"
                                >
                                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-500 to-red-600 rounded-l-lg" />
                                    <div className="pl-4">
                                        {editingDisease?.id === disease.id ? (
                                            <div className="space-y-4">
                                                <Input
                                                    value={tempDisease?.diseaseName || ""}
                                                    onChange={(e) => setTempDisease({
                                                        ...tempDisease,
                                                        diseaseName: e.target.value
                                                    })}
                                                    className="font-semibold text-gray-900"
                                                    placeholder="Tên bệnh"
                                                />

                                                <div>
                                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Thuốc điều trị</p>
                                                    <Textarea
                                                        value={tempDisease?.medication || ""}
                                                        onChange={(e) => setTempDisease({
                                                            ...tempDisease,
                                                            medication: e.target.value
                                                        })}
                                                        placeholder="Thuốc đang sử dụng"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Hướng dẫn</p>
                                                    <Textarea
                                                        value={tempDisease?.instructions || ""}
                                                        onChange={(e) => setTempDisease({
                                                            ...tempDisease,
                                                            instructions: e.target.value
                                                        })}
                                                        placeholder="Hướng dẫn sử dụng thuốc"
                                                    />
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
                                                        onClick={handleUpdateDisease}
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
                                                            {disease.diseaseName}
                                                        </h3>
                                                    </div>
                                                    <div className="flex flex-col items-end space-y-2">
                                                        <Badge className="bg-green-100 text-green-800 border-green-200">
                                                            Đang điều trị
                                                        </Badge>
                                                        <div className="flex space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 bg-transparent"
                                                                onClick={() => handleEditDisease(disease)}
                                                                disabled={isLoading}
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 bg-transparent"
                                                                onClick={() => handleDeleteDisease(disease.id)}
                                                                disabled={isLoading}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-700 mb-1">
                                                            Thuốc điều trị:
                                                        </p>
                                                        <p className="text-sm text-gray-600 bg-white/80 p-2 rounded">
                                                            {disease.medication || "Không có thông tin"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-700 mb-1">
                                                            Hướng dẫn:
                                                        </p>
                                                        <p className="text-sm text-gray-600 bg-white/80 p-2 rounded">
                                                            {disease.instructions || "Không có hướng dẫn"}
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
                                <Heart className="h-8 w-8" />
                            </div>
                            <h3 className="mt-4 text-sm font-medium text-gray-900">
                                Không có bệnh mãn tính nào được ghi nhận
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 mb-4">
                                Nhấn nút thêm bệnh để bổ sung thông tin
                            </p>
                            <Button
                                onClick={() => setIsDialogOpen(true)}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                                size="sm"
                                disabled={isLoading}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Thêm bệnh
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <ChronicConditions
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSubmit={handleAddChronicDisease}
                profileId={profile?.id || 0}
            />
        </div>
    );
};

export default ConditionsTab;