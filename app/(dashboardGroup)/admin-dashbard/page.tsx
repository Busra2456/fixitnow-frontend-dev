import Link from "next/link";
import {
  FaUsers,
  FaUserTie,
  FaUserCheck,
  FaUserSlash,
  FaUserCog,
  FaTags,
} from "react-icons/fa";

import { getAdminUsers } from "./_actions/adminActions";

const AdminDashboardPage = async () => {
  const result = await getAdminUsers();

  const users = result?.data || [];

  const totalUsers = users.length;

  const totalCustomers = users.filter(
    (user) => user.role === "CUSTOMER"
  ).length;

  const totalTechnicians = users.filter(
    (user) => user.role === "TECHNICIAN"
  ).length;

  const totalBannedUsers = users.filter(
    (user) => user.activeStatus === "BLOCKED"
  ).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      description: "All registered users",
      icon: FaUsers,
    },
    {
      title: "Customers",
      value: totalCustomers,
      description: "Registered customers",
      icon: FaUserCheck,
    },
    {
      title: "Technicians",
      value: totalTechnicians,
      description: "Registered technicians",
      icon: FaUserTie,
    },
    {
      title: "Banned Users",
      value: totalBannedUsers,
      description: "Currently banned users",
      icon: FaUserSlash,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage users and monitor your FixItNow platform.
          </p>
        </div>

        {/* ================= ERROR ================= */}
        {!result?.success && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {result?.message ||
              "Failed to load dashboard data"}
          </div>
        )}

        {/* ================= STATISTICS ================= */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-gray-900">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="text-lg text-primary" />
                  </div>
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Quickly manage your platform.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            {/* Manage Users */}
            <Link
              href="/admin-dashbard/users"
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <FaUserCog className="text-lg text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Manage Users
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    View, ban and unban platform users.
                  </p>
                </div>
              </div>
            </Link>

            {/* Manage Categories */}
            <Link
              href="/admin-dashbard/categories"
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <FaTags className="text-lg text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Manage Categories
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Add, edit and remove service categories.
                  </p>
                </div>
              </div>
            </Link>

          </div>
        </section>

      </div>
    </main>
  );
};

export default AdminDashboardPage;