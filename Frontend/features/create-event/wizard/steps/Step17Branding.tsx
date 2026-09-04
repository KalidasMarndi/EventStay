"use client";

import { useWizard } from "../WizardContext";
import { Image as ImageIcon, Palette, MessageSquare } from "lucide-react";

export function Step17Branding() {
  const { state, updateState } = useWizard();

  const handleUpdate = (field: keyof typeof state.branding, value: string) => {
    updateState({
      branding: {
        ...state.branding,
        [field]: value
      }
    });
  };

  return (
    <div className="p-8 md:p-12 h-full flex flex-col">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Event Branding</h2>
        <p className="text-gray-500 text-lg">Customize the look and feel of your event microsite.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-gray-400" /> Imagery
            </h3>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Hero Image URL</label>
              <input
                type="text"
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900"
                value={state.featuredImage}
                onChange={(e) => updateState({ featuredImage: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">Main background image for the event page.</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 flex items-center gap-2">
              <Palette className="w-4 h-4 text-gray-400" /> Colors
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                    value={state.branding.primaryColor}
                    onChange={(e) => handleUpdate("primaryColor", e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 outline-none text-sm font-mono text-gray-900"
                    value={state.branding.primaryColor}
                    onChange={(e) => handleUpdate("primaryColor", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Secondary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                    value={state.branding.secondaryColor}
                    onChange={(e) => handleUpdate("secondaryColor", e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-600 outline-none text-sm font-mono text-gray-900"
                    value={state.branding.secondaryColor}
                    onChange={(e) => handleUpdate("secondaryColor", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-400" /> Messaging
            </h3>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Welcome Message</label>
              <textarea
                placeholder="Welcome to our annual summit..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900 resize-none"
                value={state.branding.welcomeMessage}
                onChange={(e) => handleUpdate("welcomeMessage", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Microsite Preview */}
        <div>
          <div className="sticky top-12 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 text-center text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Microsite Preview
              </div>
            </div>
            
            <div className="bg-white min-h-[400px] relative">
              <div 
                className="h-40 w-full bg-gray-200 relative flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: state.branding.primaryColor }}
              >
                {state.featuredImage ? (
                  <img src={state.featuredImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-white/30" />
                )}
                <h1 className="relative z-10 text-white font-bold text-2xl text-center px-4">
                  {state.title || "Your Event Name"}
                </h1>
              </div>
              
              <div className="p-6">
                <div 
                  className="w-16 h-1 rounded-full mb-6"
                  style={{ backgroundColor: state.branding.secondaryColor !== '#F8FAFC' ? state.branding.secondaryColor : state.branding.primaryColor }}
                />
                <h2 className="text-lg font-bold text-gray-900 mb-2">Welcome</h2>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {state.branding.welcomeMessage || "Welcome message will appear here..."}
                </p>
                
                <div className="mt-8">
                  <div 
                    className="w-full py-3 rounded-lg text-white text-center text-sm font-bold opacity-80"
                    style={{ backgroundColor: state.branding.primaryColor }}
                  >
                    Register Now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
