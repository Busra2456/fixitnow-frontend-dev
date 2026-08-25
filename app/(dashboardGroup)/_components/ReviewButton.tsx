"use client";

import { useState } from "react";
import { createReview } from "../_actions/customerReviewActions";

type ReviewButtonProps = {
  bookingId: string;
};

export default function ReviewButton({
  bookingId,
}: ReviewButtonProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (loading) return;

    setMessage("");

    if (!comment.trim()) {
      setMessage("Please write a comment.");
      return;
    }

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
      {/* Leave Review Button */}
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setMessage("");
        }}
        className="rounded-md bg-black px-3 py-2 text-xs font-medium text-white transition hover:opacity-90"
      >
        Leave Review
      </button>

      {/* Modal */}
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
                  Rate your technician and share your
                  experience.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                aria-label="Close review modal"
                className="text-2xl leading-none text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                ×
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
                    className={`text-3xl transition hover:scale-110 ${
                      star <= rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    } disabled:cursor-not-allowed`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
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
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !comment.trim()}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
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