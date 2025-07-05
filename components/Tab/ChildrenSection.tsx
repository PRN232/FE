import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChildDTO } from "@/lib/service/parent/IParent";
import { getChildrenByParentId } from "@/lib/service/parent/parent";
import ViewChildProfile from "@/components/Tab/ViewChildProfile";

interface ChildrenSectionProps {
    user: { id: string | number } | null | undefined;
}

const ChildrenSection = ({
                             user
                         }: ChildrenSectionProps) => {
    const [childrenData, setChildrenData] = useState<ChildDTO[]>([]);
    const [childrenLoading, setChildrenLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

    useEffect(() => {
        const loadChildrenData = async () => {
            if (user?.id) {
                try {
                    setChildrenLoading(true);
                    const childrenResponse = await getChildrenByParentId(Number(user.id));

                    if (childrenResponse.success && childrenResponse.children) {
                        const mappedChildren = childrenResponse.children.map((user) => ({
                            id: Number(user.id),
                            studentCode: `ST${user.id}`,
                            fullName: user.fullName || "",
                            dateOfBirth: user.dateOfBirth || new Date(),
                            age: user.age,
                            gender: user.gender || "Unknown",
                            className: user.className || "N/A",
                            parentId: Number(user.id),
                            parentName: null,
                            parentPhone: null,
                            hasMedicalProfile: false,
                        }));
                        setChildrenData(mappedChildren);
                    }
                } catch (error) {
                    setFetchError("Failed to load user data");
                    console.error(error);
                } finally {
                    setChildrenLoading(false);
                }
            }
        };

        (async () => {
            await loadChildrenData();
        })();
    }, [user?.id]);

    if (fetchError) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Thông tin con em</CardTitle>
                    <CardDescription>Danh sách các con của bạn trong hệ thống</CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{fetchError}</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    const handleViewProfile = (id: number) => {
        setSelectedChildId(id);
        setIsProfileOpen(true);
    };

    const handleCloseProfile = () => {
        setIsProfileOpen(false);
        setSelectedChildId(null);
    };

    return (
        <>
            {!childrenLoading && childrenData.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Thông tin con em</h3>
                        <p className="text-sm text-gray-600">Danh sách các con của bạn trong hệ thống</p>
                    </div>

                    <div className="grid gap-4">
                        {childrenData.map((child) => (
                            <div
                                key={child.id}
                                className="relative p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-red-50 to-white hover:shadow-md transition-all duration-200"
                            >
                                {/* Gradient accent */}
                                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-500 to-red-600 rounded-l-lg" />

                                <div className="pl-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                    {child.fullName.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{child.fullName}</h4>
                                                    <p className="text-sm text-gray-600">Mã học sinh: {child.studentCode}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tuổi</p>
                                                    <p className="text-sm font-semibold text-gray-900">{child.age} tuổi</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Giới tính</p>
                                                    <p className="text-sm font-semibold text-gray-900">{child.gender}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Lớp</p>
                                                    <p className="text-sm font-semibold text-gray-900">{child.className}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Ngày sinh</p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {new Date(child.dateOfBirth).toLocaleDateString("vi-VN")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end space-y-2">
                                            <div
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    child.hasMedicalProfile
                                                        ? "bg-green-100 text-green-800 border border-green-200"
                                                        : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                                }`}
                                            >
                                                {child.hasMedicalProfile ? "Có hồ sơ y tế" : "Chưa có hồ sơ y tế"}
                                            </div>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 bg-transparent"
                                                onClick={() => handleViewProfile(child.id)}
                                            >
                                                Xem hồ sơ
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {childrenLoading && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Thông tin con em</h3>
                    </div>
                    <div className="flex justify-center items-center h-32">
                        <Loader2 className="h-6 w-6 animate-spin text-red-500" />
                        <span className="ml-2 text-gray-600">Đang tải thông tin con em...</span>
                    </div>
                </div>
            )}

            <ViewChildProfile
                isOpen={isProfileOpen}
                onClose={handleCloseProfile}
                childId={selectedChildId}
            />
        </>
    );
};

export default ChildrenSection