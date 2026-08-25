import Image from "next/image";
import Link from "next/link";

import { getTechnicians } from "../_actions/getTechnicians";

export default async function TechniciansPage() {
  const result = await getTechnicians();

  if (!result.success) {
    return (
      <main className="min-h-screen bg-muted/30 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">
            Find Technicians
          </h1>

          <div className="mt-8 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <p className="text-sm text-destructive">
              {result.message || "Failed to load technicians."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Find Technicians
          </h1>

          <p className="mt-2 text-muted-foreground">
            Find trusted technicians for your service.
          </p>
        </div>

        {/* Empty State */}
        {result.data.length === 0 ? (
          <div className="rounded-xl border bg-background p-10 text-center">
            <h2 className="text-xl font-semibold">
              No technicians found
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              There are no active technicians available right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.data.map((technician) => {
              const profile = technician.technicianProfile;
              const services = technician.servicesCreated ?? [];

              return (
                <div
                  key={technician.id}
                  className="rounded-xl border bg-background p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Profile Image */}
                  <div className="flex justify-center">
                    {profile?.image ? (
                      <Image
                        src={profile.image}
                        alt={`${technician.name} profile`}
                        width={110}
                        height={110}
                        className="h-28 w-28 rounded-full object-cover border-4 border-background shadow-md"
                      />
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground shadow-md">
                        {technician.name
                          ?.charAt(0)
                          .toUpperCase() || "T"}
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="mt-5 text-center">
                    <h2 className="text-xl font-semibold">
                      {technician.name}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {technician.email}
                    </p>
                  </div>

                  {/* Location */}
                  {profile?.location && (
                    <p className="mt-4 text-sm">
                       {profile.location}
                    </p>
                  )}

                  {/* Experience */}
                  {profile?.experience !== null &&
                    profile?.experience !== undefined && (
                      <p className="mt-2 text-sm">
                        <span className="font-medium">
                          Experience:
                        </span>{" "}
                        {profile.experience} years
                      </p>
                    )}

                  {/* Rating */}
                  {profile?.rating !== undefined && (
                    <p className="mt-2 text-sm">
                      <span className="font-medium">
                        Rating:
                      </span>{" "}
                      ⭐ {Number(profile.rating).toFixed(1)}
                    </p>
                  )}

                  {/* Bio */}
                  {profile?.bio && (
                    <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
                      {profile.bio}
                    </p>
                  )}

                  {/* Services */}
                  <div className="mt-5">
                    <p className="text-sm font-semibold">
                      Services
                    </p>

                    {services.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {services.slice(0, 3).map((service) => (
                          <span
                            key={service.id}
                            className="rounded-full bg-muted px-3 py-1 text-xs"
                          >
                            {service.title}
                          </span>
                        ))}

                        {services.length > 3 && (
                          <span className="rounded-full bg-muted px-3 py-1 text-xs">
                            +{services.length - 3} more
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="mt-2 text-xs text-muted-foreground">
                        No services added yet.
                      </p>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="mt-5">
                    {profile?.isAvailable ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                         Available
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                         Currently unavailable
                      </span>
                    )}
                  </div>

                  {/* View Profile */}
                  <Link
                    href={`/technicians/${technician.id}`}
                    className="mt-6 block rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90"
                  >
                    View Profile
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}