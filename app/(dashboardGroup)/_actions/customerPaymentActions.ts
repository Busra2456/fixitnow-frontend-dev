"use server";

import { cookies } from "next/headers";

export const getCustomerBookings = async () => {
  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in!",
        data: [],
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/bookings`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message:
          result?.message || "Failed to get bookings.",
        data: [],
      };
    }

    return {
      success: true,
      message:
        result?.message || "Bookings fetched successfully.",
      data: result?.data ?? result,
    };
  } catch (error) {
    console.error("Failed to get customer bookings:", error);

    return {
      success: false,
      message: "Something went wrong while fetching bookings.",
      data: [],
    };
  }
};