"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mockMedicalIncidents, mockStudents } from "@/lib/data/mock-data";
import type { MedicalIncident } from "@/types";

const incidentTypeTranslations: { [key: string]: string } = {
  accident: "Tai nạn",
  fever: "Sốt",
  fall: "Té ngã",
  epidemic: "Dịch bệnh",
  other: "Khác",
};

const severityTranslations: { [key: string]: string } = {
  low: "Nhẹ",
  medium: "Trung bình",
  high: "Nặng",
  critical: "Nguy kịch",
};

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<MedicalIncident[]>(mockMedicalIncidents || []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{
    studentId: string;
    type: MedicalIncident["type"] | "";
    description: string;
    severity: MedicalIncident["severity"] | "";
    treatmentGiven: string;
    medicineUsed: string;
    handledBy: string;
    parentNotified: boolean;
    followUpRequired: boolean;
    status: MedicalIncident["status"];
  }>({
    studentId: "",
    type: "",
    description: "",
    severity: "",
    treatmentGiven: "",
    medicineUsed: "",
    handledBy: "",
    parentNotified: false,
    followUpRequired: false,
    status: "open",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIncidents([
      ...incidents,
      {
        id: Date.now().toString(),
        studentId: form.studentId,
        type: form.type as MedicalIncident["type"],
        description: form.description,
        severity: form.severity as MedicalIncident["severity"],
        treatmentGiven: form.treatmentGiven,
        medicineUsed: form.medicineUsed ? form.medicineUsed.split(",").map((m) => m.trim()) : [],
        handledBy: form.handledBy,
        parentNotified: form.parentNotified,
        date: new Date(),
        followUpRequired: form.followUpRequired,
        status: form.status,
      },
    ]);
    setForm({
      studentId: "",
      type: "",
      description: "",
      severity: "",
      treatmentGiven: "",
      medicineUsed: "",
      handledBy: "",
      parentNotified: false,
      followUpRequired: false,
      status: "open",
    });
    setShowForm(false);
  };

  const getStudentName = (id: string) => {
    const student = mockStudents.find((s) => s.id === id);
    return student ? student.name : "";
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Quản lý sự kiện y tế</h1>
      <Button onClick={() => setShowForm(!showForm)} className="mb-4">
        {showForm ? "Đóng" : "Ghi nhận sự kiện mới"}
      </Button>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-2">
          <select
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Chọn học sinh</option>
            {mockStudents.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Loại sự kiện</option>
            {Object.entries(incidentTypeTranslations).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
          <Textarea
            name="description"
            placeholder="Mô tả sự kiện"
            value={form.description}
            onChange={handleChange}
            required
          />
          <select
            name="severity"
            value={form.severity}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Mức độ nghiêm trọng</option>
            {Object.entries(severityTranslations).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
          <Input
            name="treatmentGiven"
            placeholder="Xử lý đã thực hiện"
            value={form.treatmentGiven}
            onChange={handleChange}
            required
          />
          <Input
            name="medicineUsed"
            placeholder="Thuốc/vật tư sử dụng (cách nhau dấu phẩy)"
            value={form.medicineUsed}
            onChange={handleChange}
          />
          <Input
            name="handledBy"
            placeholder="Người xử lý"
            value={form.handledBy}
            onChange={handleChange}
            required
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="parentNotified"
              checked={form.parentNotified}
              onChange={handleChange}
            />
            <span>Đã thông báo phụ huynh</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="followUpRequired"
              checked={form.followUpRequired}
              onChange={handleChange}
            />
            <span>Cần theo dõi tiếp</span>
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="open">Chưa xử lý xong</option>
            <option value="resolved">Đã xử lý xong</option>
          </select>
          <Button type="submit">Lưu sự kiện</Button>
        </form>
      )}
      <div className="space-y-3">
        {incidents.map((i) => (
          <div key={i.id} className="border rounded p-3">
            <div><b>Học sinh: {getStudentName(i.studentId)}</b> - {incidentTypeTranslations[i.type]} ({severityTranslations[i.severity]})</div>
            <div><b>Mô tả:</b> {i.description}</div>
            <div><b>Xử lý:</b> {i.treatmentGiven}</div>
            <div><b>Thuốc/vật tư sử dụng:</b> {i.medicineUsed.join(", ")}</div>
            <div><b>Người xử lý:</b> {i.handledBy}</div>
            <div>Ngày: {new Date(i.date).toLocaleString()} | Trạng thái: {i.status}</div>
            <div className="text-sm">Thông báo PH: {i.parentNotified ? "Đã" : "Chưa"} | Cần theo dõi: {i.followUpRequired ? "Có" : "Không"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}