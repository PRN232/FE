"use client";
import { getCampaignById, updateCampaign } from '@/lib/service/health-check-campaign/healthCheckCampaign';
import { Vaccination, UpdateVaccinationDto, VaccinationStatus } from '@/lib/service/health-check-campaign/IHealthCheckCampaign';
import { getHealthCheckupResultsByCampaign, createHealthCheckupResult, updateHealthCheckupResult, deleteHealthCheckupResult } from '@/lib/service/health-checkup-result/health-checkup-result';
import { HealthCheckupResult, CreateHealthCheckupResultDto, UpdateHealthCheckupResultDto } from '@/lib/service/health-checkup-result/IHealth-checkup-result';
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
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingResult, setEditingResult] = useState<HealthCheckupResult | null>(null);
    const [newResult, setNewResult] = useState<CreateHealthCheckupResultDto>({
        studentId: 0,
        campaignId: campaignId,
        height: 0,
        weight: 0,
        bloodPressure: '',
        visionTest: '',
        hearingTest: '',
        generalHealth: '',
        requiresFollowup: false,
        recommendations: '',
        nurseId: 0,
        checkupDate: new Date().toISOString().split('T')[0]
    });
    const [editResult, setEditResult] = useState<UpdateHealthCheckupResultDto>({
        id: 0,
        height: 0,
        weight: 0,
        bloodPressure: '',
        visionTest: '',
        hearingTest: '',
        generalHealth: '',
        requiresFollowup: false,
        recommendations: '',
        checkupDate: new Date().toISOString().split('T')[0]
    });

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
            status: campaign.status === VaccinationStatus.Planned ? 0 :
                    campaign.status === VaccinationStatus.InProgress ? 1 :
                    campaign.status === VaccinationStatus.Completed ? 2 :
                    3 // Cancelled
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

    const handleAddResultChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setNewResult(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
                   type === 'number' ? Number(value) : value
        }));
    };

    const handleAddResult = async () => {
        try {
            setLoading(true);
            const result = await createHealthCheckupResult(newResult);
            
            // Refresh student details
            const res = await getHealthCheckupResultsByCampaign(campaignId);
            if (res.success) {
                setStudentDetails(res.data);
            }
            
            alert('Thêm kết quả thành công!');
            setShowAddForm(false);
            
            // Reset form
            setNewResult({
                studentId: 0,
                campaignId: campaignId,
                height: 0,
                weight: 0,
                bloodPressure: '',
                visionTest: '',
                hearingTest: '',
                generalHealth: '',
                requiresFollowup: false,
                recommendations: '',
                nurseId: 0,
                checkupDate: new Date().toISOString().split('T')[0]
            });
        } catch (err: any) {
            alert(err?.message || 'Lỗi khi thêm kết quả!');
        } finally {
            setLoading(false);
        }
    };

    const handleEditResultChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setEditResult(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
                   type === 'number' ? Number(value) : value
        }));
    };

    const handleEditResult = (result: HealthCheckupResult) => {
        setEditingResult(result);
        setEditResult({
            id: result.id,
            height: result.height,
            weight: result.weight,
            bloodPressure: result.bloodPressure,
            visionTest: result.visionTest,
            hearingTest: result.hearingTest,
            generalHealth: result.generalHealth,
            requiresFollowup: result.requiresFollowup,
            recommendations: result.recommendations,
            checkupDate: result.checkupDate.split('T')[0]
        });
        setShowEditForm(true);
    };

    const handleUpdateResult = async () => {
        try {
            setLoading(true);
            await updateHealthCheckupResult(editResult.id, editResult);
            
            // Refresh student details
            const res = await getHealthCheckupResultsByCampaign(campaignId);
            if (res.success) {
                setStudentDetails(res.data);
            }
            
            alert('Cập nhật kết quả thành công!');
            setShowEditForm(false);
            setEditingResult(null);
        } catch (err: any) {
            alert(err?.message || 'Lỗi khi cập nhật kết quả!');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteResult = async (resultId: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa kết quả này?')) {
            return;
        }

        try {
            setLoading(true);
            await deleteHealthCheckupResult(resultId);

            setStudentDetails(prev => prev.filter(detail => detail.id !== resultId));
            
            alert('Xóa kết quả thành công!');
        } catch (err: any) {
            alert(err?.message || 'Lỗi khi xóa kết quả!');
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
                                <option value={0}>Planned</option>
                                <option value={1}>InProgress</option>
                                <option value={2}>Completed</option>
                                <option value={3}>Cancelled</option>
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

                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Chi tiết kết quả học sinh</h3>
                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        onClick={() => setShowAddForm(true)}
                    >
                        Thêm kết quả
                    </button>
                </div>

                {/* Edit Result Form Modal */}
                {showEditForm && editingResult && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">Cập nhật kết quả khám sức khỏe</h3>
                                <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => {
                                        setShowEditForm(false);
                                        setEditingResult(null);
                                    }}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="mb-4 p-3 bg-gray-50 rounded">
                                <p><strong>Học sinh:</strong> {editingResult.studentName} ({editingResult.studentCode})</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Chiều cao (cm)</label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={editResult.height}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        step="0.1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cân nặng (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={editResult.weight}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        step="0.1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Huyết áp</label>
                                    <input
                                        type="text"
                                        name="bloodPressure"
                                        value={editResult.bloodPressure}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="VD: 120/80"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Thị lực</label>
                                    <input
                                        type="text"
                                        name="visionTest"
                                        value={editResult.visionTest}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="VD: 10/10"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Thính lực</label>
                                    <input
                                        type="text"
                                        name="hearingTest"
                                        value={editResult.hearingTest}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="VD: Bình thường"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Sức khỏe chung</label>
                                    <input
                                        type="text"
                                        name="generalHealth"
                                        value={editResult.generalHealth}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="VD: Tốt"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày khám</label>
                                    <input
                                        type="date"
                                        name="checkupDate"
                                        value={editResult.checkupDate}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Khuyến nghị</label>
                                    <textarea
                                        name="recommendations"
                                        value={editResult.recommendations}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded px-3 py-2 h-20"
                                        placeholder="Nhập khuyến nghị..."
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="requiresFollowup"
                                            checked={editResult.requiresFollowup}
                                            onChange={handleEditResultChange}
                                            className="mr-2"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Cần theo dõi</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                                    onClick={() => {
                                        setShowEditForm(false);
                                        setEditingResult(null);
                                    }}
                                >
                                    Hủy
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    onClick={handleUpdateResult}
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Result Form Modal */}
                {showAddForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">Thêm kết quả khám sức khỏe</h3>
                                <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Học sinh</label>
                                    <input
                                        type="number"
                                        name="studentId"
                                        value={newResult.studentId}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Y tá</label>
                                    <input
                                        type="number"
                                        name="nurseId"
                                        value={newResult.nurseId}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Chiều cao (cm)</label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={newResult.height}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        step="0.1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cân nặng (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={newResult.weight}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        step="0.1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Huyết áp</label>
                                    <input
                                        type="text"
                                        name="bloodPressure"
                                        value={newResult.bloodPressure}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="VD: 120/80"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Thị lực</label>
                                    <input
                                        type="text"
                                        name="visionTest"
                                        value={newResult.visionTest}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="VD: 10/10"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Thính lực</label>
                                    <input
                                        type="text"
                                        name="hearingTest"
                                        value={newResult.hearingTest}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="VD: Bình thường"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Sức khỏe chung</label>
                                    <input
                                        type="text"
                                        name="generalHealth"
                                        value={newResult.generalHealth}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="VD: Tốt"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày khám</label>
                                    <input
                                        type="date"
                                        name="checkupDate"
                                        value={newResult.checkupDate}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Khuyến nghị</label>
                                    <textarea
                                        name="recommendations"
                                        value={newResult.recommendations}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded px-3 py-2 h-20"
                                        placeholder="Nhập khuyến nghị..."
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="requiresFollowup"
                                            checked={newResult.requiresFollowup}
                                            onChange={handleAddResultChange}
                                            className="mr-2"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Cần theo dõi</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                    onClick={handleAddResult}
                                >
                                    Thêm kết quả
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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
                                <th className="border px-3 py-2 font-semibold">Thao tác</th>
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
                                    <td className="border px-3 py-2">
                                        <div className="flex gap-2">
                                            <button
                                                className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition"
                                                onClick={() => handleEditResult(detail)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition"
                                                onClick={() => handleDeleteResult(detail.id)}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
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
