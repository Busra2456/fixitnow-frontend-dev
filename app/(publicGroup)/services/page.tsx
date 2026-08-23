import { getServices } from "../_actions/getServices";
import ServiceCard from "../_components/ServiceCard";

export default async function ServicesPage() {
  const result = await getServices();

  if (!result.success) {
    return (
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Services
            </h1>

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

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Services
          </h1>

          <p className="mt-2 text-muted-foreground">
            Find the right service for your needs.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="rounded-xl border bg-background p-8 text-center shadow-sm">
            <h2 className="font-semibold">
              No services found
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              No services are available right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}