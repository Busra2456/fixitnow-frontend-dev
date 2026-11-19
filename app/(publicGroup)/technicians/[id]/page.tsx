
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

  const rating = Number(profile?.rating ?? 0);
  const isAvailable = profile?.isAvailable ?? false;

  const technicianInitial =
    technician.name?.charAt(0).toUpperCase() || "T";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Back Navigation */}
        <Link
          href="/technicians"
          className="mb-8 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Technicians
        </Link>

        {/* Technician Profile Header */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="relative h-36 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500 sm:h-44">
            <div className="absolute inset-0 bg-white/5" />
            <div className="absolute bottom-5 right-6 hidden text-right text-white/20 sm:block">
              <Wrench className="h-20 w-20" />
            </div>
          </div>

          <div className="px-5 pb-7 sm:px-8">
            <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-blue-100 text-4xl font-extrabold text-blue-600 shadow-lg">
                  {profile?.image ? (
                    <Image
                      src={profile.image}
                      alt={`${technician.name} profile`}
                      width={112}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    technicianInitial
                  )}
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                      {technician.name}
                    </h1>

                    {isAvailable ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                        <XCircle className="h-3.5 w-3.5" />
                        Unavailable
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <Mail className="h-4 w-4 text-blue-600" />
                    {technician.email}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900">
                      {rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-slate-400">
                      ({reviews.length} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {services.length > 0 && (
                <Link
                  href={`/services/${services[0].id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
                >
                  <CalendarDays className="h-4 w-4" />
                  Book Technician
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            {/* Quick Information */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400">
                    Location
                  </p>
                  <p className="truncate text-sm font-bold text-slate-800">
                    {profile?.location || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Experience
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {profile?.experience ?? 0} Years
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Wrench className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Services
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {services.length} Services
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mt-7 grid gap-7 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-7 lg:col-span-2">

            {/* About */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <UserRound className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    About Technician
                  </h2>
                  <p className="text-xs text-slate-400">
                    Professional introduction
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                {profile?.bio ||
                  "This technician has not added a biography yet."}
              </p>
            </section>

            {/* Services */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Services Offered
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Professional services by this technician
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                  {services.length} Services
                </span>
              </div>

              {services.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                  <Wrench className="mx-auto h-9 w-9 text-slate-300" />
                  <p className="mt-3 text-sm text-slate-500">
                    No services added yet.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex flex-col gap-4 rounded-2xl border border-slate-100 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/30 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                          <Wrench className="h-5 w-5" />
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-900">
                            {service.title}
                          </h3>
                          <p className="mt-1 text-xs text-slate-500">
                            {service.category?.name || "General Service"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <div>
                          <p className="text-xs text-slate-400">
                            Service Price
                          </p>
                          <p className="mt-1 text-lg font-extrabold text-slate-900">
                            ৳{Number(service.price).toLocaleString("en-BD")}
                          </p>
                        </div>

                        <Link
                          href={`/services/${service.id}`}
                          className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Customer Reviews */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Customer Reviews
                  </h2>
                  <p className="text-xs text-slate-400">
                    {reviews.length} Customer Reviews
                  </p>
                </div>
              </div>

              {reviews.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                  <MessageCircle className="mx-auto h-9 w-9 text-slate-300" />
                  <p className="mt-3 text-sm text-slate-500">
                    No reviews yet.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-5">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-slate-100 pb-5 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                            {review.customer?.name
                              ?.charAt(0)
                              .toUpperCase() || "C"}
                          </div>

                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {review.customer?.name || "Customer"}
                            </p>
                            <p className="text-xs text-slate-400">
                              Customer
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1.5">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-bold text-slate-800">
                            {review.rating}
                          </span>
                        </div>
                      </div>

                      {review.comment && (
                        <p className="mt-4 text-sm leading-7 text-slate-600">
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
          <aside className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-900">
                    Availability
                  </h2>
                  <p className="text-xs text-slate-400">
                    Technician working hours
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">
                  Working Hours
                </p>
                <p className="mt-2 text-lg font-extrabold text-slate-900">
                  {profile?.availableFrom || "--"} -{" "}
                  {profile?.availableTo || "--"}
                </p>
              </div>

              <div className="mt-4">
                {isAvailable ? (
                  <div className="flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Currently Available
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-3 text-sm font-semibold text-slate-600">
                    <XCircle className="h-4 w-4" />
                    Currently Unavailable
                  </div>
                )}
              </div>

              {services.length > 0 && (
                <Link
                  href={`/services/${services[0].id}`}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-lg"
                >
                  <CalendarDays className="h-4 w-4" />
                  Book This Technician
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </section>

            {/* Trust Card */}
            <section className="rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-600 p-6 text-white shadow-lg shadow-blue-900/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <CheckCircle2 className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-extrabold">
                Quality Home Services
              </h3>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                Explore available services and choose the right technician
                for your home service needs.
              </p>

              <Link
                href="/services"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:gap-3"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
