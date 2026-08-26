"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaWallet,
  FaSearch,
  FaUsers,
} from "react-icons/fa";

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

export const CustomerStats = () => {
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
      (total, booking) =>
        total + Number(booking.totalPrice),
      0
    );


  const stats = [
    {
      title: "Total Bookings",
      value: loading
        ? "..."
        : totalBookings.toString(),
      description: "All your bookings",
      icon: FaCalendarCheck,
    },
    {
      title: "Pending Bookings",
      value: loading
        ? "..."
        : pendingBookings.toString(),
      description: "Waiting for technician",
      icon: FaClock,
    },
    {
      title: "Completed Jobs",
      value: loading
        ? "..."
        : completedJobs.toString(),
      description: "Successfully completed",
      icon: FaCheckCircle,
    },
    {
      title: "Total Spent",
      value: loading
        ? "..."
        : `৳${totalSpent.toLocaleString("en-BD")}`,
      description: "Total service payment",
      icon: FaWallet,
    },
  ];

  
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border bg-background p-5 shadow-sm transition hover:shadow-md"
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="text-lg text-primary" />
              </div>
            </div>

            {/* Value */}
            <h2 className="mt-4 text-2xl font-bold">
              {stat.value}
            </h2>

            {/* Description */}
            <p className="mt-1 text-xs text-muted-foreground">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export const QuickActions = () => {
  return (
    <section>
      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Quickly find the service or technician you need.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid gap-4 sm:grid-cols-2">

        {/* Browse Services */}
        <Link
          href="/services"
          className="group rounded-xl border bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <FaSearch className="text-lg text-primary" />
            </div>

            <div>
              <h3 className="font-semibold">
                Browse Services
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Find the right service for your needs.
              </p>
            </div>
          </div>
        </Link>

        {/* Find Technicians */}
        <Link
          href="/technicians"
          className="group rounded-xl border bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <FaUsers className="text-lg text-primary" />
            </div>

            <div>
              <h3 className="font-semibold">
                Find Technicians
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Find trusted technicians for your service.
              </p>
            </div>
          </div>
        </Link>

      </div>
    </section>
  );
};