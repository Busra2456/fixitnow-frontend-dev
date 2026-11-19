
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
];

const customerLinks = [
  { name: "Find Services", href: "/services" },
  { name: "Find Technicians", href: "/technicians" },
  { name: "My Bookings", href: "/customer/bookings" },
  { name: "Contact Us", href: "/contact" },
];

const technicianLinks = [
  { name: "Technician Dashboard", href: "/technician/dashboard" },
  { name: "My Services", href: "/technician/services" },
  { name: "My Bookings", href: "/technician/bookings" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Wrench className="h-6 w-6" />
              </span>

              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                FixIt<span className="text-blue-600">Now</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-600">
              Your trusted partner for everyday home services.
              Find skilled professionals, book reliable services,
              and make your home maintenance easier with FixItNow.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-600 hover:text-white"
              >
                <Globe className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-600 hover:text-white"
              >
                <Camera className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-blue-600 hover:text-white"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Quick Links
            </h3>
            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:pl-1 hover:text-blue-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customers */}
          <div>
            <h3 className="text-base font-bold text-slate-900">
              For Customers
            </h3>
            <ul className="mt-6 space-y-4">
              {customerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:pl-1 hover:text-blue-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technicians */}
          <div>
            <h3 className="text-base font-bold text-slate-900">
              For Technicians
            </h3>
            <ul className="mt-6 space-y-4">
              {technicianLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:pl-1 hover:text-blue-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-14 grid grid-cols-1 gap-5 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-slate-500">Call Us</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Contact Support
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-slate-500">Email Us</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Customer Support
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-slate-500">Our Service Area</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} FixItNow. All rights reserved.
          </p>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-blue-600"
          >
            Make Your Home Better
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
