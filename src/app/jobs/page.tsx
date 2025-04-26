import { Suspense } from "react";
import Link from "next/link";
import JobsList from "@/components/JobList";
import LoadingSpinner from "@/components/Loading";

export default function JobsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Ish e'lonlari</h1>
          <p className="text-gray-500 mt-1">Yangi ish imkoniyatlarini toping</p>
        </div>

        <Link href="/jobs/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Ish e'loni yaratish
          </button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        <div className="space-y-6">
          <Suspense fallback={<LoadingSpinner />}>
            <JobsList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
