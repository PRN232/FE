import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Download, Search, Calendar, Shield, Heart, AlertTriangle, BookOpen } from "lucide-react"

const documents = [
    {
        id: "1",
        title: "Student Health Record Form",
        description: "Complete health information form for new student enrollment",
        category: "Forms",
        type: "PDF",
        size: "2.3 MB",
        lastUpdated: new Date("2023-09-01"),
        icon: FileText,
        color: "text-blue-500",
    },
    {
        id: "2",
        title: "Vaccination Consent Form",
        description: "Parental consent form for school vaccination programs",
        category: "Vaccination",
        type: "PDF",
        size: "1.8 MB",
        lastUpdated: new Date("2023-09-15"),
        icon: Shield,
        color: "text-green-500",
    },
    {
        id: "3",
        title: "Medicine Administration Authorization",
        description: "Authorization form for administering medication to students",
        category: "Medicine",
        type: "PDF",
        size: "1.5 MB",
        lastUpdated: new Date("2023-08-20"),
        icon: Heart,
        color: "text-red-500",
    },
    {
        id: "4",
        title: "Emergency Contact Information",
        description: "Emergency contact details and medical information form",
        category: "Emergency",
        type: "PDF",
        size: "1.2 MB",
        lastUpdated: new Date("2023-09-10"),
        icon: AlertTriangle,
        color: "text-orange-500",
    },
    {
        id: "5",
        title: "Health Screening Guidelines",
        description: "Comprehensive guidelines for annual health screenings",
        category: "Guidelines",
        type: "PDF",
        size: "3.1 MB",
        lastUpdated: new Date("2023-08-15"),
        icon: BookOpen,
        color: "text-purple-500",
    },
    {
        id: "6",
        title: "Allergy Management Plan",
        description: "Template for creating individual allergy management plans",
        category: "Allergies",
        type: "PDF",
        size: "2.7 MB",
        lastUpdated: new Date("2023-09-05"),
        icon: AlertTriangle,
        color: "text-yellow-500",
    },
]

const categories = ["All", "Forms", "Vaccination", "Medicine", "Emergency", "Guidelines", "Allergies"]

export default function DocumentsPage() {
    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Health Documents</h2>
                    <p className="text-muted-foreground">Access important health forms, guidelines, and documentation</p>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search documents..." className="pl-10" />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={category === "All" ? "default" : "outline"}
                            size="sm"
                            className="whitespace-nowrap"
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Documents Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg bg-muted ${doc.color}`}>
                                        <doc.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-lg line-clamp-2">{doc.title}</CardTitle>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Badge variant="outline" className="text-xs">
                                                {doc.category}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                        {doc.type} • {doc.size}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="line-clamp-3 mb-4">{doc.description}</CardDescription>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3" />
                                    <span>Updated {doc.lastUpdated.toLocaleDateString()}</span>
                                </div>
                                <Button size="sm" variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Access Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Access</CardTitle>
                    <CardDescription>Frequently used documents and forms</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                            <FileText className="h-6 w-6 text-blue-500" />
                            <span className="text-sm font-medium">Health Forms</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                            <Shield className="h-6 w-6 text-green-500" />
                            <span className="text-sm font-medium">Vaccination</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                            <Heart className="h-6 w-6 text-red-500" />
                            <span className="text-sm font-medium">Medicine</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                            <AlertTriangle className="h-6 w-6 text-orange-500" />
                            <span className="text-sm font-medium">Emergency</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
