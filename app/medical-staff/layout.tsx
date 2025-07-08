"use client";

import { ReactNode } from "react";
import ProtectRoute from "@/components/ProtectRoute";

export default function MedicalStaffLayout({ children }: { children: ReactNode }) {
    return <ProtectRoute allowedRoles={["schoolnurse"]}>{children}</ProtectRoute>;
}