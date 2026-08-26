"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

type ReviewData = {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment: string;
};

type ReviewResponse = {
  success?: boolean;
  message?: string;
  data?: ReviewData;
};

export type ReviewState = {
  success: boolean;
  message: string;
  data?: ReviewData;
  statusCode?: number;
};


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


export async function createReview(
  bookingId: string,
  rating: number,
  comment: string
): Promise<ReviewState> {
  try {
    if (!API_URL) {
      return {
        success: false,
        statusCode: 500,
        message: "BACKEND_API_URL is not configured.",
      };
    }

    if (!bookingId) {
      return {
        success: false,
        statusCode: 400,
        message: "Booking ID is required.",
      };
    }

    if (rating < 1 || rating > 5) {
      return {
        success: false,
        statusCode: 400,
        message: "Rating must be between 1 and 5.",
      };
    }

    if (!comment.trim()) {
      return {
        success: false,
        statusCode: 400,
        message: "Please write a comment.",
      };
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "You are not logged in.",
      };
    }

    const response = await fetch(`${API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        bookingId,
        rating,
        comment: comment.trim(),
      }),
      cache: "no-store",
    });

    const text = await response.text();

    let result: ReviewResponse;

    try {
      result = JSON.parse(text) as ReviewResponse;
    } catch {
      console.error("Review API returned non-JSON:", text);

      return {
        success: false,
        statusCode: response.status,
        message: "Backend returned invalid response.",
      };
    }

    return {
      success: Boolean(result.success),
      statusCode: response.status,
      message: result.message || "Review submitted successfully.",
      data: result.data,
    };
  } catch (error) {
    console.error("Create review failed:", error);

    return {
      success: false,
      statusCode: 500,
      message: "Failed to create review.",
    };
  }
}

export async function getTechnicianReviews(
  technicianId: string
) {
  try {
    if (!API_URL) {
      return {
        success: false,
        message: "BACKEND_API_URL is not configured.",
        data: [],
      };
    }

    if (!technicianId) {
      return {
        success: false,
        message: "Technician ID is required.",
        data: [],
      };
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "You are not logged in.",
        data: [],
      };
    }

    const response = await fetch(
      `${API_URL}/api/reviews/technician/${technicianId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const text = await response.text();

    let result: {
      success?: boolean;
      message?: string;
      data?: ReviewData[];
    };

    try {
      result = JSON.parse(text);
    } catch {
      console.error("Review API returned non-JSON:", text);

      return {
        success: false,
        message: "Backend returned invalid response.",
        data: [],
      };
    }

    return {
      success: Boolean(result.success),
      message: result.message || "",
      data: result.data || [],
    };
  } catch (error) {
    console.error("Get technician reviews failed:", error);

    return {
      success: false,
      message: "Failed to load technician reviews.",
      data: [],
    };
  }
}

