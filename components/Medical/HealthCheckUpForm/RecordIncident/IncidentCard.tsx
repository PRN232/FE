"use client"

import { useState } from "react"
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
    Plus
} from "lucide-react"
import { Incident, MedicationGiven } from "@/types"
import { getSeverityColor } from "@/lib/utils"
import AddMedicine from "@/components/Medical/HealthCheckUpForm/RecordIncident/AddMedicine";

interface IncidentCardProps {
    incident: Incident
    onView: (incident: Incident) => void
    medicationsGiven: MedicationGiven[]
    onAddMedication: (
        incidentId: number,
        medicationData: {
            medicationId: number,
            dosage: string,
            giveAt: string
        }) => Promise<boolean>
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
                          onAddMedication
}: IncidentCardProps) => {
    const [isMedicationDialogOpen, setIsMedicationDialogOpen] = useState(false)
    const incidentMedications = medicationsGiven.filter(m => m.incidentId === incident.id)

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
                                onClick={() => setIsMedicationDialogOpen(true)}
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
                                        className="py-3 px-4 border-b border-gray-100 last:border-b-0 hover:bg-red-50/50 transition-colors duration-200 rounded-md"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    ID Thuốc: {medication.medicationId}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Liều dùng: {medication.dosage}
                                                </p>
                                            </div>
                                            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                                {medication.giveAt && medication.giveAt !== "0001-01-01T00:00:00" ? (
                                                    new Date(medication.giveAt).toLocaleString()
                                                ) : (
                                                    "Chưa xác định thời gian"
                                                )}
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
                onClose={() => setIsMedicationDialogOpen(false)}
                incidentId={incident.id}
                onAddMedication={onAddMedication}
            />
        </>
    )
}

export default IncidentCard