import { CustomerStats } from "./_components/CustomerStats";
import UpcomingBooking from "./_components/UpcomingBooking";
import BookingTable from "./_components/BookingTable";
import QuickActions from "../_components/QuickActions";

export default function CustomerDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Customer Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your bookings and service requests.
          </p>
        </div>

        {/* Statistics */}
        <section>
          <CustomerStats />
        </section>

        {/* Upcoming Booking */}
        <section className="mt-6">
          <UpcomingBooking />
        </section>

        {/* Booking History */}
        <section className="mt-6">
          <BookingTable />
        </section>

        {/* Quick Actions */}
        <section className="mt-6 pb-8">
          <QuickActions />
        </section>

      </div>
    </main>
  );
}