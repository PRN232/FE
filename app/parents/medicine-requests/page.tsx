"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";

import {medicalRequests} from "@/lib/data/mock-data";
import RequestsTab from "@/components/Medical/MedicalRequest/MedicalTabs/RequestsTab";
import NewRequestTab from "@/components/Medical/MedicalRequest/MedicalTabs/NewRequestTab";

const MedicalRequest = () => {
  const [date, setDate] = useState<Date>();
  const [selectedStudent, setSelectedStudent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("requests");

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "requests":
        return (
            <RequestsTab
                searchTerm={searchTerm}
                filterStatus={filterStatus}
                setSearchTerm={setSearchTerm}
                setFilterStatus={setFilterStatus}
                medicalRequests={medicalRequests}
            />
        );
      case "new-request":
        return (
            <NewRequestTab
                date={date}
                selectedStudent={selectedStudent}
                setDate={setDate}
                setSelectedStudent={setSelectedStudent}
            />
        );
      default:
        return (
            <RequestsTab
                searchTerm={searchTerm}
                filterStatus={filterStatus}
                setSearchTerm={setSearchTerm}
                setFilterStatus={setFilterStatus}
                medicalRequests={medicalRequests}
            />
        );
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Medical Request Management
                </h1>
                <p className="text-red-100">
                  Quản lý yêu cầu y tế và thuốc men cho học sinh
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
              <TabsTrigger
                  value="requests"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
              >
                Medical Requests
              </TabsTrigger>
              <TabsTrigger
                  value="new-request"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
              >
                New Request
              </TabsTrigger>
            </TabsList>

            {/* Render tab content dynamically */}
            <div>{renderTabContent()}</div>
          </Tabs>
        </div>
      </div>
  );
};

export default MedicalRequest;