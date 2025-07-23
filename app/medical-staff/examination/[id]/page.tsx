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
        campaignId: number,
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
            
            const res = await getHealthCheckupResultsByCampaign(campaignId);
            if (res.success) {
                setStudentDetails(res.data);
            }
            
            alert('Thêm kết quả thành công!');
            setShowAddForm(false);
            
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
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-8">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
                        <p className="text-red-700 font-medium">Đang tải dữ liệu...</p>
                    </div>
                </div>
            )}
            
            <div className="mx-auto bg-white rounded-xl shadow-lg w-full max-w-7xl p-6 relative overflow-hidden border border-red-100">
                {/* Back button */}
                <button
                    className="absolute top-6 left-6 text-red-700 hover:text-red-800 flex items-center gap-2 p-2 rounded-lg transition"
                    onClick={() => router.push('/medical-staff/examination')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-medium">Quay lại</span>
                </button>

                {/* Header */}
                <div className="text-center mb-8 pt-4">
                    <h1 className="text-3xl font-bold text-red-800 tracking-tight mb-2">
                        Chi tiết khám sức khỏe
                    </h1>
                    <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
                </div>

                {/* Campaign Info */}
                <div className={`p-6 rounded-xl bg-gradient-to-r from-red-50 to-red-100 mb-8 border ${borderColor} ${shadow}`}>
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-red-800">
                            {editMode ? (
                                <input
                                    type="text"
                                    name="campaignName"
                                    value={editData?.campaignName || ''}
                                    onChange={handleInputChange}
                                    className="border rounded-lg px-4 py-2 w-full bg-white focus:ring-2 focus:ring-red-300"
                                />
                            ) : (
                                campaign?.campaignName
                            )}
                        </h2>
                        {editMode ? (
                            <div className="flex gap-2">
                                <button
                                    className={`px-4 py-2 rounded-lg ${secondaryColor} ${secondaryHover} text-red-700 border ${borderColor} font-medium transition`}
                                    onClick={() => setEditMode(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-lg ${primaryColor} ${primaryHover} text-white font-medium transition`}
                                    onClick={handleSave}
                                >
                                    Lưu thay đổi
                                </button>
                            </div>
                        ) : (
                            <button
                                className={`px-4 py-2 rounded-lg ${primaryColor} ${primaryHover} text-white font-medium transition`}
                                onClick={handleEdit}
                            >
                                Chỉnh sửa
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700">
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Ngày dự kiến</div>
                            <div className="font-semibold">
                                {editMode ? (
                                    <input
                                        type="date"
                                        name="scheduledDate"
                                        value={editData?.scheduledDate?.slice(0, 10) || ''}
                                        onChange={handleInputChange}
                                        className="border rounded-lg px-3 py-1 w-full bg-white focus:ring-2 focus:ring-red-300"
                                    />
                                ) : (
                                    new Date(campaign?.scheduledDate || "").toLocaleDateString()
                                )}
                            </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Loại khám</div>
                            <div className="font-semibold">
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="checkupTypes"
                                        value={editData?.checkupTypes || ''}
                                        onChange={handleInputChange}
                                        className="border rounded-lg px-3 py-1 w-full bg-white focus:ring-2 focus:ring-red-300"
                                    />
                                ) : (
                                    campaign?.checkupTypes
                                )}
                            </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Khối học sinh</div>
                            <div className="font-semibold">
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="targetGrades"
                                        value={editData?.targetGrades || ''}
                                        onChange={handleInputChange}
                                        className="border rounded-lg px-3 py-1 w-full bg-white focus:ring-2 focus:ring-red-300"
                                    />
                                ) : (
                                    campaign?.targetGrades
                                )}
                            </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Trạng thái</div>
                            <div className="font-semibold">
                                {editMode ? (
                                    <select
                                        name="status"
                                        value={editData?.status || ''}
                                        onChange={handleInputChange}
                                        className="border rounded-lg px-3 py-1 w-full bg-white focus:ring-2 focus:ring-red-300"
                                    >
                                        <option value={0}>Planned</option>
                                        <option value={1}>InProgress</option>
                                        <option value={2}>Completed</option>
                                        <option value={3}>Cancelled</option>
                                    </select>
                                ) : (
                                    <span className={`px-2 py-1 rounded-full ${campaign?.status === VaccinationStatus.Completed ? 'bg-green-100 text-green-800' : campaign?.status === VaccinationStatus.InProgress ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                        {campaign?.statusDisplay}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Tổng số học sinh</div>
                            <div className="text-xl font-bold text-red-700">{campaign?.totalStudents}</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Đã nhận đồng ý</div>
                            <div className="text-xl font-bold text-red-700">{campaign?.consentReceived} <span className="text-sm font-normal">({campaign?.consentRate}%)</span></div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Đã khám</div>
                            <div className="text-xl font-bold text-red-700">{campaign?.checkupsCompleted} <span className="text-sm font-normal">({campaign?.completionRate}%)</span></div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <div className="text-sm font-medium text-gray-500">Cần theo dõi</div>
                            <div className="text-xl font-bold text-red-700">{campaign?.requiringFollowup}</div>
                        </div>
                    </div>
                </div>

                {/* Student Results Section */}
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xl font-bold text-red-800">Kết quả khám sức khỏe học sinh</h3>
                    <button
                        className={`px-4 py-2 rounded-lg ${primaryColor} ${primaryHover} text-white font-medium transition flex items-center gap-2`}
                        onClick={() => setShowAddForm(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Thêm kết quả
                    </button>
                </div>

                {/* Edit Result Form Modal */}
                {showEditForm && editingResult && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className={`${cardBg} rounded-xl ${shadow} p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border ${borderColor}`}>
                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-red-800">Cập nhật kết quả khám sức khỏe</h3>
                                <button
                                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
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
                            
                            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                                <p className="font-medium"><span className="text-gray-600">Học sinh:</span> {editingResult.studentName} (Mã: {editingResult.studentCode})</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Chiều cao (cm)</label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={editResult.height}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        step="0.1"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Cân nặng (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={editResult.weight}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        step="0.1"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Huyết áp</label>
                                    <input
                                        type="text"
                                        name="bloodPressure"
                                        value={editResult.bloodPressure}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        placeholder="VD: 120/80"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Thị lực</label>
                                    <input
                                        type="text"
                                        name="visionTest"
                                        value={editResult.visionTest}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        placeholder="VD: 10/10"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Thính lực</label>
                                    <input
                                        type="text"
                                        name="hearingTest"
                                        value={editResult.hearingTest}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        placeholder="VD: Bình thường"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Sức khỏe chung</label>
                                    <input
                                        type="text"
                                        name="generalHealth"
                                        value={editResult.generalHealth}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        placeholder="VD: Tốt"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Ngày khám</label>
                                    <input
                                        type="date"
                                        name="checkupDate"
                                        value={editResult.checkupDate}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        required
                                    />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Khuyến nghị</label>
                                    <textarea
                                        name="recommendations"
                                        value={editResult.recommendations}
                                        onChange={handleEditResultChange}
                                        className="w-full border rounded-lg px-4 py-2 h-24 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        placeholder="Nhập khuyến nghị..."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            name="requiresFollowup"
                                            checked={editResult.requiresFollowup}
                                            onChange={handleEditResultChange}
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Cần theo dõi thêm</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                                <button
                                    className={`px-4 py-2 rounded-lg ${secondaryColor} ${secondaryHover} text-red-700 border ${borderColor} font-medium transition`}
                                    onClick={() => {
                                        setShowEditForm(false);
                                        setEditingResult(null);
                                    }}
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-lg ${primaryColor} ${primaryHover} text-white font-medium transition`}
                                    onClick={handleUpdateResult}
                                >
                                    Cập nhật kết quả
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Result Form Modal */}
                {showAddForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className={`${cardBg} rounded-xl ${shadow} p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border ${borderColor}`}>
                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-red-800">Thêm kết quả khám sức khỏe</h3>
                                <button
                                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">ID Học sinh</label>
                                    <input
                                        type="number"
                                        name="studentId"
                                        value={newResult.studentId}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">ID Y tá</label>
                                    <input
                                        type="number"
                                        name="nurseId"
                                        value={newResult.nurseId}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Chiều cao (cm)</label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={newResult.height}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        step="0.1"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Cân nặng (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={newResult.weight}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        step="0.1"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Huyết áp</label>
                                    <input
                                        type="text"
                                        name="bloodPressure"
                                        value={newResult.bloodPressure}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        placeholder="VD: 120/80"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Thị lực</label>
                                    <input
                                        type="text"
                                        name="visionTest"
                                        value={newResult.visionTest}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        placeholder="VD: 10/10"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Thính lực</label>
                                    <input
                                        type="text"
                                        name="hearingTest"
                                        value={newResult.hearingTest}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        placeholder="VD: Bình thường"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Sức khỏe chung</label>
                                    <input
                                        type="text"
                                        name="generalHealth"
                                        value={newResult.generalHealth}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        placeholder="VD: Tốt"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Ngày khám</label>
                                    <input
                                        type="date"
                                        name="checkupDate"
                                        value={newResult.checkupDate}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        required
                                    />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Khuyến nghị</label>
                                    <textarea
                                        name="recommendations"
                                        value={newResult.recommendations}
                                        onChange={handleAddResultChange}
                                        className="w-full border rounded-lg px-4 py-2 h-24 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                                        placeholder="Nhập khuyến nghị..."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            name="requiresFollowup"
                                            checked={newResult.requiresFollowup}
                                            onChange={handleAddResultChange}
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Cần theo dõi thêm</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                                <button
                                    className={`px-4 py-2 rounded-lg ${secondaryColor} ${secondaryHover} text-red-700 border ${borderColor} font-medium transition`}
                                    onClick={() => setShowAddForm(false)}
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-lg ${primaryColor} ${primaryHover} text-white font-medium transition`}
                                    onClick={handleAddResult}
                                >
                                    Thêm kết quả
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Table */}
                <div className="rounded-xl border border-gray-200 shadow-inner overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-red-100">
                                    <th className="px-4 py-3 font-semibold text-left text-red-800">Mã HS</th>
                                    <th className="px-4 py-3 font-semibold text-left text-red-800">Tên HS</th>
                                    <th className="px-4 py-3 font-semibold text-left text-red-800">Ngày khám</th>
                                    <th className="px-4 py-3 font-semibold text-left text-red-800">Chiều cao</th>
                                    <th className="px-4 py-3 font-semibold text-left text-red-800">Cân nặng</th>
                                    <th className="px-4 py-3 font-semibold text-left text-red-800">BMI</th>
                                    <th className="px-4 py-3 font-semibold text-left text-red-800">Huyết áp</th>
                                    <th className="px-4 py-3 font-semibold text-left text-red-800">Thị lực</th>
                                    <th className="px-4 py-3 font-semibold text-left text-red-800">Thính lực</th>
                                    <th className="px-4 py-3 font-semibold text-left text-red-800">Sức khỏe</th>
                                    <th className="px-4 py-3 font-semibold text-left text-red-800">Theo dõi</th>
                                    <th className="px-4 py-3 font-semibold text-left text-red-800">Y tá</th>
                                    <th className="px-4 py-3 font-semibold text-left text-red-800">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentDetails.length > 0 ? (
                                    studentDetails.map((detail, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                            <td className="px-4 py-3 border-t border-gray-200">{detail.studentCode}</td>
                                            <td className="px-4 py-3 border-t border-gray-200 font-medium">{detail.studentName}</td>
                                            <td className="px-4 py-3 border-t border-gray-200 whitespace-nowrap">{new Date(detail.checkupDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 border-t border-gray-200">{detail.height}</td>
                                            <td className="px-4 py-3 border-t border-gray-200">{detail.weight}</td>
                                            <td className="px-4 py-3 border-t border-gray-200">{detail.bmi.toFixed(2)}</td>
                                            <td className="px-4 py-3 border-t border-gray-200">{detail.bloodPressure}</td>
                                            <td className="px-4 py-3 border-t border-gray-200">{detail.visionTest}</td>
                                            <td className="px-4 py-3 border-t border-gray-200">{detail.hearingTest}</td>
                                            <td className="px-4 py-3 border-t border-gray-200">{detail.generalHealth}</td>
                                            <td className="px-4 py-3 border-t border-gray-200">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${detail.requiresFollowup ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                                                    {detail.requiresFollowup ? 'Có' : 'Không'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 border-t border-gray-200">{detail.nurseName}</td>
                                            <td className="px-4 py-3 border-t border-gray-200 whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    <button
                                                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition flex items-center gap-1"
                                                        onClick={() => handleEditResult(detail)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Sửa
                                                    </button>
                                                    <button
                                                        className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 transition flex items-center gap-1"
                                                        onClick={() => handleDeleteResult(detail.id)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Xóa
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={13} className="px-4 py-8 text-center text-gray-500">
                                            Chưa có kết quả khám sức khỏe nào. Vui lòng thêm kết quả mới.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthCheckDetailPage;
