import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Syringe,
    Eye,
    CalendarCheck,
    Users,
    Bell
} from "lucide-react";
import { getStatusColor } from "@/lib/utils";

interface VaccinationCampaign {
    id: number;
    campaignName: string;
    vaccineType: string;
    scheduledDate: string;
    targetGrades: string;
    status: string;
    statusDisplay: string;
    totalStudents: number;
    consentReceived: number;
    vaccinationsCompleted: number;
    completionRate: number;
    consentRate: number;
}

const VaccinationsTab = () => {
    const campaigns: VaccinationCampaign[] = [
        {
            id: 1,
            campaignName: "Tiêm cúm mùa 2025",
            vaccineType: "Vắc xin cúm A/B",
            scheduledDate: "2025-07-18T00:00:00",
            targetGrades: "5A1, 3B2, 4C1, 3C1",
            status: "Planned",
            statusDisplay: "Đã lên kế hoạch",
            totalStudents: 4,
            consentReceived: 3,
            vaccinationsCompleted: 3,
            completionRate: 75,
            consentRate: 75
        }
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-lg rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 border-b border-red-700">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-white">
                            <Syringe className="w-6 h-6 mr-3" strokeWidth={2} />
                            <span className="text-xl font-bold">Chiến Dịch Tiêm Chủng</span>
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-6">
                        {campaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="p-5 border border-red-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">{campaign.campaignName}</h3>
                                        <p className="text-sm text-gray-600">{campaign.vaccineType}</p>
                                    </div>
                                    <Badge
                                        className={`${getStatusColor(campaign.status)} px-3 py-1 rounded-full text-sm font-medium`}
                                    >
                                        {campaign.statusDisplay}
                                    </Badge>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5 mb-4">
                                    <div className="flex items-start text-gray-700">
                                        <CalendarCheck className="w-5 h-5 mr-3 mt-0.5 text-red-500" />
                                        <div>
                                            <strong className="font-medium">Ngày tiêm:</strong>
                                            <p className="text-gray-800 font-semibold">{formatDate(campaign.scheduledDate)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start text-gray-700">
                                        <Users className="w-5 h-5 mr-3 mt-0.5 text-red-500" />
                                        <div>
                                            <strong className="font-medium">Lớp áp dụng:</strong>
                                            <p className="text-gray-800 font-semibold">{campaign.targetGrades}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-gray-700">Tỷ lệ đồng ý:</span>
                                            <span className="font-semibold">{campaign.consentReceived}/{campaign.totalStudents} ({campaign.consentRate}%)</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-red-400 h-2.5 rounded-full"
                                                style={{ width: `${campaign.consentRate}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-gray-700">Tỷ lệ hoàn thành:</span>
                                            <span className="font-semibold">{campaign.vaccinationsCompleted}/{campaign.totalStudents} ({campaign.completionRate}%)</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-green-500 h-2.5 rounded-full"
                                                style={{ width: `${campaign.completionRate}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        Xem chi tiết
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        className="bg-red-600 hover:bg-red-700 shadow-sm flex items-center"
                                    >
                                        <Bell className="w-4 h-4 mr-2" />
                                        Gửi thông báo
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default VaccinationsTab;