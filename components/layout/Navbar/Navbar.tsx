"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import LeftSide from "@/components/Layout/Navbar/LeftSide";
import RightSide from "@/components/Layout/Navbar/RightSide";

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

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Bên trái - Logo và Điều hướng */}
          <LeftSide user={user} />

          {/* Bên phải - Điều khiển Người dùng */}
          <RightSide onLogin={handleLogin} onLogout={handleLogout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
