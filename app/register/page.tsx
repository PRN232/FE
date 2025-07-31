"use client";

import {
    useState,
    FormEvent,
    useEffect
} from "react";
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

    const handleInputChange = (
        field: string,
        value: string
    ) => {
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
                router.push("/login");
            }, 2000);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            router.push("/login");
        }
    }, [isSuccess, router]);

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
                <Card className="w-full max-w-md border-0 shadow-xl bg-gradient-to-br from-white to-red-50">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center mb-4 border-2 border-red-200">
                            <CheckCircle className="h-8 w-8 text-red-600 animate-pulse" />
                        </div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                            Đăng ký thành công
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Đang chuyển hướng đến trang đăng nhập...
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex flex-col lg:flex-row">
            {/* Left side - Registration Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md space-y-6">
                    {/* Back to Home */}
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-red-600 hover:text-orange-600 transition-colors group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Trở về trang chính
                    </Link>

                    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-red-50 hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="space-y-1">
                            <div className="text-center">
                                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                    Tạo tài khoản
                                </CardTitle>
                                <CardDescription className="text-gray-600 mt-2">
                                    Tham gia hệ thống quản lý sức khỏe học đường của chúng tôi
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="text-gray-700">Họ và Tên</Label>
                                    <Input
                                        id="fullName"
                                        placeholder="Nguyễn Văn A"
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                                        disabled={isLoading}
                                        className={`${errors.fullName ? "border-red-500" : "border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-200"} bg-white/80 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all duration-200`}
                                    />
                                    {errors.fullName && (
                                        <p className="text-xs text-red-600 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.fullName}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-700">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="nguyenvana@email.com"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        disabled={isLoading}
                                        className={`${errors.email ? "border-red-500" : "border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-200"} bg-white/80 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all duration-200`}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-600 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Username */}
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-gray-700">Tên đăng nhập</Label>
                                    <Input
                                        id="username"
                                        placeholder="nguyenvana"
                                        value={formData.username}
                                        onChange={(e) => handleInputChange("username", e.target.value)}
                                        disabled={isLoading}
                                        className={`${errors.username ? "border-red-500" : "border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-200"} bg-white/80 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all duration-200`}
                                    />
                                    {errors.username && (
                                        <p className="text-xs text-red-600 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.username}
                                        </p>
                                    )}
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber" className="text-gray-700">Số điện thoại</Label>
                                    <Input
                                        id="phoneNumber"
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                                        disabled={isLoading}
                                        className={`${errors.phoneNumber ? "border-red-500" : "border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-200"} bg-white/80 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all duration-200`}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-xs text-red-600 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.phoneNumber}
                                        </p>
                                    )}
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-gray-700">Địa chỉ</Label>
                                    <Input
                                        id="address"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange("address", e.target.value)}
                                        disabled={isLoading}
                                        className={`${errors.address ? "border-red-500" : "border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-200"} bg-white/80 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all duration-200`}
                                    />
                                    {errors.address && (
                                        <p className="text-xs text-red-600 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-700">Mật khẩu</Label>
                                    <div className="relative group">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange("password", e.target.value)}
                                            disabled={isLoading}
                                            className={`${errors.password ? "border-red-500" : "border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-200"} bg-white/80 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all duration-200 pr-10`}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-gray-500 hover:text-red-600 transition-colors"
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
                                    {errors.password && (
                                        <p className="text-xs text-red-600 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {errors.general && (
                                    <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                                        <p className="text-sm text-red-600 flex items-center">
                                            <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                                            {errors.general}
                                        </p>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Đang tạo tài khoản...
                                        </>
                                    ) : (
                                        "Tạo tài khoản"
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-600">
                                Đã có tài khoản?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium text-red-600 hover:text-orange-600 hover:underline transition-colors"
                                >
                                    Đăng nhập ở đây
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Right side - Information */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-red-600 to-orange-600 hidden lg:flex items-center justify-center p-12">
                <SignUpInfo />
            </div>
        </div>
    );
};

export default RegisterPage;