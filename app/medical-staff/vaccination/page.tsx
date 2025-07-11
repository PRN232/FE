"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockVaccinationCampaigns } from "@/lib/data/mock-data";
import type { VaccinationCampaign } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Plus, X, ChevronRight } from "lucide-react";

const statusTranslations: { [key: string]: string } = {
  planning: "Lên kế hoạch",
  consent_collection: "Thu thập phiếu đồng ý",
  in_progress: "Đang tiêm chủng",
  completed: "Hoàn thành",
};

const statusColors: { [key: string]: string } = {
  planning: "bg-blue-100 text-blue-700",
  consent_collection: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-green-100 text-green-700",
  completed: "bg-gray-200 text-gray-700",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-0">
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Quản lý chiến dịch tiêm chủng</h1>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 shadow-md"
            variant="secondary"
            size="sm"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? "Đóng" : "Tạo chiến dịch mới"}
          </Button>
        </div>
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 gap-4 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Tạo chiến dịch mới</h3>
            <Input name="name" placeholder="Tên chiến dịch" value={form.name} onChange={handleChange} required className="rounded-xl" />
            <Input name="vaccine" placeholder="Loại vắc xin" value={form.vaccine} onChange={handleChange} required className="rounded-xl" />
            <Input name="targetGrades" placeholder="Khối lớp (cách nhau dấu phẩy)" value={form.targetGrades} onChange={handleChange} required className="rounded-xl" />
            <Input name="studentsEligible" type="number" placeholder="Số học sinh dự kiến" value={form.studentsEligible} onChange={handleChange} required className="rounded-xl" />
            <div>
              <label className="text-sm font-medium text-gray-600">Ngày tiêm dự kiến:</label>
              <Input name="scheduledDate" type="date" value={form.scheduledDate} onChange={handleChange} required className="rounded-xl mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Hạn chót nhận phiếu:</label>
              <Input name="consentDeadline" type="date" value={form.consentDeadline} onChange={handleChange} required className="rounded-xl mt-1" />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="rounded-xl px-6 shadow-md">Lưu chiến dịch</Button>
            </div>
          </form>
        )}
        <div className="space-y-6">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{c.name}</h2>
                  <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500">
                    <span>Vắc xin: <span className="font-medium text-gray-700">{c.vaccine}</span></span>
                    <span>•</span>
                    <span>Đối tượng: <span className="font-medium text-gray-700">{c.targetGrades.join(", ")}</span></span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500">
                    <span>Ngày tiêm: <span className="font-medium text-gray-700">{new Date(c.scheduledDate).toLocaleDateString()}</span></span>
                    <span>•</span>
                    <span>Hạn chót đồng ý: <span className="font-medium text-gray-700">{new Date(c.consentDeadline).toLocaleDateString()}</span></span>
                  </div>
                  <div className="mt-3 flex gap-4 text-sm">
                    <span className="bg-blue-50 rounded px-2 py-1">Dự kiến: <span className="font-semibold">{c.studentsEligible}</span> hs</span>
                    <span className="bg-yellow-50 rounded px-2 py-1">Đã đồng ý: <span className="font-semibold">{c.consentsReceived}</span> hs</span>
                    <span className="bg-green-50 rounded px-2 py-1">Đã tiêm: <span className="font-semibold">{c.vaccinated}</span> hs</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
                  <span className={`rounded-full px-4 py-1 text-sm font-semibold ${statusColors[c.status]}`}>
                    {statusTranslations[c.status]}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-2 px-6 pb-4">
                {c.status === 'planning' && (
                  <Button
                    onClick={() => updateStatus(c.id, 'consent_collection')}
                    size="sm"
                    variant="outline"
                    className="rounded-lg border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Bắt đầu thu thập phiếu
                  </Button>
                )}
                {c.status === 'consent_collection' && (
                  <Button
                    onClick={() => updateStatus(c.id, 'in_progress')}
                    size="sm"
                    variant="outline"
                    className="rounded-lg border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                  >
                    Bắt đầu tiêm chủng
                  </Button>
                )}
                {c.status === 'in_progress' && (
                  <Button
                    onClick={() => updateStatus(c.id, 'completed')}
                    size="sm"
                    variant="outline"
                    className="rounded-lg border-green-200 text-green-700 hover:bg-green-50"
                  >
                    Hoàn thành
                  </Button>
                )}
                <Button
                  onClick={() => alert('Chức năng đang phát triển')}
                  size="sm"
                  variant="ghost"
                  className="rounded-lg flex items-center gap-1 text-gray-500 hover:bg-gray-100"
                >
                  Xem chi tiết <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
