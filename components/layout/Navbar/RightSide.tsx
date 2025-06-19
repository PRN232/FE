"use client";

import Link from "next/link";
import { Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { useAuth } from "@/lib/auth/auth-context";

interface RightSideProps {
    onLogin: () => void;
    onLogout: () => void;
}

const RightSide = ({ onLogin, onLogout }: RightSideProps) => {
    const { isAuthenticated, user } = useAuth();

    return (
        <>
            {isAuthenticated ? (
                <>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative rounded-full hover:bg-muted/50"
                            aria-label="Thông báo"
                        >
                            <Bell className="h-[1.2rem] w-[1.2rem]" />
                            <Badge
                                variant="destructive"
                                className="text-black absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                            >
                                3
                            </Badge>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-8 w-8 rounded-full focus-visible:ring-2 focus-visible:ring-ring"
                                    aria-label="Menu Người dùng"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.avatar || "/images/placeholder.svg"} alt="Hồ sơ Người dùng" />
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {user?.name
                                                ?.split(" ")
                                                .map((n) => n[0])
                                                .join("") || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56 bg-white/95 backdrop-blur-sm border border-border/50 shadow-lg"
                                align="start"
                                sideOffset={8}
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/profile"
                                        className="w-full cursor-pointer focus:bg-accent focus:text-accent-foreground"
                                    >
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Hồ sơ</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-destructive focus:text-destructive cursor-pointer"
                                    onClick={onLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Đăng xuất</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </>
            ) : (
                <Button onClick={onLogin} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Đăng nhập
                </Button>
            )}
        </>
    );
};

export default RightSide;