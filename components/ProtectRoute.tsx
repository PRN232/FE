"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

interface ProtectRouteProps {
    allowedRoles: string[];
    isAdminOnly?: boolean;
    children: ReactNode;
}

const ProtectRoute = ({ allowedRoles, isAdminOnly = false, children }
    : ProtectRouteProps) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }

        if (isAdminOnly && user.role !== "admin") {
            router.push("/");
            return;
        }

        if (!isAdminOnly && !allowedRoles.includes(user.role)) {
            router.push("/");
        }
    }, [user, router, allowedRoles, isAdminOnly]);

    if (!user || (isAdminOnly && user.role !== "admin") || (!isAdminOnly && !allowedRoles.includes(user.role))) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectRoute;