import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    HeartPulse,
    Ruler,
    Scale,
    CalendarCheck,
    Droplet
} from "lucide-react";
import { calculateBMI, getBMICategory } from "@/lib/utils";
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
    const bmi = (profile.height && profile.weight)
        ? calculateBMI(profile.height, profile.weight)
        : null;

    return (
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-6 group overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-50/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Decorative border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500" />

            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100/80 border-b border-red-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md group-hover:scale-105 transition-transform duration-300">
                            {child.fullName.charAt(0)}
                        </div>
                        <div>
                            <CardTitle className="text-red-800">{child.fullName}</CardTitle>
                            <CardDescription className="text-red-600">
                                {child.className} • Mã học sinh: {child.studentCode}
                            </CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Date of Birth */}
                    <div className="space-y-2 p-3 bg-red-50/50 rounded-lg hover:bg-red-50 transition-colors duration-200">
                        <div className="flex items-center text-gray-600">
                            <CalendarCheck className="w-4 h-4 mr-2 text-red-500" />
                            <p className="text-sm font-semibold">Ngày sinh</p>
                        </div>
                        <p className="text-gray-800 pl-6">
                            {new Date(child.dateOfBirth).toLocaleDateString("vi-VN")}
                        </p>
                    </div>

                    {/* Blood Pressure */}
                    <div className="space-y-2 p-3 bg-red-50/50 rounded-lg hover:bg-red-50 transition-colors duration-200">
                        <div className="flex items-center text-gray-600">
                            <Droplet className="w-4 h-4 mr-2 text-red-500" />
                            <p className="text-sm font-semibold">Huyết áp</p>
                        </div>
                        <p className="text-gray-800 pl-6">
                            {profile.bloodPressure || "Chưa có dữ liệu"}
                        </p>
                    </div>

                    {/* Height/Weight/BMI */}
                    <div className="space-y-2 p-3 bg-red-50/50 rounded-lg hover:bg-red-50 transition-colors duration-200">
                        <div className="flex items-center text-gray-600">
                            <div className="flex items-center mr-2">
                                <Ruler className="w-4 h-4 text-red-500" />
                                <Scale className="w-4 h-4 -ml-1 text-red-500" />
                            </div>
                            <p className="text-sm font-semibold">Chiều cao / Cân nặng / BMI</p>
                        </div>
                        <div className="space-y-1 pl-6">
                            <p className="text-gray-800 flex space-x-2">
                                <span>{profile.height ? `${profile.height} cm` : "Chưa có"}</span>
                                <span>/</span>
                                <span>{profile.weight ? `${profile.weight} kg` : "Chưa có"}</span>
                            </p>
                            <p className="text-gray-800">
                                {bmi !== null ? (
                                    <>
                                        <span className="font-medium">
                                            {bmi.toFixed(1)} kg/m²
                                        </span>
                                        <span className="text-xs ml-2 px-2 py-0.5 bg-red-100 text-red-800 rounded-full">
                                            {getBMICategory(bmi)}
                                        </span>
                                    </>
                                ) : "Chưa có dữ liệu"}
                            </p>
                        </div>
                    </div>

                    {/* Last Checkup */}
                    <div className="space-y-2 p-3 bg-red-50/50 rounded-lg hover:bg-red-50 transition-colors duration-200">
                        <div className="flex items-center text-gray-600">
                            <HeartPulse className="w-4 h-4 mr-2 text-red-500" />
                            <p className="text-sm font-semibold">Kiểm tra lần cuối</p>
                        </div>
                        <p className="text-gray-800 pl-6">
                            {profile.lastCheckupDate
                                ? new Date(profile.lastCheckupDate).toLocaleDateString("vi-VN")
                                : "Chưa có dữ liệu"}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StudentInfoCard;