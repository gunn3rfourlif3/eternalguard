'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Import your existing logic and components
import { locales, LocaleKey } from "@/lib/locales"; // RESTORES LABELS
import DashboardBackground from "@/components/Background";
import DesktopDashboard from '@/components/DesktopDashboard';
import MobileDashboard from '@/components/MobileDashboard';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // State from your original entry point
  const [activeTab, setActiveTab] = useState("home");
  const [lang, setLang] = useState<LocaleKey>("en");
  const [userData, setUserData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Restore Responsive Logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Restore Auth & RDS Data Hydration
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetch('/api/user/me')
        .then(res => res.json())
        .then(data => {
          if (data.success) setUserData(data.user);
        });
    }
  }, [status, router]);

  // 3. Restore your original Formatting & Toggle Logic
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

  if (status === 'loading' || !userData) {
    return <div className="h-screen w-screen bg-slate-50 flex items-center justify-center font-black italic text-eternal-gold animate-pulse uppercase">ETERNAL GUARD...</div>;
  }

  // 4. Consolidate props for your UI
  const commonProps = { 
    t, 
    lang, 
    userName: userData.fullName, 
    isPremiumPaid: userData.isPremiumPaid, 
    percentage: userData.verificationPercentage,
    activeTab, 
    setActiveTab, 
    toggleLanguage, 
    format,
    handleLogout: () => signOut({ callbackUrl: '/login' })
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden relative text-slate-900 selection:bg-eternal-gold/20 antialiased font-sans">
      <DashboardBackground />
      {/* Desktop View */}
      <div className="hidden lg:block h-full">
        <DesktopDashboard {...commonProps} />
      </div>
      {/* Mobile View */}
      <div className="block lg:hidden h-full">
        <MobileDashboard {...commonProps} />
      </div>
    </div>
  );
}