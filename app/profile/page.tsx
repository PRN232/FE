"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileTab from "@/components/Tab/ProfileTab";
import SecurityTab from "@/components/Tab/SecurityTab";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header with gradient accent */}
                    <div className="relative mb-12">
                        <div
                            className="absolute -left-4 top-0 h-full w-1
                            bg-gradient-to-b from-red-500 to-red-600 rounded-full" />
                        <h1
                            className="text-4xl font-bold tracking-tight text-gray-900 pl-6">
                            Cài đặt tài khoản
                        </h1>
                        <p className="text-gray-500 pl-6 mt-2">
                            Quản lý hồ sơ sức khỏe học sinh
                        </p>
                    </div>

                    {/* Enhanced Tabs */}
                    <Tabs
                        defaultValue="profile"
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-2 max-w-md bg-gray-100 p-1 rounded-lg justify-center">
                            <TabsTrigger
                                value="profile"
                                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-red-600 transition-all flex justify-center"
                            >
                                <span className="relative z-10">
                                    Hồ sơ
                                </span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="security"
                                className="data-[state=active]:bg-white data-[state=active]:shadow-sm
                                data-[state=active]:text-red-600 transition-all flex justify-center"
                            >
                                <span className="relative z-10">
                                    Bảo mật
                                </span>
                            </TabsTrigger>
                        </TabsList>

                        {/* Tab Content with subtle gradient border */}
                        <div className="mt-8 relative">
                            <div
                                className="absolute -inset-1 bg-gradient-to-r
                                from-red-400 to-red-600 rounded-xl opacity-10 blur-sm"
                            />
                            <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <TabsContent value="profile" className="p-6">
                                    <ProfileTab />
                                </TabsContent>

                                <TabsContent value="security" className="p-6">
                                    <SecurityTab />
                                </TabsContent>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Profile;