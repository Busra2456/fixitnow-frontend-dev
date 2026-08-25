import { getServices } from "../_actions/getServices";
import ServicesFilter from "../_components/ServiceFilters";

export default async function ServicesPage() {
  const result = await getServices();

  if (!result.success) {
    return (
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Services</h1>

            <p className="mt-2 text-muted-foreground">
              Find the right service for your needs.
            </p>
          </div>

          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
            <p className="text-sm text-destructive">
              {result.message || "Failed to load services."}
            </p>
          </div>
        </div>
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
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Services</h1>

          <p className="mt-2 text-muted-foreground">
            Find the right service for your needs.
          </p>
        </div>

        {/* Search + Filter + Service Grid */}
        <ServicesFilter
          services={services}
          categories={categories}
        />
      </div>
    </div>
  );
}