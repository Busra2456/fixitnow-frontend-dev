
import { CalendarCheck, ClipboardList } from "lucide-react";

import { getTechnicianBookings } from "../../_actions/technicianBookingActions";
import TechnicianBookingTable from "../../_components/TechnicianBookingTable";

export default async function TechnicianBookingsPage() {
  const result = await getTechnicianBookings();

  return (
    <main className="min-h-screen bg-slate-50/80 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600">
              <CalendarCheck className="size-4" />
              <span>Technician Dashboard</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Booking Management
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              View customer booking requests and manage your service
              appointments from one place.
            </p>
          </div>

          <div className="flex size-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
            <ClipboardList className="size-7" />
          </div>
        </div>

        {/* Booking Content */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Your Bookings
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review and manage your customer requests.
            </p>
          </div>

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
        </section>
      </div>
    </main>
  );
}
