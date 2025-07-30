"use client";

import Link from "next/link"
import {
    Bell,
    User,
    LogOut,
    Calendar,
    Clock,
    MapPin,
    Stethoscope,
    Syringe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn, getPriorityColor } from "@/lib/utils"
import { useAuth } from "@/lib/auth/auth-context"

interface RightSideProps {
    onLogin: () => void;
    onLogout: () => void;
}

interface NotificationItem {
    id: string
    title: string
    description: string
    date: string
    time: string
    location: string
    type: "examination" | "vaccination"
    priority: "high" | "medium" | "low"
    isRead: boolean
}

const mockNotifications: NotificationItem[] = [
    {
        id: "notif-1",
        title: "Khám sức khỏe định kỳ học kỳ I",
        description: "Khám sức khỏe tổng quát cho tất cả học sinh từ lớp 1 đến lớp 12",
        date: "2024-02-15",
        time: "08:00 - 16:00",
        location: "Phòng y tế trường học",
        type: "examination",
        priority: "high",
        isRead: false,
    },
    {
        id: "notif-2",
        title: "Tiêm vaccine COVID-19 mũi bổ sung",
        description: "Tiêm vaccine COVID-19 mũi bổ sung cho học sinh từ 12 tuổi trở lên",
        date: "2024-02-18",
        time: "08:00 - 15:00",
        location: "Sân trường - Khu A",
        type: "vaccination",
        priority: "high",
        isRead: false,
    },
    {
        id: "notif-3",
        title: "Khám chuyên khoa mắt",
        description: "Khám chuyên sâu về mắt cho học sinh có vấn đề về thị lực",
        date: "2024-02-20",
        time: "09:00 - 12:00",
        location: "Bệnh viện Mắt Trung ương",
        type: "examination",
        priority: "medium",
        isRead: true,
    },
]

const RightSide = ({
                       onLogin, onLogout
}: RightSideProps) => {
    const { isAuthenticated, user } = useAuth();
    const unreadCount = mockNotifications.filter((notif) => !notif.isRead).length

    return (
        <>
            {isAuthenticated ? (
                <div className="flex items-center gap-4">
                    {/* Notification Bell with Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "relative rounded-full hover:bg-muted/50 transition-all",
                                    "group transform hover:-translate-y-0.5 active:translate-y-0",
                                )}
                                aria-label="Thông báo"
                            >
                                <Bell className="h-[1.75rem] w-[1.75rem] transition-transform group-hover:scale-110" />
                                {unreadCount > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className={cn(
                                            "absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full p-0",
                                            "text-xs font-semibold shadow-sm animate-pulse",
                                            "bg-red-500 text-white border-2 border-background",
                                        )}
                                    >
                                        {unreadCount}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className={cn(
                                "w-96 rounded-lg p-0 shadow-xl",
                                "bg-white/95 backdrop-blur-md border border-border/50",
                                "animate-in zoom-in-95 fade-in-0",
                            )}
                            align="end"
                            sideOffset={8}
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-t-lg">
                                <DropdownMenuLabel className="p-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">Thông báo</h3>
                                        <Badge className="bg-white/20 text-white border-white/30">{unreadCount} mới</Badge>
                                    </div>
                                </DropdownMenuLabel>
                            </div>

                            {/* Notifications List */}
                            <div className="max-h-96 overflow-y-auto">
                                {mockNotifications.length > 0 ? (
                                    mockNotifications.map((notification, index) => {
                                        const Icon = notification.type === "examination" ? Stethoscope : Syringe

                                        return (
                                            <div key={notification.id}>
                                                <DropdownMenuItem className="p-0 focus:bg-transparent">
                                                    <div
                                                        className={cn(
                                                            "w-full p-4 hover:bg-gray-50 transition-colors cursor-pointer",
                                                            !notification.isRead && "bg-blue-50/50 border-l-4 border-l-red-500",
                                                        )}
                                                    >
                                                        <div className="flex items-start space-x-3">
                                                            <div
                                                                className={cn(
                                                                    "p-2 rounded-full",
                                                                    notification.type === "examination"
                                                                        ? "bg-blue-100 text-blue-600"
                                                                        : "bg-green-100 text-green-600",
                                                                )}
                                                            >
                                                                <Icon className="w-4 h-4" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-start justify-between mb-1">
                                                                    <h4
                                                                        className={cn(
                                                                            "text-sm font-medium text-gray-900 truncate",
                                                                            !notification.isRead && "font-semibold",
                                                                        )}
                                                                    >
                                                                        {notification.title}
                                                                    </h4>
                                                                    <Badge
                                                                        className={`${getPriorityColor(notification.priority)} text-xs ml-2 flex-shrink-0`}
                                                                    >
                                                                        {notification.priority === "high"
                                                                            ? "Cao"
                                                                            : notification.priority === "medium"
                                                                                ? "TB"
                                                                                : "Thấp"}
                                                                    </Badge>
                                                                </div>
                                                                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{notification.description}</p>
                                                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                                    <div className="flex items-center space-x-1">
                                                                        <Calendar className="w-3 h-3" />
                                                                        <span>{new Date(notification.date).toLocaleDateString("vi-VN")}</span>
                                                                    </div>
                                                                    <div className="flex items-center space-x-1">
                                                                        <Clock className="w-3 h-3" />
                                                                        <span>{notification.time}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                                                                    <MapPin className="w-3 h-3" />
                                                                    <span className="truncate">{notification.location}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </DropdownMenuItem>
                                                {index < mockNotifications.length - 1 && (
                                                    <DropdownMenuSeparator className="bg-border/30 my-0" />
                                                )}
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="p-6 text-center text-gray-500">
                                        <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                        <p className="text-sm">Không có thông báo nào</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {mockNotifications.length > 0 && (
                                <>
                                    <DropdownMenuSeparator className="bg-border/50" />
                                    <div className="p-3">
                                        <Link href="/parents/notification">
                                            <Button
                                                variant="ghost"
                                                className="w-full text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                Xem tất cả thông báo
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Avatar Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "relative h-10 w-10 rounded-full p-0",
                                    "transition-all duration-200 hover:scale-105",
                                    "ring-offset-background focus-visible:outline-none focus-visible:ring-2",
                                    "focus-visible:ring-ring focus-visible:ring-offset-2",
                                )}
                                aria-label="Menu Người dùng"
                            >
                                <Avatar className="h-10 w-10 border-2 border-primary/10">
                                    <AvatarImage
                                        src={user?.avatar || "/images/placeholder.svg"}
                                        alt="Hồ sơ Người dùng"
                                        className="object-cover"
                                    />
                                    <AvatarFallback
                                        delayMs={600}
                                        className={cn(
                                            "bg-gradient-to-br from-primary/10 to-primary/20",
                                            "text-primary font-medium text-lg",
                                        )}
                                    >
                                        {user?.name
                                            ?.split(" ")
                                            .map((n) => n[0])
                                            .join("") || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className={cn(
                                "w-64 rounded-lg p-1.5 shadow-xl",
                                "bg-white/95 backdrop-blur-md border border-border/50",
                                "animate-in zoom-in-95 fade-in-0",
                            )}
                            align="end"
                            sideOffset={8}
                        >
                            <DropdownMenuLabel className="px-3 py-3">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-base font-semibold leading-none">{user?.name}</p>
                                    <p className="text-sm leading-none text-muted-foreground truncate">{user?.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-border/50" />
                            <DropdownMenuItem asChild className="px-3 py-2.5">
                                <Link
                                    href="/profile"
                                    className="w-full flex items-center focus:bg-accent/50 focus:text-accent-foreground"
                                >
                                    <User className="mr-3 h-5 w-5 text-muted-foreground" />
                                    <span className="text-base">Hồ sơ</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-border/50" />
                            <DropdownMenuItem
                                className={cn(
                                    "px-3 py-2.5 text-base focus:bg-destructive/10",
                                    "focus:text-destructive text-destructive",
                                )}
                                onClick={onLogout}
                            >
                                <LogOut className="mr-3 h-5 w-5" />
                                <span>Đăng xuất</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : (
                <Button
                    variant="default"
                    onClick={onLogin}
                    className={cn(
                        "relative overflow-hidden px-6 py-3 text-base font-medium",
                        "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground",
                        "shadow-lg hover:shadow-primary/30 transition-all duration-300",
                        "hover:scale-[1.03] active:scale-95",
                        "focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2",
                        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/20 after:to-transparent",
                        "after:opacity-0 hover:after:opacity-100 after:transition-opacity"
                    )}
                >
                    Đăng nhập
                </Button>
            )}
        </>
    );
};

export default RightSide;