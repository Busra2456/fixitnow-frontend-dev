
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

