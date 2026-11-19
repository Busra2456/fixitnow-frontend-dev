
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Star,
  UserRound,
  Wrench,
  XCircle,
} from "lucide-react";

import { getTechnicianById } from "../../_actions/getTechnicianById";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TechnicianDetailsPage({ params }: Props) {
  const { id } = await params;
  const result = await getTechnicianById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const technician = result.data;
  const profile = technician.technicianProfile;
  const services = technician.servicesCreated ?? [];
  const reviews = technician.technicianReviews ?? [];

  const rating = Number(profile?.rating ?? 0);
  const isAvailable = profile?.isAvailable ?? false;

  const technicianInitial =
    technician.name?.charAt(0).toUpperCase() || "T";

  return (
    <main className="min-h-screen bg-slate-50/60">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Page Header */}
        <section className="mb-6">
          <Link
            href="/technicians"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft className="size-4" />
            Back to Technicians
          </Link>

          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex size-[76px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-2xl font-bold text-slate-500 sm:size-20">
                {profile?.image ? (
                  <Image
                    src={profile.image}
                    alt={`${technician.name} profile`}
                    width={80}
                    height={80}
                    className="size-full object-cover"
                  />
                ) : (
                  technicianInitial
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="truncate text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    {technician.name}
                  </h1>

                  {isAvailable ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                      <span className="size-1.5 rounded-full bg-green-500" />
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      <span className="size-1.5 rounded-full bg-slate-400" />
                      Unavailable
                    </span>
                  )}
                </div>

                <p className="mt-1.5 flex items-center gap-2 truncate text-xs text-slate-500 sm:text-sm">
                  <Mail className="size-4 shrink-0 text-blue-600" />
                  {technician.email}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-slate-900">
                    {rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({reviews.length} reviews)
                  </span>
                </div>
              </div>
            </div>

            {services.length > 0 && (
              <Link
                href={`/services/${services[0].id}`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <CalendarDays className="size-4" />
                Book Technician
                <ArrowRight className="size-4" />
              </Link>
            )}
          </div>
        </section>

        {/* Quick Information */}
        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <MapPin className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-400">Location</p>
              <p className="truncate text-sm font-semibold text-slate-800">
                {profile?.location || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BriefcaseBusiness className="size-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Experience</p>
              <p className="text-sm font-semibold text-slate-800">
                {profile?.experience ?? 0} Years
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Wrench className="size-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Services</p>
              <p className="text-sm font-semibold text-slate-800">
                {services.length} Services
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid items-start gap-5 lg:grid-cols-3">

          {/* Left Column */}
          <div className="space-y-5 lg:col-span-2">

            {/* About Technician */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <UserRound className="size-5" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    About Technician
                  </h2>
                  <p className="text-xs text-slate-400">
                    Professional introduction
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {profile?.bio ||
                  "This technician has not added a biography yet."}
              </p>
            </section>

            {/* Services Offered */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Services Offered
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Professional services by this technician
                  </p>
                </div>

                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  {services.length} Services
                </span>
              </div>

              {services.length === 0 ? (
                <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <Wrench className="mx-auto size-8 text-slate-300" />
                  <p className="mt-3 text-sm text-slate-500">
                    No services added yet.
                  </p>
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:bg-slate-50/50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Wrench className="size-5" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-bold text-slate-900">
                            {service.title}
                          </h3>
                          <p className="mt-1 text-xs text-slate-500">
                            {service.category?.name || "General Service"}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
                        <div>
                          <p className="text-xs text-slate-400">
                            Service Price
                          </p>
                          <p className="mt-1 font-bold text-slate-900">
                            ৳{Number(service.price).toLocaleString("en-BD")}
                          </p>
                        </div>

                        <Link
                          href={`/services/${service.id}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-600"
                        >
                          Book Now
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Customer Reviews */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <MessageCircle className="size-5" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Customer Reviews
                  </h2>
                  <p className="text-xs text-slate-400">
                    {reviews.length} Customer Reviews
                  </p>
                </div>
              </div>

              {reviews.length === 0 ? (
                <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <MessageCircle className="mx-auto size-8 text-slate-300" />
                  <p className="mt-3 text-sm text-slate-500">
                    No reviews yet.
                  </p>
                </div>
              ) : (
                <div className="mt-5 divide-y divide-slate-100">
                  {reviews.map((review) => (
                    <div key={review.id} className="py-5 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">
                            {review.customer?.name
                              ?.charAt(0)
                              .toUpperCase() || "C"}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {review.customer?.name || "Customer"}
                            </p>
                            <p className="text-xs text-slate-400">
                              Customer
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1.5">
                          <Star className="size-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-bold text-slate-800">
                            {review.rating}
                          </span>
                        </div>
                      </div>

                      {review.comment && (
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-5">

            {/* Availability */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Clock className="size-5" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Availability
                  </h2>
                  <p className="text-xs text-slate-400">
                    Technician working hours
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">
                  Working Hours
                </p>
                <p className="mt-2 text-lg font-bold text-slate-900">
                  {profile?.availableFrom || "--"} -{" "}
                  {profile?.availableTo || "--"}
                </p>
              </div>

              <div className="mt-3">
                {isAvailable ? (
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm font-semibold text-green-700">
                    <CheckCircle2 className="size-4" />
                    Currently Available
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-3 text-sm font-semibold text-slate-600">
                    <XCircle className="size-4" />
                    Currently Unavailable
                  </div>
                )}
              </div>

              {services.length > 0 && (
                <Link
                  href={`/services/${services[0].id}`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  <CalendarDays className="size-4" />
                  Book This Technician
                  <ArrowRight className="size-4" />
                </Link>
              )}
            </section>

            {/* Explore Services */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CheckCircle2 className="size-5" />
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                Need Home Services?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Explore available services and find the right professional
                for your needs.
              </p>

              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:gap-3"
              >
                Explore Services
                <ArrowRight className="size-4" />
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
