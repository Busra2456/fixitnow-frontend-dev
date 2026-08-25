import { getCustomerBookings } from "../../_actions/getCustomerBookings";

type Booking = {
  id: string;
  bookingDate: string;
  totalPrice: number | string;
  status: string;
  service?: {
    title?: string;
  } | null;
  technician?: {
    name?: string;
  } | null;
};

export default async function CustomerBookingsPage() {
  const result = await getCustomerBookings();

  if (!result.success) {
    return (
      <div className="p-6">
        <div className="rounded-xl border bg-background p-6">
          <h1 className="text-xl font-semibold">
            My Bookings
          </h1>

          <p className="mt-2 text-sm text-destructive">
            {result.message || "Failed to load bookings."}
          </p>
        </div>
      </div>
    );
  }

  const bookings: Booking[] = result.data ?? [];

  return (
    <div className="p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold">
          My Bookings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View and manage your service bookings.
        </p>

        {bookings.length === 0 ? (
          <div className="mt-6 rounded-xl border bg-background p-6 text-center">
            <p className="text-muted-foreground">
              No bookings found.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {bookings.map((booking: Booking) => (
              <div
                key={booking.id}
                className="rounded-xl border bg-background p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-semibold">
                      {booking.service?.title || "Service"}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Technician:{" "}
                      {booking.technician?.name || "Technician"}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                    {booking.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">
                      Booking Date
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {new Date(
                        booking.bookingDate
                      ).toLocaleString("en-BD")}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">
                      Total Price
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      ৳
                      {Number(
                        booking.totalPrice
                      ).toLocaleString("en-BD")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}