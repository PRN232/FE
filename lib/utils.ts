import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    accept: "*/*",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getSeverityText = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "high":
      return "Nguy cơ cao";
    case "medium":
      return "Nguy cơ trung bình";
    case "low":
      return "Nguy cơ thấp";
    default:
      return severity;
  }
};

export const mapSeverityToText = (severity: string): string => {
  switch (severity) {
    case 'MILD':
      return 'Nhẹ';
    case 'MODERATE':
      return 'Trung bình';
    case 'SEVERE':
      return 'Nặng';
    default:
      return severity;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "due":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "overdue":
      return "bg-red-100 text-red-800 border-red-200";
    case "controlled":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "stable":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export const getBMICategory = (bmiValue: number | null) => {
  if (!bmiValue) return "";
  if (bmiValue < 18.5) return "Thiếu cân";
  if (bmiValue >= 18.5 && bmiValue < 23) return "Bình thường";
  if (bmiValue >= 23 && bmiValue < 25) return "Tiền béo phì";
  if (bmiValue >= 25 && bmiValue < 30) return "Béo phì độ I";
  return "Béo phì độ II";
};

export function calculateBMI(weightKg: number, heightCm: number): number | null {
  if (heightCm > 0 && weightKg > 0) {
    const heightM = heightCm / 100;
    return +(weightKg / (heightM * heightM)).toFixed(2);
  }
  return null;
}