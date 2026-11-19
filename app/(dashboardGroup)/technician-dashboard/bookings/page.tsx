
import { ArrowLeft, CalendarCheck, ClipboardList } from "lucide-react";
import Link from "next/link";

import { getTechnicianBookings } from "../../_actions/technicianBookingActions";
import TechnicianBookingTable from "../../_components/TechnicianBookingTable";

export default async function TechnicianBookingsPage() {
  const result = await getTechnicianBookings();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* Back Navigation */}
        <Link
          href="/technician-dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>

        {/* Page Header */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Technician Dashboard
              </span>
              <CalendarCheck className="size-4 text-blue-500" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Booking Management
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Keep track of customer booking requests, manage appointments,
              and stay updated on your service activities.
            </p>
          </div>

          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200">
            <ClipboardList className="size-7" />
          </div>
        </section>

        {/* Booking Content */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Your Bookings
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review and manage your customer booking requests.
              </p>
            </div>

            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <CalendarCheck className="size-5" />
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {!result.success ? (
              <div
                className="rounded-xl border border-red-200 bg-red-50 p-5"
                role="alert"
              >
                <h3 className="font-semibold text-red-700">
                  Unable to load bookings
                </h3>
                <p className="mt-1 text-sm text-red-600">
                  {result.message || "Failed to load bookings. Please try again."}
                </p>
              </div>
            ) : (
              <TechnicianBookingTable
                initialBookings={result.data ?? []}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
