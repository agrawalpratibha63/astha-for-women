import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, ShieldCheck, CheckCircle2, Sparkles, Mail, Users, ArrowRight } from 'lucide-react';
import { db } from '../services/database';

export default function DonationCalculator({ t = {} }) {
  const [selectedAmount, setSelectedAmount] = useState(1200);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [involvementType, setInvolvementType] = useState('contribution'); // contribution, volunteer, csr

  // Generated receipt modal
  const [generatedPledge, setGeneratedPledge] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calc = t.calculator || {};

  const tiers = [
    { amount: 500, label: '₹500', impact: 'Enables 1 confidential counseling session & crisis mediation support for a woman in distress.' },
    { amount: 1200, label: '₹1,200', impact: 'Provides home-based vocational starter kit (tailoring or handicraft materials) for economic self-reliance.' },
    { amount: 2500, label: '₹2,500', impact: 'Funds a complete pre-marital youth awareness circle in a local community center or college.' },
    { amount: 5000, label: '₹5,000', impact: 'Sponsors month-long legal literacy, counseling follow-ups, and emergency shelter linkage assistance.' }
  ];

  const effectiveAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  const handleSelectTier = (amt) => {
    setIsCustom(false);
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    setIsCustom(true);
  };

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    if (!name || (!email && !phone)) {
      alert("Please provide your name and email or phone number.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const matchedTier = tiers.find(tier => tier.amount === effectiveAmount);
      const impactDesc = matchedTier 
        ? matchedTier.impact 
        : `Directly aids grassroots women's counseling, skill building, and crisis support in Maharashtra.`;

      const record = {
        id: `ASTHA-${Date.now().toString().slice(-6)}`,
        name,
        email,
        phone,
        type: involvementType,
        amount: involvementType === 'contribution' ? effectiveAmount : 0,
        tierImpact: impactDesc,
        date: new Date().toLocaleDateString('en-IN')
      };

      try {
        db.addDonation(record);
      } catch (err) {
        // fallback
      }

      setIsSubmitting(false);
      setGeneratedPledge(record);

      try {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10332F', '#C6A46A', '#DCE5DC', '#F2E6E0']
        });
      } catch {}
    }, 500);
  };

  return (
    <section 
      id="get-involved" 
      className="py-20 lg:py-28 bg-brand-ivory border-t border-brand-gold/20 relative scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-semibold text-brand-teal uppercase tracking-[0.2em] mb-4 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-brand-gold" />
            <span>PARTICIPATION & SUPPORT</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-brand-teal font-normal tracking-tight mb-4">
            {calc.title || 'Support Grassroots Women Empowerment'}
          </h2>
          <p className="text-sm sm:text-base text-brand-charcoal/75 leading-relaxed font-sans max-w-2xl mx-auto font-light">
            {calc.subtitle || 'Every contribution directly funds mental health counseling, crisis mediation, and vocational training for women across Maharashtra.'}
          </p>
        </div>

        {/* Layout: Left (Contribution / Program Impact) | Right (Intake Form) */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Tiers & Transparent Impact */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border border-brand-gold/30 shadow-sm space-y-6">
            
            {/* Mode selection tabs */}
            <div className="flex rounded-full bg-brand-ivory p-1 border border-brand-gold/20 text-xs font-medium">
              <button
                type="button"
                onClick={() => setInvolvementType('contribution')}
                className={`flex-1 py-2 rounded-full transition-all cursor-pointer ${
                  involvementType === 'contribution'
                    ? 'bg-brand-teal text-white shadow-xs font-semibold'
                    : 'text-brand-charcoal/70 hover:text-brand-teal'
                }`}
              >
                Community Contribution
              </button>
              <button
                type="button"
                onClick={() => setInvolvementType('volunteer')}
                className={`flex-1 py-2 rounded-full transition-all cursor-pointer ${
                  involvementType === 'volunteer'
                    ? 'bg-brand-teal text-white shadow-xs font-semibold'
                    : 'text-brand-charcoal/70 hover:text-brand-teal'
                }`}
              >
                Volunteer / Mentor
              </button>
            </div>

            {involvementType === 'contribution' ? (
              <>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70 block mb-3 font-sans">
                    Select Contribution Amount
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {tiers.map((tier) => {
                      const isSelected = !isCustom && selectedAmount === tier.amount;
                      return (
                        <button
                          key={tier.amount}
                          type="button"
                          onClick={() => handleSelectTier(tier.amount)}
                          className={`py-3 px-2 rounded-2xl font-serif text-base transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-brand-teal text-white border-brand-teal shadow-sm scale-102 font-medium'
                              : 'bg-brand-ivory text-brand-charcoal/80 border-brand-gold/25 hover:border-brand-gold'
                          }`}
                        >
                          {tier.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Amount Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Enter custom amount (₹)"
                    value={customAmount}
                    onChange={handleCustomChange}
                    className="w-full px-4 py-3 rounded-2xl bg-brand-ivory border border-brand-gold/25 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 text-sm font-sans text-brand-charcoal outline-none transition-all"
                  />
                </div>

                {/* Direct Impact Card */}
                <div className="p-5 rounded-2xl bg-brand-gold/10 border border-brand-gold/30">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-teal mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Your Contribution Directly Accomplishes:</span>
                  </div>
                  <p className="text-sm font-sans text-brand-charcoal/90 leading-relaxed font-light">
                    {isCustom
                      ? `Every ₹${effectiveAmount.toLocaleString('en-IN')} aids women in crisis counseling, pre-marital guidance, and vocational materials.`
                      : tiers.find(t => t.amount === selectedAmount)?.impact}
                  </p>
                </div>
              </>
            ) : (
              <div className="p-6 rounded-2xl bg-brand-teal/5 border border-brand-gold/20 space-y-3">
                <div className="flex items-center gap-2 text-sm font-serif font-medium text-brand-teal">
                  <Users className="w-4 h-4 text-brand-gold" />
                  <span>Join Our Volunteer Network</span>
                </div>
                <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-light">
                  We welcome counselors, legal advocates, educators, and vocational trainers who want to contribute their time and skills to women in vulnerable urban and rural communities.
                </p>
                <div className="pt-2 text-xs text-brand-gold font-medium">
                  Direct coordination: asthaforwomen@gmail.com
                </div>
              </div>
            )}

            {/* Transparent Resource Allocation */}
            <div className="pt-4 border-t border-brand-gold/15">
              <span className="text-[11px] font-semibold text-brand-charcoal/70 uppercase tracking-wider block mb-2 font-sans">
                Transparent Resource Allocation
              </span>
              <div className="w-full h-2 rounded-full overflow-hidden flex bg-brand-charcoal/10">
                <div style={{ width: '85%' }} className="bg-brand-teal" title="85% Direct Field Support" />
                <div style={{ width: '10%' }} className="bg-brand-gold" title="10% Vocational Materials" />
                <div style={{ width: '5%' }} className="bg-brand-charcoal/40" title="5% Operations & Communication" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-brand-charcoal/70 mt-2 font-light">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-brand-teal inline-block" />
                  85% Direct Field Support
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-brand-gold inline-block" />
                  10% Vocational Kits
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-brand-charcoal/40 inline-block" />
                  5% Operations
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Intake / Pledge Form */}
          <div className="lg:col-span-5 bg-white/90 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border border-brand-gold/30 shadow-sm">
            <h3 className="text-xl font-serif font-medium text-brand-teal mb-1">
              {involvementType === 'contribution' ? 'Pledge Your Support' : 'Volunteer Registration'}
            </h3>
            <p className="text-xs text-brand-charcoal/60 mb-6 font-light">
              {involvementType === 'contribution'
                ? `Pledging ₹${effectiveAmount.toLocaleString('en-IN')} for grassroots initiatives.`
                : 'Join our grassroots team in Pune and rural Maharashtra.'}
            </p>

            <form onSubmit={handlePledgeSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-brand-charcoal/80 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-ivory border border-brand-gold/25 focus:border-brand-teal text-xs sm:text-sm text-brand-charcoal outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-brand-charcoal/80 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="priya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-ivory border border-brand-gold/25 focus:border-brand-teal text-xs sm:text-sm text-brand-charcoal outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-brand-charcoal/80 block mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-ivory border border-brand-gold/25 focus:border-brand-teal text-xs sm:text-sm text-brand-charcoal outline-none transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-brand-teal hover:bg-brand-teal/90 text-white font-medium text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-brand-gold" />
                  <span>
                    {isSubmitting
                      ? "Processing..."
                      : involvementType === 'contribution'
                      ? `Confirm Pledge of ₹${effectiveAmount.toLocaleString('en-IN')}`
                      : "Submit Volunteer Expression"}
                  </span>
                </button>
              </div>

              <p className="text-[11px] text-center text-brand-charcoal/50 leading-tight pt-1">
                Aastha for Women ensures all community pledges are acknowledged directly via email.
              </p>
            </form>
          </div>

        </div>

        {/* Confirmation Modal */}
        {generatedPledge && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-brand-ivory rounded-3xl max-w-md w-full p-6 sm:p-8 border border-brand-gold/30 shadow-2xl relative">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-brand-teal">
                  Thank You, {generatedPledge.name}
                </h4>
                <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-light">
                  {generatedPledge.type === 'contribution'
                    ? `Your pledge of ₹${generatedPledge.amount.toLocaleString('en-IN')} has been recorded (Ref: ${generatedPledge.id}). Our team will connect with you at ${generatedPledge.email} with direct payment details.`
                    : `We are grateful for your desire to volunteer! Our coordinator will contact you at ${generatedPledge.email}.`}
                </p>
                <div className="pt-4 border-t border-brand-gold/20">
                  <button
                    type="button"
                    onClick={() => setGeneratedPledge(null)}
                    className="w-full py-2.5 rounded-full bg-brand-teal text-white text-xs font-medium cursor-pointer"
                  >
                    Close & Return
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
