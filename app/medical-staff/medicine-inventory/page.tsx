"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAllMedications, createMedication, deleteMedication, updateMedication } from "@/lib/service/medications/medications";
import { Medication } from "@/lib/service/medications/IMedications";

const medicationTypeTranslations: Record<string, string> = {
  PainRelief: "Giảm đau",
  Supplement: "Bổ sung",
  Antibiotic: "Kháng sinh",
  Inhaler: "Xịt hen",
  Hydration: "Bù nước",
};

const PAGE_SIZE = 6;

export default function MedicineInventoryPage() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state for adding/editing medication
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<{
    name: string;
    type: string;
    description: string;
    stockQuantity: number;
    expiryDate: string;
    storageInstructions: string;
  }>({
    name: "",
    type: "",
    description: "",
    stockQuantity: 0,
    expiryDate: "",
    storageInstructions: "",
  });

  // Bulk update state
  const [showBulkUpdate, setShowBulkUpdate] = useState(false);
  const [bulkUpdates, setBulkUpdates] = useState<Record<number, number>>({});

  // Search & filter state
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMedications = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAllMedications();
        if (res.success) {
          setMedications(res.data);
          // Initialize bulk updates with current quantities
          const initialBulkUpdates: Record<number, number> = {};
          res.data.forEach(med => {
            initialBulkUpdates[med.id] = med.stockQuantity;
          });
          setBulkUpdates(initialBulkUpdates);
        } else {
          setError(res.message || "Không thể tải danh sách vật tư.");
        }
      } catch (err: any) {
        setError(err.message || "Lỗi khi tải vật tư.");
      } finally {
        setLoading(false);
      }
    };
    fetchMedications();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "stockQuantity" ? Number(value) : value,
    }));
  };

  const handleBulkQuantityChange = (id: number, value: number) => {
    setBulkUpdates(prev => ({
      ...prev,
      [id]: Math.max(0, value) // Ensure quantity doesn't go below 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const dto = {
        name: form.name,
        type: form.type,
        description: form.description,
        stockQuantity: form.stockQuantity,
        expiryDate: form.expiryDate,
        storageInstructions: form.storageInstructions,
      };

      let res;
      if (editingId) {
        res = await updateMedication(editingId, dto);
      } else {
        res = await createMedication(dto);
      }

      if (res.success && res.data) {
        const updatedMed: Medication = {
          ...res.data,
          isExpired: new Date(res.data.expiryDate) < new Date(),
          isLowStock: res.data.stockQuantity < 50,
          daysToExpiry:
            Math.ceil(
              (new Date(res.data.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            ) || 0,
        };

        if (editingId) {
          setMedications(prev => prev.map(med => 
            med.id === editingId ? updatedMed : med
          ));
        } else {
          setMedications(prev => [updatedMed, ...prev]);
        }

        // Update bulk updates if needed
        setBulkUpdates(prev => ({
          ...prev,
          [updatedMed.id]: updatedMed.stockQuantity
        }));

        resetForm();
      } else {
        setError(res.message || `Không thể ${editingId ? 'cập nhật' : 'thêm'} vật tư.`);
      }
    } catch (err: any) {
      setError(err.message || `Lỗi khi ${editingId ? 'cập nhật' : 'thêm'} vật tư.`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (med: Medication) => {
    setEditingId(med.id);
    setForm({
      name: med.name,
      type: med.type,
      description: med.description,
      stockQuantity: med.stockQuantity,
      expiryDate: med.expiryDate.split('T')[0], // Format date for input
      storageInstructions: med.storageInstructions,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      type: "",
      description: "",
      stockQuantity: 0,
      expiryDate: "",
      storageInstructions: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa vật tư này?")) return;
    setLoading(true);
    setError(null);
    try {
      const res = await deleteMedication(id);
      if (res.success) {
        setMedications((prev) => prev.filter((med) => med.id !== id));
        // Remove from bulk updates
        setBulkUpdates(prev => {
          const newUpdates = {...prev};
          delete newUpdates[id];
          return newUpdates;
        });
      } else {
        setError(res.message || "Không thể xóa vật tư.");
      }
    } catch (err: any) {
      setError(err.message || "Lỗi khi xóa vật tư.");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkUpdate = async () => {
    if (!window.confirm("Bạn có chắc muốn cập nhật số lượng hàng loạt?")) return;
    
    setLoading(true);
    setError(null);
    try {
      const updates = Object.entries(bulkUpdates).map(([id, quantity]) => ({
        id: Number(id),
        quantity
      }));

      // We'll process updates sequentially to handle errors properly
      const results = [];
      for (const update of updates) {
        const med = medications.find(m => m.id === update.id);
        if (med && med.stockQuantity !== update.quantity) {
          try {
            const res = await updateMedication(update.id, {
              ...med,
              stockQuantity: update.quantity
            });
            results.push(res);
          } catch (err) {
            console.error(`Failed to update medication ${update.id}:`, err);
            results.push({ success: false, message: `Failed to update medication ${update.id}` });
          }
        }
      }

      // Refresh the list
      const refreshRes = await getAllMedications();
      if (refreshRes.success) {
        setMedications(refreshRes.data);
        setShowBulkUpdate(false);
      } else {
        setError("Cập nhật thành công nhưng không thể làm mới danh sách.");
      }
    } catch (err: any) {
      setError(err.message || "Lỗi khi cập nhật số lượng hàng loạt.");
    } finally {
      setLoading(false);
    }
  };

  // Filter & search logic
  const filteredMedications = medications.filter((med) => {
    const keywordMatch =
      med.name.toLowerCase().includes(search.toLowerCase()) ||
      med.description.toLowerCase().includes(search.toLowerCase());
    const typeMatch = filterType ? med.type === filterType : true;
    return keywordMatch && typeMatch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredMedications.length / PAGE_SIZE);
  const paginatedMedications = filteredMedications.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Enhanced color scheme
  const mainBg = "bg-gradient-to-br from-red-50 to-red-100";
  const cardBg = "bg-white";
  const borderColor = "border-red-200";
  const textPrimary = "text-red-800";
  const textSecondary = "text-red-700";
  const buttonPrimary = "bg-red-600 hover:bg-red-700 text-white";
  const buttonSecondary = "bg-white hover:bg-red-50 text-red-700 border border-red-200";
  const shadow = "shadow-lg";
  const dangerBg = "bg-red-100";
  const warningBg = "bg-yellow-100";
  const successBg = "bg-green-100";

  return (
    <div className={`p-6 min-h-screen ${mainBg}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className={`text-3xl font-bold mb-4 md:mb-0 ${textPrimary}`}>
            Quản lý vật tư y tế
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Input
              placeholder="Tìm kiếm vật tư..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className={`border ${borderColor} rounded-lg px-4 py-2 bg-white w-full md:w-64 focus:ring-2 focus:ring-red-300`}
            />
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setPage(1);
              }}
              className={`border ${borderColor} rounded-lg px-4 py-2 bg-white w-full md:w-48 focus:ring-2 focus:ring-red-300`}
            >
              <option value="">Tất cả loại</option>
              {Object.entries(medicationTypeTranslations).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <Button
              onClick={() => setShowBulkUpdate(!showBulkUpdate)}
              className={`${buttonSecondary} rounded-lg px-4 py-2 font-medium transition-all ${shadow} hover:shadow-md`}
            >
              {showBulkUpdate ? "Đóng nhập hàng" : "Nhập hàng loạt"}
            </Button>
            <Button
              onClick={() => {
                if (showForm) resetForm();
                else setShowForm(!showForm);
              }}
              className={`${buttonPrimary} rounded-lg px-6 py-2 font-semibold transition-all ${shadow} hover:shadow-md`}
            >
              {showForm ? "Đóng form" : editingId ? "Chỉnh sửa vật tư" : "+ Thêm vật tư"}
            </Button>
          </div>
        </div>

        {showBulkUpdate && (
          <div className={`mb-8 ${cardBg} rounded-xl ${shadow} p-6 space-y-4 border ${borderColor}`}>
            <h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>Cập nhật số lượng hàng loạt</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên vật tư</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng hiện tại</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng mới</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {medications.map(med => (
                    <tr key={med.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{med.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.stockQuantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Input
                          type="number"
                          min={0}
                          value={bulkUpdates[med.id] || 0}
                          onChange={(e) => handleBulkQuantityChange(med.id, parseInt(e.target.value) || 0)}
                          className="w-24 border-gray-300 rounded"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleBulkUpdate}
                className={`${buttonPrimary} font-medium py-2 px-6 rounded-lg ${shadow} hover:shadow-md transition-all`}
                disabled={loading}
              >
                Cập nhật hàng loạt
              </Button>
            </div>
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className={`mb-8 ${cardBg} rounded-xl ${shadow} p-6 space-y-4 border ${borderColor}`}
          >
            <h2 className={`text-xl font-semibold ${textPrimary} mb-4`}>
              {editingId ? "Chỉnh sửa vật tư" : "Thêm vật tư mới"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${textSecondary}`}>Tên vật tư</label>
                <Input
                  name="name"
                  placeholder="Nhập tên vật tư"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={`w-full border ${borderColor} rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-red-300`}
                />
              </div>
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${textSecondary}`}>Loại vật tư</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className={`w-full border ${borderColor} rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-red-300`}
                >
                  <option value="">Chọn loại</option>
                  {Object.entries(medicationTypeTranslations).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className={`block text-sm font-medium ${textSecondary}`}>Mô tả</label>
                <Textarea
                  name="description"
                  placeholder="Nhập mô tả"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className={`w-full border ${borderColor} rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-red-300`}
                />
              </div>
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${textSecondary}`}>Số lượng</label>
                <Input
                  name="stockQuantity"
                  type="number"
                  min={0}
                  placeholder="Nhập số lượng"
                  value={form.stockQuantity}
                  onChange={handleChange}
                  required
                  className={`w-full border ${borderColor} rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-red-300`}
                />
              </div>
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${textSecondary}`}>Ngày hết hạn</label>
                <Input
                  name="expiryDate"
                  type="date"
                  placeholder="Chọn ngày"
                  value={form.expiryDate}
                  onChange={handleChange}
                  required
                  className={`w-full border ${borderColor} rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-red-300`}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className={`block text-sm font-medium ${textSecondary}`}>Hướng dẫn bảo quản</label>
                <Input
                  name="storageInstructions"
                  placeholder="Nhập hướng dẫn bảo quản"
                  value={form.storageInstructions}
                  onChange={handleChange}
                  required
                  className={`w-full border ${borderColor} rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-red-300`}
                />
              </div>
            </div>
            <div className="flex justify-end pt-2 gap-3">
              <Button
                type="button"
                onClick={resetForm}
                className={`${buttonSecondary} font-medium py-2 px-6 rounded-lg ${shadow} hover:shadow-md transition-all`}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className={`${buttonPrimary} font-medium py-2 px-6 rounded-lg ${shadow} hover:shadow-md transition-all`}
                disabled={loading}
              >
                {editingId ? "Cập nhật" : "Lưu vật tư"}
              </Button>
            </div>
          </form>
        )}

        {loading && (
          <div className={`text-center py-8 ${textSecondary} font-medium`}>
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600 mb-2"></div>
            <p>Đang tải dữ liệu...</p>
          </div>
        )}

        {error && (
          <div className={`p-4 mb-6 rounded-lg bg-red-100 border border-red-200 text-red-700 text-center font-medium`}>
            {error}
          </div>
        )}

        {!loading && filteredMedications.length === 0 ? (
          <div className={`text-center py-12 ${textSecondary} bg-white rounded-xl ${shadow} border ${borderColor}`}>
            <p className="text-lg">Không tìm thấy vật tư nào</p>
            <p className="text-sm mt-2">Thử thay đổi tiêu chí tìm kiếm hoặc thêm vật tư mới</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedMedications.map((med) => {
              let cardClass = `${cardBg} border-2 ${borderColor} rounded-xl ${shadow} p-5 flex flex-col h-full transition-all hover:shadow-xl`;
              let statusClass = "";
              let statusText = "";

              if (med.isExpired) {
                cardClass = `${dangerBg} border-2 border-red-300 rounded-xl ${shadow} p-5 flex flex-col h-full`;
                statusClass = "bg-red-200 text-red-800";
                statusText = "Hết hạn";
              } else if (med.daysToExpiry <= 30) {
                cardClass = `${warningBg} border-2 border-yellow-300 rounded-xl ${shadow} p-5 flex flex-col h-full`;
                statusClass = "bg-yellow-200 text-yellow-800";
                statusText = `Còn ${med.daysToExpiry} ngày`;
              } else if (med.isLowStock) {
                statusClass = "bg-orange-200 text-orange-800";
                statusText = "Sắp hết";
              } else {
                statusClass = "bg-green-200 text-green-800";
                statusText = "Còn hạn";
              }

              return (
                <div key={med.id} className={cardClass}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className={`font-bold text-lg ${textPrimary}`}>{med.name}</h3>
                      <span className={`text-sm px-2 py-1 rounded-full ${med.stockQuantity < 50 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {med.stockQuantity} trong kho
                      </span>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusClass}`}>
                      {statusText}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 ${textSecondary} mb-2`}>
                      {medicationTypeTranslations[med.type] || med.type}
                    </span>
                    <p className="text-gray-600 text-sm line-clamp-2">{med.description}</p>
                  </div>

                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">HSD:</span>
                      <span className="font-medium">
                        {new Date(med.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Bảo quản:</span>
                      <span className="font-medium text-right">{med.storageInstructions}</span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                    <Button
                      onClick={() => handleEdit(med)}
                      className="text-sm px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg"
                      disabled={loading}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      onClick={() => handleDelete(med.id)}
                      className="text-sm px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg"
                      disabled={loading}
                    >
                      Xóa vật tư
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <div className={`text-sm ${textSecondary}`}>
              Hiển thị {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filteredMedications.length)} trong {filteredMedications.length} vật tư
            </div>
            <div className="flex gap-2">
              <Button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 rounded-lg ${buttonSecondary} ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Trang trước
              </Button>
              <div className="flex items-center">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 mx-0.5 rounded-lg ${page === pageNum ? buttonPrimary : buttonSecondary}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <Button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={`px-4 py-2 rounded-lg ${buttonSecondary} ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Trang sau
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
