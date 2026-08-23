"use server";

export type Category = {
  id: string;
  name: string;
  description?: string;
};

export type Technician = {
  id: string;
  name?: string;
  email?: string;
  phone?: string | null;
  role?: string;
  activeStatus?: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  technicianId?: string;
  categoryId?: string;
  createdAt?: string;
  updatedAt?: string;
  category?: Category;
  technician?: Technician;
};

type ServicesResponse = {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: Service[];
};

export async function getServices(): Promise<ServicesResponse> {
  try {
    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      return {
        success: false,
        message: "BACKEND_API_URL is not configured.",
      };
    }

    const response = await fetch(`${backendUrl}/api/services`, {
      method: "GET",
      cache: "no-store",
    });

    const text = await response.text();

    let result: ServicesResponse;

    try {
      result = JSON.parse(text);
    } catch {
      console.error("Backend returned non-JSON:", text);

      return {
        success: false,
        message: "Backend returned invalid JSON.",
      };
    }

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to load services.",
      };
    }

    return {
      success: true,
      statusCode: result.statusCode ?? response.status,
      message: result.message,
      data: result.data ?? [],
    };
  } catch (error) {
    console.error("getServices error:", error);

    return {
      success: false,
      message: "Could not connect to backend server.",
    };
  }
}