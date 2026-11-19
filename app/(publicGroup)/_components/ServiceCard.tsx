
"use client";

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Tag,
  Wrench,
} from "lucide-react";

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

export default function ServiceCard({ service }: ServiceCardProps) {
  const router = useRouter();

  const handleBookService = () => {
    router.push(`/booking?serviceId=${service.id}`);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      {/* Card Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-50 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200 transition-transform duration-300 group-hover:scale-110">
            <Wrench className="h-6 w-6" />
          </div>

          <span className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-sm font-bold text-blue-700 shadow-sm">
            ৳{Number(service.price).toLocaleString("en-BD")}
          </span>
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
          {service.title}
        </h2>

        {service.category && (
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            <Tag className="h-3.5 w-3.5" />
            {service.category.name}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-500">
          {service.description}
        </p>

        {service.technician && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-slate-500">
                Service Technician
              </p>
              <p className="truncate text-sm font-semibold text-slate-800">
                {service.technician.name ||
                  service.technician.email ||
                  "Available technician"}
              </p>
            </div>

            <BadgeCheck className="ml-auto h-5 w-5 shrink-0 text-blue-600" />
          </div>
        )}

        {/* Booking Button */}
        <button
          type="button"
          onClick={handleBookService}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Book Service
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
}
