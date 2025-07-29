"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { VaccinationCampaign } from "@/lib/service/vaccination/campain/ICampain";
import { getVaccinationCampaigns, updateVaccinationCampaign, createVaccinationCampaign, deleteVaccinationCampaign } from "@/lib/service/vaccination/campain/campain";
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
  "Planned": "bg-red-100 text-red-700",
  "InProgress": "bg-yellow-100 text-yellow-700",
  "Completed": "bg-green-100 text-green-700",
  "Cancelled": "bg-gray-100 text-gray-500",
};

const statusOptions = [
  { value: "Planned", label: "Planned" },
  { value: "InProgress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
];

const PAGE_SIZE = 5;

export default function VaccinationPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<VaccinationCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  // Search & Pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // Form states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<Partial<VaccinationCampaign>>({
    campaignName: "",
    vaccineType: "",
    scheduledDate: "",
    targetGrades: "",
    status: "Planned",
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = () => {
    setLoading(true);
    getVaccinationCampaigns()
      .then((res) => {
        if (res.success) setCampaigns(res.data || []);
      })
      .finally(() => setLoading(false));
  };

  const handleEditClick = (campaign: VaccinationCampaign) => {
    setIsEditMode(true);
    setCurrentCampaign({
      id: campaign.id,
      campaignName: campaign.campaignName,
      vaccineType: campaign.vaccineType,
      scheduledDate: campaign.scheduledDate.split('T')[0], // Format date for input
      targetGrades: campaign.targetGrades,
      status: campaign.status,
    });
    setIsDialogOpen(true);
  };

  const handleCreateClick = () => {
    setIsEditMode(false);
    setCurrentCampaign({
      campaignName: "",
      vaccineType: "",
      scheduledDate: "",
      targetGrades: "",
      status: "Planned",
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa chiến dịch này?")) {
      try {
        const response = await deleteVaccinationCampaign(id);
        if (response.success) {
          alert(response.message || "Xóa chiến dịch thành công");
          fetchCampaigns();
        } else {
          alert(response.message || "Xóa chiến dịch thất bại");
        }
      } catch (error) {
        console.error("Error deleting campaign:", error);
        alert("Đã xảy ra lỗi khi xóa chiến dịch");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (isEditMode && currentCampaign.id) {
        response = await updateVaccinationCampaign(currentCampaign.id, {
          campaignName: currentCampaign.campaignName || "",
          vaccineType: currentCampaign.vaccineType || "",
          scheduledDate: currentCampaign.scheduledDate || "",
          targetGrades: currentCampaign.targetGrades || "",
          status: currentCampaign.status || "Planned",
        });
      } else {
        response = await createVaccinationCampaign({
          campaignName: currentCampaign.campaignName || "",
          vaccineType: currentCampaign.vaccineType || "",
          scheduledDate: currentCampaign.scheduledDate || "",
          targetGrades: currentCampaign.targetGrades || "",
        });
      }

      if (response.success) {
        alert(response.message || "Operation successful");
        fetchCampaigns();
        setIsDialogOpen(false);
      } else {
        alert(response.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error submitting campaign:", error);
      alert("An error occurred while processing your request.");
    }
  };

  // Filter campaigns by search
  const filteredCampaigns = campaigns.filter(c =>
    c.campaignName.toLowerCase().includes(search.toLowerCase()) ||
    c.vaccineType.toLowerCase().includes(search.toLowerCase()) ||
    c.targetGrades.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCampaigns.length / PAGE_SIZE);
  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Reset page if search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-red-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header with search and create button */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Quản lý chiến dịch tiêm chủng
            </h1>

            <div className="flex items-center gap-4">
              <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Tìm kiếm chiến dịch..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <Button onClick={handleCreateClick} className="whitespace-nowrap">
                Thêm chiến dịch mới
              </Button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Tổng chiến dịch</p>
              <p className="text-2xl font-bold text-gray-800">{campaigns.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Đang hoạt động</p>
              <p className="text-2xl font-bold text-blue-600">
                {campaigns.filter(c => c.status === 'InProgress').length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Đã hoàn thành</p>
              <p className="text-2xl font-bold text-green-600">
                {campaigns.filter(c => c.status === 'Completed').length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">Tỉ lệ hoàn thành TB</p>
              <p className="text-2xl font-bold text-purple-600">
                {campaigns.length > 0 
                  ? Math.round(campaigns.reduce((acc, c) => acc + c.completionRate, 0) / campaigns.length) 
                  : 0}%
              </p>
            </div>
          </div>
        </div>

        {/* Campaign list */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedCampaigns.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Không tìm thấy chiến dịch</h3>
                <p className="mt-1 text-sm text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc tạo chiến dịch mới</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {paginatedCampaigns.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800 mb-1">
                            {c.campaignName}
                          </h2>
                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <span className="flex items-center">
                              <svg className="h-4 w-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                              </svg>
                              {c.vaccineType}
                            </span>
                            <span className="flex items-center">
                              <svg className="h-4 w-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              {c.targetGrades}
                            </span>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-semibold",
                            statusColors[c.status] || "bg-gray-100 text-gray-700"
                          )}
                        >
                          {c.statusDisplay}
                        </span>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Tiến độ tiêm chủng</span>
                          <span className="text-sm font-medium text-gray-900">{c.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${c.completionRate}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-5 w-5 text-green-500">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-2">
                            <p className="text-gray-900 font-medium">{c.vaccinationsCompleted}</p>
                            <p className="text-gray-500">Đã tiêm</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-2">
                            <p className="text-gray-900 font-medium">{c.consentReceived}</p>
                            <p className="text-gray-500">Đồng ý</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-5 w-5 text-purple-500">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                          </div>
                          <div className="ml-2">
                            <p className="text-gray-900 font-medium">{c.totalStudents}</p>
                            <p className="text-gray-500">Tổng số</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-5 w-5 text-yellow-500">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-2">
                            <p className="text-gray-900 font-medium">
                              {new Date(c.scheduledDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-500">Ngày tiêm</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-3 flex justify-end gap-2 border-t border-gray-200">
                      <Button
                        variant="outline"
                        onClick={() => handleEditClick(c)}
                      >
                        Chỉnh sửa
                      </Button>
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleDeleteClick(c.id)}
                      >
                        Xóa
                      </Button>
                      <Button
                        onClick={() => router.push(`/medical-staff/vaccination/${c.id}`)}
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Hiển thị <span className="font-medium">{(currentPage - 1) * PAGE_SIZE + 1}</span> đến{' '}
                      <span className="font-medium">
                        {Math.min(currentPage * PAGE_SIZE, campaigns.length)}
                      </span>{' '}
                      trong số <span className="font-medium">{campaigns.length}</span> kết quả
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = currentPage <= 3 ? i + 1 :
                          currentPage >= totalPages - 2 ? totalPages - 4 + i :
                            currentPage - 2 + i;
                        if (page < 1 || page > totalPages) return null;

                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                                ? 'z-10 bg-red-50 border-red-500 text-red-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                          >
                            {page}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create/Edit Campaign Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Chỉnh sửa chiến dịch" : "Thêm chiến dịch mới"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="campaignName" className="text-right">
                  Tên chiến dịch
                </Label>
                <Input
                  id="campaignName"
                  value={currentCampaign.campaignName}
                  onChange={(e) => setCurrentCampaign({...currentCampaign, campaignName: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vaccineType" className="text-right">
                  Loại vaccine
                </Label>
                <Input
                  id="vaccineType"
                  value={currentCampaign.vaccineType}
                  onChange={(e) => setCurrentCampaign({...currentCampaign, vaccineType: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="targetGrades" className="text-right">
                  Khối lớp mục tiêu
                </Label>
                <Input
                  id="targetGrades"
                  value={currentCampaign.targetGrades}
                  onChange={(e) => setCurrentCampaign({...currentCampaign, targetGrades: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="scheduledDate" className="text-right">
                  Ngày tiêm dự kiến
                </Label>
                <Input
                  id="scheduledDate"
                  type="date"
                  value={currentCampaign.scheduledDate}
                  onChange={(e) => setCurrentCampaign({...currentCampaign, scheduledDate: e.target.value})}
                  className="col-span-3"
                  required
                />
              </div>
              {isEditMode && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Trạng thái
                  </Label>
                  <Select
                    value={currentCampaign.status}
                    onValueChange={(value) => setCurrentCampaign({...currentCampaign, status: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button type="submit">
                {isEditMode ? "Cập nhật" : "Tạo mới"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
