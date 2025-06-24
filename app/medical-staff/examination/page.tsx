"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockMedicalExaminations } from "@/lib/data/mock-data";
import type { MedicalExamination } from "@/types";
import { Badge } from "@/components/ui/badge";

const statusTranslations: { [key: string]: string } = {
  scheduled: "Đã lên lịch",
  in_progress: "Đang tiến hành",
  completed: "Hoàn thành",
};

const typeTranslations: { [key: string]: string } = {
  annual: "Thường niên",
  vision: "Thị lực",
  hearing: "Thính lực",
  dental: "Nha khoa",
  general: "Tổng quát",
};

export default function ExaminationPage() {
  const [examinations, setExaminations] = useState<MedicalExamination[]>(
    mockMedicalExaminations || []
  );
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    type: MedicalExamination["type"] | "";
    targetGrades: string;
    scheduledDate: string;
    studentsScheduled: string;
  }>({
    name: "",
    type: "",
    targetGrades: "",
    scheduledDate: "",
    studentsScheduled: "0",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setExaminations([
      ...examinations,
      {
        id: Date.now().toString(),
        name: form.name,
        type: form.type as MedicalExamination["type"],
        targetGrades: form.targetGrades.split(",").map((g) => g.trim()),
        scheduledDate: new Date(form.scheduledDate),
        notificationSent: false,
        status: "scheduled",
        studentsScheduled: parseInt(form.studentsScheduled, 10),
        studentsExamined: 0,
      },
    ]);
    setForm({
      name: "",
      type: "",
      targetGrades: "",
      scheduledDate: "",
      studentsScheduled: "0",
    });
    setShowForm(false);
  };

  const updateStatus = (
    id: string,
    newStatus: MedicalExamination["status"]
  ) => {
    setExaminations(
      examinations.map((e) => (e.id === id ? { ...e, status: newStatus, notificationSent: newStatus !== 'scheduled' ? true : e.notificationSent } : e))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý khám sức khỏe</h1>
      <Button onClick={() => setShowForm(!showForm)} className="mb-4">
        {showForm ? "Đóng" : "Tạo đợt khám mới"}
      </Button>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 space-y-2 border p-4 rounded-lg"
        >
          <h3 className="text-lg font-semibold">Tạo đợt khám mới</h3>
          <Input
            name="name"
            placeholder="Tên đợt khám"
            value={form.name}
            onChange={handleChange}
            required
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 bg-white"
          >
            <option value="">Loại hình khám</option>
            {Object.entries(typeTranslations).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
          <Input
            name="targetGrades"
            placeholder="Khối lớp (cách nhau dấu phẩy)"
            value={form.targetGrades}
            onChange={handleChange}
            required
          />
           <Input
            name="studentsScheduled"
            type="number"
            placeholder="Số học sinh dự kiến"
            value={form.studentsScheduled}
            onChange={handleChange}
            required
          />
          <div>
            <label className="text-sm font-medium">Ngày khám dự kiến:</label>
            <Input
              name="scheduledDate"
              type="date"
              value={form.scheduledDate}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">Lưu đợt khám</Button>
        </form>
      )}
      <div className="space-y-4">
        {examinations.map((e) => (
          <div key={e.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{e.name}</h2>
                <p className="text-sm text-gray-600">
                  Loại hình: {typeTranslations[e.type]} | Đối tượng:{" "}
                  {e.targetGrades.join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  Ngày khám: {new Date(e.scheduledDate).toLocaleDateString()}
                </p>
                <div className="mt-2 text-sm">
                  <span>
                    Dự kiến: <b>{e.studentsScheduled}</b> hs
                  </span>{" "}
                  |{" "}
                  <span>
                    Đã khám: <b>{e.studentsExamined}</b> hs
                  </span> |
                   <span>
                    Thông báo PH: <Badge variant={e.notificationSent ? 'default' : 'secondary'}>{e.notificationSent ? "Đã gửi" : "Chưa gửi"}</Badge>
                  </span>
                </div>
              </div>
              <Badge>{statusTranslations[e.status]}</Badge>
            </div>
            <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
              {e.status === "scheduled" && (
                <Button
                  onClick={() => updateStatus(e.id, "in_progress")}
                  size="sm"
                  variant="outline"
                >
                  Bắt đầu khám & Gửi TB
                </Button>
              )}
              {e.status === "in_progress" && (
                <Button
                  onClick={() => updateStatus(e.id, "completed")}
                  size="sm"
                  variant="outline"
                >
                  Hoàn thành
                </Button>
              )}
               <Button
                  onClick={() => alert("Chức năng đang phát triển")}
                  size="sm"
                  variant="outline"
                >
                  Xem chi tiết
                </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
