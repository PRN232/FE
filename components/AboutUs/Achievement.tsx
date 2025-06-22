import React from 'react'
import { achievements } from "@/lib/data/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Achievement = () => {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-[url('/images/medical-pattern-light.svg')] bg-[length:300px_300px] opacity-[0.02]" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-50/10 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                {/* Section header with animated underline */}
                <div className="text-center mb-16 relative">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent inline-block">
                        Thành tựu của Chúng tôi
                    </h2>
                    <div className="mt-2 h-1 w-24 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent animate-[shimmer_2s_infinite]" />
                    </div>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Công nhận vì cam kết xuất sắc trong chăm sóc sức khỏe trường học.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {achievements.map((achievement, index) => (
                        <Card
                            key={index}
                            className="text-center border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group overflow-hidden relative bg-white"
                        >
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-50/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Subtle dot pattern */}
                            <div className="absolute inset-0 bg-[radial-gradient(#ef4444_0.5px,transparent_0.5px)] bg-[length:10px_10px] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

                            <CardHeader className="relative z-10 pt-8">
                                <div className="mx-auto relative w-fit">
                                    {/* Glowing icon effect */}
                                    <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-yellow-200 to-transparent blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                                    {/* Icon container with pulse animation on hover */}
                                    <div className="relative rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 w-fit mx-auto shadow-inner group-hover:shadow-md group-hover:shadow-yellow-100 transition-all duration-300">
                                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-yellow-100/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[pulse_3s_infinite] transition-opacity duration-300" />
                                        <achievement.icon className="h-8 w-8 text-yellow-600 group-hover:text-yellow-700 transition-colors duration-300" />
                                    </div>
                                </div>
                                <CardTitle className="text-lg mt-6 text-gray-900 group-hover:text-primary transition-colors duration-300">
                                    {achievement.title}
                                </CardTitle>
                                <Badge
                                    variant="outline"
                                    className="mt-3 bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-800 hover:bg-yellow-100 group-hover:shadow-sm group-hover:shadow-yellow-100/50 transition-all duration-300 border border-yellow-200"
                                >
                                    {achievement.year}
                                </Badge>
                            </CardHeader>
                            <CardContent className="relative z-10 pb-8">
                                <CardDescription className="text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                                    {achievement.description}
                                </CardDescription>

                                {/* Optional decorative elements */}
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="h-1 w-16 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full" />
                                </div>
                            </CardContent>

                            {/* Hover border effect */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Achievement