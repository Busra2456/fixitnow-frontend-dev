import Link from "next/link";

import { getMe } from "@/service/getMe";

import { getTechnicianBookings } from "../_actions/technicianBookingActions";
import { getMyTechnicianServices } from "../_actions/getTechnicianServices";
import { getTechnicianReviews } from "./_actions/reviewActions";

export default async function TechnicianDashboardPage() {
  const [bookingResult, serviceResult, meResult] =
    await Promise.all([
      getTechnicianBookings(),
      getMyTechnicianServices(),
      getMe(),
    ]);

  const bookings = bookingResult.success
    ? bookingResult.data ?? []
    : [];

  const services = serviceResult.success
    ? serviceResult.data ?? []
    : [];

  const technicianId = meResult.success
    ? meResult.data?.id
    : null;

  // Get technician reviews
  const reviewResult = technicianId
    ? await getTechnicianReviews(technicianId)
    : {
        success: false,
        message: "Technician ID not found",
        data: [],
      };

  const reviews = reviewResult.success
    ? reviewResult.data ?? []
    : [];

  

  const totalServices = services.length;

  const pendingRequests = bookings.filter(
    (booking) => booking.status === "REQUESTED"
  ).length;

  const completedJobs = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  ).length;

  const totalEarnings = bookings
    .filter(
      (booking) => booking.status === "COMPLETED"
    )
    .reduce(
      (total, booking) =>
        total + Number(booking.totalPrice),
      0
    );

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-6xl">

        
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Technician Dashboard
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your services, bookings, availability
            and earnings.
          </p>
        </div>

      

        {!serviceResult.success && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            Failed to load your services:{" "}
            {serviceResult.message ||
              "Unknown error"}
          </div>
        )}

        {!bookingResult.success && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            Failed to load your bookings:{" "}
            {bookingResult.message ||
              "Unknown error"}
          </div>
        )}

        {!meResult.success && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            Failed to load technician information:{" "}
            {meResult.message ||
              "Unknown error"}
          </div>
        )}

        {!reviewResult.success && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            Failed to load reviews:{" "}
            {reviewResult.message ||
              "Unknown error"}
          </div>
        )}

        

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Services */}
          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Total Services
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {totalServices}
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Services you provide
            </p>
          </div>

          {/* Pending Requests */}
          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Pending Requests
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {pendingRequests}
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Waiting for your response
            </p>
          </div>

          {/* Completed Jobs */}
          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Completed Jobs
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {completedJobs}
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Successfully completed
            </p>
          </div>

          {/* Total Earnings */}
          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Total Earnings
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              ৳
              {totalEarnings.toLocaleString("en-BD")}
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              From completed jobs
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">
            Quick Actions
          </h2>

          <div className="grid gap-4 md:grid-cols-3">

            {/* Manage Services */}
            <Link
              href="/technician-dashboard/services"
              className="rounded-xl border bg-background p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="font-semibold">
                Manage Services
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Create, view and delete the services
                you provide.
              </p>

              <span className="mt-4 inline-block text-sm font-medium text-primary">
                Manage Services →
              </span>
            </Link>

            {/* Manage Bookings */}
            <Link
              href="/technician-dashboard/bookings"
              className="rounded-xl border bg-background p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="font-semibold">
                Manage Bookings
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Accept, decline and complete customer
                bookings.
              </p>

              <span className="mt-4 inline-block text-sm font-medium text-primary">
                View Bookings →
              </span>
            </Link>

            {/* Availability */}
            <Link
              href="/technician-dashboard/availability"
              className="rounded-xl border bg-background p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="font-semibold">
                Availability
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Set your working hours and availability.
              </p>

              <span className="mt-4 inline-block text-sm font-medium text-primary">
                Set Availability →
              </span>
            </Link>
          </div>
        </div>

        

        <div className="mt-8 rounded-xl border bg-background p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Customer Reviews
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Reviews from your customers
              </p>
            </div>

            <div className="rounded-full bg-muted px-3 py-1 text-sm font-medium">
              {reviews.length}{" "}
              {reviews.length === 1
                ? "Review"
                : "Reviews"}
            </div>
          </div>

          {/* No Reviews */}
          {reviews.length === 0 ? (
            <div className="mt-6 rounded-lg border border-dashed p-8 text-center">
              <p className="font-medium">
                No reviews yet
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Customer reviews will appear here
                after customers review your completed
                jobs.
              </p>
            </div>
          ) : (
            /* Reviews */
            <div className="mt-6 space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    {/* Customer */}
                    <div>
                      <p className="font-semibold">
                        {review.customer?.name ||
                          "Customer"}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {review.booking?.service
                          ?.title || "Service"}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="text-sm">
                      {"⭐".repeat(
                        Number(review.rating)
                      )}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="mt-4 text-sm leading-6">
                    {review.comment}
                  </p>

                  {/* Date */}
                  {review.createdAt && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString(
                        "en-BD",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className="mt-8 rounded-xl border bg-background p-6 shadow-sm">
          <h2 className="text-lg font-semibold">
            Getting Started
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Start by creating a service that customers
            can book.
          </p>

          <Link
            href="/technician-dashboard/services"
            className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Create Your First Service
          </Link>
        </div>

      </div>
    </div>
  );
}