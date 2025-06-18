import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, ArrowRight } from "lucide-react"
import { mockBlogPosts } from "@/lib/data/mock-data"
import Image from "next/image";

const categories = [
    "All",
    "Health Screening",
    "Allergies",
    "Vaccination",
    "Nutrition",
    "Mental Health",
    "Emergency Care",
]

export default function BlogPage() {
    return (
        <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Health Education Blog</h2>
                    <p className="text-muted-foreground">Expert advice and resources for school health management</p>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search articles..." className="pl-10" />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={category === "All" ? "default" : "outline"}
                            size="sm"
                            className="whitespace-nowrap"
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Featured Article */}
            <Card className="overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3">
                        <Image
                            src="/placeholder.svg?height=300&width=400"
                            alt="Featured article"
                            className="h-48 w-full object-cover md:h-full"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="p-6 md:w-2/3">
                        <div className="flex items-center space-x-2 mb-2">
                            <Badge>Featured</Badge>
                            <Badge variant="outline">Health Screening</Badge>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Comprehensive Guide to School Health Screenings</h3>
                        <p className="text-muted-foreground mb-4">
                            Everything parents and educators need to know about annual health screenings, including preparation tips,
                            what to expect, and how to interpret results.
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                    <User className="h-4 w-4" />
                                    <span>Dr. Sarah Johnson</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>September 20, 2023</span>
                                </div>
                            </div>
                            <Button>
                                Read Article
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Blog Posts Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockBlogPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-video bg-muted">
                            <Image
                                src="/placeholder.svg?height=200&width=300"
                                alt={post.title}
                                className="h-full w-full object-cover"
                                width={300}
                                height={300}
                            />
                        </div>
                        <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline">{post.category}</Badge>
                                <span className="text-xs text-muted-foreground">{post.publishedAt.toLocaleDateString()}</span>
                            </div>
                            <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="line-clamp-3 mb-4">{post.excerpt}</CardDescription>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                    <User className="h-3 w-3" />
                                    <span>{post.author}</span>
                                </div>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/blog/${post.id}`}>
                                        Read More
                                        <ArrowRight className="ml-1 h-3 w-3" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Load More */}
            <div className="text-center">
                <Button variant="outline" size="lg">
                    Load More Articles
                </Button>
            </div>
        </div>
    )
}
