"use client";

import { ComponentType, ComponentPropsWithoutRef } from "react";

import Link from "next/link";
import { Bell, User, LogOut, Users, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { medicalFeatures, parentFeatures } from "@/lib/data/mock-data";
import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";

function ListItem({ title, children, href, icon: Icon, ...props }: ComponentPropsWithoutRef<"li"> & {
    href: string;
    icon?: ComponentType<{ className?: string }>;
}) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-900 focus:bg-blue-50 focus:text-blue-900 bg-white/80"
                >
                    <div className="flex items-center gap-2">
                        {Icon && <Icon className="h-4 w-4" />}
                        <div className="text-sm font-medium leading-none">{title}</div>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const router = useRouter();

    const handleLogin = () => {
        router.push("/login");
    };

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="container px-4 sm:px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Bên trái - Logo và Điều hướng */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center gap-2">
                                <span className="text-xl font-bold text-primary">HealthCare School</span>
                            </Link>
                        </div>

                        <div className="hidden md:ml-8 md:block">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                            <Link href="/">Trang chủ</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                            <Link href="/dashboard">Dashboard</Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Phụ huynh</NavigationMenuTrigger>
                                        <NavigationMenuContent className="bg-white/95 backdrop-blur-sm border border-border/50 shadow-lg">
                                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                {parentFeatures.map((feature) => (
                                                    <ListItem key={feature.title} title={feature.title} href={feature.href} icon={feature.icon}>
                                                        {feature.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Nhân viên Y tế</NavigationMenuTrigger>
                                        <NavigationMenuContent className="bg-white/95 backdrop-blur-sm border border-border/50 shadow-lg">
                                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                {medicalFeatures.map((feature) => (
                                                    <ListItem key={feature.title} title={feature.title} href={feature.href} icon={feature.icon}>
                                                        {feature.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Tài nguyên</NavigationMenuTrigger>
                                        <NavigationMenuContent className="bg-white/95 backdrop-blur-sm border border-border/50 shadow-lg">
                                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                                <li className="row-span-3">
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-50 to-blue-100 p-6 no-underline outline-none focus:shadow-md border border-blue-200"
                                                            href="/blog"
                                                        >
                                                            <BookOpen className="h-6 w-6" />
                                                            <div className="mb-2 mt-4 text-lg font-medium text-blue-900">Giáo dục Sức khỏe</div>
                                                            <p className="text-sm leading-tight text-blue-700">
                                                                Lời khuyên và tài nguyên chuyên gia về quản lý sức khỏe trường học.
                                                            </p>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                                <ListItem href="/blog" title="Blog Sức khỏe" icon={BookOpen}>
                                                    Bài viết mới nhất về sức khỏe và sự phát triển của học sinh.
                                                </ListItem>
                                                <ListItem href="/documents" title="Tài liệu" icon={FileText}>
                                                    Mẫu đơn sức khỏe, hướng dẫn và tài liệu quan trọng.
                                                </ListItem>
                                                <ListItem href="/about" title="Về Chúng tôi" icon={Users}>
                                                    Tìm hiểu về chương trình sức khỏe trường học của chúng tôi.
                                                </ListItem>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>

                    {/* Bên phải - Điều khiển Người dùng */}
                    <div className="flex items-center gap-2">
                        {isAuthenticated ? (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative rounded-full hover:bg-muted/50"
                                    aria-label="Thông báo"
                                >
                                    <Bell className="h-[1.2rem] w-[1.2rem]" />
                                    <Badge
                                        variant="destructive"
                                        className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
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
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Đăng xuất</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <Button onClick={handleLogin} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                Đăng nhập
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;