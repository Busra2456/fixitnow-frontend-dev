"use server";

import { cookies } from "next/headers";

const API_URL= process.env.BACKEND_API_URL;

type PaymentResponse = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: {
    payment?: {
      id: string;
      bookingId: string;
      amount: number;
      provider: string;
      status: string;
      transactionId: string;
    };
    gatewayUrl?: string;
  };
};

export async function createPayment(
  bookingId: string
): Promise<PaymentResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message:
          "You are not logged in. Please log in to continue.",
      };
    }

    if (!API_URL) {
      return {
        success: false,
        statusCode: 500,
        message:
          "BACKEND_API_URL is not configured.",
      };
    }

    if (!bookingId) {
      return {
        success: false,
        statusCode: 400,
        message: "Booking ID is required.",
      };
    }

    const response = await fetch(
      `${API_URL}/api/payments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          bookingId,
          provider: "SSLCOMMERZ",
        }),
        cache: "no-store",
      }
    );

    const text = await response.text();

    let result: PaymentResponse;

    try {
      result = JSON.parse(
        text
      ) as PaymentResponse;
    } catch {
      console.error(
        "Payment backend returned invalid JSON:",
        text
      );

      return {
        success: false,
        statusCode: response.status,
        message:
          "Backend returned an invalid response.",
      };
    }

    console.log(
      "Create payment response:",
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
      "Create payment error:",
      error
    );

    return {
      success: false,
      statusCode: 500,
      message:
        "Something went wrong while creating payment.",
    };
  }
}