import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
    Plus,
    CalendarIcon,
    Send,
} from "lucide-react";

interface NewRequestTabProps {
    date: Date | undefined;
    selectedStudent: string;
    setDate: (date: Date | undefined) => void;
    setSelectedStudent: (value: string) => void;
}

const NewRequestTab = ({
                           date,
                           selectedStudent,
                           setDate,
                           setSelectedStudent,
                       }: NewRequestTabProps) => {
    return (
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Medical Request
                </CardTitle>
                <CardDescription className="text-red-100">
                    Tạo yêu cầu y tế mới cho học sinh
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <Label
                                htmlFor="student-select"
                                className="text-red-800 font-semibold"
                            >
                                Student Selection
                            </Label>
                            <Select
                                value={selectedStudent}
                                onValueChange={setSelectedStudent}
                            >
                                <SelectTrigger className="border-red-200 focus:border-red-500">
                                    <SelectValue placeholder="Chọn học sinh" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="student1">Nguyễn Văn An - 10A1</SelectItem>
                                    <SelectItem value="student2">Trần Thị Mai - 9B2</SelectItem>
                                    <SelectItem value="student3">Lê Minh Tuấn - 11C1</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label
                                htmlFor="request-type"
                                className="text-red-800 font-semibold"
                            >
                                Request Type
                            </Label>
                            <Select>
                                <SelectTrigger className="border-red-200 focus:border-red-500">
                                    <SelectValue placeholder="Loại yêu cầu" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="medicine">Medicine Administration</SelectItem>
                                    <SelectItem value="emergency">Emergency Contact</SelectItem>
                                    <SelectItem value="vaccination">Vaccination Follow-up</SelectItem>
                                    <SelectItem value="examination">Medical Examination</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label
                                htmlFor="medicine-name"
                                className="text-red-800 font-semibold"
                            >
                                Medicine Name
                            </Label>
                            <Input
                                id="medicine-name"
                                placeholder="Tên thuốc"
                                className="border-red-200 focus:border-red-500"
                            />
                        </div>

                        <div>
                            <Label
                                htmlFor="dosage"
                                className="text-red-800 font-semibold"
                            >
                                Dosage Instructions
                            </Label>
                            <Input
                                id="dosage"
                                placeholder="Liều dùng và cách sử dụng"
                                className="border-red-200 focus:border-red-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label
                                htmlFor="duration"
                                className="text-red-800 font-semibold"
                            >
                                Duration
                            </Label>
                            <Input
                                id="duration"
                                placeholder="Thời gian sử dụng"
                                className="border-red-200 focus:border-red-500"
                            />
                        </div>

                        <div>
                            <Label
                                htmlFor="urgency"
                                className="text-red-800 font-semibold"
                            >
                                Urgency Level
                            </Label>
                            <Select>
                                <SelectTrigger className="border-red-200 focus:border-red-500">
                                    <SelectValue placeholder="Mức độ khẩn cấp" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="low">Low - Không khẩn cấp</SelectItem>
                                    <SelectItem value="medium">Medium - Trung bình</SelectItem>
                                    <SelectItem value="high">High - Khẩn cấp</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label
                                htmlFor="start-date"
                                className="text-red-800 font-semibold"
                            >
                                Start Date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal border-red-200 focus:border-red-500"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : "Chọn ngày bắt đầu"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        autoFocus={true}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div>
                            <Label
                                htmlFor="parent-contact"
                                className="text-red-800 font-semibold"
                            >
                                Parent Contact
                            </Label>
                            <Input
                                id="parent-contact"
                                placeholder="Tên và số điện thoại phụ huynh"
                                className="border-red-200 focus:border-red-500"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <Label
                        htmlFor="reason"
                        className="text-red-800 font-semibold"
                    >
                        Medical Reason
                    </Label>
                    <Textarea
                        id="reason"
                        placeholder="Mô tả chi tiết lý do y tế và triệu chứng..."
                        className="border-red-200 focus:border-red-500 min-h-24"
                    />
                </div>

                <div>
                    <Label
                        htmlFor="special-instructions"
                        className="text-red-800 font-semibold"
                    >
                        Special Instructions
                    </Label>
                    <Textarea
                        id="special-instructions"
                        placeholder="Hướng dẫn đặc biệt hoặc lưu ý quan trọng..."
                        className="border-red-200 focus:border-red-500 min-h-20"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox id="parent-consent" className="border-red-300" />
                    <Label
                        htmlFor="parent-consent"
                        className="text-sm text-gray-700"
                    >
                        Tôi xác nhận đã có sự đồng ý của phụ huynh cho yêu cầu này
                    </Label>
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-red-100">
                    <Button
                        variant="outline"
                        className="border-red-200 text-red-700 hover:bg-red-50"
                    >
                        Cancel
                    </Button>
                    <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                        <Send className="w-4 h-4 mr-2" />
                        Submit Request
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default NewRequestTab;