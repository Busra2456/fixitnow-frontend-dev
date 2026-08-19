import { getMe } from "@/service/getMe";

export default async function ProfilePage() {
  const result = await getMe();

  if (!result.success) {
    return (
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border bg-background p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold">
              Profile
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              {result.message || "Unable to load profile."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const profile = result.data;

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-muted-foreground">
            View your FixItNow account information.
          </p>
        </div>

        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <div className="flex items-center gap-4 border-b pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              {profile?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                {profile?.name || "User"}
              </h2>

              <p className="text-sm text-muted-foreground">
                {profile?.email || "No email available"}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">
                Full Name
              </p>

              <p className="mt-1 font-medium">
                {profile?.name || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Email
              </p>

              <p className="mt-1 font-medium">
                {profile?.email || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Phone
              </p>

              <p className="mt-1 font-medium">
                {profile?.phone || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Role
              </p>

              <span className="mt-1 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {profile?.role || "CUSTOMER"}
              </span>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Account Status
              </p>

              <span className="mt-1 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                {profile?.activeStatus || "ACTIVE"}
              </span>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Member Since
              </p>

              <p className="mt-1 font-medium">
                {profile?.createdAt
                  ? new Intl.DateTimeFormat("en-BD", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(profile.createdAt))
                  : "Not available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}