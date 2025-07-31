"use client";

import Link from "next/link"
import { User, LogOut } from "lucide-react"
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
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth/auth-context"

interface RightSideProps {
    onLogin: () => void;
    onLogout: () => void;
}

const RightSide = ({
                       onLogin, onLogout
}: RightSideProps) => {
    const { isAuthenticated, user } = useAuth();

    return (
        <>
            {isAuthenticated ? (
                <div className="flex items-center gap-4">
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