"use server";

import { Service } from "./getServices";

type ServiceResponse = {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: Service;
};

export async function getServiceById(
  id: string
): Promise<ServiceResponse> {
  try {
    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      return {
        success: false,
        message: "BACKEND_API_URL is not configured.",
      };
    }

    const response = await fetch(
      `${backendUrl}/api/services/${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const text = await response.text();

    let result: ServiceResponse;

    try {
      result = JSON.parse(text) as ServiceResponse;
    } catch {
      console.error(
        "Service API returned non-JSON:",
        text
      );

      return {
        success: false,
        message: "Backend returned invalid JSON.",
      };
    }

    if (!response.ok || !result.success) {
      return {
        success: false,
        message:
          result.message || "Failed to load service.",
      };
    }

    return {
      success: true,
      statusCode:
        result.statusCode ?? response.status,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error("getServiceById error:", error);

    return {
      success: false,
      message: "Could not connect to backend server.",
    };
  }
}