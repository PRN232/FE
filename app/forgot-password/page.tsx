"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, Mail, CheckCircle, AlertCircle, KeyRound } from "lucide-react";
import Swal from "sweetalert2";
import { useSearchParams, useRouter } from "next/navigation";

type Step = "email" | "code" | "reset" | "success";

const ForgotPasswordPage = () => {
    const token = useSearchParams().get("token");
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<Step>(token ? "reset" : "email");
    const [email, setEmail] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [passwordValidation, setPasswordValidation] = useState({
        lowercase: false,
        uppercase: false,
        number: false,
        length: false,
    });

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setNewPassword(password);

        setPasswordValidation({
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            length: password.length >= 8,
        });
    };

    const handleEmailSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("Vui lòng nhập địa chỉ email của bạn");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Vui lòng nhập địa chỉ email hợp lệ");
            return;
        }

        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        setCurrentStep("code");
    };

    const handleCodeSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!resetCode) {
            setError("Vui lòng nhập mã xác minh");
            return;
        }

        if (resetCode.length !== 6) {
            setError("Mã xác minh phải có 6 chữ số");
            return;
        }

        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock validation - accept any 6-digit code
        if (resetCode === "123456" || resetCode.length === 6) {
            setIsLoading(false);
            setCurrentStep("reset");
        } else {
            setIsLoading(false);
            setError("Mã xác minh không hợp lệ");
        }
    };

    const handlePasswordReset = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!newPassword) {
            setError("Vui lòng nhập mật khẩu mới");
            return;
        }

        if (!Object.values(passwordValidation).every((rule) => rule)) {
            setError("Vui lòng đảm bảo mật khẩu đáp ứng các yêu cầu");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Mật khẩu không khớp");
            return;
        }

        if (!token) {
            await Swal.fire({
                icon: "error",
                title: "Không tìm thấy token",
                text: "Vui lòng đăng nhập để đặt lại mật khẩu.",
                showConfirmButton: false,
                timer: 1500,
            });
            router.push("/sign-in");
            return;
        }

        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            await Swal.fire({
                icon: "success",
                title: "Đặt lại mật khẩu thành công!",
                showConfirmButton: false,
                timer: 1500,
            });
            setCurrentStep("success");
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Đã xảy ra lỗi không mong muốn";
            await Swal.fire({
                icon: "error",
                title: "Không thể đặt lại mật khẩu",
                text: errorMessage || "Vui lòng thử lại.",
                showConfirmButton: false,
                timer: 1500,
            });
            console.error("Lỗi API Đặt lại Mật khẩu:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderEmailStep = () => (
        <Card>
            <CardHeader className="space-y-1">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-center">Quên mật khẩu?</CardTitle>
                <CardDescription className="text-center">
                    Nhập địa chỉ email của bạn và chúng tôi sẽ gửi mã xác minh để đặt lại mật khẩu.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Địa chỉ Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Nhập địa chỉ email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang gửi mã...
                            </>
                        ) : (
                            "Gửi mã xác minh"
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Nhớ mật khẩu?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Quay lại Đăng nhập
                    </Link>
                </div>
            </CardContent>
        </Card>
    );

    const renderCodeStep = () => (
        <Card>
            <CardHeader className="space-y-1">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-center">Kiểm tra Email của bạn</CardTitle>
                <CardDescription className="text-center">
                    Chúng tôi đã gửi mã xác minh 6 chữ số đến <strong>{email}</strong>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCodeSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="resetCode">Mã Xác minh</Label>
                        <Input
                            id="resetCode"
                            type="text"
                            placeholder="Nhập mã 6 chữ số"
                            value={resetCode}
                            onChange={(e) => setResetCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                            disabled={isLoading}
                            className="text-center text-lg tracking-widest"
                            maxLength={6}
                            required
                        />
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang xác minh...
                            </>
                        ) : (
                            "Xác minh Mã"
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Chưa nhận được mã?</p>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentStep("email")}
                        className="text-primary hover:underline"
                    >
                        Thử email khác
                    </Button>
                </div>

                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground text-center">
                        <strong>Demo:</strong> Sử dụng mã &quot;123456&quot; hoặc bất kỳ số 6 chữ số nào
                    </p>
                </div>
            </CardContent>
        </Card>
    );

    const renderResetStep = () => (
        <Card>
            <CardHeader className="space-y-1">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <KeyRound className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-center">Đặt lại Mật khẩu</CardTitle>
                <CardDescription className="text-center">
                    Nhập mật khẩu mới của bạn bên dưới
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">Mật khẩu Mới</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            placeholder="Nhập mật khẩu mới"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Xác nhận Mật khẩu Mới</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Xác nhận mật khẩu mới"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="mt-2 space-y-1 text-sm">
                        <p className={passwordValidation.lowercase ? "text-green-500" : "text-red-500"}>
                            {passwordValidation.lowercase ? "✔" : "✘"} Ít nhất một chữ cái thường
                        </p>
                        <p className={passwordValidation.uppercase ? "text-green-500" : "text-red-500"}>
                            {passwordValidation.uppercase ? "✔" : "✘"} Ít nhất một chữ cái in hoa
                        </p>
                        <p className={passwordValidation.number ? "text-green-500" : "text-red-500"}>
                            {passwordValidation.number ? "✔" : "✘"} Ít nhất một số
                        </p>
                        <p className={passwordValidation.length ? "text-green-500" : "text-red-500"}>
                            {passwordValidation.length ? "✔" : "✘"} Tối thiểu 8 ký tự
                        </p>
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang đặt lại mật khẩu...
                            </>
                        ) : (
                            "Đặt lại Mật khẩu"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );

    const renderSuccessStep = () => (
        <Card>
            <CardHeader className="space-y-1">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-center text-green-600">Đặt lại Mật khẩu Thành công!</CardTitle>
                <CardDescription className="text-center">
                    Mật khẩu của bạn đã được đặt lại thành công. Bây giờ bạn có thể đăng nhập với mật khẩu mới.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button asChild className="w-full">
                    <Link href="/login">Đi đến Đăng nhập</Link>
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                    <Link href="/" className="text-primary hover:underline">
                        Quay lại Trang chủ
                    </Link>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen flex">
            {/* Left side - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-6">
                    {currentStep === "email" && (
                        <Link
                            href="/login"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Quay lại Đăng nhập
                        </Link>
                    )}

                    {/* Progress Indicator */}
                    {currentStep !== "success" && (
                        <div className="flex items-center justify-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${currentStep === "email" ? "bg-primary" : "bg-muted"}`} />
                            <div className={`w-2 h-2 rounded-full ${currentStep === "code" ? "bg-primary" : "bg-muted"}`} />
                            <div className={`w-2 h-2 rounded-full ${currentStep === "reset" ? "bg-primary" : "bg-muted"}`} />
                        </div>
                    )}

                    {/* Render current step */}
                    {currentStep === "email" && renderEmailStep()}
                    {currentStep === "code" && renderCodeStep()}
                    {currentStep === "reset" && renderResetStep()}
                    {currentStep === "success" && renderSuccessStep()}
                </div>
            </div>

            {/* Right side - Information */}
            <div className="hidden lg:flex lg:flex-1 lg:relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600" />
                <div className="relative flex flex-col justify-center items-center text-white p-12">
                    <div className="max-w-md text-center space-y-6">
                        <h1 className="text-4xl font-bold">Đặt lại mật khẩu an toàn</h1>
                        <p className="text-lg text-purple-100">
                            Chúng tôi rất coi trọng bảo mật. Quy trình đặt lại mật khẩu của chúng tôi đảm bảo tài khoản của bạn được bảo vệ trong khi cung cấp cho bạn quyền truy cập dễ dàng để đặt lại thông tin đăng nhập.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <span>Xác minh email để bảo mật</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <span>Yêu cầu mật khẩu mạnh</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <span>Truy cập ngay sau khi đặt lại</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <span>Hỗ trợ 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;