
import { CalendarClock, Clock3, Sparkles } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AvailabilityForm from "../../_components/AvailabilityForm";
import { getTechnicianAvailability } from "../../_actions/technicianAvailabilityActions";

export default async function AvailabilityPage() {
  const result = await getTechnicianAvailability();

  if (!result.success || !result.data) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            className="rounded-2xl border border-red-200 bg-red-50 p-5"
            role="alert"
          >
            <h2 className="font-semibold text-red-700">
              Unable to load availability
            </h2>
            <p className="mt-1 text-sm text-red-600">
              {result.message || "Failed to load availability."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Link
  href="/technician-dashboard"
  className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
>
  <ArrowLeft className="size-4" />
  Back to Dashboard
</Link>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* Page Header */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Technician Dashboard
              </span>
              <Sparkles className="size-4 text-blue-500" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Manage Availability
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Set your working hours and manage when customers can book
              your services.
            </p>
          </div>

          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200">
            <CalendarClock className="size-7" />
          </div>
        </section>

        {/* Availability Information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock3 className="size-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Working Schedule
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Configure your availability and preferred working hours.
              </p>
            </div>
          </div>

          <AvailabilityForm
            initialIsAvailable={result.data.isAvailable ?? true}
            initialAvailableFrom={result.data.availableFrom ?? "09:00"}
            initialAvailableTo={result.data.availableTo ?? "18:00"}
          />
        </section>
      </div>
    </main>
  );
}
