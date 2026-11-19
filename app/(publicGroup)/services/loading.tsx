
export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Page Header */}
        <div className="mb-10">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

          <div className="mt-4 h-10 w-80 max-w-full animate-pulse rounded-lg bg-slate-200" />

          <div className="mt-4 h-4 w-full max-w-xl animate-pulse rounded bg-slate-100" />
          <div className="mt-2 h-4 w-4/5 max-w-md animate-pulse rounded bg-slate-100" />

          {/* Service Stats */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="h-9 w-40 animate-pulse rounded-full bg-slate-50 ring-1 ring-slate-200" />
            <div className="h-9 w-44 animate-pulse rounded-full bg-slate-50 ring-1 ring-slate-200" />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row">
          <div className="h-12 w-full animate-pulse rounded-xl border border-slate-200 bg-slate-50 sm:max-w-sm" />
          <div className="h-12 w-full animate-pulse rounded-xl border border-slate-200 bg-slate-50 sm:max-w-xs" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="h-14 w-14 animate-pulse rounded-2xl bg-slate-100" />

              <div className="mt-6 h-6 w-3/4 animate-pulse rounded bg-slate-200" />

              <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-100" />
              <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-100" />

              <div className="mt-5 h-4 w-2/5 animate-pulse rounded bg-slate-100" />

              <div className="mt-6 h-11 w-full animate-pulse rounded-xl bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
