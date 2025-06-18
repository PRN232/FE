import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* About Section */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <h3 className="text-xl font-bold tracking-tight">HealthCare School</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Dedicated to providing comprehensive health management services for our school community.
                            Ensuring the well-being of every student through professional medical care and health education.
                        </p>
                        <div className="flex items-center space-x-4 pt-2">
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-base font-semibold tracking-tight">Quick Links</h4>
                        <ul className="space-y-2.5">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Health Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/documents"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Documents
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-base font-semibold tracking-tight">Contact Info</h4>
                        <div className="space-y-3">
                            <div className="flex items-start text-muted-foreground">
                                <Phone className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-sm">(555) 123-4567</span>
                            </div>
                            <div className="flex items-start text-muted-foreground">
                                <Mail className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-sm">health@school.edu</span>
                            </div>
                            <div className="flex items-start text-muted-foreground">
                                <MapPin className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-sm">123 School St, Education City</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} HealthCare School. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;