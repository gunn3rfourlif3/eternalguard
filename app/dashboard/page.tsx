'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Import your existing logic and components
import { locales, LocaleKey } from "@/lib/locales"; 
import DashboardBackground from "@/components/Background";
import DesktopDashboard from '@/components/DesktopDashboard';
import MobileDashboard from '@/components/MobileDashboard';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("home");
  const [lang, setLang] = useState<LocaleKey>("en");
  const [userData, setUserData] = useState<any>(null);
  const [percentage, setPercentage] = useState(0); // Dedicated progress state
  const [isMobile, setIsMobile] = useState(false);

  // 1. Responsive Logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Global Verification Fetcher
  const fetchGlobalProgress = useCallback(async () => {
    try {
      const res = await fetch('/api/vault?progress=true');
      const data = await res.json();
      if (data.success) {
        setPercentage(data.percentage);
      }
    } catch (error) {
      console.error("Progress fetch error:", error);
    }
  }, []);

  // 3. Auth & RDS Data Hydration
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      // Fetch user profile
      fetch('/api/user/me')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUserData(data.user);
            // Fallback to DB percentage if the live calculation isn't ready
            setPercentage(data.user.verificationPercentage || 0);
          }
        });
      
      // Fetch live progress calculation
      fetchGlobalProgress();
    }
  }, [status, router, fetchGlobalProgress]);

  // 4. Formatting & Toggle Logic
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

  // 5. Consolidate props
  const commonProps = { 
    t, 
    lang, 
    userName: userData.fullName, 
    isPremiumPaid: userData.isPremiumPaid, 
    percentage, // Use the live state instead of userData static value
    activeTab, 
    setActiveTab, 
    toggleLanguage, 
    format,
    userId: session?.user?.id, // Pass userId for the Modal
    onRefresh: fetchGlobalProgress, // Pass refresh trigger
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