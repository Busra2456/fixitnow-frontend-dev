"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

export type Booking = {
  id: string;
  bookingDate: string;
  totalPrice: number | string;
  status: string;

  service?: {
    id?: string;
    title?: string;
    price?: number | string;
  } | null;

  technician?: {
    id?: string;
    name?: string;
    email?: string;
  } | null;

  customer?: {
    id?: string;
    name?: string;
    email?: string;
  } | null;
};

type BookingsResponse = {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: Booking[];
};

export async function getCustomerBookings(): Promise<BookingsResponse> {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  if (!API_URL) {
    return {
      success: false,
      message: "BACKEND_API_URL is not configured.",
    };
  }

  if (!accessToken) {
    return {
      success: false,
      message: "Please login before viewing bookings.",
    };
  }

  try {
    const response = await fetch(
      `${API_URL}/api/bookings`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const text = await response.text();

    let result: BookingsResponse;

    try {
      result = JSON.parse(text);
    } catch {
      console.error(
        "Bookings API returned non-JSON:",
        text
      );

      return {
        success: false,
        message: "Backend returned invalid JSON.",
      };
    }

    if (!response.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to load bookings.",
      };
    }

    return {
      success: true,
      statusCode:
        result.statusCode ?? response.status,
      message: result.message,
      data: result.data ?? [],
    };
  } catch (error) {
    console.error(
      "getCustomerBookings error:",
      error
    );

    return {
      success: false,
      message:
        "Could not connect to backend server.",
    };
  }
}