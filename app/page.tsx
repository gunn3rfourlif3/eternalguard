"use client";

import { useState } from "react";
import { locales, LocaleKey } from "../lib/locales";
import DashboardBackground from "../components/Background";
import MobileDashboard from "../components/MobileDashboard";
import DesktopDashboard from "../components/DesktopDashboard";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [lang, setLang] = useState<LocaleKey>("en");
  const [userName] = useState("Vernon Venter");

  const t = locales[lang];

  const format = (str: string, name: string) => {
    if (!str) return "";
    return str.replace(/{{name}}/g, name);
  };

  const toggleLanguage = () => {
    const keys = Object.keys(locales) as LocaleKey[];
    const nextIndex = (keys.indexOf(lang) + 1) % keys.length;
    setLang(keys[nextIndex]);
  };

  const commonProps = { t, lang, userName, activeTab, setActiveTab, toggleLanguage, format };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden relative text-slate-900 selection:bg-eternal-gold/20 antialiased font-sans">
      <DashboardBackground />
      
      {/* Responsive View Switcher */}
      <div className="hidden lg:block h-full">
        <DesktopDashboard {...commonProps} />
      </div>
      <div className="block lg:hidden h-full">
        <MobileDashboard {...commonProps} />
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}