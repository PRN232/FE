"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, PlusCircle } from "lucide-react";

import { medicalRequests } from "@/lib/data/mock-data";
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
      <div className="min-h-screen bg-gradient-to-br from-red-50/50 via-white to-red-100/50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[url('/images/medical-pattern-light.svg')] bg-[length:300px_300px] opacity-[0.03] animate-[pulse_20s_linear_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-50/20 pointer-events-none" />

        {/* Header with improved gradient and shadow */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 shadow-lg relative overflow-hidden">
          {/* Animated header elements */}
          <div className="absolute inset-0 bg-[url('/images/medical-pattern.svg')] bg-[length:300px_300px] opacity-[0.03]" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-300/30 to-red-500/30 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                  Medical Request Management
                </h1>
                <p className="text-red-100/90 max-w-lg">
                  Quản lý yêu cầu y tế và thuốc men cho học sinh
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:shadow-md hover:shadow-red-900/20 transition-all duration-300 group"
                >
                  <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6 relative z-10">
          <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
          >
            {/* Enhanced tabs with better visual feedback */}
            <div className="relative">
              <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm rounded-lg overflow-hidden border border-red-100">
                <TabsTrigger
                    value="requests"
                    className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all duration-300 group"
                >
                  <span className="relative z-10">Medical Requests</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </TabsTrigger>
                <TabsTrigger
                    value="new-request"
                    className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all duration-300 group"
                >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <PlusCircle className="w-4 h-4" />
                  New Request
                </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </TabsTrigger>
              </TabsList>
              {/* Animated underline for active tab */}
              <div className="absolute bottom-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300"
                   style={{
                     width: '50%',
                     left: activeTab === 'requests' ? '0%' : '50%'
                   }} />
            </div>

            {/* Tab content container with subtle animation */}
            <div className="bg-white rounded-lg shadow-sm border border-red-50 overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </Tabs>
        </div>
      </div>
  );
};

export default MedicalRequest;