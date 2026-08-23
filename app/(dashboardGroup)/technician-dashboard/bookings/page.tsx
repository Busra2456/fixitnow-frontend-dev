import { getTechnicianBookings } from "../../_actions/technicianBookingActions";
import TechnicianBookingTable from "../../_components/TechnicianBookingTable";

export default async function TechnicianBookingsPage() {
  const result = await getTechnicianBookings();

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Booking Management
          </h1>

          <p className="mt-2 text-muted-foreground">
            View and manage customer booking requests.
          </p>
        </div>

        {!result.success ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <p className="text-sm text-destructive">
              {result.message || "Failed to load bookings."}
            </p>
          </div>
        ) : (
          <TechnicianBookingTable
            initialBookings={result.data}
          />
        )}

      </div>
    </div>
  );
}