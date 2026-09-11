import { DynamicEventMicrosite } from "@/features/event-microsite/DynamicEventMicrosite";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { eventsApi } from "@/services/events";

export default async function DynamicEventMicrositePage(
  props: { params: Promise<{ slug: string }>; searchParams?: Promise<{ preview?: string }> }
) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const isPreview = searchParams?.preview === 'true';
  
  let eventData = null;
  let errorState = null;

  try {
    // For a real server component we would either need the user's token from cookies
    // or we fetch using the public endpoint. Since getBySlug uses api.get, 
    // it will throw a 404/403 if it's unpublished and we aren't sending a token.
    // In preview mode, Next.js server components can't easily read the Clerk token without specific setup.
    // Assuming api.get will just execute. In a real app we might pass headers.
    eventData = await eventsApi.getBySlug(slug);
  } catch (error: any) {
    if (error?.response?.data?.code === 'EVENT_UNPUBLISHED') {
      errorState = 'UNPUBLISHED';
    } else {
      errorState = 'NOT_FOUND';
    }
  }

  if (errorState) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-display text-white mb-4">Event Not Available</h1>
        <p className="text-white/50 max-w-md mx-auto">
          {errorState === 'UNPUBLISHED' 
            ? "This event page is currently unavailable or has been unpublished by the organizer."
            : "We couldn't find the event you're looking for. Please check the link and try again."}
        </p>
      </div>
    );
  }

  if (!eventData) return null;

  return (
    <div className="relative min-h-screen bg-black">
      <Navbar />
      <DynamicEventMicrosite event={eventData as any} />
      <Footer />
    </div>
  );
}
