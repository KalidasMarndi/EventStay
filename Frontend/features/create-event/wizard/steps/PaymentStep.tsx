"use client";

import { useWizard } from "../WizardContext";
import { WizardShell } from "../components/WizardShell";
import { useState, useEffect } from "react";
import { CreditCard, QrCode, Smartphone, Building, ShieldCheck, ArrowRight, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type PaymentMethod = "card" | "upi" | "qr" | "netbanking";
type PaymentStatus = "idle" | "processing" | "success" | "failed";

export function PaymentStep() {
  const { nextStep } = useWizard();
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins for QR

  useEffect(() => {
    if (method === "qr" && timeLeft > 0 && status === "idle") {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [method, timeLeft, status]);

  const handlePayment = async () => {
    setStatus("processing");
    
    // Simulate API call and payment processing
    setTimeout(() => {
      // In a real app, Card would redirect to Stripe here using paymentsApi.createSession()
      // For UPI/QR/Netbanking, we simulate a successful callback
      setStatus("success");
      
      // Auto-advance to confirmation after success
      setTimeout(() => {
        nextStep();
      }, 1500);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (status === "processing" || status === "success") {
    return (
      <WizardShell canGoNext={false}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in zoom-in duration-500">
          {status === "processing" ? (
            <>
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full border-2 border-white/10 border-t-[#eab308] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-white/30" />
                </div>
              </div>
              <h2 className="text-3xl font-serif mb-4">Securing Your Event</h2>
              <p className="text-white/50 font-mono text-sm uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                Please don't close this page while we confirm your reservation.
              </p>
            </>
          ) : (
            <>
              <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 text-emerald-400 animate-in zoom-in-50 duration-500">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-serif mb-4">Payment Successful</h2>
              <p className="text-white/50 font-mono text-sm uppercase tracking-widest">
                Redirecting to confirmation...
              </p>
            </>
          )}
        </div>
      </WizardShell>
    );
  }

  return (
    <WizardShell onNext={handlePayment} nextLabel={method === "card" ? "PROCEED TO STRIPE" : "VERIFY & PAY"}>
      <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="mb-12">
          <h2 className="text-3xl font-serif mb-2">Payment</h2>
          <p className="text-white/50 font-mono text-sm uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Checkout
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Methods Sidebar */}
          <div className="col-span-1 md:col-span-4 space-y-3">
            <MethodTab id="card" label="Credit Card" icon={CreditCard} current={method} set={setMethod} />
            <MethodTab id="upi" label="UPI ID" icon={Smartphone} current={method} set={setMethod} />
            <MethodTab id="qr" label="QR Code" icon={QrCode} current={method} set={setMethod} />
            <MethodTab id="netbanking" label="Net Banking" icon={Building} current={method} set={setMethod} />
          </div>

          {/* Payment Area */}
          <div className="col-span-1 md:col-span-8 bg-white/5 border border-white/10 rounded-3xl p-8 min-h-[400px] flex flex-col justify-center">
            
            {method === "card" && (
              <div className="text-center max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-full bg-[#eab308]/10 flex items-center justify-center mx-auto mb-6 text-[#eab308]">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl mb-4">Pay with Card</h3>
                <p className="text-white/50 text-sm mb-8 leading-relaxed">
                  You will be redirected to our secure payment partner (Stripe) to complete your transaction.
                </p>
                <div className="flex items-center justify-center gap-4 text-xs font-mono uppercase tracking-widest text-white/30">
                  <span>Visa</span> • <span>Mastercard</span> • <span>Amex</span>
                </div>
              </div>
            )}

            {method === "upi" && (
              <div className="max-w-sm mx-auto w-full">
                <h3 className="font-serif text-2xl mb-6 text-center">Enter UPI ID</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-white/70 uppercase tracking-wider mb-2 block">UPI ID / VPA</label>
                    <input 
                      type="text" 
                      placeholder="name@upi" 
                      className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#eab308] transition-colors"
                    />
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50 flex gap-3 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
                    Open your UPI app (GPay, PhonePe, Paytm) after clicking verify to approve the payment.
                  </div>
                </div>
              </div>
            )}

            {method === "qr" && (
              <div className="text-center">
                <h3 className="font-serif text-2xl mb-8">Scan to Pay</h3>
                
                <div className="inline-block p-4 bg-white rounded-2xl mb-6">
                  {/* Mock QR placeholder */}
                  <div className="w-48 h-48 bg-gray-200 rounded-xl relative flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-black/20" />
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-contain opacity-50 mix-blend-multiply" />
                  </div>
                </div>
                
                <div className="font-mono text-2xl text-[#eab308] mb-2">{formatTime(timeLeft)}</div>
                <p className="text-white/40 text-sm">Scan using any supported UPI application</p>
                <p className="text-white/30 text-xs mt-2 italic">Waiting for payment confirmation...</p>
              </div>
            )}

            {method === "netbanking" && (
              <div>
                <h3 className="font-serif text-2xl mb-6 text-center">Select Bank</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {["HDFC", "ICICI", "SBI", "Axis", "Kotak", "Yes Bank"].map(bank => (
                    <button key={bank} className="py-4 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 hover:border-[#eab308]/50 transition-all text-sm font-mono">
                      {bank}
                    </button>
                  ))}
                </div>
                <div className="text-center">
                  <span className="text-xs text-[#eab308] underline cursor-pointer hover:text-white transition-colors">
                    Search other banks
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </WizardShell>
  );
}

function MethodTab({ id, label, icon: Icon, current, set }: any) {
  const isSelected = current === id;
  return (
    <button
      onClick={() => set(id)}
      className={cn(
        "w-full flex items-center gap-4 px-6 py-5 rounded-2xl border transition-all duration-300 text-left",
        isSelected 
          ? "border-[#eab308] bg-[#eab308]/10 text-white" 
          : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
      )}
    >
      <Icon className={cn("w-5 h-5", isSelected ? "text-[#eab308]" : "")} />
      <span className="font-mono uppercase tracking-widest text-xs">{label}</span>
      {isSelected && <ArrowRight className="w-4 h-4 ml-auto text-[#eab308]" />}
    </button>
  );
}
