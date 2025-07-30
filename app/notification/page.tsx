"use client"

import { useState, useEffect, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Stethoscope, Syringe } from "lucide-react"
import {
    mapCampaignStatus,
    showErrorAlert
} from "@/lib/utils"
import NotificationCard from "@/components/Notification/NotificationCard"
import {
    VaccinationCampaign
} from "@/lib/service/vaccination/campain/ICampain"
import { NotificationItem } from "@/types"
import {
    getVaccinationCampaigns
} from "@/lib/service/vaccination/campain/campain";
import { getAllCampaigns as getHealthCheckCampaigns } from "@/lib/service/health-check-campaign/healthCheckCampaign";
import { Vaccination } from "@/lib/service/health-check-campaign/IHealthCheckCampaign";
import {updateMedicalConsent} from "@/lib/service/medical-consent/medical-consent";

const NotificationPage = () => {
    const [activeTab, setActiveTab] = useState("examinations")
    const [notifications, setNotifications] = useState<{
        examinations: NotificationItem[]
        vaccinations: NotificationItem[]
    }>({ examinations: [], vaccinations: [] })
    const [loading, setLoading] = useState(true)

    const transformHealthCheckToNotification = useCallback((
        campaign: Vaccination
    ): NotificationItem => {
        return {
            id: campaign.id.toString(),
            title: campaign.campaignName,
            description: `Khám sức khỏe`,
            targetGrades: campaign.targetGrades,
            date: campaign.scheduledDate,
            time: "08:00 - 17:00",
            location: "Tại trường",
            status: mapCampaignStatus(campaign.statusDisplay),
            participants: campaign.consentReceived,
            maxParticipants: campaign.totalStudents,
            priority: "medium",
            requirements: [
                "Mang hồ so bệnh",
                "Nhanh nếu cân xét nghiệm máu"
            ],
            consentType: "HealthCheckup",
            campaignId: campaign.id
        }
    }, [])

    const transformVaccinationToNotification = useCallback((
        campaign: VaccinationCampaign
    ): NotificationItem => {
        return {
            id: campaign.id.toString(),
            title: campaign.campaignName,
            description: `${campaign.vaccineType}`,
            targetGrades: campaign.targetGrades,
            date: campaign.scheduledDate,
            time: "08:00 - 17:00",
            location: "Tại trường",
            status: mapCampaignStatus(campaign.statusDisplay),
            participants: campaign.consentReceived,
            maxParticipants: campaign.totalStudents,
            priority: "medium",
            requirements: [
                "Mang hồ so tiêm chủng",
                "Mang đơn đồng ý của ba mẹ"
            ],
            consentType: "Vaccine",
            campaignId: campaign.id
        }
    }, [])

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)

            const [healthCheckResponse, vaccinationResponse] = await Promise.all([
                getHealthCheckCampaigns(),
                getVaccinationCampaigns()
            ])

            const examinations = healthCheckResponse.success &&
            healthCheckResponse.data
                ? healthCheckResponse.data.map(transformHealthCheckToNotification)
                : []

            const vaccinations = vaccinationResponse.success &&
            vaccinationResponse.data
                ? vaccinationResponse.data.map(transformVaccinationToNotification)
                : []

            setNotifications({ examinations, vaccinations })
        } catch (error) {
            console.error("Error fetching campaigns:", error)
            await showErrorAlert("Không thể tải thông tin chiến dịch")
        } finally {
            setLoading(false)
        }
    }, [transformHealthCheckToNotification, transformVaccinationToNotification])

    const handleUpdateConsent = async (
        id: number,
        consentGiven: boolean,
        signature: string,
        note: string
    ): Promise<void> => {
        try {
            const response = await updateMedicalConsent({
                id,
                consentGiven,
                parentSignature: signature,
                note
            });

            if (!response.success) {
                throw new Error(response.errors?.join(', ') || "Failed to update consent");
            }
        } catch (error) {
            console.error("Error updating consent:", error);
            throw error;
        }
    };

    useEffect(() => {
        void fetchData()
    }, [fetchData])

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50/50 via-white to-red-100/50 relative">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=300')] bg-[length:300px_300px] opacity-[0.03] animate-[pulse_20s_linear_infinite]" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-50/20 pointer-events-none" />

            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=300')] bg-[length:300px_300px] opacity-[0.03]" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-red-700/30 pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent flex items-center">
                                <Bell className="w-8 h-8 mr-3 text-white" />
                                Thông báo chiến dịch y tế
                            </h1>
                            <p className="text-red-100/90 max-w-lg">
                                Theo dõi và đăng ký tham gia các chiến dịch khám sức khỏe và tiêm chủng
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6 relative z-10">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                    </div>
                ) : (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <div className="relative">
                            <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm rounded-lg overflow-hidden border border-red-100">
                                <TabsTrigger
                                    value="examinations"
                                    className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all duration-300 group"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <Stethoscope className="w-4 h-4" />
                                        Khám sức khỏe
                                    </span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="vaccinations"
                                    className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all duration-300 group"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <Syringe className="w-4 h-4" />
                                        Tiêm chủng
                                    </span>
                                </TabsTrigger>
                            </TabsList>
                            <div
                                className="absolute bottom-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300"
                                style={{
                                    width: "50%",
                                    left: activeTab === "examinations" ? "0%" : "50%",
                                }}
                            />
                        </div>

                        <TabsContent value="examinations" className="space-y-6">
                            <div className="grid gap-6">
                                {notifications.examinations.length > 0 ? (
                                    notifications.examinations.map((notification) => (
                                        <NotificationCard
                                            key={notification.id}
                                            notification={notification}
                                            type="examination"
                                            onUpdateConsent={handleUpdateConsent}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        Không có thông báo khám sức khỏe nào
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="vaccinations" className="space-y-6">
                            <div className="grid gap-6">
                                {notifications.vaccinations.length > 0 ? (
                                    notifications.vaccinations.map((notification) => (
                                        <NotificationCard
                                            key={notification.id}
                                            notification={notification}
                                            type="vaccination"
                                            onUpdateConsent={handleUpdateConsent}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        Không có thông báo tiêm chủng nào
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                )}
            </div>
        </div>
    )
}

export default NotificationPage