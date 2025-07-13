"use client";

import { useState, useEffect } from "react";

import { medicalRequests } from "@/lib/data/mock-data";
import RequestsTab from "@/components/Medical/MedicalRequest/RequestsTab";
import {
    getAllMedicationsGiven
} from "@/lib/service/medical-record/medication-given/medication-given";
import { MedicationGiven } from "@/types";

const MedicalRequest = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [medications, setMedications] = useState<MedicationGiven[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const response = await getAllMedicationsGiven();
                if (response.success) {
                    setMedications(response.data);
                } else {
                    // setError(response.message || "Failed to fetch medications");
                }
            } catch (err) {
                // setError(err.message || "An error occurred while fetching medications");
            } finally {
                setLoading(false);
            }
        };

        void fetchMedications();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            Loading...
        </div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600">
            Error: {error}
        </div>;
    }

  return (
      <div
          className="min-h-screen bg-gradient-to-br from-red-50/50
          via-white to-red-100/50 relative overflow-hidden">
        {/* Animated background elements */}
        <div
            className="absolute inset-0 bg-[url('/images/medical-pattern-light.svg')]
            bg-[length:300px_300px] opacity-[0.03] animate-[pulse_20s_linear_infinite]" />
        <div
            className="absolute inset-0 bg-gradient-to-br from-transparent
            via-transparent to-red-50/20 pointer-events-none" />

        {/* Header with improved gradient and shadow */}
        <div
            className="bg-gradient-to-r from-red-600 to-red-700
             text-white p-6 shadow-lg relative overflow-hidden">
          {/* Animated header elements */}
          <div
              className="absolute inset-0 bg-[url('/images/medical-pattern.svg')]
              bg-[length:300px_300px] opacity-[0.03]" />
          <div
              className="absolute inset-0 bg-gradient-to-r
               from-red-300/30 to-red-500/30 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                  <h1
                    className="text-3xl font-bold tracking-tight bg-gradient-to-r
                    from-white to-red-100 bg-clip-text text-transparent">
                    Quản lý yêu cầu y tế
                  </h1>
                  <p>
                      Xem, quản lý và theo dõi các yêu cầu y tế của con em.
                  </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 relative z-10">
          <div
              className="bg-white rounded-lg shadow-sm border border-red-50
               overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="p-6">
              <RequestsTab
                  searchTerm={searchTerm}
                  filterStatus={filterStatus}
                  setSearchTerm={setSearchTerm}
                  setFilterStatus={setFilterStatus}
                  medicalRequests={medicalRequests}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default MedicalRequest;