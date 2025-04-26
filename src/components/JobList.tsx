"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getJobs } from "@/lib/api";
import LoadingSpinner from "./Loading";

type Job = {
  id: string | number;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
};

export default function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const jobsData = await getJobs();
        setJobs(jobsData);
        setError(null);
      } catch (err) {
        console.error("Ish e'lonlarini yuklashda xatolik:", err);
        setError("Ish e'lonlarini yuklashda xatolik yuz berdi.");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (jobs.length === 0) {
    return <div className="p-4">Ish e'lonlari topilmadi.</div>;
  }

  return (
    <>
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-200">
                <img
                  src={job.logo}
                  width={80}
                  height={80}
                  alt={`${job.company} logotipi`}
                  className="object-cover h-full w-full"
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-xl">{job.title}</h3>
                <div className="text-sm text-gray-500">{job.company}</div>

                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                    {job.location}
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                    {job.type}
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                    {job.salary}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-0">
            <p className="text-sm text-gray-500 line-clamp-3">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {job.requirements &&
                job.requirements.slice(0, 3).map((req, index) => (
                  <span
                    key={index}
                    className="border px-2 py-1 rounded-full text-xs"
                  >
                    {req}
                  </span>
                ))}
              {job.requirements && job.requirements.length > 3 && (
                <span className="border px-2 py-1 rounded-full text-xs">
                  +{job.requirements.length - 3} ko'proq
                </span>
              )}
            </div>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              E'lon qilingan: {new Date(job.postedDate).toLocaleDateString()}
            </div>

            <Link href={`/jobs/${job.id}`}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Batafsil
              </button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
