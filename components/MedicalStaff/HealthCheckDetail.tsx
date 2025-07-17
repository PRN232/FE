"use client";

import { getCampaignById, updateCampaign } from '@/lib/service/health-check-campaign/healthCheckCampaign';
import { UpdateVaccinationDto, Vaccination, VaccinationStatus } from '@/lib/service/health-check-campaign/IHealthCheckCampaign';
import { getHealthCheckupResultsByCampaign } from '@/lib/service/health-checkup-result/health-checkup-result';
import { HealthCheckupResult } from '@/lib/service/health-checkup-result/IHealth-checkup-result';
import { useParams, useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';

type HealthCheckDetailProps = {
    setIsShowDetail: (show: boolean) => void;
    id: number
};

const HealthCheckDetail: React.FC<HealthCheckDetailProps> = ({ setIsShowDetail, id }) => {
    const router = useRouter();

    const [campaign, setCampaign] = useState<Vaccination | null>(null);
    const [studentDetails, setStudentDetails] = useState<HealthCheckupResult[]>([]);
    const [loading, setLoading] = useState(true);

    // Edit states
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UpdateVaccinationDto | null>(null);
    const [updating, setUpdating] = useState(false);

    // Color scheme
    const primaryColor = "bg-red-600";
    const primaryHover = "hover:bg-red-700";
    const secondaryColor = "bg-white";
    const secondaryHover = "hover:bg-gray-50";
    const textPrimary = "text-red-800";
    const textSecondary = "text-gray-700";
    const borderColor = "border-red-200";
    const cardBg = "bg-white";
    const dangerBg = "bg-red-100";
    const warningBg = "bg-yellow-100";
    const successBg = "bg-green-100";
    const shadow = "shadow-lg";

    useEffect(() => {
        setLoading(true);
        getCampaignById(id)
            .then((res) => {
                if (res.success) {
                    setCampaign(res.data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        setLoading(true);
        getHealthCheckupResultsByCampaign(id)
            .then((res) => {
                if (res.success) setStudentDetails(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (campaign) {
            setFormData({
                id: campaign.id,
                campaignName: campaign.campaignName,
                checkupTypes: campaign.checkupTypes,
                scheduledDate: campaign.scheduledDate,
                targetGrades: campaign.targetGrades,
                status: campaign.status === VaccinationStatus.Planned ? 0 :
                        campaign.status === VaccinationStatus.InProgress ? 1 :
                        campaign.status === VaccinationStatus.Completed ? 2 :
                        3 // Cancelled
            });
        }
    }, [campaign]);

    const handleEditClick = () => setIsEditing(true);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!formData) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;
        setUpdating(true);
        try {
            await updateCampaign(formData);
            setIsEditing(false);
            const res = await getCampaignById(id);
            if (res.success) setCampaign(res.data);
        } catch (err) {
            alert('Cập nhật thất bại');
        }
        setUpdating(false);
    };

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Planned': return 'bg-blue-100 text-blue-800';
            case 'InProgress': return 'bg-yellow-100 text-yellow-800';
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
                        <p className="text-red-700 font-medium">Đang tải dữ liệu...</p>
                    </div>
                </div>
            )}
            
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                <div className={`${cardBg} rounded-xl ${shadow} w-full max-w-5xl max-h-[90vh] overflow-y-auto border ${borderColor}`}>
                    {/* Header */}
                    <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-red-800">{campaign?.campaignName}</h2>
                        <button
                            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition"
                            onClick={() => setIsShowDetail(false)}
                            aria-label="Đóng"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Campaign Info */}
                    <div className="p-6">
                        {/* Edit button and form */}
                        {!isEditing && (
                            <div className="flex justify-end mb-6">
                                <button
                                    className={`px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition flex items-center gap-2`}
                                    onClick={handleEditClick}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Chỉnh sửa chiến dịch
                                </button>
                            </div>
                        )}

                        {isEditing && formData && (
                            <form className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200" onSubmit={handleUpdate}>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Tên chiến dịch</label>
                                    <input 
                                        name="campaignName" 
                                        value={formData.campaignName} 
                                        onChange={handleFormChange} 
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Loại khám</label>
                                    <input 
                                        name="checkupTypes" 
                                        value={formData.checkupTypes} 
                                        onChange={handleFormChange} 
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Ngày dự kiến</label>
                                    <input 
                                        type="date"
                                        name="scheduledDate" 
                                        value={formData.scheduledDate} 
                                        onChange={handleFormChange} 
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Khối học sinh</label>
                                    <input 
                                        name="targetGrades" 
                                        value={formData.targetGrades} 
                                        onChange={handleFormChange} 
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                                    <select 
                                        name="status" 
                                        value={formData.status} 
                                        onChange={handleFormChange} 
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                    >
                                        <option value={0}>Planned</option>
                                        <option value={1}>InProgress</option>
                                        <option value={2}>Completed</option>
                                        <option value={3}>Cancelled</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                                    <button 
                                        type="button" 
                                        className={`px-4 py-2 rounded-lg ${secondaryColor} ${secondaryHover} text-red-700 border ${borderColor} font-medium transition`}
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Hủy bỏ
                                    </button>
                                    <button 
                                        type="submit" 
                                        className={`px-4 py-2 rounded-lg ${primaryColor} ${primaryHover} text-white font-medium transition flex items-center gap-2`}
                                        disabled={updating}
                                    >
                                        {updating ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Đang lưu...
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Lưu thay đổi
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Campaign Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="text-sm font-medium text-gray-500">Ngày dự kiến</div>
                                <div className="text-lg font-semibold mt-1">
                                    {new Date(campaign?.scheduledDate || "").toLocaleDateString()}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="text-sm font-medium text-gray-500">Loại khám</div>
                                <div className="text-lg font-semibold mt-1">{campaign?.checkupTypes}</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="text-sm font-medium text-gray-500">Khối học sinh</div>
                                <div className="text-lg font-semibold mt-1">{campaign?.targetGrades}</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="text-sm font-medium text-gray-500">Trạng thái</div>
                                <div className="text-lg font-semibold mt-1">
                                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(campaign?.statusDisplay.toString() || '')}`}>
                                        {campaign?.statusDisplay}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="text-sm font-medium text-gray-500">Tổng số học sinh</div>
                                <div className="text-xl font-bold text-red-700 mt-1">{campaign?.totalStudents}</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="text-sm font-medium text-gray-500">Đã nhận đồng ý</div>
                                <div className="text-xl font-bold text-red-700 mt-1">
                                    {campaign?.consentReceived} <span className="text-sm font-normal text-gray-500">({campaign?.consentRate}%)</span>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="text-sm font-medium text-gray-500">Đã khám</div>
                                <div className="text-xl font-bold text-red-700 mt-1">
                                    {campaign?.checkupsCompleted} <span className="text-sm font-normal text-gray-500">({campaign?.completionRate}%)</span>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="text-sm font-medium text-gray-500">Cần theo dõi</div>
                                <div className="text-xl font-bold text-red-700 mt-1">{campaign?.requiringFollowup}</div>
                            </div>
                        </div>

                        {/* Student Results */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-red-800">Kết quả khám sức khỏe học sinh</h3>
                                <button
                                    className={`px-4 py-2 rounded-lg ${primaryColor} ${primaryHover} text-white font-medium transition flex items-center gap-2`}
                                    onClick={() => router.push('/medical-staff/examination/' + id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Xem chi tiết
                                </button>
                            </div>

                            <div className="rounded-xl border border-gray-200 shadow-inner overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                            <tr className="bg-red-50">
                                                <th className="px-4 py-3 font-semibold text-left text-red-800">Mã HS</th>
                                                <th className="px-4 py-3 font-semibold text-left text-red-800">Tên HS</th>
                                                <th className="px-4 py-3 font-semibold text-left text-red-800">Ngày khám</th>
                                                <th className="px-4 py-3 font-semibold text-left text-red-800">Chiều cao</th>
                                                <th className="px-4 py-3 font-semibold text-left text-red-800">Cân nặng</th>
                                                <th className="px-4 py-3 font-semibold text-left text-red-800">BMI</th>
                                                <th className="px-4 py-3 font-semibold text-left text-red-800">Huyết áp</th>
                                                <th className="px-4 py-3 font-semibold text-left text-red-800">Theo dõi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentDetails.length > 0 ? (
                                                studentDetails.map((detail, idx) => (
                                                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                        <td className="px-4 py-3 border-t border-gray-200">{detail.studentCode}</td>
                                                        <td className="px-4 py-3 border-t border-gray-200 font-medium">{detail.studentName}</td>
                                                        <td className="px-4 py-3 border-t border-gray-200 whitespace-nowrap">
                                                            {new Date(detail.checkupDate).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-3 border-t border-gray-200">{detail.height} cm</td>
                                                        <td className="px-4 py-3 border-t border-gray-200">{detail.weight} kg</td>
                                                        <td className="px-4 py-3 border-t border-gray-200">{detail.bmi.toFixed(2)}</td>
                                                        <td className="px-4 py-3 border-t border-gray-200">{detail.bloodPressure}</td>
                                                        <td className="px-4 py-3 border-t border-gray-200">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${detail.requiresFollowup ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                                                                {detail.requiresFollowup ? 'Có' : 'Không'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                                                        Chưa có kết quả khám sức khỏe nào
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Footer buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                className={`px-6 py-2 rounded-lg ${secondaryColor} ${secondaryHover} text-red-700 border ${borderColor} font-medium transition`}
                                onClick={() => setIsShowDetail(false)}
                            >
                                Đóng
                            </button>
                            <button
                                className={`px-6 py-2 rounded-lg ${primaryColor} ${primaryHover} text-white font-medium transition`}
                                onClick={() => router.push('/medical-staff/examination/' + id)}
                            >
                                Xem đầy đủ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HealthCheckDetail;
