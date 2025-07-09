import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Edit, Plus } from "lucide-react";
import { ApiMedicalProfile } from "@/lib/service/medical-profile/IMedical";

interface ConditionsTabProps {
    profile?: ApiMedicalProfile;
}

const ConditionsTab = ({
                           profile
                       }: ConditionsTabProps) => {
    const conditions = profile?.chronicDiseases || [];
    const hasConditions = conditions.length > 0;

    return (
        <div className="space-y-6">
            <Card
                className="shadow-lg border-0 bg-white/90 backdrop-blur
                hover:shadow-xl transition-all duration-300 group overflow-hidden">
                {/* Glow effect */}
                <div
                    className="absolute inset-0 bg-gradient-to-r
                    from-red-50/10 via-transparent to-transparent opacity-0
                    group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Decorative border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500" />

                <CardHeader className="bg-gradient-to-r from-red-50 to-red-100/80 border-b border-red-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <CardTitle className="flex items-center text-red-800">
                            <div
                                className="p-2 mr-2 rounded-lg
                                bg-red-100 text-red-600 group-hover:bg-red-200
                                transition-colors duration-300">
                                <Heart className="w-5 h-5" />
                            </div>
                            <span>Bệnh mãn tính</span>
                        </CardTitle>
                        <Button
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600
                            hover:to-red-700 hover:shadow-md transition-all duration-300"
                            size="sm"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Thêm bệnh
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-6">
                    {hasConditions ? (
                        <div className="space-y-4">
                            {conditions.map((condition) => (
                                <div
                                    key={condition.id}
                                    className="p-4 border border-red-200 rounded-lg
                                    bg-red-50/50 hover:bg-red-100/30 transition-colors
                                    duration-200 group relative overflow-hidden"
                                >
                                    {/* Hover effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r
                                    from-red-100/10 via-transparent to-transparent
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 relative z-10">
                                        <h3 className="font-semibold text-gray-800">
                                            {condition.diseaseName}
                                        </h3>
                                        <div className="flex items-center space-x-2">
                                            <Badge className="bg-green-100 text-green-800 border-green-200">
                                                Đang điều trị
                                            </Badge>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-red-200 text-red-700 hover:bg-red-200 transition-colors duration-200"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 relative z-10">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Thuốc điều trị:</p>
                                            <p className="text-gray-600 text-sm bg-white/80 p-2 rounded">
                                                {condition.medication || "Không có thông tin"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Hướng dẫn:</p>
                                            <p className="text-gray-600 text-sm bg-white/80 p-2 rounded">
                                                {condition.instructions || "Không có hướng dẫn"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                                <Heart className="h-8 w-8" />
                            </div>
                            <h3 className="mt-4 text-sm font-medium text-gray-900">Không có bệnh mãn tính nào được ghi nhận</h3>
                            <p className="mt-1 text-sm text-gray-500 mb-4">Nhấn nút thêm bệnh để bổ sung thông tin</p>
                            <Button
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                                size="sm"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Thêm bệnh
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ConditionsTab;