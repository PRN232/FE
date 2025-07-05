import { FC } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { User, Calendar, MapPin } from "lucide-react";

const BasicInfo: FC<{
    dateOfBirth: Date;
    age: number;
    gender: string;
    className: string;
}> = ({dateOfBirth, age, gender, className}) => {
    return (
        <Card className="mb-6 border-red-200">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                <CardTitle className="flex items-center text-red-800">
                    <User className="w-5 h-5 mr-2" />
                    Thông tin cơ bản
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Ngày sinh</span>
                        </div>
                        <p className="text-gray-900 font-semibold">
                            {new Date(dateOfBirth).toLocaleDateString("vi-VN")}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                            <User className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Tuổi</span>
                        </div>
                        <p className="text-gray-900 font-semibold">{age} tuổi</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                            <User className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Giới tính</span>
                        </div>
                        <p className="text-gray-900 font-semibold">{gender}</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">Lớp học</span>
                        </div>
                        <p className="text-gray-900 font-semibold">{className}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default BasicInfo