
import ReviewButton, { PayNowButton } from "./AllButton";
import CancelBookingButton from "./AllButton";
import { getCustomerBookings } from "../_actions/customerBookingActions";

type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

type CustomerBooking = {
  id: string;
  bookingDate: string;
  totalPrice: number;
  status: BookingStatus;

  technician?: {
    id: string;
    name: string;
    email?: string;
  };

  service?: {
    id: string;
    title: string;
    price: number;
  };
};

export default async function BookingTable() {
  const result = await getCustomerBookings();

  const bookings: CustomerBooking[] = result.success
    ? (result.data as CustomerBooking[])
    : [];

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Booking History
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Track and manage your service bookings.
        </p>
      </div>

      {/* Error */}
      {!result.success && (
        <p className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-500">
          {result.message}
        </p>
      )}

      {/* No bookings */}
      {bookings.length === 0 ? (
        <div className="rounded-lg border bg-muted/20 p-8 text-center">
          <p className="text-sm font-medium">
            No bookings found.
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            You do not have any service bookings yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            {/* Table Header */}
            <thead>
              <tr className="border-b text-left">
                <th className="p-3 font-semibold">
                  Service
                </th>

                <th className="p-3 font-semibold">
                  Technician
                </th>

                <th className="p-3 font-semibold">
                  Date
                </th>

                <th className="p-3 font-semibold">
                  Time
                </th>

                <th className="p-3 font-semibold">
                  Price
                </th>

                <th className="p-3 font-semibold">
                  Status
                </th>

                <th className="p-3 font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b last:border-b-0 hover:bg-muted/30"
                >
                  {/* Service */}
                  <td className="p-3">
                    <span className="font-medium">
                      {booking.service?.title ?? "N/A"}
                    </span>
                  </td>

                  {/* Technician */}
                  <td className="p-3">
                    {booking.technician?.name ?? "N/A"}
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap p-3">
                    {new Date(
                      booking.bookingDate
                    ).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  {/* Time */}
                  <td className="whitespace-nowrap p-3">
                    {new Date(
                      booking.bookingDate
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  {/* Price */}
                  <td className="whitespace-nowrap p-3 font-medium">
                    ৳
                    {Number(
                      booking.totalPrice
                    ).toLocaleString("en-BD")}
                  </td>

                  {/* Status */}
                  <td className="p-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        booking.status === "REQUESTED"
                          ? "bg-yellow-100 text-yellow-700"
                          : booking.status === "ACCEPTED"
                            ? "bg-blue-100 text-blue-700"
                            : booking.status === "PAID"
                              ? "bg-purple-100 text-purple-700"
                              : booking.status === "IN_PROGRESS"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "COMPLETED"
                                  ? "bg-gray-100 text-gray-700"
                                  : booking.status === "DECLINED"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-red-200 text-red-800"
                      }`}
                    >
                      {booking.status.replace("_", " ")}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* REQUESTED */}
                      {booking.status === "REQUESTED" && (
                        <>
                          <span className="text-xs font-medium text-muted-foreground">
                            Waiting...
                          </span>

                          <CancelBookingButton
                            bookingId={booking.id}
                          />
                        </>
                      )}

                      {/* ACCEPTED */}
                      {booking.status === "ACCEPTED" && (
                        <>
                          <PayNowButton
                            bookingId={booking.id}
                          />

                          <CancelBookingButton
                            bookingId={booking.id}
                          />
                        </>
                      )}

                      {/* PAID */}
                      {booking.status === "PAID" && (
                        <span className="text-xs font-medium text-green-600">
                          ✓ Paid
                        </span>
                      )}

                      {/* IN_PROGRESS */}
                      {booking.status === "IN_PROGRESS" && (
                        <span className="text-xs font-medium text-blue-600">
                          In Progress
                        </span>
                      )}

                      {/* COMPLETED */}
                      {booking.status === "COMPLETED" && (
                        <ReviewButton
                          bookingId={booking.id}
                        />
                      )}

                      {/* DECLINED */}
                      {booking.status === "DECLINED" && (
                        <span className="text-xs font-medium text-red-500">
                          Declined
                        </span>
                      )}

                      {/* CANCELLED */}
                      {booking.status === "CANCELLED" && (
                        <span className="text-xs font-medium text-muted-foreground">
                          Cancelled
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
