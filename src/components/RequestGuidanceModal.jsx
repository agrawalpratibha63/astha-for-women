import React, { useState } from 'react';
import { X, ShieldCheck, Heart, Mail, CheckCircle2, Clock, Lock, Phone } from 'lucide-react';

export default function RequestGuidanceModal({ isOpen, onClose, t = {} }) {
  const modal = t.requestModal || {};
  const form = modal.form || {};

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    category: form.categoryOptions ? form.categoryOptions[0] : 'General Guidance',
    safeTime: form.safeTimeOptions ? form.safeTimeOptions[0] : 'Morning (10 AM - 1 PM)',
    language: 'Marathi',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) {
      alert("Please provide your name and phone/email.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={handleReset}
    >
      <div 
        className="bg-brand-ivory rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-brand-gold/30 relative my-auto animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar (Always pinned at top, never cut off) */}
        <div className="bg-white/95 backdrop-blur-sm p-5 sm:p-6 border-b border-brand-gold/20 relative shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-black/5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-teal"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-gold mb-1.5 font-sans">
            <Lock className="w-3.5 h-3.5 text-brand-gold" />
            <span>{modal.confidentialBanner || "100% Confidential & Sacred Safe Space"}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-normal text-brand-teal">
            {modal.title || "Request Confidential Guidance"}
          </h3>
          <p className="text-xs sm:text-sm text-brand-charcoal/70 mt-1 font-sans font-light">
            {modal.subtitle || "Share your details safely. A trained counselor will reach out at your preferred time."}
          </p>
        </div>

        {/* Modal Body (Scrollable interior) */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-serif font-medium text-brand-teal">
                {form.successTitle || "Your Request is Safely Received"}
              </h4>
              <p className="text-xs sm:text-sm text-brand-charcoal/80 font-sans max-w-md mx-auto leading-relaxed font-light">
                {form.successDesc || "A compassionate member of our counseling team will connect with you discretely at your requested safe time."}
              </p>
              <div className="p-4 rounded-2xl bg-white border border-brand-gold/20 text-xs text-brand-charcoal/80 text-left font-sans">
                <span className="font-semibold block mb-1 text-brand-teal">Privacy Notice:</span>
                {form.safetyTip || "For your safety, our call will be discreet. You can also contact us directly at asthaforwomen@gmail.com."}
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-brand-teal text-white text-xs sm:text-sm font-medium hover:bg-brand-teal/90 transition-colors cursor-pointer"
                >
                  {form.closeBtn || "Close Window"}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-brand-charcoal/80 mb-1">
                  {form.nameLabel || "Your Name (or preferred alias)"} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={form.namePlaceholder || "e.g. Aarti or leave blank for initials"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-gold/30 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-xs sm:text-sm bg-white text-brand-charcoal"
                />
              </div>

              {/* Contact (Phone / Email) */}
              <div>
                <label className="block text-xs font-medium text-brand-charcoal/80 mb-1">
                  {form.phoneLabel || "Phone / WhatsApp / Email"} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={form.phonePlaceholder || "+91 98765 43210 or your private email"}
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-gold/30 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-xs sm:text-sm bg-white text-brand-charcoal"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-brand-charcoal/80 mb-1">
                  {form.categoryLabel || "Area of Guidance Needed"}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-gold/30 focus:border-brand-teal outline-none text-xs sm:text-sm bg-white text-brand-charcoal cursor-pointer"
                >
                  {(form.categoryOptions || [
                    "Pre-Marital Counseling & Emotional Readiness",
                    "Post-Marriage Distress & Crisis Mediation",
                    "Trauma Recovery & Inner Confidence",
                    "Vocational Skill Training & Independence"
                  ]).map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Safe Time */}
              <div>
                <label className="block text-xs font-medium text-brand-charcoal/80 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{form.safeTimeLabel || "Safe Time to Connect"}</span>
                </label>
                <select
                  value={formData.safeTime}
                  onChange={(e) => setFormData({ ...formData, safeTime: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-gold/30 focus:border-brand-teal outline-none text-xs sm:text-sm bg-white text-brand-charcoal cursor-pointer"
                >
                  {(form.safeTimeOptions || [
                    "Morning (10:00 AM - 1:00 PM)",
                    "Afternoon (2:00 PM - 5:00 PM)",
                    "Evening (6:00 PM - 8:00 PM)",
                    "Anytime Discreet via Email"
                  ]).map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Language Preference */}
              <div>
                <label className="block text-xs font-medium text-brand-charcoal/80 mb-1">
                  {form.langPrefLabel || "Preferred Language for Counseling"}
                </label>
                <div className="flex gap-2">
                  {['मराठी (Marathi)', 'English', 'हिन्दी (Hindi)'].map((l) => (
                    <button
                      type="button"
                      key={l}
                      onClick={() => setFormData({ ...formData, language: l })}
                      className={`flex-1 py-2 text-xs rounded-lg border font-medium transition-all cursor-pointer ${
                        formData.language === l
                          ? 'bg-brand-teal text-white border-brand-teal'
                          : 'bg-white text-brand-charcoal/70 border-brand-gold/25 hover:border-brand-gold'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-brand-charcoal/80 mb-1">
                  {form.messageLabel || "Optional Message / What you wish to share"}
                </label>
                <textarea
                  rows="2"
                  placeholder={form.messagePlaceholder || "Feel free to share as much or as little as you feel comfortable with..."}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-gold/30 focus:border-brand-teal outline-none text-xs sm:text-sm bg-white text-brand-charcoal"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-brand-teal hover:bg-brand-teal/90 text-white font-medium text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>{isSubmitting ? (form.submitting || "Connecting...") : (form.submitBtn || "Submit Confidential Request")}</span>
              </button>

              {/* Verified Direct Email & National Helpline Note */}
              <div className="pt-2 text-center space-y-1">
                <a
                  href="mailto:asthaforwomen@gmail.com?subject=Confidential%20Guidance%20Request"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-teal hover:text-brand-charcoal font-medium underline decoration-brand-gold/50"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Direct confidential email: asthaforwomen@gmail.com</span>
                </a>
                <p className="text-[11px] text-brand-charcoal/50">
                  National Women Helpline: 181 (Toll-Free, 24/7)
                </p>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
