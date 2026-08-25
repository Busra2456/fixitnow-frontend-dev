import { getAdminUsers } from "../_actions/adminActions";
import UserManagementTable from "../_components/UserManagementTable";

const UsersPage = async () => {
  const result = await getAdminUsers();

  const users = result?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>

        <p className="text-sm text-muted-foreground">
          Manage all customers, technicians and admins.
        </p>
      </div>

      {/* Error */}
      {!result?.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {result?.message || "Failed to load users"}
        </div>
      )}

      {/* Users Table */}
      <UserManagementTable users={users} />
    </div>
  );
};

export default UsersPage;