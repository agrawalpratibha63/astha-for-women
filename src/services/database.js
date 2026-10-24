// Persistent database service for Astha for Women using LocalStorage & Event Dispatcher

const STORAGE_KEYS = {
  DONATIONS: 'astha_donations_v1',
  VOLUNTEERS: 'astha_volunteers_v1',
  DISTRESS: 'astha_distress_v1',
  CSR: 'astha_csr_v1'
};

const initialDonations = [
  {
    id: 'ASTHA-80G-2026-8941',
    name: 'Rohit K. Sharma',
    amount: 5000,
    pan: 'ABCPS1289K',
    date: '2026-09-15',
    email: 'rohit.sharma@example.com',
    tierImpact: 'Full micro-enterprise startup kit (Sewing Machine + Fabrics)',
    taxDeductionSaved: 2500
  },
  {
    id: 'ASTHA-80G-2026-8942',
    name: 'Dr. Ananya Mukherjee',
    amount: 1500,
    pan: 'BNYPM4921D',
    date: '2026-09-16',
    email: 'ananya.m@example.org',
    tierImpact: '3-month certified vocational tailoring diploma for 1 mother',
    taxDeductionSaved: 750
  },
  {
    id: 'ASTHA-80G-2026-8943',
    name: 'Kavita Deshmukh',
    amount: 3500,
    pan: 'AYTPD8832L',
    date: '2026-09-17',
    email: 'kavitad@example.com',
    tierImpact: 'Heavy-duty sewing machine + tool set',
    taxDeductionSaved: 1750
  }
];

const initialVolunteers = [
  {
    id: 'VOL-101',
    name: 'Sneha Verma',
    role: 'Digital Literacy Trainer',
    city: 'Pune, Maharashtra',
    availability: 'Weekends (8 hrs/week)',
    phone: '+91 98230 45612',
    status: 'Verified & Assigned'
  },
  {
    id: 'VOL-102',
    name: 'Advocate Rajesh Nair',
    role: 'Pro-Bono Legal Advisor',
    city: 'New Delhi',
    availability: 'On-Call Crisis Support',
    phone: '+91 98112 34908',
    status: 'Active Counsel'
  }
];

const initialDistress = [
  {
    id: 'DIST-901',
    name: 'Confidential Caller',
    location: 'Varanasi Rural',
    type: 'Domestic Violence Intervention',
    time: '2 hours ago',
    urgency: 'HIGH',
    status: 'Field Team Dispatched'
  }
];

class DatabaseService {
  constructor() {
    this.listeners = new Set();
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
      localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(initialDonations));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VOLUNTEERS)) {
      localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(initialVolunteers));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DISTRESS)) {
      localStorage.setItem(STORAGE_KEYS.DISTRESS, JSON.stringify(initialDistress));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CSR)) {
      localStorage.setItem(STORAGE_KEYS.CSR, JSON.stringify([]));
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn());
  }

  // Donations
  getDonations() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS) || '[]');
    } catch {
      return initialDonations;
    }
  }

  addDonation(data) {
    const list = this.getDonations();
    const receiptId = `ASTHA-80G-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord = {
      id: receiptId,
      name: data.name || 'Kind Supporter',
      amount: Number(data.amount) || 1500,
      pan: data.pan ? data.pan.toUpperCase() : 'NOT PROVIDED',
      email: data.email || 'donor@astha.org',
      phone: data.phone || '',
      date: new Date().toISOString().split('T')[0],
      tierImpact: data.tierImpact || 'Grassroots Women Welfare Program',
      taxDeductionSaved: Math.round((Number(data.amount) || 1500) * 0.5)
    };
    list.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(list));
    this.notify();
    return newRecord;
  }

  // Volunteers
  getVolunteers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.VOLUNTEERS) || '[]');
    } catch {
      return initialVolunteers;
    }
  }

  addVolunteer(data) {
    const list = this.getVolunteers();
    const newRecord = {
      id: `VOL-${Math.floor(100 + Math.random() * 900)}`,
      name: data.name,
      role: data.role || 'Community Mentor',
      city: data.city || 'India',
      availability: data.availability || 'Flexible',
      phone: data.phone || '',
      email: data.email || '',
      status: 'Under Review'
    };
    list.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(list));
    this.notify();
    return newRecord;
  }

  // Distress Alerts
  getDistressAlerts() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.DISTRESS) || '[]');
    } catch {
      return initialDistress;
    }
  }

  addDistressAlert(data) {
    const list = this.getDistressAlerts();
    const newRecord = {
      id: `DIST-${Math.floor(100 + Math.random() * 900)}`,
      name: data.name || 'Confidential Distress Call',
      location: data.location || 'Location shared via GPS/Form',
      type: data.type || 'Crisis Counseling & Safe Shelter',
      time: 'Just now',
      urgency: 'CRITICAL',
      status: 'Counselor Alerted'
    };
    list.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.DISTRESS, JSON.stringify(list));
    this.notify();
    return newRecord;
  }

  // CSR
  getCSRInquiries() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CSR) || '[]');
    } catch {
      return [];
    }
  }

  addCSRInquiry(data) {
    const list = this.getCSRInquiries();
    const newRecord = {
      id: `CSR-${Math.floor(100 + Math.random() * 900)}`,
      company: data.company,
      contactPerson: data.contactPerson,
      budgetRange: data.budgetRange,
      date: new Date().toISOString().split('T')[0]
    };
    list.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.CSR, JSON.stringify(list));
    this.notify();
    return newRecord;
  }
}

export const db = new DatabaseService();
