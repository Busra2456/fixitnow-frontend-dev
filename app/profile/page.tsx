
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import { getMe } from "@/service/getMe";

export default async function ProfilePage() {
  const result = await getMe();

  if (!result.success) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>

          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <UserRound className="size-7" />
            </div>

            <h1 className="mt-4 text-2xl font-bold text-slate-900">
              Unable to Load Profile
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {result.message || "Unable to load profile."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const profile = result.data;

  const initial = profile?.name?.charAt(0).toUpperCase() || "U";

  const memberSince = profile?.createdAt
    ? new Intl.DateTimeFormat("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(profile.createdAt))
    : "Not available";

  const details = [
    {
      label: "Full Name",
      value: profile?.name || "Not available",
      icon: UserRound,
    },
    {
      label: "Email Address",
      value: profile?.email || "Not available",
      icon: Mail,
    },
    {
      label: "Phone Number",
      value: profile?.phone || "Not available",
      icon: Phone,
    },
    {
      label: "Member Since",
      value: memberSince,
      icon: CalendarDays,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-5xl space-y-7">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        {/* Page Heading */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Account Overview
            </span>
            <ShieldCheck className="size-4 text-blue-500" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            View your FixItNow account information and personal details.
          </p>
        </section>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-5 border-b border-slate-100 pb-7 sm:flex-row sm:items-center">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-3xl font-bold text-white shadow-lg shadow-blue-100">
                {initial}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="break-words text-2xl font-bold text-slate-900">
                  {profile?.name || "User"}
                </h2>

                <p className="mt-1 break-all text-sm text-slate-500">
                  {profile?.email || "No email available"}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    <Wrench className="size-3.5" />
                    {profile?.role || "CUSTOMER"}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="size-3.5" />
                    {profile?.activeStatus || "ACTIVE"}
                  </span>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="pt-7">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your registered account details.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {details.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="group rounded-xl border border-slate-200 bg-slate-50/70 p-5 transition-all hover:border-blue-200 hover:bg-blue-50/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm ring-1 ring-slate-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                          <Icon className="size-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-500">
                            {item.label}
                          </p>

                          <p className="mt-1 break-words text-sm font-semibold text-slate-900">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Account Security */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-5">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-blue-600" />

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Your Account, Your Trust
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Keep your account information accurate and up to date for a
              better FixItNow experience.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
