
import { Suspense } from "react";
import { Wrench } from "lucide-react";
import { getServices } from "../_actions/getServices";
import ServicesFilter from "../_components/ServiceFilters";

function ServicesLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 flex flex-wrap gap-3">
        <div className="h-9 w-40 rounded-full bg-slate-100" />
        <div className="h-9 w-44 rounded-full bg-slate-100" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <div className="h-14 w-14 rounded-2xl bg-slate-100" />
            <div className="mt-6 h-6 w-3/4 rounded bg-slate-200" />
            <div className="mt-4 h-4 w-full rounded bg-slate-100" />
            <div className="mt-2 h-4 w-5/6 rounded bg-slate-100" />
            <div className="mt-6 h-11 w-full rounded-xl bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

async function ServicesContent() {
  const result = await getServices();

  if (!result.success) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-500 shadow-sm">
          <Wrench className="h-7 w-7" />
        </div>

        <h2 className="mt-5 text-lg font-bold text-slate-900">
          Unable to Load Services
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          {result.message || "Failed to load services. Please try again later."}
        </p>
      </div>
    );
  }

  const services = result.data ?? [];

  const categories = Array.from(
    new Map(
      services
        .filter((service) => service.category)
        .map((service) => [
          service.category!.id,
          {
            id: service.category!.id,
            name: service.category!.name,
          },
        ])
    ).values()
  );

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
          <Wrench className="h-4 w-4 text-slate-600" />
          {services.length} Available Services
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
          {categories.length} Service Categories
        </div>
      </div>

      <ServicesFilter services={services} categories={categories} />
    </>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <span className="text-sm font-bold tracking-wider text-blue-600">
            OUR SERVICES
          </span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Explore Our Home Services
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
            Find trusted professionals for your everyday home needs.
            Browse our services and choose the right solution for your home.
          </p>
        </div>

        <Suspense fallback={<ServicesLoading />}>
          <ServicesContent />
        </Suspense>
      </div>
    </main>
  );
}
