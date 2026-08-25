
"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

export type TechnicianReview = {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt?: string;

  customer?: {
    id: string;
    name: string;
    email: string;
  };

  technician?: {
    id: string;
    name: string;
    email: string;
  };

  booking?: {
    id: string;
    service?: {
      id: string;
      title: string;
      price: number;
    };
  };
};

type ReviewListResponse = {
  success?: boolean;
  message?: string;
  data?: TechnicianReview[];
};

export const getTechnicianReviews = async (
  technicianId: string
) => {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not authenticated",
      data: [] as TechnicianReview[],
    };
  }

  if (!API_URL) {
    return {
      success: false,
      message: "BACKEND_API_URL is not configured",
      data: [] as TechnicianReview[],
    };
  }

  if (!technicianId) {
    return {
      success: false,
      message: "Technician ID is required",
      data: [] as TechnicianReview[],
    };
  }

  try {
    const res = await fetch(
      `${API_URL}/api/reviews/technician/${technicianId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const text = await res.text();

    let result: ReviewListResponse;

    try {
      result = JSON.parse(text) as ReviewListResponse;
    } catch {
      console.error(
        "Technician reviews API returned:",
        text
      );

      return {
        success: false,
        message: `Server returned ${res.status} instead of JSON.`,
        data: [] as TechnicianReview[],
        statusCode: res.status,
      };
    }

    return {
      success: Boolean(result.success),
      message: result.message || "",
      data: result.data ?? [],
      statusCode: res.status,
    };
  } catch (error) {
    console.error(
      "Get technician reviews failed:",
      error
    );

    return {
      success: false,
      message: "Could not connect to backend.",
      data: [] as TechnicianReview[],
    };
  }
};
