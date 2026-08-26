"use client";

import { useRouter } from "next/navigation";

type ServiceCardProps = {
  service: {
    id: string;
    title: string;
    description: string;
    price: number;

    category?: {
      name: string;
    };

    technician?: {
      name?: string;
      email?: string;
    };
  };
};

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  const router = useRouter();

  const handleBookService = () => {
    router.push(`/booking?serviceId=${service.id}`);
  };

  return (
    <div className="rounded-xl border bg-background p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold">
          {service.title}
        </h2>

        <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          ৳{Number(service.price).toLocaleString("en-BD")}
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {service.description}
      </p>

      {/* Category */}
      {service.category && (
        <div className="mt-4">
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
            {service.category.name}
          </span>
        </div>
      )}

      {/* Technician */}
      {service.technician && (
        <div className="mt-4 border-t pt-4">
          <p className="text-xs text-muted-foreground">
            Technician
          </p>

          <p className="mt-1 text-sm font-medium">
            {service.technician.name ||
              service.technician.email ||
              "Available technician"}
          </p>
        </div>
      )}

      {/* Book Button */}
      <button
        type="button"
        onClick={handleBookService}
        className="mt-5 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        Book Service
      </button>
    </div>
  );
}