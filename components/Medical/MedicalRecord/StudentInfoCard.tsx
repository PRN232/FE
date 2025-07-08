import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChildDTO } from "@/lib/service/parent/IParent";
import { ApiMedicalProfile } from "@/lib/service/medicalProfile/IMedical";

const StudentInfoCard = ({
                             child,
                             medicalProfile,
                         }: {
    child: ChildDTO;
    medicalProfile?: ApiMedicalProfile;
}) => {
    const profile = medicalProfile || {
        height: 0,
        weight: 0,
        bloodPressure: "Unknown",
        visionTest: "Unknown",
        hearingTest: "Unknown",
        generalHealth: "Unknown",
        lastCheckupDate: new Date().toISOString(),
    };

    return (
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur mb-6">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                            {child.fullName.charAt(0)}
                        </div>
                        <div>
                            <CardTitle className="text-red-800">{child.fullName}</CardTitle>
                            <CardDescription className="text-red-600">
                                {child.className} • Student ID: {child.studentCode}
                            </CardDescription>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="border-red-200 text-red-700 hover:bg-red-50"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-600">Date of Birth</p>
                        <p className="text-gray-800">
                            {new Date(child.dateOfBirth).toLocaleDateString("vi-VN")}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-600">Blood Pressure</p>
                        <p className="text-gray-800">
                            {profile.bloodPressure || "Chưa có"}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-600">Height / Weight</p>
                        <p className="text-gray-800">
                            {profile.height ? `${profile.height} cm` : "Chưa có"} /{" "}
                            {profile.weight ? `${profile.weight} kg` : "Chưa có"}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-600">Last Checkup</p>
                        <p className="text-gray-800">
                            {profile.lastCheckupDate
                                ? new Date(profile.lastCheckupDate).toLocaleDateString("vi-VN")
                                : "Chưa có"}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StudentInfoCard;