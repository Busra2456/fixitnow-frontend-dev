
import { BriefcaseBusiness } from "lucide-react";

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
    <main className="min-h-screen bg-slate-50/80 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Page Header */}
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold text-blue-600">
              Technician Dashboard
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Manage Services
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Create, update, and manage the services you provide to your
              customers.
            </p>

            {/* Summary */}
            <div className="mt-5 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                <BriefcaseBusiness className="size-4 text-blue-600" />
                <span className="text-sm font-semibold text-slate-800">
                  {services.length}
                </span>
                <span className="text-sm text-slate-500">Services</span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                <span className="text-sm font-semibold text-slate-800">
                  {categories.length}
                </span>
                <span className="ml-2 text-sm text-slate-500">
                  Categories
                </span>
              </div>
            </div>
          </div>

          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
            <BriefcaseBusiness className="size-7" />
          </div>
        </div>

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
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <ServiceManagement
            services={services}
            categories={categories}
          />
        </section>
      </div>
    </main>
  );
};

export default ServicesPage;
