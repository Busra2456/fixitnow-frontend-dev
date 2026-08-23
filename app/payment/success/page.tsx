import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
          ✓
        </div>

        <h1 className="mt-5 text-2xl font-bold">
          Payment Successful!
        </h1>

        <p className="mt-3 text-muted-foreground">
          Your payment has been completed successfully.
          Your booking is now paid.
        </p>

        <Link
          href="/customer-dashboard"
          className="mt-6 inline-block rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}