"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import Branding from "@/components/Branding";

import { useAuth } from "@/lib/auth/auth-context";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { login, isLoading, user, error } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        await login(email, password);
    };

    useEffect(() => {
        if (user && !error) {
            if (user.role === "parent") {
                router.push("/");
            } else if (user.role === "schoolnurse") {
                router.push("/medical-staff/incidents");
            }
        }
    }, [user, error, router]);

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-red-50 to-white">
            {/* Left side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md space-y-6">
                    {/* Back to Home */}
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm
                        text-muted-foreground hover:text-red-600 transition-colors group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Trở về trang chủ
                    </Link>

                    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="space-y-1">
                            <CardTitle
                                className="text-2xl font-bold text-center bg-gradient-to-r
                                from-red-600 to-orange-600 bg-clip-text text-transparent">
                                Chào mừng đến HealthCare School
                            </CardTitle>
                            <CardDescription className="text-center">
                                Đăng nhập để tiếp tục
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-700">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Nhập email của bạn"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                        required
                                        className="focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all duration-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-700">Mật khẩu</Label>
                                    <div className="relative group">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Nhập mật khẩu"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={isLoading}
                                            required
                                            className="focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all duration-200 pr-10"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-red-600 transition-colors"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 transition-all duration-200" />
                                            ) : (
                                                <Eye className="h-4 w-4 transition-all duration-200" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="rememberMe"
                                            checked={rememberMe}
                                            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                            className="h-4 w-4 rounded border-gray-300 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                                        />
                                        <Label htmlFor="rememberMe" className="text-sm font-medium text-gray-700">
                                            Ghi nhớ đăng nhập
                                        </Label>
                                    </div>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm font-medium text-red-600 hover:text-red-800 hover:underline transition-colors"
                                    >
                                        Quên mật khẩu?
                                    </Link>
                                </div>

                                {error && (
                                    <Alert variant="destructive" className="border-red-500">
                                        <AlertDescription className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-2"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {error}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-600">
                                Chưa có tài khoản?{" "}
                                <Link
                                    href="/register"
                                    className="font-medium text-red-600 hover:text-red-800 hover:underline transition-colors"
                                >
                                    Đăng ký
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Right side - Image/Branding */}
            <Branding />
        </div>
    );
};

export default LoginPage;