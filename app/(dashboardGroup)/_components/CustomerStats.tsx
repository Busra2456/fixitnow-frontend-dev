"use client";

import {
  CalendarCheck,
  Clock3,
  CheckCircle2,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCustomerBookings } from "../_actions/customerBookingActions";

type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

type Booking = {
  id: string;
  totalPrice: number;
  status: BookingStatus;
};

const CustomerStats = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);

        const result = await getCustomerBookings();

        console.log("Customer bookings:", result);

        if (result.success) {
          setBookings(result.data ?? []);
        } else {
          console.error(
            "Failed to get bookings:",
            result.message
          );

          setBookings([]);
        }
      } catch (error) {
        console.error(
          "Failed to load customer stats:",
          error
        );

        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "REQUESTED"
  ).length;

  const completedJobs = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  ).length;

  const totalSpent = bookings
    .filter((booking) =>
      ["PAID", "IN_PROGRESS", "COMPLETED"].includes(
        booking.status
      )
    )
    .reduce(
      (total, booking) => total + booking.totalPrice,
      0
    );

  const stats = [
    {
      title: "Total Bookings",
      value: loading ? "..." : totalBookings.toString(),
      description: "All your bookings",
      icon: CalendarCheck,
    },
    {
      title: "Pending Bookings",
      value: loading
        ? "..."
        : pendingBookings.toString(),
      description: "Waiting for technician",
      icon: Clock3,
    },
    {
      title: "Completed Jobs",
      value: loading
        ? "..."
        : completedJobs.toString(),
      description: "Successfully completed",
      icon: CheckCircle2,
    },
    {
      title: "Total Spent",
      value: loading
        ? "..."
        : `৳${totalSpent.toLocaleString("en-BD")}`,
      description: "Total service payment",
      icon: Wallet,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>

              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              {stat.value}
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerStats;