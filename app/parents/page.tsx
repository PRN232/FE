import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Pill, Calendar, AlertCircle, CheckCircle, Clock, Plus } from "lucide-react"
import { mockStudents, mockMedicineRequests } from "@/lib/data/mock-data"

export default function ParentsPage() {
    const myChildren = mockStudents.filter((student) => student.parentId === "2")
    const myMedicineRequests = mockMedicineRequests.filter((request) => request.parentId === "2")

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Parent Portal</h2>
                    <p className="text-muted-foreground">Manage your children's health records and requests</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Health Records</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{myChildren.length}</div>
                        <p className="text-xs text-muted-foreground">Children registered</p>
                    </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Medicine Requests</CardTitle>
                        <Pill className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{myMedicineRequests.length}</div>
                        <p className="text-xs text-muted-foreground">Active requests</p>
                    </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">Upcoming appointments</p>
                    </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Unread notifications</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* My Children */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>My Children</CardTitle>
                                <CardDescription>Health records and information for your children</CardDescription>
                            </div>
                            <Button size="sm" asChild>
                                <Link href="/parents/health-records">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Child
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {myChildren.map((child) => (
                                <div key={child.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                    <Avatar>
                                        <AvatarImage src={child.avatar || "/placeholder.svg"} />
                                        <AvatarFallback>
                                            {child.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h4 className="font-medium">{child.name}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {child.grade} - {child.class}
                                        </p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            {child.healthRecord.allergies.length > 0 && (
                                                <Badge variant="outline" className="text-xs">
                                                    {child.healthRecord.allergies.length} Allergies
                                                </Badge>
                                            )}
                                            {child.healthRecord.chronicDiseases.length > 0 && (
                                                <Badge variant="outline" className="text-xs">
                                                    {child.healthRecord.chronicDiseases.length} Conditions
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/parents/health-records/${child.id}`}>View Details</Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Medicine Requests */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Medicine Requests</CardTitle>
                                <CardDescription>Track your medicine requests and approvals</CardDescription>
                            </div>
                            <Button size="sm" asChild>
                                <Link href="/parents/medicine-requests">
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Request
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {myMedicineRequests.map((request) => {
                                const student = myChildren.find((child) => child.id === request.studentId)
                                return (
                                    <div key={request.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                        <div className="flex-shrink-0">
                                            {request.status === "approved" ? (
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            ) : request.status === "rejected" ? (
                                                <AlertCircle className="h-5 w-5 text-red-500" />
                                            ) : (
                                                <Clock className="h-5 w-5 text-orange-500" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">{request.medicineName}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                For {student?.name} - {request.dosage}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Requested: {request.requestDate.toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Badge
                                            variant={
                                                request.status === "approved"
                                                    ? "default"
                                                    : request.status === "rejected"
                                                        ? "destructive"
                                                        : "secondary"
                                            }
                                        >
                                            {request.status}
                                        </Badge>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activities */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Latest updates and activities for your children</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Health record updated for Emma Smith</p>
                                <p className="text-xs text-muted-foreground">Vision test results added - 2 days ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Medicine request approved</p>
                                <p className="text-xs text-muted-foreground">Albuterol inhaler for Emma Smith - 3 days ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Vaccination consent required</p>
                                <p className="text-xs text-muted-foreground">Fall 2023 Flu Vaccination - 5 days ago</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
