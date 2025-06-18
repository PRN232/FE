import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Pill, Shield, Calendar, AlertTriangle, Clock, Plus } from "lucide-react"
import {
    mockMedicalIncidents,
    mockMedicineRequests,
    mockVaccinationCampaigns,
    mockMedicalExaminations,
    mockStudents,
} from "@/lib/data/mock-data"

export default function MedicalStaffPage() {
    const activeIncidents = mockMedicalIncidents.filter((incident) => incident.status === "open")
    const pendingMedicineRequests = mockMedicineRequests.filter((request) => request.status === "pending")
    const activeCampaigns = mockVaccinationCampaigns.filter(
        (campaign) => campaign.status === "consent_collection" || campaign.status === "in_progress",
    )
    const upcomingExams = mockMedicalExaminations.filter(
        (exam) => exam.status === "scheduled" || exam.status === "in_progress",
    )

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Medical Staff Portal</h2>
                    <p className="text-muted-foreground">Manage medical incidents, medicine requests, and health programs</p>
                </div>
                <Button asChild>
                    <Link href="/medical-staff/incidents">
                        <Plus className="h-4 w-4 mr-2" />
                        New Incident
                    </Link>
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeIncidents.length}</div>
                        <p className="text-xs text-muted-foreground">Requiring attention</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Medicine Requests</CardTitle>
                        <Pill className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingMedicineRequests.length}</div>
                        <p className="text-xs text-muted-foreground">Pending approval</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vaccination Campaigns</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeCampaigns.length}</div>
                        <p className="text-xs text-muted-foreground">In progress</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Health Examinations</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{upcomingExams.length}</div>
                        <p className="text-xs text-muted-foreground">Scheduled/In progress</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Active Medical Incidents */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Active Medical Incidents</CardTitle>
                                <CardDescription>Incidents requiring immediate attention</CardDescription>
                            </div>
                            <Button size="sm" asChild>
                                <Link href="/medical-staff/incidents">View All</Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {activeIncidents.slice(0, 3).map((incident) => {
                                const student = mockStudents.find((s) => s.id === incident.studentId)
                                return (
                                    <div key={incident.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                        <div className="flex-shrink-0">
                                            <AlertTriangle
                                                className={`h-5 w-5 ${
                                                    incident.severity === "critical"
                                                        ? "text-red-500"
                                                        : incident.severity === "high"
                                                            ? "text-orange-500"
                                                            : incident.severity === "medium"
                                                                ? "text-yellow-500"
                                                                : "text-blue-500"
                                                }`}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">{student?.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {incident.type} - {incident.description.substring(0, 50)}...
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {incident.date.toLocaleDateString()} at {incident.date.toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <Badge
                                            variant={
                                                incident.severity === "critical"
                                                    ? "destructive"
                                                    : incident.severity === "high"
                                                        ? "destructive"
                                                        : incident.severity === "medium"
                                                            ? "default"
                                                            : "secondary"
                                            }
                                        >
                                            {incident.severity}
                                        </Badge>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Pending Medicine Requests */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Pending Medicine Requests</CardTitle>
                                <CardDescription>Requests awaiting approval</CardDescription>
                            </div>
                            <Button size="sm" asChild>
                                <Link href="/medical-staff/medicine-inventory">View All</Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {pendingMedicineRequests.map((request) => {
                                const student = mockStudents.find((s) => s.id === request.studentId)
                                return (
                                    <div key={request.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                        <div className="flex-shrink-0">
                                            <Clock className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">{request.medicineName}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                For {student?.name} - {request.dosage}, {request.frequency}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Requested: {request.requestDate.toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button size="sm" variant="outline">
                                                Approve
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                Reject
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Vaccination Campaigns */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Active Vaccination Campaigns</CardTitle>
                            <CardDescription>Current vaccination programs and their progress</CardDescription>
                        </div>
                        <Button size="sm" asChild>
                            <Link href="/medical-staff/vaccination">Manage Campaigns</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        {activeCampaigns.map((campaign) => (
                            <div key={campaign.id} className="p-4 border rounded-lg space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">{campaign.name}</h4>
                                    <Badge variant="outline">{campaign.status.replace("_", " ")}</Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Consent Collection</span>
                                        <span>
                      {campaign.consentsReceived}/{campaign.studentsEligible}
                    </span>
                                    </div>
                                    <div className="w-full bg-secondary rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full"
                                            style={{ width: `${(campaign.consentsReceived / campaign.studentsEligible) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Target: {campaign.targetGrades.join(", ")}</span>
                                    <span>Due: {campaign.consentDeadline.toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Health Examinations */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Health Examinations</CardTitle>
                            <CardDescription>Scheduled and ongoing health examinations</CardDescription>
                        </div>
                        <Button size="sm" asChild>
                            <Link href="/medical-staff/examination">Manage Examinations</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        {upcomingExams.map((exam) => (
                            <div key={exam.id} className="p-4 border rounded-lg space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-sm">{exam.name}</h4>
                                    <Badge
                                        variant={
                                            exam.status === "completed" ? "default" : exam.status === "in_progress" ? "secondary" : "outline"
                                        }
                                    >
                                        {exam.status.replace("_", " ")}
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Progress</span>
                                        <span>
                      {exam.studentsExamined}/{exam.studentsScheduled}
                    </span>
                                    </div>
                                    <div className="w-full bg-secondary rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full"
                                            style={{ width: `${(exam.studentsExamined / exam.studentsScheduled) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    <p>Target: {exam.targetGrades.join(", ")} grades</p>
                                    <p>Date: {exam.scheduledDate.toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
