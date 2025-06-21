import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const Credentials = () => {
    return (
        <Card className="bg-muted/50 border-0 shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Demo Credentials</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1 text-gray-600">
                <div className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                    <strong>Email:</strong> any valid email
                </div>
                <div className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                    <strong>Password:</strong> any password (6+ characters)
                </div>
            </CardContent>
        </Card>
    )
}
export default Credentials
