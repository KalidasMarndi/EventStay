import { CreateEvent as CreateEventFeature } from "@/features/create-event/CreateEvent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an Event | EventStay",
  description: "Plan your next corporate offsite, destination wedding, or group getaway with EventStay.",
};

export default function CreateEventPage() {
  return <CreateEventFeature />;
}
