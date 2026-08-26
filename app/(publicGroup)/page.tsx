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
  const [servicesResult, techniciansResult] =
    await Promise.all([
      getServices(),
      getTechnicians(),
    ]);

  const services = servicesResult.data ?? [];
  const technicians = techniciansResult.data ?? [];

  const featuredServices = services.slice(0, 6);
  const topTechnicians = technicians
    .sort(
      (a, b) =>
        (b.technicianProfile?.rating ?? 0) -
        (a.technicianProfile?.rating ?? 0)
    )
    .slice(0, 6);

  return (
    <main>
  <section className="relative overflow-hidden px-6 py-20 sm:py-24 lg:py-32">
  <div
    className="absolute inset-0 bg-[length:67%_100%] bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/hero-bg.jpg')",
    }}
  />

  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/5 to-white/10" />

  <div className="relative mx-auto max-w-7xl ">
    <div className="max-w-3xl ml-20">
      <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
        Your Trusted Home Service Platform
      </span>

      <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        Reliable Home Services,
        <span className="text-primary">
          {" "}Right When You Need Them
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        Find trusted technicians for electrical, plumbing,
        AC repair and other home services. Book qualified
        professionals easily and get your work done with confidence.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/services"
          className="rounded-md bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Explore Services
        </Link>

        <Link
          href="/technicians"
          className="rounded-md border bg-white/90 px-6 py-3 text-center text-sm font-semibold transition hover:bg-white"
        >
          Find a Technician
        </Link>
      </div>
    </div>
  </div>
</section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-primary">
                OUR SERVICES
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Popular Home Services
              </h2>

              <p className="mt-2 text-muted-foreground">
                Professional services for your everyday
                home needs.
              </p>
            </div>

            <Link
              href="/services"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View All Services →
            </Link>
          </div>

          {servicesResult.success &&
          featuredServices.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border bg-muted/20 p-8 text-center">
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

<section className="bg-muted/30 px-6 py-16">
  <div className="mx-auto max-w-6xl">
    <div className="text-center">
      <p className="text-sm font-semibold text-primary">
        WHY CHOOSE FIXITNOW
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        Everything You Need, All in One Place
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
        We make finding trusted home service professionals
        simple, convenient, and reliable.
      </p>
    </div>

    <div className="mt-10 grid gap-6 md:grid-cols-3">

      {/* Trusted Professionals */}
      <Link
        href="/technicians"
        className="group rounded-xl border bg-background p-7 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
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

      {/* Easy Booking */}
      <Link
        href="/services"
        className="group rounded-xl border bg-background p-7 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
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

      {/* Quality Service */}
      <Link
        href="/technicians"
        className="group rounded-xl border bg-background p-7 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
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

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-primary">
                PROFESSIONALS
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Top Rated Technicians
              </h2>

              <p className="mt-2 text-muted-foreground">
                Meet experienced professionals ready to help.
              </p>
            </div>

            <Link
              href="/technicians"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View All Technicians →
            </Link>
          </div>

          {techniciansResult.success &&
          topTechnicians.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {topTechnicians.map((technician) => (
                <TechnicianCard
                  key={technician.id}
                  technician={technician}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border bg-muted/20 p-8 text-center">
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

      
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
          <h2 className="text-3xl font-bold">
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