"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteModal({ isOpen, onClose, onConfirm, title }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl border border-white/50 overflow-hidden"
          >
            {/* Elegant Warning Header */}
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-2">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Confirm Deletion</h3>
              <p className="text-sm text-slate-500 leading-relaxed px-4">
                Are you sure you want to remove <span className="font-bold text-slate-700">"{title}"</span>? This action is permanent and will decrypt the record from the cloud.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-8">
              <button 
                onClick={onConfirm}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-red-200 hover:bg-red-600 transition-all active:scale-[0.98]"
              >
                Permanently Delete
              </button>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-100 transition-all"
              >
                Keep Secure
              </button>
            </div>

            <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 hover:text-slate-500">
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}