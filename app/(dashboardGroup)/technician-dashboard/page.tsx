
import Link from "next/link";

import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  Star,
  Wrench,
} from "lucide-react";

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
      (total, booking) => total + Number(booking.totalPrice),
      0
    );

  const stats = [
    {
      title: "Total Services",
      value: totalServices,
      description: "Services you provide",
      icon: Wrench,
    },
    {
      title: "Pending Requests",
      value: pendingRequests,
      description: "Waiting for your response",
      icon: Clock,
    },
    {
      title: "Completed Jobs",
      value: completedJobs,
      description: "Successfully completed",
      icon: CheckCircle2,
    },
    {
      title: "Total Earnings",
      value: `৳${totalEarnings.toLocaleString("en-BD")}`,
      description: "From completed jobs",
      icon: DollarSign,
    },
  ];

  const quickActions = [
    {
      title: "Manage Services",
      description:
        "Create, view and manage the services you provide.",
      href: "/technician-dashboard/services",
      action: "Manage Services",
      icon: Wrench,
    },
    {
      title: "Manage Bookings",
      description:
        "Accept, decline and complete customer bookings.",
      href: "/technician-dashboard/bookings",
      action: "View Bookings",
      icon: CalendarCheck,
    },
    {
      title: "Availability",
      description:
        "Set your working hours and availability.",
      href: "/technician-dashboard/availability",
      action: "Set Availability",
      icon: Clock,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* Dashboard Header */}
        <section className="border-b border-slate-200 pb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Technician Dashboard
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Welcome to Your Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Manage your services, bookings, availability and
            earnings all in one place.
          </p>
        </section>

        {/* Error Messages */}
        {[
          {
            success: serviceResult.success,
            message: `Failed to load your services: ${
              serviceResult.message || "Unknown error"
            }`,
          },
          {
            success: bookingResult.success,
            message: `Failed to load your bookings: ${
              bookingResult.message || "Unknown error"
            }`,
          },
          {
            success: meResult.success,
            message: `Failed to load technician information: ${
              meResult.message || "Unknown error"
            }`,
          },
          {
            success: reviewResult.success,
            message: `Failed to load reviews: ${
              reviewResult.message || "Unknown error"
            }`,
          },
        ]
          .filter((item) => !item.success)
          .map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            >
              {item.message}
            </div>
          ))}

        {/* Statistics */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your service performance at a glance.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <div className="rounded-xl bg-blue-50 p-3">
                      <Icon className="size-5 text-blue-600" />
                    </div>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-slate-900">
                    {stat.value}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Quick Actions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Quickly access your important dashboard features.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-slate-100 transition group-hover:bg-blue-50">
                    <Icon className="size-6 text-slate-700 group-hover:text-blue-600" />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 min-h-10 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    {item.action}
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Customer Reviews
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Feedback and ratings from your customers.
              </p>
            </div>

            <span className="w-fit rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
              {reviews.length}{" "}
              {reviews.length === 1 ? "Review" : "Reviews"}
            </span>
          </div>

          {reviews.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-white">
                <Star className="size-6 text-slate-400" />
              </div>

              <p className="mt-4 font-semibold text-slate-800">
                No reviews yet
              </p>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Customer reviews will appear here after
                customers review your completed jobs.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {review.customer?.name || "Customer"}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {review.booking?.service?.title || "Service"}
                      </p>
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

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {review.comment}
                  </p>

                  {review.createdAt && (
                    <p className="mt-3 text-xs text-slate-400">
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString("en-BD", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Getting Started */}
        <section className="rounded-2xl bg-slate-900 p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-400">
                GET STARTED
              </p>

              <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                Grow Your Service Business
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Create your first service and let customers
                discover and book your services.
              </p>
            </div>

            <Link
              href="/technician-dashboard/services"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-blue-50"
            >
              Create Your First Service
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
