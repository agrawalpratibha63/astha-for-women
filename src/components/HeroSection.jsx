import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ArrowRight, QrCode } from 'lucide-react';

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
  const confidentialityShort = lang === 'hi' ? '१००% गोपनीय' : lang === 'mr' ? '१००% गोपनीय' : '100% Confidential';

  return (
    <section 
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-[#FAF7F0]"
    >
      {/* =======================================================================
          1. DESKTOP WIDESCREEN CINEMATIC 3D VIEW (md:flex, min-h-[92vh])
         ======================================================================= */}
      <div className="hidden md:flex relative min-h-[88vh] lg:min-h-[94vh] items-center">
        {/* Full-Coverage Desktop Background Video */}
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

        {/* Desktop 3D Atmospheric Lights */}
        <div 
          className="absolute top-1/4 right-[12%] lg:right-[18%] w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full pointer-events-none z-[1] opacity-40 blur-3xl bg-gradient-to-tr from-teal-500/25 via-amber-200/20 to-transparent mix-blend-soft-light animate-arch-glow" 
        />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none z-[1] overflow-hidden">
          <div className="w-48 h-full bg-gradient-to-r from-transparent via-amber-100/30 to-transparent transform -skew-x-12 animate-arch-sweep" />
        </div>

        {/* Desktop Contrast Scrim */}
        <div 
          className="absolute inset-0 pointer-events-none z-[2] bg-gradient-to-r from-[#FAF7F0] via-[#FAF7F0]/92 md:via-[#FAF7F0]/75 lg:via-[#FAF7F0]/40 to-transparent" 
        />

        {/* Desktop Content */}
        <div 
          className="container mx-auto px-6 lg:px-8 relative z-10 py-16 lg:py-24"
          style={{
            transform: isFinePointer && !prefersReducedMotion
              ? `translate3d(${-mouseOffset.x * 0.4}px, ${-mouseOffset.y * 0.4}px, 0)`
              : 'none',
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          <div className="max-w-2xl xl:max-w-3xl flex flex-col items-start text-left">
            <div className="animate-hero-eyebrow flex flex-col items-start">
              <div className="w-10 h-1 bg-[#B58542] rounded-full mb-6 shadow-xs"></div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D9232D] inline-block shadow-xs animate-pulse"></span>
                <span className="text-xs sm:text-sm font-sans font-bold tracking-[0.18em] text-[#524F4B] uppercase">
                  {t.hero.badge}
                </span>
              </div>
            </div>

            <h1 className="animate-hero-title text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#141312] tracking-tight leading-[1.15] mb-6 drop-shadow-xs">
              {t.hero.title}
            </h1>

            <p className="animate-hero-sub text-base sm:text-lg text-[#3D3A37] font-sans font-normal leading-relaxed max-w-xl mb-9">
              {t.hero.subtitle}
            </p>

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

            <div className="animate-hero-badge mt-8 flex items-center gap-2 text-xs text-[#524F4B] font-sans bg-[#FAF7F0]/85 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-charcoal/10 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{t.hero.confidentialBadge}</span>
            </div>
          </div>
        </div>
      </div>


      {/* =======================================================================
          2. ROCK-SOLID MOBILE 3D SANCTUARY VIEW (block md:hidden)
          100% Fixed to screen, Zero touch jitter, Zero jumping, Genuine 3D depth
         ======================================================================= */}
      <div className="block md:hidden w-full relative z-10">
        
        {/* Living 3D Sanctuary Visual (Full width, perfectly centered woman and arch) */}
        <div className="relative w-full h-[330px] overflow-hidden bg-[#FAF7F0]">
          {/* Ambient Glowing Teal Arch Orb */}
          <div 
            className="absolute top-8 right-[-10px] w-56 h-56 rounded-full bg-gradient-to-tr from-teal-600/30 via-amber-200/25 to-transparent blur-3xl z-[1] pointer-events-none animate-arch-glow" 
          />

          {/* Living 3D Sanctuary Video */}
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

          {/* Sunbeam Light Sweep */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
            <div className="w-32 h-full bg-gradient-to-r from-transparent via-amber-100/30 to-transparent transform -skew-x-12 animate-arch-sweep" />
          </div>

          {/* Silky Smooth Bottom Fade into Content */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAF7F0] via-[#FAF7F0]/85 to-transparent pointer-events-none z-[3]" />
        </div>

        {/* Stable, Anchored Mobile Content (Fixed padding, zero transforms) */}
        <div className="w-full px-5 pb-10 pt-1 relative z-20 bg-[#FAF7F0]">
          
          {/* Eyebrow Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-1 bg-[#B58542] rounded-full"></div>
            <span className="w-2 h-2 rounded-full bg-[#D9232D] inline-block animate-pulse"></span>
            <span className="text-[11px] font-sans font-bold tracking-[0.18em] text-[#524F4B] uppercase">
              {t.hero.badge}
            </span>
          </div>

          {/* Main Editorial Serif Headline */}
          <h1 className="text-[1.8rem] leading-[1.22] font-serif font-bold text-[#141312] tracking-tight mb-3">
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-[13.5px] leading-relaxed text-[#4A4643] font-sans mb-5">
            {t.hero.subtitle}
          </p>

          {/* Ergonomic Action Row (Side-by-side buttons) */}
          <div className="w-full flex items-center gap-2.5 mb-4">
            <button
              onClick={onRequestGuidance}
              className="flex-1 py-3.5 px-4 rounded-xl bg-[#141312] active:bg-neutral-800 text-white font-sans font-medium text-[13.5px] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={onOpenDonationQr}
              className="py-3.5 px-4 rounded-xl bg-[#C9A45C]/25 active:bg-[#C9A45C]/40 border-2 border-[#C9A45C]/70 text-[#10332F] font-sans font-semibold text-[13px] flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 transition-transform"
            >
              <QrCode className="w-4 h-4 text-[#A46114] shrink-0" />
              <span>{donateShortLabel}</span>
            </button>
          </div>

          {/* Sub-bar: See our work link + Confidentiality pill */}
          <div className="w-full flex items-center justify-between pt-1">
            <button
              onClick={onSeeOurWork}
              className="text-xs text-[#524F4B] hover:text-[#141312] underline underline-offset-4 decoration-[#B58542]/60 font-sans font-medium cursor-pointer"
            >
              {t.hero.ctaSecondary} ↓
            </button>

            <div className="flex items-center gap-1 text-[11px] text-[#524F4B] font-sans bg-white/90 px-3 py-1 rounded-full border border-black/5 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{confidentialityShort}</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
