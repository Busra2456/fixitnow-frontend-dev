import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaTools,
  FaUser,
  FaCommentAlt,
  FaTimesCircle,
} from "react-icons/fa";

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
  const isAvailable = profile?.isAvailable ?? false;

  const technicianInitial =
    technician.name?.charAt(0).toUpperCase() || "T";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/technicians"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
        >
          <FaArrowLeft />
          Back to Technicians
        </Link>

        <section className="rounded-xl border bg-white shadow-sm">
          <div className="h-24 rounded-t-xl bg-primary/10" />

          <div className="px-5 pb-6 sm:px-7">
            <div className="-mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white bg-primary/10 text-2xl font-bold text-primary shadow">
                  {technicianInitial}
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold">
                      {technician.name}
                    </h1>

                    {isAvailable ? (
                      <span className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                        <FaCheckCircle />
                        Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                        <FaTimesCircle />
                        Unavailable
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <FaEnvelope />
                    {technician.email}
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <FaStar className="text-yellow-400" />

                    <span className="font-semibold">
                      {rating.toFixed(1)}
                    </span>

                    <span className="text-sm text-gray-500">
                      ({reviews.length} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {services.length > 0 && (
                <Link
                  href={`/services/${services[0].id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  <FaCalendarAlt />
                  Book Technician
                </Link>
              )}
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <FaMapMarkerAlt className="text-primary" />

                <div>
                  <p className="text-xs text-gray-500">
                    Location
                  </p>

                  <p className="text-sm font-medium">
                    {profile?.location || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border p-3">
                <FaBriefcase className="text-primary" />

                <div>
                  <p className="text-xs text-gray-500">
                    Experience
                  </p>

                  <p className="text-sm font-medium">
                    {profile?.experience ?? 0} years
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border p-3">
                <FaTools className="text-primary" />

                <div>
                  <p className="text-xs text-gray-500">
                    Services
                  </p>

                  <p className="text-sm font-medium">
                    {services.length} services
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
    
          <div className="space-y-6 lg:col-span-2">
          
            <section className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <FaUser className="text-primary" />

                <h2 className="text-lg font-bold">
                  About Technician
                </h2>
              </div>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                {profile?.bio ||
                  "This technician has not added a biography yet."}
              </p>
            </section>

            <section className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">
                    Services
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Services offered by this technician
                  </p>
                </div>

                <span className="text-sm text-gray-500">
                  {services.length} services
                </span>
              </div>

              {services.length === 0 ? (
                <div className="mt-5 rounded-lg border border-dashed p-6 text-center">
                  <FaTools className="mx-auto text-2xl text-gray-400" />

                  <p className="mt-2 text-sm text-gray-500">
                    No services added yet.
                  </p>
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FaTools />
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            {service.title}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            {service.category?.name ||
                              "General Service"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <div>
                          <p className="text-xs text-gray-500">
                            Price
                          </p>

                          <p className="font-bold">
                            ৳
                            {Number(
                              service.price
                            ).toLocaleString("en-BD")}
                          </p>
                        </div>

                        <Link
                          href={`/services/${service.id}`}
                          className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
                        >
                          Book
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <FaCommentAlt className="text-primary" />

                <div>
                  <h2 className="text-lg font-bold">
                    Customer Reviews
                  </h2>

                  <p className="text-sm text-gray-500">
                    {reviews.length} reviews
                  </p>
                </div>
              </div>

              {reviews.length === 0 ? (
                <div className="mt-5 rounded-lg border border-dashed p-6 text-center">
                  <FaCommentAlt className="mx-auto text-2xl text-gray-400" />

                  <p className="mt-2 text-sm text-gray-500">
                    No reviews yet.
                  </p>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                            {review.customer?.name
                              ?.charAt(0)
                              .toUpperCase() || "C"}
                          </div>

                          <div>
                            <p className="text-sm font-semibold">
                              {review.customer?.name ||
                                "Customer"}
                            </p>

                            <p className="text-xs text-gray-500">
                              Customer
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />

                          <span className="text-sm font-semibold">
                            {review.rating}
                          </span>
                        </div>
                      </div>

                      {review.comment && (
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside>
            <section className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <FaClock className="text-primary" />

                <div>
                  <h2 className="font-bold">
                    Availability
                  </h2>

                  <p className="text-xs text-gray-500">
                    Working hours
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Working Hours
                </p>

                <p className="mt-1 font-semibold">
                  {profile?.availableFrom || "--"} -{" "}
                  {profile?.availableTo || "--"}
                </p>
              </div>

              <div className="mt-4">
                {isAvailable ? (
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    <FaCheckCircle />
                    Currently Available
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-3 text-sm text-gray-600">
                    <FaTimesCircle />
                    Currently Unavailable
                  </div>
                )}
              </div>

              {services.length > 0 && (
                <Link
                  href={`/services/${services[0].id}`}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  <FaCalendarAlt />
                  Book Now
                </Link>
              )}
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}