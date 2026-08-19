"use client";

import { useState } from "react";

interface ReviewFormProps {
  bookingId?: string;
  technicianName?: string;
}

const ReviewForm = ({
  bookingId,
  technicianName = "Technician",
}: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rating) {
      return;
    }

    console.log({
      bookingId,
      rating,
      comment,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <h3 className="text-lg font-semibold">
          Thank you for your review!
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Your feedback has been submitted successfully.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold">
          Leave a Review
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Share your experience with {technicianName}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
                className={`text-2xl transition ${
                  star <= rating
                    ? "text-yellow-500"
                    : "text-muted-foreground"
                }`}
                aria-label={`Rate ${star} out of 5`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label
            htmlFor="review-comment"
            className="text-sm font-medium"
          >
            Your Review
          </label>

          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience..."
            rows={4}
            className="mt-2 w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!rating}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;