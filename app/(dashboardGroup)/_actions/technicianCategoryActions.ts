
"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

const getAccessToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get("accessToken")?.value;
};

export const getTechnicianCategories = async () => {
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

    const res = await fetch(`${API_URL}/api/categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      return {
        success: false,
        message: `Backend returned ${res.status} instead of JSON`,
        data: [],
      };
    }

    const result = await res.json();

    return {
      ...result,
      statusCode: res.status,
    };
  } catch (error) {
    console.error(
      "Failed to load technician categories:",
      error
    );

    return {
      success: false,
      message: "Failed to load categories",
      data: [],
    };
  }
};
