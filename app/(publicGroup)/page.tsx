
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Star,
  UsersRound,
  Wrench,
  Zap,
} from "lucide-react";

import { getServices } from "./_actions/getServices";
import { getTechnicians } from "./_actions/getTechnicians";
import ServiceCard from "./_components/ServiceCard";
import TechnicianCard from "./_components/TechnicianCard";

export default async function HomePage() {
  const [servicesResult, techniciansResult] = await Promise.all([
    getServices(),
    getTechnicians(),
  ]);

  const services = servicesResult.data ?? [];
  const technicians = techniciansResult.data ?? [];

  const featuredServices = services.slice(0, 6);

  const topTechnicians = [...technicians]
    .sort(
      (a, b) =>
        (b.technicianProfile?.rating ?? 0) -
        (a.technicianProfile?.rating ?? 0)
    )
    .slice(0, 6);

  return (
    <main className="w-full overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
          }}
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-blue-950/50" />

        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 left-10 -z-10 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />

        <div className="mx-auto grid min-h-[580px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-200 backdrop-blur-md">
              <ShieldCheck className="h-4 w-4" />
              Your Trusted Home Service Platform
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Reliable Home Services,
              <span className="mt-2 block text-blue-400">
                Right When You Need Them.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Find trusted technicians for electrical, plumbing,
              AC repair and other home services. Book qualified
              professionals easily and get your work done with confidence.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/technicians"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900"
              >
                <UsersRound className="h-4 w-4" />
                Find a Technician
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                Trusted Professionals
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                Easy Booking
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                Reliable Services
              </span>
            </div>
          </div>

          {/* Hero Highlight */}
          <div className="hidden lg:flex lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/20 blur-2xl" />

              <div className="relative rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/30">
                  <Wrench className="h-8 w-8" />
                </div>

                <h2 className="mt-7 text-2xl font-bold text-white">
                  Your Home, Our Responsibility.
                </h2>

                <p className="mt-3 leading-7 text-slate-300">
                  From everyday repairs to essential maintenance,
                  find the right professional for your needs.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/10 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        Quick & Easy
                      </p>
                      <p className="mt-1 text-sm text-slate-300">
                        Simple service booking
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/10 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        Trusted Support
                      </p>
                      <p className="mt-1 text-sm text-slate-300">
                        Find the right professional
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/services"
                  className="mt-7 flex items-center justify-between rounded-xl bg-white px-5 py-4 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                >
                  Discover Our Services
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-bold tracking-wider text-blue-600">
                OUR SERVICES
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Popular Home Services
              </h2>

              <p className="mt-3 max-w-xl text-base leading-7 text-slate-500">
                Professional solutions for your everyday home needs.
                Find the right service with ease.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-blue-600 transition hover:gap-3"
            >
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {servicesResult.success && featuredServices.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Wrench className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No Services Available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Please check back later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold tracking-wider text-blue-600">
              WHY CHOOSE FIXITNOW
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Everything You Need, All in One Place
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              We make finding trusted home service professionals
              simple, convenient, and reliable.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              href="/technicians"
              className="group rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <ShieldCheck className="h-8 w-8" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Trusted Professionals
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Connect with experienced and reliable technicians
                who are ready to handle your home service needs.
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                Find Technicians
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/services"
              className="group rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <CalendarCheck className="h-8 w-8" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Easy & Convenient Booking
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Choose your preferred service, technician, date,
                and time slot with a simple booking process.
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                Browse Services
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/technicians"
              className="group rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <Star className="h-8 w-8" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Quality You Can Trust
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Compare technician ratings and customer reviews
                to confidently choose the right professional.
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                View Technicians
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Rated Technicians */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-bold tracking-wider text-blue-600">
                OUR PROFESSIONALS
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Top Rated Technicians
              </h2>

              <p className="mt-3 text-base text-slate-500">
                Meet experienced professionals ready to help.
              </p>
            </div>

            <Link
              href="/technicians"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-blue-600 transition hover:gap-3"
            >
              View All Technicians
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {techniciansResult.success && topTechnicians.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {topTechnicians.map((technician) => (
                <TechnicianCard
                  key={technician.id}
                  technician={technician}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <UsersRound className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No Technicians Available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Please check back later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 px-6 py-14 text-center shadow-xl shadow-blue-200/50 sm:px-12 sm:py-20">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-sky-300/20 blur-2xl" />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white backdrop-blur-sm">
              <Wrench className="h-8 w-8" />
            </div>

            <h2 className="mt-7 text-3xl font-extrabold text-white sm:text-4xl">
              Need a Home Service?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
              Browse our services and find the right professional
              for your home today. Make your home maintenance easier
              with FixItNow.
            </p>

            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
