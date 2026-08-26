"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

type TechnicianCardProps = {
  technician: {
    id: string;
    name: string;
    email: string;
    technicianProfile?: {
      experience?: number | null;
      bio?: string | null;
      location?: string | null;
      rating?: number | null;
      isAvailable?: boolean;
      image?: string | null;
    } | null;
  };
};

export default function TechnicianCard({
  technician,
}: TechnicianCardProps) {
  const router = useRouter();

  const profile = technician.technicianProfile;

  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Image */}
      <div className="relative h-48 w-full bg-muted">
        {profile?.image ? (
          <Image
            src={profile.image}
            alt={technician.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-bold text-muted-foreground">
            {technician.name.charAt(0).toUpperCase()}
          </div>
        )}

        {profile?.isAvailable && (
          <span className="absolute right-3 top-3 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Available
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-semibold">
          {technician.name}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {profile?.location || "Location not provided"}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium">
             {profile?.rating ?? 0}
          </span>

          <span className="text-sm text-muted-foreground">
            {profile?.experience ?? 0} years experience
          </span>
        </div>

        {profile?.bio && (
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
            {profile.bio}
          </p>
        )}

        <button
          type="button"
          onClick={() =>
            router.push(`/technicians/${technician.id}`)
          }
          className="mt-5 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}