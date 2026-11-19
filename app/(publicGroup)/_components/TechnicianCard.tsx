
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  MapPin,
  Star,
} from "lucide-react";

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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Technician Image */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-100">
        {profile?.image ? (
          <Image
            src={profile.image}
            alt={technician.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-100 text-5xl font-bold text-slate-400">
            {technician.name.charAt(0).toUpperCase()}
          </div>
        )}

        {profile?.isAvailable && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-green-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Available
          </span>
        )}

        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm font-bold text-slate-800 shadow-md">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          {profile?.rating ?? 0}
        </div>
      </div>

      {/* Technician Information */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <h2 className="truncate text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
            {technician.name}
          </h2>

          <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="truncate">
              {profile?.location || "Location not provided"}
            </span>
          </p>
        </div>

        {/* Experience */}
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">
              {profile?.experience ?? 0} Years Experience
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Professional technician
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 min-h-12 line-clamp-2 text-sm leading-6 text-slate-500">
          {profile?.bio ||
            "Professional technician ready to help with your home service needs."}
        </p>

        {/* Action */}
        <button
          type="button"
          onClick={() => router.push(`/technicians/${technician.id}`)}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          View Profile
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </article>
  );
}
