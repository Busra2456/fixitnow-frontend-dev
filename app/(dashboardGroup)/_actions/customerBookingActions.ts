"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

type CreateBookingInput = {
  technicianId: string;
  serviceId: string;
  bookingDate: string;
};

const getAccessToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get("accessToken")?.value;
};

/**
 * Get logged-in customer's bookings
 */
export const getCustomerBookings = async () => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return {
        success: false,
        message: "User not authenticated",
        data: [],
      };
    }

    if (!API_URL) {
      return {
        success: false,
        message: "Backend API URL is not configured",
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

    const text = await res.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      result = {
        success: false,
        message: text || "Invalid response from server",
      };
    }

    return {
      ...result,
      success: result.success ?? res.ok,
      statusCode: res.status,
    };
  } catch (error) {
    console.error("Failed to get customer bookings:", error);

    return {
      success: false,
      message: "Failed to get bookings",
      data: [],
    };
  }
};

/**
 * Create a new booking
 */
export const createBooking = async ({
  technicianId,
  serviceId,
  bookingDate,
}: CreateBookingInput) => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    if (!API_URL) {
      return {
        success: false,
        message: "Backend API URL is not configured",
      };
    }

    if (!technicianId) {
      return {
        success: false,
        message: "Technician ID is required",
      };
    }

    if (!serviceId) {
      return {
        success: false,
        message: "Service ID is required",
      };
    }

    if (!bookingDate) {
      return {
        success: false,
        message: "Booking date is required",
      };
    }

    const selectedDate = new Date(bookingDate);

    if (Number.isNaN(selectedDate.getTime())) {
      return {
        success: false,
        message: "Invalid booking date",
      };
    }

    if (selectedDate <= new Date()) {
      return {
        success: false,
        message: "Please select a future date and time",
      };
    }

    console.log("Creating booking:", {
      technicianId,
      serviceId,
      bookingDate,
    });

    const res = await fetch(`${API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        technicianId,
        serviceId,
        bookingDate,
      }),
      cache: "no-store",
    });

    const text = await res.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      result = {
        success: false,
        message: text || "Invalid response from backend",
      };
    }

    console.log("Create booking response:", {
      status: res.status,
      statusText: res.statusText,
      result,
    });

    if (!res.ok) {
      return {
        success: false,
        message:
          result?.message ||
          result?.error ||
          `Booking failed (${res.status})`,
        statusCode: res.status,
        data: result?.data ?? null,
      };
    }

    return {
      ...result,
      success: result.success ?? true,
      statusCode: res.status,
    };
  } catch (error) {
    console.error("Failed to create booking:", error);

    return {
      success: false,
      message: "Failed to create booking",
    };
  }
};

/**
 * Cancel a booking
 */
export const cancelBooking = async (bookingId: string) => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    if (!API_URL) {
      return {
        success: false,
        message: "Backend API URL is not configured",
      };
    }

    if (!bookingId) {
      return {
        success: false,
        message: "Booking ID is required",
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

    const text = await res.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      result = {
        success: false,
        message: text || "Invalid response from backend",
      };
    }

    console.log("Cancel booking response:", {
      status: res.status,
      statusText: res.statusText,
      result,
    });

    if (!res.ok) {
      return {
        success: false,
        message:
          result?.message ||
          result?.error ||
          `Cancel booking failed (${res.status})`,
        statusCode: res.status,
      };
    }

    return {
      ...result,
      success: result.success ?? true,
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