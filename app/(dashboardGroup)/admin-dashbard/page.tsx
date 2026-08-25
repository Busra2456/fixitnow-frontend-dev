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
    (user) => user.activeStatus === "BANNED"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage users and monitor your FixItNow platform.
        </p>
      </div>

      {/* Error */}
      {!result?.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {result?.message || "Failed to load dashboard data"}
        </div>
      )}

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Users */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Total Users
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {totalUsers}
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            All registered users
          </p>
        </div>

        {/* Customers */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Customers
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {totalCustomers}
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Registered customers
          </p>
        </div>

        {/* Technicians */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Technicians
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {totalTechnicians}
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Registered technicians
          </p>
        </div>

        {/* Banned Users */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Banned Users
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {totalBannedUsers}
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Currently banned users
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold">
          Quick Actions
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <a
            href="/admin-dashbard/users"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:border-gray-400 hover:shadow-md"
          >
            <h3 className="font-semibold">
              Manage Users
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              View, ban and unban platform users.
            </p>
          </a>

          <a
            href="/admin-dashbard/categories"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:border-gray-400 hover:shadow-md"
          >
            <h3 className="font-semibold">
              Manage Categories
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Add, edit and remove service categories.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;