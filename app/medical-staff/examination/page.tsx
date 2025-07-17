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
  [VaccinationStatus.Planned]: "bg-red-100 text-red-700",
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
    } catch (err) {
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
    } catch (err) {
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
    <div className="p-0 md:p-8 bg-gradient-to-tr from-red-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">
          Quản lý khám sức khỏe
        </h1>
        <Button className="bg-green-500" onClick={() => setShowCreateModal(true)}>
            + Tạo đợt khám sức khỏe mới
          </Button>
        {/* Search input */}
        <div className="mb-4 mt-4 flex flex-col md:flex-row gap-2 md:items-center">
          
          <input
            className="w-full border rounded-3xl px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Tìm kiếm theo tên, loại hình, đối tượng..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          
        </div>
        {loading ? (
          <div>Đang tải dữ liệu...</div>
        ) : (
          <div className="space-y-6">
            {paginatedCampaigns.length === 0 ? (
              <div className="text-gray-500">Không tìm thấy kết quả phù hợp.</div>
            ) : (
              paginatedCampaigns.map((c) => (
                <div
                  key={c.id}
                  className="bg-white/90 border border-gray-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {c.campaignName}
                      </h2>
                      <div className="text-sm text-gray-500 mt-1">
                        <span className="inline-block mr-2">
                          <span className="font-medium text-gray-700">
                            Loại hình:
                          </span>{" "}
                          {c.checkupTypes}
                        </span>
                        <span className="inline-block mr-2">
                          <span className="font-medium text-gray-700">
                            Đối tượng:
                          </span>{" "}
                          {c.targetGrades}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium text-gray-700">
                          Ngày khám:
                        </span>{" "}
                        {new Date(c.scheduledDate).toLocaleDateString()}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3 text-sm">
                        <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full font-medium">
                          Dự kiến: {c.totalStudents} hs
                        </span>
                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                          Đã khám: {c.checkupsCompleted} hs
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                          Tỉ lệ hoàn thành: {c.completionRate}%
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                          Tỉ lệ đồng ý: {c.consentRate}%
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "px-4 py-1 rounded-full font-semibold text-sm shadow-sm",
                        statusColors[c.status]
                      )}
                    >
                      {statusTranslations[c.status]}
                    </span>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                      onClick={() => {
                        setIsShowDetail(true);
                        setSelectedCampaignId(c.id);
                      }}
                    >
                      Xem thông tin sơ lược
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full border-green-200 bg-green-100 text-gray-700 hover:bg-green-50 transition-all"
                      onClick={() => {
                        // setIsShowDetail(true);
                        // setSelectedCampaignId(c.id);
                        router.push(`/medical-staff/examination/${c.id}`);
                      }}
                    >
                      Xem thông tin chi tiết
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="rounded-full border-gray-200 bg-red-100 text-red-700 hover:bg-red-50 transition-all"
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
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  Trước
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    size="sm"
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    className={currentPage === i + 1 ? "bg-red-500 text-white" : ""}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
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
        )}
      </div>
      {isShowDetail && (
        <HealthCheckDetail
          setIsShowDetail={setIsShowDetail}
          id={selectedCampaignId || 0}
        />
      )}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Tạo đợt khám sức khỏe mới</h2>
            <div className="space-y-3">
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Tên chiến dịch"
                value={form.campaignName}
                onChange={e => setForm(f => ({ ...f, campaignName: e.target.value }))}
              />
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Loại hình"
                value={form.checkupTypes}
                onChange={e => setForm(f => ({ ...f, checkupTypes: e.target.value }))}
              />
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Ngày khám"
                type="date"
                value={form.scheduledDate}
                onChange={e => setForm(f => ({ ...f, scheduledDate: e.target.value }))}
              />
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Đối tượng"
                value={form.targetGrades}
                onChange={e => setForm(f => ({ ...f, targetGrades: e.target.value }))}
              />
            </div>
            <div className="flex gap-2 mt-6 justify-end">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Hủy
              </Button>
              <Button className="bg-green-500" onClick={handleCreate} disabled={creating}>
                {creating ? "Đang tạo..." : "Tạo"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
