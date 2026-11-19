
import Link from "next/link";

import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  MessageSquareText,
  Star,
  Wrench,
  BriefcaseBusiness,
  TrendingUp,
} from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { getMe } from "@/service/getMe";

import { getTechnicianBookings } from "../_actions/technicianBookingActions";
import { getMyTechnicianServices } from "../_actions/getTechnicianServices";
import { getTechnicianReviews } from "./_actions/reviewActions";

export default async function TechnicianDashboardPage() {
  const [bookingResult, serviceResult, meResult] =
    await Promise.all([
      getTechnicianBookings(),
      getMyTechnicianServices(),
      getMe(),
    ]);

  const bookings = bookingResult.success
    ? bookingResult.data ?? []
    : [];

  const services = serviceResult.success
    ? serviceResult.data ?? []
    : [];

  const technicianId = meResult.success
    ? meResult.data?.id
    : null;

  const reviewResult = technicianId
    ? await getTechnicianReviews(technicianId)
    : {
        success: false,
        message: "Technician ID not found",
        data: [],
      };

  const reviews = reviewResult.success
    ? reviewResult.data ?? []
    : [];

  const totalServices = services.length;

  const pendingRequests = bookings.filter(
    (booking) => booking.status === "REQUESTED"
  ).length;

  const completedJobs = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  ).length;

  const totalEarnings = bookings
    .filter((booking) => booking.status === "COMPLETED")
    .reduce(
      (total, booking) => total + Number(booking.totalPrice || 0),
      0
    );

  const stats = [
    {
      title: "Total Services",
      value: totalServices,
      description: "Services you currently provide",
      icon: Wrench,
      color: "bg-blue-50 text-blue-600",
      accent: "border-l-blue-500",
    },
    {
      title: "Pending Requests",
      value: pendingRequests,
      description: "Waiting for your response",
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
      accent: "border-l-amber-500",
    },
    {
      title: "Completed Jobs",
      value: completedJobs,
      description: "Successfully completed jobs",
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
      accent: "border-l-emerald-500",
    },
    {
      title: "Total Earnings",
      value: `৳${totalEarnings.toLocaleString("en-BD")}`,
      description: "From completed jobs",
      icon: DollarSign,
      color: "bg-violet-50 text-violet-600",
      accent: "border-l-violet-500",
    },
  ];

  const quickActions = [
    {
      title: "Manage Services",
      description:
        "Create, update and manage all your professional services.",
      href: "/technician-dashboard/services",
      action: "Manage Services",
      icon: Wrench,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Manage Bookings",
      description:
        "Review customer requests and manage your bookings.",
      href: "/technician-dashboard/bookings",
      action: "View Bookings",
      icon: CalendarCheck,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Availability",
      description:
        "Manage your working hours and service availability.",
      href: "/technician-dashboard/availability",
      action: "Set Availability",
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  const errors = [
    {
      success: serviceResult.success,
      message: `Failed to load services: ${serviceResult.message || "Unknown error"}`,
    },
    {
      success: bookingResult.success,
      message: `Failed to load bookings: ${bookingResult.message || "Unknown error"}`,
    },
    {
      success: meResult.success,
      message: `Failed to load technician information: ${meResult.message || "Unknown error"}`,
    },
    {
      success: reviewResult.success,
      message: `Failed to load reviews: ${reviewResult.message || "Unknown error"}`,
    },
  ].filter((item) => !item.success);

  return (
    <main className="min-h-screen bg-slate-50/70">
      <div className="mx-auto max-w-7xl space-y-9 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* Welcome Header */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-9 shadow-xl sm:px-9 sm:py-11">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-300">
                <Link
  href="/technician-dashboard"
  className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
>
  <ArrowLeft className="size-4" />
  Back to Dashboard
</Link>
                <BriefcaseBusiness className="size-3.5" />
                TECHNICIAN WORKSPACE
              </div>

              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Welcome to Your Dashboard
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Manage your services, customer bookings, availability
                and earnings from one convenient place.
              </p>
            </div>

            <Link
              href="/technician-dashboard/services"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Manage Services
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* Error Messages */}
        {errors.length > 0 && (
          <section className="space-y-3">
            {errors.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <span className="mt-0.5 size-2 shrink-0 rounded-full bg-red-500" />
                {item.message}
              </div>
            ))}
          </section>
        )}

        {/* Statistics */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Business Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Track your performance and business activity.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 sm:flex">
              <TrendingUp className="size-4 text-emerald-600" />
              Performance
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className={`group rounded-2xl border border-slate-200 border-l-4 ${stat.accent} bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-500">
                      {stat.title}
                    </p>

                    <div
                      className={`flex size-11 items-center justify-center rounded-xl ${stat.color} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="size-5" />
                    </div>
                  </div>

                  <h3 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900">
                    {stat.value}
                  </h3>

                  <p className="mt-2 text-xs font-medium text-slate-400">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Quick Actions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Everything you need to manage your work efficiently.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex size-12 items-center justify-center rounded-xl ${item.color} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="size-6" />
                    </div>

                    <ArrowRight className="size-5 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600" />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                    {item.action}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <MessageSquareText className="size-5" />
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Customer Reviews
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  What customers say about your work.
                </p>
              </div>
            </div>

            <span className="w-fit rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700">
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </span>
          </div>

          {reviews.length === 0 ? (
            <div className="px-5 py-14 text-center sm:px-7">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Star className="size-7" />
              </div>

              <h3 className="mt-5 font-bold text-slate-800">
                No reviews yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Customer feedback will appear here after customers
                review your completed jobs.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="px-5 py-6 transition hover:bg-slate-50/70 sm:px-7"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-600">
                        {(review.customer?.name || "C")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="font-bold text-slate-900">
                          {review.customer?.name || "Customer"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {review.booking?.service?.title || "Service"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({
                        length: Math.max(
                          0,
                          Math.min(5, Number(review.rating) || 0)
                        ),
                      }).map((_, index) => (
                        <Star
                          key={index}
                          className="size-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {review.comment}
                  </p>

                  {review.createdAt && (
                    <p className="mt-3 text-xs font-medium text-slate-400">
                      {new Date(review.createdAt).toLocaleDateString(
                        "en-BD",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Getting Started */}
        <section className="relative overflow-hidden rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-100 sm:p-9">
          <div className="pointer-events-none absolute -right-10 -top-16 size-48 rounded-full bg-blue-100 blur-2xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600">
                <TrendingUp className="size-4" />
                Grow Your Business
              </span>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                Ready for More Bookings?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">
                Keep your services updated and manage customer requests
                to grow your professional presence on FixItNow.
              </p>
            </div>

            <Link
              href="/technician-dashboard/services"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
            >
              Manage My Services
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
