import { Incident, MedicationGiven } from "@/types";
import { CreateMedicalIncidentDto } from "./incident/IIncident";
import { CreateMedicationGivenDto } from "./medication-given/IMedication-given";
import { getAuthHeaders } from "@/lib/utils";

const INCIDENT_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/medical-incidents`;
const MEDICATION_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/medications-given`;

interface ApiIncidentResponse {
    id: number;
    studentId: number;
    studentName: string;
    studentCode: string;
    nurseId: number;
    nurseName: string;
    type: string;
    description: string;
    symptoms: string;
    treatment: string;
    severity: "Low" | "Medium" | "High";
    parentNotified: boolean;
    incidentDate: string;
    medicationsGiven: MedicationGiven[];
}

interface ApiMedicationResponse {
    id: number;
    incidentId: number;
    medicationId: number;
    giveAt: string;
    dosage: string;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    errors: string[];
}

const mapApiIncidentToIncident = (
    apiIncident: ApiIncidentResponse
): Incident => ({
    id: apiIncident.id,
    studentId: apiIncident.studentId,
    studentName: apiIncident.studentName || "",
    studentCode: apiIncident.studentCode || "",
    nurseId: apiIncident.nurseId,
    nurseName: apiIncident.nurseName || null,
    type: apiIncident.type || "",
    description: apiIncident.description || "",
    symptoms: apiIncident.symptoms || "",
    treatment: apiIncident.treatment || "",
    severity: apiIncident.severity,
    parentNotified: apiIncident.parentNotified || false,
    incidentDate: apiIncident.incidentDate || new Date().toISOString(),
    medicationsGiven: apiIncident.medicationsGiven || [],
});

const mapApiMedicationToMedicationGiven = (
    apiMedication: ApiMedicationResponse
): MedicationGiven => ({
    id: apiMedication.id,
    incidentId: apiMedication.incidentId,
    medicationId: apiMedication.medicationId,
    giveAt: apiMedication.giveAt,
    dosage: apiMedication.dosage,
});

export const createIncidentWithMedication = async (
    incidentData: CreateMedicalIncidentDto,
    medicationData?: CreateMedicationGivenDto
): Promise<{
    success: boolean;
    incident?: Incident;
    medication?: MedicationGiven;
    error?: string;
}> => {
    try {
        const incidentResponse = await fetch(`${INCIDENT_API_URL}`,
            {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(incidentData),
            });

        const incidentResult: ApiResponse<ApiIncidentResponse> = await incidentResponse.json();

        if (!incidentResponse.ok || !incidentResult.success) {
            const message = incidentResult.message || "Failed to create incident";
            console.error(message);
            return { success: false, error: message };
        }

        const createdIncident = mapApiIncidentToIncident(incidentResult.data);

        let createdMedication: MedicationGiven | undefined;
        if (medicationData) {
            const medicationResponse = await fetch(`${MEDICATION_API_URL}`,
                {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify({
                        ...medicationData,
                        incidentId: createdIncident.id,
                    }),
                });

            const medicationResult: ApiResponse<ApiMedicationResponse> = await medicationResponse.json();

            if (!medicationResponse.ok || !medicationResult.success) {
                const message = medicationResult.message || "Failed to create medication";
                console.error(message);
                return {
                    success: false,
                    error: message,
                    incident: createdIncident,
                };
            }

            createdMedication = mapApiMedicationToMedicationGiven(medicationResult.data);
        }

        return {
            success: true,
            incident: createdIncident,
            medication: createdMedication,
        };
    } catch (error) {
        console.error("Create incident with medication error:", error);
        return { success: false, error: String(error) };
    }
};