'use client'

import { stats } from "@/lib/data/mock-data"
import { Card } from "@/components/ui/card"

const Stat = () => {
    return (
        <section className="py-16 bg-muted/50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:60px_60px] opacity-5" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            className="text-center p-6 border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-background/80 backdrop-blur-sm stat-item"
                        >
                            <div className="text-4xl font-bold text-primary mb-2">
                                <span className="inline-block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                    {stat.number}
                                </span>
                            </div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                                {stat.label}
                            </div>
                            {/* Animated underline */}
                            <div className="mt-4 relative">
                                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-600 transition-all duration-500 group-hover:w-full group-hover:left-0"></div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Animation styles */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    )
}

export default Stat