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
      accent: "#A8B9A0", // Sage
      badgeBg: "bg-[#A8B9A0]/25 text-[#103D39]",
      shapeClass: "rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-2xl rounded-bl-2xl",
      cardBg: "bg-gradient-to-br from-[#FFFCF7] via-[#F4F7F2] to-[#E9F0E7]/60",
      borderClass: "border-[#A8B9A0]/45 hover:border-[#103D39]/70",
      glowClass: "hover:shadow-[0_14px_30px_rgba(168,185,160,0.35)]",
      numberColor: "text-[#103D39]",
      cornerFlourish: "top-0 left-0 border-t-2 border-l-2 rounded-tl-[3rem] border-[#A8B9A0]/70"
    },
    {
      num: stats.stat2Number || "25+",
      label: stats.stat2Label || "Volunteers Engaged on Ground",
      tag: "VOLUNTEER FORCE",
      desc: stats.stat2Desc || "Dedicated community volunteers & student advocates driving fieldwork across Maharashtra.",
      icon: TrendingUp,
      accent: "#C78A32", // Saffron
      badgeBg: "bg-[#C78A32]/25 text-[#C78A32]",
      shapeClass: "rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-2xl rounded-br-2xl",
      cardBg: "bg-gradient-to-br from-[#FFFCF7] via-[#FDF9F0] to-[#F8EED9]/60",
      borderClass: "border-[#C78A32]/45 hover:border-[#C78A32]/90",
      glowClass: "hover:shadow-[0_14px_30px_rgba(199,138,50,0.35)]",
      numberColor: "text-[#9A641B]",
      cornerFlourish: "top-0 right-0 border-t-2 border-r-2 rounded-tr-[3rem] border-[#C78A32]/70"
    },
    {
      num: stats.stat3Number || "100%",
      label: stats.stat3Label || "Confidential Counselling",
      tag: "SACRED TRUST",
      desc: stats.stat3Desc || "Strict privacy, empathy, and dignity assured in every interaction.",
      icon: Shield,
      accent: "#103D39", // Deep Teal
      badgeBg: "bg-[#103D39]/20 text-[#103D39]",
      shapeClass: "rounded-t-[3.25rem] rounded-b-2xl",
      cardBg: "bg-gradient-to-br from-[#FFFCF7] via-[#F1F6F5] to-[#E1EFEB]/70",
      borderClass: "border-[#103D39]/40 hover:border-[#103D39]/80",
      glowClass: "hover:shadow-[0_14px_30px_rgba(16,61,57,0.35)]",
      numberColor: "text-[#103D39]",
      cornerFlourish: "top-0 inset-x-0 border-t-2 rounded-t-[3.25rem] border-[#103D39]/60"
    },
    {
      num: stats.stat4Number || "8+",
      label: stats.stat4Label || "Grassroots Regions & Cities Explored",
      tag: "SANGLI & REGIONAL REACH",
      desc: stats.stat4Desc || "Direct field interventions across Pune, Sangli District, Satara, and rural clusters.",
      icon: HeartHandshake,
      accent: "#A84F49", // Terracotta
      badgeBg: "bg-[#A84F49]/25 text-[#A84F49]",
      shapeClass: "rounded-tl-2xl rounded-tr-[3rem] rounded-bl-[3rem] rounded-br-2xl",
      cardBg: "bg-gradient-to-br from-[#FFFCF7] via-[#FDF4F3] to-[#F7E1E0]/60",
      borderClass: "border-[#A84F49]/45 hover:border-[#A84F49]/90",
      glowClass: "hover:shadow-[0_14px_30px_rgba(168,79,73,0.35)]",
      numberColor: "text-[#883631]",
      cornerFlourish: "top-0 right-0 border-t-2 border-r-2 rounded-tr-[3rem] border-[#A84F49]/70",
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
    <div className="relative w-full bg-[#F7F0E5]" aria-label="Transition to Real Ground Milestones">

      {/* =========================================================================
          PART 1: FULL-WIDTH HORIZONTAL SILK CURTAIN BANNER STRIP
          Edge-to-edge 100% screen width, compact vertical thickness
         ========================================================================= */}
      <div className="relative w-full overflow-hidden border-y-2 border-[#C78A32]/40 bg-[#103D39] text-[#FFFCF7] py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 text-center shadow-inner">
        
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#103D39]/90 via-[#103D39]/55 to-[#103D39]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[#103D39]/25 mix-blend-multiply pointer-events-none" />
        </div>

        {/* Centered Overlaid Quote & Floral Motif inside the full-width strip */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          
          {/* Top Floral Accent */}
          <div className="flex items-center justify-center gap-2.5 opacity-90">
            <span className="w-10 sm:w-16 h-px bg-[#C78A32]/60" />
            <Flower2 className="w-4 h-4 text-[#C78A32]" />
            <span className="w-10 sm:w-16 h-px bg-[#C78A32]/60" />
          </div>

          {/* Quote Text */}
          <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-[#FFFCF7] font-normal italic tracking-tight leading-relaxed drop-shadow-sm">
            "{quoteText}"
          </blockquote>

          {/* Bottom Badge */}
          <div className="pt-1">
            <span className="inline-block text-[11px] font-sans tracking-[0.2em] uppercase text-[#F7F0E5]/80 bg-black/30 px-4 py-1 rounded-full border border-white/10">
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
        className="pt-12 pb-16 sm:pb-20 lg:pb-24 border-b border-[#C78A32]/20 scroll-mt-20"
        aria-label="Real Ground Milestones"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.22em] uppercase text-[#C78A32] mb-2 px-3 py-1 rounded-full bg-[#FFFCF7] border border-[#C78A32]/30 shadow-2xs">
              REAL GRASSROOTS IMPACT
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#103D39] font-normal tracking-tight">
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
                    <h3 className="text-sm sm:text-[15px] font-semibold text-[#1F2421] mb-2 font-sans leading-snug">
                      {item.label}
                    </h3>
                  </div>

                  {/* Description & Visited Places */}
                  <div className="pt-3 border-t border-[#C78A32]/20 flex flex-col justify-between flex-1 mt-2">
                    <p className="text-xs text-[#242522]/80 leading-relaxed font-sans mb-3">
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
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#103D39] hover:text-[#C78A32] bg-[#FFFCF7] hover:bg-white border border-[#103D39]/20 hover:border-[#C78A32] px-6 py-3 rounded-full transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#103D39]"
            >
              <span>Read Simintini Shingade's founder journey below</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C78A32]" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
