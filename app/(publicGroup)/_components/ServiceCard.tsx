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

  return (
    <div className="rounded-xl border bg-background p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-semibold">
          {service.title}
        </h2>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          ৳{Number(service.price).toLocaleString("en-BD")}
        </span>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        {service.description}
      </p>

      {service.category && (
        <p className="mt-4 text-xs text-muted-foreground">
          Category: {service.category.name}
        </p>
      )}

      {service.technician && (
        <p className="mt-2 text-xs text-muted-foreground">
          Technician:{" "}
          {service.technician.name ||
            service.technician.email ||
            "Available technician"}
        </p>
      )}

      <button
        type="button"
        onClick={() =>
          router.push(
            `/booking?serviceId=${service.id}`
          )
        }
        className="mt-5 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Book Service
      </button>
    </div>
  );
}