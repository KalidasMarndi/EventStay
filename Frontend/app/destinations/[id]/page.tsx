import { destinations, getDestinationById } from "@/features/home/data/destinations";
import { notFound } from "next/navigation";
import { DestinationDetailClient } from "@/features/destination/components/DestinationDetailClient";

export function generateStaticParams() {
  return destinations.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dest = getDestinationById(id);
  if (!dest) return { title: "Destination Not Found | EventStay" };
  return {
    title: `${dest.name}, ${dest.country} | EventStay Destinations`,
    description: dest.description,
  };
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dest = getDestinationById(id);
  if (!dest) notFound();
  return <DestinationDetailClient destination={dest} />;
}
