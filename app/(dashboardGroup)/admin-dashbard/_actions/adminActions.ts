"use server";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL;

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  activeStatus?: "ACTIVE" | "BANNED";
};

type AdminUsersResponse = {
  success: boolean;
  message?: string;
  data: AdminUser[];
};

type UpdateUserStatusResponse = {
  success: boolean;
  message?: string;
  data?: AdminUser;
};

const getAccessToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get("accessToken")?.value;
};

// Get all users
export const getAdminUsers = async (): Promise<AdminUsersResponse> => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
        data: [],
      };
    }

    const res = await fetch(`${API_URL}/api/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    const result: unknown = await res.json();

    if (!res.ok) {
      const errorResult = result as {
        message?: string;
      };

      return {
        success: false,
        message:
          errorResult.message || "Failed to fetch users",
        data: [],
      };
    }

    return result as AdminUsersResponse;
  } catch (error) {
    console.error("getAdminUsers error:", error);

    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
};

// Ban / Unban user
export const updateUserStatus = async (
  userId: string,
  activeStatus: "ACTIVE" | "BANNED"
): Promise<UpdateUserStatusResponse> => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const res = await fetch(
      `${API_URL}/api/users/${userId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          activeStatus,
        }),
        cache: "no-store",
      }
    );

    const result: unknown = await res.json();

    if (!res.ok) {
      const errorResult = result as {
        message?: string;
      };

      return {
        success: false,
        message:
          errorResult.message ||
          "Failed to update user status",
      };
    }

    return result as UpdateUserStatusResponse;
  } catch (error) {
    console.error("updateUserStatus error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export type AdminCategory = {
  id: string;
  name: string;
  description?: string;
};

type CategoriesResponse = {
  success: boolean;
  message?: string;
  data: AdminCategory[];
};

type CategoryResponse = {
  success: boolean;
  message?: string;
  data?: AdminCategory;
};

// Get all categories
export const getAdminCategories =
  async (): Promise<CategoriesResponse> => {
    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        return {
          success: false,
          message: "Unauthorized",
          data: [],
        };
      }

      const res = await fetch(`${API_URL}/api/categories`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      });

      const result: unknown = await res.json();

      if (!res.ok) {
        const errorResult = result as {
          message?: string;
        };

        return {
          success: false,
          message:
            errorResult.message ||
            "Failed to fetch categories",
          data: [],
        };
      }

      return result as CategoriesResponse;
    } catch (error) {
      console.error(
        "getAdminCategories error:",
        error
      );

      return {
        success: false,
        message: "Something went wrong",
        data: [],
      };
    }
  };

// Create category
export const createCategory = async (
  name: string,
  description?: string
): Promise<CategoryResponse> => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const res = await fetch(`${API_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });

    const result: unknown = await res.json();

    if (!res.ok) {
      const errorResult = result as {
        message?: string;
      };

      return {
        success: false,
        message:
          errorResult.message ||
          "Failed to create category",
      };
    }

    return result as CategoryResponse;
  } catch (error) {
    console.error(
      "createCategory error:",
      error
    );

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

// Delete category
export const deleteCategory = async (
  categoryId: string
): Promise<CategoryResponse> => {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const res = await fetch(
      `${API_URL}/api/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result: unknown = await res.json();

    if (!res.ok) {
      const errorResult = result as {
        message?: string;
      };

      return {
        success: false,
        message:
          errorResult.message ||
          "Failed to delete category",
      };
    }

    return result as CategoryResponse;
  } catch (error) {
    console.error(
      "deleteCategory error:",
      error
    );

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};