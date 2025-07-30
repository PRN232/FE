"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Search,
    User,
    AlertTriangle,
    HeartPulse,
    Plus
} from "lucide-react";
import StudentInfoCard from "@/components/Medical/MedicalRecord/StudentInfoCard";
import OverviewTab from "@/components/Medical/MedicalRecord/MedicalTabs/OverviewTab";
import AllergiesTab from "@/components/Medical/MedicalRecord/MedicalTabs/AllergiesTab";
import ConditionsTab from "@/components/Medical/MedicalRecord/MedicalTabs/ConditionsTab";
import { User as UserType, ChildDTO } from "@/types";
import { getChildrenByParentId } from "@/lib/service/parent/parent";
import { getMedicalProfileByStudentId, MedicalProfileResponse } from "@/lib/service/medical-profile/medical";
import NewRequest from "@/components/Medical/HealthCheckUpForm/RecordIncident/NewRequest";

const HealthRecord = () => {
    const [isNewRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [activeTab, setActiveTab] = useState("overview");
    const [children, setChildren] = useState<ChildDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<UserType | null>(null);
    const [medicalProfile, setMedicalProfile] = useState<MedicalProfileResponse | null>(null);
    const [medicalLoading, setMedicalLoading] = useState(false);
    const [medicalError, setMedicalError] = useState<string | null>(null);

    const fetchMedicalProfile = useCallback(async () => {
        if (!selectedStudent) {
            setMedicalProfile(null);
            setMedicalError(null);
            return;
        }

        setMedicalLoading(true);
        setMedicalError(null);
        try {
            const response = await getMedicalProfileByStudentId(parseInt(selectedStudent, 10));
            if (response.success && response.profile) {
                setMedicalProfile({ ...response });
            } else {
                setMedicalError(response.error || "Failed to fetch medical profile");
                setMedicalProfile(null);
            }
        } catch (error) {
            setMedicalError("An unexpected error occurred while fetching medical profile");
            setMedicalProfile(null);
            console.error("Fetch error:", error);
        } finally {
            setMedicalLoading(false);
        }
    }, [selectedStudent]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser: UserType = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch {
                setError("Failed to parse user data from localStorage");
            }
        } else {
            setError("No user data found. Please log in.");
        }
    }, []);

    useEffect(() => {
        if (!user) return;

        const fetchChildren = async () => {
            setLoading(true);
            try {
                const parentId = user.parentId || 0;
                const response = await getChildrenByParentId(parentId);
                if (response.success && response.children) {
                    setChildren(response.children);
                } else {
                    setError(response.error || "Failed to fetch children");
                }
            } catch {
                setError("An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        void fetchChildren();
    }, [user]);

    useEffect(() => {
        void fetchMedicalProfile();
    }, [fetchMedicalProfile, selectedStudent]);

    const handleNewIncidentSuccess = async () => {
        if (!selectedStudent) return;

        let attempts = 0;
        const maxAttempts = 5;
        const pollInterval = 2000;

        while (attempts < maxAttempts) {
            await fetchMedicalProfile();
            if (medicalProfile?.profile) {
                break;
            }
            await new Promise((resolve) => setTimeout(resolve, pollInterval));
            attempts++;
        }

        if (attempts >= maxAttempts) {
            setMedicalError("Failed to fetch updated profile after multiple attempts");
        }
    };

    const renderTabContent = () => {
        if (!selectedStudent || medicalLoading) return <Skeleton className="h-64 w-full" />;
        if (medicalError) return <p className="text-red-500">{medicalError}</p>;

        const profile = medicalProfile?.profile;
        switch (activeTab) {
            case "overview":
                return <OverviewTab profile={profile} />;
            case "allergies":
                return <AllergiesTab profile={profile} />;
            case "conditions":
                return <ConditionsTab profile={profile} />;
            default:
                return <OverviewTab profile={profile} />;
        }
    };

    const selectedChild = children.find((child) => child.id.toString() === selectedStudent);

    if (!user && error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-6">
                            <p className="text-red-500">{error}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50/50 via-white to-red-100/50 relative">
            <div className="absolute inset-0 bg-[url('/images/medical-pattern-light.svg')] bg-[length:300px_300px] opacity-[0.03] animate-[pulse_20s_linear_infinite]" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-50/20 pointer-events-none" />
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/medical-pattern.svg')] bg-[length:300px_300px] opacity-[0.03]" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-red-700/30 pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                                Hồ sơ sức khỏe học sinh
                            </h1>
                            <p className="text-red-100/90 max-w-lg">
                                Hồ sơ sức khỏe và theo dõi y tế học sinh
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                onClick={() => setIsRequestModalOpen(true)}
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Khai báo
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto p-6 relative z-10">
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 mb-6 group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                        <CardTitle className="flex items-center">
                            <Search className="w-5 h-5 mr-2" />
                            Chọn học sinh
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                {loading ? (
                                    <Skeleton className="h-10 w-full rounded-md" />
                                ) : (
                                    <Select
                                        value={selectedStudent}
                                        onValueChange={setSelectedStudent}
                                        disabled={ loading || !user}
                                    >
                                        <SelectTrigger className="border-red-200 focus:border-red-500">
                                            <SelectValue
                                                placeholder={
                                                    loading
                                                        ? "Đang tải danh sách học sinh..."
                                                        : children.length === 0
                                                            ? "Không có học sinh nào"
                                                            : "Chọn học sinh để xem hồ sơ sức khỏe"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white shadow-lg">
                                            {children.map((child) => (
                                                <SelectItem key={child.id} value={child.id.toString()}>
                                                    {child.fullName} - {child.className}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                                {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {selectedStudent && selectedChild ? (
                    <>
                        <StudentInfoCard child={selectedChild} medicalProfile={medicalProfile?.profile} />
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                            <div className="relative">
                                <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm rounded-lg overflow-hidden border border-red-100">
                                    <TabsTrigger
                                        value="overview"
                                        className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all duration-300 group"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            <User className="w-4 h-4" />
                                            Tổng quan
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="allergies"
                                        className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all duration-300 group"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            <AlertTriangle className="w-4 h-4" />
                                            Dị ứng
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="conditions"
                                        className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all duration-300 group"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            <HeartPulse className="w-4 h-4" />
                                            Tình trạng
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </TabsTrigger>
                                </TabsList>
                                <div
                                    className="absolute bottom-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300"
                                    style={{
                                        width: "25%",
                                        left:
                                            activeTab === "overview"
                                                ? "0%"
                                                : activeTab === "allergies"
                                                    ? "25%"
                                                    : activeTab === "conditions"
                                                        ? "50%"
                                                        : activeTab === "vaccinations"
                                                            ? "75%"
                                                            : "0%",
                                    }}
                                />
                            </div>
                            <div className="bg-white rounded-lg shadow-sm border border-red-50 overflow-hidden transition-all duration-300 hover:shadow-md">
                                <div className="p-6">{renderTabContent()}</div>
                            </div>
                        </Tabs>
                    </>
                ) : (
                    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm p-6 text-center">
                        <p className="text-gray-500">
                            {children.length === 0
                                ? "Không có học sinh nào để hiển thị"
                                : "Vui lòng chọn học sinh để xem hồ sơ sức khỏe"}
                        </p>
                    </Card>
                )}
            </div>
            {selectedChild ? (
                <NewRequest
                    isOpen={isNewRequestModalOpen}
                    onClose={() => setIsRequestModalOpen(false)}
                    onSuccess={handleNewIncidentSuccess}
                    selectedChild={selectedChild}
                />
            ) : (
                <p className="text-white text-center mt-4 p-3 bg-red-500 rounded-lg shadow-md">
                    Nhà trường chưa tạo tài khoản cho con bạn. Xin hãy liên lạc với nhà trường.
                </p>
            )}
        </div>
    );
};

export default HealthRecord;