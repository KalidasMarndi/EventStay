import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Left side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative z-10 overflow-y-auto">
        <div className="w-full max-w-md py-12">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent border-0 shadow-none p-0",
              }
            }}
          />
        </div>
      </div>

      {/* Right side - Image/Video */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent z-10" />
        <img 
          src="/Images/5.jpg" 
          alt="Luxury Destination" 
          className="w-full h-full object-cover opacity-80"
        />
        
        <div className="absolute bottom-16 left-16 z-20 max-w-md">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#eca8d6] mb-4">
            Become an Organizer
          </p>
          <h2 className="font-display text-4xl text-white mb-4">
            Create unforgettable experiences.
          </h2>
          <p className="text-white/60">
            Join EventStay to build private event inventory, launch branded microsites, and track your guests.
          </p>
        </div>
      </div>
    </div>
  );
}
