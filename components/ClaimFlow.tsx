"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, FileText, CheckCircle2, ArrowRight, ShieldAlert, Heart } from "lucide-react";

export default function ClaimFlow() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const nextStep = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(step + 1);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col items-center mt-8 px-2">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="w-full bg-white border border-slate-100 p-6 rounded-3xl shadow-sm"
          >
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Initiate Instant Claim</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              We are here to help. This process takes less than 2 minutes. Our AI will verify your documents and initiate the payout immediately.
            </p>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <span className="text-xs font-bold text-slate-700">Policy #EG-8829-ZA Verified</span>
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full mt-8 bg-eternal-gold text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-eternal-gold/20 active:scale-95 transition-all"
            >
              Start Claim <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="w-full bg-white border border-slate-100 p-6 rounded-3xl shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-800">Proof of Event</h3>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Step 2 of 3</p>
            
            <div className="mt-6 p-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center gap-3 bg-slate-50">
              <div className="p-4 bg-white rounded-full shadow-sm text-slate-400">
                <FileText size={32} />
              </div>
              <p className="text-xs font-bold text-slate-600">Upload Death Certificate or DHA-1663</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-tighter">PDF or High-res Photo</p>
            </div>

            <button 
              onClick={nextStep}
              disabled={isProcessing}
              className="w-full mt-6 bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
            >
              {isProcessing ? "Analyzing with AI..." : "Continue"}
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-white border border-slate-100 p-8 rounded-3xl shadow-xl text-center"
          >
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Claim Processed</h3>
            <p className="text-sm text-slate-500 mt-2">
              The payout of <span className="font-bold text-slate-900">R30,000</span> has been authorized. Funds should reflect in the nominated account within 4 hours.
            </p>
            
            <div className="mt-8 p-4 bg-emerald-50/50 rounded-2xl flex items-center gap-3 border border-emerald-100">
              <Heart size={18} className="text-emerald-500" />
              <span className="text-[11px] font-bold text-emerald-700 text-left">Our team is available on WhatsApp if you need anything else.</span>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="w-full mt-6 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl active:scale-95 transition-all"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}