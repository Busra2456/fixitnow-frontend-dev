"use client";

import { useState } from "react";
import {
  FaStar,
  FaTimes,
  FaCheck,
  FaCreditCard,
  FaTimesCircle
} from "react-icons/fa";

import { createReview } from "../_actions/customerBookingActions";
import { createPayment } from "../../_actions/customerPaymentActions";
import { cancelBooking } from "../_actions/customerBookingActions";

type CancelBookingButtonProps = {
  bookingId: string;
};

type ButtonProps = {
  bookingId: string;
};


export function ReviewButton({ bookingId }: ButtonProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (loading) return;

    setMessage("");

    // Comment validation
    if (!comment.trim()) {
      setMessage("Please write a comment.");
      return;
    }

    // Rating validation
    if (rating < 1 || rating > 5) {
      setMessage("Please select a rating between 1 and 5.");
      return;
    }

    setLoading(true);

    try {
      const result = await createReview(
        bookingId,
        rating,
        comment.trim()
      );

      if (!result.success) {
        setMessage(
          result.message || "Failed to submit review."
        );
        return;
      }

      setMessage("Review submitted successfully!");

      setComment("");
      setRating(5);

      setTimeout(() => {
        setOpen(false);
        setMessage("");
      }, 1000);
    } catch (error) {
      console.error("Review submission error:", error);

      setMessage(
        "Something went wrong while submitting the review."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;

    setOpen(false);
    setMessage("");
  };

  return (
    <>

      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setMessage("");
        }}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90"
      >
        <FaStar className="text-yellow-300" />
        Leave Review
      </button>


      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-background p-6 shadow-xl">

            {/* Header */}
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  Leave a Review
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Rate your technician and share your experience.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                aria-label="Close review modal"
                className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-muted hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaTimes />
              </button>
            </div>

            {/* Rating */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium">
                Rating
              </label>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    disabled={loading}
                    aria-label={`Rate ${star} out of 5`}
                    className="text-2xl transition hover:scale-110 disabled:cursor-not-allowed"
                  >
                    <FaStar
                      className={
                        star <= rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                {rating} out of 5
              </p>
            </div>

            {/* Comment */}
            <div className="mb-4">
              <label
                htmlFor={`review-${bookingId}`}
                className="mb-2 block text-sm font-medium"
              >
                Comment
              </label>

              <textarea
                id={`review-${bookingId}`}
                value={comment}
                onChange={(event) =>
                  setComment(event.target.value)
                }
                disabled={loading}
                placeholder="Tell us about your experience..."
                rows={4}
                maxLength={500}
                className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              />

              <p className="mt-1 text-right text-xs text-muted-foreground">
                {comment.length}/500
              </p>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`mb-4 rounded-md border p-3 text-sm ${
                  message.includes("successfully")
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              {/* Cancel */}
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaTimes />
                Cancel
              </button>

              {/* Submit */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !comment.trim()}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaCheck />

                {loading
                  ? "Submitting..."
                  : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



export function PayNowButton({ bookingId }: ButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const result = await createPayment(bookingId);

      if (!result.success) {
        setError(
          result.message || "Payment failed."
        );
        return;
      }

      const gatewayUrl = result.data?.gatewayUrl;

      if (!gatewayUrl) {
        setError(
          "Payment gateway URL was not received."
        );
        return;
      }

      // Go to payment gateway
      window.location.href = gatewayUrl;
    } catch (error) {
      console.error("Payment error:", error);

      setError(
        "Something went wrong while starting payment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      {/* Pay Button */}
      <button
        type="button"
        onClick={handlePayment}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FaCreditCard />

        {loading
          ? "Processing..."
          : "Pay Now"}
      </button>

      {/* Error */}
      {error && (
        <p className="max-w-[220px] text-right text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
  
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
      alert(
        "Something went wrong while cancelling the booking."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <FaTimesCircle />

      {loading ? "Cancelling..." : "Cancel Booking"}
    </button>
  );
}