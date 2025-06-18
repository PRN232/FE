import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Activity, Shield, Calendar, AlertTriangle, CheckCircle } from "lucide-react"
import {
    mockStudents,
    mockMedicalIncidents,
    mockVaccinationCampaigns,
    mockMedicalExaminations,
} from "@/lib/data/mock-data"

export default function DashboardPage() {
    const totalStudents = mockStudents.length
    const activeIncidents = mockMedicalIncidents.filter((incident) => incident.status === "open").length
    const upcomingVaccinations = mockVaccinationCampaigns.filter(
        (campaign) => campaign.status === "consent_collection",
    ).length
    const pendingExaminations = mockMedicalExaminations.filter((exam) => exam.status === "scheduled").length

    const recentIncidents = mockMedicalIncidents.slice(0, 3)
    const upcomingCampaigns = mockVaccinationCampaigns.slice(0, 2)

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Button>Download Report</Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalStudents}</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeIncidents}</div>
                        <p className="text-xs text-muted-foreground">-1 from yesterday</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vaccination Campaigns</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{upcomingVaccinations}</div>
                        <p className="text-xs text-muted-foreground">In progress</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Health Examinations</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingExaminations}</div>
                        <p className="text-xs text-muted-foreground">Scheduled this month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Medical Incidents */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Medical Incidents</CardTitle>
                        <CardDescription>Latest medical incidents requiring attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentIncidents.map((incident) => {
                                const student = mockStudents.find((s) => s.id === incident.studentId)
                                return (
                                    <div key={incident.id} className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            {incident.status === "open" ? (
                                                <AlertTriangle className="h-5 w-5 text-orange-500" />
                                            ) : (
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground">
                                                {student?.name} - {incident.type}
                                            </p>
                                            <p className="text-sm text-muted-foreground truncate">{incident.description}</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Badge
                                                variant={
                                                    incident.severity === "high"
                                                        ? "destructive"
                                                        : incident.severity === "medium"
                                                            ? "default"
                                                            : "secondary"
                                                }
                                            >
                                                {incident.severity}
                                            </Badge>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Vaccination Progress */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Vaccination Campaigns</CardTitle>
                        <CardDescription>Current vaccination campaign progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingCampaigns.map((campaign) => (
                                <div key={campaign.id} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">{campaign.name}</p>
                                        <Badge variant="outline">{campaign.status.replace("_", " ")}</Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Consent Collection</span>
                                            <span>
                        {campaign.consentsReceived}/{campaign.studentsEligible}
                      </span>
                                        </div>
                                        <Progress value={(campaign.consentsReceived / campaign.studentsEligible) * 100} className="h-2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Health Examination Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Health Examination Status</CardTitle>
                    <CardDescription>Overview of ongoing and upcoming health examinations</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {mockMedicalExaminations.map((exam) => (
                            <div key={exam.id} className="space-y-2 p-4 border rounded-lg">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">{exam.name}</h4>
                                    <Badge
                                        variant={
                                            exam.status === "completed" ? "default" : exam.status === "in_progress" ? "secondary" : "outline"
                                        }
                                    >
                                        {exam.status.replace("_", " ")}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">Target: {exam.targetGrades.join(", ")} grades</p>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Progress</span>
                                        <span>
                      {exam.studentsExamined}/{exam.studentsScheduled}
                    </span>
                                    </div>
                                    <Progress value={(exam.studentsExamined / exam.studentsScheduled) * 100} className="h-2" />
                                </div>
                                <p className="text-xs text-muted-foreground">Scheduled: {exam.scheduledDate.toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
