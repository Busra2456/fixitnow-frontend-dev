"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

export const getCustomerBookings = async () => {
  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "User not authenticated",
        data: [],
      };
    }

    const res = await fetch(`${API_URL}/api/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();

    return {
      ...result,
      statusCode: res.status,
    };
  } catch (error) {
    console.error("Failed to get bookings:", error);

    return {
      success: false,
      message: "Failed to get bookings",
      data: [],
    };
  }
};

export const cancelBooking = async (
  bookingId: string
) => {
  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const res = await fetch(
      `${API_URL}/api/bookings/${bookingId}/cancel`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    return {
      ...result,
      statusCode: res.status,
    };
  } catch (error) {
    console.error("Failed to cancel booking:", error);

    return {
      success: false,
      message: "Failed to cancel booking",
    };
  }
};