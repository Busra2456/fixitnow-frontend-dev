
"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  createTechnicianService,
  getTechnicianServices,
} from "../../_actions/technicianServiceActions";
import { getTechnicianCategories } from "../../_actions/technicianCategoryActions";

type Category = {
  id: string;
  name: string;
};

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  category?: Category;
};

type ServiceResponse = {
  success: boolean;
  message?: string;
  data?: Service[];
};

type CategoryResponse = {
  success: boolean;
  message?: string;
  data?: Category[];
};

export default function TechnicianServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [serviceResult, categoryResult] =
          await Promise.all([
            getTechnicianServices() as Promise<ServiceResponse>,
            getTechnicianCategories() as Promise<CategoryResponse>,
          ]);

        if (!mounted) return;

        // Services
        if (!serviceResult.success) {
          setError(
            serviceResult.message ||
              "Failed to load services."
          );
        } else {
          setServices(serviceResult.data ?? []);
        }

        // Categories
        if (!categoryResult.success) {
          setError(
            categoryResult.message ||
              "Failed to load categories."
          );
        } else {
          setCategories(categoryResult.data ?? []);
        }
      } catch (error) {
        console.error(
          "Failed to load services/categories:",
          error
        );

        if (mounted) {
          setError(
            "Something went wrong while loading data."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleCreateService = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Service title is required.");
      return;
    }

    if (!description.trim()) {
      setError("Service description is required.");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (!categoryId) {
      setError("Please select a category.");
      return;
    }

    try {
      setCreating(true);

      const result = await createTechnicianService({
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        categoryId,
      });

      if (!result.success) {
        setError(
          result.message ||
            "Failed to create service."
        );
        return;
      }

      setSuccess(
        "Service created successfully."
      );

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setCategoryId("");

      // Refresh services
      const refreshed =
        (await getTechnicianServices()) as ServiceResponse;

      if (refreshed.success) {
        setServices(refreshed.data ?? []);
      }
    } catch (error) {
      console.error(
        "Create service failed:",
        error
      );

      setError(
        "Something went wrong while creating the service."
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Manage Services
          </h1>

          <p className="mt-2 text-muted-foreground">
            Create and manage the services you provide.
          </p>
        </div>

        {/* Create Service */}
        <div className="rounded-xl border bg-background p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Create New Service
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Add a service that customers can book.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <p className="text-sm text-destructive">
                {error}
              </p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 rounded-lg border border-green-500/30 bg-green-500/5 p-4">
              <p className="text-sm text-green-600">
                {success}
              </p>
            </div>
          )}

          <form
            onSubmit={handleCreateService}
            className="space-y-5"
          >

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium"
              >
                Service Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="e.g. AC Repair"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium"
              >
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Describe your service..."
                rows={4}
                className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Price + Category */}
            <div className="grid gap-5 sm:grid-cols-2">

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium"
                >
                  Price
                </label>

                <input
                  id="price"
                  type="number"
                  min="1"
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                  placeholder="e.g. 1500"
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium"
                >
                  Category
                </label>

                <select
                  id="category"
                  value={categoryId}
                  onChange={(event) =>
                    setCategoryId(event.target.value)
                  }
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>

                {categories.length === 0 &&
                  !loading && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      No categories available.
                    </p>
                  )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={creating || categories.length === 0}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating
                ? "Creating..."
                : "Create Service"}
            </button>
          </form>
        </div>

        {/* Available Services */}
        <div className="mt-8">

          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              Available Services
            </h2>

            <p className="text-sm text-muted-foreground">
              Services currently available on FixItNow.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="rounded-xl border bg-background p-8 text-center shadow-sm">
              <p className="text-sm text-muted-foreground">
                Loading services...
              </p>
            </div>
          )}

          {/* Empty */}
          {!loading &&
            services.length === 0 && (
              <div className="rounded-xl border bg-background p-8 text-center shadow-sm">
                <h3 className="font-semibold">
                  No services found
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Create your first service above.
                </p>
              </div>
            )}

          {/* Service Cards */}
          {!loading &&
            services.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="rounded-xl border bg-background p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">

                      <h3 className="font-semibold">
                        {service.title}
                      </h3>

                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        ৳
                        {Number(
                          service.price
                        ).toLocaleString("en-BD")}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">
                      {service.description}
                    </p>

                    {service.category && (
                      <p className="mt-4 text-xs font-medium text-muted-foreground">
                        Category:{" "}
                        {service.category.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
