"use client";

export default function DashboardBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#FDFDFD] overflow-hidden">
      {/* Soft Top Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] rounded-full bg-eternal-gold/5 blur-[80px]" />
    </div>
  );
}