import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Heart, Shield, Compass, Sparkles, Mail, MapPin, 
  Quote, CheckCircle2, PhoneCall, ExternalLink, ArrowUpRight,
  Flower2, Leaf, Users, Play, Pause, ChevronRight, ChevronLeft,
  RefreshCw, Star, Layers, Award, Camera
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FounderPage({ 
  t = {}, 
  onBackToHome = () => {}, 
  onOpenGuidance = () => {} 
}) {
  const fp = t.founderPage || {};
  const f = t.founder || {};

  // Active Interactive Chapter (0 to 4)
  const [activeChapter, setActiveChapter] = useState(0);

  // Fieldwork Photo Sub-Tab for Chapter 2
  const [activeMarginSite, setActiveMarginSite] = useState(0);

  // Auto-tour player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  // Interactive Photo Lens Filter state
  const [photoLens, setPhotoLens] = useState(0);
  const [isPhotoRippling, setIsPhotoRippling] = useState(false);

  // The Two Pillars of Aastha (Mission & Vision) State
  const [panelView, setPanelView] = useState('dual'); // 'dual', 'mission', 'vision'
  const [activeActionPill, setActiveActionPill] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Responsive Auto-Tour with 3.8s cadence
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      setActiveChapter((prev) => (prev + 1) % 5);
      setProgressKey((k) => k + 1);
    }, 3800);

    return () => clearTimeout(timer);
  }, [isPlaying, activeChapter]);

  const togglePlayJourney = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      // Give immediate feedback
      setActiveChapter((prev) => (prev + 1) % 5);
      setProgressKey((k) => k + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handleSelectChapter = (idx) => {
    setActiveChapter(idx);
    setIsPlaying(false); // pause auto-tour on manual selection
    setProgressKey((k) => k + 1);
    try {
      if (idx === 4) {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { x: 0.7, y: 0.5 },
          colors: ['#C89B52', '#F7D070', '#123F3A', '#FFFFFF']
        });
      }
    } catch (e) {}
  };

  const handleNextChapter = () => {
    setActiveChapter((prev) => (prev + 1) % 5);
    setProgressKey((k) => k + 1);
  };

  const handlePrevChapter = () => {
    setActiveChapter((prev) => (prev - 1 + 5) % 5);
    setProgressKey((k) => k + 1);
  };

  // 4 Photo Lenses for Simintini's Portrait
  const photoLenses = [
    {
      name: 'Ground Leader Lens',
      badge: 'Grassroots Leader • Pune, MH',
      dot: 'bg-[#C89B52]',
      filter: 'contrast(100%) saturate(100%) brightness(100%)',
      ring: 'ring-2 ring-[#C89B52]/40',
      glow: 'shadow-lg',
      border: 'border-[#C89B52]/40'
    },
    {
      name: 'Compassion & Healing Lens',
      badge: '💛 Certified Counselor • 250+ Women Guided',
      dot: 'bg-[#F7D070]',
      filter: 'contrast(108%) saturate(125%) brightness(104%) sepia(10%)',
      ring: 'ring-4 ring-[#C89B52]',
      glow: 'shadow-[0_0_35px_rgba(200,155,82,0.6)]',
      border: 'border-[#F7D070]'
    },
    {
      name: 'Crisis Outreach Lens',
      badge: '🛡️ Crisis Mediator • Yerawada Prison & Slums',
      dot: 'bg-[#55B5A6]',
      filter: 'contrast(114%) saturate(110%) brightness(102%) hue-rotate(-8deg)',
      ring: 'ring-4 ring-[#1B554C]',
      glow: 'shadow-[0_0_35px_rgba(18,63,58,0.7)]',
      border: 'border-[#55B5A6]'
    },
    {
      name: 'Changemaker Lens',
      badge: '✨ Social Worker & Community Advocate',
      dot: 'bg-[#E8927C]',
      filter: 'contrast(116%) saturate(130%) brightness(106%)',
      ring: 'ring-4 ring-[#C76E61]',
      glow: 'shadow-[0_0_35px_rgba(199,110,97,0.65)]',
      border: 'border-[#C76E61]'
    }
  ];

  const handlePhotoClick = (e) => {
    setPhotoLens((prev) => (prev + 1) % photoLenses.length);
    setIsPhotoRippling(true);
    setTimeout(() => setIsPhotoRippling(false), 500);
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 18,
        spread: 50,
        origin: { x, y },
        colors: ['#C89B52', '#F7D070', '#123F3A'],
        ticks: 150
      });
    } catch (err) {}
  };

  // 5 Chapters
  const petals = [
    {
      id: 0,
      number: '01',
      title: 'The Spark',
      subtitle: 'Personal Resolve',
      category: 'FOUNDATIONAL TRUTH',
      icon: Sparkles
    },
    {
      id: 1,
      number: '02',
      title: 'Deep Margins',
      subtitle: 'Yerawada & Slums',
      category: 'FIELDWORK IN ACTION',
      icon: MapPin
    },
    {
      id: 2,
      number: '03',
      title: 'The Sanctuary',
      subtitle: 'Healing Methodology',
      category: 'SYSTEMIC HEALING',
      icon: Shield
    },
    {
      id: 3,
      number: '04',
      title: 'Guiding Ethos',
      subtitle: 'Dignity Over Pity',
      category: 'CORE PRINCIPLES',
      icon: Heart
    },
    {
      id: 4,
      number: '05',
      title: 'Heart Letter',
      subtitle: 'Direct Message',
      category: 'A PERSONAL MESSAGE',
      icon: Flower2
    }
  ];

  // Field Sites for Chapter 2
  const marginSites = [
    {
      title: 'Yerawada Central Prison',
      subtitle: "Women's Day Empowerment & Counseling",
      desc: "Simintini conducted transformative Women's Day circles inside Yerawada Central Prison for female inmates, providing confidential psychological relief, rights awareness, and dignity restoration.",
      image: '/images/yerawada-jail-1.jpg',
      tag: 'Correctional Facility Outreach'
    },
    {
      title: 'Wadarwadi Slum Community',
      subtitle: 'Grassroots Dialogue on Woven Carpets',
      desc: 'Sitting directly on woven floor mats alongside mothers and daughters in Wadarwadi, Pune, Simintini created a safe sanctuary to de-escalate domestic disputes and build confidence.',
      image: '/images/wadarwadi-pune-founder.jpg',
      tag: 'Urban Slum Intervention'
    },
    {
      title: 'Kadepur Rural Cluster',
      subtitle: 'Village Self-Reliance & Livelihood Circles',
      desc: 'In rural Kadepur, Simintini brought livelihood toolkits and sewing enterprise circles so rural women achieve sustainable financial independence.',
      image: '/images/kadepur-womens-day.jpg',
      tag: 'Rural Maharashtra Cluster'
    },
    {
      title: 'Bal Suraksha & Classroom Hub',
      subtitle: 'Health, Literacy & Awareness Session',
      desc: 'Simintini conducting interactive grassroots literacy, child protection (Bal Suraksha), and family health workshops with mothers and young women.',
      image: '/images/simintini-classroom-balsuraksha.jpg',
      tag: 'Grassroots Community Education'
    }
  ];

  // Core Ethos Shields for Chapter 4
  const ethosShields = [
    {
      title: fp.val1Title || 'Dignity Over Pity',
      desc: fp.val1Desc || 'We never look at a woman as a victim, but as a resilient future leader of her household and community.',
      icon: Shield,
      shapeClass: 'rounded-tl-3xl rounded-br-3xl',
      highlight: '“Victimhood disempowers; recognized dignity transforms.”'
    },
    {
      title: fp.val2Title || 'Sacred Confidentiality',
      desc: fp.val2Desc || 'Every tear, every confession, and every plea for help is held in strict privacy and unconditional respect.',
      icon: Heart,
      shapeClass: 'rounded-tr-3xl rounded-bl-3xl',
      highlight: '“Trust is earned in silence and guarded with honor.”'
    },
    {
      title: fp.val3Title || 'Sustainable Independence',
      desc: fp.val3Desc || 'Emotional strength must be paired with practical livelihood skills so women never remain dependent on abusive circumstances.',
      icon: Sparkles,
      shapeClass: 'rounded-t-3xl rounded-b-xl',
      highlight: '“Emotional healing without financial agency is incomplete.”'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F2E9] text-[#20211F] pt-2 sm:pt-4 pb-12 selection:bg-[#C89B52]/30 selection:text-[#103D39] relative overflow-hidden font-sans">
      
      {/* Self-contained Keyframes for Progress Bar Animation */}
      <style>{`
        @keyframes progressFillAnim {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      {/* Ambient Silk Atmosphere Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#C89B52]/10 blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#103D39]/6 blur-3xl pointer-events-none -z-0" />

      {/* =========================================================================
          TOP COMPACT STREAMLINED CONTROL & NAVIGATION STRIP
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#C89B52]/20 mb-3 sm:mb-4">
        
        {/* Left: Back to Home + Page Badge */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#103D39] hover:text-[#C89B52] bg-white hover:bg-[#F7F2E9] border border-[#C89B52]/30 px-3.5 py-1.5 rounded-full transition-all shadow-2xs cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
            <span>{fp.backBtn || '← Back to Home'}</span>
          </button>
          
          <span className="text-xs font-serif text-[#103D39] font-medium hidden sm:inline-flex items-center gap-1.5">
            <Flower2 className="w-3.5 h-3.5 text-[#C89B52]" />
            <span>Simintini Shingade • Founder Journey</span>
          </span>
        </div>

        {/* Right: Auto-Advance Play Button + Guidance Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlayJourney}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer border shadow-2xs ${
              isPlaying
                ? 'bg-[#C89B52] text-[#103D39] border-[#C89B52] font-semibold ring-2 ring-[#C89B52]/40 shadow-sm'
                : 'bg-white hover:bg-[#F7F2E9] text-[#103D39] border-[#C89B52]/30'
            }`}
            title="Automatically advance through all 5 cards"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#103D39]" />
                <span>Auto-Playing (Card {activeChapter + 1}/5)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#103D39] animate-ping ml-0.5" />
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#C89B52]" />
                <span>Play Journey (Auto-Advance)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('two-pillars');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#F7F2E9] text-[#103D39] hover:text-[#C89B52] border border-[#C89B52]/30 text-xs font-medium tracking-wide shadow-2xs transition-all cursor-pointer"
            title="Jump to Mission & Vision Pillars"
          >
            <Compass className="w-3.5 h-3.5 text-[#C89B52]" />
            <span className="hidden sm:inline">The Two Pillars</span>
          </button>

          <button
            type="button"
            onClick={onOpenGuidance}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#103D39] text-[#FFFCF7] hover:bg-[#1B554C] text-xs font-medium tracking-wide shadow-2xs transition-all cursor-pointer"
          >
            <Shield className="w-3 h-3 text-[#C89B52]" />
            <span>{t.hero?.ctaGuidance || 'Request Guidance'}</span>
          </button>
        </div>

      </div>


      {/* =========================================================================
          COMPACT 5 BLOOMING PETAL CHAPTER TABS
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
          {petals.map((petal, idx) => {
            const IconComp = petal.icon;
            const isActive = activeChapter === idx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectChapter(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-sans transition-all duration-300 cursor-pointer whitespace-nowrap border shrink-0 ${
                  isActive
                    ? 'bg-[#103D39] text-[#FFFCF7] border-[#C89B52] shadow-md ring-2 ring-[#C89B52]/40 font-semibold transform -translate-y-0.5'
                    : 'bg-white/90 hover:bg-white text-[#20211F]/80 border-[#C89B52]/25 shadow-2xs'
                }`}
              >
                <span 
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono ${
                    isActive ? 'bg-[#C89B52] text-[#103D39] font-bold' : 'bg-[#C89B52]/15 text-[#C89B52]'
                  }`}
                >
                  {petal.number}
                </span>
                <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[#F7D070]' : 'text-[#C89B52]'}`} />
                <span>{petal.title}</span>
                {isActive && isPlaying && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7D070] animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>


      {/* =========================================================================
          THE UNIFIED STUDIO CANVAS (Fully visible on-screen, no cut-offs)
         ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* ---------------------------------------------------------------------
              LEFT COLUMN (4 cols): Sculptural Founder Arch, Lenses & Stepper
             --------------------------------------------------------------------- */}
          <div className="lg:col-span-4 rounded-3xl bg-white/80 border border-[#C89B52]/30 p-5 shadow-xs flex flex-col justify-between">
            
            <div>
              {/* Photo Frame Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#C89B52]/20">
                <span className="text-[10px] font-sans font-semibold tracking-wider uppercase text-[#C89B52] flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  <span>Click Photo to Cycle Lens</span>
                </span>
                <span className="text-[10px] font-mono text-[#103D39] font-medium">
                  {photoLens + 1}/4
                </span>
              </div>

              {/* Portrait Arch with Interactive Filters */}
              <div 
                onClick={handlePhotoClick}
                role="button"
                tabIndex={0}
                aria-label={`Founder photo lens: ${photoLenses[photoLens].name}. Click to switch lens.`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePhotoClick(e); } }}
                className="relative group w-full max-w-[260px] sm:max-w-[280px] mx-auto cursor-pointer select-none active:scale-[0.99] transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#C89B52] rounded-t-[120px] rounded-b-2xl"
              >
                {/* Backing Geometry */}
                <div 
                  className={`absolute -inset-2 rounded-t-[120px] rounded-b-2xl bg-[#103D39] transform -rotate-1 group-hover:rotate-0 transition-all duration-700 ${photoLenses[photoLens].glow}`}
                  aria-hidden="true" 
                />

                {/* Layered Gold Contour */}
                <div 
                  className="absolute -top-1.5 -right-1.5 w-full h-full rounded-t-[120px] rounded-b-2xl border-2 border-[#C89B52]/50 pointer-events-none transform translate-x-1 translate-y-1" 
                  aria-hidden="true" 
                />

                {/* Main Image */}
                <div className={`relative rounded-t-[120px] rounded-b-2xl overflow-hidden bg-[#1B554C] border-2 transition-all duration-500 z-10 ${photoLenses[photoLens].ring}`}>
                  <img
                    src="/images/founder-simintini.jpg"
                    alt="Simintini Shingade - Founder of Aastha for Women"
                    style={{ filter: photoLenses[photoLens].filter }}
                    className="w-full h-56 sm:h-64 object-cover object-top transform group-hover:scale-102 transition-all duration-700 ease-out"
                    loading="eager"
                  />

                  {/* Click Ripple Wave */}
                  {isPhotoRippling && (
                    <span className="absolute inset-0 rounded-t-[120px] rounded-b-2xl bg-white/25 pointer-events-none animate-ping" />
                  )}

                  {/* Lens Badge over bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white z-20 text-center">
                    <p className="font-serif text-sm text-[#F7F2E9] font-medium">
                      Simintini Shingade
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/50 border border-white/20 text-[10px] font-sans mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${photoLenses[photoLens].dot} animate-pulse`} />
                      <span>{photoLenses[photoLens].badge}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="mt-4 pt-3 border-t border-[#C89B52]/20 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#20211F]/70 font-sans">
                <span className="flex items-center gap-1 text-[#103D39] font-medium">
                  <MapPin className="w-3 h-3 text-[#C89B52]" />
                  <span>Pune • Yerawada • Kadepur</span>
                </span>
                <span className="text-[#C89B52] font-semibold">250+ Women Guided</span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={handlePrevChapter}
                  className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg bg-white hover:bg-[#C89B52]/10 border border-[#C89B52]/30 text-xs font-sans text-[#103D39] font-medium transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 text-[#C89B52]" />
                  <span>Prev</span>
                </button>

                <span className="text-xs font-mono font-bold text-[#103D39] px-2">
                  {activeChapter + 1} / 5
                </span>

                <button
                  type="button"
                  onClick={handleNextChapter}
                  className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg bg-[#103D39] hover:bg-[#1B554C] text-xs font-sans text-white font-medium transition-all shadow-2xs cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3 h-3 text-[#C89B52]" />
                </button>
              </div>
            </div>

          </div>


          {/* ---------------------------------------------------------------------
              RIGHT COLUMN (8 cols): Interactive Dynamic Chapter Canvas
             --------------------------------------------------------------------- */}
          <div className="lg:col-span-8 rounded-3xl bg-white/95 border border-[#C89B52]/35 p-5 sm:p-7 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all duration-500">
            
            {/* Watermark quote */}
            <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none select-none">
              <Quote className="w-40 h-40 text-[#C89B52]" />
            </div>

            <div className="relative z-10 space-y-4">
              
              {/* Dynamic Auto-Play Progress Bar (Active when playing) */}
              {isPlaying && (
                <div className="w-full bg-[#C89B52]/20 h-1.5 rounded-full overflow-hidden mb-2">
                  <div 
                    key={progressKey}
                    className="bg-gradient-to-r from-[#C89B52] via-[#F7D070] to-[#C89B52] h-full rounded-full"
                    style={{ animation: 'progressFillAnim 3800ms linear forwards' }}
                  />
                </div>
              )}

              {/* Category Pill & Chapter Label */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C89B52]/15 border border-[#C89B52]/30 text-[10px] font-sans font-semibold tracking-wider uppercase text-[#103D39]">
                  <Sparkles className="w-3 h-3 text-[#C89B52]" />
                  <span>{petals[activeChapter].category}</span>
                </span>
                <span className="text-xs font-mono font-bold text-[#C89B52]">
                  CHAPTER {petals[activeChapter].number} OF 05
                </span>
              </div>

              {/* CHAPTER 1 */}
              {activeChapter === 0 && (
                <div className="space-y-3.5 animate-fade-in transition-all duration-400">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#103D39] font-normal leading-snug">
                    {fp.chapter1Title || 'Chapter 1: The Crucible of Experience'}
                  </h2>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#F7F2E9] border-l-4 border-[#C89B52] shadow-2xs">
                    <p className="text-sm sm:text-base font-serif italic text-[#103D39] leading-relaxed">
                      "{f.slogan || 'Every woman deserves a safe space to be heard, respected, and empowered to rebuild her life with confidence.'}"
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#20211F]/85 leading-relaxed font-sans font-light">
                    {fp.chapter1Text || "Simintini's calling to serve women did not stem from abstract theory; it was forged through the real, complex life situations she walked through herself. In moments of personal uncertainty and familial pressure, she experienced firsthand the profound void of neutral, empathetic guidance. That realization ignited a lifelong resolve: no woman should ever have to suffer in silence or doubt her own worth."}
                  </p>

                  {/* Featured Grassroots Classroom Documentary Photo */}
                  <div className="relative rounded-2xl overflow-hidden border border-[#C89B52]/30 shadow-xs max-h-56 my-3 group">
                    <img
                      src="/images/simintini-classroom-balsuraksha.jpg"
                      alt="Simintini Shingade - Bal Suraksha & Grassroots Women Education Session"
                      className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-sans flex items-center justify-between">
                      <span className="font-medium text-[#F7D070] drop-shadow-xs">📍 Bal Suraksha & Community Classroom Session</span>
                      <span className="text-[10px] text-white/80">Maharashtra</span>
                    </div>
                  </div>

                  <div className="pt-1 flex flex-wrap items-center gap-2">
                    <span className="text-[10.5px] font-semibold text-[#103D39] bg-[#C89B52]/15 px-2.5 py-1 rounded-md border border-[#C89B52]/30">
                      ✦ Personal Trials Converted to Public Sanctuary
                    </span>
                    <span className="text-[10.5px] text-[#20211F]/60">
                      Pune, Maharashtra • 2020 to Present
                    </span>
                  </div>
                </div>
              )}

              {/* CHAPTER 2 */}
              {activeChapter === 1 && (
                <div className="space-y-3.5 animate-fade-in transition-all duration-400">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#103D39] font-normal leading-snug">
                    {fp.chapter2Title || 'Chapter 2: Walking into the Unseen Margins'}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#20211F]/80 leading-relaxed font-sans font-light">
                    {fp.chapter2Text || "While many organizations remain confined to urban offices, Simintini took Aastha directly to where vulnerability is deepest. She conducted transformative Women's Day empowerment inside Yerawada Central Prison for female inmates, sat on woven floor carpets in the urban settlement of Wadarwadi Pune, and stood beside rural women in Kadepur introducing vocational sewing clusters."}
                  </p>

                  {/* Interactive Site Switcher */}
                  <div className="pt-1">
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {marginSites.map((site, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => setActiveMarginSite(sIdx)}
                          className={`text-[11px] px-2.5 py-1 rounded-lg transition-all cursor-pointer border ${
                            activeMarginSite === sIdx
                              ? 'bg-[#103D39] text-[#FFFCF7] font-semibold border-[#103D39] shadow-xs'
                              : 'bg-white hover:bg-[#F7F2E9] text-[#20211F]/80 border-[#C89B52]/30'
                          }`}
                        >
                          <span>{site.title}</span>
                        </button>
                      ))}
                    </div>

                    <div className="rounded-xl overflow-hidden border border-[#C89B52]/30 bg-[#F7F2E9] grid grid-cols-1 sm:grid-cols-12 shadow-2xs">
                      <div className="sm:col-span-5 h-36 sm:h-auto">
                        <img
                          src={marginSites[activeMarginSite].image}
                          alt={marginSites[activeMarginSite].title}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                      <div className="sm:col-span-7 p-3.5 space-y-1 flex flex-col justify-center">
                        <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#C76E61] font-semibold">
                          {marginSites[activeMarginSite].tag}
                        </span>
                        <h4 className="text-xs sm:text-sm font-serif font-bold text-[#103D39]">
                          {marginSites[activeMarginSite].title}
                        </h4>
                        <p className="text-[11px] text-[#20211F]/80 leading-relaxed font-sans">
                          {marginSites[activeMarginSite].desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CHAPTER 3 */}
              {activeChapter === 2 && (
                <div className="space-y-3.5 animate-fade-in transition-all duration-400">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#103D39] font-normal leading-snug">
                    {fp.chapter3Title || 'Chapter 3: The Sanctuary of Aastha'}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#20211F]/80 leading-relaxed font-sans font-light">
                    {fp.chapter3Text || "Recognizing that marital trauma and domestic discord often spiral into despair and suicide, Simintini pioneered pre-marital counseling for college girls alongside confidential post-marriage crisis intervention. By linking emotional healing with practical home-based business skills, Aastha equips women with dignity and self-reliance."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-[#F7F2E9] border border-[#C89B52]/25 space-y-1">
                      <span className="text-[9px] font-mono text-[#C89B52] font-semibold">STEP 01</span>
                      <h4 className="text-xs font-serif font-bold text-[#103D39]">Pre-Marital Awareness</h4>
                      <p className="text-[10.5px] text-[#20211F]/75 leading-relaxed font-sans">
                        Equipping college girls and youth with boundary awareness and emotional resilience.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F7F2E9] border border-[#C89B52]/25 space-y-1">
                      <span className="text-[9px] font-mono text-[#C89B52] font-semibold">STEP 02</span>
                      <h4 className="text-xs font-serif font-bold text-[#103D39]">Crisis Mediation</h4>
                      <p className="text-[10.5px] text-[#20211F]/75 leading-relaxed font-sans">
                        100% confidential emotional healing and marital conflict navigation.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F7F2E9] border border-[#C89B52]/25 space-y-1">
                      <span className="text-[9px] font-mono text-[#C89B52] font-semibold">STEP 03</span>
                      <h4 className="text-xs font-serif font-bold text-[#103D39]">Economic Autonomy</h4>
                      <p className="text-[10.5px] text-[#20211F]/75 leading-relaxed font-sans">
                        Practical tailoring and micro-enterprise to eliminate dependent vulnerability.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#103D39]/5 border border-[#103D39]/15 flex items-center justify-around text-center">
                    <div>
                      <div className="text-sm font-serif font-bold text-[#103D39]">250+</div>
                      <div className="text-[9px] text-[#20211F]/70 uppercase">Lives Touched</div>
                    </div>
                    <div className="w-px h-5 bg-[#C89B52]/30" />
                    <div>
                      <div className="text-sm font-serif font-bold text-[#103D39]">100%</div>
                      <div className="text-[9px] text-[#20211F]/70 uppercase">Confidential</div>
                    </div>
                    <div className="w-px h-5 bg-[#C89B52]/30" />
                    <div>
                      <div className="text-sm font-serif font-bold text-[#103D39]">5+</div>
                      <div className="text-[9px] text-[#20211F]/70 uppercase">Field Clusters</div>
                    </div>
                  </div>
                </div>
              )}

              {/* CHAPTER 4 */}
              {activeChapter === 3 && (
                <div className="space-y-3.5 animate-fade-in transition-all duration-400">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#103D39] font-normal leading-snug">
                    {fp.valuesTitle || 'Core Principles Guiding Every Step'}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#20211F]/80 leading-relaxed font-sans font-light">
                    Every counseling session and outreach initiative is anchored by three non-negotiable principles:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {ethosShields.map((shield, sIdx) => {
                      const IconComp = shield.icon;
                      return (
                        <div
                          key={sIdx}
                          className={`p-3 bg-[#F7F2E9] border border-[#C89B52]/30 hover:border-[#C89B52] shadow-2xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between group ${shield.shapeClass}`}
                        >
                          <div>
                            <div className="w-7 h-7 rounded-lg bg-[#103D39]/10 group-hover:bg-[#103D39] text-[#103D39] group-hover:text-[#F7D070] flex items-center justify-center mb-2 transition-colors">
                              <IconComp className="w-3.5 h-3.5" />
                            </div>
                            <h4 className="text-xs font-serif font-bold text-[#103D39] mb-1">
                              {shield.title}
                            </h4>
                            <p className="text-[10.5px] text-[#20211F]/75 leading-relaxed font-sans">
                              {shield.desc}
                            </p>
                          </div>
                          <div className="mt-2 pt-1.5 border-t border-[#C89B52]/15 text-[9.5px] font-serif italic text-[#C89B52]">
                            {shield.highlight}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CHAPTER 5 */}
              {activeChapter === 4 && (
                <div className="space-y-3.5 animate-fade-in transition-all duration-400">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#103D39] font-normal leading-snug">
                    {fp.messageTitle || 'A Personal Message to Every Sister'}
                  </h2>

                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#103D39] to-[#0A2421] text-[#FFFCF7] border border-[#C89B52]/40 shadow-md space-y-2.5 relative overflow-hidden">
                    <Quote className="absolute top-2 right-2 w-16 h-16 text-[#C89B52]/10 pointer-events-none" />
                    
                    <p className="text-xs sm:text-sm font-serif italic text-[#F7D070] leading-relaxed">
                      "{fp.messageP1 || 'If you are reading this while feeling trapped, exhausted, or unseen—please hear me: you are not broken, and you do not have to carry this burden alone.'}"
                    </p>
                    
                    <p className="text-[11px] sm:text-xs text-[#FFFCF7]/90 leading-relaxed font-sans font-light">
                      "{fp.messageP2 || 'Aastha was created so you would never have to compromise your dignity. Whether you need a listening ear, mediation support, or training to build your own livelihood, our doors and hearts are open.'}"
                    </p>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
                      <span className="font-serif italic text-[#C89B52] text-xs sm:text-sm">
                        — Simintini Shingade
                      </span>
                      <a 
                        href="mailto:asthaforwomen@gmail.com"
                        className="text-[#FFFCF7]/80 hover:text-white underline decoration-[#C89B52] underline-offset-4 flex items-center gap-1 text-[10.5px]"
                      >
                        <Mail className="w-3 h-3 text-[#C89B52]" />
                        <span>asthaforwomen@gmail.com</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-1 flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={onOpenGuidance}
                      className="px-4 py-2 rounded-full bg-[#C89B52] text-[#103D39] hover:bg-white text-xs font-semibold tracking-wide shadow-xs transition-all cursor-pointer"
                    >
                      {fp.ctaContact || 'Reach Out for Confidential Counseling'}
                    </button>
                    <button
                      type="button"
                      onClick={onBackToHome}
                      className="px-3.5 py-2 rounded-full bg-white hover:bg-[#F7F2E9] text-[#103D39] border border-[#103D39]/30 text-xs font-medium tracking-wide transition-all cursor-pointer"
                    >
                      <span>Return to Homepage</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Status & Next Shortcut */}
            <div className="mt-4 pt-3 border-t border-[#C89B52]/20 flex items-center justify-between text-[11px] text-[#20211F]/70 font-sans">
              <span className="italic font-serif text-[#103D39]">
                “Compassion without pity. Dignity without condition.”
              </span>
              <button
                type="button"
                onClick={handleNextChapter}
                className="font-medium text-[#C89B52] hover:text-[#103D39] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Chapter {activeChapter + 1} of 5</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

          </div>

        </div>

        {/* =========================================================================
            THE TWO PILLARS OF AASTHA (Organizational Compass & Horizon Architecture)
            Integrated into Founder's Journey Page
           ========================================================================= */}
        <div id="two-pillars" className="mt-10 sm:mt-14 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B2623] via-[#103D39] to-[#0A201E] text-[#FFFCF7] p-6 sm:p-10 lg:p-14 shadow-2xl border-2 border-[#C89B52]/40 scroll-mt-20">
          
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C89B52]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#C76E61]/15 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#1B554C]/25 blur-3xl pointer-events-none" />

          {/* Large Champagne Gold Decorative Watermark */}
          <div className="absolute top-6 right-8 opacity-10 pointer-events-none select-none" aria-hidden="true">
            <Quote className="w-36 h-36 text-[#C89B52]" />
          </div>

          <div className="relative z-10 space-y-8">
            
            {/* Top Interactive Perspective Switcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#C89B52]/25">
              <div>
                <span className="text-[11px] font-sans font-semibold tracking-[0.22em] uppercase text-[#C89B52]">
                  ORGANIZATIONAL COMPASS
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#FFFCF7] mt-0.5">
                  The Two Pillars of Aastha
                </h3>
              </div>

              {/* View Switcher Pills */}
              <div className="flex items-center p-1 rounded-full bg-black/40 backdrop-blur-md border border-[#C89B52]/35 shadow-inner">
                <button
                  type="button"
                  onClick={() => setPanelView('dual')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
                    panelView === 'dual'
                      ? 'bg-[#C89B52] text-[#123F3A] font-semibold shadow-md'
                      : 'text-[#F8F2E8]/70 hover:text-white'
                  }`}
                >
                  <span>✦ Dual Horizon</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPanelView('mission')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
                    panelView === 'mission'
                      ? 'bg-[#C89B52] text-[#123F3A] font-semibold shadow-md'
                      : 'text-[#F8F2E8]/70 hover:text-white'
                  }`}
                >
                  <span>🌿 Mission</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPanelView('vision')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
                    panelView === 'vision'
                      ? 'bg-[#C89B52] text-[#123F3A] font-semibold shadow-md'
                      : 'text-[#F8F2E8]/70 hover:text-white'
                  }`}
                >
                  <span>🌟 Vision</span>
                </button>
              </div>
            </div>

            {/* DUAL VIEW MODE */}
            {panelView === 'dual' && (
              <div className="space-y-6 animate-fade-in transition-opacity duration-500">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                  
                  {/* Left Glass Card: Core Mission (6 cols) */}
                  <div className="lg:col-span-6 rounded-2xl bg-[#09221F]/80 backdrop-blur-md p-6 sm:p-8 border border-[#C89B52]/30 hover:border-[#C89B52]/60 shadow-lg flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C89B52]/20 border border-[#C89B52]/40 text-[11px] font-semibold tracking-wider uppercase text-[#F7D070]">
                          <Leaf className="w-3 h-3 text-[#F7D070]" />
                          <span>OUR CORE MISSION</span>
                        </span>
                        <span className="text-[11px] font-mono text-[#C89B52]/80">01 / CRISIS TO HEALING</span>
                      </div>

                      <h4 className="text-2xl sm:text-3xl font-serif text-[#FFFCF7] font-normal leading-snug group-hover:text-[#F7D070] transition-colors">
                        Sanctuary, Healing & Self-Sustaining Autonomy
                      </h4>

                      {/* Pull Quote Box */}
                      <div className="p-3.5 rounded-xl bg-black/30 border-l-2 border-[#C89B52] text-xs sm:text-sm italic text-[#F8F2E8]/90 font-serif leading-relaxed">
                        "To provide a confidential sanctuary where women under social and domestic pressure find guidance, emotional strength, and non-judgmental support."
                      </div>

                      <p className="text-xs sm:text-sm text-[#F8F2E8]/80 font-light leading-relaxed font-sans">
                        {f.whyStartedText || "Aastha for Women was started to support women who live under social and family pressure and often lack guidance and support."}{' '}
                        {f.introText || "Through counseling, guidance, and training, our goal is to support women in overcoming life's challenges and creating a stronger, confident future for themselves."}
                      </p>
                    </div>

                    {/* Mission Action Pills */}
                    <div className="pt-5 mt-5 border-t border-[#C89B52]/20">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-[#C89B52] mb-2">
                        Core Directives on the Ground:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { title: '🛡️ 100% Confidential Care', note: 'Complete privacy in every crisis discussion.' },
                          { title: '🌱 Crisis & Pre-marital Guidance', note: 'Emotional coping & family conflict mediation.' },
                          { title: '🧵 Livelihood Skills', note: 'Practical avenues toward financial self-reliance.' }
                        ].map((pill, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setActiveActionPill(activeActionPill === pill.title ? null : pill.title)}
                            className={`text-[11px] px-2.5 py-1 rounded-md transition-all cursor-pointer border ${
                              activeActionPill === pill.title
                                ? 'bg-[#C89B52] text-[#123F3A] font-semibold border-[#C89B52]'
                                : 'bg-white/5 hover:bg-white/10 text-[#F8F2E8] border-white/15'
                            }`}
                          >
                            <span>{pill.title}</span>
                          </button>
                        ))}
                      </div>

                      {/* Pill Mini-Explainer */}
                      {activeActionPill && (
                        <p className="mt-2 text-[11px] text-[#F7D070] italic font-sans bg-black/40 p-2 rounded-lg border border-[#C89B52]/30 animate-fade-in">
                          ✦ {activeActionPill}: Active across Yerawada, Wadarwadi, Kadepur, Khadki Shikshan Sanstha (MOU) & Sangli District.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Glass Card: Foundational Vision (6 cols) */}
                  <div className="lg:col-span-6 rounded-2xl bg-[#09221F]/80 backdrop-blur-md p-6 sm:p-8 border border-[#C89B52]/30 hover:border-[#C89B52]/60 shadow-lg flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C89B52]/20 border border-[#C89B52]/40 text-[11px] font-semibold tracking-wider uppercase text-[#F7D070]">
                          <Sparkles className="w-3 h-3 text-[#F7D070]" />
                          <span>FOUNDATIONAL VISION</span>
                        </span>
                        <span className="text-[11px] font-mono text-[#C89B52]/80">02 / LONG-TERM DIGNITY</span>
                      </div>

                      <h4 className="text-2xl sm:text-3xl font-serif text-[#FFFCF7] font-normal leading-snug group-hover:text-[#F7D070] transition-colors">
                        An Equitable Society Where Every Woman Thrives
                      </h4>

                      {/* Pull Quote Box */}
                      <div className="p-3.5 rounded-xl bg-black/30 border-l-2 border-[#C89B52] text-xs sm:text-sm italic text-[#F8F2E8]/90 font-serif leading-relaxed">
                        "A society where silence is transformed into sovereignty, domestic fear is eliminated, and every woman owns her dignity."
                      </div>

                      <p className="text-xs sm:text-sm text-[#F8F2E8]/80 font-light leading-relaxed font-sans">
                        {f.visionText || "To create a society where every woman feels confident, independent, and valued. A society where women are empowered to overcome challenges such as domestic crisis, build their own identity, and live with dignity, courage, and hope."}
                      </p>
                    </div>

                    {/* Vision Strategic Horizons */}
                    <div className="pt-5 mt-5 border-t border-[#C89B52]/20">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-[#C89B52] mb-2">
                        Long-Term Societal Transformation:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { title: '⚖️ Inherent Dignity Reclaimed', note: 'Restoring self-worth and legal confidence.' },
                          { title: '🕊️ Freedom from Coercive Fear', note: 'Safe de-escalation of domestic oppression.' },
                          { title: '👑 Community Peer Solidarity', note: 'Women lifting women across neighborhoods.' }
                        ].map((pill, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setActiveActionPill(activeActionPill === pill.title ? null : pill.title)}
                            className={`text-[11px] px-2.5 py-1 rounded-md transition-all cursor-pointer border ${
                              activeActionPill === pill.title
                                ? 'bg-[#C89B52] text-[#123F3A] font-semibold border-[#C89B52]'
                                : 'bg-white/5 hover:bg-white/10 text-[#F8F2E8] border-white/15'
                            }`}
                          >
                            <span>{pill.title}</span>
                          </button>
                        ))}
                      </div>

                      {/* Pill Mini-Explainer */}
                      {activeActionPill && (
                        <p className="mt-2 text-[11px] text-[#F7D070] italic font-sans bg-black/40 p-2 rounded-lg border border-[#C89B52]/30 animate-fade-in">
                          ✦ {activeActionPill}: The structural goal behind every counseling session.
                        </p>
                      )}
                    </div>
                  </div>

                </div>

                {/* Central Horizon Nexus Ribbon */}
                <div className="hidden sm:flex items-center justify-center gap-3 py-2 px-4 rounded-xl bg-black/30 border border-[#C89B52]/20 text-[11px] text-[#F8F2E8]/85 font-sans">
                  <span className="font-medium text-[#C89B52]">Mission (Immediate Sanctuary & Healing)</span>
                  <span className="w-8 h-px bg-[#C89B52]/50" />
                  <span className="w-2 h-2 rounded-full bg-[#C89B52] animate-ping" />
                  <span className="w-8 h-px bg-[#C89B52]/50" />
                  <span className="font-medium text-[#F7D070]">Vision (Long-Term Autonomy & Dignity)</span>
                </div>

              </div>
            )}

            {/* MISSION FOCUSED VIEW */}
            {panelView === 'mission' && (
              <div className="space-y-6 animate-fade-in transition-all duration-500 rounded-2xl bg-[#09221F]/90 backdrop-blur-md p-7 sm:p-10 border border-[#C89B52]/40 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B52]/20 border border-[#C89B52]/40 text-xs font-semibold tracking-wider uppercase text-[#F7D070]">
                    <Leaf className="w-3.5 h-3.5 text-[#F7D070]" />
                    <span>DEEP DIVE: OUR CORE MISSION</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPanelView('vision')}
                    className="inline-flex items-center gap-1.5 text-xs text-[#C89B52] hover:text-[#F7D070] cursor-pointer"
                  >
                    <span>Explore Vision instead →</span>
                  </button>
                </div>

                <h4 className="text-3xl sm:text-4xl font-serif text-[#FFFCF7] font-normal leading-tight">
                  Sanctuary, Healing & Self-Sustaining Autonomy
                </h4>

                <p className="text-sm sm:text-base text-[#F8F2E8]/90 font-light leading-relaxed font-sans max-w-3xl">
                  {f.whyStartedText || "Aastha for Women was started to support women who live under social and family pressure and often lack guidance and support."}{' '}
                  {f.introText || "Through counseling, guidance, and training, our goal is to support women in overcoming life's challenges and creating a stronger, confident future for themselves."}
                </p>

                {/* 3 Step Mission Field Methodology */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#C89B52]/20">
                  <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                    <span className="text-xs font-mono text-[#C89B52]">STEP 01</span>
                    <h5 className="text-base font-serif font-medium text-white">Safe Confidential Intake</h5>
                    <p className="text-xs text-[#F8F2E8]/75 leading-relaxed font-sans">
                      Providing a private sanctuary where women can speak freely without stigma or familial retribution.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                    <span className="text-xs font-mono text-[#C89B52]">STEP 02</span>
                    <h5 className="text-base font-serif font-medium text-white">Trauma De-escalation & Mediation</h5>
                    <p className="text-xs text-[#F8F2E8]/75 leading-relaxed font-sans">
                      Empathetic psychological counseling, marital dispute navigation, and confidence restoration.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                    <span className="text-xs font-mono text-[#C89B52]">STEP 03</span>
                    <h5 className="text-base font-serif font-medium text-white">Sustainable Livelihood Bridges</h5>
                    <p className="text-xs text-[#F8F2E8]/75 leading-relaxed font-sans">
                      Practical skills, legal rights awareness, and peer solidarity groups that cement financial independence.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* VISION FOCUSED VIEW */}
            {panelView === 'vision' && (
              <div className="space-y-6 animate-fade-in transition-all duration-500 rounded-2xl bg-[#09221F]/90 backdrop-blur-md p-7 sm:p-10 border border-[#C89B52]/40 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89B52]/20 border border-[#C89B52]/40 text-xs font-semibold tracking-wider uppercase text-[#F7D070]">
                    <Sparkles className="w-3.5 h-3.5 text-[#F7D070]" />
                    <span>DEEP DIVE: FOUNDATIONAL VISION</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPanelView('mission')}
                    className="inline-flex items-center gap-1.5 text-xs text-[#C89B52] hover:text-[#F7D070] cursor-pointer"
                  >
                    <span>← Explore Mission instead</span>
                  </button>
                </div>

                <h4 className="text-3xl sm:text-4xl font-serif text-[#FFFCF7] font-normal leading-tight">
                  An Equitable Society Where Every Woman Thrives
                </h4>

                <p className="text-sm sm:text-base text-[#F8F2E8]/90 font-light leading-relaxed font-sans max-w-3xl">
                  {f.visionText || "To create a society where every woman feels confident, independent, and valued. A society where women are empowered to overcome challenges such as domestic crisis, build their own identity, and live with dignity, courage, and hope."}
                </p>

                {/* 3 Societal Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#C89B52]/20">
                  <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                    <span className="text-xs font-mono text-[#C89B52]">PILLAR 01</span>
                    <h5 className="text-base font-serif font-medium text-white">Breaking Generational Silence</h5>
                    <p className="text-xs text-[#F8F2E8]/75 leading-relaxed font-sans">
                      Transforming cultural norms so domestic abuse and mental health distress are addressed openly with respect.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                    <span className="text-xs font-mono text-[#C89B52]">PILLAR 02</span>
                    <h5 className="text-base font-serif font-medium text-white">Inherent Dignity & Sovereignty</h5>
                    <p className="text-xs text-[#F8F2E8]/75 leading-relaxed font-sans">
                      Every woman reclaiming ownership over her choices, bodily integrity, and future without fear.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                    <span className="text-xs font-mono text-[#C89B52]">PILLAR 03</span>
                    <h5 className="text-base font-serif font-medium text-white">Universal Grassroots Inclusion</h5>
                    <p className="text-xs text-[#F8F2E8]/75 leading-relaxed font-sans">
                      Ensuring rural women, slum dwellers, and incarcerated women have equal access to justice, healing, and growth.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Fieldwork Footnote */}
            <div className="pt-6 border-t border-[#C89B52]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F2E8]/75 font-sans">
              <div className="flex items-center gap-2">
                <Flower2 className="w-4 h-4 text-[#C89B52] shrink-0" />
                <span>Verified ground presence: Pune, Yerawada Central Prison, Wadarwadi Slum, Kadepur, Khadki Shikshan Sanstha (MOU Signed), Karve Institute Fieldwork & Exploring Sangli District.</span>
              </div>
              <span className="font-serif italic text-[#C89B52]">
                Compassion without pity. Dignity without condition.
              </span>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
