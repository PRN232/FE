"use client";

import { ReactNode } from "react";
import ProtectRoute from "@/components/ProtectRoute";

export default function ParentsLayout({ children }: { children: ReactNode }) {
    return <ProtectRoute allowedRoles={["parent"]}>{children}</ProtectRoute>;
}