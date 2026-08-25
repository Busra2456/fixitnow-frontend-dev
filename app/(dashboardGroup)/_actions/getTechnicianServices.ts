"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

export const getMyTechnicianServices = async () => {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

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
    const res = await fetch(
      `${API_URL}/api/technicians/services`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const text = await res.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      console.error(
        "Technician services API returned:",
        text
      );

      return {
        success: false,
        message: `Server returned ${res.status} instead of JSON.`,
        data: [],
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
      "Get technician services failed:",
      error
    );

    return {
      success: false,
      message: "Could not connect to backend.",
      data: [],
    };
  }
};