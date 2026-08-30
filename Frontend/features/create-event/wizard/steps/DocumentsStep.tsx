"use client";

import { useWizard } from "../WizardContext";
import { WizardShell } from "../components/WizardShell";
import { UploadCloud, FileText, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const MOCK_DOCS = [
  { id: "doc-1", name: "EventItinerary.pdf", type: "Itinerary", status: "uploaded" },
  { id: "doc-2", name: "GuestManifest.csv", type: "Manifest", status: "processing" },
];

export function DocumentsStep() {
  const { state, nextStep } = useWizard();
  const [isDragging, setIsDragging] = useState(false);

  // In a real app, we'd use state.documents and an upload API.
  // Here we use a mock visual state.

  return (
    <WizardShell onNext={nextStep}>
      <div className="max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif mb-2">Travel Documents</h2>
          <p className="text-white/50 font-mono text-sm uppercase tracking-widest leading-relaxed">
            Keep everything your group needs in one secure place
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Upload Area */}
          <div>
            <div 
              className={cn(
                "border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-all duration-300",
                isDragging 
                  ? "border-[#eab308] bg-[#eab308]/5" 
                  : "border-white/20 bg-white/5 hover:bg-white/10"
              )}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <UploadCloud className="w-8 h-8 text-[#eab308]" />
              </div>
              <h3 className="text-xl font-serif mb-2">Drop Documents Here</h3>
              <p className="text-white/40 text-sm mb-6">or browse from your device</p>
              
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/50">PDF</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/50">JPG</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/50">PNG</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Uploaded Files</h4>
              {MOCK_DOCS.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4">
                    <FileText className="w-5 h-5 text-white/50" />
                    <div>
                      <div className="text-sm text-white">{doc.name}</div>
                      <div className="text-xs text-white/40">{doc.type}</div>
                    </div>
                  </div>
                  {doc.status === 'uploaded' ? (
                    <div className="flex items-center gap-2 text-emerald-400 text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      Uploaded
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[#eab308] text-xs">
                      <Clock className="w-4 h-4" />
                      Processing
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Group Matrix */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="font-serif text-xl mb-2">Guest Documentation</h3>
            <p className="text-white/40 text-sm mb-8">Track document collection for your attendees.</p>

            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 pb-2 border-b border-white/10 text-xs font-mono uppercase tracking-widest text-white/40">
                <div className="col-span-2">Traveler</div>
                <div className="text-center">Passport</div>
                <div className="text-center">Visa</div>
              </div>

              {/* Rows */}
              {[
                { name: "John Doe", pass: true, visa: false },
                { name: "Jane Smith", pass: true, visa: true },
                { name: "Michael Chang", pass: false, visa: false },
                { name: "Sarah Williams", pass: true, visa: true },
                { name: "David Kim", pass: true, visa: false },
              ].map((guest, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 items-center py-2">
                  <div className="col-span-2 text-sm text-white/80">{guest.name}</div>
                  <div className="flex justify-center">
                    {guest.pass ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <div className="w-2 h-2 rounded-full bg-white/20" />}
                  </div>
                  <div className="flex justify-center">
                    {guest.visa ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <div className="w-2 h-2 rounded-full bg-white/20" />}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-3 rounded-xl border border-white/10 bg-white/5 text-sm font-mono uppercase tracking-widest text-white/70 hover:bg-white/10 transition-colors">
              Request Missing Docs
            </button>
          </div>

        </div>
      </div>
    </WizardShell>
  );
}
