"use client";

import React, { useState, useEffect } from "react";
import { X, Check, Loader2, ArrowRight } from "lucide-react";
import { inventoryApi } from "@/services/inventoryApi";
import { bookingsApi } from "@/services/bookings";
import { paymentsApi } from "@/services/payments";
import type { Event, StayPackage } from "@/types/api-types";

interface GuestBookingWidgetProps {
  event: Event;
  stayPackage: StayPackage;
  primaryColor: string;
  onClose: () => void;
}

type BookingStep = "SELECT_QUANTITY" | "GUEST_DETAILS" | "REVIEW" | "CONFIRMING" | "PAYMENT" | "PAYMENT_FAILED" | "SUCCESS" | "EXPIRED";

export function GuestBookingWidget({ event, stayPackage, primaryColor, onClose }: GuestBookingWidgetProps) {
  const [step, setStep] = useState<BookingStep>("SELECT_QUANTITY");
  const [quantity, setQuantity] = useState(1);
  const [guestSessionId, setGuestSessionId] = useState<string>("");
  const [holdId, setHoldId] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [bookingReference, setBookingReference] = useState<string>("");
  const [paymentId, setPaymentId] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestCountry, setGuestCountry] = useState("");
  const [notes, setNotes] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [availableRooms, setAvailableRooms] = useState<number>(stayPackage.availableRooms || 0);

  // Initialize session ID
  useEffect(() => {
    let session = localStorage.getItem("guestSessionId");
    if (!session) {
      session = `session-${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem("guestSessionId", session);
    }
    setGuestSessionId(session);
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (!expiresAt) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = expiresAt - now;
      if (diff <= 0) {
        clearInterval(interval);
        if (step !== "SUCCESS") {
          setStep("EXPIRED");
        }
      } else {
        const m = Math.floor(diff / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, step]);

  const handleAcquireHold = async () => {
    if (!guestName || !guestEmail || !guestPhone || !guestCountry) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      // In production, real inventory hold
      const response = await inventoryApi.holdInventory(stayPackage.id, quantity, guestSessionId);
      
      if (response && response.holdId) {
        setHoldId(response.holdId);
        setExpiresAt(response.expiresAt);
        setStep("REVIEW");
      } else {
        setError("Could not secure inventory. Please try again.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "That room is no longer available or there was an error.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await bookingsApi.create({
        eventId: event.id,
        quantity: 1, // Event tickets quantity (default to 1 for now if tied to stay)
        stayPackageId: stayPackage.id,
        stayPackageQuantity: quantity,
        stayPackageHoldId: holdId,
        guestSessionId,
        guestName,
        guestEmail,
        guestPhone,
        guestCountry,
        notes,
      });

      if (response && response.bookingReference) {
        setBookingReference(response.bookingReference);
        
        // Initiate Payment
        const paymentRes = await paymentsApi.create({
          bookingReference: response.bookingReference,
          guestSessionId,
        });
        
        setPaymentId(paymentRes.providerPaymentId);
        setPaymentAmount(paymentRes.amount);
        setStep("PAYMENT");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "We couldn't complete your reservation. Please try again.");
      if (err?.response?.data?.code === 'INVALID_OR_EXPIRED_HOLD') {
         setStep("EXPIRED");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulatePayment = async (status: 'success' | 'fail') => {
    setIsLoading(true);
    setError("");
    try {
      const res = await paymentsApi.verify({
        bookingReference,
        paymentId,
        paymentToken: status,
      });

      if (res.success) {
        setStep("SUCCESS");
      } else {
        setStep("PAYMENT_FAILED");
      }
    } catch (err: any) {
      if (err?.response?.data?.message?.includes("expired")) {
        setStep("EXPIRED");
      } else {
        setError(err?.response?.data?.message || "Payment verification failed.");
        setStep("PAYMENT_FAILED");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => {
        if (step !== "CONFIRMING" && step !== "SUCCESS") onClose();
      }} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <div>
            <h3 className="text-2xl font-display text-white">{stayPackage.name}</h3>
            <p className="text-white/50 text-sm">Booking for {event.title}</p>
          </div>
          {step !== "SUCCESS" && step !== "CONFIRMING" && (
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* STEP: SELECT_QUANTITY */}
          {step === "SELECT_QUANTITY" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/60">Price per room</span>
                  <span className="text-2xl" style={{ color: primaryColor }}>${stayPackage.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Capacity</span>
                  <span className="text-white">Up to {stayPackage.capacity} Guests per room</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-4">Select Quantity</label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-medium w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(availableRooms, quantity + 1))}
                    disabled={quantity >= availableRooms}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-white/40 mt-3">{availableRooms} rooms available</p>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => setStep("GUEST_DETAILS")}
                  disabled={availableRooms === 0}
                  className="w-full py-4 rounded-xl text-black font-medium text-lg uppercase tracking-wider transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP: GUEST_DETAILS */}
          {step === "GUEST_DETAILS" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Country *</label>
                  <input 
                    type="text" 
                    value={guestCountry}
                    onChange={(e) => setGuestCountry(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                    placeholder="United States"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Special Requests (Optional)</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 min-h-[100px]"
                  placeholder="Any special requirements..."
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  onClick={() => setStep("SELECT_QUANTITY")}
                  className="px-6 py-4 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleAcquireHold}
                  disabled={isLoading}
                  className="flex-1 py-4 rounded-xl text-black font-medium text-lg uppercase tracking-wider transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Review & Secure Inventory"}
                </button>
              </div>
            </div>
          )}

          {/* STEP: REVIEW */}
          {step === "REVIEW" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Countdown Timer */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <span className="text-white/60 text-sm">Inventory Secured For</span>
                <span className="text-xl font-mono text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                  {timeLeft}
                </span>
              </div>

              <div className="space-y-6">
                <div className="border-b border-white/10 pb-6">
                  <h4 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-4">Stay Summary</h4>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xl font-display">{stayPackage.name}</span>
                    <span className="text-xl" style={{ color: primaryColor }}>${stayPackage.price * quantity}</span>
                  </div>
                  <div className="text-white/60">
                    {quantity} Room{quantity > 1 ? 's' : ''} • {stayPackage.capacity * quantity} Guests Max
                  </div>
                </div>

                <div className="border-b border-white/10 pb-6">
                  <h4 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-4">Guest Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
                    <div>
                      <span className="block text-white/40 text-xs mb-1">Name</span>
                      {guestName}
                    </div>
                    <div>
                      <span className="block text-white/40 text-xs mb-1">Email</span>
                      {guestEmail}
                    </div>
                    <div>
                      <span className="block text-white/40 text-xs mb-1">Phone</span>
                      {guestPhone}
                    </div>
                    <div>
                      <span className="block text-white/40 text-xs mb-1">Country</span>
                      {guestCountry}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={handleConfirmBooking}
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl text-black font-medium text-lg uppercase tracking-wider transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Proceed to Payment"}
                </button>
              </div>
            </div>
          )}

          {/* STEP: PAYMENT */}
          {step === "PAYMENT" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between mb-8">
                <span className="text-white/60 text-sm">Hold Expires In</span>
                <span className="text-xl font-mono text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                  {timeLeft}
                </span>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-display mb-2">Complete Payment</h2>
                <p className="text-white/60">Choose your payment method below.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 text-center">
                <span className="block text-sm font-mono text-white/40 uppercase tracking-widest mb-2">Amount to Pay</span>
                <span className="text-5xl font-display" style={{ color: primaryColor }}>
                  ₹{paymentAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="border border-white/20 rounded-xl p-6 relative overflow-hidden bg-white/5">
                <div className="absolute top-0 right-0 bg-white/20 text-white/80 text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-bl-lg">
                  Development Mode
                </div>
                <h4 className="text-lg font-medium text-white mb-4">Mock Payment Gateway</h4>
                <p className="text-sm text-white/60 mb-6">
                  This is a simulation. Do not enter real credentials. Click a button below to test the payment flow.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleSimulatePayment('success')}
                    disabled={isLoading}
                    className="flex-1 py-4 rounded-xl text-black font-medium tracking-wider transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simulate Success"}
                  </button>
                  <button 
                    onClick={() => handleSimulatePayment('fail')}
                    disabled={isLoading}
                    className="flex-1 py-4 rounded-xl border border-red-500/50 text-red-400 font-medium tracking-wider transition-colors hover:bg-red-500/10 disabled:opacity-50 flex items-center justify-center"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simulate Failure"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP: PAYMENT_FAILED */}
          {step === "PAYMENT_FAILED" && (
            <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <X className="w-10 h-10 text-red-400" />
              </div>
              <h2 className="text-3xl font-display mb-4">Payment Failed</h2>
              <p className="text-white/60 max-w-sm mx-auto mb-8">
                {error || "We couldn't complete your payment. Your inventory hold is still active."}
              </p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => setStep("PAYMENT")}
                  className="px-8 py-3 rounded-full text-black font-medium uppercase tracking-wider transition-opacity hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* STEP: EXPIRED */}
          {step === "EXPIRED" && (
            <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <X className="w-10 h-10 text-white/60" />
              </div>
              <h2 className="text-3xl font-display mb-4">Hold Expired</h2>
              <p className="text-white/60 max-w-sm mx-auto mb-8">
                Your inventory hold has expired. Please select your room quantity again to check current availability.
              </p>
              <button 
                onClick={() => {
                  setHoldId("");
                  setExpiresAt(null);
                  setStep("SELECT_QUANTITY");
                }}
                className="px-8 py-3 rounded-full text-black font-medium uppercase tracking-wider transition-opacity hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                Select Again
              </button>
            </div>
          )}

          {/* STEP: SUCCESS */}
          {step === "SUCCESS" && (
            <div className="py-8 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${primaryColor}20`, border: `1px solid ${primaryColor}` }}>
                <Check className="w-10 h-10" style={{ color: primaryColor }} />
              </div>
              <h2 className="text-4xl font-display text-center mb-2">Booking Confirmed</h2>
              <p className="text-white/60 text-center mb-8">Your reservation has been successfully confirmed.</p>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-2 gap-y-6 text-center">
                  <div>
                    <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Booking Ref</span>
                    <span className="text-lg font-mono text-white">{bookingReference}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Payment Status</span>
                    <span className="text-lg font-mono text-white">PAID</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Amount Paid</span>
                    <span className="text-lg font-display" style={{ color: primaryColor }}>₹{paymentAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Payment Ref</span>
                    <span className="text-lg font-mono text-white text-xs truncate max-w-full px-2" title={paymentId}>{paymentId}</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={onClose}
                  className="px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
                >
                  Back to Event
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
