import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, Sparkles, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function PillarsOfImpact({ t = {}, onRequestGuidance = () => {} }) {
  const [activeTab, setActiveTab] = useState('pre-marital');
  const pillars = t.pillars || {};

  const icons = {
    'pre-marital': <HeartHandshake className="w-5 h-5" />,
    'crisis-counseling': <ShieldCheck className="w-5 h-5" />,
    'confidence-building': <Sparkles className="w-5 h-5" />,
    'business-skills': <Briefcase className="w-5 h-5" />,
  };

  const pillarDetails = {
    'pre-marital': {
      bullet1: "Mental preparation & emotional resilience before entering married life",
      bullet2: "Healthy communication strategies and mutual respect workshops",
      bullet3: "Understanding self-worth, legal rights, and financial awareness",
      photo: "/images/pre-marriage-counselling.jpg"
    },
    'crisis-counseling': {
      bullet1: "Immediate, compassionate mediation for women facing marital distress",
      bullet2: "Proactive psychological support aimed at preventing extreme steps & suicide",
      bullet3: "Safe shelter linkages and legal awareness for domestic pressure",
      photo: "/images/community-circle-meeting.jpg"
    },
    'confidence-building': {
      bullet1: "Interactive group discussions in college and community clusters",
      bullet2: "Public speaking, self-assertion, and overcoming societal stigma",
      bullet3: "Mentorship by senior grassroots leaders and counselors",
      photo: "/images/nss-awareness-college.jpg"
    },
    'business-skills': {
      bullet1: "Hands-on vocational training: Machine tailoring, food crafts, handiwork",
      bullet2: "Guidance on launching low-capital home-based businesses",
      bullet3: "Connecting women micro-entrepreneurs to local markets and buyers",
      photo: "/images/kadepur-womens-day.jpg"
    }
  };

  const items = pillars.items || [];
  const currentItem = items.find((item) => item.id === activeTab) || items[0] || {};
  const currentDetail = pillarDetails[activeTab] || pillarDetails['pre-marital'];

  return (
    <section 
      id="work" 
      className="py-20 lg:py-28 bg-brand-ivory border-t border-brand-gold/20 relative scroll-mt-20 overflow-hidden"
    >
      <div id="how-we-help" className="scroll-mt-28" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-semibold text-brand-teal uppercase tracking-[0.2em] mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
            <span>{pillars.badge || 'HOW WE HELP'}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-brand-teal font-normal tracking-tight mb-4">
            {pillars.title || 'Our Verified Core Programs'}
          </h2>
          <p className="text-sm sm:text-base text-brand-charcoal/75 leading-relaxed font-sans max-w-2xl mx-auto">
            {pillars.subtitle || 'Every service is free, strictly confidential, and grounded in empowering women to achieve sustainable dignity.'}
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-3 pb-3 mb-10 no-scrollbar">
          {items.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-brand-teal text-white border-brand-teal shadow-md'
                    : 'bg-white text-brand-charcoal/70 border-brand-gold/25 hover:border-brand-gold hover:text-brand-teal'
                }`}
              >
                <span className={isActive ? 'text-brand-gold' : 'text-brand-charcoal/50'}>
                  {icons[item.id]}
                </span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Showcase Card */}
        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 shadow-sm border border-brand-gold/25 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Content */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-serif font-light text-brand-gold">
                  {currentItem.number}
                </span>
                <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-brand-teal bg-brand-gold/15 px-3 py-1 rounded-full border border-brand-gold/20">
                  {currentItem.tagline}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-brand-teal tracking-tight mb-3">
                {currentItem.name}
              </h3>

              <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed mb-6 font-sans font-light">
                {currentItem.desc}
              </p>

              {/* Action bullets */}
              <div className="space-y-2.5 mb-8 pt-4 border-t border-brand-gold/15">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-charcoal/85">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{currentItem.bullet1 || currentDetail.bullet1}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-charcoal/85">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{currentItem.bullet2 || currentDetail.bullet2}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-charcoal/85">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{currentItem.bullet3 || currentDetail.bullet3}</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div>
              <button
                type="button"
                onClick={onRequestGuidance}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-teal hover:bg-brand-teal/90 text-white font-medium text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{currentItem.action || "Request Consultation"}</span>
                <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Real Photograph from Field */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] border border-brand-gold/30 group bg-brand-charcoal/5">
              <img 
                src={currentDetail.photo} 
                alt={currentItem.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/founder-simintini.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-[11px] text-white font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                  Grassroots Intervention • Aastha Pune
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
