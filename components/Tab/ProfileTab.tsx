"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { Loader2, Save } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getParentByUserId, updateParent } from "@/lib/service/parent/parent";
import ChildrenSection from "./ChildrenSection"; // Adjust the import path as needed

const ProfileTab = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [profileData, setProfileData] = useState({
        username: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        const loadUserData = async () => {
            if (user?.id) {
                try {
                    const fetchedUser = await getParentByUserId(Number(user.id));
                    if (fetchedUser) {
                        setProfileData({
                            username: fetchedUser.parent?.name || "",
                            email: fetchedUser.parent?.email || "",
                            phone: fetchedUser.parent?.phoneNumber || "",
                            address: fetchedUser.parent?.address || "",
                        });
                    } else {
                        setFetchError("Failed to load user data");
                    }
                    setIsLoading(false);
                } catch (error) {
                    setFetchError("Failed to load user data");
                    console.error(error);
                    setIsLoading(false);
                }
            }
        };

        loadUserData().catch((error) => {
            setFetchError("Failed to load user data");
            setIsLoading(false);
            console.error(error);
        });
    }, [user?.id]);

    const handleProfileSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        const { username, email, phone, address } = profileData;

        if (!username || !email || !phone || !address) {
            setErrorMessage("Vui lòng nhập đầy đủ thông tin cá nhân.");
            setIsLoading(false);
            return;
        }

        try {
            await updateParent(Number(user?.id), {
                fullName: profileData.username,
                phoneNumber: profileData.phone,
                address: profileData.address,
            });
            setSuccessMessage("Thay đổi thông tin cá nhân thành công!");
        } catch (error) {
            setErrorMessage("Cập nhật thông tin thất bại. Vui lòng thử lại.");
            console.error(error);
        } finally {
            setIsLoading(false);
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Thông tin cá nhân</CardTitle>
                    <CardDescription>Cập nhật thông tin cá nhân của bạn.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
                        <span className="ml-2 text-gray-600">Đang tải thông tin...</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (fetchError) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Thông tin cá nhân</CardTitle>
                    <CardDescription>Cập nhật thông tin cá nhân của bạn.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{fetchError}</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>Cập nhật thông tin cá nhân của bạn.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Họ và Tên</Label>
                        <Input
                            id="fullName"
                            value={profileData.username}
                            onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    className="pl-10"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    disabled={isLoading}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">
                                Số diện thoại
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="phone"
                                    type="tel"
                                    className="pl-10"
                                    value={profileData.phone}
                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Địa chỉ</Label>
                        <Input
                            id="address"
                            value={profileData.address}
                            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                            disabled={isLoading}
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Lưu thay đổi....
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Lưu thay đổi
                            </>
                        )}
                    </Button>
                    {successMessage && (
                        <Alert className="mt-4 border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
                        </Alert>
                    )}
                    {errorMessage && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}
                </form>
                <ChildrenSection user={user} />
            </CardContent>
        </Card>
    );
};

export default ProfileTab;