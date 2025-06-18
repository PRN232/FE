import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ContentProps {
    relatedPosts: {
        id: string
        title: string
        excerpt: string
        category: string
        readTime: string
        publishedAt: Date
    } []
}

const Content = ({ relatedPosts }: ContentProps) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Table of Contents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Link href="#why-screenings-matter" className="block text-sm hover:text-primary transition-colors">
                        Why Health Screenings Matter
                    </Link>
                    <Link href="#what-to-expect" className="block text-sm hover:text-primary transition-colors">
                        What to Expect During a Screening
                    </Link>
                    <Link href="#preparing-your-child" className="block text-sm hover:text-primary transition-colors">
                        Preparing Your Child
                    </Link>
                    <Link href="#understanding-results" className="block text-sm hover:text-primary transition-colors">
                        Understanding the Results
                    </Link>
                    <Link href="#role-of-parents" className="block text-sm hover:text-primary transition-colors">
                        The Role of Parents
                    </Link>
                    <Link href="#looking-forward" className="block text-sm hover:text-primary transition-colors">
                        Looking Forward
                    </Link>
                </CardContent>
            </Card>

            {/* Related Articles */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Related Articles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {relatedPosts.map(({ id, title, category, readTime }) => (
                        <Link key={id} href={`/blog/${id}`} className="block group">
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                                    {title}
                                </h4>
                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                    <Badge variant="outline" className="text-xs">
                                        {category}
                                    </Badge>
                                    <span>•</span>
                                    <span>{readTime}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Stay Updated</CardTitle>
                    <CardDescription>Get the latest health tips and articles delivered to your inbox.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full">Subscribe to Newsletter</Button>
                </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "Health Screening",
                            "Vaccination",
                            "Allergies",
                            "Mental Health",
                            "Nutrition",
                            "Emergency Care",
                        ].map((tag) => (
                            <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
export default Content
