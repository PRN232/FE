"use client"

import { useMemo, useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    AlertTriangle,
    Clock,
    MapPin,
    FileText,
    Eye,
    CheckCircle,
    XCircle,
    Stethoscope,
    Activity,
    Pill,
    Plus,
    Pencil,
    Trash2
} from "lucide-react"
import {
    Incident,
    Medication,
    MedicationGiven
} from "@/types"
import {
    getSeverityColor,
    showErrorAlert,
    showSuccessAlert
} from "@/lib/utils"
import AddMedicine from "@/components/Medical/HealthCheckUpForm/RecordIncident/AddMedicine";

interface IncidentCardProps {
    incident: Incident
    onView: (incident: Incident) => void
    allMedications: Medication[];
    medicationsGiven: MedicationGiven[]
    onAddOrUpdateMedication: (
        incidentId: number,
        medicationData: {
            medicationId: number;
            dosage: string;
            giveAt: string;
        },
        medicationId?: number
    ) => Promise<boolean>;
    onDeleteMedication: (medicationId: number) => Promise<boolean>
}

const getIncidentTypeIcon = (type: string) => {
    switch (type) {
        case "Injury":
        case "Fall":
            return <AlertTriangle className="w-5 h-5" />
        case "Illness":
            return <Activity className="w-5 h-5" />
        case "Allergic Reaction":
        case "Accident":
            return <Stethoscope className="w-5 h-5" />
        default:
            return <FileText className="w-5 h-5" />
    }
}

const IncidentCard = ({
                          incident,
                          onView,
                          medicationsGiven,
                          allMedications,
                          onAddOrUpdateMedication,
                          onDeleteMedication
}: IncidentCardProps) => {
    const [selectedMedication, setSelectedMedication] = useState<MedicationGiven | null>(null);
    const [isMedicationDialogOpen, setIsMedicationDialogOpen] = useState(false)

    const incidentMedications = useMemo(() =>
            medicationsGiven.filter(m => m.incidentId === incident.id),
        [medicationsGiven, incident.id]
    );

    const medicationNames = useMemo(() => {
        const names: Record<number, string> = {};
        incidentMedications.forEach(med => {
            const medication = allMedications.find(m => m.id === med.medicationId);
            names[med.medicationId] = medication?.name || `Thuốc ID: ${med.medicationId}`;
        });
        return names;
    }, [incidentMedications, allMedications]);

    const handleEditMedication = (medication: MedicationGiven) => {
        setSelectedMedication(medication);
        setIsMedicationDialogOpen(true);
    };

    const handleDeleteMedication = async (medicationId: number) => {
        if (confirm("Bạn có chắc muốn xóa thuốc này không?")) {
            try {
                const success = await onDeleteMedication(medicationId);
                if (success) {
                    await showSuccessAlert("Xóa thuốc thành công!");
                } else {
                    await showErrorAlert("Không thể xóa thuốc.");
                }
            } catch (error) {
                await showErrorAlert("Đã xảy ra lỗi khi xóa thuốc.");
                console.error("Error deleting medication:", error);
            }
        }
    };

    return (
        <>
            <Card className="relative overflow-hidden shadow-lg border-0 group hover:shadow-xl transition-all duration-300">
                {/* Gradient accent bar */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-red-600" />

                <CardHeader className="bg-gradient-to-r from-red-50 via-white to-red-50 border-b border-red-100 px-6 py-4 group-hover:from-red-100 group-hover:via-white group-hover:to-red-100 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-red-600 border border-red-100 shadow-sm">
                                {getIncidentTypeIcon(incident.type)}
                            </div>
                            <div>
                                <CardTitle className="text-gray-800 font-medium">
                                    {incident.studentName}
                                </CardTitle>
                                <CardDescription className="text-gray-500">
                                    Mã học sinh: {incident.studentCode} • ID: {incident.id}
                                </CardDescription>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge
                                className={`${getSeverityColor(incident.severity)} px-3 py-1 rounded-full font-medium shadow-sm`}
                            >
                                {incident.severity}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-red-50 rounded-lg text-red-600">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700">
                                        Thời gian
                                    </p>
                                    <p className="text-gray-600">
                                        {incident.incidentDate}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-red-50 rounded-lg text-red-600">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700">
                                        Mô tả
                                    </p>
                                    <p className="text-gray-600">
                                        {incident.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-red-50 rounded-lg text-red-600">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700">
                                        Loại sự cố
                                    </p>
                                    <p className="text-gray-600">
                                        {incident.type}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-red-50 rounded-lg text-red-600">
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700">
                                        Triệu chứng
                                    </p>
                                    <p className="text-gray-600">
                                        {incident.symptoms}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    {incident.parentNotified ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-500" />
                                    )}
                                    <span className="text-sm text-gray-600">
                                        Phụ huynh đã được thông báo
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Medications Section */}
                    <div className="mt-8 space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800 flex items-center">
                                <Pill className="w-5 h-5 mr-2 text-red-500" />
                                Thuốc đã sử dụng
                            </h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setIsMedicationDialogOpen(true)
                                }}
                                className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 bg-white shadow-sm"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Thêm thuốc
                            </Button>
                        </div>

                        {incidentMedications.length > 0 ? (
                            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                                {incidentMedications.map((medication) => (
                                    <div
                                        key={medication.id}
                                        className="py-3 px-4 border-b border-gray-100 last:border-b-0 hover:bg-red-50/50 transition-colors duration-200 rounded-md group"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {medicationNames[medication.medicationId] || `Đang tải thông tin thuốc...`}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Liều dùng: {medication.dosage}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditMedication(medication)}
                                                    className="opacity-0 group-hover:opacity-100 transition-all duration-300
               bg-gradient-to-r from-white to-red-50 hover:from-red-50 hover:to-red-100
               text-red-700 hover:text-red-800 border border-red-200 hover:border-red-300
               shadow-sm hover:shadow-md transform hover:-translate-y-0.5
               font-medium"
                                                >
                                                    <Pencil className="w-4 h-4 mr-1" />
                                                    Sửa
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteMedication(medication.id)}
                                                    className="opacity-0 group-hover:opacity-100 transition-all duration-300
               bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
               text-white hover:text-white border border-red-600 hover:border-red-700
               shadow-sm hover:shadow-md transform hover:-translate-y-0.5
               hover:scale-105 font-medium"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-1" />
                                                    Xóa
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                Chưa có thuốc nào được ghi nhận
                            </div>
                        )}
                    </div>


                    <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onView(incident)}
                            className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 bg-white shadow-sm"
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            Xem chi tiết
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Add Medication Dialog */}
            <AddMedicine
                isOpen={isMedicationDialogOpen}
                onClose={() => {
                    setSelectedMedication(null);
                    setIsMedicationDialogOpen(false);
                }}
                incidentId={incident.id}
                medicationGiven={selectedMedication}
                onAddMedication={onAddOrUpdateMedication}
                allMedications={allMedications}
            />
        </>
    )
}

export default IncidentCard