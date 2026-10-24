import React, { useState } from 'react';
import { 
  Target, CheckCircle2, Building2, Compass, 
  Sparkles, ShieldCheck, ArrowRight, ArrowLeft, 
  ChevronRight, ChevronDown, ChevronUp, Users, MapPin, 
  TrendingUp, Award, ExternalLink
} from 'lucide-react';

export default function CommunityFuturePlan({ t = {}, lang = 'en', onRequestGuidance = () => {} }) {
  const currentLang = lang || (t?.nav?.purpose?.includes('उद्दिष्ट') ? 'mr' : t?.nav?.purpose?.includes('उद्देश्य') ? 'hi' : 'en');

  // Currently selected active roadmap phase (0, 1, 2, 3)
  const [activePhase, setActivePhase] = useState(0);
  
  // Progressive disclosure: Deliverables accordion open state
  const [showDeliverables, setShowDeliverables] = useState(false);

  // Content Strings
  const strings = {
    en: {
      badge: 'ROADMAP 2026–2027',
      title: 'The Future We’re Building',
      subtitle: 'From college campuses to grassroots slum clusters, our roadmap expands emotional resilience, micro-enterprise, and 24x7 crisis support across Maharashtra.',
      activeStatus: 'Active Initiative',
      scalingStatus: 'Scaling 2026',
      horizonStatus: 'Strategic Horizon 2027',
      deliverablesPrompt: 'View Ground Action Deliverables',
      hideDeliverablesPrompt: 'Hide Deliverables',
      partnerBtn: 'Partner on this Initiative',
      nextPhaseBtn: 'Next Phase',
      prevPhaseBtn: 'Previous',
      allPhasesTitle: 'All 4 Phases at a Glance',
      collaborateBadge: 'COLLABORATE WITH AASTHA',
      collaborateTitle: 'Building this future together',
      collaborateDesc: 'Educational institutions, CSR foundations, and grassroots partners are invited to collaborate on our upcoming community chapters.',
      collaborateCta: 'Explore Institutional Partnership'
    },
    hi: {
      badge: 'रोडमैप २०२६–२०२७',
      title: 'सामुदायिक भावी संकल्प',
      subtitle: 'कॉलेजों से लेकर बस्तियों तक, हमारा रोडमैप महाराष्ट्र भर में भावनात्मक मजबूती, महिला गृहउद्योग और २४x७ संकट सहायता का विस्तार कर रहा है।',
      activeStatus: 'सक्रिय पहल २०२६',
      scalingStatus: 'विस्तार २०२६',
      horizonStatus: 'रणनीतिक संकल्प २०२७',
      deliverablesPrompt: 'ज़मीनी कार्य योजना देखें',
      hideDeliverablesPrompt: 'कार्य योजना छुपाएं',
      partnerBtn: 'इस पहल में भागीदार बनें',
      nextPhaseBtn: 'अगला चरण',
      prevPhaseBtn: 'पिछला चरण',
      allPhasesTitle: 'सभी ४ चरण एक नज़र में',
      collaborateBadge: 'आस्था के साथ जुड़ें',
      collaborateTitle: 'इस भविष्य का निर्माण साथ मिलकर करें',
      collaborateDesc: 'शिक्षण संस्थान, सीएसआर फाउंडेशन और सामाजिक संगठन हमारे आगामी सामुदायिक अध्यायों में भागीदार बन सकते हैं।',
      collaborateCta: 'संस्थागत साझेदारी हेतु संपर्क'
    },
    mr: {
      badge: 'रोडमॅप २०२६–२०२७',
      title: 'आस्थाचे आगामी प्रकल्प',
      subtitle: 'महाविद्यालयांपासून ते ग्रामीण वस्त्यांपर्यंत, महिलांचे भावनिक सक्षमीकरण, गृहउद्योग आणि २४x७ संकट निवारण जाळे विस्तारण्याचा आमचा संकल्प.',
      activeStatus: 'सक्रिय उपक्रम २०२६',
      scalingStatus: 'विस्तार २०२६',
      horizonStatus: 'धोरणात्मक संकल्प २०२७',
      deliverablesPrompt: 'नियोजित कार्ये पहा',
      hideDeliverablesPrompt: 'नियोजित कार्ये लपवा',
      partnerBtn: 'या उपक्रमात सहभागी व्हा',
      nextPhaseBtn: 'पुढील टप्पा',
      prevPhaseBtn: 'मागील टप्पा',
      allPhasesTitle: 'सर्व ४ टप्पे एका दृष्टिक्षेपात',
      collaborateBadge: 'आस्थासोबत सहयोग करा',
      collaborateTitle: 'उज्ज्वल भविष्याची एकत्रित उभारणी',
      collaborateDesc: 'शैक्षणिक संस्था, सीएसआर फाउंडेशन आणि सामाजिक संस्था आमच्या आगामी प्रकल्पांमध्ये सहभागी होऊ शकतात.',
      collaborateCta: 'संस्थात्मक सहभागासाठी संपर्क'
    }
  };

  const s = strings[currentLang] || strings.en;

  // The 4 Phased Horizons with verified content
  const phases = [
    {
      id: '01',
      number: '01',
      label: currentLang === 'hi' ? 'चरण ०१' : currentLang === 'mr' ? 'टप्पा ०१' : 'PHASE 01',
      timeline: 'Active 2026',
      status: s.activeStatus,
      shortTitle: currentLang === 'hi' ? 'विवाहपूर्व परामर्श' : currentLang === 'mr' ? 'विवाहपूर्व समुपदेशन' : 'Pre-Marriage Guidance',
      title: currentLang === 'hi' 
        ? 'विवाहपूर्व परामर्श एवं किशोरी संबल कार्यक्रम' 
        : currentLang === 'mr' 
        ? 'विवाहपूर्व समुपदेशन शिबिरे व तरुणी सक्षमीकरण' 
        : 'Pre-Marriage Counselling & Campus Guidance',
      summary: currentLang === 'hi'
        ? 'विवाह से पूर्व युवतियों को मानसिक परिपक्वता, संवाद कौशल और पारिवारिक संबल देना ताकि घरेलू तनाव और अवसाद को पहले ही रोका जा सके।'
        : currentLang === 'mr'
        ? 'विवाहापूर्वी तरुणींना मानसिक सक्षमता, संवाद कौशल्ये आणि कौटुंबिक तणावाचा सामना करण्याचे प्रशिक्षण देणे.'
        : 'Structured guidance helping young women build emotional resilience, self-worth, and communication readiness for a dignified married life.',
      metric1Value: '50+',
      metric1Label: currentLang === 'hi' ? 'कॉलेज व केंद्र' : currentLang === 'mr' ? 'महाविद्यालये' : 'Campuses & Halls',
      metric2Value: '5,000+',
      metric2Label: currentLang === 'hi' ? 'युवतियों का लक्ष्य' : currentLang === 'mr' ? 'तरुणींचे समुपदेशन' : 'Young Women Reached',
      locationTag: currentLang === 'hi' ? '📍 कॉलेज एनएसएस विंग्स • महाराष्ट्र' : currentLang === 'mr' ? '📍 एनएसएस युवक शिबिरे • महाराष्ट्र' : '📍 NSS Youth Chapters • Maharashtra',
      image: '/images/pre-marriage-girls-group.jpg',
      isPoster: false,
      icon: <Compass className="w-4 h-4 text-[#C9A45C]" />,
      deliverables: currentLang === 'hi' ? [
        'खडकी शिक्षण संस्था के साथ औपचारिक MOU एवं ३००+ बालिकाओं का सशक्तिकरण',
        'सरकारी स्कूलों (Government Schools) में छात्राओं हेतु मानसिक स्वास्थ्य व सुरक्षा परामर्श केंद्र प्रारंभ करना',
        'कॉलेज एनएसएस (NSS) विंग्स व ग्रामीण पंचायतों में निःशुल्क मार्गदर्शन डेस्क',
        'घरेलू तनाव व कानूनी अधिकारों पर व्यावहारिक संदर्शिका'
      ] : currentLang === 'mr' ? [
        'खडकी शिक्षण संस्थेसोबत सामंजस्य करार (MOU) व ३००+ विद्यार्थिनींचे समुपदेशन',
        'सरकारी शाळांमध्ये (Government Schools) विद्यार्थिनींसाठी मानसिक स्वास्थ्य व समुपदेशन केंद्र सुरू करणे',
        'महाविद्यालयीन एनएसएस (NSS) सोबत विशेष मार्गदर्शन शिबिरे',
        'कौटुंबिक तणाव व कायदेशीर हक्कांवर माहिती पुस्तिका'
      ] : [
        'Institutional student guidance under formal MOU with Khadki Shikshan Sanstha (300+ Girls)',
        'Starting Mental Health & Safety Counselling Centres in Government Schools for adolescent girls',
        'Collaborative workshops with college NSS youth boards and rural community halls',
        'Practical handbooks on emotional resilience and legal awareness'
      ]
    },
    {
      id: '02',
      number: '02',
      label: currentLang === 'hi' ? 'चरण ०२' : currentLang === 'mr' ? 'टप्पा ०२' : 'PHASE 02',
      timeline: 'Q3–Q4 2026',
      status: s.scalingStatus,
      shortTitle: currentLang === 'hi' ? 'क्लाउड किचन व सिलाई' : currentLang === 'mr' ? 'क्लाउड किचन व शिवणकाम' : 'Cloud Kitchens & Vocations',
      title: currentLang === 'hi'
        ? 'उन्नत व्यावसायिक प्रशिक्षण व क्लाउड किचन केंद्र'
        : currentLang === 'mr'
        ? 'प्रगत कौशल्य प्रशिक्षण व क्लाउड किचन केंद्र'
        : 'Advanced Vocational Training & Cloud Kitchens',
      summary: currentLang === 'hi'
        ? 'बस्तियों की माताओं के लिए प्रमाणित सिलाई, क्लाउड किचन और सूक्ष्म व्यवसाय प्रशिक्षण ताकि वे घर बैठे स्थिर आय अर्जित कर सकें।'
        : currentLang === 'mr'
        ? 'वस्तीतील महिलांसाठी आधुनिक शिवणकाम, क्लाउड किचन, आणि व्यवसाय व्यवस्थापनाचे प्रात्यक्षिक प्रशिक्षण.'
        : 'Certified courses in culinary cloud kitchens, industrial tailoring, and micro-business empowering mothers with economic independence.',
      metric1Value: '15',
      metric1Label: currentLang === 'hi' ? 'स्लम बस्तियां' : currentLang === 'mr' ? 'वस्त्यांमध्ये केंद्र' : 'Urban Slum Hubs',
      metric2Value: '500+',
      metric2Label: currentLang === 'hi' ? 'प्रशिक्षित महिलाएं' : currentLang === 'mr' ? 'प्रशिक्षित महिला' : 'Women Certified',
      locationTag: currentLang === 'hi' ? '📍 हनुमान नगर • पुणे' : currentLang === 'mr' ? '📍 हनुमान नगर • पुणे' : '📍 Hanuman Nagar • Pune',
      image: '/images/cloud-kitchen-training-poster.jpg',
      isPoster: true,
      icon: <Building2 className="w-4 h-4 text-[#123F38]" />,
      deliverables: currentLang === 'hi' ? [
        'वाडरवाडी जैसे स्लम क्षेत्रों में आधुनिक क्लाउड किचन यूनिट्स',
        'औद्योगिक मशीन सिलाई व हस्तशिल्प प्रशिक्षण बैच',
        'खाद्य सुरक्षा एवं स्थानीय एफएसएसएआई (FSSAI) पंजीकरण सहायता'
      ] : currentLang === 'mr' ? [
        'वाडरवाडीसारख्या भागात आधुनिक क्लाउड किचन केंद्रे',
        'औद्योगिक शिलाई व हस्तकला प्रशिक्षण वर्ग',
        'अन्न सुरक्षा व स्थानिक व्यवसाय परवाना मार्गदर्शन'
      ] : [
        'Dedicated cloud kitchen training hubs in urban informal settlements',
        'Industrial machine tailoring and artisan handicraft cohorts',
        'Food hygiene standards and local licensing mentorship'
      ]
    },
    {
      id: '03',
      number: '03',
      label: currentLang === 'hi' ? 'चरण ०३' : currentLang === 'mr' ? 'टप्पा ०३' : 'PHASE 03',
      timeline: 'Late 2026',
      status: s.scalingStatus,
      shortTitle: currentLang === 'hi' ? 'महिला गृहउद्योग' : currentLang === 'mr' ? 'महिला गृहउद्योग' : 'Micro-Enterprise Incubator',
      title: currentLang === 'hi'
        ? 'महिला गृहउद्योग सहयोग व सीधा बाज़ार संपर्क'
        : currentLang === 'mr'
        ? 'महिला गृहउद्योग सहाय्य व थेट बाजारपेठ जोडणी'
        : 'Business Support & Micro-Enterprise Incubator',
      summary: currentLang === 'hi'
        ? 'महिलाओं द्वारा तैयार खाद्य पदार्थों, कपड़ों और हस्तशिल्प को उचित पैकेजिंग, ब्रांडिंग और स्थानीय प्रदर्शनियों व बाज़ारों से जोड़ना।'
        : currentLang === 'mr'
        ? 'महिलांनी तयार केलेल्या वस्तूंना योग्य पॅकेजिंग, ब्रँडिंग आणि थेट ग्राहक मिळवून देण्यासाठी मार्गदर्शन.'
        : 'Direct mentoring, sustainable packaging, and corporate exhibition stalls connecting home-based women entrepreneurs directly to buyers.',
      metric1Value: '200+',
      metric1Label: currentLang === 'hi' ? 'महिला गृहउद्योग' : currentLang === 'mr' ? 'महिला गृहउद्योग' : 'Micro-Enterprises',
      metric2Value: '0%',
      metric2Label: currentLang === 'hi' ? 'बिचौलिया कमीशन' : currentLang === 'mr' ? 'दलालमुक्त नफा' : 'Middlemen Exploitation',
      locationTag: currentLang === 'hi' ? '📍 कडेपूर एवं पश्चिमी महाराष्ट्र' : currentLang === 'mr' ? '📍 कडेपूर व पश्चिम महाराष्ट्र' : '📍 Kadepur & Western Maharashtra',
      image: '/images/kadepur-womens-day.jpg',
      isPoster: false,
      icon: <TrendingUp className="w-4 h-4 text-[#A46114]" />,
      deliverables: currentLang === 'hi' ? [
        'सामुदायिक ब्रांडिंग एवं पर्यावरण अनुकूल पैकेजिंग मार्गदर्शन',
        'पुणे व मुंबई के कार्पोरेट परिसरों में महिला स्टॉल लिंकेज',
        'डिजिटल यूपीआई भुगतान एवं माइक्रो-बचत खाता सहायता'
      ] : currentLang === 'mr' ? [
        'सामूहिक ब्रँडिंग व पर्यावरणपूरक पॅकेजिंग सहाय्य',
        'पुणे व मुंबईतील कॉर्पोरेट संकुलांमध्ये स्टॉलची व्यवस्था',
        'डिजिटल यूपीआय व सूक्ष्म-बचत खाती उघडण्यास मदत'
      ] : [
        'Collective branding and eco-friendly packaging assistance',
        'Corporate exhibition stalls and festive buyer pop-ups',
        'Digital UPI integration and micro-savings circle management'
      ]
    },
    {
      id: '04',
      number: '04',
      label: currentLang === 'hi' ? 'चरण ०४' : currentLang === 'mr' ? 'टप्पा ०४' : 'PHASE 04',
      timeline: '2027 Horizon',
      status: s.horizonStatus,
      shortTitle: currentLang === 'hi' ? '२४x७ संकट तंत्र' : currentLang === 'mr' ? '२४x७ समुपदेशन जाळे' : '24x7 Crisis Support',
      title: currentLang === 'hi'
        ? 'समर्पित २४x७ परामर्श एवं संकट प्रतिक्रिया तंत्र'
        : currentLang === 'mr'
        ? 'कायमस्वरूपी २४x७ समुपदेशन व संकट निवारण जाळे'
        : 'Dedicated 24x7 Counselling Support System',
      summary: currentLang === 'hi'
        ? 'घरेलू हिंसा, अवसाद और संकट से जूझ रही बहनों को तुरंत मनोचिकित्सकीय परामर्श, मध्यस्थता और सुरक्षित आश्रय से जोड़ना।'
        : currentLang === 'mr'
        ? 'कौटुंबिक हिंसाचार व तणावात सापडलेल्या महिलांना त्वरित कायदेशीर मार्गदर्शन, सुरक्षित निवारा व समुपदेशन.'
        : 'A structured crisis intervention network providing compassionate mediation, safe transit shelter linkages, and mental health support.',
      metric1Value: '10',
      metric1Label: currentLang === 'hi' ? 'जिलों में उपस्थिति' : currentLang === 'mr' ? 'जिल्ह्यांमध्ये विस्तार' : 'Districts in Focus',
      metric2Value: '24/7',
      metric2Label: currentLang === 'hi' ? 'त्वरित संकट रिस्पांस' : currentLang === 'mr' ? 'तातडीचा रिस्पॉन्स' : 'Emergency Response',
      locationTag: currentLang === 'hi' ? '📍 २४x७ हेल्पलाइन: ८८०१०६६००७ • महाराष्ट्र' : currentLang === 'mr' ? '📍 २४x७ हेल्पलाइन: ८८०१०६६००७ • महाराष्ट्र' : '📍 24x7 Helpline: 8801066007 • Maharashtra',
      image: '/images/counselling-helpline-simintini.jpg',
      isPoster: true,
      icon: <ShieldCheck className="w-4 h-4 text-[#123F38]" />,
      deliverables: currentLang === 'hi' ? [
        'घरेलू विवादों के संवेदनशील व गरिमापूर्ण समाधान हेतु पुलिस स्टेशनों (Police Stations) में विशेष महिला परामर्श केंद्र शुरू करना',
        'पुणे, सांगली जिला और पश्चिमी महाराष्ट्र में त्वरित संकट निवारण काउंसलर मोबाइल टीम',
        'आपातकालीन सुरक्षित आश्रय (Safe Shelter) ट्रांजिट नेटवर्क',
        'आत्महत्या रोकथाम व आघात (Trauma) हीलिंग सहायता'
      ] : currentLang === 'mr' ? [
        'कौटुंबिक वाद सोडवण्यासाठी व हिंसाचार रोखण्यासाठी पोलिस ठाण्यांमध्ये (Police Stations) विशेष समुपदेशन केंद्र सुरू करणे',
        'पुणे, सांगली जिल्हा व पश्चिम महाराष्ट्रात त्वरित संकट निवारण फिरते समुपदेशक पथक',
        'तातडीचा सुरक्षित निवारा (Safe Shelter) नेटवर्क',
        'आत्महत्या प्रतिबंध व मानसिक स्वास्थ्य उपचार'
      ] : [
        "Starting specialized Women's Crisis Mediation & Counselling Centres at Police Stations to resolve domestic disputes and prevent violence with dignity",
        'Rapid-response mobile counseling task force across Pune, Sangli District, and Western Maharashtra',
        'Emergency safe-shelter and legal transit partnerships',
        'Trauma-informed mental health and suicide prevention circles'
      ]
    }
  ];

  const current = phases[activePhase] || phases[0];

  return (
    <section 
      id="updates" 
      className="py-16 sm:py-24 bg-[#FAF7F0] border-t border-[#C9A45C]/25 relative scroll-mt-20 overflow-hidden text-[#333A36]"
      aria-label="Aastha Roadmap 2026-2027"
    >
      {/* Subtle organic ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#C9A45C]/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#123F38]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =====================================================================
            1. SECTION INTRO (Editorial, concise, inviting)
           ===================================================================== */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#123F38]/5 border border-[#123F38]/15 text-[11px] font-sans font-semibold text-[#123F38] uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>{s.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#123F38] font-normal tracking-tight mb-3 leading-snug">
            {s.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#333A36]/80 leading-relaxed font-sans font-light">
            {s.subtitle}
          </p>
        </div>

        {/* Flagship Future Goals Callout Banner */}
        <div className="max-w-4xl mx-auto mb-8 bg-[#123F38]/5 border border-[#C9A45C]/35 rounded-2xl p-4 sm:p-4 text-center shadow-2xs">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-[13px] font-sans font-medium text-[#123F38]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#123F38] text-white text-[10px] font-bold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-[#E0BE76]" />
              <span>{currentLang === 'hi' ? 'भावी संकल्प' : currentLang === 'mr' ? 'आगामी संकल्प' : 'EXPANSION GOALS'}</span>
            </span>
            <span className="flex items-center gap-1">
              <span>🏛️</span>
              <span className="font-semibold">{currentLang === 'hi' ? 'पुलिस स्टेशनों में परामर्श केंद्र' : currentLang === 'mr' ? 'पोलिस ठाण्यांमध्ये समुपदेशन केंद्र' : 'Counselling Centres at Police Stations'}</span>
            </span>
            <span className="text-[#C9A45C]">•</span>
            <span className="flex items-center gap-1">
              <span>🏫</span>
              <span className="font-semibold">{currentLang === 'hi' ? 'सरकारी स्कूलों में संबल डेस्क' : currentLang === 'mr' ? 'सरकारी शाळांमध्ये समुपदेशन केंद्र' : 'Guidance Desks in Government Schools'}</span>
            </span>
            <span className="text-[#C9A45C]">•</span>
            <span className="flex items-center gap-1">
              <span>🤝</span>
              <span className="font-semibold">{currentLang === 'hi' ? 'खडकी शिक्षण संस्था MOU (३००+ छात्राएं)' : currentLang === 'mr' ? 'खडकी शिक्षण संस्था MOU (३००+ विद्यार्थिनी)' : 'MOU with Khadki Shikshan Sanstha (300+ Girls)'}</span>
            </span>
          </div>
        </div>


        {/* =====================================================================
            2. SCANNABLE 4-PHASE TIMELINE RIBBON (Instant high-level roadmap)
           ===================================================================== */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 p-1.5 sm:p-2 bg-white/90 backdrop-blur-xs rounded-2xl sm:rounded-full border border-[#C9A45C]/30 shadow-2xs">
            {phases.map((p, idx) => {
              const isSelected = activePhase === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setActivePhase(idx);
                    setShowDeliverables(false);
                  }}
                  className={`flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 rounded-xl sm:rounded-full text-left transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'bg-[#123F38] text-white shadow-xs' 
                      : 'hover:bg-[#FAF7F0] text-[#333A36]/80 hover:text-[#123F38]'
                  }`}
                  aria-selected={isSelected}
                  role="tab"
                >
                  {/* Number pill */}
                  <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                    isSelected 
                      ? 'bg-[#C9A45C] text-[#123F38]' 
                      : 'bg-[#FAF7F0] text-[#333A36]/70 border border-[#C9A45C]/30'
                  }`}>
                    {p.number}
                  </span>

                  {/* Title & Phase */}
                  <div className="min-w-0 flex-1">
                    <span className={`text-[10px] font-mono uppercase tracking-wider block truncate ${
                      isSelected ? 'text-[#FAF7F0]/75' : 'text-[#333A36]/50'
                    }`}>
                      {p.timeline}
                    </span>
                    <span className={`text-xs font-serif font-medium block truncate ${
                      isSelected ? 'text-white' : 'text-[#123F38]'
                    }`}>
                      {p.shortTitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>


        {/* =====================================================================
            3. FEATURED INITIATIVE SHOWCASE (Balanced, editorial 2-column card)
           ===================================================================== */}
        <div className="bg-white rounded-3xl border border-[#C9A45C]/35 shadow-xs overflow-hidden transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Column: Essential details & direct actions (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-9 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                
                {/* Status + Phase Tag */}
                <div className="flex items-center justify-between gap-2.5 flex-wrap">
                  <div className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-[#123F38]">
                    <span className="w-2 h-2 rounded-full bg-[#C9A45C]" />
                    <span className="uppercase tracking-wider text-[11px] font-mono text-[#A46114]">
                      {current.label} • {current.timeline}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F0] border border-[#C9A45C]/35 text-[#123F38] text-[11px] font-medium">
                      {current.locationTag}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium">
                      {current.status}
                    </span>
                  </div>
                </div>

                {/* Main Heading */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#123F38] font-normal leading-snug">
                  {current.title}
                </h3>

                {/* 1-Sentence Plain-Language Summary */}
                <p className="text-xs sm:text-sm text-[#333A36]/80 leading-relaxed font-sans font-light">
                  {current.summary}
                </p>

                {/* Ground Action Deliverables (Clean & Direct - No Figures) */}
                <div className="pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#A46114] font-semibold block mb-2">
                    {s.deliverablesPrompt}
                  </span>
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F0] border border-[#C9A45C]/25 space-y-2">
                    {current.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#333A36]/85">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-sans">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Actions: CTA + Prev / Next */}
              <div className="pt-4 border-t border-[#C9A45C]/20 flex flex-wrap items-center justify-between gap-4">
                
                <button
                  type="button"
                  onClick={onRequestGuidance}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#123F38] hover:bg-[#1B554C] text-white text-xs font-semibold tracking-wide transition-all shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
                >
                  <span>{s.partnerBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C9A45C]" />
                </button>

                {/* Phase Steppers */}
                <div className="flex items-center gap-1.5 text-xs text-[#333A36]/60">
                  <button
                    type="button"
                    disabled={activePhase === 0}
                    onClick={() => {
                      setActivePhase(prev => Math.max(0, prev - 1));
                      setShowDeliverables(false);
                    }}
                    className="p-1.5 rounded-full border border-[#C9A45C]/30 hover:bg-[#FAF7F0] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors text-[#123F38]"
                    aria-label={s.prevPhaseBtn}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>

                  <span className="font-mono text-[11px] px-1">
                    {activePhase + 1} / {phases.length}
                  </span>

                  <button
                    type="button"
                    disabled={activePhase === phases.length - 1}
                    onClick={() => {
                      setActivePhase(prev => Math.min(phases.length - 1, prev + 1));
                      setShowDeliverables(false);
                    }}
                    className="p-1.5 rounded-full border border-[#C9A45C]/30 hover:bg-[#FAF7F0] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors text-[#123F38]"
                    aria-label={s.nextPhaseBtn}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

            {/* Right Column: Authentic Grassroots Photograph / Official Poster (5 cols) */}
            <div className={`lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden flex items-center justify-center transition-colors duration-300 ${
              current.isPoster 
                ? 'bg-[#FAF7F0] p-3 sm:p-5 border-t lg:border-t-0 lg:border-l border-[#C9A45C]/25' 
                : 'bg-black/5'
            }`}>
              {current.isPoster ? (
                <div className="w-full h-full flex items-center justify-center p-1">
                  <img 
                    src={current.image} 
                    alt={current.title} 
                    className="max-h-[460px] w-auto max-w-full object-contain rounded-2xl shadow-sm transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              ) : (
                <>
                  <img 
                    src={current.image} 
                    alt={current.title} 
                    className="w-full h-full object-cover object-center transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                  {/* Verified location badge */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-sans font-medium tracking-wide text-white border border-white/20 mb-1">
                      {current.locationTag}
                    </span>
                    <p className="text-xs font-serif font-light text-white/95 line-clamp-1">
                      {current.title}
                    </p>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>


        {/* =====================================================================
            4. ALL 4 PHASES AT A GLANCE (Compact Scannable Grid)
           ===================================================================== */}
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {phases.map((p, idx) => {
              const isSelected = activePhase === idx;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setActivePhase(idx);
                    setShowDeliverables(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-white border-[#123F38] ring-1 ring-[#123F38] shadow-xs' 
                      : 'bg-white/60 hover:bg-white border-[#C9A45C]/25 hover:border-[#C9A45C]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-[#A46114]">
                        {p.number}
                      </span>
                      <span className="text-[10px] font-mono text-[#333A36]/50">
                        {p.timeline}
                      </span>
                    </div>

                    <h4 className="text-xs font-serif font-bold text-[#123F38] mb-1 leading-snug line-clamp-1">
                      {p.shortTitle}
                    </h4>

                    <p className="text-[11px] text-[#333A36]/70 leading-relaxed font-light line-clamp-2">
                      {p.summary}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#C9A45C]/15 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#123F38]">
                      {p.timeline}
                    </span>
                    <span className="text-[#A46114] font-medium flex items-center gap-0.5">
                      Explore Phase <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* =====================================================================
            5. INSTITUTIONAL COLLABORATION CALLOUT
           ===================================================================== */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#C9A45C]/35 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#A46114] block">
              {s.collaborateBadge}
            </span>
            <h4 className="text-lg sm:text-xl font-serif text-[#123F38]">
              {s.collaborateTitle}
            </h4>
            <p className="text-xs sm:text-sm text-[#333A36]/80 font-sans font-light max-w-xl leading-relaxed">
              {s.collaborateDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={onRequestGuidance}
            className="shrink-0 px-6 py-2.5 rounded-full bg-[#123F38] hover:bg-[#1B554C] text-white text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer active:scale-95"
          >
            {s.collaborateCta}
          </button>
        </div>

      </div>
    </section>
  );
}
