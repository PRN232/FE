import React, { useState } from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Heart,
    AlertTriangle,
    Syringe,
    ClipboardList,
} from "lucide-react"
import {
    getSeverityColor,
    getStatusColor
} from "@/lib/utils"

interface MedicalInfoProps {
    hasMedicalProfile: boolean;
}

const MedicalInfo = ({
                         hasMedicalProfile
}: MedicalInfoProps) => {
    const [activeTab, setActiveTab] = useState("overview")
    const [medicalData, setMedicalData] = useState({
        allergies: [
            { id: 1, allergen: "Penicillin", severity: "high", symptoms: "Phát ban, khó thở" },
            { id: 2, allergen: "Peanuts", severity: "medium", symptoms: "Ngứa, sưng môi" },
        ],
        conditions: [{ id: 1, condition: "Asthma", status: "controlled", medication: "Ventolin Inhaler" }],
        vaccinations: [
            { id: 1, vaccine: "COVID-19", dose: "Dose 1", date: "2023-06-15", status: "completed" },
            { id: 2, vaccine: "Hepatitis B", dose: "Booster", date: "2023-11-20", status: "completed" },
        ],
        medicalHistory: [
            { id: 1, date: "2024-01-10", type: "Routine Checkup", diagnosis: "Healthy", doctor: "Dr. Trần Văn A" },
            { id: 2, date: "2023-12-20", type: "Sick Visit", diagnosis: "Common Cold", doctor: "Dr. Lê Thị B" },
        ],
    })

    return (
        <>
            {hasMedicalProfile && (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4 bg-red-50">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                            Tổng quan
                        </TabsTrigger>
                        <TabsTrigger
                            value="allergies"
                            className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                        >
                            Dị ứng
                        </TabsTrigger>
                        <TabsTrigger
                            value="conditions"
                            className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                        >
                            Bệnh lý
                        </TabsTrigger>
                        <TabsTrigger
                            value="vaccinations"
                            className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                        >
                            Tiêm chủng
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card className="border-red-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                            <AlertTriangle className="w-5 h-5 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800">{medicalData.allergies.length}</p>
                                            <p className="text-sm text-gray-600">Dị ứng</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-red-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Heart className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800">{medicalData.conditions.length}</p>
                                            <p className="text-sm text-gray-600">Bệnh lý</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-red-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <Syringe className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800">{medicalData.vaccinations.length}</p>
                                            <p className="text-sm text-gray-600">Tiêm chủng</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-red-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <ClipboardList className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800">{medicalData.medicalHistory.length}</p>
                                            <p className="text-sm text-gray-600">Lịch sử khám</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Allergies Tab */}
                    <TabsContent value="allergies" className="space-y-4">
                        <Card className="border-red-200">
                            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                                <CardTitle className="flex items-center text-red-800">
                                    <AlertTriangle className="w-5 h-5 mr-2" />
                                    Danh sách dị ứng
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {medicalData.allergies.map((allergy) => (
                                        <div key={allergy.id} className="p-4 border border-red-200 rounded-lg bg-red-50">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold text-gray-800">{allergy.allergen}</h4>
                                                <Badge className={getSeverityColor(allergy.severity)}>
                                                    {allergy.severity === "high" && "Nghiêm trọng"}
                                                    {allergy.severity === "medium" && "Trung bình"}
                                                    {allergy.severity === "low" && "Nhẹ"}
                                                </Badge>
                                            </div>
                                            <p className="text-gray-600">
                                                <strong>Triệu chứng:</strong> {allergy.symptoms}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Conditions Tab */}
                    <TabsContent value="conditions" className="space-y-4">
                        <Card className="border-red-200">
                            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                                <CardTitle className="flex items-center text-red-800">
                                    <Heart className="w-5 h-5 mr-2" />
                                    Bệnh lý mãn tính
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {medicalData.conditions.map((condition) => (
                                        <div key={condition.id} className="p-4 border border-red-200 rounded-lg bg-red-50">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold text-gray-800">{condition.condition}</h4>
                                                <Badge className={getStatusColor(condition.status)}>
                                                    {condition.status === "controlled" && "Được kiểm soát"}
                                                    {condition.status === "stable" && "Ổn định"}
                                                </Badge>
                                            </div>
                                            <p className="text-gray-600">
                                                <strong>Thuốc điều trị:</strong> {condition.medication}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Vaccinations Tab */}
                    <TabsContent value="vaccinations" className="space-y-4">
                        <Card className="border-red-200">
                            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                                <CardTitle className="flex items-center text-red-800">
                                    <Syringe className="w-5 h-5 mr-2" />
                                    Lịch sử tiêm chủng
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {medicalData.vaccinations.map((vaccination) => (
                                        <div key={vaccination.id} className="p-4 border border-red-200 rounded-lg bg-red-50">
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <h4 className="font-semibold text-gray-800">{vaccination.vaccine}</h4>
                                                    <p className="text-sm text-gray-600">{vaccination.dose}</p>
                                                </div>
                                                <Badge className={getStatusColor(vaccination.status)}>
                                                    {vaccination.status === "completed" && "Hoàn thành"}
                                                </Badge>
                                            </div>
                                            <p className="text-gray-600">
                                                <strong>Ngày tiêm:</strong> {vaccination.date}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            )}
        </>
    )
}

export default MedicalInfo