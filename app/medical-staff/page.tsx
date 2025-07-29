"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Pill, Shield, Calendar, AlertTriangle, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Incident, Medication } from "@/types"
import { VaccinationCampaign } from "@/lib/service/vaccination/campain/ICampain"
import { Vaccination, VaccinationStatus } from "@/lib/service/health-check-campaign/IHealthCheckCampaign"
import { getAllMedicalIncidents } from "@/lib/service/medical-record/incident/incident"
import { getAllMedications } from "@/lib/service/medications/medications"
import { getVaccinationCampaigns } from "@/lib/service/vaccination/campain/campain"
import { getAllCampaigns } from "@/lib/service/health-check-campaign/healthCheckCampaign"

export default function MedicalStaffPage() {
    const [activeIncidents, setActiveIncidents] = useState<Incident[]>([])
    const [medications, setMedications] = useState<Medication[]>([])
    const [vaccinationCampaigns, setVaccinationCampaigns] = useState<VaccinationCampaign[]>([])
    const [healthCheckCampaigns, setHealthCheckCampaigns] = useState<Vaccination[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                // Fetch all data in parallel
                const [incidentsRes, medsRes, vaxRes, healthRes] = await Promise.all([
                    getAllMedicalIncidents(),
                    getAllMedications(),
                    getVaccinationCampaigns(),
                    getAllCampaigns()
                ])

                if (incidentsRes.success) setActiveIncidents(incidentsRes.data.filter(i => i.severity !== 'Low'))
                if (medsRes.success) setMedications(medsRes.data.filter(m => m.isLowStock))
                if (vaxRes.success && vaxRes.data) {
                    setVaccinationCampaigns(vaxRes.data.filter(v => v.status !== "Completed"))
                } else {
                    setVaccinationCampaigns([])
                } if (healthRes.success) setHealthCheckCampaigns(healthRes.data.filter(h => h.status !== VaccinationStatus.Completed))

            } catch (err) {
                setError("Không thể tải dữ liệu. Vui lòng thử lại sau.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <div className="p-8 text-center">Đang tải dữ liệu...</div>
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Trang Quản Lý Y Tế</h2>
                    <p className="text-muted-foreground">Quản lý sự cố y tế, yêu cầu thuốc và chương trình sức khỏe</p>
                </div>
                <Button asChild>
                    <Link href="/medical-staff/incidents">
                        <Plus className="h-4 w-4 mr-2" />
                        Báo cáo sự cố mới
                    </Link>
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Sự cố cần xử lý</h3>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="mt-2">
                        <div className="text-2xl font-bold">{activeIncidents.length}</div>
                        <p className="text-xs text-muted-foreground">Cần theo dõi</p>
                    </div>
                </div>

                <div className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Thuốc sắp hết</h3>
                        <Pill className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="mt-2">
                        <div className="text-2xl font-bold">{medications.length}</div>
                        <p className="text-xs text-muted-foreground">Cần bổ sung</p>
                    </div>
                </div>

                <div className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Chiến dịch tiêm chủng</h3>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="mt-2">
                        <div className="text-2xl font-bold">{vaccinationCampaigns.length}</div>
                        <p className="text-xs text-muted-foreground">Đang diễn ra</p>
                    </div>
                </div>

                <div className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Khám sức khỏe</h3>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="mt-2">
                        <div className="text-2xl font-bold">{healthCheckCampaigns.length}</div>
                        <p className="text-xs text-muted-foreground">Đang thực hiện</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Active Medical Incidents */}
                <div className="border rounded-lg bg-white shadow-sm">
                    <div className="p-4 border-b">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">Sự cố y tế gần đây</h3>
                                <p className="text-sm text-muted-foreground">Các sự cố cần xử lý ngay</p>
                            </div>
                            <Button size="sm" variant="outline" asChild>
                                <Link href="/medical-staff/incidents">Xem tất cả</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="p-4 space-y-3">
                        {activeIncidents.slice(0, 3).map((incident) => (
                            <div key={incident.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className={`p-2 rounded-full ${incident.severity === 'High' ? 'bg-red-100 text-red-600' :
                                    incident.severity === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    <AlertTriangle className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium">{incident.studentName} ({incident.studentCode})</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                        {incident.type}: {incident.description}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {new Date(incident.incidentDate).toLocaleDateString('vi-VN')}
                                    </p>
                                </div>
                                <Badge variant={
                                    incident.severity === 'High' ? 'destructive' :
                                        incident.severity === 'Medium' ? 'default' : 'secondary'
                                }>
                                    {incident.severity === 'High' ? 'Nghiêm trọng' :
                                        incident.severity === 'Medium' ? 'Trung bình' : 'Nhẹ'}
                                </Badge>
                            </div>
                        ))}
                        {activeIncidents.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">Không có sự cố nào cần xử lý</p>
                        )}
                    </div>
                </div>

                {/* Low Stock Medications */}
                <div className="border rounded-lg bg-white shadow-sm">
                    <div className="p-4 border-b">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">Thuốc sắp hết</h3>
                                <p className="text-sm text-muted-foreground">Cần bổ sung gấp</p>
                            </div>
                            <Button size="sm" variant="outline" asChild>
                                <Link href="/medical-staff/medicine-inventory">Xem kho thuốc</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="p-4 space-y-3">
                        {medications.slice(0, 3).map((med) => (
                            <div key={med.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                                    <Pill className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium">{med.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Số lượng: {med.stockQuantity} • {med.type}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        HSD: {new Date(med.expiryDate).toLocaleDateString('vi-VN')}
                                    </p>
                                </div>
                                <Badge
                                    variant={med.isExpired ? 'destructive' : 'default'}
                                    className={!med.isExpired ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : ''}
                                >
                                    {med.isExpired ? 'Đã hết hạn' : 'Sắp hết'}
                                </Badge>
                            </div>
                        ))}
                        {medications.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">Kho thuốc đủ dùng</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Vaccination Campaigns */}
            <div className="border rounded-lg bg-white shadow-sm">
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">Chiến dịch tiêm chủng</h3>
                            <p className="text-sm text-muted-foreground">Các chiến dịch đang diễn ra</p>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                            <Link href="/medical-staff/vaccination">Quản lý chiến dịch</Link>
                        </Button>
                    </div>
                </div>
                <div className="p-4 grid gap-4 md:grid-cols-2">
                    {vaccinationCampaigns.map((campaign) => (
                        <div key={campaign.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium">{campaign.campaignName}</h4>
                                <Badge variant="outline" className="capitalize">
                                    {campaign.statusDisplay.toLowerCase()}
                                </Badge>
                            </div>

                            <div className="mt-3 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Đồng ý tiêm</span>
                                    <span>
                                        {campaign.consentReceived}/{campaign.totalStudents}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{ width: `${campaign.consentRate}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mt-3 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Đã tiêm chủng</span>
                                    <span>
                                        {campaign.vaccinationsCompleted}/{campaign.totalStudents}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: `${campaign.completionRate}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                                <span>Khối: {campaign.targetGrades}</span>
                                <span>Ngày: {new Date(campaign.scheduledDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                        </div>
                    ))}
                    {vaccinationCampaigns.length === 0 && (
                        <div className="col-span-2 text-sm text-muted-foreground text-center py-4">
                            Hiện không có chiến dịch tiêm chủng nào đang diễn ra
                        </div>
                    )}
                </div>
            </div>

            {/* Health Check Campaigns */}
            <div className="border rounded-lg bg-white shadow-sm">
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">Chương trình khám sức khỏe</h3>
                            <p className="text-sm text-muted-foreground">Các đợt khám sức khỏe định kỳ</p>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                            <Link href="/medical-staff/examination">Quản lý khám sức khỏe</Link>
                        </Button>
                    </div>
                </div>
                <div className="p-4 grid gap-4 md:grid-cols-3">
                    {healthCheckCampaigns.map((campaign) => (
                        <div key={campaign.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium text-sm">{campaign.campaignName}</h4>
                                <Badge variant={
                                    campaign.status === VaccinationStatus.InProgress ? 'secondary' : 'outline'
                                }>
                                    {campaign.statusDisplay}
                                </Badge>
                            </div>

                            <div className="mt-3 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Tiến độ</span>
                                    <span>
                                        {campaign.checkupsCompleted}/{campaign.totalStudents}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-purple-500 h-2 rounded-full"
                                        style={{ width: `${campaign.completionRate}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mt-3 text-xs text-muted-foreground space-y-1">
                                <p>Loại khám: {campaign.checkupTypes}</p>
                                <p>Khối: {campaign.targetGrades}</p>
                                <p>Ngày: {new Date(campaign.scheduledDate).toLocaleDateString('vi-VN')}</p>
                            </div>
                        </div>
                    ))}
                    {healthCheckCampaigns.length === 0 && (
                        <div className="col-span-3 text-sm text-muted-foreground text-center py-4">
                            Hiện không có chương trình khám sức khỏe nào đang diễn ra
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
