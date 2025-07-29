"use client";

import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

interface ProtectRouteProps {
    allowedRoles: string[];
    children: ReactNode;
}

const ProtectRoute = ({
                          allowedRoles,
                          children
                      }: ProtectRouteProps) => {
    const { user } = useAuth();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const incrementProgress = () => {
            if (isMounted) {
                setProgress((prev) => {
                    const newProgress = prev >= 100 ? 100 : prev + 2;
                    if (newProgress >= 100) {
                        clearInterval(interval);
                    }
                    return newProgress;
                });
            }
        };

        const interval = setInterval(incrementProgress, 50);

        const timer = setTimeout(() => {
            if (isMounted) {
                clearInterval(interval);
                if (!user) {
                    router.push("/login");
                } else if (!allowedRoles.includes(user.role)) {
                    router.push("/");
                } else {
                    setIsLoading(false);
                }
            }
        }, 2000);

        if (user && !allowedRoles.includes(user.role) && isMounted) {
            router.push("/");
        }

        return () => {
            isMounted = false;
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [allowedRoles, router, user]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center w-[90%]">
                    <div
                        className="w-full h-4 bg-red-500 overflow-hidden"
                        style={{ width: `${progress}%`, transition: "width 75ms linear" }}
                    />
                </div>
            </div>
        );
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectRoute;