import Hero from "@/components/HomePage/Hero";
import Feature from "@/components/HomePage/Feature";
import Information from "@/components/HomePage/Information";
import Blog from "@/components/HomePage/Blog";
import Cta from "@/components/HomePage/CTA";

const HomePage = () => {


    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <Hero />

            {/* Features Section */}
            <Feature />

            {/* School Information Section */}
            <Information />

            {/* Blog Section */}
            <Blog />

            {/* CTA Section */}
            <Cta />
        </div>
    )
}

export default HomePage
