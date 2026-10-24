import React from 'react';
import { Lock, HeartHandshake, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HowWeHelp({ t, onRequestGuidance }) {
  const h = t.howWeHelp;

  const stepIcons = [
    <Lock className="w-5 h-5 text-amber-700" />,
    <HeartHandshake className="w-5 h-5 text-red-700" />,
    <Sparkles className="w-5 h-5 text-emerald-700" />
  ];

  return (
    <section id="how-we-help" className="py-20 lg:py-28 bg-white border-t border-charcoal/10 relative">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-800 uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>{h.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-charcoal tracking-tight mb-4">
            {h.title}
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed font-sans">
            {h.subtitle}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-14">
          {h.steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#FAF7F0] border border-charcoal/10 hover:border-amber-600/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-serif font-bold text-amber-600/60 group-hover:text-amber-700 transition-colors">
                  {step.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-charcoal/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stepIcons[idx % stepIcons.length]}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-charcoal mb-3 group-hover:text-amber-800 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/75 font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-charcoal/10 flex items-center gap-1.5 text-xs font-medium text-amber-800">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                <span>Confidential & Free Service</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner & Direct CTA */}
        <div className="max-w-3xl mx-auto bg-[#FAF7F0] p-6 sm:p-8 rounded-3xl border border-charcoal/10 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-base font-serif font-bold text-charcoal mb-1">
              {t.quickEmergency.title}
            </h4>
            <p className="text-xs text-charcoal/70 font-sans">
              {t.quickEmergency.subtitle}
            </p>
          </div>
          <button
            onClick={onRequestGuidance}
            className="shrink-0 px-6 py-3 rounded-xl bg-[#141312] hover:bg-neutral-800 text-white font-medium text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <span>{t.hero.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
