"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LeftSide from "@/components/layout/Navbar/LeftSide";
import RightSide from "@/components/layout/Navbar/RightSide";
import { useAuth } from "@/lib/auth/auth-context";

const Navbar = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > prevScrollPos) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
      <nav
          className={`sticky top-0 z-50 border-b bg-background/95 backdrop-blur 
          supports-[backdrop-filter]:bg-background/80 transition-transform duration-300 
          ${ isVisible ? "translate-y-0" : "-translate-y-full" }`}
      >
        <div className="container px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Bên trái - Logo và Điều hướng */}
            <LeftSide user={user} />

            {/* Bên phải - Điều khiển người dùng */}
            <RightSide onLogin={handleLogin} onLogout={handleLogout} />
          </div>
        </div>
      </nav>
  );
};

export default Navbar;