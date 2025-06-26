import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Eye, Plus } from "lucide-react";
import { medicalHistory } from "@/lib/data/mock-data";

const HistoryTab = () => {
    return (
        <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-red-800">
                            <ClipboardList className="w-5 h-5 mr-2" />
                            Medical History
                        </CardTitle>
                        <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Record
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        {medicalHistory.map((record) => (
                            <div
                                key={record.id}
                                className="p-4 border border-red-200 rounded-lg bg-red-50"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{record.type}</h3>
                                        <p className="text-sm text-gray-600">{record.date}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                            {record.diagnosis}
                                        </Badge>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-red-200 text-red-700 hover:bg-red-100"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-2">
                                    <strong>Doctor:</strong> {record.doctor}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Notes:</strong> {record.notes}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default HistoryTab;