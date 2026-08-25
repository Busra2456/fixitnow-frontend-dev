import BookingForm from "../_components/BookingForm";
import { getServices } from "../_actions/getServices";

type BookingPageProps = {
  searchParams: Promise<{
    serviceId?: string;
  }>;
};

export default async function BookingPage({
  searchParams,
}: BookingPageProps) {
  const params = await searchParams;

  const serviceId = params.serviceId;

  if (!serviceId) {
    return (
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border bg-background p-6 text-center shadow-sm">
            <h1 className="text-xl font-semibold">
              Service not selected
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Please select a service before booking.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Get all services
  const result = await getServices();

  if (!result.success) {
    return (
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <p className="text-sm text-destructive">
              {result.message || "Failed to load service."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Find selected service
  const service = result.data?.find(
    (item) => item.id === serviceId
  );

  if (!service) {
    return (
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border bg-background p-6 text-center shadow-sm">
            <h1 className="text-xl font-semibold">
              Service not found
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              The selected service does not exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Book Service
          </h1>

          <p className="mt-2 text-muted-foreground">
            Choose your preferred date and time.
          </p>
        </div>

        <BookingForm
          serviceId={service.id}
          serviceTitle={service.title}
          technicianName={
            service.technician?.name || "Technician"
          }
          price={Number(service.price)}
        />
      </div>
    </div>
  );
}