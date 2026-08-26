"use client";

import { useEffect, useState } from "react";
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

  technician?: {
    name: string;
  };

  service?: {
    title: string;
  };
};

const UpcomingBooking = () => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUpcomingBooking = async () => {
      try {
        const result = await getCustomerBookings();

        if (!result.success || !result.data) {
          return;
        }

        const now = new Date();

        const upcoming = result.data
          .filter((item: Booking) => {
            const bookingDate = new Date(item.bookingDate);

            return (
              bookingDate >= now &&
              !["COMPLETED", "CANCELLED", "DECLINED"].includes(
                item.status
              )
            );
          })
          .sort(
            (a: Booking, b: Booking) =>
              new Date(a.bookingDate).getTime() -
              new Date(b.bookingDate).getTime()
          )[0];

        setBooking(upcoming || null);
      } catch (error) {
        console.error(
          "Failed to load upcoming booking:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadUpcomingBooking();
  }, []);

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-BD", {
      day: "2-digit",
      month: "long",
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
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Upcoming Booking
        </h2>

        <p className="text-sm text-muted-foreground">
          Your next scheduled service.
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl border bg-background p-8 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">
            Loading upcoming booking...
          </p>
        </div>
      ) : !booking ? (
        <div className="rounded-xl border bg-background p-8 text-center shadow-sm">
          <h3 className="font-semibold">
            No upcoming booking
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            You do not have any upcoming service scheduled.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Service */}
            <div>
              <p className="text-sm text-muted-foreground">
                Service
              </p>

              <h3 className="mt-1 text-lg font-semibold">
                {booking.service?.title || "Service"}
              </h3>
            </div>

            {/* Technician */}
            <div>
              <p className="text-sm text-muted-foreground">
                Technician
              </p>

              <p className="mt-1 font-medium">
                {booking.technician?.name || "Technician"}
              </p>
            </div>

            {/* Date & Time */}
            <div>
              <p className="text-sm text-muted-foreground">
                Date & Time
              </p>

              <p className="mt-1 font-medium">
                {formatDate(booking.bookingDate)}
              </p>

              <p className="text-sm text-muted-foreground">
                {formatTime(booking.bookingDate)}
              </p>
            </div>

            {/* Price & Status */}
            <div>
              <p className="text-sm text-muted-foreground">
                Price
              </p>

              <p className="mt-1 text-lg font-bold">
                ৳{booking.totalPrice.toLocaleString("en-BD")}
              </p>

              <span className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                {booking.status}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3 border-t pt-5">
            <button
              type="button"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              View Details
            </button>

            {booking.status === "ACCEPTED" && (
              <button
                type="button"
                className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
              >
                Pay Now
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default UpcomingBooking;