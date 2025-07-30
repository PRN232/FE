"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Bell,
    Stethoscope,
    Syringe
} from "lucide-react"
import {
    examinationNotifications,
    vaccinationNotifications
} from "@/lib/data/mock-data"
import NotificationCard from "@/components/Notification/NotificationCard"

const NotificationPage = () => {
    const [activeTab, setActiveTab] = useState("examinations")

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50/50 via-white to-red-100/50 relative">
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
                        <div className="flex items-center space-x-4">
                            <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                                <Bell className="w-4 h-4 mr-2" />
                                Đăng ký nhận thông báo
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6 relative z-10">
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
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                            {examinationNotifications.map((notification) => (
                                <NotificationCard
                                    key={notification.id}
                                    notification={notification}
                                    type="examination"
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="vaccinations" className="space-y-6">
                        <div className="grid gap-6">
                            {vaccinationNotifications.map((notification) => (
                                <NotificationCard
                                    key={notification.id}
                                    notification={notification}
                                    type="vaccination"
                                />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default NotificationPage;