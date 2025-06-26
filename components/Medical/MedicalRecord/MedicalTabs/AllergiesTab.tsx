import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Edit, Plus } from "lucide-react";

import { allergies } from "@/lib/data/mock-data";
import {getSeverityColor} from "@/lib/utils";

const AllergiesTab = () => {
    return (
        <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-red-800">
                            <AlertTriangle className="w-5 h-5 mr-2" />
                            Known Allergies
                        </CardTitle>
                        <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Allergy
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        {allergies.map((allergy) => (
                            <div
                                key={allergy.id}
                                className="p-4 border border-red-200 rounded-lg bg-red-50"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-gray-800">{allergy.allergen}</h3>
                                    <div className="flex items-center space-x-2">
                                        <Badge className={getSeverityColor(allergy.severity)}>
                                            {allergy.severity === "high" && "High Risk"}
                                            {allergy.severity === "medium" && "Medium Risk"}
                                            {allergy.severity === "low" && "Low Risk"}
                                        </Badge>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-red-200 text-red-700 hover:bg-red-100"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-2">
                                    <strong>Symptoms:</strong> {allergy.symptoms}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Reported on: {allergy.dateReported}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AllergiesTab;