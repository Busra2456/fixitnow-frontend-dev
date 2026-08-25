"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createCategory,
  deleteCategory,
  type AdminCategory,
} from "../_actions/adminActions";

interface CategoryManagementProps {
  categories: AdminCategory[];
}

const CategoryManagement = ({
  categories,
}: CategoryManagementProps) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(
    null
  );

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setIsCreating(true);

      const result = await createCategory(
        name.trim(),
        description.trim()
      );

      if (!result.success) {
        toast.error(
          result.message || "Failed to create category"
        );
        return;
      }

      toast.success("Category created successfully");

      setName("");
      setDescription("");

      router.refresh();
    } catch (error) {
      console.error("handleCreate error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(categoryId);

      const result = await deleteCategory(categoryId);

      if (!result.success) {
        toast.error(
          result.message || "Failed to delete category"
        );
        return;
      }

      toast.success("Category deleted successfully");

      router.refresh();
    } catch (error) {
      console.error("handleDelete error:", error);
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Category */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          Add Category
        </h2>

        <div className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="category-name"
              className="mb-2 block text-sm font-medium"
            >
              Category Name
            </label>

            <input
              id="category-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="e.g. Plumbing"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label
              htmlFor="category-description"
              className="mb-2 block text-sm font-medium"
            >
              Description
            </label>

            <textarea
              id="category-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Category description"
              rows={3}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="button"
            onClick={handleCreate}
            disabled={isCreating}
            className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Add Category"}
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="font-semibold">
            Categories
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Description
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {categories.length > 0 ? (
                categories.map((category) => {
                  const isDeleting =
                    deletingId === category.id;

                  return (
                    <tr
                      key={category.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium">
                        {category.name}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {category.description ||
                          "No description"}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() =>
                            handleDelete(category.id)
                          }
                          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isDeleting
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;