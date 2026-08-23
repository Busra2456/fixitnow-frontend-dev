import BookingForm from "../_components/BookingForm";

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

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Book Service
          </h1>

          <p className="mt-2 text-muted-foreground">
            Enter your booking information below.
          </p>
        </div>

        <BookingForm serviceId={serviceId} />
      </div>
    </div>
  );
}