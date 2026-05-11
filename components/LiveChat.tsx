"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useState } from "react";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'agent', text: "Hi Vernon, I'm the EternalGuard Agent. How can I help you today?" }
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // API call placeholder for WhatsApp/VPS Bridge
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, userId: 'vernon_venter' }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'agent', text: data.reply || "I'm processing that for you." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'agent', text: "Connection issues. Please try again or use WhatsApp." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">Agent Active</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="h-64 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-2xl shadow-sm max-w-[85%] text-[11px] leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-eternal-gold text-white self-end rounded-br-none' 
                    : 'bg-white text-slate-600 self-start rounded-tl-none border border-slate-100'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-1 self-start p-2 bg-white rounded-full border border-slate-100 shadow-sm">
                  <Loader2 size={12} className="animate-spin text-slate-400" />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..." 
                className="flex-1 text-xs bg-slate-50 border-none focus:ring-0 rounded-full px-4 py-2"
              />
              <button onClick={handleSend} className="text-eternal-gold p-1 hover:scale-110 transition-transform">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-xl shadow-black/20"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
}