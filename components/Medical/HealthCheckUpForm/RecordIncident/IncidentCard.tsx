"use client"

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
import { useState } from "react"
import AddMedicine from "@/components/Medical/HealthCheckUpForm/RecordIncident/AddMedicine";

interface IncidentCardProps {
    incident: Incident
    onView: (incident: Incident) => void
    medicationsGiven: MedicationGiven[]
    onAddMedication: (
        incidentId: number,
        medicationData: {
            medicationId: number,
            dosage: string
        }) => Promise<boolean>
}

const getIncidentTypeIcon = (type: string) => {
    switch (type) {
        case "Injury":
        case "Fall":
            return <AlertTriangle className="w-4 h-4" />
        case "Illness":
            return <Activity className="w-4 h-4" />
        case "Allergic Reaction":
        case "Accident":
            return <Stethoscope className="w-4 h-4" />
        default:
            return <FileText className="w-4 h-4" />
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
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                                {getIncidentTypeIcon(incident.type)}
                            </div>
                            <div>
                                <CardTitle className="text-red-800">
                                    {incident.studentName}
                                </CardTitle>
                                <CardDescription className="text-red-600">
                                    Mã học sinh: {incident.studentCode} • ID sự cố: {incident.id}
                                </CardDescription>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge className={getSeverityColor(incident.severity)}>
                                {incident.severity}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <Clock className="w-5 h-5 text-red-500 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        Thời gian
                                    </p>
                                    <p className="text-gray-600">
                                        {incident.incidentDate}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-800">
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
                                <FileText className="w-5 h-5 text-red-500 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        Loại sự cố
                                    </p>
                                    <p className="text-gray-600">
                                        {incident.type}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-800">
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
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <XCircle className="w-4 h-4 text-red-500" />
                                    )}
                                    <span className="text-sm text-gray-600">
                                        Phụ huynh đã được thông báo
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Medications Section */}
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800 flex items-center">
                                <Pill className="w-4 h-4 mr-2 text-red-500" />
                                Thuốc đã sử dụng
                            </h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsMedicationDialogOpen(true)}
                                className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Thêm thuốc
                            </Button>
                        </div>

                        {incidentMedications.length > 0 ? (
                            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                                {incidentMedications.map((medication) => (
                                    <div key={medication.id} className="py-2 border-b border-gray-100 last:border-b-0">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">Thuốc ID: {medication.medicationId}</p>
                                                <p className="text-sm text-gray-600">Liều dùng: {medication.dosage}</p>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {medication.giveAt !== "0001-01-01T00:00:00" ?
                                                    new Date(medication.giveAt).toLocaleString() :
                                                    "Chưa xác định thời gian"}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-md border border-gray-200">
                                Chưa có thuốc nào được ghi nhận
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-red-100">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onView(incident)}
                            className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
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