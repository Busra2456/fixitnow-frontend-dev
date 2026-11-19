
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us an email for questions and support.",
    value: "support@fixitnow.com",
    href: "mailto:support@fixitnow.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Reach out to us for assistance.",
    value: "Contact our support team",
    href: "mailto:support@fixitnow.com",
  },
  {
    icon: MapPin,
    title: "Our Location",
    description: "Serving customers across Bangladesh.",
    value: "Bangladesh",
    href: null,
  },
  {
    icon: Clock,
    title: "Support Hours",
    description: "We aim to assist you as quickly as possible.",
    value: "Customer Support",
    href: null,
  },
];

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-slate-50/60">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page Header */}
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center sm:px-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <MessageCircle size={14} />
            Get In Touch
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Contact <span className="text-blue-600">FixItNow</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Have a question, need assistance, or want to share your feedback?
            We are here to help. Reach out to our team and let us know how
            we can assist you.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mt-10">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Contact Information
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              We would love to hear from you
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      {item.value}
                      <ArrowRight size={14} />
                    </a>
                  ) : (
                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      {item.value}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Form and Support */}
        <section className="mt-10 grid gap-6 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Send a Message
              </span>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                How can we help you?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Share your questions or feedback with our team.
              </p>
            </div>

            <form
              action="mailto:support@fixitnow.com"
              method="post"
              encType="text/plain"
              className="mt-7 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="Name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="Email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="Subject"
                  type="text"
                  placeholder="What is your message about?"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="Message"
                  rows={5}
                  placeholder="Write your message here..."
                  required
                  className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
              >
                Send Message
                <Send size={16} />
              </button>

              <p className="text-xs leading-5 text-slate-400">
                This form opens your default email application. For direct
                website submission, connect it to a backend contact endpoint.
              </p>
            </form>
          </div>

          {/* Support Card */}
          <div className="flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-900 p-7 text-white sm:p-8 lg:col-span-2">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <MessageCircle size={24} />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                Need Help with a Home Service?
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                Explore our services, discover professional technicians,
                and find the right help for your home.
              </p>

              <div className="mt-7 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-blue-400">
                    <ArrowRight size={17} />
                  </span>
                  <p className="text-sm text-slate-300">
                    Browse available home services.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-blue-400">
                    <ArrowRight size={17} />
                  </span>
                  <p className="text-sm text-slate-300">
                    Explore technician profiles and reviews.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-blue-400">
                    <ArrowRight size={17} />
                  </span>
                  <p className="text-sm text-slate-300">
                    Submit a booking request conveniently.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-sm text-slate-400">
                Ready to get started?
              </p>

              <Link
                href="/services"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Explore Our Services
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Looking for more information?
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Learn more about FixItNow and how our platform works.
          </p>

          <Link
            href="/about"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Learn About Us
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
