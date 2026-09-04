import { InventoryPageClient } from "@/features/inventory/components/InventoryPageClient";

export default async function EventInventoryPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;

  return (
    <div className="bg-white min-h-screen">
      <InventoryPageClient eventId={eventId} />
    </div>
  );
}
