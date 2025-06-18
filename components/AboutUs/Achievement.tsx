import React from 'react'
import {achievements} from "@/lib/data/mock-data";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

const Achievement = () => {
    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {achievements.map((achievement, index) => (
                <Card key={index} className="text-center">
                    <CardHeader>
                        <div className="mx-auto rounded-lg bg-yellow-100 p-3 w-fit">
                            <achievement.icon className="h-8 w-8 text-yellow-600" />
                        </div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <Badge variant="outline">{achievement.year}</Badge>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-base">{achievement.description}</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
export default Achievement
