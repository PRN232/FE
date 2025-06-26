import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    AlertTriangle,
    Heart,
    Syringe,
    ClipboardList,
    Activity,
    Stethoscope,
} from "lucide-react";
import {
    allergies,
    chronicConditions,
    vaccinationHistory,
    medicalHistory,
} from "@/lib/data/mock-data";

const OverviewTab = () => {
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">
                                    {allergies.length}
                                </p>
                                <p className="text-sm text-gray-600">Known Allergies</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Heart className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">
                                    {chronicConditions.length}
                                </p>
                                <p className="text-sm text-gray-600">Chronic Conditions</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Syringe className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">
                                    {vaccinationHistory.length}
                                </p>
                                <p className="text-sm text-gray-600">Vaccinations</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <ClipboardList className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">
                                    {medicalHistory.length}
                                </p>
                                <p className="text-sm text-gray-600">Medical Records</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
                    <CardTitle className="flex items-center text-red-800">
                        <Activity className="w-5 h-5 mr-2" />
                        Recent Medical Activity
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        {medicalHistory.slice(0, 3).map((record) => (
                            <div
                                key={record.id}
                                className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg"
                            >
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <Stethoscope className="w-5 h-5 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{record.type}</p>
                                    <p className="text-sm text-gray-600">
                                        {record.diagnosis} • {record.date}
                                    </p>
                                </div>
                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                    Completed
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default OverviewTab;