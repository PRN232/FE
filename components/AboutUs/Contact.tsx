import React from 'react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Clock, Mail, MapPin, Phone} from "lucide-react";

const Contact = () => {
    return (
        <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <Card className="text-center">
                    <CardHeader>
                        <div className="mx-auto rounded-lg bg-blue-100 p-3 w-fit">
                            <Phone className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle>Điện thoại</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-semibold">(555) 123-4567</p>
                        <p className="text-sm text-muted-foreground">Khẩn cấp: (555) 911-HELP</p>
                    </CardContent>
                </Card>

                <Card className="text-center">
                    <CardHeader>
                        <div className="mx-auto rounded-lg bg-green-100 p-3 w-fit">
                            <Mail className="h-6 w-6 text-green-600" />
                        </div>
                        <CardTitle>Email</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-semibold">health@school.edu</p>
                        <p className="text-sm text-muted-foreground">Phản hồi trong vòng 24 giờ</p>
                    </CardContent>
                </Card>

                <Card className="text-center">
                    <CardHeader>
                        <div className="mx-auto rounded-lg bg-purple-100 p-3 w-fit">
                            <MapPin className="h-6 w-6 text-purple-600" />
                        </div>
                        <CardTitle>Vị trí</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-semibold">Trung tâm Y tế</p>
                        <p className="text-sm text-muted-foreground">Tòa nhà chính, Tầng 1</p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-12 text-center">
                <Card className="inline-block p-6">
                    <div className="flex items-center space-x-4">
                        <Clock className="h-6 w-6 text-primary" />
                        <div>
                            <h3 className="font-semibold">Giờ Hoạt động</h3>
                            <p className="text-sm text-muted-foreground">Thứ Hai - Thứ Sáu: 7:00 - 18:00</p>
                            <p className="text-sm text-muted-foreground">Dịch vụ khẩn cấp 24/7</p>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}
export default Contact
