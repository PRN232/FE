import Link from "next/link"
import { ArrowRight, Shield, Users, Activity, FileText, Calendar, Stethoscope } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockBlogPosts } from "@/lib/data/mock-data"

const HomePage = () => {
        const features = [
        {
            icon: Shield,
            title: "Health Records Management",
            description: "Secure digital health records for all students including allergies, medical history, and vaccinations."
        },
        {
            icon: Users,
            title: "Parent Portal",
            description: "Easy-to-use portal for parents to manage their children's health information and medicine requests."
        },
        {
            icon: Activity,
            title: "Medical Incident Tracking",
            description: "Real-time tracking and management of medical incidents and emergencies in school."
        },
        {
            icon: Calendar,
            title: "Vaccination Management",
            description: "Streamlined vaccination campaigns with consent collection and monitoring."
        },
        {
            icon: Stethoscope,
            title: "Health Examinations",
            description: "Organized periodic health examinations with automated scheduling and reporting."
        },
        {
            icon: FileText,
            title: "Reports & Analytics",
            description: "Comprehensive reporting and analytics for health trends and compliance."
        }
    ]

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                            School Health Management System
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-blue-100">
                            Comprehensive digital solution for managing student health records, medical incidents,
                            vaccinations, and health examinations in educational institutions.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Button size="lg" variant="secondary">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Comprehensive Health Management Features
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Everything you need to manage student health in one integrated platform
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <Card key={index} className="relative overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <feature.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* School Information Section */}
            <section className="py-24 bg-muted/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                About Our School Health Program
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Our school is committed to providing the highest standard of health care for all students.
                                With state-of-the-art facilities and qualified medical professionals, we ensure every
                                child receives the care they need.
                            </p>
                            <div className="mt-8 space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Badge variant="secondary">Certified Medical Staff</Badge>
                                    <span className="text-sm text-muted-foreground">Licensed healthcare professionals</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Badge variant="secondary">24/7 Emergency Response</Badge>
                                    <span className="text-sm text-muted-foreground">Always ready for medical emergencies</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Badge variant="secondary">Digital Health Records</Badge>
                                    <span className="text-sm text-muted-foreground">Secure and accessible health information</span>
                                </div>
                            </div>
                            <div className="mt-8">
                                <Button asChild>
                                    <Link href="/about">
                                        Learn More About Our Program
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="/placeholder.svg?height=400&width=600"
                                alt="School Health Facility"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="py-24 bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Health Education & Resources
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Stay informed with the latest health tips and educational content
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {mockBlogPosts.map((post) => (
                            <Card key={post.id} className="overflow-hidden">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline">{post.category}</Badge>
                                        <span className="text-sm text-muted-foreground">
                      {post.publishedAt.toLocaleDateString()}
                    </span>
                                    </div>
                                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="line-clamp-3">
                                        {post.excerpt}
                                    </CardDescription>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">By {post.author}</span>
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

                    <div className="mt-12 text-center">
                        <Button asChild variant="outline" size="lg">
                            <Link href="/blog">
                                View All Articles
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary text-primary-foreground">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Ready to Get Started?
                        </h2>
                        <p className="mt-4 text-lg text-primary-foreground/80">
                            Join our school health management system and ensure the best care for your students.
                        </p>
                        <div className="mt-8 flex items-center justify-center gap-x-6">
                            <Button size="lg" variant="secondary">
                                Parent Portal
                            </Button>
                            <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                                Medical Staff Login
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage
