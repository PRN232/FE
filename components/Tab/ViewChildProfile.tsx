"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, AlertTriangle } from "lucide-react"
import { getStudentById } from "@/lib/service/student/student"
import BasicInfo from "@/components/Tab/BasicInfo"
import MedicalInfo from "@/components/Tab/MedicalInfo"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { ChildDTO } from "@/types";

interface ViewChildProfileProps {
    isOpen: boolean
    onClose: () => void
    childId: number | null
}

const ViewChildProfile = ({
                              isOpen,
                              onClose,
                              childId
                          }: ViewChildProfileProps) => {
    const [fetchedChild, setFetchedChild] = useState<ChildDTO | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true
        const fetchChildData = async () => {
            if (isOpen && childId) {
                setIsLoading(true)
                setError(null)
                try {
                    const response = await getStudentById(childId)
                    if (isMounted && response.success && response.student) {
                        setFetchedChild(response.student)
                    } else if (isMounted) {
                        setError("Failed to fetch child data")
                    }
                } catch (err) {
                    if (isMounted) {
                        setError("An error occurred while fetching child data")
                        console.error(err)
                    }
                } finally {
                    if (isMounted) {
                        setIsLoading(false)
                    }
                }
            }
        }

        if (isOpen && childId) {
            fetchChildData().catch(err => {
                if (isMounted) {
                    setError("An error occurred while fetching child data")
                    console.error(err)
                }
            })
        }

        return () => {
            isMounted = false
        }
    }, [isOpen, childId])

    if (isLoading) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent
                    aria-describedby="dialog-description"
                    className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500" />
                    </div>
                    <VisuallyHidden>
                        <DialogTitle>Loading student data</DialogTitle>
                    </VisuallyHidden>
                </DialogContent>
            </Dialog>
        )
    }

    if (error && !fetchedChild) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent
                    aria-describedby="dialog-description"
                    className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="flex flex-col items-center justify-center h-64">
                        <AlertTriangle className="w-12 h-12 text-red-500" />
                        <p className="mt-4 text-red-600 font-semibold">{error}</p>
                        <Button onClick={onClose} className="mt-4 bg-red-500 hover:bg-red-600 text-white">
                            Đóng
                        </Button>
                    </div>
                    <VisuallyHidden>
                        <DialogTitle>Loading student data</DialogTitle>
                    </VisuallyHidden>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                aria-describedby="dialog-description"
                className="min-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600
                        rounded-full flex items-center justify-center text-white text-xl font-bold">
                            {fetchedChild?.fullName.charAt(0).toUpperCase() || ""}
                        </div>
                        <div>
                            <DialogDescription
                                id="dialog-description"
                                className="text-red-600">
                                {fetchedChild?.className || ""} • Mã học sinh: {fetchedChild?.studentCode || ""}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="mt-6">
                    {/* Student Basic Info Card */}
                    <BasicInfo
                        dateOfBirth={fetchedChild?.dateOfBirth || new Date()}
                        className={fetchedChild?.className || "N/A"}
                        age={fetchedChild?.age || 0}
                        gender={fetchedChild?.gender || "Unknown"}
                    />

                    {/* Medical Profile Status */}
                    <Card className="mb-6 border-red-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Heart className="w-6 h-6 text-red-500" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Trạng thái hồ sơ y tế</h3>
                                        <p className="text-sm text-gray-600">Tình trạng hồ sơ sức khỏe của học sinh</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Badge
                                        className={
                                            fetchedChild?.hasMedicalProfile
                                                ? "bg-green-100 text-green-800 border-green-200"
                                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                        }
                                    >
                                        {fetchedChild?.hasMedicalProfile ? "Có hồ sơ y tế" : "Chưa có hồ sơ y tế"}
                                    </Badge>
                                    {!fetchedChild?.hasMedicalProfile && (
                                        <Button size="sm" className="bg-gradient-to-r from-red-500 to-red-600">
                                            Tạo hồ sơ y tế
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Medical Information Tabs */}
                    {fetchedChild?.hasMedicalProfile && (
                        <MedicalInfo
                            hasMedicalProfile={fetchedChild.hasMedicalProfile}
                        />
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                        <Button variant="outline" onClick={onClose}>
                            Đóng
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ViewChildProfile