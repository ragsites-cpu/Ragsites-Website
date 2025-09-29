// lib/mockData.ts
export const companyData = {
  plumber: {
    companyName: "Mike's Emergency Plumbing",
    description: "Mike's Emergency Plumbing provides 24/7 plumbing services with a 45-minute response time in the Seattle area. Specializing in emergency repairs, drain cleaning, water heater installation, and pipe repairs.",
    services: [
      { name: "Emergency Leak Repair", price: "$150 (waived with repair)", description: "24/7 response for burst pipes and leaks." },
      { name: "Drain Cleaning", price: "$200-$400", description: "Professional drain cleaning for clogs and backups." },
      { name: "Water Heater Installation", price: "$800-$1500", description: "Installation of tankless and traditional water heaters." },
      { name: "Pipe Repair", price: "$250+", description: "Repair for damaged or corroded pipes." }
    ],
    contact: { phone: "555-123-4567", email: "contact@mikesplumbing.com", address: "123 Main St, Seattle, WA" },
    faqs: [
      { question: "What is your response time for emergencies?", answer: "We guarantee a 45-minute response time for emergency calls." },
      { question: "Do you offer free estimates?", answer: "Yes, we provide free estimates for all non-emergency services." }
    ]
  },
  lawfirm: {
    companyName: "Johnson & Associates",
    description: "Johnson & Associates is a Seattle-based law firm specializing in personal injury, car accidents, and wrongful death cases. We work on a contingency basis with no fees unless we win.",
    services: [
      { name: "Car Accident Cases", price: "Contingency (30-40%)", description: "Representation for car accident victims seeking compensation." },
      { name: "Slip and Fall", price: "Contingency (30-40%)", description: "Legal support for injuries due to unsafe premises." },
      { name: "Free Consultation", price: "Free", description: "Initial case evaluation with no obligation." }
    ],
    contact: { phone: "555-987-6543", email: "info@johnsonlaw.com", address: "456 Legal Ave, Seattle, WA" },
    faqs: [
      { question: "What are your fees?", answer: "We work on contingency, meaning no fees unless we win your case." },
      { question: "How long does a case take?", answer: "Case duration varies, but most settle within 6-18 months." }
    ]
  },
  gym: {
    companyName: "Elite Fitness Center",
    description: "Elite Fitness Center offers state-of-the-art gym facilities, group classes, and personal training in Seattle. No enrollment fees this month!",
    services: [
      { name: "Basic Membership", price: "$49/month", description: "Access to gym equipment and locker rooms." },
      { name: "Premium Membership", price: "$79/month", description: "Includes group classes and sauna access." },
      { name: "Personal Training", price: "$75/session", description: "One-on-one training with certified coaches." },
      { name: "Free Trial", price: "Free", description: "One-day trial pass to experience our facilities." }
    ],
    contact: { phone: "555-456-7890", email: "info@elitefitness.com", address: "789 Fit St, Seattle, WA" },
    faqs: [
      { question: "What classes do you offer?", answer: "We offer yoga, spin, HIIT, and Zumba classes weekly." },
      { question: "Is there a contract?", answer: "No long-term contracts; memberships are month-to-month." }
    ]
  },
  marketing: {
    companyName: "GrowthMax Digital",
    description: "GrowthMax Digital provides SEO, PPC, social media marketing, and content creation for businesses in Seattle. Average 3.5x ROAS for clients.",
    services: [
      { name: "SEO Services", price: "$2500+/month", description: "Search engine optimization to boost organic rankings." },
      { name: "PPC Advertising", price: "$3000+/month", description: "Targeted pay-per-click campaigns for immediate leads." },
      { name: "Social Media Marketing", price: "$2000+/month", description: "Engaging social media strategies across platforms." },
      { name: "Free Audit", price: "Free", description: "Comprehensive marketing audit to identify opportunities." }
    ],
    contact: { phone: "555-321-9876", email: "sales@growthmax.com", address: "321 Market St, Seattle, WA" },
    faqs: [
      { question: "What is your average ROAS?", answer: "Our clients see an average return on ad spend of 3.5x." },
      { question: "How long does SEO take?", answer: "Significant SEO results typically appear within 3-6 months." }
    ]
  }
};