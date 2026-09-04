"use client";

import { useWizard } from "../WizardContext";
import { FileText } from "lucide-react";

export function Step12VisaDocs() {
  const { state, updateState } = useWizard();

  const handleUpdate = (field: keyof typeof state.visa, value: boolean) => {
    updateState({
      visa: {
        ...state.visa,
        [field]: value
      }
    });
  };

  const docOptions = [
    { id: "visaAssistance", title: "Visa Processing Assistance", desc: "EventStay will help guests apply for and track tourist/business visas." },
    { id: "passportVerification", title: "Passport Verification", desc: "Require guests to upload passport copies during registration." },
    { id: "invitationLetters", title: "Official Invitation Letters", desc: "Automatically generate letters for embassy applications." },
    { id: "travelInsurance", title: "Travel Insurance", desc: "Provide mandatory or optional travel insurance packages." },
  ];

  return (
    <div className="p-8 md:p-12 h-full flex flex-col">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Visa & Documentation</h2>
        <p className="text-gray-500 text-lg">What travel documentation and support do your guests require?</p>
      </div>

      <div className="space-y-4 max-w-3xl">
        {docOptions.map((opt) => (
          <div key={opt.id} className="flex items-start gap-4 p-6 rounded-2xl border transition-colors border-gray-200 hover:border-blue-300">
            <div className="flex h-6 items-center">
              <input
                id={opt.id}
                type="checkbox"
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                checked={state.visa[opt.id as keyof typeof state.visa]}
                onChange={(e) => handleUpdate(opt.id as keyof typeof state.visa, e.target.checked)}
              />
            </div>
            <div className="flex-1">
              <label htmlFor={opt.id} className="font-bold text-gray-900 block mb-1 cursor-pointer">{opt.title}</label>
              <p className="text-sm text-gray-500">{opt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
