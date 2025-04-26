import { specialists } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPinIcon,
  BriefcaseIcon,
  BadgeDollarSignIcon,
  PencilIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SpecialistDetailPageProps {
  params: {
    id: string;
  };
}

export default function SpecialistDetailPage({
  params,
}: SpecialistDetailPageProps) {
  const specialist = specialists.find(
    (specialist) => specialist.id === params.id
  );

  if (!specialist) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="h-24 w-24 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={
                    specialist.avatar || "/placeholder.svg?height=200&width=200"
                  }
                  alt={`${specialist.name} avatar`}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{specialist.name}</h1>
                <div className="text-xl text-muted-foreground">
                  {specialist.title}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <MapPinIcon className="h-3 w-3" />
                    {specialist.location}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <BriefcaseIcon className="h-3 w-3" />
                    {specialist.experience}
                  </Badge>
                  {specialist.hourlyRate && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <BadgeDollarSignIcon className="h-3 w-3" />
                      {specialist.hourlyRate}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/specialists/${specialist.id}/edit`}>
                <Button variant="outline">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Button>Contact</Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {specialist.bio}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {specialist.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Education</h2>
              <div className="space-y-4">
                {specialist.education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <div className="font-medium">{edu.degree}</div>
                    <div className="text-muted-foreground">
                      {edu.institution}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Graduated: {edu.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hire {specialist.name.split(" ")[0]}</CardTitle>
              <CardDescription>
                Send a message to discuss your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Contact Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
