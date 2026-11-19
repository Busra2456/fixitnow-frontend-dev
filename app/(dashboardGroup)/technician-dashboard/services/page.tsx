
import ServiceManagement from "../../_components/ServiceManagement";

import { getTechnicianServices } from "../../technician-dashboard/_actions/technicianServiceActions";
import { getTechnicianCategories } from "../../../(publicGroup)/_actions/technicianCategoryActions";

const ServicesPage = async () => {
  const [serviceResult, categoryResult] = await Promise.all([
    getTechnicianServices(),
    getTechnicianCategories(),
  ]);

  const services = serviceResult.data ?? [];
  const categories = categoryResult.data ?? [];

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Page Header */}
        <div className="border-b border-slate-200 pb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Technician Dashboard
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Manage Services
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Create, update, and manage the services you provide to your
            customers.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
              {services.length} Services
            </span>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
              {categories.length} Categories
            </span>
          </div>
        </div>

        {/* Error Messages */}
        {!serviceResult.success && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {serviceResult.message || "Failed to load services."}
          </div>
        )}

        {!categoryResult.success && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
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
