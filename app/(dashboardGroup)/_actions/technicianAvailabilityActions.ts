"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

export interface IUpdateAvailability {
  isAvailable: boolean;
  availableFrom?: string;
  availableTo?: string;
}

export const getTechnicianAvailability = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const response = await fetch(
    `${API_URL}/api/technicians/profile`,
    {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || "Failed to fetch availability",
      data: null,
    };
  }

  return {
    success: true,
    message: "Availability fetched successfully",
    data: result.data,
  };
};

export const updateTechnicianAvailability = async (
  payload: IUpdateAvailability
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const response = await fetch(
    `${API_URL}/api/technicians/availability`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || "Failed to update availability",
    };
  }

  return {
    success: true,
    message: result.message || "Availability updated successfully",
    data: result.data,
  };
};