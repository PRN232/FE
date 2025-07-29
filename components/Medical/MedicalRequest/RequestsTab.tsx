"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Pill, AlertTriangle, User, CalendarIcon, Search, Plus, Eye, Edit } from "lucide-react"
import { getStatusColor, getUrgencyColor } from "@/lib/utils"
import MedicalRequestModal from "@/components/Medical/MedicalRequest/MedicalRequestModal"
import IncidentModal from "@/components/Medical/HealthCheckUpForm/RecordIncident/Incident"
import { ChildDTO } from "@/types"
import { getChildrenByParentId } from "@/lib/service/parent/parent"

interface MedicalRequest {
    id: string
    studentName: string
    class: string
    requestType: string
    medicine: string
    dosage: string
    duration: string
    reason: string
    status: string
    requestDate: string
    parentName: string
    urgency: string
}

interface RequestsTabProps {
    searchTerm: string
    filterStatus: string
    setSearchTerm: (value: string) => void
    setFilterStatus: (value: string) => void
    medicalRequests: MedicalRequest[]
}

const RequestsTab = ({
                         searchTerm,
                         filterStatus,
                         setSearchTerm,
                         setFilterStatus,
                         medicalRequests
}: RequestsTabProps) => {
    const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false)
    const [isMedicalRequestModalOpen, setIsMedicalRequestModalOpen] = useState(false)
    const [createdIncidentId, setCreatedIncidentId] = useState<number | null>(null)
    const [students, setStudents] = useState<ChildDTO[]>([])
    const [studentsLoading, setStudentsLoading] = useState(true)
    const [studentsError, setStudentsError] = useState<string | null>(null)

    const parentId = JSON.parse(localStorage.getItem("user") || "{}")?.id

    useEffect(() => {
        const fetchStudents = async () => {
            if (!parentId) {
                setStudentsError("Parent ID not found")
                setStudentsLoading(false)
                return
            }

            try {
                const response = await getChildrenByParentId(parentId)
                if (response.success && response.children) {
                    setStudents(response.children)
                } else {
                    setStudentsError(response.error || "Failed to fetch children")
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
                setStudentsError(errorMessage)
            } finally {
                setStudentsLoading(false)
            }
        }

        void fetchStudents()
    }, [parentId])

    const filteredRequests = medicalRequests.filter((request) => {
        const matchesSearch =
            request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.medicine.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.reason.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filterStatus === "all" || request.status === filterStatus
        return matchesSearch && matchesFilter
    })

    const handleIncidentSuccess = (incidentId: number) => {
        setCreatedIncidentId(incidentId)
        setIsIncidentModalOpen(false)
        setIsMedicalRequestModalOpen(true)
    }

    const handleMedicalRequestSuccess = () => {
        console.log("New medical request created successfully")
        setCreatedIncidentId(null)
    }

    if (studentsLoading) {
        return <div className="p-6 text-center">Loading students...</div>
    }

    if (studentsError) {
        return (
            <div className="p-6 text-center text-red-600">
                Error: {studentsError}
                <Button onClick={() => window.location.reload()} className="mt-4">
                    Thử lại
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Search and Filter */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
                <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                            <Search className="w-5 h-5 mr-2" />
                            Tìm kiếm và Lọc
                        </CardTitle>
                        <Button
                            onClick={() => setIsIncidentModalOpen(true)}
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            size="sm"
                            disabled={students.length === 0}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Yêu Cầu Mới
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Tìm kiếm theo tên học sinh, thuốc, hoặc lý do..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-red-200 focus:border-red-500"
                            />
                        </div>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-full md:w-48 border-red-200 focus:border-red-500">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                                <SelectItem value="pending">Đang chờ</SelectItem>
                                <SelectItem value="approved">Đã duyệt</SelectItem>
                                <SelectItem value="completed">Hoàn thành</SelectItem>
                                <SelectItem value="rejected">Từ chối</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Requests List */}
            <div className="grid gap-6">
                {filteredRequests.length === 0 ? (
                    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                        <CardContent className="p-12 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Pill className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có yêu cầu y tế nào</h3>
                            <p className="text-gray-600 mb-4">Bạn chưa có yêu cầu y tế nào cho con em của mình.</p>
                            <Button
                                onClick={() => setIsIncidentModalOpen(true)}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                                disabled={students.length === 0}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Tạo Yêu Cầu Đầu Tiên
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    filteredRequests.map((request) => (
                        <Card
                            key={request.id}
                            className="shadow-lg border-0 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300"
                        >
                            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-3 h-3 rounded-full ${getUrgencyColor(request.urgency)}`}></div>
                                        <div>
                                            <CardTitle className="text-red-700">{request.studentName}</CardTitle>
                                            <CardDescription className="text-red-600">
                                                {request.class} • ID Yêu cầu: {request.id}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge className={getStatusColor(request.status)}>
                                            {request.status === "pending" && "Đang chờ"}
                                            {request.status === "approved" && "Đã duyệt"}
                                            {request.status === "completed" && "Hoàn thành"}
                                            {request.status === "rejected" && "Từ chối"}
                                        </Badge>
                                        <Badge variant="outline" className="border-red-200 text-red-700">
                                            {request.requestType}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <Pill className="w-5 h-5 text-red-500 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-gray-800">Chi tiết thuốc</p>
                                                <p className="text-gray-600">{request.medicine}</p>
                                                <p className="text-sm text-gray-500">
                                                    Liều dùng: {request.dosage} • Thời gian: {request.duration}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-gray-800">Lý do</p>
                                                <p className="text-gray-600">{request.reason}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <User className="w-5 h-5 text-red-500 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-gray-800">Phụ huynh</p>
                                                <p className="text-gray-600">{request.parentName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <CalendarIcon className="w-5 h-5 text-red-500 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-gray-800">Ngày yêu cầu</p>
                                                <p className="text-gray-600">{request.requestDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-red-100">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        Xem Chi Tiết
                                    </Button>
                                    {request.status === "pending" && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                                        >
                                            <Edit className="w-4 h-4 mr-2" />
                                            Chỉnh Sửa
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <IncidentModal
                isOpen={isIncidentModalOpen}
                onClose={() => setIsIncidentModalOpen(false)}
                onSuccess={handleIncidentSuccess}
                students={students}
            />

            <MedicalRequestModal
                isOpen={isMedicalRequestModalOpen}
                onClose={() => setIsMedicalRequestModalOpen(false)}
                onSuccess={handleMedicalRequestSuccess}
                incidentId={createdIncidentId}
            />
        </div>
    )
}

export default RequestsTab