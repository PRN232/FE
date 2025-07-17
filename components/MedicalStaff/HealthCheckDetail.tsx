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

    return (
        <>
            {loading ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="text-gray-700">Đang tải dữ liệu...</div>
                </div>
            ) : null}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-8 relative overflow-hidden">
                    <button
                        className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-3xl font-bold transition"
                        onClick={() => setIsShowDetail(false)}
                        aria-label="Đóng"
                    >
                        &times;
                    </button>
                    <h2 className="text-3xl font-extrabold mb-6 text-red-700">{campaign?.campaignName}</h2>
                    {/* Edit button and form */}
                    {!isEditing && (
                        <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition font-semibold mb-4"
                            onClick={handleEditClick}
                        >
                            Sửa chiến dịch
                        </button>
                    )}
                    {isEditing && formData && (
                        <form className="mb-6 grid grid-cols-2 gap-4" onSubmit={handleUpdate}>
                            <input name="campaignName" value={formData.campaignName} onChange={handleFormChange} className="border px-2 py-1" />
                            <input name="checkupTypes" value={formData.checkupTypes} onChange={handleFormChange} className="border px-2 py-1" />
                            <input name="scheduledDate" value={formData.scheduledDate} onChange={handleFormChange} className="border px-2 py-1" />
                            <input name="targetGrades" value={formData.targetGrades} onChange={handleFormChange} className="border px-2 py-1" />
                            <select name="status" value={formData.status} onChange={handleFormChange} className="border px-2 py-1">
                                {/* <option value="PENDING">PENDING</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="COMPLETED">COMPLETED</option> */}
                                {/* Planned, InProgress, Completed, Cancelled */}
                                <option value={0}>Planned</option>
                                <option value={1}>InProgress</option>
                                <option value={2}>Completed</option>
                                <option value={3}>Cancelled</option>
                                
                            </select>
                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={updating}>
                                {updating ? 'Đang cập nhật...' : 'Lưu'}
                            </button>
                            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setIsEditing(false)}>
                                Hủy
                            </button>
                        </form>
                    )}
                    <div className="mb-8 grid grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
                        <div><strong>Ngày dự kiến:</strong> {new Date(campaign?.scheduledDate || "").toLocaleDateString()}</div>
                        <div><strong>Loại khám:</strong> {campaign?.checkupTypes}</div>
                        <div><strong>Khối học sinh:</strong> {campaign?.targetGrades}</div>
                        <div><strong>Trạng thái:</strong> <span className="px-2 py-1 rounded bg-red-100 text-red-700">{campaign?.statusDisplay}</span></div>
                        <div><strong>Tổng số học sinh:</strong> {campaign?.totalStudents}</div>
                        <div><strong>Đã nhận đồng ý:</strong> {campaign?.consentReceived} ({campaign?.consentRate}%)</div>
                        <div><strong>Đã khám:</strong> {campaign?.checkupsCompleted} ({campaign?.completionRate}%)</div>
                        <div><strong>Cần theo dõi:</strong> {campaign?.requiringFollowup}</div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Chi tiết kết quả học sinh</h3>
                    <div className="overflow-auto max-h-[400px] rounded border border-gray-200 shadow-inner">
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
                    <div className="mt-8 flex justify-end gap-2">
                        <button
                            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition font-semibold"
                            onClick={() => setIsShowDetail(false)}
                        >
                            Đóng
                        </button>
                        <button
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition font-semibold"
                            onClick={() => router.push('/medical-staff/examination/' + id)}
                        >
                           Chi tiết
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HealthCheckDetail;
