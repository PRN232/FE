"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Pill } from "lucide-react"
import { useState } from "react"

interface AddMedicationDialogProps {
    isOpen: boolean
    onClose: () => void
    incidentId: number
    onAddMedication: (
        incidentId: number,
        medicationData: {
            medicationId: number,
            dosage: string
        }) => Promise<boolean>
}

const AddMedicine = ({
                         isOpen,
                         onClose,
                         incidentId,
                         onAddMedication
}: AddMedicationDialogProps) => {
    const [medicationId, setMedicationId] = useState("")
    const [dosage, setDosage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        if (!medicationId || !dosage) return

        setIsLoading(true)
        try {
            await onAddMedication(incidentId, {
                medicationId: parseInt(medicationId),
                dosage
            })
            onClose()
            setMedicationId("")
            setDosage("")
        } catch (error) {
            console.error("Error adding medication:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <Pill className="w-5 h-5 mr-2 text-red-500" />
                        Thêm thuốc cho sự cố
                    </DialogTitle>
                    <DialogDescription>
                        Nhập thông tin thuốc đã sử dụng cho học sinh
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="medicationId" className="text-right">
                            ID Thuốc
                        </Label>
                        <Input
                            id="medicationId"
                            type="number"
                            value={medicationId}
                            onChange={(e) => setMedicationId(e.target.value)}
                            className="col-span-3"
                            placeholder="Nhập ID thuốc"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dosage" className="text-right">
                            Liều dùng
                        </Label>
                        <Input
                            id="dosage"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                            className="col-span-3"
                            placeholder="Nhập liều dùng"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Hủy</Button>
                    </DialogClose>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading || !medicationId || !dosage}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Đang thêm...
                            </>
                        ) : (
                            "Thêm thuốc"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddMedicine