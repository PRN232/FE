"use client";
import { getCampaignById, updateCampaign } from '@/lib/service/health-check-campaign/healthCheckCampaign';
import { Vaccination, UpdateVaccinationDto } from '@/lib/service/health-check-campaign/IHealthCheckCampaign';
import { getHealthCheckupResultsByCampaign } from '@/lib/service/health-checkup-result/health-checkup-result';
import { HealthCheckupResult } from '@/lib/service/health-checkup-result/IHealth-checkup-result';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const HealthCheckDetailPage: React.FC = () => {
    const { id } = useParams();
    const router = useRouter();
    const campaignId = Number(id);

    const [campaign, setCampaign] = useState<Vaccination | null>(null);
    const [studentDetails, setStudentDetails] = useState<HealthCheckupResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState<UpdateVaccinationDto | null>(null);

    useEffect(() => {
        setLoading(true);
        getCampaignById(campaignId)
            .then((res) => {
                if (res.success) {
                    setCampaign(res.data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [campaignId]);

    useEffect(() => {
        setLoading(true);
        getHealthCheckupResultsByCampaign(campaignId)
            .then((res) => {
                if (res.success) {
                    setStudentDetails(res.data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [campaignId]);

    const handleEdit = () => {
        if (!campaign) return;
        setEditData({
            id: campaign.id,
            campaignName: campaign.campaignName,
            checkupTypes: campaign.checkupTypes,
            scheduledDate: campaign.scheduledDate,
            targetGrades: campaign.targetGrades,
            status: campaign.status,
        });
        setEditMode(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!editData) return;
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleSave = async () => {
        if (!editData) return;
        try {
            setLoading(true);
            const res = await updateCampaign(editData);
            if (res.success) {
                setCampaign(res.data);
                alert('Cập nhật thành công!');
                setEditMode(false);
            } else {
                alert(res.message || 'Cập nhật thất bại!');
            }
        } catch (err: any) {
            alert(err?.message || 'Lỗi khi cập nhật!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="text-gray-700">Đang tải dữ liệu...</div>
                </div>
            )}
            <div className="mx-auto bg-white rounded-2xl  w-full max-w-7xl p-8 relative overflow-hidden">
                <button
                    className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 flex items-center gap-2 p-2 rounded transition"
                    onClick={() => router.push('/medical-staff/examination')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Quay lại
                </button>
                <h1 className="text-3xl font-bold mb-6 mt-7 text-gray-800 tracking-tight">
                    Chi tiết khám sức khỏe
                </h1>

                <h2 className="text-3xl font-extrabold mb-6 text-red-700">
                    {editMode ? (
                        <input
                            type="text"
                            name="campaignName"
                            value={editData?.campaignName || ''}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1 w-full"
                        />
                    ) : (
                        campaign?.campaignName
                    )}
                    <div className="mt-2">
                        {editMode ? (
                            <button
                                className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                                onClick={handleSave}
                            >
                                Lưu
                            </button>
                        ) : (
                            <button
                                className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
                                onClick={handleEdit}
                            >
                                Chỉnh sửa
                            </button>
                        )}
                    </div>
                </h2>

                <div className="mb-8 grid grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
                    <div>
                        <strong>Ngày dự kiến:</strong>{" "}
                        {editMode ? (
                            <input
                                type="date"
                                name="scheduledDate"
                                value={editData?.scheduledDate?.slice(0, 10) || ''}
                                onChange={handleInputChange}
                                className="border rounded px-2 py-1"
                            />
                        ) : (
                            new Date(campaign?.scheduledDate || "").toLocaleDateString()
                        )}
                    </div>
                    <div>
                        <strong>Loại khám:</strong>{" "}
                        {editMode ? (
                            <input
                                type="text"
                                name="checkupTypes"
                                value={editData?.checkupTypes || ''}
                                onChange={handleInputChange}
                                className="border rounded px-2 py-1"
                            />
                        ) : (
                            campaign?.checkupTypes
                        )}
                    </div>
                    <div>
                        <strong>Khối học sinh:</strong>{" "}
                        {editMode ? (
                            <input
                                type="text"
                                name="targetGrades"
                                value={editData?.targetGrades || ''}
                                onChange={handleInputChange}
                                className="border rounded px-2 py-1"
                            />
                        ) : (
                            campaign?.targetGrades
                        )}
                    </div>
                    <div>
                        <strong>Trạng thái:</strong>{" "}
                        {editMode ? (
                            <select
                                name="status"
                                value={editData?.status || ''}
                                onChange={handleInputChange}
                                className="border rounded px-2 py-1"
                            >
                                <option value="pending">Đang chờ</option>
                                <option value="active">Đang diễn ra</option>
                                <option value="completed">Hoàn thành</option>
                            </select>
                        ) : (
                            <span className="px-2 py-1 rounded bg-red-100 text-red-700">{campaign?.statusDisplay}</span>
                        )}
                    </div>
                    <div><strong>Tổng số học sinh:</strong> {campaign?.totalStudents}</div>
                    <div><strong>Đã nhận đồng ý:</strong> {campaign?.consentReceived} ({campaign?.consentRate}%)</div>
                    <div><strong>Đã khám:</strong> {campaign?.checkupsCompleted} ({campaign?.completionRate}%)</div>
                    <div><strong>Cần theo dõi:</strong> {campaign?.requiringFollowup}</div>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-gray-800">Chi tiết kết quả học sinh</h3>
                <div className="rounded border border-gray-200 shadow-inner">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead>
                            <tr className="bg-red-50">
                                <th className="border px-3 py-2 font-semibold">Mã HS</th>
                                <th className="border px-3 py-2 font-semibold">Tên HS</th>
                                <th className="border px-3 py-2 font-semibold">Ngày khám</th>
                                <th className="border px-3 py-2 font-semibold">Chiều cao (cm)</th>
                                <th className="border px-3 py-2 font-semibold">Cân nặng (kg)</th>
                                <th className="border px-3 py-2 font-semibold">BMI</th>
                                <th className="border px-3 py-2 font-semibold">Huyết áp</th>
                                <th className="border px-3 py-2 font-semibold">Thị lực</th>
                                <th className="border px-3 py-2 font-semibold">Thính lực</th>
                                <th className="border px-3 py-2 font-semibold">Sức khỏe chung</th>
                                <th className="border px-3 py-2 font-semibold">Cần theo dõi</th>
                                <th className="border px-3 py-2 font-semibold">Khuyến nghị</th>
                                <th className="border px-3 py-2 font-semibold">Y tá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentDetails.map((detail, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="border px-3 py-2">{detail.studentCode}</td>
                                    <td className="border px-3 py-2">{detail.studentName}</td>
                                    <td className="border px-3 py-2">{new Date(detail.checkupDate).toLocaleDateString()}</td>
                                    <td className="border px-3 py-2">{detail.height}</td>
                                    <td className="border px-3 py-2">{detail.weight}</td>
                                    <td className="border px-3 py-2">{detail.bmi.toFixed(2)}</td>
                                    <td className="border px-3 py-2">{detail.bloodPressure}</td>
                                    <td className="border px-3 py-2">{detail.visionTest}</td>
                                    <td className="border px-3 py-2">{detail.hearingTest}</td>
                                    <td className="border px-3 py-2">{detail.generalHealth}</td>
                                    <td className="border px-3 py-2">
                                        <span className={`px-2 py-1 rounded ${detail.requiresFollowup ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                            {detail.requiresFollowup ? 'Có' : 'Không'}
                                        </span>
                                    </td>
                                    <td className="border px-3 py-2">{detail.recommendations}</td>
                                    <td className="border px-3 py-2">{detail.nurseName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HealthCheckDetailPage;