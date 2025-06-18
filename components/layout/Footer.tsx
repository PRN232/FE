import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-muted/50 border-t">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-lg font-semibold mb-4">HealthCare School</h3>
                        <p className="text-muted-foreground mb-4">
                            Dedicated to providing comprehensive health management services for our school community.
                            Ensuring the well-being of every student through professional medical care and health education.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                            <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Health Blog</Link></li>
                            <li><Link href="/documents" className="text-muted-foreground hover:text-primary">Documents</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Contact Info</h4>
                        <div className="space-y-2">
                            <div className="flex items-center text-muted-foreground">
                                <Phone className="h-4 w-4 mr-2" />
                                <span>(555) 123-4567</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <Mail className="h-4 w-4 mr-2" />
                                <span>health@school.edu</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>123 School St, Education City</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
                    <p>&copy; 2023 HealthCare School. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
