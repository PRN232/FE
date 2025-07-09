"use client";

import { useEffect, useState } from "react";
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
    CalendarCheck,
    Users,
    AlertCircle,
    Loader2,
    ChevronRight
} from "lucide-react";
import { getStatusColor } from "@/lib/utils";
import { getVaccinationCampaigns } from "@/lib/service/vaccination/campain/campain";
import { VaccinationCampaign } from "@/lib/service/vaccination/campain/ICampain";

const VaccinationsTab = () => {
    const [campaigns, setCampaigns] = useState<VaccinationCampaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedCampaign, setExpandedCampaign] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getVaccinationCampaigns();
                setCampaigns(response.data || []);
            } catch (err) {
                setError('Failed to fetch campaigns');
                console.error('Error fetching campaigns:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData().catch(err => {
            setError('Failed to fetch campaigns');
            console.error('Error in fetchData:', err);
            setLoading(false);
        });
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const toggleExpand = (id: number) => {
        setExpandedCampaign(expandedCampaign === id ? null : id);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center animate-fade-in">
                <AlertCircle className="mx-auto h-8 w-8 text-red-500 mb-2" />
                <p className="text-red-600 font-medium">{error}</p>
                <Button
                    variant="outline"
                    className="mt-3 border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => window.location.reload()}
                >
                    Thử lại
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden border-gray-100">
                <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 border-b border-red-700/50">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-white">
                            <Syringe className="w-6 h-6 mr-3" strokeWidth={2} />
                            <span className="text-xl font-bold tracking-tight">Thông Báo Tiêm Chủng</span>
                        </CardTitle>
                        <Badge variant="secondary" className="text-md bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                            {campaigns.length} chiến dịch
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {campaigns.length === 0 ? (
                        <div className="text-center py-12 animate-fade-in">
                            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4">
                                <Syringe className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">
                                Hiện không có chiến dịch tiêm chủng nào
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Thông báo sẽ xuất hiện tại đây khi có chiến dịch mới
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {campaigns.map((campaign) => (
                                <div
                                    key={campaign.id}
                                    className="border border-gray-200 rounded-xl bg-white hover:shadow-md transition-all duration-300 overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleExpand(campaign.id)}
                                        className="w-full text-left p-5 focus:outline-none"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                                    <span>{campaign.campaignName}</span>
                                                    <ChevronRight
                                                        className={`w-5 h-5 ml-2 transition-transform duration-300 ${expandedCampaign === campaign.id ? 'rotate-90' : ''}`}
                                                    />
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {campaign.vaccineType}
                                                </p>
                                            </div>
                                            <Badge
                                                className={`${getStatusColor(campaign.status)} px-3 py-1 rounded-full text-sm font-medium`}
                                            >
                                                {campaign.statusDisplay === "Planned" ? "Đã lên kế hoạch" : campaign.statusDisplay}
                                            </Badge>
                                        </div>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedCampaign === campaign.id ? 'max-h-96' : 'max-h-0'}`}
                                    >
                                        <div className="px-5 pb-5">
                                            <div className="grid md:grid-cols-2 gap-5 pt-2 border-t border-gray-100">
                                                <div className="flex items-start text-gray-700">
                                                    <div className="bg-red-100 p-2 rounded-lg mr-3">
                                                        <CalendarCheck className="w-5 h-5 text-red-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Ngày tiêm
                                                        </p>
                                                        <p className="text-gray-800 font-semibold">
                                                            {formatDate(campaign.scheduledDate)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start text-gray-700">
                                                    <div className="bg-red-100 p-2 rounded-lg mr-3">
                                                        <Users className="w-5 h-5 text-red-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Lớp áp dụng
                                                        </p>
                                                        <p className="text-gray-800 font-semibold">
                                                            {campaign.targetGrades}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default VaccinationsTab;