"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "../_actions/createBooking";

type BookingFormProps = {
  serviceId: string;
  serviceTitle: string;
  technicianName: string;
  price: number;
};

export default function BookingForm({
  serviceId,
  serviceTitle,
  technicianName,
  price,
}: BookingFormProps) {
  const router = useRouter();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBooking = async () => {
    setError("");

    // Date validation
    if (!date) {
      setError("Please select a date.");
      return;
    }

    // Time validation
    if (!time) {
      setError("Please select a time.");
      return;
    }

    // Create booking date
    const bookingDate = `${date}T${time}:00`;

    const selectedDate = new Date(bookingDate);

    // Invalid date
    if (Number.isNaN(selectedDate.getTime())) {
      setError("Please select a valid date and time.");
      return;
    }

    // Past date/time
    if (selectedDate <= new Date()) {
      setError("Please select a future date and time.");
      return;
    }

    setLoading(true);

    try {
      const result = await createBooking({
        serviceId,
        bookingDate,
      });

      // Backend error
      if (!result.success) {
        setError(
          result.message || "Failed to create booking."
        );
        return;
      }

      // Booking successful
      router.push("/customer-dashboard");
      router.refresh();
    } catch (error) {
      console.error("Booking error:", error);

      setError("Something went wrong while creating the booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-background p-6 shadow-sm">
      {/* Booking Summary */}
      <div className="border-b pb-5">
        <p className="text-sm text-muted-foreground">
          Service
        </p>

        <h2 className="mt-1 text-xl font-semibold">
          {serviceTitle}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Technician: {technicianName}
        </p>

        <p className="mt-3 text-lg font-bold">
          ৳{Number(price).toLocaleString("en-BD")}
        </p>
      </div>

      {/* Date */}
      <div className="mt-6">
        <label
          htmlFor="booking-date"
          className="text-sm font-medium"
        >
          Select Date
        </label>

        <input
          id="booking-date"
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          disabled={loading}
          className="mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Time */}
      <div className="mt-5">
        <label
          htmlFor="booking-time"
          className="text-sm font-medium"
        >
          Select Time
        </label>

        <input
          id="booking-time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          disabled={loading}
          className="mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Booking Schedule */}
      {date && time && (
        <div className="mt-5 rounded-lg bg-muted/50 p-4">
          <p className="text-sm font-medium">
            Booking Schedule
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {date} at {time}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
          <p className="text-sm text-destructive">
            {error}
          </p>
        </div>
      )}

      {/* Confirm Booking */}
      <button
        type="button"
        onClick={handleBooking}
        disabled={loading}
        className="mt-6 w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Creating Booking..."
          : "Confirm Booking"}
      </button>
    </div>
  );
}