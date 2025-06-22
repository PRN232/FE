"use client"

import { services } from "@/lib/data/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const HealthService = () => {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-[url('/images/medical-pattern.svg')] bg-[length:300px_300px] opacity-[0.02]" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                {/* Section header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                        Dịch vụ Sức khỏe của Chúng tôi
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Các dịch vụ chăm sóc sức khỏe toàn diện được thiết kế đặc biệt cho môi trường trường học.
                    </p>
                </div>

                {/* Services grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            className="text-center border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group overflow-hidden"
                        >
                            <CardHeader className="relative z-10">
                                <div className="mx-auto rounded-xl bg-primary/10 p-4 w-fit group-hover:bg-primary/20 transition-colors duration-300">
                                    <service.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <CardTitle className="text-xl mt-4 text-gray-900 group-hover:text-primary transition-colors duration-300">
                                    {service.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <CardDescription className="text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                                    {service.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HealthService