import React, { useState, useEffect } from 'react';
import { X, Copy, Check, QrCode, Heart, ShieldCheck, Building2 } from 'lucide-react';

export default function DonationQrModal({ isOpen, onClose, t = {}, lang = 'en' }) {
  const [copied, setCopied] = useState(false);

  const currentLang = lang || (t?.nav?.purpose?.includes('उद्दिष्ट') ? 'mr' : t?.nav?.purpose?.includes('उद्देश्य') ? 'hi' : 'en');

  const upiId = 'bom260801351139@mahb';
  const sansthaName = 'AASTHA SAMAJIK SANSTHA';
  const bankName = 'Bank of Maharashtra';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      // Fallback
    }
  };

  const strings = {
    en: {
      badge: 'Official UPI Contribution',
      title: 'Scan & Support Aastha for Women',
      subtitle: '100% of your voluntary contribution directly funds women\'s crisis counseling, vocational skill toolkits, slum cloud kitchens, and adolescent education across Maharashtra.',
      sansthaLabel: 'Verified Beneficiary Account',
      upiLabel: 'Direct UPI ID',
      copyBtn: 'Copy UPI ID',
      copiedBtn: 'Copied!',
      appsTitle: 'Supported Payment Apps',
      appsList: 'Google Pay • PhonePe • Paytm • BHIM • Amazon Pay • Any UPI App',
      transparentBadge: 'Transparent Grassroots Impact',
      transparentDesc: 'Direct transfer to Bank of Maharashtra registered account. After making a contribution, you may share payment screenshot to asthaforwomen@gmail.com for receipt and acknowledgment.',
      closeBtn: 'Close'
    },
    hi: {
      badge: 'आधिकारिक यूपीआई सहयोग',
      title: 'स्कैन करें और आस्था का साथ दें',
      subtitle: 'आपका प्रत्येक स्वैच्छिक योगदान सीधे संकटग्रस्त महिलाओं की काउंसलिंग, सिलाई व क्लाउड किचन किट, और किशोरी शिक्षा कार्यक्रमों में उपयोग होता है।',
      sansthaLabel: 'सत्यापित पंजीकृत खाता',
      upiLabel: 'सीधा यूपीआई आईडी',
      copyBtn: 'UPI ID कॉपी करें',
      copiedBtn: 'कॉपी हो गया!',
      appsTitle: 'स्वीकार्य पेमेंट ऐप्स',
      appsList: 'Google Pay • PhonePe • Paytm • BHIM • Amazon Pay • अन्य UPI ऐप्स',
      transparentBadge: 'पारदर्शी ज़मीनी उपयोग',
      transparentDesc: 'बैंक ऑफ महाराष्ट्र के आधिकारिक पंजीकृत खाते में सीधा ट्रांसफर। सहयोग के बाद पावती (Receipt) हेतु asthaforwomen@gmail.com पर स्क्रीनशॉट भेज सकते हैं।',
      closeBtn: 'बंद करें'
    },
    mr: {
      badge: 'अधिकृत यूपीआय सहकार्य',
      title: 'स्कॅन करा आणि आस्थाला हातभार लावा',
      subtitle: 'आपले प्रत्येक सहकार्य थेट महिलांचे समुपदेशन, शिवणकाम व क्लाउड किचन साधने, आणि तरुणींच्या सक्षमीकरणासाठी वापरले जाते.',
      sansthaLabel: 'अधिकृत नोंदणीकृत खाते',
      upiLabel: 'थेट UPI आयडी',
      copyBtn: 'UPI ID कॉपी करा',
      copiedBtn: 'कॉपी झाले!',
      appsTitle: 'स्वीकार्य पेमेंट ॲप्स',
      appsList: 'Google Pay • PhonePe • Paytm • BHIM • Amazon Pay • सर्व UPI ॲप्स',
      transparentBadge: 'पारदर्शक सामाजिक कार्य',
      transparentDesc: 'बँक ऑफ महाराष्ट्र मधील अधिकृत खात्यात थेट वर्ग. देणगीनंतर पोचपावतीसाठी asthaforwomen@gmail.com वर स्क्रीनशॉट पाठवू शकता.',
      closeBtn: 'बंद करा'
    }
  };

  const s = strings[currentLang] || strings.en;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-qr-title"
    >
      <div 
        className="bg-[#FAF7F0] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-[#C9A45C]/40 relative my-6 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Strip */}
        <div className="bg-[#10332F] text-white p-5 sm:p-6 relative text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shadow-xs"
            aria-label={s.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A45C]/25 text-[#F7D070] text-[11px] font-semibold uppercase tracking-wider mb-2 border border-[#C9A45C]/40">
            <Heart className="w-3.5 h-3.5 fill-[#F7D070]" />
            <span>{s.badge}</span>
          </div>

          <h3 id="donation-qr-title" className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
            {s.title}
          </h3>

          <p className="text-xs text-white/80 font-light mt-1.5 max-w-md mx-auto leading-relaxed">
            {s.subtitle}
          </p>
        </div>

        {/* Modal Body: QR Code & Bank Details */}
        <div className="p-6 space-y-5">
          
          {/* Centered High-Res QR Code Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#C9A45C]/35 shadow-sm text-center flex flex-col items-center">
            
            <div className="relative max-w-[280px] w-full rounded-xl overflow-hidden border-2 border-[#10332F]/15 shadow-inner bg-white p-2">
              <img 
                src="/images/aastha-upi-qr.png" 
                alt="Bank of Maharashtra Aastha Samajik Sanstha UPI QR Code" 
                className="w-full h-auto object-contain mx-auto"
              />
            </div>

            {/* Quick UPI ID Copy Box */}
            <div className="mt-4 w-full bg-[#FAF7F0] rounded-xl p-3 border border-[#C9A45C]/30 flex items-center justify-between gap-2">
              <div className="text-left overflow-hidden">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#A46114] block">
                  {s.upiLabel}
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-[#10332F] truncate block select-all">
                  {upiId}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 shadow-2xs ${
                  copied 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-[#10332F] hover:bg-[#1B554C] text-white'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? s.copiedBtn : s.copyBtn}</span>
              </button>
            </div>

          </div>

          {/* Bank & Sanstha Verification Note */}
          <div className="bg-white/80 rounded-2xl p-4 border border-[#C9A45C]/25 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#10332F] font-bold">
              <Building2 className="w-4 h-4 text-[#A46114]" />
              <span>{sansthaName}</span>
            </div>
            <div className="text-[#333A36]/80 flex items-center justify-between text-[11px]">
              <span>Official Account: <strong>{bankName}</strong></span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Sanstha</span>
              </span>
            </div>
            <div className="pt-2 border-t border-[#C9A45C]/20 text-[11px] text-[#333A36]/70 leading-relaxed font-light">
              {s.transparentDesc}
            </div>
          </div>

          {/* Action Close */}
          <div className="pt-1 flex items-center justify-center">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-[#10332F] hover:bg-[#1B554C] text-white text-xs font-medium tracking-wide transition-all cursor-pointer shadow-xs"
            >
              <span>{s.closeBtn}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
