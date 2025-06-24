"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mockMedicines } from "@/lib/data/mock-data";
import type { Medication } from "@/types";

export default function MedicineInventoryPage() {
  const [medicines, setMedicines] = useState<Medication[]>(mockMedicines || []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    type: string;
    description: string;
    stockQuantity: string;
    expiryDate: string;
    storageInstructions: string;
  }>({
    name: "",
    type: "",
    description: "",
    stockQuantity: "0",
    expiryDate: "",
    storageInstructions: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMedicines([
      ...medicines,
      {
        id: Date.now().toString(),
        name: form.name,
        type: form.type,
        description: form.description,
        stockQuantity: parseInt(form.stockQuantity, 10),
        expiryDate: new Date(form.expiryDate),
        storageInstructions: form.storageInstructions,
      },
    ]);
    setForm({ name: "", type: "", description: "", stockQuantity: "0", expiryDate: "", storageInstructions: "" });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Quản lý kho thuốc & vật tư y tế</h1>
      <Button onClick={() => setShowForm(!showForm)} className="mb-4">
        {showForm ? "Đóng" : "Thêm thuốc/vật tư"}
      </Button>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-2">
          <Input name="name" placeholder="Tên thuốc/vật tư" value={form.name} onChange={handleChange} required />
          <Input name="type" placeholder="Loại thuốc/vật tư" value={form.type} onChange={handleChange} required />
          <Textarea name="description" placeholder="Mô tả chi tiết" value={form.description} onChange={handleChange} required />
          <Input name="stockQuantity" type="number" placeholder="Số lượng tồn kho" value={form.stockQuantity} onChange={handleChange} required />
          <div><label>Ngày hết hạn:</label><Input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} required /></div>
          <Textarea name="storageInstructions" placeholder="Hướng dẫn bảo quản" value={form.storageInstructions} onChange={handleChange} required />
          <Button type="submit">Lưu</Button>
        </form>
      )}
      <div className="space-y-3">
        {medicines.map((m) => (
          <div key={m.id} className="border rounded p-3">
            <div><b>{m.name}</b> ({m.type})</div>
            <div>Tồn kho: {m.stockQuantity}</div>
            <div>HSD: {new Date(m.expiryDate).toLocaleDateString()}</div>
            <div className="text-sm">Mô tả: {m.description}</div>
            <div className="text-sm">Bảo quản: {m.storageInstructions}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
