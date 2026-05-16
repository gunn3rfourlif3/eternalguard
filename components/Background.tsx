"use client";

export default function DashboardBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#FDFDFD] overflow-hidden">
      {/* Soft Top Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] rounded-full bg-[#D4AF37]/5 blur-[80px]" />
      {/* Subtle Bottom depth */}
      <div className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[50%] rounded-full bg-blue-50/30 blur-[100px]" />
    </div>
  );
}