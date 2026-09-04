import { bookingsData } from "@/data/bookings";
import { eventsData } from "@/data/events";

export default async function EventBookingsPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const event = eventsData.find((e) => e.id === eventId);
  const bookings = bookingsData.filter(b => b.eventName === event?.name);

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
      <div className="p-8 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-2xl font-display text-white">Guest Bookings</h2>
        <span className="text-sm text-white/50">{bookings.length} total</span>
      </div>
      
      {bookings.length === 0 ? (
        <div className="p-8 text-white/50">No bookings yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-white/40">
                <th className="p-6 font-medium">ID</th>
                <th className="p-6 font-medium">Guest</th>
                <th className="p-6 font-medium">Stay Details</th>
                <th className="p-6 font-medium">Amount</th>
                <th className="p-6 font-medium">Payment</th>
                <th className="p-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 font-mono text-xs text-white/60">{booking.id}</td>
                  <td className="p-6 text-white">{booking.guestName}</td>
                  <td className="p-6">
                    <div className="text-white mb-1">{booking.hotelName}</div>
                    <div className="text-white/50 text-xs">{booking.roomType} · {booking.nights} nights</div>
                  </td>
                  <td className="p-6 text-white">₹{booking.amount}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full ${
                      booking.paymentStatus === 'Paid' ? 'text-green-400 bg-green-400/10' :
                      booking.paymentStatus === 'Payment Pending' ? 'text-yellow-400 bg-yellow-400/10' :
                      'text-white/50 bg-white/5'
                    }`}>
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full ${
                      booking.bookingStatus === 'Confirmed' ? 'text-[#eca8d6] bg-[#eca8d6]/10' :
                      booking.bookingStatus === 'Held' ? 'text-blue-400 bg-blue-400/10' :
                      'text-red-400 bg-red-400/10'
                    }`}>
                      {booking.bookingStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
