import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ArrowRight, QrCode, Sparkles } from 'lucide-react';

export default function HeroSection({ t, lang = 'en', onRequestGuidance, onSeeOurWork, onOpenDonationQr = () => {} }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
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

  // 3D Parallax: Desktop Mouse Movement + Mobile Touch/Device Tilt
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Mobile Device Orientation (Gyroscope 3D Tilt)
    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = Math.max(-8, Math.min(8, (e.gamma / 45) * 6));
        const y = Math.max(-6, Math.min(6, ((e.beta - 40) / 45) * 5));
        setParallaxOffset({ x, y });
      }
    };

    // Mobile Touch interaction
    const handleTouchMove = (e) => {
      if (!containerRef.current || !e.touches[0]) return;
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((touch.clientY - rect.top) / rect.height - 0.5) * 6;
      setParallaxOffset({ x, y });
    };

    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    const cont = containerRef.current;
    if (cont) {
      cont.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      if (cont) {
        cont.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [prefersReducedMotion]);

  // Desktop Mouse Parallax
  const handleMouseMove = (e) => {
    if (!isFinePointer || prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setParallaxOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
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
      className="relative min-h-[auto] md:min-h-[88vh] lg:min-h-[94vh] flex flex-col md:flex-row md:items-center overflow-hidden bg-[#FAF7F0]"
    >
      {/* =======================================================================
          1. DESKTOP CINEMATIC 3D BACKGROUND (md:block)
         ======================================================================= */}
      <div 
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
        style={{
          transform: isFinePointer && !prefersReducedMotion
            ? `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0) scale(1.02)`
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

      {/* Atmospheric 3D Depth Layers on Desktop */}
      <div 
        className="hidden md:block absolute top-1/4 right-[12%] lg:right-[18%] w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full pointer-events-none z-[1] opacity-40 blur-3xl bg-gradient-to-tr from-teal-500/25 via-amber-200/20 to-transparent mix-blend-soft-light animate-arch-glow" 
      />
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none z-[1] overflow-hidden">
        <div className="w-48 h-full bg-gradient-to-r from-transparent via-amber-100/30 to-transparent transform -skew-x-12 animate-arch-sweep" />
      </div>

      {/* Scrim Gradient for Desktop */}
      <div 
        className="hidden md:block absolute inset-0 pointer-events-none z-[2] bg-gradient-to-r from-[#FAF7F0] via-[#FAF7F0]/92 md:via-[#FAF7F0]/75 lg:via-[#FAF7F0]/40 to-transparent" 
      />


      {/* =======================================================================
          2. DESKTOP FOREGROUND CONTENT (md:block)
         ======================================================================= */}
      <div 
        className="hidden md:block container mx-auto px-6 lg:px-8 relative z-10 py-16 lg:py-24"
        style={{
          transform: isFinePointer && !prefersReducedMotion
            ? `translate3d(${-parallaxOffset.x * 0.4}px, ${-parallaxOffset.y * 0.4}px, 0)`
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
          3. SEAMLESS ORGANIC 3D MOBILE SANCTUARY (block md:hidden)
          Unified, borderless, fully immersive 3D scene with feathered blending
         ======================================================================= */}
      <div className="block md:hidden w-full relative z-10 flex flex-col">
        
        {/* Seamless 3D Visual Layer (NO BOX, NO BORDER, ORGANIC FEATHERED SILK) */}
        <div 
          className="relative w-full h-[360px] sm:h-[400px] overflow-hidden select-none pointer-events-none"
          style={{
            transform: !prefersReducedMotion
              ? `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`
              : 'none',
            transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          {/* Ambient Glowing Teal Arch Orb */}
          <div 
            className="absolute top-10 right-[-10px] w-64 h-64 rounded-full bg-gradient-to-tr from-teal-600/30 via-amber-200/25 to-transparent blur-3xl z-1 pointer-events-none animate-arch-glow" 
          />

          {/* The Living 3D Sanctuary Video / Poster */}
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
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)'
              }}
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
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)'
              }}
            />
          )}

          {/* Sunbeam Light Sweep on the 3D Arch */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-2">
            <div className="w-36 h-full bg-gradient-to-r from-transparent via-amber-100/35 to-transparent transform -skew-x-12 animate-arch-sweep" />
          </div>

          {/* Silky Bottom Feathering Gradient into Cream Background */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF7F0] via-[#FAF7F0]/80 to-transparent pointer-events-none z-3" />
        </div>

        {/* Mobile Editorial Content Flow (Seamlessly integrated) */}
        <div 
          className="w-full px-5 pb-10 -mt-8 relative z-20"
          style={{
            transform: !prefersReducedMotion
              ? `translate3d(${-parallaxOffset.x * 0.4}px, ${-parallaxOffset.y * 0.4}px, 0)`
              : 'none',
            transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          {/* Eyebrow Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-1 bg-[#B58542] rounded-full"></div>
            <span className="w-2 h-2 rounded-full bg-[#D9232D] inline-block animate-pulse"></span>
            <span className="text-[11px] font-sans font-bold tracking-[0.18em] text-[#524F4B] uppercase">
              {t.hero.badge}
            </span>
          </div>

          {/* Main Editorial Serif Headline */}
          <h1 className="text-[1.85rem] leading-[1.22] font-serif font-bold text-[#141312] tracking-tight mb-3">
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-[13.5px] leading-relaxed text-[#4A4643] font-sans mb-5 max-w-md">
            {t.hero.subtitle}
          </p>

          {/* Ergonomic 3D Action Row */}
          <div className="w-full flex items-center gap-2.5 mb-4">
            <button
              onClick={onRequestGuidance}
              className="flex-1 py-3 px-3.5 rounded-xl bg-[#141312] active:bg-neutral-800 text-white font-sans font-medium text-[13px] sm:text-sm shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            <button
              type="button"
              onClick={onOpenDonationQr}
              className="py-3 px-3.5 rounded-xl bg-[#C9A45C]/25 active:bg-[#C9A45C]/40 border-2 border-[#C9A45C]/70 text-[#10332F] font-sans font-semibold text-[13px] sm:text-sm flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 transition-transform"
            >
              <QrCode className="w-4 h-4 text-[#A46114] shrink-0" />
              <span>{donateShortLabel}</span>
            </button>
          </div>

          {/* Sub-Actions: See our work link + Confidentiality pill */}
          <div className="w-full flex items-center justify-between pt-1">
            <button
              onClick={onSeeOurWork}
              className="text-xs text-[#524F4B] hover:text-[#141312] underline underline-offset-4 decoration-[#B58542]/60 font-sans font-medium cursor-pointer"
            >
              {t.hero.ctaSecondary} ↓
            </button>

            <div className="flex items-center gap-1 text-[11px] text-[#524F4B] font-sans bg-white/80 px-2.5 py-1 rounded-full border border-black/5 shadow-2xs">
              <ShieldCheck className="w-3 h-3 text-emerald-700 shrink-0" />
              <span>{confidentialityShort}</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom section blending gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#FAF7F0] to-transparent pointer-events-none z-[2]" />
    </section>
  );
}
