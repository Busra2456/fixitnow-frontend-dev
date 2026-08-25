export default function Loading() {
  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="h-9 w-40 animate-pulse rounded-md bg-muted" />

          <div className="mt-3 h-5 w-72 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Filter Skeleton */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="h-10 w-full animate-pulse rounded-md bg-muted sm:max-w-sm" />

          <div className="h-10 w-full animate-pulse rounded-md bg-muted sm:max-w-xs" />
        </div>

        {/* Card Skeletons */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border bg-background p-5 shadow-sm"
            >
              <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />

              <div className="mt-4 h-4 w-full animate-pulse rounded bg-muted" />

              <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-muted" />

              <div className="mt-5 h-4 w-1/3 animate-pulse rounded bg-muted" />

              <div className="mt-5 h-10 w-full animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}