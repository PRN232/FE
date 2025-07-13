"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockMedicalExaminations } from "@/lib/data/mock-data";
import type { MedicalExamination } from "@/types";
import { cn } from "@/lib/utils";

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

const statusColors: { [key: string]: string } = {
  scheduled: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
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
      examinations.map((e) =>
        e.id === id
          ? {
              ...e,
              status: newStatus,
              notificationSent:
                newStatus !== "scheduled" ? true : e.notificationSent,
            }
          : e
      )
    );
  };

  return (
    <div className="p-0 md:p-8 bg-gradient-to-tr from-blue-50 to-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">
          Quản lý khám sức khỏe
        </h1>
        <div className="flex justify-end mb-6">
          <Button
            onClick={() => setShowForm(!showForm)}
            className={cn(
              "transition-all shadow-none rounded-full px-6 py-2 font-semibold",
              showForm
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            {showForm ? "Đóng" : "Tạo đợt khám mới"}
          </Button>
        </div>
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 bg-white/80 backdrop-blur border border-gray-100 rounded-2xl shadow-lg p-6 space-y-4"
          >
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Tạo đợt khám mới
            </h3>
            <Input
              name="name"
              placeholder="Tên đợt khám"
              value={form.name}
              onChange={handleChange}
              required
              className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200"
            />
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full border-gray-200 rounded-xl px-3 py-2 bg-white focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Loại hình khám</option>
              {Object.entries(typeTranslations).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <Input
              name="targetGrades"
              placeholder="Khối lớp (cách nhau dấu phẩy)"
              value={form.targetGrades}
              onChange={handleChange}
              required
              className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200"
            />
            <Input
              name="studentsScheduled"
              type="number"
              placeholder="Số học sinh dự kiến"
              value={form.studentsScheduled}
              onChange={handleChange}
              required
              className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200"
            />
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Ngày khám dự kiến:
              </label>
              <Input
                name="scheduledDate"
                type="date"
                value={form.scheduledDate}
                onChange={handleChange}
                required
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-blue-600 text-white rounded-full px-6 py-2 font-semibold hover:bg-blue-700 transition-all"
              >
                Lưu đợt khám
              </Button>
            </div>
          </form>
        )}
        <div className="space-y-6">
          {examinations.map((e) => (
            <div
              key={e.id}
              className="bg-white/90 border border-gray-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {e.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="inline-block mr-2">
                      <span className="font-medium text-gray-700">
                        Loại hình:
                      </span>{" "}
                      {typeTranslations[e.type]}
                    </span>
                    <span className="inline-block mr-2">
                      <span className="font-medium text-gray-700">
                        Đối tượng:
                      </span>{" "}
                      {e.targetGrades.join(", ")}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium text-gray-700">
                      Ngày khám:
                    </span>{" "}
                    {new Date(e.scheduledDate).toLocaleDateString()}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                      Dự kiến: {e.studentsScheduled} hs
                    </span>
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                      Đã khám: {e.studentsExamined} hs
                    </span>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full font-medium",
                        e.notificationSent
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      )}
                    >
                      Thông báo PH:{" "}
                      {e.notificationSent ? "Đã gửi" : "Chưa gửi"}
                    </span>
                  </div>
                </div>
                <span
                  className={cn(
                    "px-4 py-1 rounded-full font-semibold text-sm shadow-sm",
                    statusColors[e.status]
                  )}
                >
                  {statusTranslations[e.status]}
                </span>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-2 justify-end">
                {e.status === "scheduled" && (
                  <Button
                    onClick={() => updateStatus(e.id, "in_progress")}
                    size="sm"
                    variant="outline"
                    className="rounded-full border-blue-200 text-blue-700 hover:bg-blue-50 transition-all"
                  >
                    Bắt đầu khám & Gửi TB
                  </Button>
                )}
                {e.status === "in_progress" && (
                  <Button
                    onClick={() => updateStatus(e.id, "completed")}
                    size="sm"
                    variant="outline"
                    className="rounded-full border-green-200 text-green-700 hover:bg-green-50 transition-all"
                  >
                    Hoàn thành
                  </Button>
                )}
                <Button
                  onClick={() => alert("Chức năng đang phát triển")}
                  size="sm"
                  variant="outline"
                  className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
