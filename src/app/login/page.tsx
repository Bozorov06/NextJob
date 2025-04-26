"use client";

// Kerakli kutubxonalarni import qilish
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

// Login sahifasi komponenti
export default function LoginPage() {
  // Router va state'larni e'lon qilish
  const router = useRouter();
  const [username, setUsername] = useState(""); // Foydalanuvchi nomi uchun state
  const [password, setPassword] = useState(""); // Parol uchun state
  const [showPassword, setShowPassword] = useState(false); // Parolni ko'rsatish/yashirish uchun state
  const [loading, setLoading] = useState(false); // Yuklash holati
  const [error, setError] = useState(""); // Xatolik xabari

  // Formani yuborish funksiyasi
  const handleSubmit = async (e: any) => {
      e.preventDefault(); 

    try {
      setLoading(true);
      setError("");

      // API ga so'rov yuborish
      const response = await login({ username, password });

      // Muvaffaqiyatli kirish qilinganda, token saqlash va yo'naltirish
      if (response.token) {
        // Token ni localStorage ga saqlash
        localStorage.setItem("token", response.token);

        // Jobs sahifasiga yo'naltirish
        router.push("/jobs");
      } else {
        setError("Noma'lum xatolik yuz berdi");
      }
    } catch (err) {
      console.error("Login xatoligi:", err);
      setError("Login yoki parol noto'g'ri");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-md">
        {/* Login kartasi */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {/* Karta sarlavhasi */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Kirish</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Hisobingizga kirish uchun ma'lumotlarni kiriting
            </p>
          </div>

          {/* Xatolik xabari */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
              {error}
            </div>
          )}

          {/* Login formasi */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Foydalanuvchi nomi maydoni */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium">
                  Foydalanuvchi nomi
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Foydalanuvchi nomini kiriting"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={loading}
                />
              </div>

              {/* Parol maydoni */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Parol
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Parolni unutdingizmi?
                  </Link>
                </div>

                {/* Parol kiritish maydoni va ko'rsatish/yashirish tugmasi */}
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {/* Parolni ko'rsatish/yashirish ikonkasi */}
                    {showPassword ? "Yashirish" : "Ko'rsatish"}
                  </button>
                </div>
              </div>
            </div>

            {/* Kirish tugmasi */}
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Yuklanmoqda..." : "Kirish"}
            </button>

            {/* Ro'yxatdan o'tish havolasi */}
            <div className="mt-4 text-center text-sm">
              Hisobingiz yo'qmi?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Ro'yxatdan o'tish
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
