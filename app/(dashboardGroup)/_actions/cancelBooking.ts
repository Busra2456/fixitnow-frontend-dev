"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

export async function cancelBooking(bookingId: string) {
  try {
    if (!API_URL) {
      return {
        success: false,
        message: "Backend API URL is not configured.",
      };
    }

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "You are not authenticated.",
      };
    }

    const response = await fetch(
      `${API_URL}/api/bookings/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "CANCELLED",
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          data?.message || "Failed to cancel booking.",
      };
    }

    return {
      success: true,
      message: "Booking cancelled successfully.",
      data,
    };
  } catch (error) {
    console.error("Cancel booking error:", error);

    return {
      success: false,
      message: "Something went wrong while cancelling booking.",
    };
  }
}