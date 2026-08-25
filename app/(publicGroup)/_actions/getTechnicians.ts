"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

export type Technician = {
  id: string;
  name: string;
  email: string;

  technicianProfile?: {
    experience?: number | null;
    bio?: string | null;
    location?: string | null;
    rating?: number | null;
    isAvailable?: boolean;
    image?: string | null;
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
};

type TechnicianResponse = {
  success?: boolean;
  message?: string;
  data?: Technician[];
};

export const getTechnicians = async () => {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  if (!API_URL) {
    return {
      success: false,
      message: "BACKEND_API_URL is not configured.",
      data: [] as Technician[],
    };
  }

  try {
    const headers: HeadersInit = {};

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const res = await fetch(
      `${API_URL}/api/technicians`,
      {
        method: "GET",
        headers,
        cache: "no-store",
      }
    );

    const text = await res.text();

    let result: TechnicianResponse;

    try {
      result = JSON.parse(
        text
      ) as TechnicianResponse;
    } catch {
      console.error(
        "Technicians API returned:",
        text
      );

      return {
        success: false,
        message:
          "Backend returned an invalid response.",
        data: [] as Technician[],
      };
    }

    if (!res.ok) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to load technicians.",
        data: [] as Technician[],
      };
    }

    return {
      success: Boolean(result.success),
      message: result.message || "",
      data: result.data ?? [],
    };
  } catch (error) {
    console.error(
      "Get technicians failed:",
      error
    );

    return {
      success: false,
      message: "Failed to load technicians.",
      data: [] as Technician[],
    };
  }
};