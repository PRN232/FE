"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    AlertTriangle,
    Plus,
    Edit,
} from "lucide-react";
import {
    getSeverityColor,
    getSeverityText,
} from "@/lib/utils";
import { ApiMedicalProfile } from "@/lib/service/medical-profile/IMedical";
import { AllergyFormData } from "@/components/Medical/HealthCheckUpForm/Allergies";
import Allergies from "@/components/Medical/HealthCheckUpForm/Allergies";

interface AllergiesTabProps {
    profile?: ApiMedicalProfile;
    onUpdate?: () => void;
}

interface Allergy {
    id: number;
    medicalProfileId: number;
    allergyName: string;
    severity: string;
    symptoms: string;
    treatment: string;
}

const AllergiesTab = ({ profile, onUpdate }: AllergiesTabProps) => {
    const [allergies, setAllergies] = useState<Allergy[]>(
        profile?.allergies || []
    ); // Initialize with profile allergies
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const hasAllergies = allergies.length > 0;

    const handleAddAllergy = async (formData: AllergyFormData) => {
    if (!profile?.id) {
        throw new Error("Không tìm thấy thông tin hồ sơ y tế.");
    }
        const response = await fetch(
            `https://localhost:7106/api/medicalprofiles/${profile.id}/allergies`,
            {
                method: "POST",
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Có lỗi xảy ra khi thêm dị ứng.");
        }

        // Update local state with new allergy
        setAllergies([...allergies, result.data]);
        onUpdate?.();
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
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Thêm dị ứng
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {hasAllergies ? (
                        <div className="space-y-4">
                            {allergies.map((allergy) => (
                                <div
                                    key={allergy.id}
                                    className="relative p-4 border border-red-200 rounded-lg bg-gradient-to-r from-red-50 to-white hover:shadow-md transition-all duration-200"
                                >
                                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-500 to-red-600 rounded-l-lg" />
                                    <div className="pl-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900">{allergy.allergyName}</h3>
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
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 bg-transparent"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4 mt-3">
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Triệu chứng</p>
                                                <p className="text-sm text-gray-600 bg-white/80 p-2 rounded">
                                                    {allergy.symptoms || "Không có thông tin"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Điều trị</p>
                                                <p className="text-sm text-gray-600 bg-white/80 p-2 rounded">
                                                    {allergy.treatment || "Không có thông tin"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                                <AlertTriangle className="h-8 w-8" />
                            </div>
                            <h3 className="mt-4 text-sm font-medium text-gray-900">Không có dị ứng nào được ghi nhận</h3>
                            <p className="mt-1 text-sm text-gray-500 mb-4">Nhấn nút thêm dị ứng để bổ sung thông tin</p>
                            <Button
                                onClick={() => setIsDialogOpen(true)}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                                size="sm"
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