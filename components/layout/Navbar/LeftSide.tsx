"use client"

import { useState, useEffect } from "react";
import {
    ComponentPropsWithoutRef,
    ComponentType
} from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {Users, FileText, BookOpen } from "lucide-react";
import {
    medicalFeatures,
    parentFeatures
} from "@/lib/data/mock-data";

function ListItem({
                      title,
                      children,
                      href,
                      icon: Icon,
                      ...props
}: ComponentPropsWithoutRef<"li"> & {
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
                        <div className="text-md font-medium leading-none">{title}</div>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}

const LeftSide = ({ user }: {
    user: { role: string } | null
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const isAuthenticated = localStorage.getItem('token');
    const isParent = user?.role === "parent";

    return (
        <div className="flex items-center">
            <div className="flex-shrink-0">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary tracking-tight">
                        HealthCare School
                    </span>
                </Link>
            </div>

            <div className="hidden md:ml-10 md:block">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                asChild
                                className={navigationMenuTriggerStyle()}
                            >
                                <Link href="/" className="text-xl">Trang chủ</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        {isAuthenticated ? (
                            isParent ? (
                                <>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                            <Link href="/notification" className="text-xl">
                                                Thông báo
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="text-lg">Phụ huynh</NavigationMenuTrigger>
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
                                </>
                            ) : (
                                <>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                            <Link href="/medical-staff/student" className="text-xl">
                                                Học Sinh
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="text-lg">Nhân viên Y tế</NavigationMenuTrigger>
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
                                </>
                            )
                        ) : null}

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="text-lg">Tài nguyên</NavigationMenuTrigger>
                            <NavigationMenuContent className="bg-white/95 backdrop-blur-sm border border-border/50 shadow-lg">
                                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                                    <ListItem href="/blog" title="Blog Sức khỏe" icon={BookOpen}>
                                        Bài viết mới nhất về sức khỏe và sự phát triển của học sinh.
                                    </ListItem>
                                    <ListItem href="/document" title="Tài liệu" icon={FileText}>
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
    );
};
export default LeftSide