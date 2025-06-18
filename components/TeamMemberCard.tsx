import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { teamMembers } from "@/lib/data/mock-data";

const TeamMemberGrid = () => {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
                <Card key={member.id} className="text-center">
                    <CardHeader>
                        <div className="mx-auto">
                            <Image
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                width={300}
                                height={300}
                                className="rounded-full mx-auto"
                            />
                        </div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <Badge variant="secondary" className="mx-auto w-fit">
                            {member.role}
                        </Badge>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm font-medium text-primary">{member.specialization}</p>
                        <p className="text-sm text-muted-foreground">{member.experience}</p>
                        <p className="text-sm">{member.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default TeamMemberGrid;