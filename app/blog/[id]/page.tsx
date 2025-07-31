import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Share2,
    Bookmark,
    Heart,
    ChevronRight,
    Tag,
    Eye,
} from "lucide-react"
import { getBlogPostById } from "@/lib/service/Blog"
import Content from "@/components/Blog/BlogDetail/Content";

interface BlogDetailPageProps {
    params: Promise<{ id: string }>
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
    const {id} = await params;
    const post = getBlogPostById(id)

    if (!post) {
        notFound()
    }

    return (
        <div className="flex-1">
            {/* Header */}
            <div className="border-b bg-muted/30">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                    </Link>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{post.category}</Badge>
                            <span className="text-sm text-muted-foreground">•</span>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{post.readTime}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">•</span>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Eye className="h-3 w-3" />
                                <span>{post.views.toLocaleString()} views</span>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{post.title}</h1>

                        <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarFallback>
                                        {post.author
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{post.author}</p>
                                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                        <Calendar className="h-3 w-3" />
                                        <span>{post.publishedAt.toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                    <Heart className="h-4 w-4 mr-2" />
                                    {post.likes}
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Bookmark className="h-4 w-4 mr-2" />
                                    {post.bookmarks}
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Article Content */}
                    <div className="lg:col-span-3">
                        {/* Featured Image */}
                        <div className="mb-8">
                            <Image
                                src={"null"}
                                alt={post.title}
                                width={800}
                                height={400}
                                className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
                                priority
                            />
                        </div>

                        {/* Article Body */}
                        <div className="prose prose-lg max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>

                        {/* Tags */}
                        <div className="mt-8 pt-6 border-t">
                            <div className="flex items-center space-x-2 mb-4">
                                <Tag className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium text-muted-foreground">Tags:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Author Bio */}
                        <div className="mt-8 pt-6 border-t">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarFallback className="text-lg">
                                                {post.author
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">{post.author}</h3>
                                            <p className="text-sm text-muted-foreground mb-3">Chief Medical Officer at HealthCare School</p>
                                            <p className="text-sm leading-relaxed">
                                                Dr. Sarah Johnson is a board-certified pediatrician with over 15 years of experience in school
                                                health programs. She specializes in preventive care and has been instrumental in developing
                                                comprehensive health screening protocols for educational institutions.
                                            </p>
                                            <div className="flex items-center space-x-2 mt-4">
                                                <Button variant="outline" size="sm">
                                                    <User className="h-4 w-4 mr-2" />
                                                    View Profile
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    More Articles
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Table of Contents */}
                            <Content {...post} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Articles Section */}
            <div className="border-t bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold tracking-tight">You Might Also Like</h2>
                        <p className="mt-2 text-muted-foreground">More articles on school health and student wellness</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {post.relatedPosts.map((relatedPost) => (
                            <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="aspect-video bg-muted">
                                    <Image
                                        src={"null"}
                                        alt={relatedPost.title}
                                        width={400}
                                        height={200}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-2">
                                        <Badge variant="outline">{relatedPost.category}</Badge>
                                        <span className="text-xs text-muted-foreground">{relatedPost.readTime}</span>
                                    </div>
                                    <CardTitle className="line-clamp-2">{relatedPost.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="line-clamp-3 mb-4">{relatedPost.excerpt}</CardDescription>
                                    <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
                                        <Link href={`/blog/${relatedPost.id}`} className="flex items-center">
                                            Read More
                                            <ChevronRight className="ml-1 h-3 w-3" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Button variant="outline" size="lg" asChild>
                            <Link href="/blog">
                                View All Articles
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetailPage