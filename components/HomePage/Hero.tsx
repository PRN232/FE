const Hero = () => {
    return (
        <section className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-100 text-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[length:300px_300px] opacity-20"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent via-transparent to-red-700/20"></div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 relative">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-red-100 leading-tight drop-shadow-md">
                        Hệ thống Quản lý <br /> Sức khỏe Trường học
                    </h1>
                    <p className="mt-8 text-xl font-bold md:text-2xl leading-relaxed text-red-50 max-w-3xl mx-auto">
                        Giải pháp số toàn diện để quản lý hồ sơ sức khỏe học sinh, sự cố y tế, tiêm chủng và khám sức khỏe trong các
                        cơ sở giáo dục.
                    </p>
                </div>
            </div>

            {/* Wave divider at bottom */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" className="w-full">
                    <path
                        fill="white"
                        d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,101.3C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                    ></path>
                </svg>
            </div>
        </section>
    )
}

export default Hero