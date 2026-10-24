import React, { useState, useEffect, useRef } from 'react';
import { Users, TrendingUp, Shield, HeartHandshake, Flower2, ArrowRight, MapPin, ChevronDown, Sparkles } from 'lucide-react';

export default function SilkCurtainTransition({ t = {}, onOpenFounderPage = null }) {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showCardPlaces, setShowCardPlaces] = useState(false);

  const p = t.purpose || {};
  const stats = t.stats || {};

  const quoteText = p.closingQuote || "Every step forward begins with the courage to break the silence.";

  const milestones = [
    {
      num: stats.stat1Number || "300+",
      label: stats.stat1Label || "Adolescent Girls & Women Connected",
      tag: "SANCTUARY & CAMPUS",
      desc: stats.stat1Desc || "Direct guidance circles, pre-marriage orientation, and confidential emotional support.",
      icon: Users,
      accent: "#7C3AED",
      badgeBg: "bg-[#7C3AED]/15 text-[#F43F5E]",
      shapeClass: "rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-2xl rounded-bl-2xl",
      cardBg: "bg-gradient-to-br from-[#FFFFFF] via-[#FAF5FF] to-[#F3E8FF]/60",
      borderClass: "border-[#DDD6FE] hover:border-[#7C3AED]",
      glowClass: "hover:shadow-[0_14px_30px_rgba(124,58,237,0.22)]",
      numberColor: "text-[#581C87]",
      cornerFlourish: "top-0 left-0 border-t-2 border-l-2 rounded-tl-[3rem] border-[#7C3AED]/50"
    },
    {
      num: stats.stat2Number || "25+",
      label: stats.stat2Label || "Volunteers Engaged on Ground",
      tag: "VOLUNTEER FORCE",
      desc: stats.stat2Desc || "Dedicated community volunteers & student advocates driving fieldwork across Maharashtra.",
      icon: TrendingUp,
      accent: "#FB923C",
      badgeBg: "bg-[#FB923C]/15 text-[#EA580C]",
      shapeClass: "rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-2xl rounded-br-2xl",
      cardBg: "bg-gradient-to-br from-[#FFFFFF] via-[#FFF7ED] to-[#FFEDD5]/50",
      borderClass: "border-[#FED7AA] hover:border-[#FB923C]",
      glowClass: "hover:shadow-[0_14px_30px_rgba(251,146,60,0.22)]",
      numberColor: "text-[#C2410C]",
      cornerFlourish: "top-0 right-0 border-t-2 border-r-2 rounded-tr-[3rem] border-[#C026D3]/50"
    },
    {
      num: stats.stat3Number || "100%",
      label: stats.stat3Label || "Confidential Counselling",
      tag: "SACRED TRUST",
      desc: stats.stat3Desc || "Strict privacy, empathy, and dignity assured in every interaction.",
      icon: Shield,
      accent: "#0284C7",
      badgeBg: "bg-[#0284C7]/15 text-[#0284C7]",
      shapeClass: "rounded-t-[3.25rem] rounded-b-2xl",
      cardBg: "bg-gradient-to-br from-[#FFFFFF] via-[#F0F9FF] to-[#E0F2FE]/50",
      borderClass: "border-[#BAE6FD] hover:border-[#0284C7]",
      glowClass: "hover:shadow-[0_14px_30px_rgba(2,132,199,0.22)]",
      numberColor: "text-[#0369A1]",
      cornerFlourish: "top-0 inset-x-0 border-t-2 rounded-t-[3.25rem] border-[#4F46E5]/50"
    },
    {
      num: stats.stat4Number || "8+",
      label: stats.stat4Label || "Grassroots Regions & Cities Explored",
      tag: "SANGLI & REGIONAL REACH",
      desc: stats.stat4Desc || "Direct field interventions across Pune, Sangli District, Satara, and rural clusters.",
      icon: HeartHandshake,
      accent: "#E11D48",
      badgeBg: "bg-[#E11D48]/15 text-[#E11D48]",
      shapeClass: "rounded-tl-2xl rounded-tr-[3rem] rounded-bl-[3rem] rounded-br-2xl",
      cardBg: "bg-gradient-to-br from-[#FFFFFF] via-[#FFF1F2] to-[#FFE4E6]/50",
      borderClass: "border-[#FECDD3] hover:border-[#E11D48]",
      glowClass: "hover:shadow-[0_14px_30px_rgba(225,29,72,0.22)]",
      numberColor: "text-[#9F1239]",
      cornerFlourish: "top-0 right-0 border-t-2 border-r-2 rounded-tr-[3rem] border-[#F43F5E]/50",
      places: stats.stat4Places || [
        "Khadki Shikshan Sanstha (MOU Signed) — 300+ Girls Guided",
        "Karve Institute of Social Service — 2 MSW Students Joined Fieldwork",
        "Sangli District & Miraj — Expanding Footprint & Youth Advocacy Exploration",
        "Yerawada Central Prison — Women's Healing & Legal Literacy",
        "Wadarwadi Slum Community — Mediation & Cloud Kitchens",
        "Kadepur Rural Cluster — Livelihoods & Women's Collectives",
        "Pune, Sangli & Satara — Monsoon Relief & Humanitarian Drives",
        "Alandi & Sangvi Camps"
      ]
    },
  ];

  // Auto-play video smoothly
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative w-full bg-[#FCFAFD]" aria-label="Transition to Real Ground Milestones">

      {/* =========================================================================
          PART 1: FULL-WIDTH HORIZONTAL SILK CURTAIN BANNER STRIP
          Edge-to-edge 100% screen width, compact vertical thickness
         ========================================================================= */}
      <div className="relative w-full overflow-hidden border-y-2 border-[#C084FC]/50 bg-gradient-to-r from-[#D81B60] via-[#E11D48] via-[#F43F5E] to-[#FB923C] text-[#FFF9FB] py-12 sm:py-16 md:py-18 px-4 sm:px-6 lg:px-8 text-center shadow-md">
        
        {/* Full-Width Background Silk Video spanning edge-to-edge */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
          {!videoError ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/assets/silk-curtain-poster.jpg"
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
              className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
                videoLoaded ? 'opacity-75' : 'opacity-65'
              }`}
            >
              <source src="/assets/silk_curtain.mp4" type="video/mp4" />
              <source src="/assets/silk_curtains.mp4" type="video/mp4" />
              <img
                src="/assets/silk-curtain-poster.jpg"
                alt="Flowing silk curtain"
                className="w-full h-full object-cover object-center"
              />
            </video>
          ) : (
            <img
              src="/assets/silk-curtain-poster.jpg"
              alt="Flowing silk curtain"
              className="w-full h-full object-cover object-center opacity-70"
            />
          )}

          {/* Deep Petrol Teal & Saffron Gradient Overlay for 100% Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#D81B60]/65 via-[#F43F5E]/30 to-[#FB923C]/50 pointer-events-none" />
          <div className="absolute inset-0 bg-[#C026D3]/20 mix-blend-overlay pointer-events-none" />
        </div>

        {/* Centered Overlaid Quote & Floral Motif inside the full-width strip */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          
          {/* Top Floral Accent */}
          <div className="flex items-center justify-center gap-2.5 opacity-90">
            <span className="w-10 sm:w-16 h-px bg-[#BA5C7B]/60" />
            <Flower2 className="w-4 h-4 text-[#BA5C7B]" />
            <span className="w-10 sm:w-16 h-px bg-[#BA5C7B]/60" />
          </div>

          {/* Quote Text */}
          <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-white font-medium italic tracking-tight leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            "{quoteText}"
          </blockquote>

          {/* Bottom Badge */}
          <div className="pt-1">
            <span className="inline-block text-[11px] font-sans tracking-[0.2em] uppercase text-[#FBF1F5]/80 bg-black/30 px-4 py-1 rounded-full border border-white/10">
              Aastha Ground Conviction
            </span>
          </div>

        </div>

      </div>


      {/* =========================================================================
          PART 2: REAL GROUND MILESTONES (Separate clean impact section)
          Attractive Sculpted Card Shapes & Architectural Curves
         ========================================================================= */}
      <section 
        id="milestones" 
        className="pt-12 pb-16 sm:pb-20 lg:pb-24 border-b border-[#BA5C7B]/20 scroll-mt-20"
        aria-label="Real Ground Milestones"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.22em] uppercase text-[#F43F5E] mb-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FAF5FF] to-[#FFF1F2] border border-[#DDD6FE] shadow-2xs">
              REAL GRASSROOTS IMPACT
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#7A1D36] font-normal tracking-tight">
              {stats.title || 'Verified Ground Milestones'}
            </h2>
            <p className="text-xs sm:text-sm text-[#242522]/80 font-sans mt-2 max-w-lg mx-auto">
              {stats.subtitle || 'Every number represents a woman whose life is moving forward with dignity.'}
            </p>
          </div>

          {/* 4 Impact Sculpted Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch">
            {milestones.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className={`relative p-6 sm:p-7 ${item.shapeClass} ${item.cardBg} border-2 ${item.borderClass} ${item.glowClass} shadow-sm transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 overflow-hidden`}
                >
                  {/* Subtle Corner Architectural Accent Flourish */}
                  <div className={`absolute w-12 h-12 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity ${item.cornerFlourish}`} />

                  {/* Top Row: Sculpted Icon Medallion & Tag */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {/* Sculpted Icon Pill */}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110 ${item.badgeBg}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Pill Tag */}
                      <span className="text-[10px] font-sans font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/80 border border-black/5 text-[#242522]/70 shadow-2xs">
                        {item.tag}
                      </span>
                    </div>

                    {/* Stat Number */}
                    <div className={`text-3xl sm:text-4xl font-serif font-bold ${item.numberColor} mb-2 tracking-tight`}>
                      {item.num}
                    </div>

                    {/* Label */}
                    <h3 className="text-sm sm:text-[15px] font-bold text-[#2B1822] mb-2 font-sans leading-snug">
                      {item.label}
                    </h3>
                  </div>

                  {/* Description & Visited Places */}
                  <div className="pt-3 border-t border-[#BA5C7B]/20 flex flex-col justify-between flex-1 mt-2">
                    <p className="text-xs text-[#4A3840] leading-relaxed font-normal font-sans mb-3">
                      {item.desc}
                    </p>

                    {item.places && item.places.length > 0 && (
                      <div className="mt-auto pt-2 border-t border-[#A84F49]/20">
                        <button
                          type="button"
                          onClick={() => setShowCardPlaces(!showCardPlaces)}
                          className="w-full inline-flex items-center justify-between gap-1 text-[11px] font-medium text-[#883631] bg-[#A84F49]/15 hover:bg-[#A84F49]/25 px-3 py-2 rounded-xl border border-[#A84F49]/30 transition-all cursor-pointer group/btn"
                        >
                          <span className="flex items-center gap-1.5 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-[#A84F49] shrink-0" />
                            <span>{showCardPlaces ? "Hide Visited Sites" : `View ${item.places.length} Visited Centres`}</span>
                          </span>
                          <ChevronDown className={`w-3.5 h-3.5 text-[#A84F49] transform transition-transform duration-300 ${showCardPlaces ? 'rotate-180' : ''}`} />
                        </button>

                        {showCardPlaces && (
                          <div className="mt-2.5 bg-white/95 p-2.5 rounded-xl border border-[#A84F49]/25 shadow-sm animate-fade-in space-y-1.5">
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#883631] mb-1">
                              Ground Centers & Relief Drives:
                            </div>
                            <div className="flex flex-col gap-1.5">
                              {item.places.map((place, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="inline-flex items-start gap-1.5 text-[10.5px] font-medium text-[#7A2E29] bg-[#A84F49]/8 px-2 py-1 rounded-md border border-[#A84F49]/20"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#A84F49] shrink-0 mt-1" />
                                  <span className="leading-snug">{place}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clean Smooth Navigation Link to Founder Story */}
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => {
                if (onOpenFounderPage) {
                  onOpenFounderPage();
                } else {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#38152E] hover:text-[#BA5C7B] bg-[#FFFCF7] hover:bg-white border border-[#38152E]/20 hover:border-[#BA5C7B] px-6 py-3 rounded-full transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#38152E]"
            >
              <span>Read Simintini Shingade's founder journey below</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#BA5C7B]" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
