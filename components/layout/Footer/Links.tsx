import React from 'react'
import Link from "next/link";

const Links = () => {
    return (
        <div className="space-y-6">
            <h4 className="text-lg font-semibold tracking-tight">Liên Kết Nhanh</h4>
            <ul className="space-y-3">
                <li>
                    <Link
                        href="/about"
                        className="text-base text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                    >
                        <span className="hover:underline">Về Chúng Tôi</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/blog"
                        className="text-base text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                    >
                        <span className="hover:underline">Tin Tức Sức Khỏe</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/document"
                        className="text-base text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                    >
                        <span className="hover:underline">Tài Liệu</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Links
