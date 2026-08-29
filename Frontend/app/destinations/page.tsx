import { Destination as DestinationFeature } from "@/features/destination/Destination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations | EventStay",
  description: "Discover destinations designed for destination weddings, corporate offsites, MICE events, and group celebrations.",
};

export default function DestinationsPage() {
  return <DestinationFeature />;
}
