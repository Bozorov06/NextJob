import Link from "next/link";
import Image from "next/image";
import {
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  BadgeDollarSignIcon,
} from "lucide-react";
import type { Job } from "@/types/Job";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const requirements = job.requirements ?? [];
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={job.logo || ""}
              alt="logo"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-xl">{job.title}</h3>
            <div className="text-sm text-muted-foreground">{job.company}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPinIcon className="h-3 w-3" />
                {job.location}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <BriefcaseIcon className="h-3 w-3" />
                {job.type}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <BadgeDollarSignIcon className="h-3 w-3" />
                {job.salary}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {job.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {requirements.slice(0, 3).map((req, index) => (
            <Badge key={index} variant="outline">
              {req}
            </Badge>
          ))}
          {requirements.length > 3 && (
            <Badge variant="outline">+{requirements.length - 3} more</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarIcon className="mr-1 h-3 w-3" />
          Posted: {new Date(job.postedDate).toLocaleDateString()}
        </div>
        <Link href={`/jobs/${job.id}`}>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
