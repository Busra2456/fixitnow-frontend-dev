import Link from "next/link";
import { getServices } from "./_actions/getServices";
import { getTechnicians } from "./_actions/getTechnicians";
import ServiceCard from "./_components/ServiceCard";
import TechnicianCard from "./_components/TechnicianCard";
import {
  UsersRound,
  CalendarCheck,
  Star,
} from "lucide-react";

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
    <main className="w-full overflow-hidden">

      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:bg-[length:67%_100%]"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/20" />

        {/* Hero Content */}
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl ml-0 sm:ml-6 md:ml-10 lg:ml-20">

            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary sm:px-4 sm:py-2 sm:text-sm">
              Your Trusted Home Service Platform
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
              Reliable Home Services,
              <span className="block text-primary">
                Right When You Need Them
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
              Find trusted technicians for electrical, plumbing,
              AC repair and other home services. Book qualified
              professionals easily and get your work done with confidence.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link
                href="/services"
                className="w-full rounded-md bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto"
              >
                Explore Services
              </Link>

              <Link
                href="/technicians"
                className="w-full rounded-md border bg-white/90 px-6 py-3 text-center text-sm font-semibold transition hover:bg-white sm:w-auto"
              >
                Find a Technician
              </Link>
            </div>

          </div>
        </div>
      </section>


      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">
                OUR SERVICES
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Popular Home Services
              </h2>

              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Professional services for your everyday home needs.
              </p>
            </div>

            <Link
              href="/services"
              className="w-fit text-sm font-semibold text-primary hover:underline"
            >
              View All Services →
            </Link>
          </div>

          {servicesResult.success && featuredServices.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border bg-muted/20 p-6 text-center sm:p-8">
              <h3 className="font-semibold">
                No services available
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Please check back later.
              </p>
            </div>
          )}

        </div>
      </section>


      <section className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">

          <div className="text-center">
            <p className="text-sm font-semibold text-primary">
              WHY CHOOSE FIXITNOW
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Everything You Need, All in One Place
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              We make finding trusted home service professionals
              simple, convenient, and reliable.
            </p>
          </div>


          <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 md:grid-cols-3 md:gap-6">

            <Link
              href="/technicians"
              className="group rounded-xl border bg-background p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md sm:p-7"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <UsersRound className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Trusted Professionals
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Connect with experienced and reliable technicians
                who are ready to handle your home service needs.
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-primary">
                Find Technicians →
              </span>
            </Link>


            <Link
              href="/services"
              className="group rounded-xl border bg-background p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md sm:p-7"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <CalendarCheck className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Easy & Convenient Booking
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Choose your preferred service, technician, date,
                and time slot with a simple booking process.
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-primary">
                Browse Services →
              </span>
            </Link>


            <Link
              href="/technicians"
              className="group rounded-xl border bg-background p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md sm:p-7"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Star className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Quality You Can Trust
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Compare technician ratings and customer reviews
                to confidently choose the right professional.
              </p>

              <span className="mt-4 inline-block text-sm font-semibold text-primary">
                View Technicians →
              </span>
            </Link>

          </div>
        </div>
      </section>


      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">
                PROFESSIONALS
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Top Rated Technicians
              </h2>

              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Meet experienced professionals ready to help.
              </p>
            </div>

            <Link
              href="/technicians"
              className="w-fit text-sm font-semibold text-primary hover:underline"
            >
              View All Technicians →
            </Link>
          </div>


          {techniciansResult.success && topTechnicians.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {topTechnicians.map((technician) => (
                <TechnicianCard
                  key={technician.id}
                  technician={technician}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border bg-muted/20 p-6 text-center sm:p-8">
              <h3 className="font-semibold">
                No technicians available
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Please check back later.
              </p>
            </div>
          )}

        </div>
      </section>


      <section className="px-4 pb-12 sm:px-6 sm:pb-16 lg:pb-20">
        <div className="mx-auto max-w-6xl rounded-2xl bg-primary px-5 py-10 text-center text-primary-foreground sm:px-12 sm:py-12">

          <h2 className="text-2xl font-bold sm:text-3xl">
            Need a Home Service?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm opacity-90 sm:text-base">
            Browse our services and find the right
            professional for your home today.
          </p>

          <Link
            href="/services"
            className="mt-6 inline-block rounded-md bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:opacity-90"
          >
            Get Started
          </Link>

        </div>
      </section>

    </main>
  );
}