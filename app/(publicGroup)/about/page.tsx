
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Home,
  ShieldCheck,
  Star,
  Users,
  Wrench,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Professionals",
    description:
      "We connect you with skilled technicians who are committed to delivering reliable and quality home services.",
  },
  {
    icon: Clock,
    title: "Convenient Booking",
    description:
      "Find the right service and book a technician without the hassle of searching through multiple providers.",
  },
  {
    icon: Star,
    title: "Quality Service",
    description:
      "We focus on customer satisfaction and encourage quality work through ratings and customer reviews.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Your comfort and satisfaction matter to us. We aim to make every service experience simple and dependable.",
  },
];

const steps = [
  {
    number: "01",
    title: "Explore Services",
    description:
      "Browse available home services and choose the one that matches your needs.",
  },
  {
    number: "02",
    title: "Find a Technician",
    description:
      "Discover professional technicians and review their profiles before booking.",
  },
  {
    number: "03",
    title: "Book Your Service",
    description:
      "Submit your booking request with the details of the service you need.",
  },
  {
    number: "04",
    title: "Get It Done",
    description:
      "Connect with your technician and get your home service completed.",
  },
];

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-slate-50/60">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="grid items-center gap-8 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:gap-12 lg:px-14 lg:py-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
                <Home size={14} />
                About FixItNow
              </span>

              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Making Home Services
                <span className="text-blue-600"> Simple & Reliable.</span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                FixItNow is a home service platform designed to connect
                customers with skilled technicians. Whether you need help
                with plumbing, electrical work, cleaning, or other household
                tasks, we make finding and booking the right professional
                easier.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Explore Services
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/technicians"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  Meet Our Technicians
                </Link>
              </div>
            </div>

            <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-xl bg-slate-900 p-8 sm:min-h-[320px]">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />

              <div className="relative w-full max-w-sm">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Wrench size={28} />
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-white">
                    Your Home,
                    <br />
                    Our Responsibility.
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Connecting people with the right professionals for
                    everyday home service needs.
                  </p>

                  <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-medium text-blue-300">
                    <CheckCircle2 size={17} />
                    Reliable Home Service Experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Who We Are
            </span>

            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              A Smarter Way to Manage Your Home Services
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              Finding a dependable professional for home repairs and
              maintenance can be challenging. FixItNow aims to simplify that
              experience through one convenient platform.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              We bring customers and technicians together, helping customers
              discover available services, explore technician profiles,
              submit booking requests, and share their experiences through
              reviews.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Our goal is to make home service booking more accessible,
              organized, and convenient for everyone.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Users size={22} />
              </div>
              <h3 className="mt-4 font-bold text-slate-900">
                Customer Focus
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Designed around customer convenience and service needs.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Wrench size={22} />
              </div>
              <h3 className="mt-4 font-bold text-slate-900">
                Skilled Technicians
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                A platform to discover professionals for home services.
              </p>
            </div>

            <div className="-mt-8 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <HeartHandshake size={22} />
              </div>
              <h3 className="mt-4 font-bold text-slate-900">
                Easy Connection
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Helping customers and technicians connect conveniently.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck size={22} />
              </div>
              <h3 className="mt-4 font-bold text-slate-900">
                Better Experience
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Organized bookings and customer feedback in one place.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mt-14 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <HeartHandshake size={24} />
            </div>
            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Our Mission
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Our mission is to simplify home service experiences by making
              it easier for customers to find, connect with, and book
              suitable technicians through a convenient digital platform.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Star size={24} />
            </div>
            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Our Vision
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Our vision is to build a dependable home service ecosystem
              where customers can access professional help with confidence
              and technicians can connect with more service opportunities.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-14">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Why FixItNow
            </span>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              Why Choose FixItNow?
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              We focus on making every step of your home service journey
              simple, convenient, and customer-friendly.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="mt-14 rounded-2xl border border-slate-200 bg-white px-6 py-10 sm:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Simple Process
            </span>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              How FixItNow Works
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              Getting the home service you need is just a few simple steps
              away.
            </p>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <span className="text-3xl font-extrabold text-blue-100">
                  {step.number}
                </span>
                <h3 className="mt-3 font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-14 overflow-hidden rounded-2xl bg-slate-900 px-6 py-10 text-center sm:px-10 sm:py-12">
          <div className="mx-auto max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
              Get Started Today
            </span>

            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Need a Hand with Your Home?
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Explore our available services and find a technician who can
              help you take care of your home.
            </p>

            <Link
              href="/services"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Find a Service
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
