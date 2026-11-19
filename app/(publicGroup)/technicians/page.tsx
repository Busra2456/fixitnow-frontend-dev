
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
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
      <main className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-100 bg-red-50/70 p-6">
            <h1 className="text-xl font-bold text-slate-900">
              Unable to Load Technicians
            </h1>
            <p className="mt-2 text-sm text-red-600">
              {result.message || "Failed to load technicians."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const technicians = result.data ?? [];

  return (
    <main className="min-h-screen bg-slate-50/60">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Page Header */}
        <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
              <Users className="size-4" />
              Our Professional Team
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Find Trusted{" "}
              <span className="text-blue-600">Technicians</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Connect with skilled professionals and find the right expert
              for your home service needs.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Users className="size-5" />
            </div>
            <div>
              <p className="text-lg font-bold leading-none text-slate-900">
                {technicians.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Professionals
              </p>
            </div>
          </div>
        </section>

        {/* Empty State */}
        {technicians.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <Users className="size-7" />
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
            {/* Results Heading */}
            <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Available Professionals
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Choose the right expert for your next service.
                </p>
              </div>
              <span className="rounded-lg bg-slate-200/70 px-3 py-1.5 text-xs font-semibold text-slate-600">
                {technicians.length} Results
              </span>
            </div>

            {/* Technician Cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {technicians.map((technician) => {
                const profile = technician.technicianProfile;
                const services = technician.servicesCreated ?? [];

                return (
                  <article
                    key={technician.id}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  >
                    {/* Card Top */}
                    <div className="relative flex h-16 items-center justify-between bg-slate-900 px-5">
                      <span className="text-xs font-semibold tracking-wide text-slate-300">
                        PROFESSIONAL TECHNICIAN
                      </span>

                      {profile?.isAvailable ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                          <span className="size-1.5 rounded-full bg-green-500" />
                          Available
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                          Unavailable
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      {/* Profile */}
                      <div className="flex items-center gap-4">
                        {profile?.image ? (
                          <Image
                            src={profile.image}
                            alt={`${technician.name} profile`}
                            width={76}
                            height={76}
                            className="size-[76px] shrink-0 rounded-2xl border border-slate-100 bg-slate-50 object-cover"
                          />
                        ) : (
                          <div className="flex size-[76px] shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl font-bold text-slate-500">
                            {technician.name?.charAt(0).toUpperCase() || "T"}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <h2 className="truncate text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                            {technician.name}
                          </h2>

                          <p className="mt-1 truncate text-xs text-slate-500">
                            {technician.email}
                          </p>

                          {profile?.rating !== undefined &&
                            profile?.rating !== null && (
                              <div className="mt-2 flex items-center gap-1.5">
                                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                                <span className="text-xs font-bold text-slate-800">
                                  {Number(profile.rating).toFixed(1)}
                                </span>
                                <span className="text-xs text-slate-400">
                                  Rating
                                </span>
                              </div>
                            )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="mt-5 grid grid-cols-2 gap-2">
                        {profile?.location && (
                          <div className="flex min-w-0 items-center gap-2 rounded-lg bg-slate-50 px-3 py-2.5">
                            <MapPin className="size-4 shrink-0 text-blue-600" />
                            <span className="truncate text-xs font-medium text-slate-600">
                              {profile.location}
                            </span>
                          </div>
                        )}

                        {profile?.experience !== null &&
                          profile?.experience !== undefined && (
                            <div className="flex min-w-0 items-center gap-2 rounded-lg bg-slate-50 px-3 py-2.5">
                              <BriefcaseBusiness className="size-4 shrink-0 text-blue-600" />
                              <span className="truncate text-xs font-medium text-slate-600">
                                {profile.experience} Years Exp.
                              </span>
                            </div>
                          )}
                      </div>

                      {/* Bio */}
                      {profile?.bio && (
                        <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
                          {profile.bio}
                        </p>
                      )}

                      {/* Services */}
                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <div className="mb-3 flex items-center gap-2">
                          <Wrench className="size-4 text-blue-600" />
                          <h3 className="text-sm font-bold text-slate-800">
                            Services Offered
                          </h3>
                        </div>

                        {services.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {services.slice(0, 3).map((service) => (
                              <span
                                key={service.id}
                                className="max-w-full truncate rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600"
                              >
                                {service.title}
                              </span>
                            ))}

                            {services.length > 3 && (
                              <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700">
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

                      {/* Profile Button */}
                      <Link
                        href={`/technicians/${technician.id}`}
                        className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        View Profile
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
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
