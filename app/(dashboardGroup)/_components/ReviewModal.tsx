
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createReview } from "../_actions/customerReviewActions";

interface ReviewModalProps {
  bookingId: string;
  serviceName: string;
  technicianName: string;
}

export default function ReviewModal({
  bookingId,
  serviceName,
  technicianName,
}: ReviewModalProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please write a comment.");
      return;
    }

    setLoading(true);

    const result = await createReview(
      bookingId,
      rating,
      comment
    );

    setLoading(false);

    if (!result.success) {
      toast.error(result.message || "Failed to submit review.");
      return;
    }

    toast.success("Review submitted successfully!");

    setComment("");
    setRating(5);
    setOpen(false);

    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        Leave Review
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Leave a Review
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {serviceName}
                </p>

                <p className="text-sm text-muted-foreground">
                  Technician: {technicianName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xl text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              {/* Rating */}
              <div>
                <label className="text-sm font-medium">
                  Rating
                </label>

                <div className="mt-2 flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-3xl transition ${
                        star <= rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      aria-label={`${star} star`}
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
              <div>
                <label
                  htmlFor={`comment-${bookingId}`}
                  className="text-sm font-medium"
                >
                  Your Review
                </label>

                <textarea
                  id={`comment-${bookingId}`}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How was your experience?"
                  rows={5}
                  maxLength={500}
                  className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2"
                />

                <p className="mt-1 text-right text-xs text-muted-foreground">
                  {comment.length}/500
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                  className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

