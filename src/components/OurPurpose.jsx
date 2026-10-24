import React, { useState, useEffect } from 'react';
import { 
  Shield, Compass, Sparkles, HeartHandshake, MessageCircle, 
  ArrowRight, ArrowUpRight, ChevronDown, Leaf, Flower2, 
  Users 
} from 'lucide-react';

export default function OurPurpose({ 
  t = {}, 
  onOpenGuidance = () => {}, 
  onOpenFounderPage = null 
}) {
  const [photoError, setPhotoError] = useState(false);
  const [expandedPrinciple, setExpandedPrinciple] = useState(null); // 0, 1, 2 or null
  const [activeStep, setActiveStep] = useState(0); // 0, 1, 2 default to first active
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const p = t.purpose || {};

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleChange);
    return () => motionQuery.removeEventListener('change', handleChange);
  }, []);

  const scrollToAnchor = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleFounderClick = () => {
    if (onOpenFounderPage) {
      onOpenFounderPage();
    } else {
      scrollToAnchor('about');
    }
  };

  // Three Core Values Data
  const principles = [
    {
      id: 0,
      number: '01',
      title: p.principle1Title || 'Dignity',
      desc: p.principle1Desc || "Honoring every woman's story, emotions, and self-respect without condition or stigma.",
      detail: p.principle1Detail || "At Aastha, dignity means never treating a woman's crisis as a personal failure. We provide safe, non-judgmental spaces where feelings are validated and personal privacy is unconditionally protected.",
      icon: Shield,
      accent: 'border-[#C78A32]/40',
      tagColor: 'text-[#C78A32] bg-[#C78A32]/10'
    },
    {
      id: 1,
      number: '02',
      title: p.principle2Title || 'Choice',
      desc: p.principle2Desc || 'Empowering each individual to make informed, courageous decisions for her own future.',
      detail: p.principle2Detail || "We believe true empowerment happens when a woman leads her own life decisions. Our counselors help her explore legal, family, and personal options without ever forcing a path upon her.",
      icon: Compass,
      accent: 'border-[#A84F49]/40',
      tagColor: 'text-[#A84F49] bg-[#A84F49]/10'
    },
    {
      id: 2,
      number: '03',
      title: p.principle3Title || 'Independence',
      desc: p.principle3Desc || 'Nurturing inner emotional resilience alongside practical pathways to economic self-reliance.',
      detail: p.principle3Detail || "Independence is both inner emotional resilience and practical capability. We connect women with skill training, vocational workshops, and community circles so they can stand firmly on their own feet.",
      icon: Sparkles,
      accent: 'border-[#A8B9A0]/50',
      tagColor: 'text-[#A8B9A0] bg-[#A8B9A0]/10'
    }
  ];

  // Three Pathway Steps Data
  const steps = [
    {
      id: 0,
      number: p.step1Num || '01',
      title: p.step1Title || 'Be heard',
      desc: p.step1Desc || 'A safe space to share without judgement.',
      concept: p.step1Concept || 'Confidential Listening',
      detail: p.step1Detail || 'Our first priority is emotional containment and psychological safety. In a 1-on-1 private setting, women can unpack trauma, marital strife, or family pressure without fear of community exposure or blame.',
      icon: MessageCircle,
      themeColor: '#A8B9A0', // Sage
      badgeClass: 'bg-[#A8B9A0]/20 text-[#103D39] border-[#A8B9A0]/50',
      image: '/images/aastha-young-women-group.jpg',
      alt: 'Step 01 - Be Heard: Community gathering of young women, college youth and changemakers'
    },
    {
      id: 1,
      number: p.step2Num || '02',
      title: p.step2Title || 'Find support',
      desc: p.step2Desc || 'Confidential guidance shaped around individual needs.',
      concept: p.step2Concept || 'Tailored Psychological Therapy',
      detail: p.step2Detail || 'Every woman’s reality is unique. We co-create a personalized support plan combining professional trauma-informed counseling, family mediation when safe, and emotional resilience exercises.',
      icon: HeartHandshake,
      themeColor: '#A84F49', // Terracotta
      badgeClass: 'bg-[#A84F49]/15 text-[#A84F49] border-[#A84F49]/40',
      image: '/images/aastha-aaddarsh-inauguration.jpg',
      alt: 'Step 02 - Find Support: Community network and institutional support ceremony'
    },
    {
      id: 2,
      number: p.step3Num || '03',
      title: p.step3Title || 'Move forward',
      desc: p.step3Desc || 'Practical pathways towards confidence and independence.',
      concept: p.step3Concept || 'Sustainable Self-Reliance',
      detail: p.step3Detail || 'We bridge the gap between emotional healing and real-world autonomy. Through vocational linkages, legal awareness, and self-help peer groups, women build long-term confidence and dignity.',
      icon: Sparkles,
      themeColor: '#C78A32', // Saffron Gold
      badgeClass: 'bg-[#C78A32]/15 text-[#C78A32] border-[#C78A32]/40',
      image: '/images/aastha-women-sunrise-walking.jpg',
      alt: 'Step 03 - Move Forward: Women walking at sunrise toward empowerment, dignity and self-reliance'
    }
  ];

  return (
    <section 
      id="purpose" 
      className="relative text-[#242522] overflow-hidden scroll-mt-20"
      aria-label="Our Purpose"
    >

      {/* =========================================================================
          SECTION ONE: OUR PURPOSE HERO (Asymmetric Editorial Layout)
          Warm Ivory base (#F7F0E5), Arch Photographic Container, Authentic Photo
         ========================================================================= */}
      <div className="relative py-20 lg:py-28 bg-[#F7F0E5] border-t border-[#C78A32]/20">
        
        {/* Subtle Silk & Botanical Curved Line SVG Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden -z-0">
          <svg viewBox="0 0 1200 800" fill="none" className="w-full h-full text-[#C78A32]">
            <path 
              d="M-100 200 C300 100, 600 450, 1300 250" 
              stroke="currentColor" 
              strokeWidth="1.2" 
              strokeDasharray="4 6" 
            />
            <path 
              d="M-50 450 C350 350, 750 650, 1350 400" 
              stroke="#A8B9A0" 
              strokeWidth="0.8" 
            />
            <circle cx="950" cy="200" r="140" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column (7 cols): Editorial Typography & Calls to Action */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C78A32]/15 border border-[#C78A32]/35 text-[#103D39] text-xs font-semibold tracking-[0.22em] uppercase shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-[#C78A32]" />
                <span>{p.eyebrow || 'OUR PURPOSE'}</span>
              </div>

              {/* Serif Headline with Saffron Gold Underline */}
              <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-serif text-[#103D39] font-normal tracking-tight leading-[1.14]">
                {p.headlinePrefix || 'Every woman deserves to feel '}
                <span className="relative inline-block text-[#C78A32] italic font-normal">
                  {p.headlineHighlight || 'safe, seen, and strong.'}
                  <svg 
                    className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#C78A32]/70" 
                    viewBox="0 0 200 8" 
                    fill="none" 
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path 
                      d="M2 5.5C45 1.5 155 1.5 198 5.5" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                    />
                  </svg>
                </span>
              </h2>

              {/* Supporting Editorial Narrative */}
              <div className="space-y-4 text-base sm:text-lg text-[#242522]/90 leading-relaxed font-sans max-w-2xl">
                <p className="font-medium text-[#103D39]">
                  {p.subheadline || 'A space to be heard. A path towards independence.'}
                </p>
                <p className="text-sm sm:text-base text-[#242522]/80 leading-relaxed font-light">
                  {p.whyHeadline || 'No woman should have to face a difficult moment alone.'}{' '}
                  {p.whySub || 'Through confidential psychological counseling, pre-marital guidance, crisis mediation, and vocational self-reliance, Aastha builds a protective bridge from isolation to self-sustaining dignity.'}
                </p>
              </div>

              {/* Working Action Buttons (Accessible Contrast) */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenGuidance}
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-[#103D39] text-[#FFFCF7] hover:bg-[#0c2f2c] text-sm font-medium tracking-wide transition-all shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#103D39] focus:ring-offset-2 cursor-pointer"
                  aria-label="Request confidential guidance from Aastha counselors"
                >
                  <span>{p.closingCtaPrimary || 'Request guidance'}</span>
                  <ArrowRight className="w-4 h-4 text-[#C78A32]" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToAnchor('purpose-pathway')}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-transparent hover:bg-[#C78A32]/10 text-[#242522] border border-[#242522]/35 hover:border-[#103D39] text-sm font-medium tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-[#103D39] cursor-pointer"
                >
                  <span>{p.ctaApproach || 'Our approach'}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#242522]/70" />
                </button>
              </div>

              {/* Ground Intervention Note */}
              <div className="pt-1 flex items-center gap-2 text-xs text-[#242522]/70 italic font-serif">
                <Flower2 className="w-3.5 h-3.5 text-[#C78A32] shrink-0" />
                <span>Ground intervention across Pune and rural communities in Maharashtra.</span>
              </div>

            </div>

            {/* Right Column (5 cols): Sophisticated Arch Container with Layered Geometry & Authentic Photo */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Layered Decorative Elements: Saffron Ring & Terracotta Offset Contour */}
                <div 
                  className="absolute -top-6 -left-6 w-32 h-32 rounded-full border border-[#C78A32]/35 border-dashed pointer-events-none hidden sm:block" 
                  aria-hidden="true" 
                />
                <div 
                  className="absolute -bottom-4 -right-4 w-full h-full rounded-t-[140px] rounded-b-3xl bg-[#A84F49]/15 border border-[#A84F49]/30 pointer-events-none transform translate-x-2 translate-y-2" 
                  aria-hidden="true" 
                />

                {/* Main Arch-Shaped Photographic Container */}
                <div className="relative rounded-t-[140px] rounded-b-3xl overflow-hidden bg-[#103D39]/10 border-2 border-[#C78A32]/40 shadow-xl group">
                  {!photoError ? (
                    <img
                      src="/images/simintini-classroom-balsuraksha.jpg"
                      alt={p.photoAltA || 'Aastha for Women grassroots community dialogue and emotional support gathering in Pune'}
                      onError={() => setPhotoError(true)}
                      className="w-full h-80 sm:h-96 lg:h-[440px] object-cover object-center transform group-hover:scale-102 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-96 bg-[#103D39] flex flex-col items-center justify-center p-8 text-center text-[#FFFCF7]">
                      <Users className="w-12 h-12 text-[#C78A32] mb-3 opacity-90" />
                      <span className="font-serif text-lg font-medium text-[#F7F0E5] mb-1">
                        Grassroots Community Circle
                      </span>
                      <span className="text-xs text-[#F7F0E5]/70 max-w-xs">
                        {p.photoCaptionA || 'Pune Community Circle — Grassroots Psychological Healing & Trust Building'}
                      </span>
                    </div>
                  )}

                  {/* Gentle Scrim Overlay & Authentic Caption Badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#242522]/90 via-[#242522]/30 to-transparent opacity-90 pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <p className="text-xs font-medium tracking-wide text-[#F7F0E5] leading-snug drop-shadow-sm flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C78A32] shrink-0 mt-1" />
                      <span>{p.photoCaptionA || 'Pune Community Circle — Grassroots Psychological Healing & Trust Building'}</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>


      {/* =========================================================================
          SECTION TWO: FOUNDATIONAL CONVICTION (Statement Section)
          Deep Petrol Teal (#103D39), Expressive Serif Typography,
          Editorial 3-Column Value Treatment with Accessible Inline Reveals
         ========================================================================= */}
      <div className="relative py-20 sm:py-24 lg:py-28 bg-[#103D39] text-[#FFFCF7] overflow-hidden">
        
        {/* Subtle Watermark Orbital Background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C78A32]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#A8B9A0]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Statement Header */}
          <div className="max-w-3xl mb-14 lg:mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[#C78A32] mb-3">
              {p.beliefEyebrow || 'FOUNDATIONAL CONVICTION'}
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FFFCF7] font-normal leading-tight italic">
              "{p.beliefHeadline || "Strength doesn't always look loud."}"
            </h3>
            <p className="mt-4 text-base sm:text-lg text-[#F7F0E5]/85 font-light leading-relaxed font-sans">
              {p.beliefSub || 'Sometimes, it begins with one conversation, one safe space, one person who listens.'}
            </p>
          </div>

          {/* Three Core Principles (Editorial Asymmetric 3-Column Layout with Accessible Inlines) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {principles.map((item) => {
              const IconComp = item.icon;
              const isExpanded = expandedPrinciple === item.id;
              
              return (
                <div 
                  key={item.id}
                  className={`rounded-2xl bg-[#0c2f2c]/80 backdrop-blur-xs border transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 relative ${
                    isExpanded 
                      ? 'border-[#C78A32] shadow-lg shadow-black/20 ring-1 ring-[#C78A32]/50' 
                      : 'border-[#C78A32]/25 hover:border-[#C78A32]/60'
                  }`}
                >
                  <div>
                    {/* Header: Serif Number & Glyph */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-serif font-light text-[#C78A32]">
                        {item.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#103D39] border border-[#C78A32]/30 text-[#C78A32] flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Principle Title */}
                    <h4 className="text-xl sm:text-2xl font-serif font-medium text-[#FFFCF7] mb-2.5">
                      {item.title}
                    </h4>

                    {/* Concise Statement */}
                    <p className="text-xs sm:text-sm text-[#F7F0E5]/85 leading-relaxed font-light font-sans mb-4">
                      {item.desc}
                    </p>
                  </div>

                  {/* Interactive Inline Reveal Accordion */}
                  <div className="pt-4 border-t border-[#C78A32]/20">
                    <button
                      type="button"
                      onClick={() => setExpandedPrinciple(isExpanded ? null : item.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`principle-panel-${item.id}`}
                      className="w-full flex items-center justify-between text-xs font-medium text-[#C78A32] hover:text-[#FFFCF7] transition-colors py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C78A32] rounded"
                    >
                      <span>
                        {isExpanded 
                          ? (p.clickToClose || 'Close detail') 
                          : (p.clickToExplore || 'Explore practice')}
                      </span>
                      <ChevronDown 
                        className={`w-4 h-4 transform transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    {/* Expandable Content Area */}
                    <div
                      id={`principle-panel-${item.id}`}
                      role="region"
                      aria-label={`${item.title} practice detail`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-56 opacity-100 mt-3 pt-3 border-t border-white/10' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-xs text-[#F7F0E5]/90 leading-relaxed font-sans bg-[#103D39]/80 p-3.5 rounded-xl border border-[#C78A32]/20">
                        {item.detail}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>


      {/* =========================================================================
          SECTION THREE: THREE-STEP JOURNEY (Connected Horizontal Timeline)
          "A Thoughtful Pathway from Isolation to Autonomy"
          Coordinated Visual Treatments (Sage, Terracotta, Saffron), Interactive Active States
         ========================================================================= */}
      <div 
        id="purpose-pathway" 
        className="relative py-20 sm:py-24 lg:py-28 bg-[#F7F0E5] border-t border-[#C78A32]/20 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18">
            <span className="inline-block text-xs font-semibold tracking-[0.22em] uppercase text-[#C78A32] mb-2.5">
              {p.approachEyebrow || 'OUR THREE-STEP JOURNEY'}
            </span>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#103D39] font-normal leading-tight">
              {p.approachHeadline || 'A Thoughtful Pathway from Isolation to Autonomy'}
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#242522]/70 font-sans max-w-xl mx-auto">
              Click any stage below to explore our grounded clinical and social support methodology.
            </p>
          </div>

          {/* Connected Timeline Container (Desktop Horizontal Track / Mobile Vertical) */}
          <div className="relative">
            
            {/* Desktop Horizontal Connecting Track */}
            <div 
              className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#A8B9A0] via-[#A84F49] to-[#C78A32] opacity-60 z-0" 
              aria-hidden="true"
            />

            {/* Three Pathway Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {steps.map((step) => {
                const IconComp = step.icon;
                const isActive = activeStep === step.id;

                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveStep(step.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    aria-controls={`step-detail-${step.id}`}
                    aria-label={`Step ${step.number}: ${step.title}`}
                    className={`rounded-2xl transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#103D39] ${
                      isActive
                        ? 'bg-[#FFFCF7] border-2 border-[#103D39] shadow-xl transform -translate-y-1'
                        : 'bg-[#FFFCF7]/70 hover:bg-[#FFFCF7] border border-[#C78A32]/30 hover:border-[#103D39]/50 shadow-xs'
                    }`}
                  >
                    <div>
                      {/* Embedded Authentic Photograph */}
                      <div className="relative h-44 sm:h-52 rounded-xl overflow-hidden mb-4 border border-[#C78A32]/25 bg-black/10 shadow-xs group/img">
                        <img 
                          src={step.image} 
                          alt={step.alt}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                        {/* Top Step Number Pill */}
                        <div className="absolute top-3 left-3">
                          <span 
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold shadow-sm backdrop-blur-md text-white border border-white/20"
                            style={{
                              backgroundColor: `${step.themeColor}DD`
                            }}
                          >
                            <span>STEP {step.number}</span>
                          </span>
                        </div>

                        {/* Top Right Icon */}
                        <div className="absolute top-3 right-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md text-white border border-white/25 shadow-xs"
                          >
                            <IconComp className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        {/* Bottom Tag & Title on photo */}
                        <div className="absolute bottom-2.5 left-3 right-3 text-white">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#F7D070] block drop-shadow-xs">
                            {step.concept}
                          </span>
                          <h4 className="text-base sm:text-lg font-serif font-medium text-white line-clamp-1 drop-shadow-sm">
                            {step.title}
                          </h4>
                        </div>
                      </div>

                      {/* Step Primary Quote */}
                      <p className="text-xs sm:text-sm text-[#242522]/80 leading-relaxed font-light mb-4">
                        "{step.desc}"
                      </p>
                    </div>

                    {/* Step Associated Concept Pill */}
                    <div>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium border ${step.badgeClass}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>{step.concept}</span>
                      </div>

                      {/* Inline Active Details Panel */}
                      <div
                        id={`step-detail-${step.id}`}
                        role="region"
                        aria-label={`${step.title} clinical methodology`}
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isActive ? 'max-h-48 opacity-100 mt-4 pt-4 border-t border-[#C78A32]/25' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-xs text-[#242522]/85 leading-relaxed font-sans bg-[#F7F0E5] p-3 rounded-xl border border-[#C78A32]/20">
                          {step.detail}
                        </p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>


    </section>
  );
}
