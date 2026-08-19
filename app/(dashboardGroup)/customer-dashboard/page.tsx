import CustomerStats from "../_components/CustomerStats";
import UpcomingBooking from "../_components/UpcomingBooking";
import BookingTable from "../_components/BookingTable";
import QuickActions from "../_components/QuickActions";

export default function CustomerDashboardPage() {
  return (
    <div>
      <CustomerStats />
      <UpcomingBooking />
      <BookingTable />
      <QuickActions />
    </div>
  );
}