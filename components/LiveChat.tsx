"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Headphones } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface LiveChatProps {
  t: {
    chat_title?: string;
    chat_welcome?: string;
    chat_placeholder?: string;
    chat_status?: string;
  };
}

export default function LiveChat({ t }: LiveChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{ role: 'agent' | 'user', text: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Updates the conversation when the language toggle is flipped
  useEffect(() => {
    // We update the initial greeting based on the selected language
    setMessages([
      { 
        role: 'agent', 
        text: t.chat_welcome || "How may I assist you with your vault today?" 
      }
    ]);
  }, [t.chat_welcome]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input, 
          userId: 'vernon_venter',
          // Pass the title or a locale code to the backend so the AI knows the language context
          context: t.chat_title 
        }),
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
            className="mb-4 w-80 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden"
          >
            {/* Header - Updates with Language Toggle */}
            <div className="bg-slate-900 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-eternal-gold/10 rounded-full text-eternal-gold">
                  <Headphones size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white tracking-tight">{t.chat_title || "Support"}</p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t.chat_status || "Online"}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="h-80 p-4 overflow-y-auto bg-slate-50/50 flex flex-col gap-3 scroll-smooth">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-2xl shadow-sm max-w-[85%] text-[12px] leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-slate-900 text-white self-end rounded-br-none' 
                    : 'bg-white text-slate-700 self-start rounded-tl-none border border-slate-100'
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

            {/* Input Area - Placeholder Updates with Toggle */}
            <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.chat_placeholder || "Type a message..."} 
                className="flex-1 text-xs bg-slate-50 border-none focus:ring-0 rounded-xl px-4 py-3 outline-none"
              />
              <button onClick={handleSend} className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-eternal-gold transition-colors">
                <Send size={16} />
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