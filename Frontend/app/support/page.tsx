import { TravelSupport as TravelSupportFeature } from "@/features/travel-support/TravelSupport";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Support | EventStay",
  description: "Global travel assistance, VIP services, visas, and logistical support for your group events.",
};

export default function SupportPage() {
  return <TravelSupportFeature />;
}
