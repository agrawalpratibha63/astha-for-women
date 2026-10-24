import React, { useState } from 'react';
import { Quote, Sparkles, MapPin, ArrowRightLeft, ArrowRight } from 'lucide-react';

export default function StoriesOfChange({ t, onOpenDonate }) {
  const [activeStory, setActiveStory] = useState(0);
  const [showAfter, setShowAfter] = useState(true);

  const stories = [
    {
      name: "Kamla Devi",
      village: "Alwar Rural, Rajasthan",
      age: "36 Years Old",
      title: "From Debt Bondage to Organic Spice Entrepreneur",
      before: {
        status: "Daily Wage Laborer (₹80/day)",
        story: "Trapped in generational debt to village moneylenders at 60% annual interest. Could barely feed her 3 children two meals a day, facing constant threats.",
        income: "₹2,200 / month",
        dignity: "Dependent & vulnerable"
      },
      after: {
        status: "Cooperative President (Astha Masala Unit)",
        story: "Trained in hygienic food processing and packaging. Astha provided a micro-loan of ₹12,000 for seed grinding machinery. Today supplies 45 local retail shops.",
        income: "₹18,500 / month",
        dignity: "Elected Gram Panchayat Advisor, all 3 children in school"
      },
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Rekha Kumari",
      village: "Varanasi Peri-Urban, UP",
      age: "24 Years Old",
      title: "From Forced Early Marriage to Digital Finance Trainer",
      before: {
        status: "Confined to Household",
        story: "Pulled out of school at age 14. Forbidden from touching a smartphone or stepping out without male permission. Had zero financial awareness.",
        income: "₹0 / month",
        dignity: "Silent & isolated"
      },
      after: {
        status: "Digital Saksham Community Lead",
        story: "Graduated from Astha’s 6-month digital literacy boot camp. Now manages UPI onboarding, biometric ration cards, and insurance claims for 320 village families.",
        income: "₹14,200 / month",
        dignity: "Owns her smartphone, financially independent, pursuing BA"
      },
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const current = stories[activeStory] || stories[0];

  return (
    <section id="stories" className="py-24 bg-silk-warm border-y border-charcoal/10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ochre-100 text-xs font-bold text-ochre-700 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transformational Journeys</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-charcoal tracking-tight mb-4">
            The Journey from Silence to Self-Sufficiency
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70">
            Real women whose lives changed when faith met opportunity and sustained mentorship.
          </p>
        </div>

        {/* Story Card with Before & After Slider Toggle */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-charcoal/10 shadow-xl">
          {/* Top Story Selection Switcher */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-charcoal/10 mb-8">
            <div className="flex gap-2">
              {stories.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStory(idx)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeStory === idx
                      ? 'bg-sindoor text-white shadow-md'
                      : 'bg-silk-linen text-charcoal/70 hover:text-charcoal'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* Interactive Before / After Toggle Switch */}
            <div className="flex items-center gap-2 bg-silk-linen p-1 rounded-2xl border border-charcoal/10">
              <button
                onClick={() => setShowAfter(false)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  !showAfter
                    ? 'bg-charcoal text-white shadow-sm'
                    : 'text-charcoal/60 hover:text-charcoal'
                }`}
              >
                Before Astha
              </button>
              <button
                onClick={() => setShowAfter(true)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  showAfter
                    ? 'bg-sindoor text-white shadow-sm'
                    : 'text-charcoal/60 hover:text-charcoal'
                }`}
              >
                After Astha (Today)
              </button>
            </div>
          </div>

          {/* Story Body */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Beneficiary Photo */}
            <div className="md:col-span-4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white relative">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-ochre" />
                  <span>{current.village}</span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-ochre-700">
                  {current.age}
                </span>
                <h3 className="text-2xl font-serif font-bold text-charcoal">
                  {current.name}
                </h3>
                <p className="text-sm font-semibold text-sindoor">
                  {current.title}
                </p>
              </div>

              {/* Dynamic State Card (Before or After) */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  showAfter
                    ? 'bg-sindoor-50/60 border-sindoor-200'
                    : 'bg-charcoal/5 border-charcoal/15'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                      showAfter
                        ? 'bg-sindoor text-white'
                        : 'bg-charcoal text-white'
                    }`}
                  >
                    {showAfter ? "Transformed Reality (Present)" : "Starting Struggles (Past)"}
                  </span>
                  <span className="text-xs font-bold text-charcoal/70">
                    {showAfter ? current.after.status : current.before.status}
                  </span>
                </div>

                <p className="text-sm text-charcoal/80 leading-relaxed mb-4">
                  {showAfter ? current.after.story : current.before.story}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-charcoal/10 text-xs">
                  <div>
                    <span className="text-charcoal/50 block">Monthly Income</span>
                    <span className="font-bold text-sm text-charcoal">
                      {showAfter ? current.after.income : current.before.income}
                    </span>
                  </div>
                  <div>
                    <span className="text-charcoal/50 block">Social Agency</span>
                    <span className="font-bold text-sm text-charcoal">
                      {showAfter ? current.after.dignity : current.before.dignity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setShowAfter(!showAfter)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-ochre-700 hover:text-ochre-800 underline"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Toggle {showAfter ? 'Past Story' : 'Present Reality'}</span>
                </button>

                <button
                  onClick={onOpenDonate}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sindoor hover:bg-sindoor-600 text-white font-bold text-xs shadow-md transition-all"
                >
                  <span>Empower Another Woman</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
