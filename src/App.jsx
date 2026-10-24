import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import OurPurpose from './components/OurPurpose';
import SilkCurtainTransition from './components/SilkCurtainTransition';
import FounderStory from './components/FounderStory';
import FounderPage from './components/FounderPage';
import ProgramsAndFieldwork from './components/ProgramsAndFieldwork';
import CommunityFuturePlan from './components/CommunityFuturePlan';
import DonationQrModal from './components/DonationQrModal';
import Footer from './components/Footer';
import RequestGuidanceModal from './components/RequestGuidanceModal';
import Ambient3DBackground from './components/Ambient3DBackground';
import { translations } from './i18n/translations';

export default function App() {
  // Persist language preference in localStorage (supports 'en', 'hi', 'mr')
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('astha_lang');
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'mr')) {
        return saved;
      }
    } catch (e) {
      // fallback
    }
    return 'en';
  });

  // Client-side view routing: 'home' vs 'founder'
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#/founder') {
      return 'founder';
    }
    return 'home';
  });

  const [guidanceModalOpen, setGuidanceModalOpen] = useState(false);
  const [donationQrOpen, setDonationQrOpen] = useState(false);

  // Synchronize document language attribute and persist
  const handleSetLang = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('astha_lang', newLang);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Hash change routing listener for browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/founder') {
        setCurrentView('founder');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToFounder = () => {
    window.location.hash = '#/founder';
    setCurrentView('founder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = (targetId = null) => {
    if (targetId) {
      window.location.hash = `#${targetId}`;
    } else {
      window.location.hash = '#';
    }
    setCurrentView('home');
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const t = translations[lang] || translations.en;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F0] text-brand-charcoal flex flex-col selection:bg-brand-gold/25 selection:text-brand-teal font-sans antialiased overflow-x-hidden">
      
      {/* Global 3D Ambient Motion Layer: Floating sacred constellation particles across the entire homepage */}
      <Ambient3DBackground />

      {/* Top Navbar with English | हिन्दी | मराठी Switcher, Quick Exit, and Guidance CTA */}
      <Navbar
        lang={lang}
        setLang={handleSetLang}
        t={t}
        onRequestGuidance={() => setGuidanceModalOpen(true)}
        currentView={currentView}
        onNavigateHome={navigateToHome}
        onOpenFounderPage={navigateToFounder}
        onOpenDonationQr={() => setDonationQrOpen(true)}
      />

      {/* Main Experience View Switcher */}
      <main className="flex-1 relative z-10">
        {currentView === 'founder' ? (
          /* Dedicated Founder Page: The Heart Behind Aastha */
          <FounderPage
            t={t}
            onBackToHome={() => navigateToHome()}
            onOpenGuidance={() => setGuidanceModalOpen(true)}
          />
        ) : (
          /* Continuous, Cohesive Editorial Narrative Homepage */
          <>
            {/* 1. Hero: Balanced Two-Column Editorial Composition with Cinematic Arch */}
            <HeroSection
              t={t}
              lang={lang}
              onRequestGuidance={() => setGuidanceModalOpen(true)}
              onSeeOurWork={() => scrollToSection('purpose')}
              onOpenDonationQr={() => setDonationQrOpen(true)}
            />

            {/* 2. Our Purpose & Three-Step Journey */}
            <OurPurpose
              t={t}
              onOpenGuidance={() => setGuidanceModalOpen(true)}
              onOpenFounderPage={navigateToFounder}
            />

            {/* 2.5. Cinematic Silk Curtain Transition & Real Ground Milestones */}
            <SilkCurtainTransition
              t={t}
              onOpenFounderPage={navigateToFounder}
            />

            {/* 3. About & Founder Journey: Simintini Shingade Narrative */}
            <FounderStory
              t={t}
              onRequestGuidance={() => setGuidanceModalOpen(true)}
              onOpenFounderPage={navigateToFounder}
            />

            {/* 4 & 5. Unified Core Programs & Grassroots Fieldwork Ecosystem */}
            <ProgramsAndFieldwork
              t={t}
              lang={lang}
              onRequestGuidance={() => setGuidanceModalOpen(true)}
            />

            {/* 6. Community Future Plan: Redesigned 2026-2027 Horizon Roadmap */}
            <CommunityFuturePlan
              t={t}
              lang={lang}
              onRequestGuidance={() => setGuidanceModalOpen(true)}
            />
          </>
        )}
      </main>

      {/* Cultural Trilingual Footer with Verified Contacts, Social Channels & Helplines */}
      <Footer
        t={t}
        onRequestGuidance={() => setGuidanceModalOpen(true)}
        onOpenFounderPage={navigateToFounder}
        onOpenDonationQr={() => setDonationQrOpen(true)}
      />

      {/* Confidential Guidance & Crisis Intake Modal */}
      <RequestGuidanceModal
        isOpen={guidanceModalOpen}
        onClose={() => setGuidanceModalOpen(false)}
        t={t}
      />

      {/* Official Bank of Maharashtra UPI QR Donation Modal */}
      <DonationQrModal
        isOpen={donationQrOpen}
        onClose={() => setDonationQrOpen(false)}
        t={t}
        lang={lang}
      />

    </div>
  );
}
