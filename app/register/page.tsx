"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        schoolCode: "",
        phoneNumber: "",
        agreeToTerms: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const router = useRouter()

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required"
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long"
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        if (!formData.role) {
            newErrors.role = "Please select your role"
        }

        if (!formData.schoolCode.trim()) {
            newErrors.schoolCode = "School code is required"
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required"
        } else if (!/^\+?[\d\s\-$$$$]{10,}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid phone number"
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "You must agree to the terms and conditions"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 2000))

        setIsSuccess(true)
        setIsLoading(false)

        setTimeout(() => {
            router.push("/login?message=registration-success")
        }, 2000)
    }

    if (isSuccess) {
        return (
            <div className="max-h-screen flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-green-600">Registration Successful!</CardTitle>
                        <CardDescription>
                            Your account has been created successfully. You will be redirected to the login page shortly.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-sm text-muted-foreground mb-4">
                            Please check your email for account verification instructions.
                        </p>
                        <Button asChild className="w-full">
                            <Link href="/login">Go to Login</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
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
                        Back to Home
                    </Link>

                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
                            <CardDescription className="text-center">Join the HealthCare School community</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            placeholder="John"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                                            disabled={isLoading}
                                            className={errors.firstName ? "border-red-500" : ""}
                                        />
                                        {errors.firstName && (
                                            <p className="text-xs text-red-500 flex items-center">
                                                <AlertCircle className="h-3 w-3 mr-1" />
                                                {errors.firstName}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                                            disabled={isLoading}
                                            className={errors.lastName ? "border-red-500" : ""}
                                        />
                                        {errors.lastName && (
                                            <p className="text-xs text-red-500 flex items-center">
                                                <AlertCircle className="h-3 w-3 mr-1" />
                                                {errors.lastName}
                                            </p>
                                        )}
                                    </div>
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

                                {/* Role Selection */}
                                <div className="space-y-2 ">
                                    <Label htmlFor="role">Role</Label>
                                    <Select
                                        value={formData.role}
                                        onValueChange={(value) => handleInputChange("role", value)}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                                            <SelectValue placeholder="Select your role" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="parent">Parent/Guardian</SelectItem>
                                            <SelectItem value="medical_staff">Medical Staff</SelectItem>
                                            <SelectItem value="teacher">Teacher</SelectItem>
                                            <SelectItem value="admin">Administrator</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.role && (
                                        <p className="text-xs text-red-500 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.role}
                                        </p>
                                    )}
                                </div>

                                {/* School Code */}
                                <div className="space-y-2">
                                    <Label htmlFor="schoolCode">School Code</Label>
                                    <Input
                                        id="schoolCode"
                                        placeholder="Enter your school code"
                                        value={formData.schoolCode}
                                        onChange={(e) => handleInputChange("schoolCode", e.target.value)}
                                        disabled={isLoading}
                                        className={errors.schoolCode ? "border-red-500" : ""}
                                    />
                                    {errors.schoolCode && (
                                        <p className="text-xs text-red-500 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.schoolCode}
                                        </p>
                                    )}
                                    <p className="text-xs text-muted-foreground">Contact your school administrator for the school code</p>
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
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

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a strong password"
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

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                            disabled={isLoading}
                                            className={errors.confirmPassword ? "border-red-500" : ""}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            disabled={isLoading}
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-xs text-red-500 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>

                                {/* Terms and Conditions */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                                        disabled={isLoading}
                                    />
                                    <Label htmlFor="agreeToTerms" className="text-sm">
                                        I agree to the{" "}
                                        <Link href="/terms" className="text-primary hover:underline">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacy" className="text-primary hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </Label>
                                </div>
                                {errors.agreeToTerms && (
                                    <p className="text-xs text-red-500 flex items-center">
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                        {errors.agreeToTerms}
                                    </p>
                                )}

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link href="/login" className="text-primary hover:underline">
                                    Sign in here
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Right side - Information */}
            <div className="hidden lg:flex lg:flex-1 lg:relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-blue-600" />
                <div className="relative flex flex-col justify-center items-center text-white p-12">
                    <div className="max-w-md text-center space-y-6">
                        <h1 className="text-4xl font-bold">Join Our Community</h1>
                        <p className="text-lg text-green-100">
                            Become part of our comprehensive school health management system and ensure the best care for students.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <span>Access to comprehensive health records</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <span>Real-time communication with medical staff</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <span>Easy medicine request management</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-white rounded-full" />
                                <span>Vaccination tracking and reminders</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage