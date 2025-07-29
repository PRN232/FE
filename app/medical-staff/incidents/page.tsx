"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import
  IncidentModal
  from "@/components/Medical/HealthCheckUpForm/RecordIncident/Incident";
import
  ViewIncident
  from "@/components/Medical/HealthCheckUpForm/RecordIncident/VIewIncident";
import
  IncidentCard
  from "@/components/Medical/HealthCheckUpForm/RecordIncident/IncidentCard";

import {
  Incident,
  MedicationGiven,
  ChildDTO,
  Medication
} from "@/types";
import {
  getAllMedicalIncidents
} from "@/lib/service/medical-record/incident/incident";
import {
  createMedicationGiven,
  deleteMedicationGiven,
  getAllMedicationsGiven,
  updateMedicationGiven
} from "@/lib/service/medical-record/medication-given/medication-given";
import { getAllStudents } from "@/lib/service/student/student";
import { getAllMedications } from "@/lib/service/medications/medications";
import {showSuccessAlert} from "@/lib/utils";

const IncidentsPage = () => {
  const [isNewIncidentModalOpen, setIsNewIncidentModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [medicationsGiven, setMedicationsGiven] = useState<MedicationGiven[]>([]);
  const [students, setStudents] = useState<ChildDTO[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    try {
      const [incidentsResponse, medicationsResponse, studentsResponse, allMedicationsResponse] = await Promise.all([
        getAllMedicalIncidents(),
        getAllMedicationsGiven(),
        getAllStudents(),
        getAllMedications()
      ]);

      if (incidentsResponse.success) {
        setIncidents(incidentsResponse.data);
      } else {
        setError(incidentsResponse.message || "Failed to fetch incidents");
      }

      if (medicationsResponse.success) {
        setMedicationsGiven(medicationsResponse.data);
      } else {
        setError(medicationsResponse.message || "Failed to fetch medications");
      }

      if (allMedicationsResponse.success) {
        setMedications(allMedicationsResponse.data);
      } else {
        setError(allMedicationsResponse.message || "Failed to fetch medications");
      }

      if (studentsResponse.success && studentsResponse.students) {
        setStudents(studentsResponse.students);
      } else {
        setError(studentsResponse.error || "Failed to fetch students");
      }
    } catch (err) {
      setError("An error occurred while fetching data");
      console.error(err);
    }
  };

  useEffect(() => {
    void fetchAllData();
  }, []);

  const handleViewIncident = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsViewModalOpen(true);
  };

  const handleEditIncident = (incident: Incident) => {
    // Implement edit functionality
    console.log("Edit incident:", incident.id);
  };

  const handleNewIncidentSuccess = async () => {
    try {
      await fetchAllData();
    } catch (error) {
      console.error("Failed to refresh data:", error);
      setError("Failed to refresh data. Please try again.");
    }
  };

  const handleAddOrUpdateMedication = async (
      incidentId: number,
      medicationData: {
        medicationId: number;
        dosage: string;
        giveAt: string;
      },
      medicationId?: number
  ) => {
    try {
      if (medicationId) {
        const response = await updateMedicationGiven(medicationId, {
          incidentId,
          medicationId: medicationData.medicationId,
          dosage: medicationData.dosage,
          giveAt: medicationData.giveAt
        });
        setMedicationsGiven(prev =>
            prev.map(med =>
                med.id === medicationId ? { ...med, ...response } : med
            )
        );
        await showSuccessAlert("Cập nhật thuốc thành công!");
        return true;
      } else {
        const response = await createMedicationGiven({
          incidentId,
          medicationId: medicationData.medicationId,
          dosage: medicationData.dosage,
          giveAt: medicationData.giveAt
        });
        if (response.success) {
          setMedicationsGiven(prev => [...prev, response.data]);
          await showSuccessAlert("Thêm thuốc thành công!");
          return true;
        } else {
          setError(response.message || "Failed to add medication");
          return false;
        }
      }
    } catch (error) {
      console.error("Error processing medication:", error);
      setError("An error occurred while processing medication");
      return false;
    }
  };

  const handleDeleteMedication = async (medicationId: number) => {
    try {
      const response = await deleteMedicationGiven(medicationId)

      if (response.success) {
        setMedicationsGiven(prev =>
            prev.filter(med => med.id !== medicationId)
        )
        return true
      } else {
        setError(response.message || "Failed to delete medication")
        return false
      }
    } catch (error) {
      console.error("Error deleting medication:", error)
      setError("An error occurred while deleting medication")
      return false
    }
  }


  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
        incident.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.type?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity =
        filterSeverity === "all" ||
        incident.severity?.toLowerCase() === filterSeverity.toLowerCase();
    return matchesSearch && matchesSeverity;
  });

  return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Quản lý sự cố</h1>
                <p className="text-red-100">Quản lý và ghi nhận các sự cố y tế của học sinh</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                    onClick={() => setIsNewIncidentModalOpen(true)}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ghi nhận sự cố
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          {/* Error Message */}
          {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
          )}

          {/* Search and Filter */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Tìm kiếm sự cố
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Input
                      placeholder="Tìm kiếm theo tên học sinh, loại sự cố, địa điểm..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-red-200 focus:border-red-500"
                  />
                </div>
                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger className="border-red-200 focus:border-red-500">
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">Tất cả mức độ</SelectItem>
                    <SelectItem value="high">Nghiêm trọng</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="low">Nhẹ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Incidents List */}
          <div className="grid py-5 gap-6">
            {filteredIncidents.map((incident) => {
              const incidentMedications = medicationsGiven.filter(
                  med => med.incidentId === incident.id
              );

              return (
                  <IncidentCard
                      key={incident.id}
                      incident={incident}
                      allMedications={medications}
                      medicationsGiven={incidentMedications}
                      onView={handleViewIncident}
                      onAddOrUpdateMedication={handleAddOrUpdateMedication}
                      onDeleteMedication={handleDeleteMedication}
                  />
              );
            })}
          </div>
        </div>

        {/* Modals */}
        <IncidentModal
            isOpen={isNewIncidentModalOpen}
            onClose={() => setIsNewIncidentModalOpen(false)}
            onSuccess={handleNewIncidentSuccess}
            students={students}
        />
        <ViewIncident
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            incident={selectedIncident}
            onEdit={handleEditIncident}
        />
      </div>
  );
};

export default IncidentsPage;