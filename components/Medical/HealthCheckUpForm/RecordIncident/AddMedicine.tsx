"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Loader2, Pill } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Medication, MedicationGiven } from "@/types";
import { showErrorAlert } from "@/lib/utils";
import {vi} from "date-fns/locale";

interface AddMedicationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    incidentId: number;
    medicationGiven?: MedicationGiven | null;
    allMedications: Medication[];
    onAddMedication: (
        incidentId: number,
        medicationData: {
            medicationId: number;
            dosage: string;
            giveAt: string;
        },
        medicationId?: number
    ) => Promise<boolean>;
}

const AddMedicine = ({
                         isOpen,
                         onClose,
                         incidentId,
                         medicationGiven,
                         allMedications,
                         onAddMedication
                     }: AddMedicationDialogProps) => {
    const [medicationId, setMedicationId] = useState<string>("");
    const [dosage, setDosage] = useState("");
    const [giveAt, setGiveAt] = useState<Date>(new Date());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (medicationGiven && isOpen) {
            setMedicationId(medicationGiven.medicationId.toString());
            setDosage(medicationGiven.dosage);
            setGiveAt(new Date(medicationGiven.giveAt));
        } else {
            setMedicationId("");
            setDosage("");
            setGiveAt(new Date());
        }
    }, [medicationGiven, isOpen]);

    const handleSubmit = async () => {
        if (!medicationId || !dosage) {
            await showErrorAlert("Vui lòng chọn thuốc và nhập liều dùng.");
            return;
        }

        setIsLoading(true);
        try {
            const success = await onAddMedication(
                incidentId,
                {
                    medicationId: parseInt(medicationId),
                    dosage,
                    giveAt: giveAt.toISOString()
                },
                medicationGiven?.id
            );
            if (success) {
                onClose();
                setMedicationId("");
                setDosage("");
                setGiveAt(new Date());
            }
        } catch (error) {
            await showErrorAlert("Đã xảy ra lỗi khi thêm/cập nhật thuốc.");
            console.error("Error processing medication:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white sm:max-w-[500px] rounded-lg shadow-xl border-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600" />
                <DialogHeader className="pt-4">
                    <div className="flex items-center">
                        <div className="p-2 mr-3 rounded-lg bg-red-100 text-red-600">
                            <Pill className="w-5 h-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-gray-800">
                                {medicationGiven ? "Cập nhật thuốc" : "Thêm thuốc cho sự cố"}
                            </DialogTitle>
                            <DialogDescription className="text-gray-500">
                                {medicationGiven
                                    ? "Chỉnh sửa thông tin thuốc đã sử dụng"
                                    : "Nhập thông tin thuốc đã sử dụng cho học sinh"}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className="grid gap-5 py-4 px-1">
                    <div className="space-y-1">
                        <Label htmlFor="medicationId" className="text-gray-700 font-medium">
                            Thuốc *
                        </Label>
                        <Select
                            value={medicationId}
                            onValueChange={setMedicationId}
                            disabled={isLoading || allMedications.length === 0}
                        >
                            <SelectTrigger className="border-gray-300 focus:border-red-300 focus:ring-red-200">
                                <SelectValue
                                    placeholder={
                                        allMedications.length === 0
                                            ? "Không có thuốc nào"
                                            : "Chọn thuốc"
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {allMedications.map((medication) => (
                                    <SelectItem
                                        key={medication.id}
                                        value={medication.id.toString()}
                                    >
                                        {medication.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="dosage" className="text-gray-700 font-medium">
                            Liều dùng *
                        </Label>
                        <Input
                            id="dosage"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                            className="mt-1 border-gray-300 focus:border-red-300 focus:ring-red-200"
                            placeholder="Nhập liều dùng"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-gray-700 font-medium">
                            Thời gian cho thuốc *
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full mt-1 justify-start text-left font-normal border-gray-300 hover:bg-red-50 hover:text-red-600",
                                        !giveAt && "text-gray-400"
                                    )}
                                    disabled={isLoading}
                                >
                                    {giveAt ? (
                                        format(giveAt, "PPPp")
                                    ) : (
                                        <span>Chọn ngày và giờ</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 border-gray-200 shadow-lg rounded-lg bg-white">
                                <Calendar
                                    mode="single"
                                    selected={giveAt}
                                    onSelect={(date) => date && setGiveAt(date)}
                                    autoFocus={true}
                                    locale={vi}
                                    className="border-0"
                                    disabled={isLoading}
                                />
                                <div className="p-3 border-t border-gray-200">
                                    <Input
                                        type="time"
                                        value={giveAt ? format(giveAt, "HH:mm") : ""}
                                        onChange={(e) => {
                                            const [hours, minutes] = e.target.value.split(":");
                                            const newDate = new Date(giveAt);
                                            newDate.setHours(parseInt(hours || "0", 10));
                                            newDate.setMinutes(parseInt(minutes || "0", 10));
                                            setGiveAt(newDate);
                                        }}
                                        className="w-full border-gray-300 focus:border-red-300 focus:ring-red-200"
                                        disabled={isLoading}
                                    />
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter className="pt-2">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-100"
                            disabled={isLoading}
                        >
                            Hủy
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading || !medicationId || !dosage}
                        className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                {medicationGiven ? "Đang cập nhật..." : "Đang thêm..."}
                            </>
                        ) : (
                            medicationGiven ? "Cập nhật thuốc" : "Thêm thuốc"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddMedicine;