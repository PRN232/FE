"use client";

import type React from "react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertCircle, User, Lock } from "lucide-react";
import ProfileTab from "@/components/Tab/ProfileTab";
import SecurityTab from "@/components/Tab/SecurityTab";
import { useAuth } from "@/lib/auth/auth-context";

export default function ProfilePage() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
                    <p className="text-muted-foreground">Manage your account settings and preferences</p>
                </div>
            </div>

            {/* Success/Error Messages */}
            {successMessage && (
                <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
                </Alert>
            )}

            {errorMessage && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="w-full flex items-center">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Security
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileTab />
                </TabsContent>

                <TabsContent value="security">
                    <SecurityTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}