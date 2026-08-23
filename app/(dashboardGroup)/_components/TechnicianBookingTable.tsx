"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  updateTechnicianBookingStatus,
  type BookingStatus,
  type TechnicianBooking,
} from "../_actions/technicianBookingActions";

type Props = {
  initialBookings: TechnicianBooking[];
};

export default function TechnicianBookingTable({
  initialBookings,
}: Props) {
  const router = useRouter();

  const [bookings, setBookings] =
    useState<TechnicianBooking[]>(initialBookings);

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const handleStatusUpdate = async (
    bookingId: string,
    status: BookingStatus
  ) => {
    setUpdatingId(bookingId);

    try {
      const result =
        await updateTechnicianBookingStatus(
          bookingId,
          status
        );

      if (!result.success) {
        alert(
          result.message ||
            "Failed to update booking status."
        );

        return;
      }

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status,
              }
            : booking
        )
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Booking status update error:",
        error
      );

      alert(
        "Something went wrong while updating booking."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusClass = (
    status: BookingStatus
  ) => {
    switch (status) {
      case "REQUESTED":
        return "bg-yellow-100 text-yellow-800";

      case "ACCEPTED":
        return "bg-blue-100 text-blue-800";

      case "DECLINED":
        return "bg-red-100 text-red-800";

      case "PAID":
        return "bg-purple-100 text-purple-800";

      case "IN_PROGRESS":
        return "bg-green-100 text-green-800";

      case "COMPLETED":
        return "bg-gray-100 text-gray-800";

      case "CANCELLED":
        return "bg-red-200 text-red-900";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (
    status: BookingStatus
  ) => {
    return status.replaceAll("_", " ");
  };

  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border bg-background p-8 text-center shadow-sm">
        <h2 className="font-semibold">
          No bookings found
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          You do not have any customer bookings yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">

          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold">
                Customer
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Service
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Booking Date
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Price
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">

            {bookings.map((booking) => {
              const isUpdating =
                updatingId === booking.id;

              return (
                <tr
                  key={booking.id}
                  className="hover:bg-muted/30"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium">
                        {booking.customer?.name ||
                          "Unknown customer"}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {booking.customer?.email ||
                          "No email"}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium">
                      {booking.service?.title ||
                        "Unknown service"}
                    </p>

                    {booking.service?.category && (
                      <p className="text-xs text-muted-foreground">
                        {
                          booking.service.category
                            .name
                        }
                      </p>
                    )}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {new Date(
                      booking.bookingDate
                    ).toLocaleString("en-BD", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>

                  <td className="px-5 py-4 font-medium">
                    ৳
                    {Number(
                      booking.totalPrice
                    ).toLocaleString("en-BD")}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        booking.status
                      )}`}
                    >
                      {formatStatus(
                        booking.status
                      )}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <BookingActions
                      booking={booking}
                      isUpdating={isUpdating}
                      onUpdate={handleStatusUpdate}
                    />
                  </td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 p-4 md:hidden">

        {bookings.map((booking) => {
          const isUpdating =
            updatingId === booking.id;

          return (
            <div
              key={booking.id}
              className="rounded-lg border p-4"
            >
              <div className="flex items-start justify-between gap-3">

                <div>
                  <h2 className="font-semibold">
                    {booking.service?.title ||
                      "Unknown service"}
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {booking.customer?.name ||
                      "Unknown customer"}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    booking.status
                  )}`}
                >
                  {formatStatus(
                    booking.status
                  )}
                </span>

              </div>

              <div className="mt-4 space-y-2 text-sm">

                <p>
                  <span className="font-medium">
                    Date:
                  </span>{" "}
                  {new Date(
                    booking.bookingDate
                  ).toLocaleString("en-BD", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>

                <p>
                  <span className="font-medium">
                    Price:
                  </span>{" "}
                  ৳
                  {Number(
                    booking.totalPrice
                  ).toLocaleString("en-BD")}
                </p>

                <p>
                  <span className="font-medium">
                    Email:
                  </span>{" "}
                  {booking.customer?.email ||
                    "No email"}
                </p>

              </div>

              <div className="mt-4">
                <BookingActions
                  booking={booking}
                  isUpdating={isUpdating}
                  onUpdate={handleStatusUpdate}
                />
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

type BookingActionsProps = {
  booking: TechnicianBooking;
  isUpdating: boolean;
  onUpdate: (
    bookingId: string,
    status: BookingStatus
  ) => Promise<void>;
};

function BookingActions({
  booking,
  isUpdating,
  onUpdate,
}: BookingActionsProps) {
  if (booking.status === "REQUESTED") {
    return (
      <div className="flex flex-wrap gap-2">

        <button
          type="button"
          disabled={isUpdating}
          onClick={() =>
            onUpdate(
              booking.id,
              "ACCEPTED"
            )
          }
          className="rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUpdating
            ? "Updating..."
            : "Accept"}
        </button>

        <button
          type="button"
          disabled={isUpdating}
          onClick={() =>
            onUpdate(
              booking.id,
              "DECLINED"
            )
          }
          className="rounded-md border border-destructive px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUpdating
            ? "Updating..."
            : "Decline"}
        </button>

      </div>
    );
  }

  if (booking.status === "PAID") {
    return (
      <button
        type="button"
        disabled={isUpdating}
        onClick={() =>
          onUpdate(
            booking.id,
            "IN_PROGRESS"
          )
        }
        className="rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isUpdating
          ? "Starting..."
          : "Start Job"}
      </button>
    );
  }

  if (booking.status === "IN_PROGRESS") {
    return (
      <button
        type="button"
        disabled={isUpdating}
        onClick={() =>
          onUpdate(
            booking.id,
            "COMPLETED"
          )
        }
        className="rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isUpdating
          ? "Completing..."
          : "Complete Job"}
      </button>
    );
  }

  return (
    <span className="text-xs text-muted-foreground">
      No action available
    </span>
  );
}