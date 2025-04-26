'use client'
import { useState,useEffect, Suspense } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/Loading";


interface Specialist {
  id: number;
  name: string;
  skills: string[];
  location: string;
}

export default function SpecialistsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSpecialists, setFilteredSpecialists] = useState<any[]>(
    []
  );


  const specialists: any[] = [
    {
      id: 1,
      name: "Muhammadali Yusupov",
      skills: ["React", "Node.js"],
      location: "Toshkent",
    },
    {
      id: 2,
      name: "Rustam Murodov",
      skills: ["TypeScript", "Figma"],
      location: "Samarqand",
    },
    {
      id: 3,
      name: "Ahmadjon Aliyev",
      skills: ["React", "Tailwindcss", "NextJS"],
      location: "Farg'ona",
    },
    {
      id: 4,
      name: "Murodjon Abdullayev",
      skills: ["TypeScript", "NextJS"],
      location: "Andijon",
    },
  ];


  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = specialists.filter((specialist) =>
        specialist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSpecialists(filtered);
    } else {
      setFilteredSpecialists(specialists);
    }
  }, [searchQuery]);

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mutaxassislar</h1>
          <p className="text-gray-500 mt-1">
            Loyihalaringiz uchun malakali mutaxassislarni toping
          </p>
        </div>
        <Link href="/specialists/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Profil yaratish
          </button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
        
        <div className="space-y-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
          <div className="space-y-2">
            <h3 className="font-medium">Qidiruv</h3>
            <input
              type="text"
              placeholder="Mutaxassis qidirish..."
              className="w-full px-3 py-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <Suspense fallback={<LoadingSpinner />}>
            {filteredSpecialists.length > 0 ? (
              filteredSpecialists.map((specialist) => (
                <div
                  key={specialist.id}
                  className="bg-white dark:bg-gray-900 p-4 rounded-md shadow-sm border dark:border-gray-700"
                >
                  <h4 className="font-semibold text-lg">{specialist.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {specialist.skills.join(", ")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {specialist.location}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-gray-500 dark:text-gray-400">
                Hech qanday mutaxassis topilmadi
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
