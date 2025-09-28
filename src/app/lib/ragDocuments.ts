// app/lib/ragDocuments.ts
// Sample company knowledge base for RAG system

export const ragDocuments = {
  plumber: {
    companyName: "Mike's Emergency Plumbing",
    documents: [
      {
        id: "plumber-1",
        category: "services",
        content: `Mike's Emergency Plumbing offers comprehensive plumbing services 24/7. Our services include emergency leak repairs, drain cleaning, pipe replacement, water heater installation and repair, toilet and faucet repairs, sewer line services, garbage disposal installation, bathroom and kitchen remodeling plumbing, water pressure issues, and preventive maintenance. All our plumbers are licensed and insured with minimum 10 years experience.`
      },
      {
        id: "plumber-2",
        category: "pricing",
        content: `Service call fee: $89 (waived with repair). Emergency after-hours: $150 base fee. Drain cleaning: $200-400 depending on severity. Toilet repair: $150-350. Faucet replacement: $200-450. Water heater repair: $250-600. Water heater replacement: $1200-2500. Pipe burst repair: $300-1500. Sewer line repair: $1500-4000. We offer 10% senior discount and military discount. Free estimates for jobs over $500.`
      },
      {
        id: "plumber-3",
        category: "availability",
        content: `Emergency service available 24/7/365 with 45-minute response time guaranteed. Regular service hours Monday-Friday 7AM-8PM, Saturday 8AM-6PM, Sunday 9AM-5PM. Same-day service available for calls before 2PM. We serve all of Dallas-Fort Worth metroplex including Dallas, Fort Worth, Arlington, Plano, Irving, Garland, McKinney, Frisco, and surrounding areas.`
      },
      {
        id: "plumber-4",
        category: "booking",
        content: `To book service: Call our 24/7 hotline, use our online booking system, or chat with our AI assistant. For emergencies, we dispatch immediately. For regular service, we offer morning (8AM-12PM), afternoon (12PM-4PM), or evening (4PM-8PM) time slots. We send SMS confirmations and our plumber calls 30 minutes before arrival. Payment accepted: cash, check, all major credit cards, financing available for repairs over $1000.`
      },
      {
        id: "plumber-5",
        category: "warranty",
        content: `All our work comes with Mike's Golden Guarantee: 1-year warranty on all repairs, 5-year warranty on water heater installations, lifetime warranty on repiping work. If you're not satisfied, we'll make it right or refund your money. We're fully licensed (License #PL-2847563), bonded, and carry $2 million liability insurance.`
      }
    ]
  },
  
  lawfirm: {
    companyName: "Johnson & Associates Law Firm",
    documents: [
      {
        id: "law-1",
        category: "services",
        content: `Johnson & Associates specializes in personal injury law including car accidents, truck accidents, motorcycle accidents, slip and fall, medical malpractice, wrongful death, workplace injuries, product liability, and dog bites. We also handle business litigation, contract disputes, employment law, and insurance bad faith claims. Our team includes 12 attorneys with combined 200+ years experience.`
      },
      {
        id: "law-2",
        category: "pricing",
        content: `Personal injury cases: No fees unless we win (contingency basis 33-40% of settlement). Free initial consultation for all cases. Business litigation: $350-600/hour depending on attorney seniority. Retainer required for hourly cases starting at $5000. Payment plans available. We advance all case costs for personal injury clients including medical records, expert witnesses, and court filing fees.`
      },
      {
        id: "law-3",
        category: "case_evaluation",
        content: `Free case evaluation process: 1) Initial phone screening (15 minutes), 2) Document review and investigation, 3) In-person consultation with attorney, 4) Case value assessment, 5) Strategy development. We only take cases with strong merit and minimum $50,000 potential value. Average settlement for our car accident cases: $125,000. Average time to settlement: 6-12 months.`
      },
      {
        id: "law-4",
        category: "availability",
        content: `Office hours: Monday-Friday 8AM-6PM, Saturday 9AM-1PM for consultations. 24/7 intake for accident victims. Virtual consultations available via Zoom. Hospital and home visits available for severely injured clients. Main office in downtown Dallas with satellite offices in Fort Worth, Plano, and Arlington. Free parking available.`
      },
      {
        id: "law-5",
        category: "credentials",
        content: `Lead attorney John Johnson: Board certified personal injury trial law, Super Lawyers 2018-2024, Multi-Million Dollar Advocates Forum member, AV Preeminent Martindale-Hubbell rating. Firm achievements: $45 million recovered last year, 98% success rate, average 4.9 Google rating from 500+ reviews. Members of American Association for Justice and Texas Trial Lawyers Association.`
      }
    ]
  },
  
  gym: {
    companyName: "Elite Fitness Center",
    documents: [
      {
        id: "gym-1",
        category: "services",
        content: `Elite Fitness offers state-of-the-art equipment, personal training, group fitness classes, nutritional counseling, and specialized programs. Classes include: HIIT, Spin, Yoga, Pilates, Zumba, CrossFit, Boxing, Body Pump, and Aqua Aerobics. Specialized programs: weight loss transformation (12 weeks), strength building, athletic performance, senior fitness, post-rehab training, and competition prep.`
      },
      {
        id: "gym-2",
        category: "pricing",
        content: `Membership options: Basic gym access $49/month, Premium (includes classes) $79/month, VIP all-inclusive $149/month. No enrollment fee this month! Personal training: $75/session, packages available - 5 sessions $350, 10 sessions $650, 20 sessions $1200. Group classes: $25 drop-in or included with Premium. Annual membership special: Pay for 10 months, get 12 months. Student and corporate discounts available 20% off.`
      },
      {
        id: "gym-3",
        category: "trainers",
        content: `Our certified personal trainers: Marcus (strength and powerlifting specialist, 15 years experience), Sarah (HIIT and weight loss expert, certified nutritionist), Mike (bodybuilding and competition prep), Jennifer (yoga and flexibility), David (athletic performance and sports specific), Lisa (senior fitness and rehabilitation). All trainers are CPR certified with nationally recognized certifications.`
      },
      {
        id: "gym-4",
        category: "facilities",
        content: `30,000 sq ft facility with: 100+ cardio machines, full free weight area, 3 group exercise studios, Olympic lifting platform, indoor pool, basketball court, sauna and steam room, juice bar, child care center, locker rooms with towel service. Open 24/7 for Premium and VIP members, 5AM-11PM for Basic members. Free WiFi and phone charging stations throughout.`
      },
      {
        id: "gym-5",
        category: "booking",
        content: `Book training sessions through our app, website, or front desk. Sessions available 6AM-9PM daily. 24-hour cancellation policy. New member special: Free fitness assessment and 2 free personal training sessions. Group classes use reservation system - book up to 7 days in advance. Waitlist available for full classes. Monthly challenges with prizes for members.`
      }
    ]
  },
  
  marketing: {
    companyName: "GrowthMax Digital Marketing",
    documents: [
      {
        id: "marketing-1",
        category: "services",
        content: `GrowthMax Digital provides full-service digital marketing: SEO (technical, on-page, link building), PPC management (Google Ads, Facebook, LinkedIn), social media marketing, content marketing, email automation, conversion rate optimization, marketing analytics, brand strategy, video marketing, influencer partnerships. We specialize in B2B and local service businesses.`
      },
      {
        id: "marketing-2",
        category: "pricing",
        content: `Service packages: Starter $2,500/month (small businesses), Growth $5,000/month (established businesses), Enterprise $10,000+/month (custom solutions). A la carte: SEO audit $1,500, PPC management 15% of ad spend, Social media management $1,500-3,000/month, Content creation $500-2,000/article. Free marketing audit and strategy session for qualified businesses. No long-term contracts, month-to-month available.`
      },
      {
        id: "marketing-3",
        category: "results",
        content: `Average client results: 150% increase in organic traffic within 6 months, 3.5x ROAS on paid advertising, 45% reduction in cost per lead, 200% increase in conversion rates. Case studies: Plumbing company went from 10 to 150 leads/month, Law firm increased cases by 300%, E-commerce store reached $1M revenue in 8 months. All results documented and verified.`
      },
      {
        id: "marketing-4",
        category: "process",
        content: `Our proven process: 1) Free audit and strategy session, 2) Custom marketing plan development, 3) Implementation and campaign launch, 4) Weekly optimization and testing, 5) Monthly reporting and strategy calls. Dedicated account manager for every client. We use advanced tools: SEMrush, Ahrefs, Google Analytics 4, HubSpot, Salesforce integration. Full transparency with real-time dashboard access.`
      },
      {
        id: "marketing-5",
        category: "expertise",
        content: `Team of 25+ specialists including Google Ads certified professionals, Facebook Blueprint certified experts, HubSpot certified consultants. Agency credentials: Google Premier Partner, Facebook Marketing Partner, Bing Ads Accredited. 8 years in business, 200+ successful campaigns, featured in Forbes and Entrepreneur Magazine. CEO is published author on digital marketing strategies.`
      }
    ]
  }
};