"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated, logout } from "@/lib/auth";

const AuthContext = createContext({
  isLoggedIn: false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);

    
      const protectedRoutes = ["/jobs/create", "/specialists/create"];
      const isProtectedRoute = protectedRoutes.some((route) =>
        pathname?.startsWith(route)
      );

      if (isProtectedRoute && !authenticated) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  const value = {
    isLoggedIn,
    logout: () => {
      logout();
      setIsLoggedIn(false);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
