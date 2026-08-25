import Link from "next/link";
import { notFound } from "next/navigation";

import { getServiceById } from "../../_actions/getServiceById";
import BookingForm from "../../_components/BookingForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ServiceBookingPage({
  params,
}: Props) {
  const { id } = await params;

  const result = await getServiceById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const service = result.data;

  return (
    <main className="min-h-screen bg-muted/30 px-6 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <Link
          href={
            service.technicianId
              ? `/technicians/${service.technicianId}`
              : "/technicians"
          }
          className="mb-6 inline-block text-sm font-medium text-primary hover:underline"
        >
          ← Back to Technician
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground">
            Book Service
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Choose Date & Time
          </h1>

          <p className="mt-2 text-muted-foreground">
            Schedule a service with your selected technician.
          </p>
        </div>

        {/* Booking Form */}
        <BookingForm
          serviceId={service.id}
          serviceTitle={service.title}
          technicianName={
            service.technician?.name || "Technician"
          }
          price={Number(service.price)}
        />

      </div>
    </main>
  );
}