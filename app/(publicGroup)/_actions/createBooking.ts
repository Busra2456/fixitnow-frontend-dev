"use server";

import { cookies } from "next/headers";

export type BookingState = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: unknown;
};

export async function createBooking(
  prevState: BookingState,
  formData: FormData
): Promise<BookingState> {
  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message:
          "You are not logged in. Please log in to access this resource.",
      };
    }

    const serviceId = formData.get("serviceId");
    const bookingDate = formData.get("bookingDate");
    const address = formData.get("address");
    const notes = formData.get("notes");

    console.log("Booking form data:", {
      serviceId,
      bookingDate,
      address,
      notes,
    });

    if (
      typeof serviceId !== "string" ||
      typeof bookingDate !== "string" ||
      typeof address !== "string" ||
      !serviceId ||
      !bookingDate ||
      !address
    ) {
      return {
        success: false,
        statusCode: 400,
        message:
          "Service ID, booking date and address are required.",
      };
    }

    const date = new Date(bookingDate);

    if (Number.isNaN(date.getTime())) {
      return {
        success: false,
        statusCode: 400,
        message: "Invalid booking date.",
      };
    }

    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      return {
        success: false,
        statusCode: 500,
        message:
          "BACKEND_API_URL is not configured.",
      };
    }

    const payload = {
      serviceId,
      bookingDate: date.toISOString(),
      address,
      notes:
        typeof notes === "string"
          ? notes
          : "",
    };

    console.log(
      "Sending booking payload:",
      payload
    );

    const response = await fetch(
      `${backendUrl}/api/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const text = await response.text();

    let result: BookingState;

    try {
      result = JSON.parse(text) as BookingState;
    } catch {
      console.error(
        "Backend returned non-JSON:",
        text
      );

      return {
        success: false,
        statusCode: response.status,
        message:
          "Backend returned invalid JSON.",
      };
    }

    console.log(
      "Backend booking response:",
      result
    );

    return {
      success: Boolean(result.success),
      statusCode: response.status,
      message: result.message || "",
      data: result.data,
    };
  } catch (error) {
    console.error(
      "Create booking error:",
      error
    );

    return {
      success: false,
      statusCode: 500,
      message:
        "Something went wrong while creating booking.",
    };
  }
}