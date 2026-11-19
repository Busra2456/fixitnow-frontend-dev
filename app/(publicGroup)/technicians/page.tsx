
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck,
  MapPin,
  Star,
  Users,
  Wrench,
} from "lucide-react";

import { getTechnicians } from "../_actions/getTechnicians";

export default async function TechniciansPage() {
  const result = await getTechnicians();

  if (!result.success) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
              Find Technicians
            </h1>
            <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-600">
              {result.message || "Failed to load technicians."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            <Users className="h-4 w-4" />
            Our Professional Team
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Find Trusted{" "}
            <span className="text-blue-600">Technicians</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Connect with skilled and experienced professionals.
            Find the right expert for your home service needs.
          </p>

          <div className="mx-auto mt-7 h-1 w-20 rounded-full bg-blue-600" />
        </div>

        {/* Error-free Empty State */}
        {result.data.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Users className="h-8 w-8" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No Technicians Found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              There are no active technicians available right now.
              Please check back later.
            </p>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Our Technicians
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Choose a professional for your next service.
                </p>
              </div>

              <span className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
                {result.data.length} Technicians
              </span>
            </div>

            {/* Technician Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {result.data.map((technician) => {
                const profile = technician.technicianProfile;
                const services = technician.servicesCreated ?? [];

                return (
                  <article
                    key={technician.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
                  >
                    {/* Card Top */}
                    <div className="relative h-24 bg-gradient-to-r from-blue-600 to-indigo-500">
                      <div className="absolute inset-0 bg-white/5" />

                      <div className="absolute right-4 top-4">
                        {profile?.isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-green-600 shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            Available
                          </span>
                        ) : (
                          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm">
                            Unavailable
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Profile */}
                    <div className="px-6 pb-6">
                      <div className="-mt-12 flex justify-center">
                        {profile?.image ? (
                          <Image
                            src={profile.image}
                            alt={`${technician.name} profile`}
                            width={100}
                            height={100}
                            className="h-24 w-24 rounded-full border-4 border-white bg-white object-cover shadow-md"
                          />
                        ) : (
                          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-3xl font-extrabold text-blue-600 shadow-md">
                            {technician.name?.charAt(0).toUpperCase() || "T"}
                          </div>
                        )}
                      </div>

                      {/* Name & Email */}
                      <div className="mt-4 text-center">
                        <h2 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                          {technician.name}
                        </h2>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {technician.email}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        {profile?.location && (
                          <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
                            <MapPin className="h-4 w-4 shrink-0 text-blue-600" />
                            <span className="truncate text-xs font-medium text-slate-600">
                              {profile.location}
                            </span>
                          </div>
                        )}

                        {profile?.experience !== null &&
                          profile?.experience !== undefined && (
                            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
                              <BriefcaseBusiness className="h-4 w-4 shrink-0 text-blue-600" />
                              <span className="text-xs font-medium text-slate-600">
                                {profile.experience} Years Exp.
                              </span>
                            </div>
                          )}
                      </div>

                      {/* Rating */}
                      {profile?.rating !== undefined &&
                        profile?.rating !== null && (
                          <div className="mt-4 flex items-center justify-center gap-2">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-bold text-slate-800">
                              {Number(profile.rating).toFixed(1)}
                            </span>
                            <span className="text-xs text-slate-400">
                              Rating
                            </span>
                          </div>
                        )}

                      {/* Bio */}
                      {profile?.bio && (
                        <p className="mt-4 line-clamp-3 text-center text-sm leading-6 text-slate-500">
                          {profile.bio}
                        </p>
                      )}

                      {/* Services */}
                      <div className="mt-6 border-t border-slate-100 pt-5">
                        <div className="mb-3 flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-blue-600" />
                          <h3 className="text-sm font-bold text-slate-800">
                            Services Offered
                          </h3>
                        </div>

                        {services.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {services.slice(0, 3).map((service) => (
                              <span
                                key={service.id}
                                className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
                              >
                                {service.title}
                              </span>
                            ))}

                            {services.length > 3 && (
                              <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                +{services.length - 3} more
                              </span>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400">
                            No services added yet.
                          </p>
                        )}
                      </div>

                      {/* View Profile */}
                      <Link
                        href={`/technicians/${technician.id}`}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
                      >
                        View Profile
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
