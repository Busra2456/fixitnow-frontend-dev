"use client";

import { useState } from "react";
import { createPayment } from "../_actions/customerPaymentActions";

type PayNowButtonProps = {
  bookingId: string;
};

export default function PayNowButton({
  bookingId,
}: PayNowButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const result = await createPayment(
        bookingId
      );

      if (!result.success) {
        setError(result.message);
        return;
      }

      const gatewayUrl =
        result.data?.gatewayUrl;

      if (!gatewayUrl) {
        setError(
          "Payment gateway URL was not received."
        );
        return;
      }

      window.location.href = gatewayUrl;
    } catch (error) {
      console.error(
        "Payment error:",
        error
      );

      setError(
        "Something went wrong while starting payment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handlePayment}
        disabled={loading}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {error && (
        <p className="max-w-[220px] text-right text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}