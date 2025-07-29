"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Save, Plus, CheckCircle, AlertTriangle, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { createMedicationGiven } from "@/lib/service/medical-record/medication-given/medication-given"
import { CreateMedicationGivenDto } from "@/lib/service/medical-record/medication-given/IMedication-given"
import { getAllMedications } from "@/lib/service/medications/medications"
import { getChildrenByParentId } from "@/lib/service/parent/parent"
import { ChildDTO, Medication } from "@/types"

interface MedicalRequestModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
    incidentId?: number | null
}

interface MedicalRequestFormData {
    childId: number
    childName: string
    medicationName: string
    dosage: string
    duration: string
    reason: string
    urgency: string
    requestType: string
    giveAt: Date
    specialInstructions: string
    parentConsent: boolean
}

const MedicalRequestModal = ({ isOpen, onClose, onSuccess, incidentId }: MedicalRequestModalProps) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const parentId = user?.id
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [medications, setMedications] = useState<Medication[]>([])
    const [isMedicationsLoading, setIsMedicationsLoading] = useState(true)
    const [children, setChildren] = useState<ChildDTO[]>([])
    const [isChildrenLoading, setIsChildrenLoading] = useState(true)
    const [formData, setFormData] = useState<MedicalRequestFormData>({
        childId: 0,
        childName: "",
        medicationName: "",
        dosage: "",
        duration: "",
        reason: "",
        urgency: "",
        requestType: "Medicine Administration",
        giveAt: new Date(),
        specialInstructions: "",
        parentConsent: false,
    })

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                setIsMedicationsLoading(true)
                const response = await getAllMedications()
                if (response.success && response.data) {
                    setMedications(response.data)
                } else {
                    setErrorMessage("Không thể tải danh sách thuốc.")
                }
            } catch (error) {
                console.error("Error fetching medications:", error)
                setErrorMessage("Không thể tải danh sách thuốc. Vui lòng thử lại.")
            } finally {
                setIsMedicationsLoading(false)
            }
        }

        void fetchMedications()
    }, [])

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                setIsChildrenLoading(true)
                const response = await getChildrenByParentId(parentId)
                if (response.success && response.children) {
                    setChildren(response.children)
                } else {
                    setErrorMessage("Không thể tải danh sách con em.")
                }
            } catch (error) {
                console.error("Error fetching children:", error)
                setErrorMessage("Không thể tải danh sách con em. Vui lòng thử lại.")
            } finally {
                setIsChildrenLoading(false)
            }
        }

        void fetchChildren()
    }, [parentId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage("")
        setSuccessMessage("")

        if (
            !formData.childId ||
            !formData.medicationName ||
            !formData.dosage ||
            !formData.duration ||
            !formData.reason ||
            !formData.urgency ||
            !formData.parentConsent
        ) {
            setErrorMessage("Vui lòng điền đầy đủ thông tin bắt buộc và xác nhận đồng ý.")
            setIsLoading(false)
            return
        }

        try {
            const selectedMedication = medications.find((med) => med.name === formData.medicationName)

            if (!selectedMedication) {
                setErrorMessage("Thuốc không hợp lệ.")
                return
            }

            const medicationData: CreateMedicationGivenDto = {
                incidentId: incidentId || 0,
                medicationId: selectedMedication.id,
                dosage: formData.dosage,
                giveAt: formData.giveAt.toISOString(),
            }

            const response = await createMedicationGiven(medicationData)

            if (response.success) {
                setSuccessMessage("Yêu cầu y tế đã được gửi thành công!")

                setTimeout(() => {
                    resetForm()
                    onSuccess?.()
                    onClose()
                }, 1500)
            } else {
                setErrorMessage(response.message || "Có lỗi xảy ra khi gửi yêu cầu")
                return
            }
        } catch (error) {
            console.error("Error creating medical request:", error)
            setErrorMessage(error instanceof Error ? error.message : "Không thể gửi yêu cầu. Vui lòng thử lại.")
        } finally {
            setIsLoading(false)
        }
    }

    const resetForm = () => {
        setFormData({
            childId: 0,
            childName: "",
            medicationName: "",
            dosage: "",
            duration: "",
            reason: "",
            urgency: "",
            requestType: "Medicine Administration",
            giveAt: new Date(),
            specialInstructions: "",
            parentConsent: false,
        })
        setSuccessMessage("")
        setErrorMessage("")
    }

    const handleClose = () => {
        resetForm()
        onClose()
    }

    const handleInputChange = (field: keyof MedicalRequestFormData, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleChildSelect = (childId: string) => {
        const selectedChild = children.find((child) => child.id.toString() === childId)
        if (selectedChild) {
            handleInputChange("childId", selectedChild.id)
            handleInputChange("childName", selectedChild.fullName)
        } else {
            handleInputChange("childId", 0)
            handleInputChange("childName", "")
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center text-red-800">
                            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white mr-3">
                                <Plus className="w-4 h-4" />
                            </div>
                            Tạo Yêu Cầu Y Tế
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Gửi yêu cầu y tế cho con em của bạn tại trường
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        {/* Child Selection */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                Thông tin học sinh
                            </h3>
                            <div className="grid gap-2">
                                <Label htmlFor="child" className="text-red-800 font-semibold">
                                    Chọn con em <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.childId.toString()}
                                    onValueChange={handleChildSelect}
                                    disabled={isLoading || isChildrenLoading || children.length === 0}
                                >
                                    <SelectTrigger className="border-red-200 focus:border-red-500">
                                        <SelectValue
                                            placeholder={
                                                isChildrenLoading
                                                    ? "Đang tải danh sách con em..."
                                                    : children.length === 0
                                                        ? "Không có con em nào"
                                                        : "Chọn con em"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {children.map((child) => (
                                            <SelectItem key={child.id} value={child.id.toString()}>
                                                {child.fullName} (Mã: {child.studentCode}, Tuổi: {child.age}, Giới tính: {child.gender})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Request Type and Urgency */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Loại yêu cầu</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="requestType" className="text-red-800 font-semibold">
                                        Loại yêu cầu <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.requestType}
                                        onValueChange={(value) => handleInputChange("requestType", value)}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger className="border-red-200 focus:border-red-500">
                                            <SelectValue placeholder="Chọn loại yêu cầu" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="Medicine Administration">Cho uống thuốc</SelectItem>
                                            <SelectItem value="Emergency Contact">Liên hệ khẩn cấp</SelectItem>
                                            <SelectItem value="Vaccination Follow-up">Theo dõi sau tiêm chủng</SelectItem>
                                            <SelectItem value="Medical Examination">Khám sức khỏe</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="urgency" className="text-red-800 font-semibold">
                                        Mức độ khẩn cấp <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.urgency}
                                        onValueChange={(value) => handleInputChange("urgency", value)}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger className="border-red-200 focus:border-red-500">
                                            <SelectValue placeholder="Chọn mức độ khẩn cấp" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="low">Thấp - Không khẩn cấp</SelectItem>
                                            <SelectItem value="medium">Trung bình - Cần chú ý</SelectItem>
                                            <SelectItem value="high">Cao - Khẩn cấp</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Medication Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Thông tin thuốc</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="medicationName" className="text-red-800 font-semibold">
                                        Tên thuốc <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.medicationName}
                                        onValueChange={(value) => handleInputChange("medicationName", value)}
                                        disabled={isLoading || isMedicationsLoading || medications.length === 0}
                                    >
                                        <SelectTrigger className="border-red-200 focus:border-red-500">
                                            <SelectValue
                                                placeholder={
                                                    isMedicationsLoading
                                                        ? "Đang tải danh sách thuốc..."
                                                        : medications.length === 0
                                                            ? "Không có thuốc nào"
                                                            : "Chọn thuốc"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            {medications.map((medication) => (
                                                <SelectItem key={medication.id} value={medication.name}>
                                                    {medication.name} ({medication.type})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="dosage" className="text-red-800 font-semibold">
                                        Liều dùng <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="dosage"
                                        name="dosage"
                                        placeholder="Ví dụ: 1 viên, 2 lần/ngày"
                                        value={formData.dosage}
                                        onChange={(e) => handleInputChange("dosage", e.target.value)}
                                        className="border-red-200 focus:border-red-500"
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="duration" className="text-red-800 font-semibold">
                                        Thời gian sử dụng <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="duration"
                                        name="duration"
                                        placeholder="Ví dụ: 3 ngày, 1 tuần"
                                        value={formData.duration}
                                        onChange={(e) => handleInputChange("duration", e.target.value)}
                                        className="border-red-200 focus:border-red-500"
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label className="text-red-800 font-semibold">
                                        Thời gian cho uống <span className="text-red-500">*</span>
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={`border-red-200 focus:border-red-500 justify-start text-left font-normal w-full ${
                                                    !formData.giveAt && "text-gray-400"
                                                }`}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {formData.giveAt ? format(formData.giveAt, "PPP", { locale: vi }) : <span>Chọn ngày</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-white">
                                            <Calendar
                                                mode="single"
                                                selected={formData.giveAt}
                                                onSelect={(date) => date && handleInputChange("giveAt", date)}
                                                autoFocus={true}
                                                locale={vi}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>

                        {/* Medical Reason */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Lý do y tế</h3>
                            <div className="grid gap-2">
                                <Label htmlFor="reason" className="text-red-800 font-semibold">
                                    Lý do cần thuốc <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="reason"
                                    name="reason"
                                    placeholder="Mô tả chi tiết lý do y tế và triệu chứng..."
                                    value={formData.reason}
                                    onChange={(e) => handleInputChange("reason", e.target.value)}
                                    className="border-red-200 focus:border-red-500 min-h-24"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Special Instructions */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Hướng dẫn đặc biệt</h3>
                            <div className="grid gap-2">
                                <Label htmlFor="specialInstructions" className="text-red-800 font-semibold">
                                    Hướng dẫn đặc biệt
                                </Label>
                                <Textarea
                                    id="specialInstructions"
                                    name="specialInstructions"
                                    placeholder="Hướng dẫn đặc biệt hoặc lưu ý quan trọng..."
                                    value={formData.specialInstructions}
                                    onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                                    className="border-red-200 focus:border-red-500 min-h-20"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Parent Consent */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="parentConsent"
                                checked={formData.parentConsent}
                                onCheckedChange={(checked) => handleInputChange("parentConsent", checked)}
                                className="border-red-300"
                                disabled={isLoading}
                            />
                            <Label htmlFor="parentConsent" className="text-sm text-gray-700">
                                Tôi xác nhận thông tin trên là chính xác và đồng ý cho nhà trường thực hiện yêu cầu này{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                        </div>

                        {/* Success Message */}
                        {successMessage && (
                            <Alert className="border-green-200 bg-green-50">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
                            </Alert>
                        )}

                        {/* Error Message */}
                        {errorMessage && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>{errorMessage}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isLoading}
                                className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                            >
                                Hủy
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Đang gửi...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Gửi Yêu Cầu
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default MedicalRequestModal