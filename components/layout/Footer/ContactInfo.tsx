import React from 'react'
import {Mail, MapPin, Phone} from "lucide-react";

const ContactInfo = () => {
    return (
        <div className="space-y-6">
            <h4 className="text-lg font-semibold tracking-tight">Thông Tin Liên Hệ</h4>
            <div className="space-y-4">
                <div className="flex items-start text-muted-foreground hover:text-primary transition-colors duration-300">
                    <Phone className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-base">(024) 1234 5678</span>
                </div>
                <div className="flex items-start text-muted-foreground hover:text-primary transition-colors duration-300">
                    <Mail className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-base">yte@truonghoc.edu.vn</span>
                </div>
                <div className="flex items-start text-muted-foreground hover:text-primary transition-colors duration-300">
                    <MapPin className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-base">123 Đường Giải Phóng, Hà Nội</span>
                </div>
            </div>
        </div>
    )
}
export default ContactInfo
