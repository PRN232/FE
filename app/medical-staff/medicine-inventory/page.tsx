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
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-indigo-700 tracking-tight">
          Quản lý sự kiện y tế
        </h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className={`mb-6 transition-all shadow-md rounded-full px-6 py-2 font-semibold ${
            showForm
              ? "bg-gray-200 text-indigo-700 hover:bg-gray-300"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {showForm ? "Đóng" : "Ghi nhận sự kiện mới"}
        </Button>
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-indigo-100"
          >
            <select
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              required
              className="w-full border border-indigo-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none bg-indigo-50"
            >
              <option value="">Chọn học sinh</option>
              {mockStudents.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full border border-indigo-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none bg-indigo-50"
            >
              <option value="">Loại sự kiện</option>
              {Object.entries(incidentTypeTranslations).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <Textarea
              name="description"
              placeholder="Mô tả sự kiện"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border border-indigo-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none bg-indigo-50"
            />
            <select
              name="severity"
              value={form.severity}
              onChange={handleChange}
              required
              className="w-full border border-indigo-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none bg-indigo-50"
            >
              <option value="">Mức độ nghiêm trọng</option>
              {Object.entries(severityTranslations).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <Input
              name="treatmentGiven"
              placeholder="Xử lý đã thực hiện"
              value={form.treatmentGiven}
              onChange={handleChange}
              required
              className="w-full border border-indigo-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none bg-indigo-50"
            />
            <Input
              name="medicineUsed"
              placeholder="Thuốc/vật tư sử dụng (cách nhau dấu phẩy)"
              value={form.medicineUsed}
              onChange={handleChange}
              className="w-full border border-indigo-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none bg-indigo-50"
            />
            <Input
              name="handledBy"
              placeholder="Người xử lý"
              value={form.handledBy}
              onChange={handleChange}
              required
              className="w-full border border-indigo-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none bg-indigo-50"
            />
            <div className="flex gap-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="parentNotified"
                  checked={form.parentNotified}
                  onChange={handleChange}
                  className="accent-indigo-500 w-5 h-5"
                />
                <span className="text-indigo-700 font-medium">Đã thông báo phụ huynh</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="followUpRequired"
                  checked={form.followUpRequired}
                  onChange={handleChange}
                  className="accent-indigo-500 w-5 h-5"
                />
                <span className="text-indigo-700 font-medium">Cần theo dõi tiếp</span>
              </label>
            </div>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              className="w-full border border-indigo-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none bg-indigo-50"
            >
              <option value="open">Chưa xử lý xong</option>
              <option value="resolved">Đã xử lý xong</option>
            </select>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg shadow-md transition-all"
            >
              Lưu sự kiện
            </Button>
          </form>
        )}
        <div className="space-y-5">
          {incidents.map((i) => (
            <div
              key={i.id}
              className="bg-white border border-indigo-100 rounded-2xl shadow-md p-5 flex flex-col gap-2 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full"
                  style={{
                    background:
                      i.severity === "critical"
                        ? "#ef4444"
                        : i.severity === "high"
                        ? "#f59e42"
                        : i.severity === "medium"
                        ? "#fbbf24"
                        : "#22d3ee",
                  }}
                />
                <span className="font-bold text-indigo-800 text-lg">
                  {getStudentName(i.studentId)}
                </span>
                <span className="text-indigo-500 font-medium">
                  {incidentTypeTranslations[i.type]}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 ml-auto">
                  {severityTranslations[i.severity]}
                </span>
              </div>
              <div className="text-gray-700">
                <b>Mô tả:</b> {i.description}
              </div>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div>
                  <b>Xử lý:</b> {i.treatmentGiven}
                </div>
                <div>
                  <b>Thuốc/vật tư:</b>{" "}
                  <span className="text-indigo-600">{i.medicineUsed.join(", ")}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div>
                  <b>Người xử lý:</b> {i.handledBy}
                </div>
                <div>
                  <b>Ngày:</b> {new Date(i.date).toLocaleString()}
                </div>
                <div>
                  <b>Trạng thái:</b>{" "}
                  <span
                    className={`font-semibold ${
                      i.status === "resolved"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {i.status === "resolved" ? "Đã xử lý xong" : "Chưa xử lý xong"}
                  </span>
                </div>
              </div>
              <div className="flex gap-6 text-sm text-gray-500 mt-1">
                <span>
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-1 ${
                      i.parentNotified ? "bg-green-400" : "bg-gray-300"
                    }`}
                  />
                  Thông báo PH: {i.parentNotified ? "Đã" : "Chưa"}
                </span>
                <span>
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-1 ${
                      i.followUpRequired ? "bg-yellow-400" : "bg-gray-300"
                    }`}
                  />
                  Cần theo dõi: {i.followUpRequired ? "Có" : "Không"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
