import React, { useState } from 'react';
import { X, HeartHandshake, Briefcase, ShieldAlert, CheckCircle } from 'lucide-react';
import { db } from '../services/database';

export default function VolunteerCSRModal({ isOpen, onClose, defaultTab = 'volunteer', t }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isSuccess, setIsSuccess] = useState(false);

  // Volunteer form state
  const [volName, setVolName] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volCity, setVolCity] = useState('');
  const [volRole, setVolRole] = useState('Digital Literacy Trainer');
  const [volAvailability, setVolAvailability] = useState('Weekends (4-8 hrs)');

  // CSR form state
  const [csrCompany, setCsrCompany] = useState('');
  const [csrPerson, setCsrPerson] = useState('');
  const [csrEmail, setCsrEmail] = useState('');
  const [csrBudget, setCsrBudget] = useState('₹5L - ₹25L');

  // Distress form state
  const [distressName, setDistressName] = useState('');
  const [distressPhone, setDistressPhone] = useState('');
  const [distressLocation, setDistressLocation] = useState('');
  const [distressType, setDistressType] = useState('Domestic Violence Emergency');

  if (!isOpen) return null;

  const handleSubmitVolunteer = (e) => {
    e.preventDefault();
    db.addVolunteer({
      name: volName,
      email: volEmail,
      phone: volPhone,
      city: volCity,
      role: volRole,
      availability: volAvailability,
    });
    setIsSuccess(true);
  };

  const handleSubmitCSR = (e) => {
    e.preventDefault();
    db.addCSRInquiry({
      company: csrCompany,
      contactPerson: csrPerson,
      email: csrEmail,
      budgetRange: csrBudget,
    });
    setIsSuccess(true);
  };

  const handleSubmitDistress = (e) => {
    e.preventDefault();
    db.addDistressAlert({
      name: distressName || 'Confidential Distress',
      phone: distressPhone,
      location: distressLocation,
      type: distressType,
    });
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-charcoal/10 shadow-2xl relative my-8">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-silk-linen hover:bg-charcoal/10 text-charcoal flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-forest-light text-forest flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-charcoal">
              Submission Received Successfully
            </h3>
            <p className="text-sm text-charcoal/70 max-w-md mx-auto">
              {activeTab === 'distress'
                ? "Our emergency intervention counselors have been alerted. Expect an immediate, confidential callback."
                : "Thank you for joining hands with Astha for Women. Our coordinator will contact you shortly."}
            </p>
            <button
              onClick={() => { setIsSuccess(false); onClose(); }}
              className="px-6 py-2.5 rounded-xl bg-sindoor text-white text-xs font-bold"
            >
              Back to Website
            </button>
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="flex border-b border-charcoal/10 mb-6 gap-2">
              <button
                onClick={() => setActiveTab('volunteer')}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
                  activeTab === 'volunteer'
                    ? 'border-sindoor text-sindoor'
                    : 'border-transparent text-charcoal/60 hover:text-charcoal'
                }`}
              >
                <HeartHandshake className="w-4 h-4" />
                <span>{t.volunteerModal.tabs.volunteer}</span>
              </button>

              <button
                onClick={() => setActiveTab('csr')}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
                  activeTab === 'csr'
                    ? 'border-ochre-600 text-ochre-600'
                    : 'border-transparent text-charcoal/60 hover:text-charcoal'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>{t.volunteerModal.tabs.csr}</span>
              </button>

              <button
                onClick={() => setActiveTab('distress')}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all ${
                  activeTab === 'distress'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-charcoal/60 hover:text-charcoal'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>{t.volunteerModal.tabs.distress}</span>
              </button>
            </div>

            {/* Tab 1: Volunteer */}
            {activeTab === 'volunteer' && (
              <form onSubmit={handleSubmitVolunteer} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-charcoal/70 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={volName}
                      onChange={(e) => setVolName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-silk border border-charcoal/15 text-xs text-charcoal outline-none focus:border-sindoor"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal/70 block mb-1">City / State *</label>
                    <input
                      type="text"
                      required
                      value={volCity}
                      onChange={(e) => setVolCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-silk border border-charcoal/15 text-xs text-charcoal outline-none focus:border-sindoor"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-charcoal/70 block mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={volEmail}
                      onChange={(e) => setVolEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-silk border border-charcoal/15 text-xs text-charcoal outline-none focus:border-sindoor"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal/70 block mb-1">Mobile No *</label>
                    <input
                      type="tel"
                      required
                      value={volPhone}
                      onChange={(e) => setVolPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-silk border border-charcoal/15 text-xs text-charcoal outline-none focus:border-sindoor"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal/70 block mb-1">How would you like to contribute?</label>
                  <select
                    value={volRole}
                    onChange={(e) => setVolRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-silk border border-charcoal/15 text-xs text-charcoal outline-none focus:border-sindoor"
                  >
                    <option>Digital Literacy Trainer</option>
                    <option>Pro-Bono Legal Advocate / Lawyer</option>
                    <option>Doctor / Medical Health Camp Specialist</option>
                    <option>Graphic & Social Media Storyteller</option>
                    <option>Rural Field Coordinator</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-sindoor hover:bg-sindoor-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all mt-4"
                >
                  {t.volunteerModal.submitVolunteer}
                </button>
              </form>
            )}

            {/* Tab 2: Corporate CSR */}
            {activeTab === 'csr' && (
              <form onSubmit={handleSubmitCSR} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal/70 block mb-1">Company / Organization Name *</label>
                  <input
                    type="text"
                    required
                    value={csrCompany}
                    onChange={(e) => setCsrCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-silk border border-charcoal/15 text-xs text-charcoal outline-none focus:border-ochre-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-charcoal/70 block mb-1">Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={csrPerson}
                      onChange={(e) => setCsrPerson(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-silk border border-charcoal/15 text-xs text-charcoal outline-none focus:border-ochre-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal/70 block mb-1">Official Email *</label>
                    <input
                      type="email"
                      required
                      value={csrEmail}
                      onChange={(e) => setCsrEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-silk border border-charcoal/15 text-xs text-charcoal outline-none focus:border-ochre-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal/70 block mb-1">Estimated Annual CSR Budget</label>
                  <select
                    value={csrBudget}
                    onChange={(e) => setCsrBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-silk border border-charcoal/15 text-xs text-charcoal outline-none focus:border-ochre-600"
                  >
                    <option>₹5 Lakhs - ₹25 Lakhs</option>
                    <option>₹25 Lakhs - ₹1 Crore</option>
                    <option>₹1 Crore - ₹5 Crores</option>
                    <option>₹5 Crores+ (Multi-State Adoption)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-ochre-600 hover:bg-ochre-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all mt-4"
                >
                  {t.volunteerModal.submitCSR}
                </button>
              </form>
            )}

            {/* Tab 3: Emergency Distress Sahayata */}
            {activeTab === 'distress' && (
              <form onSubmit={handleSubmitDistress} className="space-y-4">
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 leading-relaxed font-medium">
                  {t.volunteerModal.distressNotice}
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal/70 block mb-1">Name / Alias (Optional)</label>
                  <input
                    type="text"
                    placeholder="Leave blank for 100% confidential assistance"
                    value={distressName}
                    onChange={(e) => setDistressName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-silk border border-charcoal/15 text-xs text-charcoal outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal/70 block mb-1">Phone / Safe Number to Call Back *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Where our female counselor can safely contact you"
                    value={distressPhone}
                    onChange={(e) => setDistressPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-silk border border-charcoal/15 text-xs text-charcoal outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal/70 block mb-1">Current City / Village / Landmark *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Near Shiv Mandir, Ward 4, Varanasi"
                    value={distressLocation}
                    onChange={(e) => setDistressLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-silk border border-charcoal/15 text-xs text-charcoal outline-none focus:border-red-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-lg transition-all mt-4 flex items-center justify-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>{t.volunteerModal.submitDistress}</span>
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
