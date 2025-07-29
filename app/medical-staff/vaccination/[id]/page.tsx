"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VaccinationStatus } from "@/lib/service/health-check-campaign/IHealthCheckCampaign";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Calendar, Users, Syringe, FileText, User, Clock, Plus, Pencil, Trash2 } from "lucide-react";
import { getVaccinationCampaigns } from "@/lib/service/vaccination/campain/campain";
import { getVaccinationRecordByCampaign, createCampaignRecord, updateCampaign, deleteCampaign } from "@/lib/service/vaccination-result/Vaccination-Result";
import { VaccinationCampaign } from "@/lib/service/vaccination/campain/ICampain";
import { VaccinationResult, CreateVaccinationResultDto, UpdateVaccinationResultDto } from "@/lib/service/vaccination-result/IVaccination-Result";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const statusColors: { [key: string]: string } = {
    "Planned": "bg-blue-100 text-blue-700",
    "InProgress": "bg-yellow-100 text-yellow-700",
    "Completed": "bg-green-100 text-green-700",
    "Cancelled": "bg-red-100 text-red-700",
};

const statusTranslations: { [key in VaccinationStatus]: string } = {
    [VaccinationStatus.Planned]: "Đã lên lịch",
    [VaccinationStatus.InProgress]: "Đang tiến hành",
    [VaccinationStatus.Completed]: "Hoàn thành",
    [VaccinationStatus.Cancelled]: "Đã hủy",
};

const PAGE_SIZE = 10;

export default function VaccinationDetailPage() {
    const router = useRouter();
    const params = useParams();
    const campaignId = Number(params.id);
    //   const { toast } = useToast();

    const [campaign, setCampaign] = useState<VaccinationCampaign | null>(null);
    const [vaccinationRecords, setVaccinationRecords] = useState<VaccinationResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [recordsLoading, setRecordsLoading] = useState(true);

    // Search & Pagination for records
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<VaccinationStatus | "all">("all");

    // Form states
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<VaccinationResult | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<CreateVaccinationResultDto>({
        studentId: 0,
        campaignId: campaignId,
        vaccineType: "",
        vaccinationDate: "",
        batchNumber: "",
        nurseId: 0,
        sideEffects: "",
        result: VaccinationStatus.Planned,
    });

    useEffect(() => {
        fetchCampaignData();
        fetchVaccinationRecords();
    }, [campaignId]);

    const fetchCampaignData = async () => {
        setLoading(true);
        try {
            const response = await getVaccinationCampaigns();
            if (response.success) {
                const foundCampaign = response?.data?.find(c => c.id === campaignId);
                setCampaign(foundCampaign || null);
                // Set default vaccine type from campaign
                if (foundCampaign) {
                    setFormData(prev => ({
                        ...prev,
                        vaccineType: foundCampaign.vaccineType,
                        campaignId: foundCampaign.id
                    }));
                }
            }
        } catch (error) {
            console.error("Error fetching campaign data:", error);
            //   toast({
            //     title: "Lỗi",
            //     description: "Không thể tải thông tin chiến dịch",
            //     variant: "destructive",
            //   });
            alert("Error fetching campaign data");
        } finally {
            setLoading(false);
        }
    };

    const fetchVaccinationRecords = async () => {
        setRecordsLoading(true);
        try {
            const response = await getVaccinationRecordByCampaign(campaignId);
            if (response.success) {
                setVaccinationRecords(response.data);
            }
        } catch (error) {
            console.error("Error fetching vaccination records:", error);
            alert("Error fetching vaccination records");
        } finally {
            setRecordsLoading(false);
        }
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle status select change
    const handleStatusChange = (value: string) => {
        // convert string to VaccinationStatus enum
        setFormData(prev => ({
            ...prev,
            result: value as unknown as VaccinationStatus,
        }));
        // setFormData(prev => ({
        //     ...prev,
        //     result: value,
        // }));
    };

    // Open form for creating new record
    const handleCreateNew = () => {
        setCurrentRecord(null);
        setFormData({
            studentId: 0,
            campaignId: campaignId,
            vaccineType: campaign?.vaccineType || "",
            vaccinationDate: "",
            batchNumber: "",
            nurseId: 0,
            sideEffects: "",
            result: VaccinationStatus.Planned,
        });
        setOpenDialog(true);
    };

    // Open form for editing existing record
    const handleEdit = (record: VaccinationResult) => {
        setCurrentRecord(record);
        setFormData({
            studentId: record.studentId,
            campaignId: record.campaignId,
            vaccineType: record.vaccineType,
            vaccinationDate: record.vaccinationDate || "",
            batchNumber: record.batchNumber || "",
            nurseId: record.nurseId || 0,
            sideEffects: record.sideEffects || "",
            result: record.result as VaccinationStatus,
        });
        setOpenDialog(true);
    };

    // Prepare delete confirmation
    const handleDeleteClick = (record: VaccinationResult) => {
        setCurrentRecord(record);
        setOpenDeleteDialog(true);
    };

    // Submit form (create or update)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let response;
            if (currentRecord) {
                // Update existing record
                response = await updateCampaign(currentRecord.id, formData as UpdateVaccinationResultDto);
            } else {
                // Create new record
                response = await createCampaignRecord(formData);
            }

            if (response.success) {
                alert("Operation successful");
                fetchVaccinationRecords();
                setOpenDialog(false);
            } else {
                throw new Error(response.message || "Operation failed");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Confirm delete
    const handleConfirmDelete = async () => {
        if (!currentRecord) return;

        setIsSubmitting(true);
        try {
            const response = await deleteCampaign(currentRecord.id);
            if (response.success) {
                alert("Xóa thông tin tiêm chủng thành công");
                fetchVaccinationRecords();
            } else {
                throw new Error(response.message || "Delete failed");
            }
        } catch (error) {
            console.error("Error deleting record:", error);
            alert("Error deleting record");
        } finally {
            setIsSubmitting(false);
            setOpenDeleteDialog(false);
        }
    };

    // Filter records by search and status
    const filteredRecords = vaccinationRecords.filter(record => {
        const matchesSearch =
            record.studentName.toLowerCase().includes(search.toLowerCase()) ||
            record.studentCode.toLowerCase().includes(search.toLowerCase()) ||
            record.nurseName.toLowerCase().includes(search.toLowerCase()) ||
            record.batchNumber.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = statusFilter === "all" || record.result === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredRecords.length / PAGE_SIZE);
    const paginatedRecords = filteredRecords.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, statusFilter]);

    // Statistics
    const stats = {
        total: vaccinationRecords.length,
        completed: vaccinationRecords.filter(r => r.result === VaccinationStatus.Completed).length,
        planned: vaccinationRecords.filter(r => r.result === VaccinationStatus.Planned).length,
        inProgress: vaccinationRecords.filter(r => r.result === VaccinationStatus.InProgress).length,
        cancelled: vaccinationRecords.filter(r => r.result === VaccinationStatus.Cancelled).length,
    };

    if (loading) {
        return (
            <div className="p-8 bg-gradient-to-tr from-blue-50 to-white min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Đang tải thông tin chiến dịch...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="p-8 bg-gradient-to-tr from-blue-50 to-white min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-12">
                        <p className="text-gray-600">Không tìm thấy thông tin chiến dịch</p>
                        <Button
                            className="mt-4"
                            onClick={() => router.push("/medical-staff/vaccination")}
                        >
                            Quay lại danh sách
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-0 md:p-8 bg-gradient-to-tr from-blue-50 to-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push("/medical-staff/vaccination")}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                        Chi tiết chiến dịch tiêm chủng
                    </h1>
                </div>

                {/* Campaign Info Card */}
                <div className="bg-white/90 border border-gray-100 rounded-2xl shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                                {campaign.campaignName}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Syringe className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium text-gray-700">Loại vaccine:</span>
                                    <span className="text-gray-600">{campaign.vaccineType}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium text-gray-700">Ngày tiêm:</span>
                                    <span className="text-gray-600">
                                        {new Date(campaign.scheduledDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-blue-500" />
                                    <span className="font-medium text-gray-700">Đối tượng:</span>
                                    <span className="text-gray-600">{campaign.targetGrades}</span>
                                </div>
                            </div>
                        </div>
                        <span
                            className={cn(
                                "px-4 py-2 rounded-full font-semibold text-sm shadow-sm",
                                statusColors[campaign.status] || "bg-gray-100 text-gray-700"
                            )}
                        >
                            {campaign.statusDisplay}
                        </span>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="bg-white/90 border border-gray-100 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                        <div className="text-sm text-gray-600">Tổng số</div>
                    </div>
                    <div className="bg-white/90 border border-gray-100 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                        <div className="text-sm text-gray-600">Đã tiêm</div>
                    </div>
                    <div className="bg-white/90 border border-gray-100 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
                        <div className="text-sm text-gray-600">Đang tiêm</div>
                    </div>
                    <div className="bg-white/90 border border-gray-100 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{stats.planned}</div>
                        <div className="text-sm text-gray-600">Đã lên lịch</div>
                    </div>
                    <div className="bg-white/90 border border-gray-100 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
                        <div className="text-sm text-gray-600">Đã hủy</div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex-1 max-w-md">
                        <input
                            className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tìm kiếm theo tên học sinh, mã học sinh, y tá, số lô..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="min-w-[200px]">
                            <select
                                className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value as VaccinationStatus | "all")}
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value={VaccinationStatus.Planned}>Đã lên lịch</option>
                                <option value={VaccinationStatus.InProgress}>Đang tiến hành</option>
                                <option value={VaccinationStatus.Completed}>Hoàn thành</option>
                                <option value={VaccinationStatus.Cancelled}>Đã hủy</option>
                            </select>
                        </div>
                        <Button onClick={handleCreateNew} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Thêm mới
                        </Button>
                    </div>
                </div>

                {/* Records Table */}
                <div className="bg-white/90 border border-gray-100 rounded-2xl shadow-md">
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Danh sách học sinh ({filteredRecords.length} học sinh)
                        </h3>
                    </div>

                    {recordsLoading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-2 text-gray-600">Đang tải danh sách...</p>
                        </div>
                    ) : paginatedRecords.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            Không tìm thấy kết quả phù hợp
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Học sinh
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ngày tiêm
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Số lô
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Y tá
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tác dụng phụ
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Trạng thái
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedRecords.map((record) => (
                                        <tr key={record.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <User className="h-4 w-4 text-gray-400 mr-2" />
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {record.studentName}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {record.studentCode}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                                    {record.vaccinationDate ?
                                                        new Date(record.vaccinationDate).toLocaleDateString() :
                                                        "Chưa tiêm"
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {record.batchNumber || "—"}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {record.nurseName || "—"}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-sm text-gray-900 max-w-xs">
                                                    {record.sideEffects || "Không có"}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span
                                                    className={cn(
                                                        "px-3 py-1 rounded-full text-xs font-medium",
                                                        statusColors[record.result] || "bg-gray-100 text-gray-700"
                                                    )}
                                                >
                                                    {statusTranslations[record.result as VaccinationStatus] || record.resultDisplay}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEdit(record)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(record)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 p-4 border-t border-gray-100">
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                            >
                                Trước
                            </Button>
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                                if (pageNum > totalPages) return null;
                                return (
                                    <Button
                                        key={pageNum}
                                        size="sm"
                                        variant={currentPage === pageNum ? "default" : "outline"}
                                        className={currentPage === pageNum ? "bg-blue-500 text-white" : ""}
                                        onClick={() => setCurrentPage(pageNum)}
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                            >
                                Sau
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-[600px] bg-white">
                    <DialogHeader>
                        <DialogTitle>
                            {currentRecord ? "Cập nhật thông tin tiêm chủng" : "Thêm mới thông tin tiêm chủng"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="studentId">Mã học sinh</Label>
                                    <Input
                                        id="studentId"
                                        name="studentId"
                                        type="number"
                                        required
                                        value={formData.studentId}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vaccineType">Loại vaccine</Label>
                                    <Input
                                        id="vaccineType"
                                        name="vaccineType"
                                        required
                                        value={formData.vaccineType}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="vaccinationDate">Ngày tiêm</Label>
                                    <Input
                                        id="vaccinationDate"
                                        name="vaccinationDate"
                                        type="date"
                                        value={formData.vaccinationDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="batchNumber">Số lô</Label>
                                    <Input
                                        id="batchNumber"
                                        name="batchNumber"
                                        value={formData.batchNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nurseId">Mã y tá</Label>
                                    <Input
                                        id="nurseId"
                                        name="nurseId"
                                        type="number"
                                        value={formData.nurseId}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="result">Trạng thái</Label>
                                    <select
                                        value={formData.result}
                                        onChange={(e) => handleStatusChange(e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="" disabled selected>Chọn trạng thái</option>
                                        <option value={VaccinationStatus.Planned}>Đã lên lịch</option>
                                        <option value={VaccinationStatus.InProgress}>Đang tiến hành</option>
                                        <option value={VaccinationStatus.Completed}>Hoàn thành</option>
                                        <option value={VaccinationStatus.Cancelled}>Đã hủy</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sideEffects">Tác dụng phụ</Label>
                                <Input
                                    id="sideEffects"
                                    name="sideEffects"
                                    value={formData.sideEffects}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpenDialog(false)}
                                disabled={isSubmitting}
                            >
                                Hủy
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Đang xử lý..." : currentRecord ? "Cập nhật" : "Thêm mới"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${openDeleteDialog ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            >
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setOpenDeleteDialog(false)}
                />

                {/* Dialog container */}
                <div className="relative z-50 w-full max-w-md rounded-lg bg-white shadow-xl">
                    {/* Dialog content */}
                    <div className="p-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Bạn có chắc chắn muốn xóa?</h3>
                            <p className="text-sm text-gray-500">
                                Hành động này không thể hoàn tác. Bạn sẽ xóa thông tin tiêm chủng của học sinh {currentRecord?.studentName}.
                            </p>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => setOpenDeleteDialog(false)}
                                className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang xử lý...
                                    </span>
                                ) : "Xác nhận xóa"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}