import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Syringe, Eye, Plus } from "lucide-react";

import { vaccinationHistory } from "@/lib/data/mock-data";
import {getStatusColor} from "@/lib/utils";

const VaccinationsTab = () => {
    return (
        <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-red-800">
                            <Syringe className="w-5 h-5 mr-2" />
                            Vaccination History
                        </CardTitle>
                        <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Vaccination
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        {vaccinationHistory.map((vaccination) => (
                            <div
                                key={vaccination.id}
                                className="p-4 border border-red-200 rounded-lg bg-red-50"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{vaccination.vaccine}</h3>
                                        <p className="text-sm text-gray-600">{vaccination.dose}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge className={getStatusColor(vaccination.status)}>
                                            {vaccination.status === "completed" && "Completed"}
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
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <p className="text-gray-600">
                                        <strong>Date Given:</strong> {vaccination.date}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Next Due:</strong> {vaccination.nextDue}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default VaccinationsTab;