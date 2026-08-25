import Link from "next/link";
import { notFound } from "next/navigation";

import { getTechnicianById } from "../../_actions/getTechnicianById";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TechnicianDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const result = await getTechnicianById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const technician = result.data;
  const profile = technician.technicianProfile;
  const services = technician.servicesCreated ?? [];
  const reviews = technician.technicianReviews ?? [];

  const rating = profile?.rating ?? 0;

  return (
    <main className="min-h-screen bg-muted/30 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          href="/technicians"
          className="mb-6 inline-block text-sm font-medium text-primary hover:underline"
        >
          ← Back to Technicians
        </Link>

        {/* Profile Header */}
        <section className="rounded-2xl border bg-background p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">

            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-muted text-3xl font-bold">
              {technician.name?.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h1 className="text-3xl font-bold">
                    {technician.name}
                  </h1>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {technician.email}
                  </p>
                </div>

                {/* Availability */}
                {profile?.isAvailable ? (
                  <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
                    Available
                  </span>
                ) : (
                  <span className="w-fit rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
                    Currently unavailable
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-lg">
                  ⭐
                </span>

                <span className="font-semibold">
                  {rating.toFixed(1)}
                </span>

                <span className="text-sm text-muted-foreground">
                  ({reviews.length} reviews)
                </span>
              </div>

              {/* Location / Experience */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {profile?.location && (
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">
                      Location
                    </p>

                    <p className="mt-1 font-medium">
                      {profile.location}
                    </p>
                  </div>
                )}

                {profile?.experience !== null &&
                  profile?.experience !== undefined && (
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        Experience
                      </p>

                      <p className="mt-1 font-medium">
                        {profile.experience} years
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </section>

        {/* Bio */}
        {profile?.bio && (
          <section className="mt-6 rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              About Technician
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              {profile.bio}
            </p>
          </section>
        )}

        {/* Availability Time */}
        {(profile?.availableFrom ||
          profile?.availableTo) && (
          <section className="mt-6 rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Availability
            </h2>

            <p className="mt-3 text-muted-foreground">
              {profile.availableFrom || "--"}{" "}
              -{" "}
              {profile.availableTo || "--"}
            </p>
          </section>
        )}

        {/* Services */}
        <section className="mt-6 rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Services
          </h2>

          {services.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              No services added yet.
            </p>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="rounded-xl border p-5"
                >
                  <h3 className="font-semibold">
                    {service.title}
                  </h3>

                  {service.category?.name && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {service.category.name}
                    </p>
                  )}

                  <p className="mt-4 text-lg font-bold">
                    ৳
                    {Number(
                      service.price
                    ).toLocaleString("en-BD")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Reviews */}
        <section className="mt-6 rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Customer Reviews
          </h2>

          {reviews.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              No reviews yet.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl border p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">
                      {review.customer?.name ||
                        "Customer"}
                    </p>

                    <span className="text-sm">
                      ⭐ {review.rating}
                    </span>
                  </div>

                  {review.comment && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Book Now */}
        {services.length > 0 && (
          <section className="mt-6 rounded-2xl border bg-background p-6 text-center shadow-sm">
            <h2 className="text-xl font-semibold">
              Ready to book?
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Choose a service and book this technician.
            </p>

            <Link
              href={`/services/${services[0].id}`}
              className="mt-5 inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Book Now
            </Link>
          </section>
        )}

      </div>
    </main>
  );
}