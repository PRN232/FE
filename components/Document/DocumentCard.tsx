import { ComponentType } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentCardProps {
    id: string
    title: string
    description: string
    category: string
    type: string
    size: string
    lastUpdated: Date
    icon: ComponentType<{ className?: string }>
    color: string
}

const DocumentCard = ({
                          id,
                          title,
                          description,
                          category,
                          type,
                          size,
                          lastUpdated,
                          icon: Icon,
                          color
                      }: DocumentCardProps) => {
    return (
        <Card
            key={id}
            className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-blue-200 group"
        >
            <CardHeader className="p-5 pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                        <div
                            className={`p-3 rounded-xl ${color} shadow-md flex items-center justify-center group-hover:shadow-lg group-hover:scale-105 transition-transform duration-300`}
                        >
                            <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <CardTitle className="text-lg font-semibold line-clamp-2 text-gray-800 group-hover:text-blue-700 transition-colors">
                                {title}
                            </CardTitle>
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="text-xs font-medium border-blue-200 bg-blue-50 text-blue-700"
                                >
                                    {category}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                    {type} • {size}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-5 pt-0">
                <CardDescription className="line-clamp-3 mb-5 text-gray-600">
                    {description}
                </CardDescription>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Updated {lastUpdated.toLocaleDateString()}</span>
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-700 transition-colors border border-gray-200 hover:border-blue-300"
                    >
                        <Download className="h-4 w-4 text-blue-600" />
                        <span className="text-blue-600 font-medium">Download</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default DocumentCard