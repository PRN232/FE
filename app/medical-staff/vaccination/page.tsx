"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockVaccinationCampaigns } from "@/lib/data/mock-data";
import type { VaccinationCampaign } from "@/types";
import { Badge } from "@/components/ui/badge";

const statusTranslations: { [key: string]: string } = {
  planning: "Lên kế hoạch",
  consent_collection: "Thu thập phiếu đồng ý",
  in_progress: "Đang tiêm chủng",
  completed: "Hoàn thành",
};

export default function VaccinationPage() {
  const [campaigns, setCampaigns] = useState<VaccinationCampaign[]>(mockVaccinationCampaigns || []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    vaccine: "",
    targetGrades: "",
    scheduledDate: "",
    consentDeadline: "",
    studentsEligible: "0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCampaigns([
      ...campaigns,
      {
        id: Date.now().toString(),
        name: form.name,
        vaccine: form.vaccine,
        targetGrades: form.targetGrades.split(',').map(g => g.trim()),
        scheduledDate: new Date(form.scheduledDate),
        consentDeadline: new Date(form.consentDeadline),
        status: 'planning',
        studentsEligible: parseInt(form.studentsEligible, 10),
        consentsReceived: 0,
        vaccinated: 0,
      },
    ]);
    setForm({ name: "", vaccine: "", targetGrades: "", scheduledDate: "", consentDeadline: "", studentsEligible: "0" });
    setShowForm(false);
  };

  const updateStatus = (id: string, newStatus: VaccinationCampaign['status']) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý chiến dịch tiêm chủng</h1>
      <Button onClick={() => setShowForm(!showForm)} className="mb-4">
        {showForm ? "Đóng" : "Tạo chiến dịch mới"}
      </Button>
       {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-2 border p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Tạo chiến dịch mới</h3>
          <Input name="name" placeholder="Tên chiến dịch" value={form.name} onChange={handleChange} required />
          <Input name="vaccine" placeholder="Loại vắc xin" value={form.vaccine} onChange={handleChange} required />
          <Input name="targetGrades" placeholder="Khối lớp (cách nhau dấu phẩy)" value={form.targetGrades} onChange={handleChange} required />
          <Input name="studentsEligible" type="number" placeholder="Số học sinh dự kiến" value={form.studentsEligible} onChange={handleChange} required />
          <div><label className="text-sm font-medium">Ngày tiêm dự kiến:</label><Input name="scheduledDate" type="date" value={form.scheduledDate} onChange={handleChange} required /></div>
          <div><label className="text-sm font-medium">Hạn chót nhận phiếu:</label><Input name="consentDeadline" type="date" value={form.consentDeadline} onChange={handleChange} required /></div>
          <Button type="submit">Lưu chiến dịch</Button>
        </form>
      )}
      <div className="space-y-4">
        {campaigns.map((c) => (
          <div key={c.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{c.name}</h2>
                <p className="text-sm text-gray-600">Vắc xin: {c.vaccine} | Đối tượng: {c.targetGrades.join(", ")}</p>
                <p className="text-sm text-gray-600">Ngày tiêm: {new Date(c.scheduledDate).toLocaleDateString()} | Hạn chót đồng ý: {new Date(c.consentDeadline).toLocaleDateString()}</p>
                 <div className="mt-2 text-sm">
                    <span>Dự kiến: {c.studentsEligible} hs</span> | <span>Đã đồng ý: {c.consentsReceived} hs</span> | <span>Đã tiêm: {c.vaccinated} hs</span>
                </div>
              </div>
              <Badge>{statusTranslations[c.status]}</Badge>
            </div>
            <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                {c.status === 'planning' && <Button onClick={() => updateStatus(c.id, 'consent_collection')} size="sm" variant="outline">Bắt đầu thu thập phiếu</Button>}
                {c.status === 'consent_collection' && <Button onClick={() => updateStatus(c.id, 'in_progress')} size="sm" variant="outline">Bắt đầu tiêm chủng</Button>}
                {c.status === 'in_progress' && <Button onClick={() => updateStatus(c.id, 'completed')} size="sm" variant="outline">Hoàn thành</Button>}
                <Button onClick={() => alert('Chức năng đang phát triển')} size="sm" variant="outline">Xem chi tiết</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
