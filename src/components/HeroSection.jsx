import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ArrowRight, QrCode, Sparkles } from 'lucide-react';

export default function HeroSection({ t, lang = 'en', onRequestGuidance, onSeeOurWork, onOpenDonationQr = () => {} }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const containerRef = useRef(null);

  // Exact public path to user's MP4 video and poster
  const videoSrc = encodeURI('/assets/Woman_animating_website_hero_seq…_20261019230203.mp4');
  const posterSrc = '/assets/hero-video-poster.jpg';

  // Check device capabilities
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(pointer: fine)');

    setPrefersReducedMotion(motionQuery.matches);
    setIsFinePointer(pointerQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    const handlePointerChange = (e) => setIsFinePointer(e.matches);

    motionQuery.addEventListener('change', handleMotionChange);
    pointerQuery.addEventListener('change', handlePointerChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      pointerQuery.removeEventListener('change', handlePointerChange);
    };
  }, []);

  // Subtle 3D mouse parallax limited to 4-6 pixels (desktop only)
  const handleMouseMove = (e) => {
    if (!isFinePointer || prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8; // -4px to +4px
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6; // -3px to +3px
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Attempt auto-playback on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    if (mobileVideoRef.current) {
      mobileVideoRef.current.play().catch(() => {});
    }
  }, []);

  const donateShortLabel = lang === 'hi' ? 'सहयोग (QR)' : lang === 'mr' ? 'दान (QR)' : 'Donate (QR)';
  const showcaseBadge = lang === 'hi' 
    ? 'सुरक्षित स्थान • समर्पित मार्गदर्शन • पुणे' 
    : lang === 'mr' 
    ? 'सुरक्षित जागा • समर्पित समुपदेशन • पुणे' 
    : 'Safe Haven • Dedicated Care • Pune, MH';

  return (
    <section 
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[auto] md:min-h-[88vh] lg:min-h-[94vh] flex items-center overflow-hidden bg-[#FAF7F0]"
    >
      {/* =======================================================================
          1. DESKTOP CINEMATIC BACKGROUND (Hidden on mobile to prevent cropped overlaps)
         ======================================================================= */}
      <div 
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
        style={{
          transform: isFinePointer && !prefersReducedMotion
            ? `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) scale(1.02)`
            : 'none',
          transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={posterSrc}
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`w-full h-full object-cover object-[68%_center] lg:object-[65%_center] transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-90'
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
            <source src="/assets/Woman_animating_website_hero_seq…_20261019230203.mp4" type="video/mp4" />
            <img 
              src={posterSrc} 
              alt="Aastha for Women Hero Cinematic" 
              className="w-full h-full object-cover object-[68%_center]"
            />
          </video>
        ) : (
          <img 
            src={posterSrc} 
            alt="Aastha for Women Hero Background" 
            className="w-full h-full object-cover object-[68%_center]"
          />
        )}
      </div>

      {/* Atmospheric Depth Layers on Desktop */}
      <div 
        className="hidden md:block absolute top-1/4 right-[12%] lg:right-[18%] w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full pointer-events-none z-[1] opacity-40 blur-3xl bg-gradient-to-tr from-teal-500/25 via-amber-200/20 to-transparent mix-blend-soft-light animate-arch-glow" 
      />
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none z-[1] overflow-hidden">
        <div className="w-48 h-full bg-gradient-to-r from-transparent via-amber-100/30 to-transparent transform -skew-x-12 animate-arch-sweep" />
      </div>

      {/* Scrim Gradient for Desktop Contrast */}
      <div 
        className="hidden md:block absolute inset-0 pointer-events-none z-[2] bg-gradient-to-r from-[#FAF7F0] via-[#FAF7F0]/92 md:via-[#FAF7F0]/75 lg:via-[#FAF7F0]/40 to-transparent" 
      />
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAF7F0] to-transparent pointer-events-none z-[2]" />


      {/* =======================================================================
          2. DESKTOP FOREGROUND LAYOUT (md:block)
         ======================================================================= */}
      <div 
        className="hidden md:block container mx-auto px-6 lg:px-8 relative z-10 py-16 lg:py-24"
        style={{
          transform: isFinePointer && !prefersReducedMotion
            ? `translate3d(${-mouseOffset.x * 0.4}px, -mouseOffset.y * 0.4}px, 0)`
            : 'none',
          transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        <div className="max-w-2xl xl:max-w-3xl flex flex-col items-start text-left">
          
          {/* Eyebrow: Gold Accent Line + Red Dot Badge */}
          <div className="animate-hero-eyebrow flex flex-col items-start">
            <div className="w-10 h-1 bg-[#B58542] rounded-full mb-6 shadow-xs"></div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9232D] inline-block shadow-xs animate-pulse"></span>
              <span className="text-xs sm:text-sm font-sans font-bold tracking-[0.18em] text-[#524F4B] uppercase">
                {t.hero.badge}
              </span>
            </div>
          </div>

          {/* Main Editorial Serif Headline */}
          <h1 className="animate-hero-title text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#141312] tracking-tight leading-[1.15] mb-6 drop-shadow-xs">
            {t.hero.title}
          </h1>

          {/* Supportive Subtitle */}
          <p className="animate-hero-sub text-base sm:text-lg text-[#3D3A37] font-sans font-normal leading-relaxed max-w-xl mb-9">
            {t.hero.subtitle}
          </p>

          {/* Action Button Group */}
          <div className="animate-hero-cta flex flex-wrap items-center gap-4">
            <button
              onClick={onRequestGuidance}
              className="px-8 py-3.5 rounded-xl bg-[#141312] hover:bg-neutral-800 text-white font-sans font-medium text-base shadow-xs hover:shadow-md transition-all transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onSeeOurWork}
              className="px-7 py-3.5 rounded-xl bg-white/75 hover:bg-white text-[#141312] font-sans font-medium text-base border border-[#141312]/30 shadow-none hover:shadow-xs transition-all cursor-pointer backdrop-blur-xs"
            >
              {t.hero.ctaSecondary}
            </button>

            <button
              type="button"
              onClick={onOpenDonationQr}
              className="px-6 py-3.5 rounded-xl bg-[#C9A45C]/20 hover:bg-[#C9A45C]/35 text-[#10332F] font-sans font-semibold text-sm sm:text-base border-2 border-[#C9A45C]/60 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xs group"
            >
              <QrCode className="w-5 h-5 text-[#A46114] group-hover:scale-110 transition-transform" />
              <span>{donateShortLabel}</span>
            </button>
          </div>

          {/* Confidentiality Reassurance Badge */}
          <div className="animate-hero-badge mt-8 flex items-center gap-2 text-xs text-[#524F4B] font-sans bg-[#FAF7F0]/85 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-charcoal/10 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{t.hero.confidentialBadge}</span>
          </div>

        </div>
      </div>


      {/* =======================================================================
          3. PREMIUM DEDICATED MOBILE LAYOUT (block md:hidden)
          Clean, dignified, 100% readable with a dedicated visual showcase frame
         ======================================================================= */}
      <div className="block md:hidden w-full px-4 pt-6 pb-12 relative z-10">
        <div className="max-w-md mx-auto flex flex-col items-start text-left">
          
          {/* Mobile Eyebrow Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-1 bg-[#B58542] rounded-full"></div>
            <span className="w-2 h-2 rounded-full bg-[#D9232D] inline-block animate-pulse"></span>
            <span className="text-[11px] font-sans font-bold tracking-[0.16em] text-[#524F4B] uppercase">
              {t.hero.badge}
            </span>
          </div>

          {/* Mobile Main Headline */}
          <h1 className="text-[1.85rem] leading-[1.22] font-serif font-bold text-[#141312] tracking-tight mb-3">
            {t.hero.title}
          </h1>

          {/* Mobile Subtitle */}
          <p className="text-[13.5px] leading-relaxed text-[#4A4643] font-sans mb-4">
            {t.hero.subtitle}
          </p>

          {/* Mobile Visual Showcase Card (Centered woman, full arch, zero cropping errors) */}
          <div className="w-full relative aspect-[16/11] rounded-2xl overflow-hidden shadow-md border border-[#B58542]/30 mb-4 bg-[#EDE6D9]">
            {!videoError ? (
              <video
                ref={mobileVideoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster={posterSrc}
                className="w-full h-full object-cover object-[62%_center]"
              >
                <source src={videoSrc} type="video/mp4" />
                <source src="/assets/Woman_animating_website_hero_seq…_20261019230203.mp4" type="video/mp4" />
                <img 
                  src={posterSrc} 
                  alt="Aastha for Women" 
                  className="w-full h-full object-cover object-[62%_center]"
                />
              </video>
            ) : (
              <img 
                src={posterSrc} 
                alt="Aastha for Women" 
                className="w-full h-full object-cover object-[62%_center]"
              />
            )}

            {/* Subtle soft gradient at bottom of the card for badge clarity */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

            {/* In-Card Floating Sanctuary Badge */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] font-sans font-medium px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/20">
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                <span className="truncate">{showcaseBadge}</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-[#E0BE76] shrink-0 ml-1" />
            </div>
          </div>

          {/* Mobile Ergonomic Action Buttons */}
          <div className="w-full flex items-center gap-2 mb-3">
            {/* Primary Action Button */}
            <button
              onClick={onRequestGuidance}
              className="flex-1 py-3 px-3.5 rounded-xl bg-[#141312] active:bg-neutral-800 text-white font-sans font-medium text-[13px] sm:text-sm shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
            >
              <span className="truncate">{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            {/* Quick Donation Button */}
            <button
              type="button"
              onClick={onOpenDonationQr}
              className="py-3 px-3.5 rounded-xl bg-[#C9A45C]/25 active:bg-[#C9A45C]/40 border border-[#C9A45C]/70 text-[#10332F] font-sans font-semibold text-[13px] sm:text-sm flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 transition-transform"
            >
              <QrCode className="w-4 h-4 text-[#A46114] shrink-0" />
              <span>{donateShortLabel}</span>
            </button>
          </div>

          {/* Secondary Action: See Our Work link */}
          <div className="w-full flex items-center justify-between pt-1">
            <button
              onClick={onSeeOurWork}
              className="text-xs text-[#524F4B] hover:text-[#141312] underline underline-offset-4 decoration-[#B58542]/50 font-sans font-medium cursor-pointer"
            >
              {t.hero.ctaSecondary} ↓
            </button>

            {/* Confidentiality Pill */}
            <div className="flex items-center gap-1 text-[11px] text-[#524F4B] font-sans bg-white/70 px-2.5 py-1 rounded-full border border-black/5">
              <ShieldCheck className="w-3 h-3 text-emerald-700 shrink-0" />
              <span className="truncate">{lang === 'hi' ? '१००% गोपनीय' : lang === 'mr' ? '१००% गोपनीय' : '100% Confidential'}</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
