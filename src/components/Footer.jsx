import React from 'react';
import { 
  Phone, Mail, MapPin, Heart, Shield, ArrowUpRight, Lock, 
  ExternalLink, Sparkles 
} from 'lucide-react';

export default function Footer({ t = {}, onRequestGuidance = () => {}, onOpenFounderPage = () => {}, onOpenDonationQr = () => {} }) {
  const handleQuickExit = () => {
    window.location.replace('https://www.google.com');
  };

  const nav = t.nav || {};
  const footer = t.footer || {};
  const p = t.purpose || {};

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/18sFVC5FJo/',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/asthaforwomen?igsh=MWhndzJ0bGkwbGZ0Zg==',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@simintini?si=HoSHd8q2C8CDGVLw',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/asthaforwomen-women-ba3b243a1?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    }
  ];

  return (
    <footer id="contact" className="bg-[#10332F] text-brand-ivory pt-16 pb-12 border-t border-brand-gold/25 relative overflow-hidden scroll-mt-20">
      
      {/* Decorative Subtle Arch Bridge in Footer */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-32 rounded-b-[100%] border-b border-brand-gold/15 pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            FINAL CLOSING MOMENT (Integrated Compassionate Call to Action)
           ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-16 pb-14 border-b border-white/10">
          <div className="w-12 h-12 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold flex items-center justify-center mx-auto mb-5">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-2xl sm:text-4xl font-serif font-normal text-white mb-4 leading-tight">
            "{p.closingHeadline || "You don't have to figure everything out today."}"
          </h3>
          <p className="text-sm sm:text-base text-brand-ivory/80 font-light leading-relaxed max-w-xl mx-auto mb-8 font-sans">
            {p.closingSub || "Taking the first step is enough. Our team is here with confidential, compassionate guidance whenever you are ready."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onRequestGuidance}
              className="px-8 py-3.5 rounded-full bg-brand-gold text-brand-charcoal hover:bg-white text-sm font-semibold tracking-wide shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              {footer.confidentialCta || "Request Confidential Guidance"}
            </button>
            <button
              type="button"
              onClick={handleQuickExit}
              className="px-6 py-3.5 rounded-full border border-white/25 text-brand-ivory hover:bg-white/10 text-xs sm:text-sm font-medium transition-all cursor-pointer"
            >
              {footer.safetyEscapeBtn || "Safety Quick Exit (Esc)"}
            </button>
          </div>
        </div>

        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Brand & Purpose (Col 5) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <img 
                src="/images/aastha-logo-transparent.png" 
                alt="Aastha for Women" 
                className="h-11 w-auto object-contain brightness-0 invert drop-shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/astha-logo.jpg';
                }}
              />
              <div>
                <span className="text-xl font-serif font-medium text-white tracking-wide block">
                  Aastha for Women
                </span>
                <span className="text-[11px] text-brand-gold font-sans tracking-widest uppercase block">
                  Dignity • Healing • Autonomy
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-brand-ivory/75 font-sans leading-relaxed max-w-md font-light">
              {footer.aboutSummary || 'A registered grassroots empowerment and crisis counseling initiative dedicated to upholding the dignity, emotional resilience, and financial independence of women.'}
            </p>

            <blockquote className="p-4 rounded-2xl bg-white/5 border-l-2 border-brand-gold text-xs sm:text-sm italic font-serif text-brand-ivory/90">
              "{footer.founderQuote || 'Every woman deserves a safe space to be heard, respected, and empowered to rebuild her life with confidence.'}"
              <span className="block not-italic font-sans text-[11px] text-brand-gold/80 mt-1.5">
                {footer.founderAttribution || "— Simintini Shingade, Founder & Counselor"}
              </span>
            </blockquote>

            {/* Official Social Media Channels */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-gold block mb-3">
                Follow Our Grassroots Journey
              </span>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Aastha for Women on ${s.name}`}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-gold hover:text-brand-charcoal text-white flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Navigation (Col 3) */}
          <div className="lg:col-span-3 space-y-3 font-sans">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold mb-4">
              {footer.quickLinks || 'Explore & Engage'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-brand-ivory/70 font-light">
              <li><a href="#hero" className="hover:text-brand-gold transition-colors">Home</a></li>
              <li><a href="#purpose" className="hover:text-brand-gold transition-colors">{nav.purpose || 'Our Purpose'}</a></li>
              <li><a href="#about" className="hover:text-brand-gold transition-colors">{nav.about || 'About'}</a></li>
              <li>
                <button
                  type="button"
                  onClick={onOpenFounderPage}
                  className="hover:text-brand-gold transition-colors text-left font-normal flex items-center gap-1 text-brand-gold/90 cursor-pointer"
                >
                  <span>Founder's Journey</span>
                  <span className="text-[10px] bg-brand-gold/20 text-brand-gold px-1.5 py-0.5 rounded-full">Explore</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDonationQr}
                  className="hover:text-brand-gold transition-colors text-left flex items-center gap-1.5 cursor-pointer font-light"
                >
                  <span>{nav.getInvolved || 'Support & Donate'}</span>
                  <span className="text-[10px] bg-brand-gold/20 text-brand-gold px-1.5 py-0.2 rounded-full font-bold">UPI QR</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact, Location & Safety (Col 4) */}
          <div className="lg:col-span-4 space-y-3 font-sans">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-gold mb-4">
              {footer.headquarters || "Official Contact & Helplines"}
            </h4>

            <div className="space-y-2.5 text-xs text-brand-ivory/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Pune & Satara Districts, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a 
                  href="mailto:asthaforwomen@gmail.com" 
                  className="hover:text-brand-gold underline decoration-brand-gold/50 transition-colors"
                >
                  asthaforwomen@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{footer.nationalHelpline || 'National Women Helpline: 181 (Toll Free)'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{footer.nationalEmergency || 'National Emergency Number: 112'}</span>
              </div>
            </div>

            <div className="pt-3 space-y-2">
              <button
                type="button"
                onClick={onRequestGuidance}
                className="w-full py-2.5 rounded-xl bg-brand-gold hover:bg-white text-brand-charcoal font-semibold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{footer.confidentialCta || "Request Confidential Guidance"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleQuickExit}
                className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 hover:text-white text-[11px] transition-colors border border-white/15 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{footer.safetyEscapeBtn || "Safety Quick Exit (Esc)"}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Emergency Notice & Confidentiality Reassurance */}
        <div className="pt-6 pb-4 text-center max-w-3xl mx-auto">
          <p className="text-[11px] text-brand-ivory/50 leading-relaxed font-sans font-light">
            {footer.emergencyNotice || 'If you or someone you know is in immediate physical danger, please contact local emergency authorities (112) or the Women Helpline (181). Our team provides confidential counseling and mediation assistance.'}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-brand-ivory/50 gap-3">
          <p>{footer.copyright || '© 2026 Aastha for Women. All rights reserved.'}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400/90">
              <Lock className="w-3 h-3" />
              <span>{footer.encryptedBadge || "Strictly Confidential & Private"}</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
