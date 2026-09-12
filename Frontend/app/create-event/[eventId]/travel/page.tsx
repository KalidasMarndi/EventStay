import { TravelServicesManager } from "@/features/travel/components/TravelServicesManager";

export default async function TravelServicesPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  return <TravelServicesManager eventId={eventId} />;
}
