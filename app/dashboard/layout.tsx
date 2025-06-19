"use client";

import { ReactNode } from "react";
import ProtectRoute from "@/components/ProtectRoute";

const AdminProtectRoute = ({ children }: { children: ReactNode }) => {
    return <ProtectRoute allowedRoles={["admin"]} isAdminOnly={true}>{children}</ProtectRoute>;
};

export default AdminProtectRoute;