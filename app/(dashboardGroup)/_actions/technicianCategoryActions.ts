"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

const getAccessToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get("accessToken")?.value;
};

export const getTechnicianCategories = async () => {
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
      message: "BACKEND_API_URL is not configured",
      data: [],
    };
  }

  try {
    const response = await fetch(`${API_URL}/api/categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      return {
        success: false,
        message: `Server returned ${response.status} instead of JSON.`,
        data: [],
        statusCode: response.status,
      };
    }

    return {
      ...result,
      statusCode: response.status,
    };
  } catch (error) {
    console.error("Get technician categories failed:", error);

    return {
      success: false,
      message: "Could not connect to backend.",
      data: [],
    };
  }
};