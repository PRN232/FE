import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Pill,
    AlertTriangle,
    User,
    CalendarIcon,
    Search,
} from "lucide-react";
import {
    getStatusColor,
    getUrgencyColor
} from "@/lib/utils";

interface RequestsTabProps {
    searchTerm: string;
    filterStatus: string;
    setSearchTerm: (value: string) => void;
    setFilterStatus: (value: string) => void;
    medicalRequests: {
        id: string;
        studentName: string;
        class: string;
        requestType: string;
        medicine: string;
        dosage: string;
        duration: string;
        reason: string;
        status: string;
        requestDate: string;
        parentName: string;
        urgency: string;
    }[];
}

const RequestsTab = ({
                         searchTerm,
                         filterStatus,
                         setSearchTerm,
                         setFilterStatus,
                         medicalRequests
}: RequestsTabProps) => {
    const filteredRequests = medicalRequests.filter((request) => {
        const matchesSearch =
            request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.medicine.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.reason.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterStatus === "all" || request.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            {/* Search and Filter */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
                <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center">
                        <Search className="w-5 h-5 mr-2" />
                        Tìm kiếm và Lọc
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Tìm kiếm theo tên học sinh, thuốc, hoặc lý do..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-red-200 focus:border-red-500"
                            />
                        </div>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-full md:w-48 border-red-200 focus:border-red-500">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                                <SelectItem value="pending">Đang chờ</SelectItem>
                                <SelectItem value="approved">Đã duyệt</SelectItem>
                                <SelectItem value="completed">Hoàn thành</SelectItem>
                                <SelectItem value="rejected">Từ chối</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Requests List */}
            <div className="grid gap-6">
                {filteredRequests.map((request) => (
                    <Card
                        key={request.id}
                        className="shadow-lg border-0 bg-white/90 backdrop-blur hover:shadow-xl transition-all duration-300"
                    >
                        <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div
                                        className={`w-3 h-3 rounded-full 
                                        ${getUrgencyColor( request.urgency )}`}
                                    ></div>
                                    <div>
                                        <CardTitle className="text-red-700">
                                            {request.studentName}
                                        </CardTitle>
                                        <CardDescription className="text-red-600">
                                            {request.class} • ID Yêu cầu: {request.id}
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge className={getStatusColor(request.status)}>
                                        {request.status === "pending" && "Đang chờ"}
                                        {request.status === "approved" && "Đã duyệt"}
                                        {request.status === "completed" && "Hoàn thành"}
                                        {request.status === "rejected" && "Từ chối"}
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="border-red-200 text-red-700">
                                        {request.requestType}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <Pill className="w-5 h-5 text-red-500 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                Chi tiết thuốc
                                            </p>
                                            <p className="text-gray-600">
                                                {request.medicine}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Liều dùng: {request.dosage} • Thời gian: {request.duration}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                Lý do
                                            </p>
                                            <p className="text-gray-600">
                                                {request.reason}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <User className="w-5 h-5 text-red-500 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                Phụ huynh liên lạc
                                            </p>
                                            <p className="text-gray-600">
                                                {request.parentName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CalendarIcon className="w-5 h-5 text-red-500 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                Ngày yêu cầu
                                            </p>
                                            <p className="text-gray-600">
                                                {request.requestDate}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RequestsTab;