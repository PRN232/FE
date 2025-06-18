import React from 'react'
import {services} from "@/lib/data/mock-data";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const HealthService = () => {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
                <Card key={index} className="text-center">
                    <CardHeader>
                        <div className="mx-auto rounded-lg bg-primary/10 p-3 w-fit">
                            <service.icon className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
export default HealthService
