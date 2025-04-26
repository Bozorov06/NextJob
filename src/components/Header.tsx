"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./Theme";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { href: "/jobs", label: "Ish e'lonlari" },
    { href: "/specialists", label: "Mutaxassislar" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl md:text-2xl">NextJob</span>
          </Link>

          <nav className="hidden md:flex space-x-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`px-3 py-2 rounded-md ${
                  pathname?.startsWith(route.href)
                    ? "bg-gray-100 dark:bg-gray-800 font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <div className="hidden md:flex gap-2">
                <Link href="/login">
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
                    Kirish
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Ro'yxatdan o'tish
                  </button>
                </Link>
          </div>

          <div className="md:hidden">
            <button
              className="p-2 border border-gray-300 rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menyuni ochish</span>
            </button>

            {isOpen && (
              <div className="absolute top-16 right-0 left-0 bg-white dark:bg-gray-900 border-b dark:border-gray-800 p-4">
                <nav className="flex flex-col gap-2">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-3 py-2 rounded-md ${
                        pathname?.startsWith(route.href)
                          ? "bg-gray-100 dark:bg-gray-800 font-medium"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {route.label}
                    </Link>
                  ))}
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      >
                        Kirish
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Ro'yxatdan o'tish
                      </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
