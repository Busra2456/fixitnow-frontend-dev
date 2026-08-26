"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createTechnicianService,
  deleteTechnicianService,
  updateTechnicianService,
} from "../_actions/technicianServiceActions";

type Category = {
  id: string;
  name: string;
  description?: string;
};

type TechnicianService = {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;

  category?: {
    id: string;
    name: string;
  };
};

interface ServiceManagementProps {
  services: TechnicianService[];
  categories: Category[];
}

const ServiceManagement = ({
  services,
  categories,
}: ServiceManagementProps) => {
  const router = useRouter();

  // =========================
  // CREATE FORM
  // =========================

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [isCreating, setIsCreating] = useState(false);

  // =========================
  // EDIT FORM
  // =========================

  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] =
    useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategoryId, setEditCategoryId] =
    useState("");

  const [isUpdating, setIsUpdating] = useState(false);

  // =========================
  // DELETE
  // =========================

  const [deletingId, setDeletingId] = useState<
    string | null
  >(null);

  // =========================
  // CREATE SERVICE
  // =========================

  const handleCreate = async () => {
    if (!title.trim()) {
      toast.error("Service title is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Service description is required");
      return;
    }

    if (!price || Number(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      setIsCreating(true);

      const result = await createTechnicianService({
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        categoryId,
      });

      if (!result.success) {
        toast.error(
          result.message || "Failed to create service"
        );
        return;
      }

      toast.success(
        "Service created successfully"
      );

      setTitle("");
      setDescription("");
      setPrice("");
      setCategoryId("");

      router.refresh();
    } catch (error) {
      console.error(
        "Create service error:",
        error
      );

      toast.error("Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  // =========================
  // START EDIT
  // =========================

  const handleEdit = (
    service: TechnicianService
  ) => {
    setEditingId(service.id);

    setEditTitle(service.title);
    setEditDescription(service.description);
    setEditPrice(String(service.price));

    setEditCategoryId(
      service.categoryId ||
        service.category?.id ||
        ""
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancelEdit = () => {
    setEditingId(null);

    setEditTitle("");
    setEditDescription("");
    setEditPrice("");
    setEditCategoryId("");
  };

  // =========================
  // UPDATE SERVICE
  // =========================

  const handleUpdate = async () => {
    if (!editingId) {
      return;
    }

    if (!editTitle.trim()) {
      toast.error("Service title is required");
      return;
    }

    if (!editDescription.trim()) {
      toast.error(
        "Service description is required"
      );
      return;
    }

    if (
      !editPrice ||
      Number(editPrice) <= 0
    ) {
      toast.error("Please enter a valid price");
      return;
    }

    if (!editCategoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      setIsUpdating(true);

      const result =
        await updateTechnicianService(
          editingId,
          {
            title: editTitle.trim(),
            description:
              editDescription.trim(),
            price: Number(editPrice),
            categoryId: editCategoryId,
          }
        );

      if (!result.success) {
        toast.error(
          result.message ||
            "Failed to update service"
        );
        return;
      }

      toast.success(
        "Service updated successfully"
      );

      handleCancelEdit();

      router.refresh();
    } catch (error) {
      console.error(
        "Update service error:",
        error
      );

      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  // =========================
  // DELETE SERVICE
  // =========================

  const handleDelete = async (
    serviceId: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(serviceId);

      const result =
        await deleteTechnicianService(
          serviceId
        );

      if (!result.success) {
        toast.error(
          result.message ||
            "Failed to delete service"
        );
        return;
      }

      toast.success(
        "Service deleted successfully"
      );

      if (editingId === serviceId) {
        handleCancelEdit();
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Delete service error:",
        error
      );

      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">

      {/* =====================================
          CREATE / EDIT SECTION
      ===================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        {!editingId ? (
          <>
            {/* CREATE HEADER */}

            <div>
              <h2 className="text-xl font-semibold">
                Create New Service
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Add a service that customers can book.
              </p>
            </div>

            {/* CREATE FORM */}

            <div className="mt-6 space-y-5">

              {/* TITLE */}

              <div>
                <label
                  htmlFor="service-title"
                  className="mb-2 block text-sm font-medium"
                >
                  Service Title
                </label>

                <input
                  id="service-title"
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value
                    )
                  }
                  placeholder="e.g. AC Repair Service"
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-black"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label
                  htmlFor="service-description"
                  className="mb-2 block text-sm font-medium"
                >
                  Description
                </label>

                <textarea
                  id="service-description"
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  placeholder="Describe your service"
                  rows={4}
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-black"
                />
              </div>

              {/* PRICE */}

              <div>
                <label
                  htmlFor="service-price"
                  className="mb-2 block text-sm font-medium"
                >
                  Price
                </label>

                <input
                  id="service-price"
                  type="number"
                  min="0"
                  value={price}
                  onChange={(event) =>
                    setPrice(
                      event.target.value
                    )
                  }
                  placeholder="1500"
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-black"
                />
              </div>

              {/* CATEGORY */}

              <div>
                <label
                  htmlFor="service-category"
                  className="mb-2 block text-sm font-medium"
                >
                  Category
                </label>

                <select
                  id="service-category"
                  value={categoryId}
                  onChange={(event) =>
                    setCategoryId(
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* CREATE BUTTON */}

              <button
                type="button"
                onClick={handleCreate}
                disabled={isCreating}
                className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreating
                  ? "Creating..."
                  : "Create Service"}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* EDIT HEADER */}

            <div>
              <h2 className="text-xl font-semibold">
                Edit Service
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Update your service information.
              </p>
            </div>

            {/* EDIT FORM */}

            <div className="mt-6 space-y-5">

              {/* TITLE */}

              <div>
                <label
                  htmlFor="edit-service-title"
                  className="mb-2 block text-sm font-medium"
                >
                  Service Title
                </label>

                <input
                  id="edit-service-title"
                  type="text"
                  value={editTitle}
                  onChange={(event) =>
                    setEditTitle(
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label
                  htmlFor="edit-service-description"
                  className="mb-2 block text-sm font-medium"
                >
                  Description
                </label>

                <textarea
                  id="edit-service-description"
                  value={editDescription}
                  onChange={(event) =>
                    setEditDescription(
                      event.target.value
                    )
                  }
                  rows={4}
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* PRICE */}

              <div>
                <label
                  htmlFor="edit-service-price"
                  className="mb-2 block text-sm font-medium"
                >
                  Price
                </label>

                <input
                  id="edit-service-price"
                  type="number"
                  min="0"
                  value={editPrice}
                  onChange={(event) =>
                    setEditPrice(
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* CATEGORY */}

              <div>
                <label
                  htmlFor="edit-service-category"
                  className="mb-2 block text-sm font-medium"
                >
                  Category
                </label>

                <select
                  id="edit-service-category"
                  value={editCategoryId}
                  onChange={(event) =>
                    setEditCategoryId(
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* BUTTONS */}

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUpdating
                    ? "Updating..."
                    : "Update Service"}
                </button>

                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={isUpdating}
                  className="rounded-lg border px-6 py-2.5 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

              </div>
            </div>
          </>
        )}
      </div>

      {/* =====================================
          AVAILABLE SERVICES
      ===================================== */}

      <div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Available Services
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Services currently available on FixItNow.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">

            <h3 className="font-semibold">
              No services found
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Create your first service to get started.
            </p>

          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {services.map((service) => {

              const isDeleting =
                deletingId === service.id;

              const serviceCategory =
                service.category?.name ||
                categories.find(
                  (category) =>
                    category.id ===
                    service.categoryId
                )?.name ||
                "Unknown";

              return (
                <div
                  key={service.id}
                  className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${
                    editingId === service.id
                      ? "ring-2 ring-black"
                      : ""
                  }`}
                >

                  {/* SERVICE INFO */}

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <h3 className="text-lg font-semibold">
                        {service.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {service.description}
                      </p>

                    </div>

                    <div className="shrink-0 text-right">

                      <p className="text-lg font-bold">
                        ৳
                        {Number(
                          service.price
                        ).toLocaleString(
                          "en-BD"
                        )}
                      </p>

                    </div>

                  </div>

                  {/* CATEGORY */}

                  <div className="mt-4">

                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      Category:{" "}
                      {serviceCategory}
                    </span>

                  </div>

                  {/* ACTIONS */}

                  <div className="mt-5 flex flex-wrap gap-2 border-t pt-4">

                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(
                          service
                        )
                      }
                      disabled={
                        isDeleting ||
                        isUpdating
                      }
                      className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Edit
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          service.id
                        )
                      }
                      disabled={isDeleting}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isDeleting
                        ? "Deleting..."
                        : "Delete Service"}
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};

export default ServiceManagement;