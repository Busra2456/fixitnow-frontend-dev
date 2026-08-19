type Payment = {
  id: string;
  bookingId: string;
  service: string;
  amount: string;
  method: string;
  date: string;
  status: "PAID" | "PENDING" | "FAILED";
};

const payments: Payment[] = [
  {
    id: "PAY-001",
    bookingId: "BK-001",
    service: "AC Repair",
    amount: "৳1,500",
    method: "SSLCommerz",
    date: "18 Aug 2026",
    status: "PAID",
  },
  {
    id: "PAY-002",
    bookingId: "BK-003",
    service: "Electrical Repair",
    amount: "৳1,000",
    method: "Stripe",
    date: "12 Aug 2026",
    status: "PAID",
  },
  {
    id: "PAY-003",
    bookingId: "BK-004",
    service: "Home Cleaning",
    amount: "৳1,800",
    method: "SSLCommerz",
    date: "10 Aug 2026",
    status: "PENDING",
  },
];

const paymentStatusStyles = {
  PAID: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  FAILED: "bg-red-100 text-red-700",
};

const PaymentHistory = () => {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Payment History
        </h2>

        <p className="text-sm text-muted-foreground">
          View your previous service payments.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-5 py-4 text-left font-semibold">
                  Payment ID
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Service
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Amount
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Method
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Date
                </th>

                <th className="px-5 py-4 text-left font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b last:border-0"
                >
                  <td className="px-5 py-4 font-medium">
                    {payment.id}
                  </td>

                  <td className="px-5 py-4">
                    {payment.service}
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {payment.amount}
                  </td>

                  <td className="px-5 py-4">
                    {payment.method}
                  </td>

                  <td className="px-5 py-4">
                    {payment.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        paymentStatusStyles[payment.status]
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PaymentHistory;