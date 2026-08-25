"use client";

import { useState } from "react";
import { cancelBooking } from "../_actions/customerBookingActions";

type CancelBookingButtonProps = {
  bookingId: string;
};

export default function CancelBookingButton({
  bookingId,
}: CancelBookingButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const result = await cancelBooking(bookingId);

      if (!result.success) {
        alert(result.message || "Failed to cancel booking.");
        return;
      }

      alert("Booking cancelled successfully.");

      window.location.reload();
    } catch {
      alert("Something went wrong while cancelling the booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={loading}
      className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Cancelling..." : "Cancel Booking"}
    </button>
  );
}