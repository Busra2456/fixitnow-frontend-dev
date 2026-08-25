"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  updateTechnicianAvailability,
} from "../_actions/technicianAvailabilityActions";

interface AvailabilityFormProps {
  initialIsAvailable: boolean;
  initialAvailableFrom: string;
  initialAvailableTo: string;
}

const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export default function AvailabilityForm({
  initialIsAvailable,
  initialAvailableFrom,
  initialAvailableTo,
}: AvailabilityFormProps) {
  const [isAvailable, setIsAvailable] =
    useState(initialIsAvailable);

  const [availableFrom, setAvailableFrom] =
    useState(initialAvailableFrom || "09:00");

  const [availableTo, setAvailableTo] =
    useState(initialAvailableTo || "18:00");

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (saving) return;

    if (isAvailable && !availableFrom) {
      toast.error("Please select a start time.");
      return;
    }

    if (isAvailable && !availableTo) {
      toast.error("Please select an end time.");
      return;
    }

    if (
      isAvailable &&
      availableFrom >= availableTo
    ) {
      toast.error(
        "End time must be after start time."
      );
      return;
    }

    try {
      setSaving(true);

      const result =
        await updateTechnicianAvailability({
          isAvailable,
          availableFrom: isAvailable
            ? availableFrom
            : undefined,
          availableTo: isAvailable
            ? availableTo
            : undefined,
        });

      if (!result.success) {
        toast.error(
          result.message ||
            "Failed to update availability."
        );
        return;
      }

      toast.success(
        "Availability updated successfully."
      );
    } catch (error) {
      console.error(
        "Update availability failed:",
        error
      );

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Availability */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Availability
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Turn your booking availability on or off.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setIsAvailable(
                (previous) => !previous
              )
            }
            aria-label={
              isAvailable
                ? "Turn availability off"
                : "Turn availability on"
            }
            className={`relative h-6 w-11 rounded-full transition ${
              isAvailable
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                isAvailable
                  ? "left-5"
                  : "left-0.5"
              }`}
            />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium">
            {isAvailable
              ? "You are currently available"
              : "You are currently unavailable"}
          </p>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold">
            Weekly Schedule
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Friday is unavailable by default.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {days.map((day) => {
            const isFriday = day === "Friday";

            return (
              <div
                key={day}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Day */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!isFriday}
                    disabled
                    readOnly
                    className="h-4 w-4"
                  />

                  <span
                    className={
                      isFriday
                        ? "text-gray-400"
                        : "font-medium"
                    }
                  >
                    {day}
                  </span>

                  {isFriday && (
                    <span className="text-xs text-red-500">
                      Unavailable
                    </span>
                  )}
                </div>

                {/* Time */}
                {!isFriday ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="time"
                      value={availableFrom}
                      onChange={(event) =>
                        setAvailableFrom(
                          event.target.value
                        )
                      }
                      disabled={!isAvailable}
                      aria-label={`${day} start time`}
                      className="rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                    />

                    <span className="text-gray-400">
                      to
                    </span>

                    <input
                      type="time"
                      value={availableTo}
                      onChange={(event) =>
                        setAvailableTo(
                          event.target.value
                        )
                      }
                      disabled={!isAvailable}
                      aria-label={`${day} end time`}
                      className="rounded-md border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">
                    Not available
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : "Save Availability"}
        </button>
      </div>
    </div>
  );
}