"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createBooking,
  type BookingState,
} from "../_actions/createBooking";

type BookingFormProps = {
  serviceId: string;
};

const initialState: BookingState = {
  success: false,
  message: "",
};

export default function BookingForm({
  serviceId,
}: BookingFormProps) {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    createBooking,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.push("/customer-dashboard");
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-5">
      {/* IMPORTANT */}
      <input
        type="hidden"
        name="serviceId"
        value={serviceId}
      />

      <div>
        <label
          htmlFor="bookingDate"
          className="mb-2 block text-sm font-medium"
        >
          Booking Date
        </label>

        <input
          id="bookingDate"
          name="bookingDate"
          type="datetime-local"
          required
          className="w-full rounded-md border bg-background px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="address"
          className="mb-2 block text-sm font-medium"
        >
          Address
        </label>

        <textarea
          id="address"
          name="address"
          required
          rows={3}
          className="w-full rounded-md border bg-background px-3 py-2"
          placeholder="Enter your service address"
        />
      </div>

      <div>
        <label
          htmlFor="notes"
          className="mb-2 block text-sm font-medium"
        >
          Notes
        </label>

        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="w-full rounded-md border bg-background px-3 py-2"
          placeholder="Any additional instructions?"
        />
      </div>

      {state.message && !state.success && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {state.message}
        </div>
      )}

      {state.success && (
        <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-600">
          Booking created successfully.
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Creating Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
}