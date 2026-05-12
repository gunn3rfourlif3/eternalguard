"use client";

import { useState, useEffect } from "react";
import { locales, LocaleKey } from "../lib/locales";
import DashboardBackground from "../components/Background";
import MobileDashboard from "../components/MobileDashboard";
import DesktopDashboard from "../components/DesktopDashboard";
import LoginView from "../components/LoginView"; // New Component

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [lang, setLang] = useState<LocaleKey>("en");
  
  // Auth State
  const [user, setUser] = useState<{ name: string; email: string; isPremium: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking session/local storage for test users
    const savedUser = localStorage.getItem("eg_user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const t = locales[lang];

  const format = (str: string, name: string) => {
    if (!str) return "";
    return str.replace(/{{name}}/g, name);
  };

  const handleLogout = () => {
  setUser(null);
  localStorage.removeItem("eg_user");
  setActiveTab("home"); // Reset tab for next login
};

  const toggleLanguage = () => {
    const keys = Object.keys(locales) as LocaleKey[];
    const nextIndex = (keys.indexOf(lang) + 1) % keys.length;
    setLang(keys[nextIndex]);
  };

  if (loading) return <div className="h-screen w-screen bg-slate-50 flex items-center justify-center font-black italic text-eternal-gold animate-pulse">ETERNAL GUARD...</div>;

  // Render Login if no user exists
  if (!user) {
    return <LoginView onLogin={(userData: any) => {
      setUser(userData);
      localStorage.setItem("eg_user", JSON.stringify(userData));
    }} />;
  }


// Add to commonProps
const commonProps = { 
  t, lang, 
  userName: user.name, 
  isPremiumPaid: user.isPremium, 
  activeTab, setActiveTab, 
  toggleLanguage, format,
  handleLogout // Pass this down
};



  return (
    <div className="h-screen w-full flex flex-col overflow-hidden relative text-slate-900 selection:bg-eternal-gold/20 antialiased font-sans">
      <DashboardBackground />
      <div className="hidden lg:block h-full"><DesktopDashboard {...commonProps} /></div>
      <div className="block lg:hidden h-full"><MobileDashboard {...commonProps} /></div>
    </div>
  );
}