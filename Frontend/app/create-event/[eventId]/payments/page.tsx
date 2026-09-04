import { paymentsData } from "@/data/payments";

export default async function EventPaymentsPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const payments = paymentsData.filter(p => p.eventId === eventId);

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
      <div className="p-8 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-2xl font-display text-white">Payment Transactions</h2>
        <span className="text-sm text-white/50">{payments.length} transactions</span>
      </div>
      
      {payments.length === 0 ? (
        <div className="p-8 text-white/50">No payments yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-white/40">
                <th className="p-6 font-medium">Txn ID</th>
                <th className="p-6 font-medium">Guest</th>
                <th className="p-6 font-medium">Date</th>
                <th className="p-6 font-medium">Method</th>
                <th className="p-6 font-medium">Amount</th>
                <th className="p-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {payments.map((payment) => (
                <tr key={payment.transactionId} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 font-mono text-xs text-white/60">{payment.transactionId}</td>
                  <td className="p-6 text-white">{payment.guestName}</td>
                  <td className="p-6 text-white/60">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="p-6 text-white">{payment.method}</td>
                  <td className="p-6 text-white">₹{payment.amount}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full ${
                      payment.status === 'Completed' ? 'text-green-400 bg-green-400/10' :
                      payment.status === 'Pending' ? 'text-yellow-400 bg-yellow-400/10' :
                      'text-white/50 bg-white/5'
                    }`}>
                      {payment.status}
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
