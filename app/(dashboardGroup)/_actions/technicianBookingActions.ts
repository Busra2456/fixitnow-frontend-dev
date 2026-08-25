"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type TechnicianBooking = {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  bookingDate: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;

  customer?: {
    id: string;
    name: string;
    email: string;
  };

  service?: {
    id: string;
    title: string;
    price: number;

    category?: {
      id: string;
      name: string;
    };
  };
};

type BookingListResponse = {
  success?: boolean;
  message?: string;
  data?: TechnicianBooking[];
};

type BookingResponse = {
  success?: boolean;
  message?: string;
  data?: TechnicianBooking;
};

const getAccessToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get("accessToken")?.value;
};



export const getTechnicianBookings = async () => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return {
      success: false,
      message: "User not authenticated",
      data: [] as TechnicianBooking[],
    };
  }

  if (!API_URL) {
    return {
      success: false,
      message: "BACKEND_API_URL is not configured",
      data: [] as TechnicianBooking[],
    };
  }

  try {
    const res = await fetch(
      `${API_URL}/api/technicians/bookings`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const text = await res.text();

    let result: BookingListResponse;

    try {
      result = JSON.parse(text) as BookingListResponse;
    } catch {
      console.error(
        "Technician bookings API returned:",
        text
      );

      return {
        success: false,
        message: "Backend returned invalid response.",
        data: [] as TechnicianBooking[],
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
      "Get technician bookings failed:",
      error
    );

    return {
      success: false,
      message: "Failed to load bookings.",
      data: [] as TechnicianBooking[],
    };
  }
};


export const updateTechnicianBookingStatus = async (
  bookingId: string,
  status: BookingStatus
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

  if (!bookingId) {
    return {
      success: false,
      message: "Booking ID is required.",
    };
  }

  try {
    const res = await fetch(
      `${API_URL}/api/bookings/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
        cache: "no-store",
      }
    );

    const text = await res.text();

    let result: BookingResponse;

    try {
      result = JSON.parse(text) as BookingResponse;
    } catch {
      console.error(
        "Update booking API returned:",
        text
      );

      return {
        success: false,
        message: "Backend returned invalid response.",
        statusCode: res.status,
      };
    }

    return {
      success: Boolean(result.success),
      message: result.message || "",
      data: result.data,
      statusCode: res.status,
    };
  } catch (error) {
    console.error(
      "Update booking status failed:",
      error
    );

    return {
      success: false,
      message: "Failed to update booking status.",
    };
  }
};