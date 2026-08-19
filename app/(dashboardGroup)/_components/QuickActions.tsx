import Link from "next/link";
import { Search, Users } from "lucide-react";

const QuickActions = () => {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Quick Actions
        </h2>

        <p className="text-sm text-muted-foreground">
          Quickly find the service or technician you need.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/services"
          className="group rounded-xl border bg-background p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Search className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h3 className="font-semibold">
                Browse Services
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Find the right service for your needs.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/technicians"
          className="group rounded-xl border bg-background p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h3 className="font-semibold">
                Find Technicians
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Find trusted technicians for your service.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default QuickActions;