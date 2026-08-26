"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createCategory,
  deleteCategory,
  updateCategory,
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
  const [description, setDescription] =
    useState("");

  
  const [isCreating, setIsCreating] =
    useState(false);


  const [isUpdating, setIsUpdating] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  
  const [deletingId, setDeletingId] =
    useState<string | null>(null);


  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const handleCreate = async () => {
    const categoryName = name.trim();
    const categoryDescription =
      description.trim();

    if (!categoryName) {
      toast.error(
        "Category name is required"
      );
      return;
    }

    try {
      setIsCreating(true);

      const result = await createCategory(
        categoryName,
        categoryDescription
      );

      if (!result.success) {
        toast.error(
          result.message ||
            "Failed to create category"
        );
        return;
      }

      toast.success(
        "Category created successfully"
      );

      resetForm();

      router.refresh();
    } catch (error) {
      console.error(
        "handleCreate error:",
        error
      );

      toast.error(
        "Something went wrong"
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleEdit = (
    category: AdminCategory
  ) => {
    setEditingId(category.id);
    setName(category.name);
    setDescription(
      category.description || ""
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const handleCancelEdit = () => {
    resetForm();
  };


  const handleUpdate = async () => {
    if (!editingId) {
      toast.error(
        "No category selected"
      );
      return;
    }

    const categoryName = name.trim();
    const categoryDescription =
      description.trim();

    if (!categoryName) {
      toast.error(
        "Category name is required"
      );
      return;
    }

    try {
      setIsUpdating(true);

      const result = await updateCategory(
        editingId,
        categoryName,
        categoryDescription
      );

      if (!result.success) {
        toast.error(
          result.message ||
            "Failed to update category"
        );
        return;
      }

      toast.success(
        "Category updated successfully"
      );

      resetForm();

      router.refresh();
    } catch (error) {
      console.error(
        "handleUpdate error:",
        error
      );

      toast.error(
        "Something went wrong"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (
    categoryId: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(categoryId);

      const result =
        await deleteCategory(categoryId);

      if (!result.success) {
        toast.error(
          result.message ||
            "Failed to delete category"
        );
        return;
      }

      toast.success(
        "Category deleted successfully"
      );

      if (editingId === categoryId) {
        resetForm();
      }

      router.refresh();
    } catch (error) {
      console.error(
        "handleDelete error:",
        error
      );

      toast.error(
        "Something went wrong"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">

  

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <div>
          <h2 className="text-lg font-semibold">
            {editingId
              ? "Edit Category"
              : "Add Category"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {editingId
              ? "Update category information."
              : "Create a new service category."}
          </p>
        </div>

        <div className="mt-5 space-y-4">

          {/* CATEGORY NAME */}

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
                setName(
                  event.target.value
                )
              }
              placeholder="e.g. Plumbing"
              disabled={
                isCreating ||
                isUpdating
              }
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>

          {/* DESCRIPTION */}

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
                setDescription(
                  event.target.value
                )
              }
              placeholder="Category description"
              rows={3}
              disabled={
                isCreating ||
                isUpdating
              }
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>

          {/* BUTTONS */}

          <div className="flex gap-3">

            {editingId ? (
              <>
                {/* UPDATE */}

                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUpdating
                    ? "Updating..."
                    : "Update Category"}
                </button>

                {/* CANCEL */}

                <button
                  type="button"
                  onClick={
                    handleCancelEdit
                  }
                  disabled={isUpdating}
                  className="rounded-md border px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>
              </>
            ) : (
              /* ADD */

              <button
                type="button"
                onClick={handleCreate}
                disabled={isCreating}
                className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreating
                  ? "Creating..."
                  : "Add Category"}
              </button>
            )}

          </div>
        </div>
      </div>

  

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <div className="border-b px-6 py-4">
          <h2 className="font-semibold">
            Categories
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[650px]">

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
                categories.map(
                  (category) => {
                    const isDeleting =
                      deletingId ===
                      category.id;

                    return (
                      <tr
                        key={category.id}
                        className="hover:bg-gray-50"
                      >

                        {/* NAME */}

                        <td className="px-6 py-4 text-sm font-medium">
                          {category.name}
                        </td>

                        {/* DESCRIPTION */}

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {category.description ||
                            "No description"}
                        </td>

                        {/* ACTION */}

                        <td className="px-6 py-4">

                          <div className="flex gap-2">

                            {/* EDIT */}

                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(
                                  category
                                )
                              }
                              disabled={
                                isDeleting ||
                                isUpdating
                              }
                              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Edit
                            </button>

                      
                            <button
                              type="button"
                              disabled={
                                isDeleting
                              }
                              onClick={() =>
                                handleDelete(
                                  category.id
                                )
                              }
                              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isDeleting
                                ? "Deleting..."
                                : "Delete"}
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )
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