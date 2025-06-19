"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const { login, isLoading, user } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        const success = await login(email, password)
        if (success) {
            if (user?.role === "parent") {
                router.push("/");
            } else if (user?.role === "medical_staff") {
                router.push("/medical-staff/incidents");
            } else {
                router.push("/dashboard");
            }
        } else {
            setError("Invalid email or password");
        }
    }

    return (
        <div className="max-h-screen flex">
            {/* Left side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md space-y-6">
                    {/* Back to Home */}
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>

                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
                            <CardDescription className="text-center">Sign in to your HealthCare School account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={isLoading}
                                            required
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
                                </div>

                                {error && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <Button type="submit" className="w-full" disabled={isLoading}>
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

                            <div className="mt-6 text-center text-sm">
                                <Link href="/forgot-password" className="text-primary hover:underline">
                                    Forgot your password?
                                </Link>
                            </div>

                            <div className="mt-4 text-center text-sm text-muted-foreground">
                                Don't have an account?{" "}
                                <Link href="/register" className="text-primary hover:underline">
                                    Contact your school administrator
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Demo Credentials */}
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-sm">Demo Credentials</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                            <div>
                                <strong>Email:</strong> any valid email
                            </div>
                            <div>
                                <strong>Password:</strong> any password (6+ characters)
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Right side - Image/Branding */}
            <div className="hidden lg:flex lg:flex-1 lg:relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600" />
                <div className="relative flex flex-col justify-center items-center text-white p-12">
                    <div className="max-w-md text-center space-y-6">
                        <h1 className="text-4xl font-bold">HealthCare School</h1>
                        <p className="text-lg text-blue-100">
                            Comprehensive digital solution for managing student health records, medical incidents, and health
                            programs.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <span>Secure health record management</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <span>Real-time incident tracking</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <span>Vaccination program management</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <span>Parent-school communication</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage