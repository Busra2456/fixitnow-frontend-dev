
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Wrench,
} from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Technicians", href: "/technicians" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const customerLinks = [
  { name: "Find Services", href: "/services" },
  { name: "Find Technicians", href: "/technicians" },
  { name: "My Bookings", href: "/customer/bookings" },
  { name: "Contact Support", href: "/contact" },
];

const technicianLinks = [
  { name: "Technician Dashboard", href: "/technician/dashboard" },
  { name: "My Services", href: "/technician/services" },
  { name: "My Bookings", href: "/technician/bookings" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition duration-300 group-hover:rotate-6 group-hover:bg-blue-500">
                <Wrench className="h-6 w-6" />
              </span>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                FixIt<span className="text-blue-400">Now</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Your trusted partner for everyday home services. Find skilled
              professionals, book reliable services, and make your home
              maintenance easier with FixItNow.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Making Home Services Easier
            </div>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <Globe className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <Camera className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold text-white">
              Quick Links
            </h3>

            <div className="mt-3 h-1 w-10 rounded-full bg-blue-500" />

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-blue-400"
                  >
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-blue-500 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customers */}
          <div>
            <h3 className="text-base font-bold text-white">
              For Customers
            </h3>

            <div className="mt-3 h-1 w-10 rounded-full bg-blue-500" />

            <ul className="mt-6 space-y-4">
              {customerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-blue-400"
                  >
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-blue-500 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technicians */}
          <div>
            <h3 className="text-base font-bold text-white">
              For Technicians
            </h3>

            <div className="mt-3 h-1 w-10 rounded-full bg-blue-500" />

            <ul className="mt-6 space-y-4">
              {technicianLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-blue-400"
                  >
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-blue-500 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-14 grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm sm:grid-cols-3 sm:p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <Phone className="h-5 w-5" />
            </span>

            <div>
              <p className="text-xs text-slate-400">Call Us</p>
              <Link
                href="/contact"
                className="mt-1 block text-sm font-semibold text-white transition hover:text-blue-400"
              >
                Contact Support
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <Mail className="h-5 w-5" />
            </span>

            <div>
              <p className="text-xs text-slate-400">Email Us</p>
              <Link
                href="/contact"
                className="mt-1 block text-sm font-semibold text-white transition hover:text-blue-400"
              >
                Customer Support
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <MapPin className="h-5 w-5" />
            </span>

            <div>
              <p className="text-xs text-slate-400">Our Service Area</p>
              <p className="mt-1 text-sm font-semibold text-white">
                Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} FixItNow. All rights reserved.
          </p>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Make Your Home Better
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
