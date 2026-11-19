
import {
  BriefcaseBusiness,
  Layers3,
  Sparkles,
} from "lucide-react";

import ServiceManagement from "../../_components/ServiceManagement";
import { getTechnicianServices } from "../../technician-dashboard/_actions/technicianServiceActions";
import { getTechnicianCategories } from "../../../(publicGroup)/_actions/technicianCategoryActions";

const ServicesPage = async () => {
  const [serviceResult, categoryResult] = await Promise.all([
    getTechnicianServices(),
    getTechnicianCategories(),
  ]);

  const services = serviceResult.success
    ? (serviceResult.data ?? [])
    : [];

  const categories = categoryResult.success
    ? (categoryResult.data ?? [])
    : [];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* Page Heading */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Technician Dashboard
              </span>
              <Sparkles className="size-4 text-blue-500" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Manage Services
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Manage your services, update details, and showcase your
              expertise to FixItNow customers.
            </p>
          </div>

          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200">
            <BriefcaseBusiness className="size-7" />
          </div>
        </section>

        {/* Statistics */}
        <section className="grid gap-5 sm:grid-cols-2">
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Services
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {services.length}
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Services you currently provide
                </p>
              </div>

              <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <BriefcaseBusiness className="size-6" />
              </div>
            </div>
          </div>

          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Available Categories
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {categories.length}
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Categories available for services
                </p>
              </div>

              <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                <Layers3 className="size-6" />
              </div>
            </div>
          </div>
        </section>

        {/* Error Messages */}
        {!serviceResult.success && (
          <div
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            {serviceResult.message || "Failed to load services."}
          </div>
        )}

        {!categoryResult.success && (
          <div
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            role="alert"
          >
            {categoryResult.message || "Failed to load categories."}
          </div>
        )}

        {/* Service Management */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-bold text-slate-900">
              Your Services
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Create and manage the services you offer to customers.
            </p>
          </div>

          <div className="p-4 sm:p-6">
            <ServiceManagement
              services={services}
              categories={categories}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ServicesPage;
