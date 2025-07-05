"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import SignUpInfo from "@/components/SignUpInfo";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        phoneNumber: "",
        address: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();
    const { signup } = useAuth();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\+?[\d\s\-]{10,}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid phone number";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        const result = await signup(
            formData.fullName,
            formData.email,
            formData.username,
            formData.password,
            formData.phoneNumber,
            formData.address
        );

        if (result.success) {
            setIsSuccess(true);
        } else if (result.error) {
            setErrors((prev) => ({ ...prev, general: result.error || "Registration failed" }));
        }

        setIsLoading(false);

        if (isSuccess) {
            setTimeout(() => {
                router.push("/login?message=registration-success");
            }, 2000);
        }
    };

    if (isSuccess) {
        return (
            <div className="max-h-screen flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-green-600">
                            Đăng ký thanh công
                        </CardTitle>
                        <CardDescription>
                            Tài khoản của bạn đã đăng ký thanh cong. Vui lóng đăng nhập với tài khoản mẫu.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Button asChild className="w-full">
                            <Link href="/login">
                                Đi đến Đăng nhập
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex">
            {/* Left side - Registration Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-6">
                    {/* Back to Home */}
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Trờ về trang chính
                    </Link>

                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold text-center">
                                Tạo tài khoản
                            </CardTitle>
                            <CardDescription className="text-center">
                                Tham gia hệ thống quản lý sức khỏe học đường của chúng tôi.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Họ và Tên</Label>
                                    <Input
                                        id="fullName"
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                                        disabled={isLoading}
                                        className={errors.fullName ? "border-red-500" : ""}
                                    />
                                    {errors.fullName && (
                                        <p className="text-xs text-red-500 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.fullName}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john.doe@email.com"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        disabled={isLoading}
                                        className={errors.email ? "border-red-500" : ""}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Username */}
                                <div className="space-y-2">
                                    <Label htmlFor="username">Tên đăng nhập</Label>
                                    <Input
                                        id="username"
                                        placeholder="johndoe"
                                        value={formData.username}
                                        onChange={(e) => handleInputChange("username", e.target.value)}
                                        disabled={isLoading}
                                        className={errors.username ? "border-red-500" : ""}
                                    />
                                    {errors.username && (
                                        <p className="text-xs text-red-500 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.username}
                                        </p>
                                    )}
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber">Số điện thoại</Label>
                                    <Input
                                        id="phoneNumber"
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        value={formData.phoneNumber}
                                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                                        disabled={isLoading}
                                        className={errors.phoneNumber ? "border-red-500" : ""}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-xs text-red-500 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.phoneNumber}
                                        </p>
                                    )}
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <Label htmlFor="address">Địa chỉ</Label>
                                    <Input
                                        id="address"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange("address", e.target.value)}
                                        disabled={isLoading}
                                        className={errors.address ? "border-red-500" : ""}
                                    />
                                    {errors.address && (
                                        <p className="text-xs text-red-500 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">Mật khẩu</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange("password", e.target.value)}
                                            disabled={isLoading}
                                            className={errors.password ? "border-red-500" : ""}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-xs text-red-500 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {errors.general && (
                                    <p className="text-xs text-red-500 flex items-center">
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                        {errors.general}
                                    </p>
                                )}

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        "Tạo tài khoản"
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm text-muted-foreground">
                                Đã có tài khoản?{" "}
                                <Link href="/login" className="text-primary hover:underline">
                                    Đăng nhập ở đây
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Right side - Information */}
            <SignUpInfo />
        </div>
    );
};

export default RegisterPage;