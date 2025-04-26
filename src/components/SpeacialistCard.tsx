import Link from "next/link";
import Image from "next/image";
import { MapPinIcon} from "lucide-react";
import type { Specialist } from "@/types/Specialist";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface SpecialistCardProps {
  specialist: Specialist;
}

export default function SpecialistCard({ specialist }: SpecialistCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={specialist.avatar || "/placeholder.svg?height=200&width=200"}
              alt={`${specialist.name} avatar`}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-xl">{specialist.name}</h3>
            <div className="text-sm text-muted-foreground">
              {specialist.title}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPinIcon className="h-3 w-3" />
                {specialist.location}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="flex flex-wrap gap-2 mt-4">
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          {specialist.education[0]?.institution}
        </div>
        <Link href={`/specialists/${specialist.id}`}>
          <Button>View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
