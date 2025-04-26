"use client";

// Kerakli kutubxonalarni import qilish
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api";

// Ro'yxatdan o'tish sahifasi komponenti
export default function RegisterPage() {
  // Router va state'larni e'lon qilish
  const router = useRouter();

  // Forma ma'lumotlari uchun state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Parollarni ko'rsatish/yashirish uchun state'lar
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Formani yuborish funksiyasi
  const handleSubmit = async (e: any) => {
    e.preventDefault(); 
    if (password !== confirmPassword) {
      setError("Parollar mos kelmadi!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // API ga so'rov yuborish
      const response = await register({ username, password });

      // Muvaffaqiyatli ro'yxatdan o'tilganda, token saqlash va yo'naltirish
      if (response.token) {
        // Token ni localStorage ga saqlash
        localStorage.setItem("token", response.token);

        // Jobs sahifasiga yo'naltirish
        router.push("/jobs");
      } else {
        setError("Noma'lum xatolik yuz berdi");
      }
    } catch (err) {
      console.error("Ro'yxatdan o'tish xatoligi:", err);
      setError(
        "Ro'yxatdan o'tishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex min-h-screen items-center justify-center py-8">
      <div className="mx-auto w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Ro'yxatdan o'tish</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Yangi hisob yaratish uchun ma'lumotlarni kiriting
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium">
                     Username*
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

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password*
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="•••••"
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
                 
                    {showPassword ? "Yashirish" : "Ko'rsatish"}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium"
                >
                 ConfirmPassword*
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? "Yashirish" : "Ko'rsatish"}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
            </button>

            <div className="mt-4 text-center text-sm">
              Hisobingiz bormi?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Kirish
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
