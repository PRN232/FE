"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CreateVaccinationDto, Vaccination, VaccinationStatus } from "@/lib/service/health-check-campaign/IHealthCheckCampaign";
import { getAllCampaigns, createCampaign, deleteCampaign } from "@/lib/service/health-check-campaign/healthCheckCampaign";
import HealthCheckDetail from "@/components/MedicalStaff/HealthCheckDetail";
import { useRouter } from "next/navigation";

const statusTranslations: { [key in VaccinationStatus]: string } = {
  [VaccinationStatus.Planned]: "Đã lên lịch",
  [VaccinationStatus.InProgress]: "Đang tiến hành",
  [VaccinationStatus.Completed]: "Hoàn thành",
  [VaccinationStatus.Cancelled]: "Đã hủy",
};

const statusColors: { [key in VaccinationStatus]: string } = {
  [VaccinationStatus.Planned]: "bg-blue-100 text-blue-700",
  [VaccinationStatus.InProgress]: "bg-yellow-100 text-yellow-700",
  [VaccinationStatus.Completed]: "bg-green-100 text-green-700",
  [VaccinationStatus.Cancelled]: "bg-gray-100 text-gray-500",
};

const PAGE_SIZE = 5;

export default function ExaminationPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Vaccination[]>([]);
  const [loading, setLoading] = useState(true);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState<CreateVaccinationDto>({
    campaignName: "",
    checkupTypes: "",
    scheduledDate: "",
    targetGrades: "",
  });
  const [creating, setCreating] = useState(false);

  // Search & Pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = () => {
    setLoading(true);
    getAllCampaigns()
      .then((res) => {
        if (res.success) setCampaigns(res.data);
      })
      .finally(() => setLoading(false));
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      await createCampaign(form);
      setShowCreateModal(false);
      setForm({
        campaignName: "",
        checkupTypes: "",
        scheduledDate: "",
        targetGrades: "",
      });
      fetchCampaigns();
    } catch {
      alert("Tạo đợt khám thất bại");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa đợt khám này?")) return;
    try {
      await deleteCampaign(id);
      fetchCampaigns();
    } catch {
      alert("Xóa đợt khám thất bại");
    }
  };

  // Filter campaigns by search
  const filteredCampaigns = campaigns.filter(c =>
    c.campaignName.toLowerCase().includes(search.toLowerCase()) ||
    c.checkupTypes.toLowerCase().includes(search.toLowerCase()) ||
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
    <div className="p-4 md:p-8 bg-gradient-to-tr from-blue-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            Quản lý khám sức khỏe
          </h1>
          <Button 
            className="bg-green-600 hover:bg-green-700 shadow-md"
            onClick={() => setShowCreateModal(true)}
          >
            + Tạo đợt khám mới
          </Button>
        </div>

        {/* Search input */}
        <div className="mb-6">
          <div className="relative">
            <input
              className="w-full border rounded-lg px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Tìm kiếm theo tên, loại hình, đối tượng..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedCampaigns.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-500 text-lg">Không tìm thấy đợt khám nào phù hợp</p>
                <Button 
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowCreateModal(true)}
                >
                  Tạo đợt khám mới
                </Button>
              </div>
            ) : (
              paginatedCampaigns.map((c) => (
                <div
                  key={c.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">
                          {c.campaignName}
                        </h2>
                        <span
                          className={cn(
                            "px-3 py-1 rounded-full font-semibold text-xs",
                            statusColors[c.status]
                          )}
                        >
                          {statusTranslations[c.status]}
                        </span>
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-600 space-y-1">
                        <div>
                          <span className="font-medium">Loại hình:</span> {c.checkupTypes}
                        </div>
                        <div>
                          <span className="font-medium">Đối tượng:</span> {c.targetGrades}
                        </div>
                        <div>
                          <span className="font-medium">Ngày khám:</span> {new Date(c.scheduledDate).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Tiến độ hoàn thành</span>
                          <span>{c.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${c.completionRate}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                          Tổng: {c.totalStudents} học sinh
                        </div>
                        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          Đã khám: {c.checkupsCompleted}
                        </div>
                        <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                          Đồng ý: {c.consentReceived}
                        </div>
                        <div className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                          Theo dõi: {c.requiringFollowup}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-200 text-blue-700 hover:bg-blue-50"
                      onClick={() => {
                        setIsShowDetail(true);
                        setSelectedCampaignId(c.id);
                      }}
                    >
                      Xem nhanh
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50"
                      onClick={() => router.push(`/medical-staff/examination/${c.id}`)}
                    >
                      Chi tiết
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(c.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              ))
            )}

            {/* Pagination controls */}
            {totalPages > 0 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  Trước
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        className={currentPage === pageNum ? "bg-blue-600 text-white" : ""}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  Sau
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Tạo đợt khám mới</h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowCreateModal(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên chiến dịch</label>
                <input
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="VD: Khám sức khỏe đầu năm 2023"
                  value={form.campaignName}
                  onChange={e => setForm(f => ({ ...f, campaignName: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại hình khám</label>
                <input
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="VD: Khám tổng quát, khám răng miệng"
                  value={form.checkupTypes}
                  onChange={e => setForm(f => ({ ...f, checkupTypes: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày khám</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={form.scheduledDate}
                  onChange={e => setForm(f => ({ ...f, scheduledDate: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Khối lớp</label>
                <input
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="VD: Khối 1, Khối 2"
                  value={form.targetGrades}
                  onChange={e => setForm(f => ({ ...f, targetGrades: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateModal(false)}
              >
                Hủy
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700" 
                onClick={handleCreate} 
                disabled={creating}
              >
                {creating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang tạo...
                  </>
                ) : "Tạo đợt khám"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Health Check Detail Modal */}
      {isShowDetail && selectedCampaignId && (
        <HealthCheckDetail
          setIsShowDetail={setIsShowDetail}
          id={selectedCampaignId}
        />
      )}
    </div>
  );
}
