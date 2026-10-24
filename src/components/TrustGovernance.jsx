import React from 'react';
import { ShieldCheck, FileCheck, Award, Download, CheckCircle2 } from 'lucide-react';

export default function TrustGovernance({ t }) {
  const credentials = [
    {
      title: "NITI Aayog Darpan UID",
      number: "DL/2022/0319482",
      desc: "Registered on Govt of India Portal for transparent NGO governance & national development partnerships.",
      badge: "Govt of India Verified"
    },
    {
      title: "Section 80G Tax Exemption",
      number: "CIT(E)/80G/2022-23/A/10294",
      desc: "Donations are 50% tax-exempt for Indian citizens under Income Tax Act, 1961 with digital Form 10BE filing.",
      badge: "Tax Exempt"
    },
    {
      title: "Section 12A Non-Profit Registration",
      number: "AABTA9182DE20214",
      desc: "Granted by the Directorate of Income Tax (Exemption) confirming 100% non-profit philanthropic status.",
      badge: "Non-Profit Certified"
    },
    {
      title: "CSR Schedule VII Eligible",
      number: "MCA CSR-1 Reg. #0049281",
      desc: "Fully compliant for Corporate Social Responsibility funding under Section 135 of Companies Act, 2013.",
      badge: "CSR Approved"
    }
  ];

  return (
    <section id="transparency" className="py-20 bg-silk border-t border-charcoal/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-light border border-forest/20 text-xs font-bold text-forest uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.trust.badge}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal tracking-tight mb-3">
            {t.trust.title}
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70">
            {t.trust.subtitle}
          </p>
        </div>

        {/* 4 Compliance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {credentials.map((c, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-charcoal/10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-silk-linen text-charcoal/70 px-2.5 py-1 rounded-full inline-block mb-4">
                  {c.badge}
                </span>
                <h3 className="text-base font-bold text-charcoal mb-1">
                  {c.title}
                </h3>
                <p className="font-mono text-xs font-bold text-sindoor mb-3 bg-sindoor-50 p-1.5 rounded-lg inline-block">
                  {c.number}
                </p>
                <p className="text-xs text-charcoal/65 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-charcoal/10 mt-4 flex items-center gap-1 text-[11px] font-bold text-forest">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Active & Audited (2026)</span>
              </div>
            </div>
          ))}
        </div>

        {/* Annual Audited Report Download CTA Banner */}
        <div className="bg-gradient-to-r from-charcoal via-charcoal-light to-charcoal text-white rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-ochre shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-white mb-0.5">
                Audited Financial Reports & Statutory Disclosures
              </h4>
              <p className="text-xs text-silk-linen/70">
                Full transparency with independent Chartered Accountant certification & foreign contribution accounts.
              </p>
            </div>
          </div>

          <button
            onClick={() => alert("Downloading Audited FY 2024-25 Balance Sheet & CA Report (PDF)...")}
            className="px-6 py-3 rounded-xl bg-ochre hover:bg-ochre-600 text-charcoal font-bold text-xs shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Annual Report</span>
          </button>
        </div>
      </div>
    </section>
  );
}
