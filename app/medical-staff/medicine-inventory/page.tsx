"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAllMedications, createMedication, deleteMedication } from "@/lib/service/medications/medications";
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

  // Form state for adding new medication
  const [showForm, setShowForm] = useState(false);
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

  // Use createMedication API for submit
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
      const res = await createMedication(dto);
      if (res.success && res.data) {
        // Calculate extra fields for UI
        const med: Medication = {
          ...res.data,
          isExpired: new Date(res.data.expiryDate) < new Date(),
          isLowStock: res.data.stockQuantity < 50,
          daysToExpiry:
            Math.ceil(
              (new Date(res.data.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            ) || 0,
        };
        setMedications([ med,...medications]);
        setForm({
          name: "",
          type: "",
          description: "",
          stockQuantity: 0,
          expiryDate: "",
          storageInstructions: "",
        });
        setShowForm(false);
      } else {
        setError(res.message || "Không thể thêm vật tư.");
      }
    } catch (err: any) {
      setError(err.message || "Lỗi khi thêm vật tư.");
    } finally {
      setLoading(false);
    }
  };

 
  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa vật tư này?")) return;
    setLoading(true);
    setError(null);
    try {
      const res = await deleteMedication(id);
      if (res.success) {
        setMedications((prev) => prev.filter((med) => med.id !== id));
      } else {
        setError(res.message || "Không thể xóa vật tư.");
      }
    } catch (err: any) {
      setError(err.message || "Lỗi khi xóa vật tư.");
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

  // Color tone for project (red)
  const mainRed = "bg-gradient-to-br from-red-50 to-red-100";
  const borderRed = "border-red-100";
  const textRed = "text-red-700";
  const buttonRed = "bg-red-600 hover:bg-red-700 text-white";
  const shadowRed = "shadow-md";

  return (
    <div className={`p-6 min-h-screen ${mainRed}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-extrabold mb-6 ${textRed} tracking-tight`}>
          Quản lý vật tư y tế
        </h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <Input
            placeholder="Tìm kiếm theo tên, mô tả..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border border-red-200 rounded-lg px-4 py-2 bg-red-50 w-60"
          />
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setPage(1);
            }}
            className="border border-red-200 rounded-lg px-4 py-2 bg-red-50 w-48"
          >
            <option value="">Tất cả loại vật tư</option>
            {Object.entries(medicationTypeTranslations).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          <Button
            onClick={() => setShowForm(!showForm)}
            className={`transition-all ${shadowRed} rounded-full px-6 py-2 font-semibold ${showForm
              ? "bg-gray-200 text-red-700 hover:bg-gray-300"
              : buttonRed
              }`}
          >
            {showForm ? "Đóng" : "Thêm vật tư mới"}
          </Button>
        </div>
        {showForm && (

          <form
            onSubmit={handleSubmit}
            className={`mb-8 bg-white rounded-2xl ${shadowRed} p-6 space-y-4 ${borderRed}`}
          >
            <Input
              name="name"
              placeholder="Tên vật tư"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-red-200 rounded-lg px-4 py-2 bg-red-50"
            />
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full border border-red-200 rounded-lg px-4 py-2 bg-red-50"
            >
              <option value="">Loại vật tư</option>
              {Object.entries(medicationTypeTranslations).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <Textarea
              name="description"
              placeholder="Mô tả"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border border-red-200 rounded-lg px-4 py-2 bg-red-50"
            />
            <Input
              name="stockQuantity"
              type="number"
              min={0}
              placeholder="Số lượng tồn kho"
              value={form.stockQuantity}
              onChange={handleChange}
              required
              className="w-full border border-red-200 rounded-lg px-4 py-2 bg-red-50"
            />
            <Input
              name="expiryDate"
              type="date"
              placeholder="Ngày hết hạn"
              value={form.expiryDate}
              onChange={handleChange}
              required
              className="w-full border border-red-200 rounded-lg px-4 py-2 bg-red-50"
            />
            <Input
              name="storageInstructions"
              placeholder="Hướng dẫn bảo quản"
              value={form.storageInstructions}
              onChange={handleChange}
              required
              className="w-full border border-red-200 rounded-lg px-4 py-2 bg-red-50"
            />
            <Button
              type="submit"
              className={`w-full ${buttonRed} font-bold py-2 rounded-lg ${shadowRed} transition-all`}
            >
              Lưu vật tư
            </Button>
          </form>

        )}
        <div className="space-y-5"></div>
        {loading && (
          <div className={`text-center ${textRed} font-semibold`}>Đang tải vật tư...</div>
        )}
        {error && (
          <div className="text-center text-red-600 font-semibold">{error}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {paginatedMedications.map((med) => {
            // Highlight logic
            let bgColor = "bg-white";
            if (med.isExpired) {
              bgColor = "bg-red-100";
            } else if (med.daysToExpiry <= 30 && !med.isExpired) {
              bgColor = "bg-yellow-100";
            }
            return (
              <div
                key={med.id}
                className={`${bgColor} ${borderRed} rounded-3xl ${shadowRed} p-7 flex flex-col gap-4 hover:shadow-xl transition-all border-2`}
                style={{ minHeight: 220 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-extrabold text-red-800 text-xl">{med.name}</span>
                  <span className="text-red-500 font-semibold px-3 py-1 bg-red-50 rounded-full">
                    {medicationTypeTranslations[med.type] || med.type}
                  </span>
                  <span
                    className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${med.isExpired
                      ? "bg-red-200 text-red-700"
                      : med.isLowStock
                        ? "bg-yellow-200 text-yellow-700"
                        : "bg-green-100 text-green-700"
                      }`}
                  >
                    {med.isExpired
                      ? "Hết hạn"
                      : med.isLowStock
                        ? "Sắp hết"
                        : "Còn hạn"}
                  </span>
                </div>
                <div className="text-gray-700 mb-1">
                  <b>Mô tả:</b> {med.description}
                </div>
                <div className="flex flex-wrap gap-6 text-gray-600 mb-1">
                  <div>
                    <b>Số lượng tồn kho:</b>{" "}
                    <span
                      className={`font-bold text-lg ${med.stockQuantity < 50 ? "text-red-600" : "text-red-700"
                        }`}
                    >
                      {med.stockQuantity}
                    </span>
                  </div>
                  <div>
                    <b>Ngày hết hạn:</b>{" "}
                    {new Date(med.expiryDate).toLocaleDateString()}
                    {med.daysToExpiry <= 30 && !med.isExpired ? (
                      <span className="ml-2 text-yellow-600 font-semibold">
                        (Còn {med.daysToExpiry} ngày)
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-wrap gap-6 text-gray-600">
                  <div>
                    <b>Bảo quản:</b> {med.storageInstructions}
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    onClick={() => handleDelete(med.id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded-lg text-sm"
                    disabled={loading}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        {!loading && filteredMedications.length === 0 && (
          <div className="text-center text-gray-500">Chưa có vật tư nào.</div>
        )}
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-4 py-2 rounded ${buttonRed} ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Trước
            </Button>
            <span className="font-semibold text-red-700">
              Trang {page}/{totalPages}
            </span>
            <Button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-4 py-2 rounded ${buttonRed} ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Sau
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
