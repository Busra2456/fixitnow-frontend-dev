import Link from "next/link";

export default function TechnicianDashboardPage() {
  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Technician Dashboard
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your services, bookings, availability and earnings.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Total Services
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              0
            </h2>
          </div>

          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Pending Requests
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              0
            </h2>
          </div>

          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Completed Jobs
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              0
            </h2>
          </div>

          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Total Earnings
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              ৳0
            </h2>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">
            Quick Actions
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Services */}
            <Link
              href="/technician-dashboard/services"
              className="rounded-xl border bg-background p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="font-semibold">
                Manage Services
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Create and manage the services you provide.
              </p>

              <span className="mt-4 inline-block text-sm font-medium text-primary">
                Manage Services →
              </span>
            </Link>

            {/* Bookings */}
            <Link
              href="/technician-dashboard/bookings"
              className="rounded-xl border bg-background p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="font-semibold">
                Manage Bookings
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Accept, decline and complete customer bookings.
              </p>

              <span className="mt-4 inline-block text-sm font-medium text-primary">
                View Bookings →
              </span>
            </Link>

            {/* Availability */}
            <Link
              href="/technician-dashboard/availability"
              className="rounded-xl border bg-background p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="font-semibold">
                Availability
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Set your working hours and availability.
              </p>

              <span className="mt-4 inline-block text-sm font-medium text-primary">
                Set Availability →
              </span>
            </Link>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-8 rounded-xl border bg-background p-6 shadow-sm">
          <h2 className="text-lg font-semibold">
            Getting Started
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Start by creating a service that customers can book.
          </p>

          <Link
            href="/technician-dashboard/services"
            className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Create Your First Service
          </Link>
        </div>
      </div>
    </div>
  );
}
