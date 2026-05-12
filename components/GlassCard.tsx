"use client";
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-white/40 backdrop-blur-[30px]
        border border-white/60 
        shadow-[0_15px_35px_rgba(0,0,0,0.03)]
        rounded-[2.5rem]
        ${onClick ? 'cursor-pointer hover:bg-white/50 transition-colors' : ''}
        ${className}
      `}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-white/80" />
      {children}
    </motion.div>
  );
}