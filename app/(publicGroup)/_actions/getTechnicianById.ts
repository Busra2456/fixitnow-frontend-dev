"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

export type TechnicianReview = {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt?: string;

  customer?: {
    id: string;
    name: string;
    email: string;
  } | null;
};

export type TechnicianDetails = {
  id: string;
  name: string;
  email: string;

  technicianProfile?: {
    id?: string;
    experience?: number | null;
    bio?: string | null;
    location?: string | null;
    rating?: number | null;
    isAvailable?: boolean;
    availableFrom?: string | null;
    availableTo?: string | null;
    image?: string | null;
    profileImage?: string | null;
  } | null;

  servicesCreated?: {
    id: string;
    title: string;
    price: number;

    category?: {
      id: string;
      name: string;
    } | null;
  }[];

  technicianReviews?: TechnicianReview[];
};

type TechnicianResponse = {
  success?: boolean;
  message?: string;
  data?: TechnicianDetails;
};

export const getTechnicianById = async (
  technicianId: string
) => {
  if (!technicianId) {
    return {
      success: false,
      message: "Technician ID is required.",
      data: null,
    };
  }

  if (!API_URL) {
    return {
      success: false,
      message: "BACKEND_API_URL is not configured.",
      data: null,
    };
  }

  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    const headers: HeadersInit = {};

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const res = await fetch(
      `${API_URL}/api/technicians/${technicianId}`,
      {
        method: "GET",
        headers,
        cache: "no-store",
      }
    );

    const text = await res.text();

    let result: TechnicianResponse;

    try {
      result = JSON.parse(text) as TechnicianResponse;
    } catch {
      console.error(
        "Single technician API returned:",
        text
      );

      return {
        success: false,
        message: "Backend returned an invalid response.",
        data: null,
      };
    }

    if (!res.ok) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to load technician.",
        data: null,
      };
    }

    return {
      success: Boolean(result.success),
      message: result.message || "",
      data: result.data ?? null,
    };
  } catch (error) {
    console.error(
      "Get technician by ID failed:",
      error
    );

    return {
      success: false,
      message: "Failed to load technician.",
      data: null,
    };
  }
};