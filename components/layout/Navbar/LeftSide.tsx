import {ComponentPropsWithoutRef, ComponentType} from "react";
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

import { medicalFeatures, parentFeatures } from "@/lib/data/mock-data";

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

const LeftSide = () => {
    return (
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
    )
}
export default LeftSide
