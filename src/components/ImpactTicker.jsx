import React from 'react';
import { TrendingUp, Users, HeartPulse, Scale } from 'lucide-react';

export default function ImpactTicker({ t }) {
  const icons = [
    <TrendingUp className="w-6 h-6 text-sindoor" />,
    <Users className="w-6 h-6 text-ochre-600" />,
    <HeartPulse className="w-6 h-6 text-forest" />,
    <Scale className="w-6 h-6 text-sindoor-700" />,
  ];

  const stats = [
    {
      num: t.stats.stat1Number,
      label: t.stats.stat1Label,
      desc: t.stats.stat1Desc,
      icon: icons[0],
      bg: 'bg-sindoor-50/50',
      border: 'border-sindoor-100',
    },
    {
      num: t.stats.stat2Number,
      label: t.stats.stat2Label,
      desc: t.stats.stat2Desc,
      icon: icons[1],
      bg: 'bg-ochre-50/60',
      border: 'border-ochre-100',
    },
    {
      num: t.stats.stat3Number,
      label: t.stats.stat3Label,
      desc: t.stats.stat3Desc,
      icon: icons[2],
      bg: 'bg-forest-light/60',
      border: 'border-forest/20',
    },
    {
      num: t.stats.stat4Number,
      label: t.stats.stat4Label,
      desc: t.stats.stat4Desc,
      icon: icons[3],
      bg: 'bg-red-50/50',
      border: 'border-red-100',
    },
  ];

  return (
    <section className="py-16 bg-silk relative z-20 border-y border-charcoal/10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-charcoal tracking-tight mb-3">
            {t.stats.title}
          </h2>
          <p className="text-sm sm:text-base text-charcoal/65">
            {t.stats.subtitle}
          </p>
        </div>

        {/* 4 Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl ${item.bg} border ${item.border} backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group flex flex-col justify-between`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-serif font-extrabold text-charcoal mb-2 tracking-tight">
                  {item.num}
                </div>
                <h3 className="text-base font-bold text-charcoal/90 mb-2">
                  {item.label}
                </h3>
              </div>
              <p className="text-xs text-charcoal/65 leading-relaxed pt-3 border-t border-charcoal/10">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
