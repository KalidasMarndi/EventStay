"use client";

import React, { useEffect, useState, use } from 'react';
import { useAuth } from '@clerk/nextjs';
import { eventsApi } from '@/services/events';
import type { Event } from '@/types/api-types';
import Link from 'next/link';
import { ArrowUpRight, Copy, CheckCircle2, Globe, Eye, Settings2 } from 'lucide-react';

export default function MicrositeConfigPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = use(params);
  const { getToken } = useAuth();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const [config, setConfig] = useState({
    primaryColor: '#eca8d6',
    welcomeHeadline: 'Welcome to our event',
    welcomeMessage: 'We are excited to host you.',
    heroImage: '',
    enableSchedule: true,
    enableStays: true,
    enableTravel: false,
    enableVenue: true,
    enableContact: true
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadEvent() {
      try {
        const token = await getToken();
        if (!token) return;
        const res = await eventsApi.getById(eventId, token);
        setEvent(res);
        if (res.micrositeConfig) {
          setConfig({ ...config, ...(res.micrositeConfig as any) });
        }
      } catch (error) {
        console.error('Failed to load event:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadEvent();
  }, [eventId, getToken]);

  const handleSaveConfig = async () => {
    try {
      setIsSaving(true);
      const token = await getToken();
      if (!token) return;
      
      const updated = await eventsApi.updateMicrosite(eventId, config, token);
      setEvent(updated);
      alert('Configuration saved successfully');
    } catch (error) {
      console.error('Failed to save config:', error);
      alert('Failed to save configuration');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishToggle = async () => {
    if (!event) return;
    try {
      setIsPublishing(true);
      const token = await getToken();
      if (!token) return;

      if (event.status === 'PUBLISHED') {
        const updated = await eventsApi.unpublish(eventId, token);
        setEvent(updated);
      } else {
        const updated = await eventsApi.publish(eventId, token);
        setEvent(updated);
      }
    } catch (error: any) {
      console.error('Publishing failed:', error);
      alert(error?.response?.data?.message || 'Action failed. Please check required event details.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCopyLink = () => {
    if (!event?.slug) return;
    const url = `${window.location.origin}/event/${event.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) return <div className="text-white/50 p-8">Loading configuration...</div>;
  if (!event) return <div className="text-white/50 p-8">Event not found</div>;

  const publicUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/event/${event.slug}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      {/* Left Column - Configuration */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-display mb-6 flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-[#eca8d6]" />
            Microsite Branding & Content
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-white/60 mb-2">Primary Color</label>
              <div className="flex items-center gap-4">
                <input 
                  type="color" 
                  value={config.primaryColor}
                  onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                  className="w-10 h-10 rounded border-0 bg-transparent p-0 cursor-pointer"
                />
                <span className="text-sm text-white/80 font-mono">{config.primaryColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Welcome Headline</label>
              <input 
                type="text" 
                value={config.welcomeHeadline}
                onChange={(e) => setConfig({ ...config, welcomeHeadline: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#eca8d6]/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Welcome Message</label>
              <textarea 
                value={config.welcomeMessage}
                onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#eca8d6]/50 transition-colors h-24 resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm text-white/60 mb-2">Hero Image URL (Optional)</label>
              <input 
                type="text" 
                placeholder="https://example.com/image.jpg"
                value={config.heroImage}
                onChange={(e) => setConfig({ ...config, heroImage: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#eca8d6]/50 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-display mb-6">Enabled Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'enableSchedule', label: 'Itinerary / Schedule' },
              { id: 'enableStays', label: 'Accommodation / Stays' },
              { id: 'enableTravel', label: 'Travel Services' },
              { id: 'enableVenue', label: 'Venue Information' },
              { id: 'enableContact', label: 'Contact & Support' },
            ].map((section) => (
              <label key={section.id} className="flex items-center gap-3 p-4 bg-black/50 border border-white/5 rounded-xl cursor-pointer hover:border-white/20 transition-colors">
                <input 
                  type="checkbox"
                  checked={config[section.id as keyof typeof config] as boolean}
                  onChange={(e) => setConfig({ ...config, [section.id]: e.target.checked })}
                  className="w-4 h-4 rounded border-white/20 text-[#eca8d6] focus:ring-[#eca8d6] focus:ring-offset-black bg-black"
                />
                <span className="text-sm text-white/80">{section.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          onClick={handleSaveConfig}
          disabled={isSaving}
          className="px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>

      {/* Right Column - Publishing & Status */}
      <div className="space-y-6">
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-display mb-6">Publication Status</h3>
          
          <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl bg-black/50 border border-white/5">
            <div className={`w-3 h-3 rounded-full ${event.status === 'PUBLISHED' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="text-sm font-medium text-white">{event.status}</span>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handlePublishToggle}
              disabled={isPublishing}
              className={`w-full py-4 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 ${
                event.status === 'PUBLISHED' 
                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                  : 'bg-[#eca8d6] text-black hover:bg-[#d698c2]'
              }`}
            >
              {isPublishing ? 'Processing...' : event.status === 'PUBLISHED' ? 'UNPUBLISH MICROSITE' : 'PUBLISH MICROSITE'}
            </button>

            <Link 
              href={`/event/${event.slug}?preview=true`}
              target="_blank"
              className="w-full flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm transition-colors text-white"
            >
              <Eye className="w-4 h-4" /> Preview Microsite
            </Link>
          </div>
        </div>

        {event.status === 'PUBLISHED' && (
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-display mb-4">Public Link</h3>
            <p className="text-sm text-white/50 mb-4">Share this link with your guests.</p>
            
            <div className="flex items-center gap-2 p-3 bg-black/50 border border-white/10 rounded-xl mb-4 overflow-hidden">
              <Globe className="w-4 h-4 text-white/40 shrink-0" />
              <span className="text-xs text-white/60 truncate font-mono">{publicUrl}</span>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-medium transition-colors"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy Link'}
              </button>
              <Link 
                href={publicUrl}
                target="_blank"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-medium transition-colors"
              >
                Open <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
