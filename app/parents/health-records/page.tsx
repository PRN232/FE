"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Search,
    Plus,
    Download,
} from "lucide-react";

import StudentInfoCard from "@/components/Medical/MedicalRecord/StudentInfoCard";
import OverviewTab from "@/components/Medical/MedicalRecord/MedicalTabs/OverviewTab";
import AllergiesTab from "@/components/Medical/MedicalRecord/MedicalTabs/AllergiesTab";
import ConditionsTab from "@/components/Medical/MedicalRecord/MedicalTabs/ConditionsTab";
import VaccinationsTab from "@/components/Medical/MedicalRecord/MedicalTabs/VaccinationsTab";
import HistoryTab from "@/components/Medical/MedicalRecord/MedicalTabs/HistoryTab";

const HealthRecord = () => {
    // const [date, setDate] = useState<Date>();
    const [selectedStudent, setSelectedStudent] = useState("");
    // const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("overview");

    // Render tab content based on activeTab
    const renderTabContent = () => {
        switch (activeTab) {
            case "overview":
                return <OverviewTab />;
            case "allergies":
                return <AllergiesTab />;
            case "conditions":
                return <ConditionsTab />;
            case "vaccinations":
                return <VaccinationsTab />;
            case "history":
                return <HistoryTab />;
            default:
                return <OverviewTab />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 shadow-lg">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                Student Health Records
                            </h1>
                            <p className="text-red-100">
                                Hồ sơ sức khỏe và theo dõi y tế học sinh
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export Records
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                {/* Student Selection */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur mb-6">
                    <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                        <CardTitle className="flex items-center">
                            <Search className="w-5 h-5 mr-2" />
                            Student Selection
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <Select
                                    value={selectedStudent}
                                    onValueChange={setSelectedStudent}
                                >
                                    <SelectTrigger className="border-red-200 focus:border-red-500">
                                        <SelectValue placeholder="Chọn học sinh để xem hồ sơ sức khỏe" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="student1">
                                            Nguyễn Văn An - 10A1
                                        </SelectItem>
                                        <SelectItem value="student2">Trần Thị Mai - 9B2</SelectItem>
                                        <SelectItem value="student3">
                                            Lê Minh Tuấn - 11C1
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Student
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {selectedStudent && (
                    <>
                        {/* Student Info Card */}
                        <StudentInfoCard />

                        {/* Health Records Tabs */}
                        <Tabs
                            value={activeTab}
                            onValueChange={setActiveTab}
                            className="space-y-6"
                        >
                            <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
                                <TabsTrigger
                                    value="overview"
                                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="allergies"
                                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                                >
                                    Allergies
                                </TabsTrigger>
                                <TabsTrigger
                                    value="conditions"
                                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                                >
                                    Conditions
                                </TabsTrigger>
                                <TabsTrigger
                                    value="vaccinations"
                                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                                >
                                    Vaccinations
                                </TabsTrigger>
                                <TabsTrigger
                                    value="history"
                                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                                >
                                    Medical History
                                </TabsTrigger>
                            </TabsList>

                            {/* Render tab content dynamically */}
                            <div>{renderTabContent()}</div>
                        </Tabs>
                    </>
                )}
            </div>
        </div>
    );
};

export default HealthRecord;