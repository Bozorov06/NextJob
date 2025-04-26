"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getJobById } from "@/lib/api";
import LoadingSpinner from "@/components/Loading";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        setLoading(true);
        const jobData = await getJobById(params.id as string);
        setJob(jobData);
        setError(null);
      } catch (err) {
        console.error("Ish e'lonini yuklashda xatolik:", err);
        setError(
          "Ish e'lonini yuklashda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring."
        );
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchJob();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="p-4 text-red-500">{error}</div>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Orqaga qaytish
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container py-8">
        <div className="p-4">Ish e'loni topilmadi.</div>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Orqaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-1">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-200">
                <img
                  src={job.logo || "/placeholder.svg?height=80&width=80"}
                  alt={`${job.company} logotipi`}
                  className="object-cover h-full w-full"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{job.title}</h1>
                <div className="text-xl text-gray-500">{job.company}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge>{job.location}</Badge>
                  <Badge>{job.type}</Badge>
                  <Badge>{job.salary}</Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link href={`/jobs/${job.id}/edit`}>
                <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
                  Tahrirlash
                </button>
              </Link>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Ariza yuborish
              </button>
            </div>
          </div>

          <hr className="border-t border-gray-200 dark:border-gray-700" />

          <div className="space-y-6">
            <Section title="Ish tavsifi">
              <p className="text-gray-500 whitespace-pre-line">
                {job.description}
              </p>
            </Section>

            {job.requirements?.length > 0 && (
              <Section title="Talablar">
                <List items={job.requirements} />
              </Section>
            )}

            {job.responsibilities?.length > 0 && (
              <Section title="Majburiyatlar">
                <List items={job.responsibilities} />
              </Section>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <InfoCard title="Ish haqida qisqacha">
            <InfoItem label="E'lon qilingan sana" value={job.postedDate} />
            <InfoItem
              label="Ariza topshirish muddati"
              value={job.applicationDeadline}
            />
            <InfoItem label="Joylashuv" value={job.location} />
            <InfoItem label="Ish turi" value={job.type} />
            <InfoItem label="Maosh" value={job.salary} />
            <InfoItem label="Aloqa uchun email" value={job.contactEmail} />
          </InfoCard>

          <InfoCard title="Ushbu ish uchun ariza topshiring">
            <p className="text-sm text-gray-500 mb-4">
              Arizangizni to'g'ridan-to'g'ri ish beruvchiga yuboring
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Ariza yuborish
            </button>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
 
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
      {children}
    </span>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-2 text-gray-500">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-sm text-gray-500">
          {new Date(value).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

