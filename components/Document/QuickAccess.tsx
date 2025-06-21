import React from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {AlertTriangle, FileText, Heart, Shield} from "lucide-react";

const QuickAccess = () => {
    return (
        <Card className="bg-gradient-to-tr from-blue-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="text-blue-900 font-bold text-2xl">Truy Cập Nhanh</CardTitle>
                <CardDescription className="text-blue-700">
                    Tài liệu và biểu mẫu thường dùng
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Button
                        variant="outline"
                        className="h-auto p-5 flex flex-col items-center space-y-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-50 active:scale-95"
                    >
                        <FileText className="h-8 w-8 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-sm font-semibold text-blue-800">Biểu Mẫu Sức Khỏe</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-auto p-5 flex flex-col items-center space-y-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-green-50 active:scale-95"
                    >
                        <Shield className="h-8 w-8 text-green-600 transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-sm font-semibold text-green-800">Tiêm Chủng</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-auto p-5 flex flex-col items-center space-y-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-red-50 active:scale-95"
                    >
                        <Heart className="h-8 w-8 text-red-600 transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-sm font-semibold text-red-800">Thuốc Men</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-auto p-5 flex flex-col items-center space-y-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-orange-50 active:scale-95"
                    >
                        <AlertTriangle className="h-8 w-8 text-orange-600 transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-sm font-semibold text-orange-800">Khẩn Cấp</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
export default QuickAccess