import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  X, Eye, ChevronRight, ChevronLeft, 
  Play, Pause, ArrowRight, ArrowLeft
} from 'lucide-react';

export default function ProgramsAndFieldwork({ t = {}, lang = 'en', onRequestGuidance = () => {} }) {
  const currentLang = lang || (t?.nav?.purpose?.includes('उद्दिष्ट') ? 'mr' : t?.nav?.purpose?.includes('उद्देश्य') ? 'hi' : 'en');

  // Display Mode: 'carousel' (Smooth Rotating Showcase) vs 'grid' (All Photos Grid)
  const [displayMode, setDisplayMode] = useState('carousel');

  // Active Carousel Slide Index
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Drag & Swipe gesture tracking
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Active Selected Story for Full-Screen Lightbox Modal
  const [selectedStory, setSelectedStory] = useState(null);
  const [showStoryDrawer, setShowStoryDrawer] = useState(false);

  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      if (mediaQuery.matches) {
        setIsAutoPlaying(false);
      }
    }
  }, []);

  // Keyboard navigation & Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedStory(null);
        setShowStoryDrawer(false);
      } else if (e.key === 'ArrowRight' && !selectedStory && displayMode === 'carousel') {
        setCurrentIndex(prev => (prev + 1) % 17);
      } else if (e.key === 'ArrowLeft' && !selectedStory && displayMode === 'carousel') {
        setCurrentIndex(prev => (prev - 1 + 17) % 17);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStory, displayMode]);

  // Content Strings (Free of place names)
  const strings = useMemo(() => {
    const dict = {
      en: {
        heading: 'Where Change Takes Root',
        subheading: 'An authentic photographic journey into grassroots counselling, relief drives, and women-led livelihoods.',
        viewCarousel: '🔄 Rotating Gallery',
        viewGrid: '▦ All Photos',
        autoRotate: 'Auto-Rotate',
        pauseRotate: 'Pause',
        dragHint: 'Swipe or click arrows to explore • Click center photo to enlarge',
        exploreStory: 'View Full Photo',
        photoDetails: 'Fieldwork Documentation',
        beneficiaries: 'Who was supported',
        actionTaken: 'What happened',
        partner: 'Partner Organization',
        close: 'Close',
        prev: 'Previous Photo',
        next: 'Next Photo',
        requestSupport: 'Connect with this Initiative'
      },
      hi: {
        heading: 'जहां बदलाव की नींव पड़ती है',
        subheading: 'परामर्श, संबल और महिला स्वावलंबन की वास्तविक ज़मीनी यात्रा — सीधे तस्वीरों के माध्यम से।',
        viewCarousel: '🔄 रोटेटिंग गैलरी',
        viewGrid: '▦ सभी तस्वीरें',
        autoRotate: 'ऑटो-रोटेट',
        pauseRotate: 'रोकें',
        dragHint: 'स्वाइप करें या तीरों पर क्लिक करें • बड़ी फोटो देखने के लिए क्लिक करें',
        exploreStory: 'पूरी फोटो देखें',
        photoDetails: 'ज़मीनी दस्तावेज़ीकरण',
        beneficiaries: 'किन्हें सहारा मिला',
        actionTaken: 'क्या कार्य हुआ',
        partner: 'सहयोगी संस्था',
        close: 'बंद करें',
        prev: 'पिछली फोटो',
        next: 'अगली फोटो',
        requestSupport: 'इस पहल से जुड़ें'
      },
      mr: {
        heading: 'जिथे बदलाची पाळेमुळे रुजतात',
        subheading: 'समुपदेशन, सुरक्षितता आणि महिला स्वावलंबनाचा वास्तववादी प्रवास — थेट छायाचित्रांच्या माध्यमातून.',
        viewCarousel: '🔄 फिरणारी गॅलरी',
        viewGrid: '▦ सर्व छायाचित्रे',
        autoRotate: 'ऑटो-रोटेट',
        pauseRotate: 'थांबवा',
        dragHint: 'स्वाइप करा किंवा बाणांवर क्लिक करा • मोठा फोटो पाहण्यासाठी क्लिक करा',
        exploreStory: 'पूर्ण फोटो पहा',
        photoDetails: 'जमिनीवरील दस्तऐवजीकरण',
        beneficiaries: 'कोणाला आधार मिळाला',
        actionTaken: 'नेमके काय घडले',
        partner: 'सहभागी संस्था',
        close: 'बंद करा',
        prev: 'मागील फोटो',
        next: 'पुढील फोटो',
        requestSupport: 'या उपक्रमात सहभागी व्हा'
      }
    };
    return dict[currentLang] || dict.en;
  }, [currentLang]);

  // 17 Authentic Grassroots Fieldwork Stories (Place names removed from titles & displays)
  const allStories = useMemo(() => [
    {
      id: 'yerawada-prison-gate',
      title: currentLang === 'hi' 
        ? 'महिला कारागार संबल एवं कानूनी जागरूकता मिशन' 
        : currentLang === 'mr' 
        ? 'महिला कारागृह भेट व कायदेशीर समुपदेशन मोहीम' 
        : "Women's Prison Outreach & Legal Guidance Mission",
      image: '/images/yerawada-prison-gate-group.jpg',
      aspectRatio: 'aspect-16/10',
      tag: currentLang === 'hi' ? 'कारागार परामर्श' : currentLang === 'mr' ? 'कारागृह समुपदेशन' : 'Prison Outreach',
      date: 'Fieldwork Outreach',
      beneficiaries: currentLang === 'hi' ? 'महिला कैदी, विचाराधीन महिलाएं एवं उनके परिवार।' : currentLang === 'mr' ? 'महिला कैदी, न्यायालयीन कोठडीतील महिला व कुटुंबे.' : 'Female inmates, undertrial women, and their families.',
      actionTaken: currentLang === 'hi' ? 'कारागार में महिला बंदियों के लिए गरिमा संकल्प, कानूनी जागरूकता और मानसिक उपचार हेतु समर्पित दल की विजिट।' : currentLang === 'mr' ? 'कारागृहातील महिलांसाठी कायदेशीर साहाय्य, मानसिक आरोग्य व स्वाभिमान पुनर्निर्मिती उपक्रम.' : 'Specialist delegation conducting legal aid, dignity restoration, and emotional healing inside women-focused correctional facilities.',
      partner: 'Prison Welfare Coordination'
    },
    {
      id: 'raincoat-handover-1',
      title: currentLang === 'hi' 
        ? 'मानसून मानवीय सहायता — वर्षा संबल व रेनकोट वितरण' 
        : currentLang === 'mr' 
        ? 'पावसाळी मदत मोहीम — गरजू महिलांना थेट रेनकोट वाटप' 
        : 'Monsoon Humanitarian Relief & Raincoat Handover',
      image: '/images/raincoat-handover-beneficiary-1.jpg',
      aspectRatio: 'aspect-16/10',
      tag: currentLang === 'hi' ? 'मानवीय सहायता' : currentLang === 'mr' ? 'मानवतावादी मदत' : 'Relief Drive',
      date: 'Monsoon Direct Action',
      beneficiaries: currentLang === 'hi' ? 'दैनिक मजदूरी करने वाली माताएं एवं फुटपाथ विक्रेता बहनें।' : currentLang === 'mr' ? 'रोजंदारीवर काम करणाऱ्या कष्टकरी महिला.' : 'Daily-wage women, street vendors, and low-income mothers.',
      actionTaken: currentLang === 'hi' ? 'भारी बारिश में सुरक्षित रहकर काम करने हेतु मजबूत रेनकोट सीधे लाभार्थी बहनों को भेंट किए गए।' : currentLang === 'mr' ? 'मुसळधार पावसात सुरक्षित राहून काम करता यावे म्हणून वॉटरप्रूफ रेनकोटचे प्रत्यक्ष वाटप.' : 'Handing over heavy-duty protective rainwear directly to vulnerable women workers during monsoon weather.',
      partner: 'Aastha Humanitarian Relief Wing'
    },
    {
      id: 'raincoat-handover-2',
      title: currentLang === 'hi' 
        ? 'घर-घर सहायता — बेसहारा माताओं को रेनकोट संबल' 
        : currentLang === 'mr' 
        ? 'थेट साहाय्य — कष्टकरी महिलांना पावसाळी रेनकोट आधार' 
        : 'Doorstep Support & Protective Rainwear Distribution',
      image: '/images/raincoat-handover-beneficiary-2.jpg',
      aspectRatio: 'aspect-16/10',
      tag: currentLang === 'hi' ? 'प्रत्यक्ष संबल' : currentLang === 'mr' ? 'थेट साहाय्य' : 'Direct Support',
      date: 'Direct Field Action',
      beneficiaries: currentLang === 'hi' ? 'कष्टकरी गृहणियां और बुजुर्ग महिलाएं।' : currentLang === 'mr' ? 'कष्टकरी गृहिणी व वयोवृद्ध महिला.' : 'Hardworking homemakers and elderly women in underserved clusters.',
      actionTaken: currentLang === 'hi' ? 'ज़रूरतमंद बहनों तक व्यक्तिगत रूप से पहुंचकर उच्च गुणवत्ता वाले रेनकोट प्रदान करना।' : currentLang === 'mr' ? 'गरजू महिलांपर्यंत प्रत्यक्ष पोहोचून दर्जेदार रेनकोट देऊन दिलासा देणे.' : 'Direct community outreach ensuring every vulnerable sister receives protective seasonal gear.',
      partner: 'Aastha Volunteer Network'
    },
    {
      id: 'raincoat-women-group',
      title: currentLang === 'hi' 
        ? 'सामुदायिक महिला समूह — आवश्यक रेनकोट वितरण उत्सव' 
        : currentLang === 'mr' 
        ? 'महिला संघटन — पावसाळी साहित्य वाटप व आनंदोत्सव' 
        : 'Community Women Group with Distributed Weather Gear',
      image: '/images/raincoat-distribution-women-group.jpg',
      aspectRatio: 'aspect-16/10',
      tag: currentLang === 'hi' ? 'सामुदायिक एकता' : currentLang === 'mr' ? 'महिला ऐक्य' : 'Community Solidarity',
      date: 'Community Distribution',
      beneficiaries: currentLang === 'hi' ? 'बस्ती की माताएं, युवतियां एवं स्वयं सहायता समूह।' : currentLang === 'mr' ? 'वस्तीतील माता, तरुणी व बचत गट सदस्या.' : 'Mothers, young daughters, and local self-help group members.',
      actionTaken: currentLang === 'hi' ? 'सामूहिक वितरण कार्यक्रम में एक साथ अनेक बहनों को रेनकोट किट प्रदान कर उनकी सुरक्षा सुनिश्चित की गई।' : currentLang === 'mr' ? 'सामूहिक वाटप कार्यक्रमात महिलांना एकत्र आणून आवश्यक साहित्याचे वितरण करण्यात आले.' : 'Distributing protective seasonal kits to women self-help cohorts gathered together.',
      partner: 'Aastha Community Relief Team'
    },
    {
      id: 'raincoat-community-gathering',
      title: currentLang === 'hi' 
        ? 'पारिवारिक राहत अभियान — माताओं व बच्चों को मौसम सुरक्षा' 
        : currentLang === 'mr' 
        ? 'कौटुंबिक साहाय्य — माता व बालकांसाठी पावसाळी साहित्य वाटप' 
        : 'Family Relief Drive — Rainwear for Mothers & Children',
      image: '/images/raincoat-community-gathering.jpg',
      aspectRatio: 'aspect-16/10',
      tag: currentLang === 'hi' ? 'पारिवारिक संबल' : currentLang === 'mr' ? 'कौटुंबिक मदत' : 'Family Relief',
      date: 'Community Gathering',
      beneficiaries: currentLang === 'hi' ? 'वंचित परिवारों की माताएं, किशोरियां एवं छोटे बच्चे।' : currentLang === 'mr' ? 'गरजू कुटुंबातील माता, किशोरवयीन मुली व लहान मुले.' : 'Mothers, adolescent girls, and young children in informal settlements.',
      actionTaken: currentLang === 'hi' ? 'बड़ी संख्या में माताओं और बच्चों को बारिश से बचाव हेतु रेनकोट और गर्म वस्त्र उपलब्ध कराना।' : currentLang === 'mr' ? 'मोठ्या संख्येने माता व बालकांना पावसापासून संरक्षणासाठी रेनकोट व उबदार साहित्याचे वाटप.' : 'Comprehensive community gathering distributing rain gear to entire families facing monsoonal vulnerability.',
      partner: 'Aastha Grassroots Relief'
    },
    {
      id: 'aastha-team-banner',
      title: currentLang === 'hi' 
        ? 'आस्था ज़मीनी कार्यकर्ता एवं सामुदायिक स्वयंसेवक दल' 
        : currentLang === 'mr' 
        ? 'आस्था जमिनीवरील कार्यकर्त्या व स्वयंसेवक संघटन' 
        : 'Aastha Grassroots Community Volunteers & Fieldwork Team',
      image: '/images/aastha-team-park-banner.jpg',
      aspectRatio: 'aspect-16/10',
      tag: currentLang === 'hi' ? 'सामुदायिक शक्ति' : currentLang === 'mr' ? 'महिला संघटन' : 'Grassroots Movement',
      date: 'Fieldwork Coordination',
      beneficiaries: currentLang === 'hi' ? 'वंचित बस्तियों की महिलाएं एवं युवतियां।' : currentLang === 'mr' ? 'वस्त्यांमधील गरजू महिला व तरुणी.' : 'Community women and adolescent girls across informal settlements.',
      actionTaken: currentLang === 'hi' ? 'संस्थापक सिमंतिनी शिंगाडे एवं समर्पित महिला कार्यकर्ताओं का दल बस्तियों में संबल, परामर्श और कानूनी अधिकारों का विस्तार करते हुए।' : currentLang === 'mr' ? 'संस्थापक सीमंतिनी शिंगाडे व महिला कार्यकर्त्यांचे संघटन, महिलांना आत्मविश्वास व आधार देण्यासाठी कटिबद्ध.' : 'Founder Simintini Shingade alongside dedicated women volunteers uniting grassroots communities under the Aastha banner.',
      partner: 'Aastha Volunteer Network'
    },
    {
      id: 'tailoring-class-batch',
      title: currentLang === 'hi' 
        ? 'महिला सिलाई मशीन व आजीविका निर्माण प्रशिक्षण बैच' 
        : currentLang === 'mr' 
        ? 'महिला शिवणकाम व आधुनिक शिलाई मशीन प्रशिक्षण वर्ग' 
        : "Women's Industrial Machine Tailoring & Livelihood Batch",
      image: '/images/tailoring-class-women.jpg',
      aspectRatio: 'aspect-4/3',
      tag: currentLang === 'hi' ? 'सिलाई स्वावलंबन' : currentLang === 'mr' ? 'शिवणकाम प्रशिक्षण' : 'Tailoring & Livelihood',
      date: 'Community Cohort 2026',
      beneficiaries: currentLang === 'hi' ? 'घरेलू महिलाएं और युवतियां जो स्वावलंबन चाहती हैं।' : currentLang === 'mr' ? 'गृहिणी व तरुणी ज्यांना स्वावलंबी व्हायचे आहे.' : 'Low-income homemakers and young women acquiring vocational tailoring skills.',
      actionTaken: currentLang === 'hi' ? 'बस्ती की माताओं के लिए आधुनिक सिलाई मशीन पर व्यावहारिक प्रशिक्षण ताकि वे घर बैठे स्थिर आय अर्जित कर सकें।' : currentLang === 'mr' ? 'महिलांसाठी व्यावसायिक शिलाई मशीन प्रशिक्षण, कपडे तयार करणे व थेट ग्राहक जोडणी.' : 'Practical machine stitching and garment tailoring batches training women to establish sustainable home micro-businesses.',
      partner: 'Aastha Livelihood Center'
    },
    {
      id: 'terrace-counselling-circle',
      title: currentLang === 'hi' 
        ? 'खुले आंगन में आत्मीय परामर्श एवं पारिवारिक संवाद मंडल' 
        : currentLang === 'mr' 
        ? 'मुक्त वातावरणात कौटुंबिक मार्गदर्शन व समुपदेशन मंडळ' 
        : 'Open-Air Community Counselling & Dialogue Circle',
      image: '/images/counselling-circle-terrace.jpg',
      aspectRatio: 'aspect-16/10',
      tag: currentLang === 'hi' ? 'पारिवारिक संवाद' : currentLang === 'mr' ? 'समुपदेशन मंडळ' : 'Community Counselling',
      date: 'Weekly Safe Circle',
      beneficiaries: currentLang === 'hi' ? 'घरेलू तनाव और अवसाद से जूझ रही बहनें।' : currentLang === 'mr' ? 'कौटुंबिक तणावात असलेल्या महिला.' : 'Mothers and women facing domestic stress and isolation.',
      actionTaken: currentLang === 'hi' ? 'घरेलू तनाव और वैवाहिक समस्याओं से जूझ रही बहनों के साथ खुले और सुरक्षित वातावरण में संवेदनशील परामर्श।' : currentLang === 'mr' ? 'कौटुंबिक अडचणी, तणाव आणि मानसिक स्वास्थ्यावर महिलांसोबत सुरक्षित व आत्मीय वातावरणात प्रत्यक्ष चर्चा.' : 'Trained community counselors sitting on floor mats with slum homemakers to mediate family tensions without stigma.',
      partner: 'Aastha Mediation Wing'
    },
    {
      id: 'cloud-kitchen',
      title: currentLang === 'hi' 
        ? 'क्लाउड किचन एवं सूक्ष्म खानपान व्यवसाय प्रशिक्षण' 
        : currentLang === 'mr' 
        ? 'क्लाउड किचन व पाककला सूक्ष्म व्यवसाय प्रशिक्षण' 
        : 'Culinary Cloud Kitchen & Micro-Catering Enterprise Training',
      image: '/images/wadarwadi-pune-group.jpg',
      aspectRatio: 'aspect-4/3',
      tag: currentLang === 'hi' ? 'पाककला स्वावलंबन' : currentLang === 'mr' ? 'पाककला स्वावलंबन' : 'Culinary Enterprise',
      date: 'Vocational Cohort',
      beneficiaries: currentLang === 'hi' ? 'बस्तियों की माताएं जो घर बैठे आय अर्जित करना चाहती हैं।' : currentLang === 'mr' ? 'वस्तीतील माता ज्या घरून उत्पन्न मिळवू इच्छितात.' : 'Low-income mothers seeking sustainable home-based income.',
      actionTaken: currentLang === 'hi' ? 'माताओं के लिए व्यावहारिक कुकिंग, पैकेजिंग और घर से कैटरिंग ऑर्डर लेने का व्यावसायिक प्रशिक्षण।' : currentLang === 'mr' ? 'महिलांसाठी घरबसल्या डबा व केटरिंग व्यवसाय सुरू करण्यासाठी व्यावसायिक पाककला प्रशिक्षण.' : 'Hands-on commercial cooking, food safety, and catering management training for mothers to launch home food orders.',
      partner: 'Aastha Grassroots Livelihood Hub'
    },
    {
      id: 'khadki-college',
      title: currentLang === 'hi' 
        ? '३००+ छात्राओं से संपर्क — किशोरी सशक्तिकरण व संवाद कार्यशाला' 
        : currentLang === 'mr' 
        ? '३००+ विद्यार्थिनींशी संवाद — किशोरवयीन मुलींचे सक्षमीकरण कार्यशाळा' 
        : '300+ Girls Connected — Adolescent Girl Resilience & Boundary Workshop',
      image: '/images/pre-marriage-girls-group.jpg',
      aspectRatio: 'aspect-16/10',
      tag: currentLang === 'hi' ? 'MOU समझौता' : currentLang === 'mr' ? 'MOU करार' : 'MOU Partnership',
      date: 'Campus Leadership',
      beneficiaries: currentLang === 'hi' ? '३०० से अधिक कॉलेज छात्राएं एवं पहली पीढ़ी की युवा शिक्षार्थी।' : currentLang === 'mr' ? '३०० हून अधिक महाविद्यालयीन तरुणी व पहिल्या पिढीतील विद्यार्थिनी.' : 'Over 300+ adolescent girls and college students empowered across life leadership circles.',
      actionTaken: currentLang === 'hi' ? 'खडकी शिक्षण संस्था के साथ हस्ताक्षरित औपचारिक MOU के तहत, आस्था ने ३०० से अधिक छात्राओं के लिए आत्मसम्मान और भावनात्मक परिपक्वता सत्र आयोजित किए।' : currentLang === 'mr' ? 'खडकी शिक्षण संस्थेसोबत झालेल्या सामंजस्य करारांतर्गत (MOU), आस्थाने ३०० हून अधिक तरुणींसाठी स्वाभिमान आणि भावनिक समुपदेशन सत्रे घेतली.' : 'Under an official MOU with Khadki Shikshan Sanstha, Aastha conducted comprehensive life skills and psychological resilience workshops directly guiding over 300+ young women.',
      partner: 'MOU with Khadki Shikshan Sanstha'
    },
    {
      id: 'karve-fieldwork-msw',
      title: currentLang === 'hi' 
        ? 'ज़मीनी फील्ड वर्क: कर्वे समाज सेवा संस्थान से २ एमएसडब्ल्यू छात्र शामिल' 
        : currentLang === 'mr' 
        ? 'प्रत्यक्ष क्षेत्रकार्य: कर्वे समाज सेवा संस्थेतून २ एमएसडब्ल्यू विद्यार्थी सहभागी' 
        : 'Ground Field Work: 2 MSW Students Join from Karve Institute of Social Service',
      image: '/images/page_4_img_2_Im1.jpg',
      aspectRatio: 'aspect-4/3',
      tag: currentLang === 'hi' ? 'फील्ड वर्क' : currentLang === 'mr' ? 'क्षेत्रकार्य' : 'Academic Fieldwork',
      date: 'Social Work Internship',
      beneficiaries: currentLang === 'hi' ? '२ एमएसडब्ल्यू छात्र, आंगनवाड़ी कार्यकर्ता एवं स्लम बस्तियों की माताएं।' : currentLang === 'mr' ? '२ एमएसडब्ल्यू पदव्युत्तर विद्यार्थी, अंगणवाडी सेविका व वस्तीतील माता.' : '2 MSW student interns, Anganwadi workers, and community mothers.',
      actionTaken: currentLang === 'hi' ? 'प्रतिष्ठित कर्वे समाज सेवा संस्थान (Karve Institute of Social Service) से २ एमएसडब्ल्यू छात्रों ने आस्था के साथ जुड़कर बस्तियों में घरेलू तनाव स्क्रीनिंग और ज़मीनी फील्ड वर्क का कार्य किया।' : currentLang === 'mr' ? 'प्रतिष्ठित कर्वे समाज सेवा संस्थेतील २ एमएसडब्ल्यू पदव्युत्तर विद्यार्थ्यांनी आस्थासोबत प्रत्यक्ष वस्त्यांमध्ये कौटुंबिक तणाव सर्वेक्षण व क्षेत्रकार्य पूर्ण केले.' : '2 postgraduate MSW social work students from Karve Institute of Social Service joined Aastha on the ground for intensive community casework, domestic screening, and field intervention.',
      partner: 'Karve Institute of Social Service (Pune)'
    },
    {
      id: 'kadepur-womens-day',
      title: currentLang === 'hi' 
        ? 'ग्रामीण महिला समूह एवं मशीन सिलाई स्वावलंबन केंद्र' 
        : currentLang === 'mr' 
        ? 'ग्रामीण महिला गट व शिवणकाम उपजीविका केंद्र' 
        : "Rural Women's Collective & Industrial Sewing Circle",
      image: '/images/kadepur-womens-day.jpg',
      aspectRatio: 'aspect-4/3',
      tag: currentLang === 'hi' ? 'ग्रामीण स्वावलंबन' : currentLang === 'mr' ? 'ग्रामीण स्वावलंबन' : 'Rural Enterprise',
      date: 'Rural Action Cohort',
      beneficiaries: currentLang === 'hi' ? 'ग्रामीण गृहणियां और महिला कारीगर।' : currentLang === 'mr' ? 'ग्रामीण महिला व बचत गट सदस्या.' : 'Rural women homemakers and self-help group members.',
      actionTaken: currentLang === 'hi' ? 'ग्रामीण महिला स्वयं सहायता समूहों के लिए मशीन सिलाई केंद्र और सीधा बाज़ार संपर्क।' : currentLang === 'mr' ? 'ग्रामीण बचत गटांच्या महिलांसाठी शिवणकाम केंद्र व थेट बाजारपेठेशी जोडणी.' : 'Celebrating rural women changemakers and linking sewing machine clusters to steady buyers.',
      partner: 'Gramin Mahila Mandal'
    },
    {
      id: 'wadarwadi-dialogue',
      title: currentLang === 'hi' 
        ? 'ज़मीनी दरी संवाद — घरेलू तनाव व वैवाहिक मध्यस्थता बैठक' 
        : currentLang === 'mr' 
        ? 'जमिनीवरील चटई संवाद — कौटुंबिक समुपदेशन व मध्यस्थता' 
        : 'Grassroots Floor-Mat Dialogue & Domestic Conflict Mediation',
      image: '/images/wadarwadi-pune-founder.jpg',
      aspectRatio: 'aspect-16/10',
      tag: currentLang === 'hi' ? 'घरेलू समाधान' : currentLang === 'mr' ? 'कौटुंबिक संवाद' : 'Domestic Mediation',
      date: 'Weekly Grassroots Circle',
      beneficiaries: currentLang === 'hi' ? 'मजदूर परिवारों की माताएं व किशोरियां।' : currentLang === 'mr' ? 'कष्टकरी महिला व त्यांच्या मुली.' : 'Daily-wage mothers, homemakers, and adolescent daughters.',
      actionTaken: currentLang === 'hi' ? 'दरी पर बैठकर माताओं व बेटियों के साथ घरेलू तनाव सुलझाने व बालिकाओं की शिक्षा पर आत्मीय चर्चा।' : currentLang === 'mr' ? 'चटईवर बसून माता व मुलींशी कौटुंबिक तणाव सोडवणे व शिक्षणावर प्रेमळ संवाद.' : 'Sitting on floor mats with mothers to mediate domestic tensions and resolve marital conflict without stigma.',
      partner: 'Aastha Community Circles'
    },
    {
      id: 'raincoat-blanket-relief',
      title: currentLang === 'hi' 
        ? 'शीतकालीन कंबल, आवश्यक राशन एवं मानवीय सहायता' 
        : currentLang === 'mr' 
        ? 'हिवाळी ब्लँकेट व जीवनावश्यक रेशन वाटप मोहीम' 
        : 'Winter Warmth & Direct Ration Relief Initiative',
      image: '/images/blanket-food-distribution.jpg',
      aspectRatio: 'aspect-4/3',
      tag: currentLang === 'hi' ? 'मानवीय सहायता' : currentLang === 'mr' ? 'मानवतावादी मदत' : 'Humanitarian Relief',
      date: 'Winter Direct Action',
      beneficiaries: currentLang === 'hi' ? 'सड़क किनारे रहने वाले, बुजुर्ग महिलाएं व वंचित परिवार।' : currentLang === 'mr' ? 'पादचारी, निराधार वृद्ध महिला व बाधित कुटुंबे.' : 'Elderly pavement dwellers and seasonal vulnerable families.',
      actionTaken: currentLang === 'hi' ? 'ठंड के मौसम में बेसहारा वृद्ध महिलाओं व वंचित परिवारों को सीधे गर्म कंबल और राशन किट वितरण।' : currentLang === 'mr' ? 'हिवाळ्यात निराधार वृद्ध महिला आणि गरजू कुटुंबांना ब्लँकेट व रेशनचे प्रत्यक्ष वाटप.' : 'Direct distribution of warm fleece blankets and essential grocery kits to vulnerable families.',
      partner: 'Aastha Humanitarian Relief Wing'
    },
    {
      id: 'community-circle',
      title: currentLang === 'hi' 
        ? 'सामुदायिक आत्मविश्वास एवं सुरक्षित अभिव्यक्ति मंडल' 
        : currentLang === 'mr' 
        ? 'आत्मविश्वास वाढवणारे सुरक्षित सामूहिक चर्चा सत्र' 
        : 'Safe Community Expression & Confidence Building Circle',
      image: '/images/community-circle-meeting.jpg',
      aspectRatio: 'aspect-16/10',
      tag: currentLang === 'hi' ? 'आत्मविश्वास' : currentLang === 'mr' ? 'आत्मविश्वास' : 'Self-Worth',
      date: 'Monthly Safe Circle',
      beneficiaries: currentLang === 'hi' ? 'घरेलू महिलाएं जो खुलकर बोलने से डरती थीं।' : currentLang === 'mr' ? 'कौटुंबिक महिला ज्या व्यक्त होण्यास घाबरत होत्या.' : 'Homemakers and isolated women overcoming fear of public expression.',
      actionTaken: currentLang === 'hi' ? 'बिना किसी झिझक के अपनी बात रखने, मानसिक स्वास्थ्य को समझने और पारस्परिक सहारा देने का सुरक्षित मंच।' : currentLang === 'mr' ? 'भीतीमुक्त होऊन स्वतःचे विचार मांडणे आणि मानसिक आरोग्यासाठी सुरक्षित व्यासपीठ.' : 'Non-judgmental group circle facilitating self-worth, mutual bonding, and anxiety release.',
      partner: 'Aastha Community Leadership Team'
    },
    {
      id: 'transgender-support',
      title: currentLang === 'hi' 
        ? 'भेदभाव-रहित संबल एवं समावेशी सामुदायिक सहायता' 
        : currentLang === 'mr' 
        ? 'भेदभावमुक्त व सर्वसमावेशक मानवीय आधार' 
        : 'Non-Discriminatory Care & Inclusive Community Support',
      image: '/images/transgender-community-support.jpg',
      aspectRatio: 'aspect-4/3',
      tag: currentLang === 'hi' ? 'समावेशी संबल' : currentLang === 'mr' ? 'सर्वसमावेशक आधार' : 'Inclusive Care',
      date: 'Solidarity Action',
      beneficiaries: currentLang === 'hi' ? 'सामाजिक रूप से हाशिए पर रहने वाले व्यक्ति व समुदाय।' : currentLang === 'mr' ? 'सामाजिकदृष्ट्या उपेक्षित व्यक्ती व समुदाय.' : 'Socially marginalized community members.',
      actionTaken: currentLang === 'hi' ? 'बिना किसी भेदभाव के राशन किट, गर्म कंबल और आत्मीय संवाद द्वारा हर बहन के साथ खड़े रहना।' : currentLang === 'mr' ? 'कोणताही भेदभाव न करता रेशन, ब्लँकेट वाटप आणि प्रेमळ संवादातून प्रत्येक बहिणीला आधार देणे.' : 'Standing with every marginalized sister through non-discriminatory ration kits and compassionate dialogue.',
      partner: 'Inclusive Care Network'
    },
    {
      id: 'cyda-meeting',
      title: currentLang === 'hi' 
        ? 'सांगली जिले में विस्तार: ज़मीनी अधिकार संबल एवं रणनीतिक सहयोग बैठक' 
        : currentLang === 'mr' 
        ? 'सांगली जिल्ह्यात विस्तार: महिला हक्क व सामाजिक न्यायासाठी धोरणात्मक बैठक' 
        : 'Exploring Sangli District: Grassroots Alliances & Gender Advocacy',
      image: '/images/community-meeting-street.jpg',
      aspectRatio: 'aspect-16/10',
      tag: currentLang === 'hi' ? 'सांगली विस्तार' : currentLang === 'mr' ? 'सांगली विस्तार' : 'Exploring Sangli',
      date: 'Strategic Alliance',
      beneficiaries: currentLang === 'hi' ? 'सांगली जिले के ग्रामीण युवा कार्यकर्ता, स्वयंसेवक और स्थानीय समुदाय प्रेरक।' : currentLang === 'mr' ? 'सांगली जिल्ह्यातील ग्रामीण युवा कार्यकर्ते, स्वयंसेवक आणि स्थानिक महिला संघटक.' : 'Exploring Sangli District clusters, youth volunteers, and local women organizers.',
      actionTaken: currentLang === 'hi' ? 'सांगली जिले में संस्था का विस्तार करते हुए सीवायडीए (CYDA) के साथ मिलकर युवा स्वयंसेवकों और महिला संबल केंद्रों की स्थापना पर रणनीति बनाई गई।' : currentLang === 'mr' ? 'सांगली जिल्ह्यात आस्थाचा विस्तार करत CYDA सोबत मिळून युवा स्वयंसेवक आणि महिला आधार केंद्रांची उभारणी करण्यात आली.' : 'Expanding our geographical footprint into Sangli District through grassroots coordination with CYDA, establishing youth volunteer networks and community crisis intervention points.',
      partner: 'CYDA & Sangli District Grassroots Alliance'
    }
  ], [currentLang]);

  // Smooth Auto-Rotation Timer for Carousel
  useEffect(() => {
    if (!isAutoPlaying || isHovered || selectedStory || displayMode !== 'carousel' || prefersReducedMotion) return;
    
    const count = allStories.length;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % count);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, selectedStory, displayMode, allStories.length, prefersReducedMotion]);

  // Carousel navigation controls
  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + allStories.length) % allStories.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % allStories.length);
  };

  // Touch handlers for swipe support
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndXRef.current = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  return (
    <section 
      id="fieldwork" 
      className="py-16 sm:py-24 bg-[#FCF8F9] relative scroll-mt-20 overflow-hidden text-[#333A36]"
      aria-label="Aastha Fieldwork Gallery"
    >
      {/* Subtle organic ambient gradients */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] rounded-full bg-[#BA5C7B]/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#FB923C]/5 blur-3xl pointer-events-none" />

      {/* Invisible anchor for nav */}
      <div id="how-we-help" className="scroll-mt-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =====================================================================
            1. REFINED EDITORIAL HEADER (Clean, inviting, no clutter)
           ===================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#38152E] font-normal tracking-tight mb-3 leading-snug">
            {strings.heading}
          </h2>

          <p className="text-xs sm:text-sm text-[#333A36]/80 leading-relaxed font-sans font-light max-w-2xl mx-auto">
            {strings.subheading}
          </p>

          {/* View Mode & Auto-Rotate Controls */}
          <div className="mt-5 flex items-center justify-center gap-3 text-xs">
            {/* View Mode Toggle */}
            <div className="inline-flex items-center p-0.5 rounded-full bg-white border border-[#BA5C7B]/35 shadow-2xs">
              <button
                type="button"
                onClick={() => setDisplayMode('carousel')}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  displayMode === 'carousel' ? 'bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#FB923C] text-white shadow-2xs' : 'text-[#333A36]/75 hover:text-[#38152E]'
                }`}
              >
                {strings.viewCarousel}
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('grid')}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  displayMode === 'grid' ? 'bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#FB923C] text-white shadow-2xs' : 'text-[#333A36]/75 hover:text-[#38152E]'
                }`}
              >
                {strings.viewGrid}
              </button>
            </div>

            {/* Auto-Rotate Play/Pause Toggle */}
            {displayMode === 'carousel' && (
              <button
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#BA5C7B]/25 text-[#333A36]/75 hover:text-[#38152E] transition-colors cursor-pointer text-xs"
                title={isAutoPlaying ? strings.pauseRotate : strings.autoRotate}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-[#A03859]" /> : <Play className="w-3.5 h-3.5 text-[#38152E]" />}
                <span>{isAutoPlaying ? strings.pauseRotate : strings.autoRotate}</span>
              </button>
            )}
          </div>

        </div>


        {/* =====================================================================
            2. DISPLAY MODE A: SMOOTH WIDE-LENS ROTATING SHOWCASE (Clear, normal photos)
           ===================================================================== */}
        {displayMode === 'carousel' && (
          <div 
            className="relative select-none py-4 sm:py-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Carousel Stage Container */}
            <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] flex items-center justify-center overflow-hidden">
              
              {allStories.map((story, idx) => {
                let offset = idx - currentIndex;
                const len = allStories.length;
                if (offset < -len / 2) offset += len;
                if (offset > len / 2) offset -= len;

                // Render cards within offset -2 to +2
                const isVisible = Math.abs(offset) <= 2;
                if (!isVisible) return null;

                const isCenter = offset === 0;
                const isAdjacent = Math.abs(offset) === 1;

                return (
                  <div
                    key={story.id}
                    onClick={() => {
                      if (isCenter) {
                        setSelectedStory(story);
                        setShowStoryDrawer(false);
                      } else {
                        setCurrentIndex(idx);
                      }
                    }}
                    className={`absolute rounded-3xl overflow-hidden cursor-pointer select-none transition-all duration-500 ease-out ${
                      isCenter 
                        ? 'z-20 shadow-2xl ring-2 ring-[#BA5C7B]/50 hover:shadow-3xl' 
                        : 'z-10 shadow-lg hover:opacity-100 hover:scale-[0.92]'
                    }`}
                    style={{
                      transform: `translateX(${offset * 75}%) scale(${isCenter ? 1 : isAdjacent ? 0.88 : 0.76})`,
                      width: 'min(90vw, 560px)',
                      height: 'min(70vh, 440px)',
                      opacity: isCenter ? 1 : isAdjacent ? 0.88 : 0.45,
                      transition: 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1), opacity 500ms, filter 500ms',
                    }}
                  >
                    {/* Normal, crystal-clear photograph (no skew, no blur) */}
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gentle gradient for legibility */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity ${
                      isCenter ? 'opacity-90' : 'opacity-70'
                    }`} />

                    {/* Top Tag Badge (No Place Names) */}
                    <div className="absolute top-4 right-4 pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#F43F5E] to-[#FB923C] text-[#FCF8F9] text-[11px] font-sans font-medium uppercase tracking-wider backdrop-blur-xs border border-[#BA5C7B]/40 shadow-xs">
                        {story.tag}
                      </span>
                    </div>

                    {/* Bottom Photograph Details (No Place Names) */}
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                      <h3 className={`font-serif font-normal leading-snug drop-shadow-sm text-white ${
                        isCenter ? 'text-lg sm:text-xl' : 'text-sm sm:text-base line-clamp-2'
                      }`}>
                        {story.title}
                      </h3>

                      {isCenter && (
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-sans text-white/80 font-light">
                            {story.date}
                          </span>

                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F2B3C3] bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs border border-white/10 hover:bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#FB923C] transition-colors">
                            <span>{strings.exploreStory}</span>
                            <Eye className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}

            </div>

            {/* Navigation Controls (Left/Right Arrows + Counter + Dots) */}
            <div className="max-w-2xl mx-auto mt-6 px-4 flex flex-col items-center gap-4">
              
              <div className="flex items-center justify-between w-full max-w-md gap-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-white border border-[#BA5C7B]/35 hover:bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#FB923C] hover:text-white transition-all text-[#38152E] shadow-xs cursor-pointer active:scale-95"
                  aria-label={strings.prev}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="text-center space-y-0.5">
                  <span className="font-mono text-xs font-bold text-[#38152E]">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(allStories.length).padStart(2, '0')}
                  </span>
                  <p className="text-xs font-serif text-[#333A36]/80 line-clamp-1 max-w-[260px]">
                    {allStories[currentIndex]?.title}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="p-3 rounded-full bg-white border border-[#BA5C7B]/35 hover:bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#FB923C] hover:text-white transition-all text-[#38152E] shadow-xs cursor-pointer active:scale-95"
                  aria-label={strings.next}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Interactive Dots for all photos */}
              <div className="flex items-center justify-center gap-1.5 flex-wrap max-w-md">
                {allStories.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      idx === currentIndex 
                        ? 'w-6 h-2 bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#FB923C]' 
                        : 'w-2 h-2 bg-[#BA5C7B]/40 hover:bg-[#BA5C7B]'
                    }`}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>

              <p className="text-[11px] text-[#333A36]/60 font-sans tracking-wide">
                {strings.dragHint}
              </p>

            </div>

          </div>
        )}


        {/* =====================================================================
            3. DISPLAY MODE B: ALL PHOTOS GRID (Documentary Showcase)
           ===================================================================== */}
        {displayMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4 animate-in fade-in duration-300">
            {allStories.map((story) => (
              <div
                key={story.id}
                onClick={() => {
                  setSelectedStory(story);
                  setShowStoryDrawer(false);
                }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-[#BA5C7B]/30 hover:border-[#BA5C7B] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Stage */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/5">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Tag Pill (No Place Names) */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#F43F5E] to-[#FB923C] text-[#FCF8F9] text-[10px] font-mono uppercase tracking-wider backdrop-blur-xs border border-[#BA5C7B]/40">
                      {story.tag}
                    </span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-base font-serif font-normal leading-snug line-clamp-2 group-hover:text-[#F2B3C3] transition-colors">
                      {story.title}
                    </h3>
                  </div>
                </div>

                {/* Bottom Strip */}
                <div className="p-4 flex items-center justify-between text-xs border-t border-[#BA5C7B]/20 bg-white">
                  <span className="text-[#333A36]/65 font-mono text-[11px]">
                    {story.date}
                  </span>

                  <span className="inline-flex items-center gap-1 font-semibold text-[#A03859] group-hover:text-[#38152E] transition-colors">
                    <span>{strings.exploreStory}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}


        {/* =====================================================================
            4. IMMERSIVE PHOTOGRAPH LIGHTBOX & STORY DRAWER (Modal)
           ===================================================================== */}
        {selectedStory && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-label={selectedStory.title}
          >
            {/* Click outside backdrop to close */}
            <div 
              className="absolute inset-0" 
              onClick={() => setSelectedStory(null)} 
            />

            {/* Modal Dialog Card */}
            <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#BA5C7B]/40">
              
              {/* Modal Top Bar (No Place Names) */}
              <div className="px-5 py-3.5 border-b border-[#BA5C7B]/20 flex items-center justify-between bg-[#FCF8F9]">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-[#38152E]">{selectedStory.tag}</span>
                  <span className="text-[#333A36]/40">•</span>
                  <span className="text-[#333A36]/70">{selectedStory.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowStoryDrawer(!showStoryDrawer)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#BA5C7B]/40 text-xs font-semibold text-[#38152E] hover:bg-[#FCF8F9] transition-colors cursor-pointer"
                  >
                    <span>{showStoryDrawer ? 'Hide Details' : 'Discover Story'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showStoryDrawer ? 'rotate-90' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedStory(null)}
                    className="p-1.5 rounded-full hover:bg-black/10 text-[#333A36] transition-colors cursor-pointer"
                    aria-label={strings.close}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body: High-Res Image View + Optional Slide Drawer */}
              <div className="relative flex-1 min-h-[300px] overflow-hidden bg-black/90 flex flex-col md:flex-row items-stretch">
                
                {/* High-Res Photograph Stage */}
                <div className="flex-1 relative flex items-center justify-center p-2 sm:p-4 min-h-[300px]">
                  <img 
                    src={selectedStory.image} 
                    alt={selectedStory.title} 
                    className="max-h-[62vh] max-w-full object-contain rounded-xl shadow-lg"
                  />

                  {/* Prev/Next buttons on image */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const curIdx = allStories.findIndex(s => s.id === selectedStory.id);
                      const prevIdx = (curIdx - 1 + allStories.length) % allStories.length;
                      setSelectedStory(allStories[prevIdx]);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer"
                    aria-label={strings.prev}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const curIdx = allStories.findIndex(s => s.id === selectedStory.id);
                      const nextIdx = (curIdx + 1) % allStories.length;
                      setSelectedStory(allStories[nextIdx]);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer"
                    aria-label={strings.next}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Optional Story Details Drawer */}
                {showStoryDrawer && (
                  <div className="w-full md:w-80 bg-white p-6 overflow-y-auto space-y-4 border-t md:border-t-0 md:border-l border-[#BA5C7B]/30 animate-in slide-in-from-right-3">
                    
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#A03859] block">
                      {selectedStory.tag}
                    </span>

                    <h4 className="text-lg font-serif text-[#38152E] font-normal leading-snug">
                      {selectedStory.title}
                    </h4>

                    {/* What Happened */}
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-[#38152E] block">{strings.actionTaken}</span>
                      <p className="text-[#333A36]/80 font-light leading-relaxed">
                        {selectedStory.actionTaken}
                      </p>
                    </div>

                    {/* Who Was Supported */}
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-[#38152E] block">{strings.beneficiaries}</span>
                      <p className="text-[#333A36]/80 font-light leading-relaxed">
                        {selectedStory.beneficiaries}
                      </p>
                    </div>

                    {/* Partner */}
                    <div className="pt-2 border-t border-[#BA5C7B]/20 text-[11px] text-[#333A36]/70">
                      <span className="font-semibold text-[#38152E]">{strings.partner}: </span>
                      <span>{selectedStory.partner}</span>
                    </div>

                    {/* Action button */}
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedStory(null);
                          onRequestGuidance();
                        }}
                        className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#F43F5E] via-[#FB7185] to-[#FB923C] hover:bg-[#501E42] text-white text-xs font-semibold tracking-wide shadow-xs transition-all cursor-pointer"
                      >
                        {strings.requestSupport}
                      </button>
                    </div>

                  </div>
                )}

              </div>

              {/* Modal Bottom Caption Bar */}
              <div className="p-4 bg-[#FCF8F9] border-t border-[#BA5C7B]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs font-serif text-[#38152E] font-normal text-center sm:text-left line-clamp-1">
                  {selectedStory.title}
                </p>

                <div className="flex items-center gap-2">
                  {!showStoryDrawer && (
                    <button
                      type="button"
                      onClick={() => setShowStoryDrawer(true)}
                      className="text-xs font-semibold text-[#A03859] hover:underline cursor-pointer"
                    >
                      Discover Story →
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
