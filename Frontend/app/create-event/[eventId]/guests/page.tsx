import { guestsData } from "@/data/guests";
import { eventsData } from "@/data/events";

export default async function EventGuestsPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const event = eventsData.find((e) => e.id === eventId);
  const guests = guestsData.filter(g => g.event === event?.name);

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
      <div className="p-8 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-2xl font-display text-white">Guest List</h2>
        <span className="text-sm text-white/50">{guests.length} guests</span>
      </div>
      
      {guests.length === 0 ? (
        <div className="p-8 text-white/50">No guests found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-white/40">
                <th className="p-6 font-medium">Guest</th>
                <th className="p-6 font-medium">Contact</th>
                <th className="p-6 font-medium">Stay</th>
                <th className="p-6 font-medium">Status</th>
                <th className="p-6 font-medium">Travel</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {guests.map((guest) => (
                <tr key={guest.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6">
                    <div className="text-white font-medium mb-1">{guest.name}</div>
                    <div className="text-white/50 text-xs">{guest.country}</div>
                  </td>
                  <td className="p-6">
                    <div className="text-white/80">{guest.email}</div>
                    <div className="text-white/50 text-xs mt-1">{guest.phone}</div>
                  </td>
                  <td className="p-6">
                    <div className="text-white mb-1">{guest.roomType}</div>
                    <div className="text-white/50 text-xs">{new Date(guest.checkIn).toLocaleDateString()} - {new Date(guest.checkOut).toLocaleDateString()}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-2">
                      <span className={`w-fit px-3 py-1 text-[10px] uppercase tracking-wider rounded-full ${
                        guest.bookingStatus === 'Confirmed' ? 'text-[#eca8d6] bg-[#eca8d6]/10' :
                        guest.bookingStatus === 'Held' ? 'text-blue-400 bg-blue-400/10' :
                        'text-white/50 bg-white/5'
                      }`}>
                        {guest.bookingStatus}
                      </span>
                      <span className={`w-fit px-3 py-1 text-[10px] uppercase tracking-wider rounded-full ${
                        guest.paymentStatus === 'Paid' ? 'text-green-400 bg-green-400/10' :
                        'text-yellow-400 bg-yellow-400/10'
                      }`}>
                        {guest.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full border border-white/10 ${
                      guest.travelStatus === 'Not Arrived' ? 'text-white/50' : 'text-white'
                    }`}>
                      {guest.travelStatus}
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
