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
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative rounded-full hover:bg-muted/50"
                            aria-label="Thông báo"
                        >
                            <Bell className="h-[1.75rem] w-[1.75rem]" />
                            <Badge
                                variant="destructive"
                                className="absolute text-black -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full p-0 text-sm font-medium"
                            >
                                3
                            </Badge>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-9 w-9 rounded-full focus-visible:ring-2 focus-visible:ring-ring"
                                    aria-label="Menu Người dùng"
                                >
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user?.avatar || "/images/placeholder.svg"} alt="Hồ sơ Người dùng" />
                                        <AvatarFallback className="bg-primary/10 text-primary text-base">
                                            {user?.name
                                                ?.split(" ")
                                                .map((n) => n[0])
                                                .join("") || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-60 bg-white/95 backdrop-blur-sm border border-border/50 shadow-lg"
                                align="start"
                                sideOffset={8}
                            >
                                <DropdownMenuLabel className="font-normal p-3">
                                    <div className="flex flex-col space-y-1.5">
                                        <p className="text-base font-medium leading-none">{user?.name}</p>
                                        <p className="text-sm leading-none text-muted-foreground">{user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className="px-3 py-2">
                                    <Link
                                        href="/profile"
                                        className="w-full cursor-pointer focus:bg-accent focus:text-accent-foreground text-base"
                                    >
                                        <User className="mr-3 h-5 w-5" />
                                        <span>Hồ sơ</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-destructive focus:text-destructive cursor-pointer px-3 py-2 text-base"
                                    onClick={onLogout}
                                >
                                    <LogOut className="mr-3 h-5 w-5" />
                                    <span>Đăng xuất</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </>
            ) : (
                <Button
                    onClick={onLogin}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-6 py-3"
                >
                    Đăng nhập
                </Button>
            )}
        </>
    );
};

export default RightSide;