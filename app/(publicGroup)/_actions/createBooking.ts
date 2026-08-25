"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

type CreateBookingPayload = {
  serviceId: string;
  bookingDate: string;
};

type CreateBookingResponse = {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: unknown;
};

export async function createBooking(
  payload: CreateBookingPayload
) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!API_URL) {
    return {
      success: false,
      message: "BACKEND_API_URL is not configured.",
    };
  }

  if (!accessToken) {
    return {
      success: false,
      message: "Please login before booking a service.",
    };
  }

  try {
    const response = await fetch(`${API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        serviceId: payload.serviceId,
        bookingDate: payload.bookingDate,
      }),
      cache: "no-store",
    });

    const text = await response.text();

    let result: CreateBookingResponse;

    try {
      result = JSON.parse(text);
    } catch {
      console.error("Booking API returned:", text);

      return {
        success: false,
        message: "Backend returned an invalid response.",
      };
    }

    if (!response.ok || !result.success) {
      return {
        success: false,
        message:
          result.message || "Failed to create booking.",
      };
    }

    return {
      success: true,
      message:
        result.message || "Booking created successfully.",
      data: result.data,
    };
  } catch (error) {
    console.error("Create booking error:", error);

    return {
      success: false,
      message: "Could not connect to backend server.",
    };
  }
}