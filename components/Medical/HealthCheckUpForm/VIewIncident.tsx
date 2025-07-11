"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Eye,
    Edit,
    CheckCircle,
    XCircle
} from 'lucide-react'

import { Incident } from "@/types"
import {getStatusColor, getSeverityColor} from "@/lib/utils";

interface ViewIncidentModalProps {
    isOpen: boolean
    onClose: () => void
    incident: Incident | null
    onEdit?: (incident: Incident) => void
}

const ViewIncident = ({
                          isOpen,
                          onClose,
                          incident,
                          onEdit
}: ViewIncidentModalProps) => {
    if (!incident) return null

    const handleEdit = () => {
        onEdit?.(incident)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-red-800">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white mr-3">
                            <Eye className="w-4 h-4" />
                        </div>
                        Incident Details - {incident.id}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Chi tiết sự cố của học sinh {incident.studentName}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Student and Incident Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-red-200">
                            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                                <CardTitle className="text-red-800">Student Information</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Name:</span>
                                    <span className="text-gray-900">{incident.studentName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Class:</span>
                                    <span className="text-gray-900">{incident.studentClass}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Incident ID:</span>
                                    <span className="text-gray-900">{incident.id}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-red-200">
                            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                                <CardTitle className="text-red-800">Incident Details</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-700">Type:</span>
                                    <span className="text-gray-900">{incident.incidentType}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-700">Severity:</span>
                                    <Badge className={getSeverityColor(incident.severity)}>{incident.severity}</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-700">Status:</span>
                                    <Badge className={getStatusColor(incident.status)}>{incident.status}</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Date & Time:</span>
                                    <span className="text-gray-900">{incident.dateTime}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Description */}
                    <Card className="border-red-200">
                        <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                            <CardTitle className="text-red-800">Mô tả sự cố</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="text-gray-700 leading-relaxed">{incident.description}</p>
                        </CardContent>
                    </Card>

                    {/* Treatment */}
                    <Card className="border-red-200">
                        <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                            <CardTitle className="text-red-800">
                                Hướng giải quyết
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="text-gray-700 leading-relaxed">
                                {incident.treatment || "No treatment information recorded."}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Nurse Notes */}
                    <Card className="border-red-200">
                        <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                            <CardTitle className="text-red-800">
                                Ghi chú y tá
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="text-gray-700 leading-relaxed">
                                {incident.nurseNotes || "No additional notes recorded."}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Status Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border-red-200">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-700">
                                        Parent Notification
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        {incident.parentNotified ? (
                                            <>
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                                <span className="text-green-700 font-medium">Notified</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-5 h-5 text-red-500" />
                                                <span className="text-red-700 font-medium">Not Notified</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-red-200">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-700">
                                        Yêu cầu theo dõi
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        {incident.followUpRequired ? (
                                            <>
                                                <CheckCircle className="w-5 h-5 text-yellow-500" />
                                                <span className="text-yellow-700 font-medium">
                                                    Chấp thuận
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-5 h-5 text-gray-400" />
                                                <span className="text-gray-600 font-medium">
                                                    Không chấp thuận
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <div className="flex gap-2">
                        <DialogClose asChild>
                            <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent">
                                Close
                            </Button>
                        </DialogClose>
                        <Button
                            onClick={handleEdit}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Chỉnh sửa
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ViewIncident;
