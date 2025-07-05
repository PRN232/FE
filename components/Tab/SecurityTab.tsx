"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";

const SecurityTab = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { change, isLoading, error, user } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user?.id) {
            return;
        }

        const userId = parseInt(user.id);
        if (!currentPassword || !newPassword || !confirmPassword) {
            return;
        }
        if (newPassword !== confirmPassword) {
            return;
        }

        const success = await change(
            userId,
            currentPassword,
            newPassword,
            confirmPassword
        );
        if (success) {
            router.push("/profile");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="text-center space-y-2">
                    <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-50 rounded-full">
                        <Lock className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Đổi mật khẩu
                    </h2>
                    <p className="text-gray-500">
                        Vui lòng nhập mật khẩu hiện tại và mật khẩu mới của bạn
                    </p>
                </div>

                {error && (
                    <Alert variant="destructive" className="border-red-200">
                        <AlertDescription className="text-red-600">
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword" className="text-gray-700">
                                Mật khẩu hiện tại
                            </Label>
                            <div className="relative">
                                <Input
                                    id="currentPassword"
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    disabled={isLoading}
                                    required
                                    placeholder="Nhập mật khẩu hiện tại"
                                    className="pl-10 pr-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-gray-700">
                                Mật khẩu mới
                            </Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    disabled={isLoading}
                                    required
                                    placeholder="Nhập mật khẩu mới"
                                    className="pl-10 pr-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-700">
                                Xác nhận mật khẩu mới
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={isLoading}
                                    required
                                    placeholder="Xác nhận mật khẩu mới"
                                    className="pl-10 pr-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-md transition-all duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang xử lý...
                            </>
                        ) : (
                            "Đổi mật khẩu"
                        )}
                    </Button>
                </form>

                <div className="text-center text-sm text-gray-500">
                    <button
                        onClick={() => router.push("/profile")}
                        className="text-red-600 hover:text-red-800 font-medium"
                    >
                        Quay lại trang cá nhân
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SecurityTab;