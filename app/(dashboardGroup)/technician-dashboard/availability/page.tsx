import AvailabilityForm from "../../_components/AvailabilityForm";
import {
  getTechnicianAvailability,
} from "../../_actions/technicianAvailabilityActions";

export default async function AvailabilityPage() {
  const result =
    await getTechnicianAvailability();

  if (!result.success || !result.data) {
    return (
      <div className="p-6 text-red-500">
        {result.message ||
          "Failed to load availability."}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Availability
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Set your working hours and availability.
        </p>
      </div>

      <AvailabilityForm
        initialIsAvailable={
          result.data.isAvailable ?? true
        }
        initialAvailableFrom={
          result.data.availableFrom ?? "09:00"
        }
        initialAvailableTo={
          result.data.availableTo ?? "18:00"
        }
      />
    </div>
  );
}