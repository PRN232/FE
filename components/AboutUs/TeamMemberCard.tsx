import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { teamMembers } from "@/lib/data/mock-data";

const TeamMemberGrid = () => {
    return (
        <section className="py-24 bg-muted/50 relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-[url('/images/medical-pattern.svg')] bg-[length:300px_300px] opacity-[0.03] animate-[pulse_20s_linear_infinite]" />

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-50/10 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                {/* Section header with animated underline */}
                <div className="text-center mb-16 relative">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent inline-block">
                        Gặp gỡ Đội ngũ Y tế của Chúng tôi
                    </h2>
                    <div className="mt-2 h-1 w-24 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent animate-[shimmer_2s_infinite]" />
                    </div>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Các chuyên gia chăm sóc sức khỏe giàu kinh nghiệm dành cho sức khỏe học sinh.
                    </p>
                </div>

                {/* Team grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {teamMembers.map((member) => (
                        <Card
                            key={member.id}
                            className="text-center border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group overflow-hidden relative bg-white"
                        >
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-50/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Subtle dot pattern */}
                            <div className="absolute inset-0 bg-[radial-gradient(#ef4444_0.5px,transparent_0.5px)] bg-[length:10px_10px] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

                            <CardHeader className="relative z-10 pt-8">
                                <div className="mx-auto relative w-fit">
                                    {/* Glowing avatar effect */}
                                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-red-200 to-transparent blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                                    {/* Avatar container with pulse animation on hover */}
                                    <div className="relative rounded-full p-1 transition-all duration-500 group-hover:scale-105">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-100/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[pulse_3s_infinite] transition-opacity duration-300" />
                                        <Image
                                            src={member.image || "/placeholder.svg"}
                                            alt={member.name}
                                            width={300}
                                            height={300}
                                            className="rounded-full mx-auto w-40 h-40 object-cover border-4 border-white shadow-lg group-hover:border-red-100 transition-all duration-300"
                                        />
                                    </div>
                                </div>
                                <CardTitle className="text-xl mt-6 text-gray-900 group-hover:text-primary transition-colors duration-300 font-semibold">
                                    {member.name}
                                </CardTitle>
                                <Badge
                                    variant="secondary"
                                    className="mx-auto w-fit mt-3 bg-gradient-to-r from-red-50 to-orange-50 text-primary hover:bg-primary/20 group-hover:shadow-md group-hover:shadow-red-100/50 transition-all duration-300 border border-red-100"
                                >
                                    {member.role}
                                </Badge>
                            </CardHeader>
                            <CardContent className="relative z-10 space-y-3 pb-8">
                                <p className="text-sm font-medium bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent group-hover:animate-[pulse_2s_infinite]">
                                    {member.specialization}
                                </p>
                                <p className="text-sm text-muted-foreground group-hover:text-gray-600 transition-colors duration-300">
                                    {member.experience}
                                </p>
                                <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                                    {member.description}
                                </p>

                                {/* Social links (optional) */}
                                <div className="flex justify-center space-x-3 mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <button className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                        </svg>
                                    </button>
                                    <button className="p-2 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                                        </svg>
                                    </button>
                                    <button className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                        </svg>
                                    </button>
                                </div>
                            </CardContent>

                            {/* Hover border effect */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamMemberGrid;