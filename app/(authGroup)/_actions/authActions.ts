"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type RegisterState = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: unknown;
};

type LoginState = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
};

// REGISTER ACTION

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData
) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  const payload = {
    name,
    email,
    password,
    role,
  };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const result = await res.json();

  if (result.success) {
  redirect("/login");
}

  return {
    ...result,
    statusCode: res.status,
  };
};

// LOGIN ACTION

export const loginAction = async (
  prevState: LoginState,
  formData: FormData
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const result = await res.json();

  if (result.success) {
    const cookieStore = await cookies();

    cookieStore.set(
      "accessToken",
      result.data.accessToken,
      {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      }
    );

    cookieStore.set(
      "refreshToken",
      result.data.refreshToken,
      {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      }
    );

    const decodedToken = jwt.decode(
      result.data.accessToken
    ) as JwtPayload;

    if (decodedToken.role === "CUSTOMER") {
      redirect("/customer-dashboard");
    } else if (decodedToken.role === "TECHNICIAN") {
      redirect("/technician-dashboard/technician");
    } else if (decodedToken.role === "ADMIN") {
      redirect("/admin-dashboard/admin");
    }
  }

  return {
    ...result,
    statusCode: res.status,
  };
};