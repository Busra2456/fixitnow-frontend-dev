
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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Service Visual */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-slate-100">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-200" />

        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-slate-600 shadow-md transition-transform duration-500 group-hover:scale-110">
          <Wrench className="h-11 w-11" />
        </div>

        <span className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm">
          ৳{Number(service.price).toLocaleString("en-BD")}
        </span>
      </div>

      {/* Service Information */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          {service.category && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
              <Tag className="h-3.5 w-3.5" />
              {service.category.name}
            </span>
          )}

          <h2 className="mt-4 line-clamp-1 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
            {service.title}
          </h2>

          <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-500">
            {service.description}
          </p>
        </div>

        {/* Technician Information */}
        {service.technician && (
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm">
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

            <BadgeCheck className="ml-auto h-5 w-5 shrink-0 text-green-600" />
          </div>
        )}

        {/* Booking Button */}
        <button
          type="button"
          onClick={handleBookService}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Book Service
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
}
