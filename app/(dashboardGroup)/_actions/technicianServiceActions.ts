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

  if (!API_URL) {
    return {
      success: false,
      message: "BACKEND_API_URL is not configured",
      data: [],
    };
  }

  try {
    const response = await fetch(
      `${API_URL}/api/services/my-services`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      console.error(
        "Get my services API returned:",
        text
      );

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
    console.error(
      "Get my services failed:",
      error
    );

    return {
      success: false,
      message: "Could not connect to backend.",
      data: [],
    };
  }
};


export const createTechnicianService = async (
  payload: {
    title: string;
    description: string;
    price: number;
    categoryId: string;
  }
) => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }

  if (!API_URL) {
    return {
      success: false,
      message: "BACKEND_API_URL is not configured",
    };
  }

  try {
    const response = await fetch(
      `${API_URL}/api/services`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      console.error(
        "Create service API returned:",
        text
      );

      return {
        success: false,
        message: `Server returned ${response.status} instead of JSON.`,
        statusCode: response.status,
      };
    }

    return {
      ...result,
      statusCode: response.status,
    };
  } catch (error) {
    console.error(
      "Create service failed:",
      error
    );

    return {
      success: false,
      message: "Could not connect to backend.",
    };
  }
};


export const updateTechnicianService = async (
  serviceId: string,
  payload: {
    title: string;
    description: string;
    price: number;
    categoryId: string;
  }
) => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }

  if (!API_URL) {
    return {
      success: false,
      message: "BACKEND_API_URL is not configured",
    };
  }

  if (!serviceId) {
    return {
      success: false,
      message: "Service ID is required.",
    };
  }

  try {
    const response = await fetch(
      `${API_URL}/api/services/${serviceId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      console.error(
        "Update service API returned:",
        text
      );

      return {
        success: false,
        message: `Server returned ${response.status} instead of JSON.`,
        statusCode: response.status,
      };
    }

    return {
      ...result,
      statusCode: response.status,
    };
  } catch (error) {
    console.error(
      "Update service failed:",
      error
    );

    return {
      success: false,
      message: "Failed to update service.",
    };
  }
};



export const deleteTechnicianService = async (
  serviceId: string
) => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }

  if (!API_URL) {
    return {
      success: false,
      message: "BACKEND_API_URL is not configured",
    };
  }

  if (!serviceId) {
    return {
      success: false,
      message: "Service ID is required.",
    };
  }

  try {
    const response = await fetch(
      `${API_URL}/api/services/${serviceId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      console.error(
        "Delete service API returned:",
        text
      );

      return {
        success: false,
        message: `Server returned ${response.status} instead of JSON.`,
        statusCode: response.status,
      };
    }

    return {
      ...result,
      statusCode: response.status,
    };
  } catch (error) {
    console.error(
      "Delete service failed:",
      error
    );

    return {
      success: false,
      message: "Failed to delete service.",
    };
  }
};