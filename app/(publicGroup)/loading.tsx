
export default function PublicLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="h-8 w-64 rounded-lg bg-slate-200" />
        <div className="h-4 w-96 max-w-full rounded bg-slate-100" />
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <div className="h-10 w-32 rounded-full bg-slate-200" />
        <div className="h-10 w-32 rounded-full bg-slate-100" />
        <div className="h-10 w-32 rounded-full bg-slate-100" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div className="h-48 bg-slate-200" />
            <div className="space-y-4 p-5">
              <div className="h-5 w-3/4 rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-100" />
              <div className="h-4 w-2/3 rounded bg-slate-100" />
              <div className="h-10 w-full rounded-lg bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
