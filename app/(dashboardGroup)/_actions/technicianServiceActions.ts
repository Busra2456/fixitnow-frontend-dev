"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

const getAccessToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get("accessToken")?.value;
};

export const getTechnicianServices = async () => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return {
      success: false,
      message: "User not authenticated",
      data: [],
    };
  }

  try {
    const res = await fetch(`${API_URL}/api/services`, {
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
      console.error("Service API returned:", text);

      return {
        success: false,
        message: `Server returned ${res.status} instead of JSON.`,
        data: [],
        statusCode: res.status,
      };
    }

    return {
      ...result,
      statusCode: res.status,
    };
  } catch (error) {
    console.error("Get services failed:", error);

    return {
      success: false,
      message: "Could not connect to backend.",
      data: [],
    };
  }
};

export const createTechnicianService = async (payload: {
  title: string;
  description: string;
  price: number;
  categoryId: string;
}) => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }

  try {
    const res = await fetch(`${API_URL}/api/services`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await res.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      console.error("Create service API returned:", text);

      return {
        success: false,
        message: `Server returned ${res.status} instead of JSON.`,
        statusCode: res.status,
      };
    }

    return {
      ...result,
      statusCode: res.status,
    };
  } catch (error) {
    console.error("Create service failed:", error);

    return {
      success: false,
      message: "Could not connect to backend.",
    };
  }
};