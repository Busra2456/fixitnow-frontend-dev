"use client";

import { useEffect, useState } from "react";
import BookingStatusBadge from "./BookingStatusBadge";
import { getCustomerBookings } from "../_actions/customerBookingActions";

type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

type Booking = {
  id: string;
  bookingDate: string;
  totalPrice: number;
  status: BookingStatus;
  technician: {
    name: string;
  };
  service: {
    title: string;
    price: number;
  };
};

type BookingResponse = {
  success: boolean;
  message?: string;
  data?: Booking[];
};

const BookingTable = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          (await getCustomerBookings()) as BookingResponse;

        if (!result.success) {
          setError(
            result.message || "Failed to load bookings."
          );
          return;
        }

        setBookings(result.data ?? []);
      } catch (error) {
        console.error("Failed to load bookings:", error);

        setError(
          "Something went wrong while loading bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  const formatTime = (date: string) => {
    return new Intl.DateTimeFormat("en-BD", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <section>
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Booking History
        </h2>

        <p className="text-sm text-muted-foreground">
          Track and manage your service bookings.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-xl border bg-background p-8 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">
            Loading bookings...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <p className="text-sm text-destructive">
            {error}
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && bookings.length === 0 && (
        <div className="rounded-xl border bg-background p-8 text-center shadow-sm">
          <h3 className="font-semibold">
            No bookings found
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            You haven&apos;t made any service bookings yet.
          </p>
        </div>
      )}

      {/* Booking Table */}
      {!loading && !error && bookings.length > 0 && (
        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-5 py-4 text-left font-semibold">
                    Service
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Technician
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Date
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Time
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Price
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b last:border-0"
                  >
                    {/* Service */}
                    <td className="px-5 py-4 font-medium">
                      {booking.service?.title || "Service"}
                    </td>

                    {/* Technician */}
                    <td className="px-5 py-4">
                      {booking.technician?.name ||
                        "Technician"}
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">
                      {formatDate(booking.bookingDate)}
                    </td>

                    {/* Time */}
                    <td className="px-5 py-4">
                      {formatTime(booking.bookingDate)}
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 font-medium">
                      ৳
                      {booking.totalPrice.toLocaleString(
                        "en-BD"
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <BookingStatusBadge
                        status={booking.status}
                      />
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        {/* Pay Now */}
                        {booking.status === "ACCEPTED" && (
                          <button
                            type="button"
                            className="rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90"
                          >
                            Pay Now
                          </button>
                        )}

                        {/* Leave Review */}
                        {booking.status === "COMPLETED" && (
                          <button
                            type="button"
                            className="rounded-md border px-3 py-2 text-xs font-medium transition hover:bg-muted"
                          >
                            Leave Review
                          </button>
                        )}

                        {/* No Action */}
                        {[
                          "REQUESTED",
                          "DECLINED",
                          "PAID",
                          "IN_PROGRESS",
                          "CANCELLED",
                        ].includes(booking.status) && (
                          <span className="text-xs text-muted-foreground">
                            No action
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookingTable;