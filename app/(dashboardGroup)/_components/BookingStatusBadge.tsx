type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

const statusStyles: Record<BookingStatus, string> = {
  REQUESTED:
    "bg-yellow-100 text-yellow-700",
  ACCEPTED:
    "bg-blue-100 text-blue-700",
  DECLINED:
    "bg-red-100 text-red-700",
  PAID:
    "bg-purple-100 text-purple-700",
  IN_PROGRESS:
    "bg-green-100 text-green-700",
  COMPLETED:
    "bg-gray-100 text-gray-700",
  CANCELLED:
    "bg-red-200 text-red-800",
};

const BookingStatusBadge = ({
  status,
}: BookingStatusBadgeProps) => {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
};

export default BookingStatusBadge;