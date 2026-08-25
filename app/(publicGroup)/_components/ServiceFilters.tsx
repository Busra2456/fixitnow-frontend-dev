"use client";

import { useMemo, useState } from "react";
import ServiceCard from "./ServiceCard";

type Category = {
  id: string;
  name: string;
};

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  category?: {
    id: string;
    name: string;
  };
  technician?: {
    name?: string;
    email?: string;
  };
};

interface ServiceFiltersProps {
  services: Service[];
  categories: Category[];
}

export default function ServicesFilter({
  services,
  categories,
}: ServiceFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        service.title.toLowerCase().includes(search) ||
        service.description.toLowerCase().includes(search) ||
        service.category?.name.toLowerCase().includes(search);

      const matchesCategory =
        categoryId === "all" ||
        service.category?.id === categoryId;

      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, categoryId]);

  return (
    <div>
      {/* Search & Filter */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        {/* Search */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search services..."
          className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary sm:max-w-sm"
        />

        {/* Category */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary sm:max-w-xs"
        >
          <option value="all">All Categories</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Result Count */}
      <div className="mb-5">
        <p className="text-sm text-muted-foreground">
          {filteredServices.length}{" "}
          {filteredServices.length === 1
            ? "service"
            : "services"}{" "}
          found
        </p>
      </div>

      {/* Services */}
      {filteredServices.length === 0 ? (
        <div className="rounded-xl border bg-background p-8 text-center shadow-sm">
          <h2 className="font-semibold">
            No services found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Try another search or category.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      )}
    </div>
  );
}