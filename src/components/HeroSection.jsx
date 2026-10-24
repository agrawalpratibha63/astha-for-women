import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ArrowRight, QrCode } from 'lucide-react';

export default function HeroSection({ t, lang = 'en', onRequestGuidance, onSeeOurWork, onOpenDonationQr = () => {} }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Exact public path to user's MP4 video and poster
  const videoSrc = encodeURI('/assets/Woman_animating_website_hero_seq…_20261019230203.mp4');
  const posterSrc = '/assets/hero-video-poster.jpg';

  // Check device capabilities (Desktop mouse pointer only)
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

  // Desktop Mouse Parallax ONLY (Strictly disabled on touch screens to guarantee 100% rock-solid stability)
  const handleMouseMove = (e) => {
    if (!isFinePointer || prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Auto-play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const donateShortLabel = lang === 'hi' ? 'सहयोग (QR)' : lang === 'mr' ? 'दान (QR)' : 'Donate (QR)';

  return (
    <section 
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[92svh] sm:min-h-[88vh] lg:min-h-[94vh] flex items-center overflow-hidden bg-[#FCF8F9]"
    >
      {/* =======================================================================
          1. FULL-BLEED LIVING VIDEO BACKGROUND (Shared mobile & desktop)
          Living video animates right behind the text with zero jitter
         ======================================================================= */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
        style={{
          transform: isFinePointer && !prefersReducedMotion
            ? `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`
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
            className={`w-full h-full object-cover object-[70%_center] sm:object-[68%_center] lg:object-[65%_center] transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-90'
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
            <source src="/assets/Woman_animating_website_hero_seq…_20261019230203.mp4" type="video/mp4" />
            <img 
              src={posterSrc} 
              alt="Aastha for Women Hero Cinematic" 
              className="w-full h-full object-cover object-[70%_center]"
            />
          </video>
        ) : (
          <img 
            src={posterSrc} 
            alt="Aastha for Women Hero Background" 
            className="w-full h-full object-cover object-[70%_center]"
          />
        )}
      </div>

      {/* 3D Atmospheric Glowing Arch Orb */}
      <div 
        className="absolute top-1/4 right-[4%] sm:right-[12%] lg:right-[18%] w-64 sm:w-80 lg:w-[480px] h-64 sm:h-80 lg:h-[480px] rounded-full pointer-events-none z-[1] opacity-40 blur-3xl bg-gradient-to-tr from-purple-500/20 via-rose-300/25 to-transparent mix-blend-soft-light animate-arch-glow" 
      />
      
      {/* Golden Sunbeam Light Sweep */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none z-[1] overflow-hidden">
        <div className="w-40 sm:w-48 h-full bg-gradient-to-r from-transparent via-rose-100/35 to-transparent transform -skew-x-12 animate-arch-sweep" />
      </div>

      {/* =======================================================================
          2. CINEMATIC CONTRAST SCRIM
          Ensures text is 100% crisp & readable while living video plays visibly
         ======================================================================= */}
      {/* Directional scrim: Stronger on left/text side, smoothly transparent on video side */}
      <div 
        className="absolute inset-0 pointer-events-none z-[2] bg-gradient-to-r from-[#FCF8F9] via-[#FCF8F9]/92 sm:via-[#FCF8F9]/85 md:via-[#FCF8F9]/75 lg:via-[#FCF8F9]/40 to-transparent" 
      />
      
      {/* Mobile top & bottom subtle softening gradient */}
      <div 
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FCF8F9] via-[#FCF8F9]/70 to-transparent pointer-events-none z-[2]" 
      />

      {/* =======================================================================
          3. HERO EDITORIAL CONTENT OVERLAID ON VIDEO
         ======================================================================= */}
      <div 
        className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 pt-20 pb-14 sm:py-20 lg:py-24"
        style={{
          transform: isFinePointer && !prefersReducedMotion
            ? `translate3d(${-mouseOffset.x * 0.4}px, ${-mouseOffset.y * 0.4}px, 0)`
            : 'none',
          transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        <div className="max-w-xl md:max-w-2xl xl:max-w-3xl flex flex-col items-start text-left">
          
          {/* Eyebrow Badge */}
          <div className="animate-hero-eyebrow flex flex-col items-start">
            <div className="w-10 sm:w-12 h-1.5 bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#FB923C] rounded-full mb-4 sm:mb-6 shadow-xs"></div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9232D] inline-block shadow-xs animate-pulse"></span>
              <span className="text-xs sm:text-sm font-sans font-bold tracking-[0.16em] sm:tracking-[0.18em] text-[#524F4B] uppercase">
                {t.hero.badge}
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="animate-hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2B1822] tracking-tight leading-[1.24] sm:leading-[1.2] mb-4 sm:mb-6 drop-shadow-xs max-w-xl lg:max-w-3xl">
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="animate-hero-sub text-sm sm:text-base md:text-lg text-[#4A3840] font-sans font-normal leading-relaxed max-w-lg lg:max-w-xl mb-6 sm:mb-8 md:mb-9">
            {t.hero.subtitle}
          </p>

          {/* Interactive CTA Buttons */}
          <div className="animate-hero-cta flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onRequestGuidance}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#FB923C] hover:from-[#6D28D9] hover:via-[#A21CAF] hover:to-[#E11D48] text-white font-sans font-semibold text-sm sm:text-base shadow-[0_8px_25px_rgba(192,38,211,0.35)] hover:shadow-[0_12px_32px_rgba(244,63,94,0.45)] hover:shadow-lg transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              onClick={onSeeOurWork}
              className="flex-1 sm:flex-initial px-5 sm:px-7 py-3.5 rounded-xl bg-white/95 hover:bg-[#FFF5F7] text-[#7A1D36] font-sans font-bold text-sm sm:text-base border border-[#FECDD3] hover:border-[#F43F5E] shadow-2xs hover:shadow-xs transition-all cursor-pointer backdrop-blur-xs flex items-center justify-center"
            >
              {t.hero.ctaSecondary}
            </button>

            <button
              type="button"
              onClick={onOpenDonationQr}
              className="flex-1 sm:flex-initial px-5 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FFF5F7] to-[#FFF7ED] hover:bg-[#FFE4E6] text-[#E11D48] font-sans font-bold text-sm sm:text-base border-2 border-[#FECDD3] hover:border-[#F43F5E] shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xs active:scale-95 group"
            >
              <QrCode className="w-4 sm:w-5 h-4 sm:h-5 text-[#A03859] group-hover:scale-110 transition-transform shrink-0" />
              <span>{donateShortLabel}</span>
            </button>
          </div>

          {/* 100% Confidential Shield Pill */}
          <div className="animate-hero-badge mt-6 sm:mt-8 flex items-center gap-2 text-[11px] sm:text-xs text-[#2E1065] font-sans font-semibold bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-charcoal/10 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{t.hero.confidentialBadge}</span>
          </div>

        </div>
      </div>
    </section>
  );
}
