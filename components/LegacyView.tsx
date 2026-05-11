"use client";

import { Heart, Video, MessageSquare, Lock } from "lucide-react";

export default function LegacyView() {
  return (
    <div className="w-full flex flex-col gap-4 mt-8">
      <div className="px-2">
        <h3 className="text-lg font-bold text-slate-800">Legacy Bot</h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Final Wishes</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <button className="bg-white border border-slate-100 p-5 rounded-3xl flex items-center gap-4 text-left shadow-sm active:scale-[0.98] transition-transform">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <Video size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Video Messages</p>
            <p className="text-[10px] text-slate-400 uppercase font-bold">0 Recorded</p>
          </div>
        </button>

        <button className="bg-white border border-slate-100 p-5 rounded-3xl flex items-center gap-4 text-left shadow-sm active:scale-[0.98] transition-transform">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Final Directives</p>
            <p className="text-[10px] text-slate-400 uppercase font-bold">View Templates</p>
          </div>
        </button>
      </div>
    </div>
  );
}