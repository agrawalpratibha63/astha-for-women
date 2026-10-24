import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, QrCode } from 'lucide-react';

export default function Navbar({ 
  lang = 'en', 
  setLang = () => {}, 
  t = {}, 
  onRequestGuidance = () => {},
  currentView = 'home',
  onNavigateHome = () => {},
  onOpenFounderPage = () => {},
  onOpenDonationQr = () => {}
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Life-safety Quick Exit feature
  const handleQuickExit = () => {
    window.location.replace('https://www.google.com');
  };

  // Keyboard shortcut: Press Escape to quickly escape the page
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleQuickExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const languages = [
    { code: 'en', label: 'EN', fullLabel: 'English', aria: 'Switch to English' },
    { code: 'hi', label: 'हिं', fullLabel: 'हिन्दी', aria: 'हिंदी में बदलें' },
    { code: 'mr', label: 'मरा', fullLabel: 'मराठी', aria: 'मराठीत बदला' }
  ];

  const handleNavClick = (e, targetId) => {
    if (currentView === 'founder') {
      e.preventDefault();
      onNavigateHome(targetId);
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  const nav = t.nav || {};
  const footer = t.footer || {};

  // Standard labels per language
  const donateLabel = lang === 'hi' ? 'सहयोग (QR)' : lang === 'mr' ? 'दान (QR)' : 'Donate';
  const guidanceLabel = lang === 'hi' ? 'मार्गदर्शन प्राप्त करें' : lang === 'mr' ? 'मार्गदर्शन मिळवा' : 'Request Guidance';
  const roadmapLabel = lang === 'hi' ? 'रोडमैप २०२६–२७' : lang === 'mr' ? 'आगामी रोडमॅप' : 'Roadmap 2026–27';

  const tickerItems = lang === 'hi' ? [
    'गोपनीय मार्गदर्शन एवं २४x७ हेल्पलाइन: ८८०१०६६००७',
    'राष्ट्रीय महिला हेल्पलाइन: १८१ (टोल-फ्री व निःशुल्क)',
    '३००+ बालिकाओं व युवतियों से सीधा संपर्क (Connected with 300+ Girls)',
    'खडकी शिक्षण संस्था के साथ समझौता ज्ञापन (MOU with Khadki Shikshan Sanstha)',
    'फील्ड वर्क: कर्वे समाज सेवा संस्थान से २ एमएसडब्ल्यू छात्र शामिल',
    'सांगली जिले में विस्तार एवं ज़मीनी कार्य (Exploring Sangli District)',
    'भावी योजना: पुलिस स्टेशनों एवं सरकारी स्कूलों में परामर्श केंद्र शुरू करना',
    'समर्पित स्वयंसेवक सक्रिय (Volunteers Engaged)'
  ] : lang === 'mr' ? [
    'गोपनीय मार्गदर्शन व २४x७ हेल्पलाइन: ८८०१०६६००७',
    'राष्ट्रीय महिला हेल्पलाइन: १८१ (टोल-फ्री व मोफत)',
    '३००+ तरुणी व विद्यार्थिनींशी प्रत्यक्ष संवाद (Connected with 300+ Girls)',
    'खडकी शिक्षण संस्थेसोबत सामंजस्य करार (MOU with Khadki Shikshan Sanstha)',
    'फील्ड वर्क: कर्वे समाज सेवा संस्थेतून २ एमएसडब्ल्यू विद्यार्थी सहभागी',
    'सांगली जिल्हा विस्तार व सामाजिक कार्य (Exploring Sangli District)',
    'आगामी संकल्प: पोलिस ठाणी व सरकारी शाळांमध्ये समुपदेशन केंद्र सुरू करणे',
    'सक्रिय स्वयंसेवक सहभागी (Volunteers Engaged)'
  ] : [
    'Confidential Guidance & Women Crisis Support • 24x7 Helpline: 8801066007',
    'National Women Helpline: 181 (Toll Free)',
    'Connected with 300+ Adolescent Girls & Young Women',
    'Formal MOU Signed with Khadki Shikshan Sanstha',
    'Field Work: 2 MSW Students Joined from Karve Institute of Social Service',
    'Expanding Footprint: Exploring Sangli District & Rural Clusters',
    'Future Plan: Starting Counselling Centres at Police Stations & Government Schools',
    'Dedicated Volunteers Engaged on Ground'
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* =======================================================================
          1. TOP CRISIS & HELPLINE RIBBON (Continuous Moving Marquee Ticker)
         ======================================================================= */}
      <div className="bg-[#0E2A25] text-white/90 text-xs py-1.5 px-3 sm:px-4 font-sans border-b border-[#C9A45C]/25 relative overflow-hidden flex items-center shadow-xs">
        
        {/* Left Live Indicator */}
        <div className="flex items-center gap-1.5 shrink-0 pr-3 z-10 bg-[#0E2A25] shadow-[6px_0_10px_#0E2A25]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#E0BE76] hidden sm:inline">
            {lang === 'hi' ? 'अपडेट' : lang === 'mr' ? 'अपडेट' : 'LIVE'}
          </span>
        </div>

        {/* Moving Marquee Container */}
        <div className="overflow-hidden flex-1 relative whitespace-nowrap" title="Hover to pause ticker">
          <div className="animate-ticker-marquee text-[11px] sm:text-xs text-[#FAF7F0]/90">
            {/* Set 1 */}
            <div className="inline-flex items-center gap-6 pr-6">
              {tickerItems.map((item, idx) => (
                <span key={`t1-${idx}`} className="inline-flex items-center gap-2">
                  <span className="text-[#C9A45C]">✦</span>
                  <span className="font-medium">{item}</span>
                </span>
              ))}
            </div>

            {/* Set 2 (Identical duplicate for seamless continuous infinite loop) */}
            <div className="inline-flex items-center gap-6 pr-6" aria-hidden="true">
              {tickerItems.map((item, idx) => (
                <span key={`t2-${idx}`} className="inline-flex items-center gap-2">
                  <span className="text-[#C9A45C]">✦</span>
                  <span className="font-medium">{item}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pinned Actions: Quick Exit & Helpline */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0 pl-3 z-10 bg-[#0E2A25] shadow-[-10px_0_12px_#0E2A25]">
          <span className="text-[#FAF7F0]/70 hidden lg:inline font-mono text-[11px]">
            {footer.nationalHelpline || 'Helpline: 181 (Toll Free)'}
          </span>
          <button
            onClick={handleQuickExit}
            title={t.leavePageTooltip || 'Quickly hide this page and redirect to Google'}
            className="text-[#E0BE76] hover:text-white transition-colors underline decoration-[#E0BE76]/40 cursor-pointer font-medium text-[11px] sm:text-xs focus:ring-1 focus:ring-[#C9A45C] outline-none rounded px-1 shrink-0"
          >
            {t.escKeyHint || 'Quick Exit (Esc)'}
          </button>
        </div>

      </div>

      {/* =======================================================================
          2. MAIN STANDARD NAVBAR (Refined, uncluttered, spacious)
         ======================================================================= */}
      <nav 
        className={`w-full transition-all duration-200 border-b ${
          scrolled 
            ? 'bg-[#FAF7F0]/95 backdrop-blur-md shadow-sm border-[#C9A45C]/20 py-2.5' 
            : 'bg-[#FAF7F0] border-black/5 py-3.5'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-8 xl:gap-10">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigateHome(); }}
              className="flex items-center gap-3 group focus:ring-2 focus:ring-[#123F38] rounded-lg p-1 outline-none transition-transform"
            >
              <img 
                src="/images/aastha-logo-transparent.png" 
                alt="Aastha for Women" 
                className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/astha-logo.jpg';
                }}
              />
              <span className="sr-only">Aastha for Women</span>
            </a>

            {/* Standard Primary Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] xl:text-[14px] font-sans font-medium text-[#333A36]/85">
              
              <a 
                href="#purpose" 
                onClick={(e) => handleNavClick(e, 'purpose')} 
                className="hover:text-[#123F38] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C9A45C] hover:after:w-full after:transition-all focus:outline-none"
              >
                {nav.purpose || 'Our Purpose'}
              </a>

              <a 
                href="#how-we-help" 
                onClick={(e) => handleNavClick(e, 'how-we-help')} 
                className="hover:text-[#123F38] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C9A45C] hover:after:w-full after:transition-all focus:outline-none"
              >
                {nav.howWeHelp || 'How We Help'}
              </a>

              <button
                type="button"
                onClick={onOpenFounderPage}
                className="hover:text-[#123F38] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C9A45C] hover:after:w-full after:transition-all focus:outline-none cursor-pointer"
              >
                {nav.founder || "Founder's Journey"}
              </button>

              <a 
                href="#updates" 
                onClick={(e) => handleNavClick(e, 'updates')} 
                className="hover:text-[#123F38] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C9A45C] hover:after:w-full after:transition-all focus:outline-none"
              >
                {roadmapLabel}
              </a>

              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')} 
                className="hover:text-[#123F38] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C9A45C] hover:after:w-full after:transition-all focus:outline-none"
              >
                {nav.contact || 'Contact'}
              </a>

            </div>
          </div>

          {/* Right: Uncluttered Utility & CTA Cluster */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* 1. Compact Modern Language Switcher */}
            <div 
              role="radiogroup" 
              aria-label={nav.selectLang || 'Select Language'}
              className="inline-flex items-center bg-white/90 border border-[#C9A45C]/30 rounded-full p-0.5 shadow-2xs text-xs font-sans"
            >
              {languages.map((l) => {
                const isSelected = lang === l.code;
                return (
                  <button
                    key={l.code}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={l.aria}
                    onClick={() => setLang(l.code)}
                    className={`px-2.5 py-1 rounded-full transition-all text-xs font-semibold cursor-pointer ${
                      isSelected 
                        ? 'bg-[#123F38] text-white shadow-2xs' 
                        : 'text-[#333A36]/70 hover:text-[#123F38] hover:bg-black/5'
                    }`}
                    title={l.fullLabel}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>

            {/* 2. Secondary CTA: Donate (Direct QR Modal) */}
            <button
              type="button"
              onClick={onOpenDonationQr}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF7F0] text-[#123F38] border border-[#C9A45C]/40 hover:border-[#C9A45C] text-xs font-semibold transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Donate / Support Aastha via UPI QR Code"
            >
              <QrCode className="w-3.5 h-3.5 text-[#A46114]" />
              <span>{donateLabel}</span>
            </button>

            {/* 3. Primary CTA: Request Guidance */}
            <button
              onClick={onRequestGuidance}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#123F38] hover:bg-[#1B554C] text-white text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
            >
              <span>{guidanceLabel}</span>
            </button>

          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Language Switcher preview */}
            <div className="md:hidden inline-flex items-center bg-white/80 border border-[#C9A45C]/30 rounded-full p-0.5 text-[11px]">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2 py-0.5 rounded-full font-medium ${
                    lang === l.code ? 'bg-[#123F38] text-white' : 'text-[#333A36]/70'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#123F38] hover:bg-black/5 transition-colors focus:ring-2 focus:ring-[#123F38] outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#C9A45C]/20 bg-[#FAF7F0] px-5 py-6 shadow-xl space-y-4 animate-in slide-in-from-top-2">
            
            <div className="flex flex-col space-y-3 font-sans text-sm font-medium text-[#333A36]">
              <a 
                href="#purpose" 
                onClick={(e) => handleNavClick(e, 'purpose')} 
                className="py-2 border-b border-black/5 hover:text-[#123F38]"
              >
                {nav.purpose || 'Our Purpose'}
              </a>

              <a 
                href="#how-we-help" 
                onClick={(e) => handleNavClick(e, 'how-we-help')} 
                className="py-2 border-b border-black/5 hover:text-[#123F38]"
              >
                {nav.howWeHelp || 'How We Help'}
              </a>

              <button
                type="button"
                onClick={() => { onOpenFounderPage(); setMobileMenuOpen(false); }}
                className="py-2 border-b border-black/5 hover:text-[#123F38] text-left flex items-center justify-between"
              >
                <span>{nav.founder || "Founder's Journey"}</span>
                <BookOpen className="w-4 h-4 text-[#C9A45C]" />
              </button>

              <a 
                href="#updates" 
                onClick={(e) => handleNavClick(e, 'updates')} 
                className="py-2 border-b border-black/5 hover:text-[#123F38]"
              >
                {roadmapLabel}
              </a>

              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')} 
                className="py-2 border-b border-black/5 hover:text-[#123F38]"
              >
                {nav.contact || 'Contact'}
              </a>
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-3 space-y-2.5">
              <button
                type="button"
                onClick={() => { onOpenDonationQr(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-full bg-white border border-[#C9A45C]/50 text-[#123F38] font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs"
              >
                <QrCode className="w-4 h-4 text-[#A46114]" />
                <span>{donateLabel}</span>
              </button>

              <button
                onClick={() => { onRequestGuidance(); setMobileMenuOpen(false); }}
                className="w-full py-3 rounded-full bg-[#123F38] text-white font-medium text-xs shadow-xs"
              >
                {guidanceLabel}
              </button>
            </div>

            {/* Mobile Safety note */}
            <div className="pt-2 text-center">
              <button
                onClick={handleQuickExit}
                className="text-xs text-rose-700 underline decoration-rose-300 font-medium cursor-pointer"
              >
                {t.leavePage || 'Leave this page immediately (Google redirect)'}
              </button>
            </div>

          </div>
        )}
      </nav>
    </header>
  );
}
