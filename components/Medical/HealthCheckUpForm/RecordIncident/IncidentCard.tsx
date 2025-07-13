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
    Activity
} from "lucide-react"
import { Incident } from "@/types"
import { getSeverityColor } from "@/lib/utils"

interface IncidentCardProps {
    incident: Incident
    onView: (incident: Incident) => void
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
                                 onView
}: IncidentCardProps) => {
    return (
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
    )
}

export default IncidentCard