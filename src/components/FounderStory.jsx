import React, { useState } from 'react';
import { 
  Heart, Compass, Shield, Quote, Sparkles, ArrowRight, 
  BookOpen, ChevronDown, Flower2, Leaf, Users, CheckCircle2,
  RefreshCw, Eye, MapPin, Layers, Award, Sparkle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FounderStory({ 
  t = {}, 
  onRequestGuidance = () => {}, 
  onOpenFounderPage = () => {} 
}) {
  const [photoError, setPhotoError] = useState(false);
  const [expandedMilestone, setExpandedMilestone] = useState(null); // 0, 1, 2 or null

  // Interactive Photo Lens Modes
  const [photoEffectIndex, setPhotoEffectIndex] = useState(0);
  const [isRippling, setIsRippling] = useState(false);

  const f = t.founder || {};

  const photoEffects = [
    {
      name: 'Ground Leader Lens',
      subtitle: 'Authentic Editorial',
      badge: 'Grassroots Leader & Counselor • Pune, MH',
      dotColor: 'bg-[#C89B52]',
      badgeStyle: 'bg-black/50 border-[#C89B52]/40 text-[#F8F2E8]',
      imgFilter: 'contrast(100%) saturate(100%) brightness(100%)',
      ringClass: 'ring-2 ring-[#C89B52]/40',
      glowStyle: 'shadow-xl',
      backingClass: 'bg-[#123F3A]',
      backingRotate: '-rotate-1',
      confettiColors: ['#C89B52', '#123F3A', '#FFFFFF']
    },
    {
      name: 'Compassion & Emotional Healing Lens',
      subtitle: 'Warm Empathy Glow',
      badge: '💛 Certified Counselor • 300+ Girls & Women Guided',
      dotColor: 'bg-[#F7D070]',
      badgeStyle: 'bg-[#59390B]/85 border-[#F7D070]/60 text-[#FFF2D6]',
      imgFilter: 'contrast(108%) saturate(125%) brightness(104%) sepia(10%)',
      ringClass: 'ring-4 ring-[#C89B52]',
      glowStyle: 'shadow-[0_0_40px_rgba(200,155,82,0.65)]',
      backingClass: 'bg-[#7C4A1E]',
      backingRotate: 'rotate-1',
      confettiColors: ['#C89B52', '#F7D070', '#E5A93C', '#FFF2D6']
    },
    {
      name: 'Crisis Mediator & Prison Outreach Lens',
      subtitle: 'Courage & Mediation',
      badge: '🛡️ Crisis Mediator • Yerawada Prison & Rural Clusters',
      dotColor: 'bg-[#55B5A6]',
      badgeStyle: 'bg-[#072421]/90 border-[#55B5A6]/60 text-[#E0F3EE]',
      imgFilter: 'contrast(114%) saturate(110%) brightness(102%) hue-rotate(-8deg)',
      ringClass: 'ring-4 ring-[#1B554C]',
      glowStyle: 'shadow-[0_0_45px_rgba(18,63,58,0.75)]',
      backingClass: 'bg-[#0B2E2A]',
      backingRotate: '-rotate-2',
      confettiColors: ['#123F3A', '#1B554C', '#55B5A6', '#C89B52']
    },
    {
      name: 'Dignity & Changemaker Advocate Lens',
      subtitle: 'Empowerment Radiance',
      badge: '✨ Social Worker & Community Advocate • Self-Reliance',
      dotColor: 'bg-[#E8927C]',
      badgeStyle: 'bg-[#4A1D17]/90 border-[#E8927C]/60 text-[#FFE8E5]',
      imgFilter: 'contrast(116%) saturate(130%) brightness(106%)',
      ringClass: 'ring-4 ring-[#C76E61]',
      glowStyle: 'shadow-[0_0_45px_rgba(199,110,97,0.7)]',
      backingClass: 'bg-[#672720]',
      backingRotate: 'rotate-2',
      confettiColors: ['#C76E61', '#E8927C', '#C89B52', '#FFFCF7']
    }
  ];

  const currentPhotoEffect = photoEffects[photoEffectIndex];

  const handlePhotoClick = (e) => {
    const nextIdx = (photoEffectIndex + 1) % photoEffects.length;
    setPhotoEffectIndex(nextIdx);
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 700);

    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { x, y },
        colors: photoEffects[nextIdx].confettiColors,
        ticks: 200,
        gravity: 1.15,
        scalar: 0.9
      });
    } catch (err) {}
  };

  const milestones = [
    {
      id: 0,
      number: '01',
      title: f.whyTitle || 'Why I Decided to Work for Women',
      category: 'THE SPARK OF RESOLVE',
      tag: 'PERSONAL RESILIENCE',
      image: '/images/simintini-speech-stage.jpg',
      imageAlt: 'Simintini Shingade addressing students and women from the stage',
      imageBadge: '🎙️ Personal Resilience & Voice',
      quote: '"Through the challenges I faced, I realized that silence compounds grief. Women need someone who believes in them unconditionally."',
      preview: f.whyText1 || 'My decision to work for women comes from my own life experiences. In times of family crisis, women often endure isolation with no neutral, empathetic guidance.',
      detail: f.whyText2 || 'These experiences inspired me to dedicate my efforts to helping other women who may be facing similar struggles. I decided to work towards empowering women, supporting them in difficult times, and helping them build the confidence to live their lives with dignity and independence.',
      icon: Heart,
      accentColor: '#C89B52', // Champagne Gold
      shapeClass: 'rounded-tl-[3.25rem] rounded-br-[2.5rem] rounded-tr-2xl rounded-bl-2xl',
      borderClass: 'border-[#C89B52]/45 hover:border-[#C89B52]/90',
      badgeClass: 'bg-[#C89B52]/15 text-[#9A641B] border-[#C89B52]/35',
      glowClass: 'hover:shadow-[0_16px_35px_rgba(200,155,82,0.3)]',
      gradientBg: 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5ECE0]/60',
      keyPoints: ['Personal resolve from lived struggle', 'Breaking generational silence', 'Safe confidential empathetic care']
    },
    {
      id: 1,
      number: '02',
      title: f.whyStartedTitle || 'Why the Organization Was Started',
      category: 'SANCTUARY WITHOUT STIGMA',
      tag: 'ORGANIZATIONAL IDENTITY',
      image: '/images/aastha-calligraphy-brand.jpg',
      imageAlt: 'Aastha for Women Official Logo Symbol and Identity',
      imageBadge: '✨ Aastha Official Symbol',
      isLogo: true,
      quote: '"We didn’t sit behind desks. We sat on woven floor carpets in slum homes and inside prison courtyards."',
      preview: f.whyStartedText || 'Aastha for Women was started to support women who live under social and family pressure and often lack guidance and support.',
      detail: f.introText || 'Founded in Pune, Aastha conducts direct community dialogues across Wadarwadi, Yerawada, and rural Kadepur, providing pre-marital awareness for youth alongside crisis intervention for married women to rebuild their self-confidence.',
      icon: Compass,
      accentColor: '#C76E61', // Soft Terracotta
      shapeClass: 'rounded-tr-[3.25rem] rounded-bl-[2.5rem] rounded-tl-2xl rounded-br-2xl',
      borderClass: 'border-[#C76E61]/45 hover:border-[#C76E61]/90',
      badgeClass: 'bg-[#C76E61]/15 text-[#9E392F] border-[#C76E61]/35',
      glowClass: 'hover:shadow-[0_16px_35px_rgba(199,110,97,0.3)]',
      gradientBg: 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF1EE] to-[#F7E5E2]/60',
      keyPoints: ['MOU with Khadki Shikshan Sanstha (300+ Girls)', 'Karve Institute MSW student fieldwork', 'Exploring Sangli District & Police Station Desks']
    },
    {
      id: 2,
      number: '03',
      title: f.visionTitle || 'Our Vision for Every Woman',
      category: 'AUTONOMY & DIGNITY',
      tag: 'SOVEREIGN FUTURE',
      image: '/images/rural-women-circle-simintini.jpg',
      imageAlt: 'Rural women holding awards and handloom craft in Kadepur',
      imageBadge: '🌾 Rural Livelihood & Autonomy',
      quote: '"True independence happens when emotional healing meets sustainable financial agency and peer solidarity."',
      preview: f.visionText || 'To create a society where every woman feels confident, independent, and valued. A society where women live with dignity, courage, and hope.',
      detail: f.targetAudience || 'A society where women are empowered to overcome challenges such as domestic crisis, reclaim their identity, and live with dignity, courage, and hope through counseling, vocational skills, and peer solidarity.',
      icon: Shield,
      accentColor: '#123F3A', // Deep Petrol Teal
      shapeClass: 'rounded-t-[3.25rem] rounded-b-2xl',
      borderClass: 'border-[#123F3A]/40 hover:border-[#123F3A]/85',
      badgeClass: 'bg-[#123F3A]/15 text-[#123F3A] border-[#123F3A]/30',
      glowClass: 'hover:shadow-[0_16px_35px_rgba(18,63,58,0.3)]',
      gradientBg: 'bg-gradient-to-b from-[#FFFDF9] via-[#F2F7F6] to-[#E3EFEB]/60',
      keyPoints: ['Livelihood sewing clusters', 'Inherent dignity & legal rights', 'Lifelong community sisterhood']
    }
  ];

  return (
    <section 
      id="about" 
      className="py-20 lg:py-28 bg-[#F8F2E8] border-t border-[#C89B52]/20 relative overflow-hidden scroll-mt-20"
      aria-label="About the Founder"
    >
      {/* Subtle Ambient Silk & Botanical Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C89B52]/10 rounded-full blur-3xl pointer-events-none -mr-28 -mt-28" />
      <div className="absolute bottom-1/3 -left-28 w-96 h-96 bg-[#123F3A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 lg:space-y-20">

        {/* =========================================================================
            PART 1: ASYMMETRIC EDITORIAL HERO (Portrait Arch & Story Statement)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (5 cols): Sculptural Editorial Portrait Frame with Interactive Click Effects */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            
            {/* Interactive Lens Switcher Helper Pill */}
            <button
              type="button"
              onClick={handlePhotoClick}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFCF7] border border-[#C89B52]/40 text-[#123F3A] text-[11px] font-sans font-medium mb-3 shadow-2xs hover:bg-[#C89B52]/10 transition-all cursor-pointer group"
              title="Click photo to explore different field lenses"
            >
              <RefreshCw className="w-3 h-3 text-[#C89B52] group-hover:rotate-180 transition-transform duration-500" />
              <span>Click photo to cycle lens ({photoEffectIndex + 1}/4)</span>
            </button>

            <div 
              onClick={handlePhotoClick}
              role="button"
              tabIndex={0}
              aria-label={`Founder photo interactive lens: ${currentPhotoEffect.name}. Click to cycle effects.`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePhotoClick(e); } }}
              className="relative group w-full max-w-sm sm:max-w-md mx-auto cursor-pointer select-none active:scale-[0.99] transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#C89B52] rounded-t-[140px] rounded-b-3xl"
            >
              
              {/* Dynamic Sculptural Backing Geometry */}
              <div 
                className={`absolute -inset-3 sm:-inset-4 rounded-t-[140px] rounded-b-3xl transform ${currentPhotoEffect.backingRotate} group-hover:rotate-0 transition-all duration-700 ${currentPhotoEffect.backingClass} ${currentPhotoEffect.glowStyle}`} 
                aria-hidden="true" 
              />
              
              {/* Champagne Gold Layered Offset Contour */}
              <div 
                className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-full h-full rounded-t-[140px] rounded-b-3xl border-2 border-[#C89B52]/50 pointer-events-none transform translate-x-1.5 translate-y-1.5" 
                aria-hidden="true" 
              />

              {/* Main Photographic Arch Frame */}
              <div className={`relative rounded-t-[140px] rounded-b-3xl overflow-hidden bg-[#1B554C] border-2 transition-all duration-500 z-10 ${currentPhotoEffect.ringClass}`}>
                
                {!photoError ? (
                  <img 
                    src="/images/founder-simintini.jpg" 
                    alt="Simintini Shingade - Founder of Aastha for Women" 
                    style={{ filter: currentPhotoEffect.imgFilter }}
                    className="w-full h-80 sm:h-96 lg:h-[430px] object-cover object-top transform group-hover:scale-102 transition-all duration-700 ease-out"
                    onError={() => setPhotoError(true)}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-96 bg-[#123F3A] flex flex-col items-center justify-center p-8 text-center text-[#FFFCF7]">
                    <Users className="w-12 h-12 text-[#C89B52] mb-3 opacity-90" />
                    <span className="font-serif text-lg font-medium text-[#F8F2E8]">
                      Simintini Shingade
                    </span>
                    <span className="text-xs text-[#F8F2E8]/70 mt-1">
                      Founder of Aastha for Women
                    </span>
                  </div>
                )}

                {/* Animated Ripple Pulse on Click */}
                {isRippling && (
                  <span 
                    className="absolute inset-0 rounded-t-[140px] rounded-b-3xl bg-white/25 pointer-events-none animate-ping"
                    style={{ animationDuration: '600ms' }}
                  />
                )}

                {/* Floating Top-Right Mode Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center gap-1 text-[10px] font-sans font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FFFCF7] border border-white/20 shadow-md">
                    <Sparkles className="w-3 h-3 text-[#C89B52]" />
                    <span>Mode {photoEffectIndex + 1}/4</span>
                  </span>
                </div>

                {/* Subtle Gradient Scrim and Interactive Identity Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#252522]/90 via-[#252522]/20 to-transparent opacity-85 pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-white z-20">
                  <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border text-[11px] font-sans tracking-wide transition-all duration-300 shadow-md ${currentPhotoEffect.badgeStyle}`}>
                    <span className={`w-2 h-2 rounded-full ${currentPhotoEffect.dotColor} animate-pulse`} />
                    <span className="font-medium">{currentPhotoEffect.badge}</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Micro Caption under Portrait */}
            <p className="text-[11px] text-[#252522]/60 font-sans mt-3 text-center lg:text-left">
              ✦ Active Lens: <span className="font-semibold text-[#123F3A]">{currentPhotoEffect.name}</span>
            </p>

          </div>

          {/* Right Column (7 cols): Editorial Typography, Statement & Biography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Identity Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B52]/15 border border-[#C89B52]/35 text-[#123F3A] text-xs font-semibold tracking-[0.22em] uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C89B52]" />
              <span>{f.badge || 'THE HEART BEHIND AASTHA'}</span>
            </div>

            {/* Founder Name */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#123F3A] font-normal tracking-tight leading-[1.1]">
                {f.name || 'Simintini Shingade'}
              </h2>
              <p className="text-sm sm:text-base text-[#C76E61] font-sans font-medium mt-2 tracking-wide">
                {f.role || 'Founder of Aastha for Women • Counselor & Social Worker'}
              </p>
            </div>

            {/* Meaningful Founder Statement Quote */}
            <div className="relative pl-5 border-l-2 border-[#C89B52] py-1">
              <p className="text-lg sm:text-xl font-serif italic text-[#123F3A] leading-relaxed">
                "{f.slogan || 'Every woman deserves a safe space to be heard, respected, and empowered to rebuild her life with confidence.'}"
              </p>
            </div>

            {/* Concise Biography Narrative */}
            <div className="space-y-4 text-sm sm:text-base text-[#252522]/85 leading-relaxed font-sans font-light">
              <p>
                {f.introText || "Simintini's journey to establishing Aastha emerged from personal life challenges and witnessing the silent suffering of women facing domestic crises. Her experiences fueled a resolve to create a sanctuary where women find professional guidance without stigma."}
              </p>
              <p className="text-xs sm:text-sm text-[#252522]/75">
                From listening to women in distress to organizing community awareness circles across urban slums, rural villages, and correctional institutions like Yerawada Jail, her fieldwork bridges emotional crisis with tangible self-reliance.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenFounderPage}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#123F3A] text-[#FFFCF7] hover:bg-[#1B554C] text-xs sm:text-sm font-medium tracking-wide shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#123F3A] focus:ring-offset-2"
              >
                <BookOpen className="w-4 h-4 text-[#C89B52]" />
                <span>{f.readFullStory || 'Read Full Founder Journey →'}</span>
              </button>

              <button
                type="button"
                onClick={onRequestGuidance}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-transparent hover:bg-[#C89B52]/10 text-[#123F3A] border border-[#123F3A]/30 hover:border-[#123F3A] text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#123F3A]"
              >
                <span>{f.cta || 'Speak with our counseling team'}</span>
                <ArrowRight className="w-4 h-4 text-[#C89B52]" />
              </button>
            </div>

          </div>

        </div>


        {/* =========================================================================
            PART 2: REDESIGNED VISUAL STORYTELLING (Editorial Archival Timeline)
            Bespoke Sculpted Cards, High-Res Photography Windows & Rich Narratives
           ========================================================================= */}
        <div className="pt-6 sm:pt-10">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B52]/15 border border-[#C89B52]/35 text-[#123F3A] text-xs font-semibold tracking-[0.22em] uppercase shadow-2xs">
              <Flower2 className="w-3.5 h-3.5 text-[#C89B52]" />
              <span>THE JOURNEY OF RESOLVE</span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#123F3A] font-normal leading-tight tracking-tight">
              From Personal Resilience to Grassroots Impact
            </h3>
            
            <p className="text-xs sm:text-sm md:text-base text-[#252522]/80 font-sans max-w-2xl mx-auto font-light leading-relaxed">
              Every chapter of Aastha began not behind a desk, but with the courage to sit alongside women facing silence, listening with unconditional dignity.
            </p>
          </div>

          {/* Connected Pathway Stepper Ribbon (Desktop) */}
          <div className="max-w-4xl mx-auto mb-10 hidden md:block">
            <div className="relative flex items-center justify-between">
              <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#C89B52]/50 via-[#C76E61]/50 to-[#123F3A]/50 z-0" />
              
              {milestones.map((step, sIdx) => {
                const isExpanded = expandedMilestone === step.id;
                return (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => setExpandedMilestone(isExpanded ? null : step.id)}
                    className="relative z-10 flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FFFCF7] border-2 shadow-xs transition-all duration-300 hover:scale-105 cursor-pointer group"
                    style={{ borderColor: step.accentColor }}
                  >
                    <span 
                      className="w-7 h-7 rounded-full text-xs font-serif font-bold flex items-center justify-center text-white"
                      style={{ backgroundColor: step.accentColor }}
                    >
                      {step.number}
                    </span>
                    <span className="text-xs font-sans font-semibold text-[#123F3A]">
                      {step.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Story Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 sm:gap-8 items-stretch">
            {milestones.map((item) => {
              const IconComp = item.icon;
              const isExpanded = expandedMilestone === item.id;

              return (
                <div
                  key={item.id}
                  className={`group relative ${item.shapeClass} ${item.gradientBg} border-2 ${item.borderClass} ${item.glowClass} shadow-md transition-all duration-500 flex flex-col justify-between overflow-hidden transform hover:-translate-y-2`}
                >
                  {/* Card Header Media Window with Authentic Photography / Logo */}
                  <div className={`relative aspect-[16/10] overflow-hidden ${item.isLogo ? 'bg-[#FFFDF7] flex items-center justify-center p-3 sm:p-4' : 'bg-[#1B554C]'}`}>
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className={`w-full h-full ${item.isLogo ? 'object-contain scale-95' : 'object-cover'} object-center group-hover:scale-105 transition-transform duration-700 ease-out`}
                      loading="lazy"
                    />
                    
                    {/* Atmospheric Vignette Overlay */}
                    {!item.isLogo && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                    )}

                    {/* Top Location / Theme Tag */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${item.isLogo ? 'bg-black/75 text-white' : 'bg-black/60'} backdrop-blur-md text-[10.5px] font-sans font-medium text-white border border-white/20 shadow-xs`}>
                        <span>{item.imageBadge}</span>
                      </span>
                    </div>

                    {/* Bottom Overlapping Numbered Medallion */}
                    <div className="absolute -bottom-5 right-5 z-20">
                      <div 
                        className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-base shadow-lg ring-4 ring-white"
                        style={{ backgroundColor: item.accentColor }}
                      >
                        {item.number}
                      </div>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 sm:p-7 pt-7 flex flex-col justify-between flex-1 space-y-4">
                    
                    {/* Category & Title */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-sans font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${item.badgeClass}`}>
                          {item.category}
                        </span>
                      </div>

                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#123F3A] leading-snug group-hover:text-[#C89B52] transition-colors">
                        {item.title}
                      </h4>
                    </div>

                    {/* Pull Quote */}
                    <div className="p-3.5 rounded-xl bg-white/85 border-l-4 shadow-2xs" style={{ borderLeftColor: item.accentColor }}>
                      <p className="text-xs sm:text-[13px] font-serif italic text-[#123F3A] leading-relaxed">
                        {item.quote}
                      </p>
                    </div>

                    {/* Narrative Preview */}
                    <p className="text-xs sm:text-[13px] text-[#252522]/80 leading-relaxed font-sans font-light">
                      {item.preview}
                    </p>

                    {/* Key Takeaway Tags */}
                    <div className="pt-2 border-t border-black/5 flex flex-wrap gap-1.5">
                      {item.keyPoints.map((pt, pIdx) => (
                        <span
                          key={pIdx}
                          className="inline-flex items-center text-[10.5px] font-medium text-[#252522]/75 bg-white/70 px-2.5 py-1 rounded-md border border-black/5"
                        >
                          {pt}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Drawer & Navigation */}
                    <div className="pt-3 border-t border-[#C89B52]/20 mt-auto">
                      <button
                        type="button"
                        onClick={() => setExpandedMilestone(isExpanded ? null : item.id)}
                        aria-expanded={isExpanded}
                        className="w-full flex items-center justify-between text-xs font-semibold text-[#123F3A] hover:text-[#C89B52] transition-colors py-1 cursor-pointer focus:outline-none rounded"
                      >
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#C89B52]" />
                          <span>{isExpanded ? 'Hide Chapter Notes' : 'Read Full Chapter Detail'}</span>
                        </span>
                        <ChevronDown 
                          className={`w-4 h-4 text-[#C89B52] transform transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>

                      {/* Expandable Content Area */}
                      {isExpanded && (
                        <div className="mt-3.5 p-4 rounded-xl bg-white/95 border border-[#C89B52]/25 shadow-sm space-y-3 animate-fade-in">
                          <p className="text-xs text-[#252522]/85 leading-relaxed font-sans">
                            {item.detail}
                          </p>

                          <button
                            type="button"
                            onClick={onOpenFounderPage}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#123F3A] hover:text-[#C89B52] underline decoration-[#C89B52] underline-offset-4 cursor-pointer"
                          >
                            <span>Open interactive Founder Story studio →</span>
                          </button>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>



        </div>

      </div>
    </section>
  );
}
