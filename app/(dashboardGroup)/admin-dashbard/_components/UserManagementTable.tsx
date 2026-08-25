"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  updateUserStatus,
  type AdminUser,
} from "../_actions/adminActions";

interface UserManagementTableProps {
  users: AdminUser[];
}

const ITEMS_PER_PAGE = 10;

const UserManagementTable = ({
  users,
}: UserManagementTableProps) => {
  const router = useRouter();

  const [updatingId, setUpdatingId] = useState<string | null>(
    null
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Search
  const filteredUsers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return users;
    }

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.role.toLowerCase().includes(search)
    );
  }, [users, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(
    filteredUsers.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusUpdate = async (
    userId: string,
    currentStatus: AdminUser["activeStatus"]
  ) => {
    const newStatus =
      currentStatus === "BANNED" ? "ACTIVE" : "BANNED";

    try {
      setUpdatingId(userId);

      const result = await updateUserStatus(
        userId,
        newStatus
      );

      if (!result.success) {
        toast.error(
          result.message || "Failed to update user status"
        );
        return;
      }

      toast.success(
        newStatus === "BANNED"
          ? "User banned successfully"
          : "User unbanned successfully"
      );

      router.refresh();
    } catch (error) {
      console.error("handleStatusUpdate error:", error);

      toast.error("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name, email or role..."
            className="w-full rounded-lg border px-4 py-2 text-sm outline-none transition focus:border-gray-500"
          />
        </div>

        <p className="text-sm text-muted-foreground">
          {filteredUsers.length} user
          {filteredUsers.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => {
                  const isBanned =
                    user.activeStatus === "BANNED";

                  const isUpdating =
                    updatingId === user.id;

                  return (
                    <tr
                      key={user.id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Name */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">
                          {user.email}
                        </p>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          {user.role}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            isBanned
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {isBanned
                            ? "BANNED"
                            : "ACTIVE"}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() =>
                            handleStatusUpdate(
                              user.id,
                              user.activeStatus
                            )
                          }
                          className={`rounded-md px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
                            isBanned
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          {isUpdating
                            ? "Updating..."
                            : isBanned
                              ? "Unban"
                              : "Ban"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) => page - 1)
              }
              className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => page + 1)
              }
              className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;