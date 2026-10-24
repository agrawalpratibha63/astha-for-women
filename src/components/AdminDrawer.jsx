import React, { useState, useEffect } from 'react';
import { X, Database, Heart, Users, AlertTriangle, RefreshCw, CheckCircle, Shield } from 'lucide-react';
import { db } from '../services/database';

export default function AdminDrawer({ isOpen, onClose, t }) {
  const [donations, setDonations] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [distress, setDistress] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState('donations');

  const loadData = () => {
    setDonations(db.getDonations());
    setVolunteers(db.getVolunteers());
    setDistress(db.getDistressAlerts());
  };

  useEffect(() => {
    loadData();
    const unsubscribe = db.subscribe(loadData);
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const totalPledged = donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col overflow-hidden animate-slide-left">
        {/* Header */}
        <div className="p-6 bg-charcoal text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-ochre text-charcoal flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg">{t.admin.title}</h3>
              <p className="text-xs text-white/60">{t.admin.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Metrics Summary Pill Bar */}
        <div className="grid grid-cols-3 divide-x divide-charcoal/10 bg-silk-linen p-4 border-b border-charcoal/10 text-center">
          <div>
            <span className="text-[11px] text-charcoal/60 uppercase font-semibold block">{t.admin.totalPledged}</span>
            <span className="text-lg font-serif font-bold text-forest">₹{totalPledged.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-[11px] text-charcoal/60 uppercase font-semibold block">{t.admin.activeCases}</span>
            <span className="text-lg font-serif font-bold text-sindoor">{distress.length} Active</span>
          </div>
          <div>
            <span className="text-[11px] text-charcoal/60 uppercase font-semibold block">{t.admin.volunteersCount}</span>
            <span className="text-lg font-serif font-bold text-ochre-700">{volunteers.length} Joined</span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-charcoal/10 px-6 pt-3 gap-3 bg-silk">
          <button
            onClick={() => setActiveSubTab('donations')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeSubTab === 'donations'
                ? 'border-sindoor text-sindoor'
                : 'border-transparent text-charcoal/60 hover:text-charcoal'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>{t.admin.donationsTab} ({donations.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('volunteers')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeSubTab === 'volunteers'
                ? 'border-ochre-600 text-ochre-600'
                : 'border-transparent text-charcoal/60 hover:text-charcoal'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t.admin.volunteersTab} ({volunteers.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('distress')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeSubTab === 'distress'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-charcoal/60 hover:text-charcoal'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{t.admin.distressTab} ({distress.length})</span>
          </button>
        </div>

        {/* Tab Content List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-silk-warm/50">
          {/* Donations Tab */}
          {activeSubTab === 'donations' && (
            donations.length === 0 ? (
              <p className="text-center text-xs text-charcoal/50 py-12">{t.admin.empty}</p>
            ) : (
              donations.map((d) => (
                <div key={d.id} className="bg-white p-4 rounded-2xl border border-charcoal/10 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-sindoor bg-sindoor-50 px-2.5 py-0.5 rounded-md border border-sindoor-200">
                      {d.id}
                    </span>
                    <span className="text-xs text-charcoal/40">{d.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-charcoal">{d.name}</h4>
                      <p className="text-[11px] text-charcoal/60">PAN: {d.pan} • {d.email}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-serif font-bold text-base text-forest">₹{d.amount.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-sindoor block font-semibold">Saved ₹{d.taxDeductionSaved} in tax</span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal/70 bg-silk p-2 rounded-lg font-medium border border-charcoal/5">
                    {d.tierImpact}
                  </p>
                </div>
              ))
            )
          )}

          {/* Volunteers Tab */}
          {activeSubTab === 'volunteers' && (
            volunteers.length === 0 ? (
              <p className="text-center text-xs text-charcoal/50 py-12">{t.admin.empty}</p>
            ) : (
              volunteers.map((v) => (
                <div key={v.id} className="bg-white p-4 rounded-2xl border border-charcoal/10 shadow-sm space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-charcoal">{v.name}</h4>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-ochre-100 text-ochre-800">
                      {v.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-sindoor">{v.role}</p>
                  <div className="flex items-center justify-between text-xs text-charcoal/60 pt-1">
                    <span>📍 {v.city}</span>
                    <span>⏱ {v.availability}</span>
                    <span>📞 {v.phone}</span>
                  </div>
                </div>
              ))
            )
          )}

          {/* Distress Alerts Tab */}
          {activeSubTab === 'distress' && (
            distress.length === 0 ? (
              <p className="text-center text-xs text-charcoal/50 py-12">{t.admin.empty}</p>
            ) : (
              distress.map((item) => (
                <div key={item.id} className="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                      ⚠️ {item.urgency} PRIORITY
                    </span>
                    <span className="text-xs text-red-600/70">{item.time}</span>
                  </div>
                  <h4 className="text-sm font-bold text-red-900">{item.name}</h4>
                  <p className="text-xs text-red-800 font-medium">📍 Location: {item.location}</p>
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-red-700 font-semibold">{item.type}</span>
                    <span className="px-2 py-0.5 bg-red-600 text-white rounded font-bold text-[10px]">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
}
