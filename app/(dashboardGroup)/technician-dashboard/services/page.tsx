import ServiceManagement from "../../_components/ServiceManagement";

import { getTechnicianServices } from "../../technician-dashboard/_actions/technicianServiceActions";
import { getTechnicianCategories } from "../../../(publicGroup)/_actions/technicianCategoryActions";

const ServicesPage = async () => {
  const [serviceResult, categoryResult] =
    await Promise.all([
      getTechnicianServices(),
      getTechnicianCategories(),
    ]);

  const services = serviceResult.data || [];
  const categories = categoryResult.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Manage Services
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Create and manage the services you provide.
        </p>
      </div>

      {!serviceResult.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {serviceResult.message ||
            "Failed to load services"}
        </div>
      )}

      {!categoryResult.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {categoryResult.message ||
            "Failed to load categories"}
        </div>
      )}

      <ServiceManagement
        services={services}
        categories={categories}
      />
    </div>
  );
};

export default ServicesPage;