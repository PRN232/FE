import About from "@/components/layout/Footer/About";
import Links from "@/components/layout/Footer/Links";
import ContactInfo from "@/components/layout/Footer/ContactInfo";
import Copyright from "@/components/layout/Footer/Copyright";


const Footer = () => {
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* About Section */}
                    <About />

                    {/* Quick Links */}
                    <Links />

                    {/* Contact Info */}
                    <ContactInfo />
                </div>

                {/* Copyright */}
                <Copyright />
            </div>
        </footer>
    )
}

export default Footer;