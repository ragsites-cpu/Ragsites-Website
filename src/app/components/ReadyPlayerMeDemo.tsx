// CompactVoiceDemo.tsx - Preserving all original voice functionality
'use client';
import { useState, useEffect, useRef } from 'react';

export default function CompactVoiceDemo() {
  const [selectedIndustry, setSelectedIndustry] = useState<'plumber' | 'lawfirm' | 'gym' | 'marketing'>('plumber');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<'aria' | 'customer' | null>(null);
  const [voiceBars, setVoiceBars] = useState(Array(8).fill(10));
  const [isLoading, setIsLoading] = useState(false);
  const animationRef = useRef<number>(2124673354);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Industry-specific configurations with proper typing
  interface IndustryConfig {
    title: string;
    subtitle: string;
    icon: string;
    color: 'blue' | 'emerald' | 'rose' | 'orange';
    problem: string;
    solution: string;
    customerName: string;
    customerBusiness: string;
    agentName: string;
    conversationSteps: ConversationStep[];
  }

  interface ConversationStep {
    title: string;
    subtitle: string;
    speaker: 'aria' | 'customer';
    message: string;
    voiceText: string;
    emotion: string;
    voiceSettings: {
      stability: number;
      similarity_boost: number;
      style: number;
    };
  }

  const industries: Record<'plumber' | 'lawfirm' | 'gym' | 'marketing', IndustryConfig> = {
    plumber: {
      title: "AI for Plumbers",
      subtitle: "Never miss emergency calls",
      icon: "🔧",
      color: "blue",
      problem: "Missing calls = losing $200-500 jobs",
      solution: "24/7 AI books emergency calls instantly",
      customerName: "Mike",
      customerBusiness: "emergency plumbing",
      agentName: "PlumberAI",
      conversationSteps: [
        {
          title: "Meet Your Plumbing AI",
          subtitle: "Never miss another emergency call",
          speaker: "aria",
          message: "Hi! I'm PlumberAI, your 24/7 emergency call assistant. I book plumbing jobs even when you're under a sink or sleeping.",
          voiceText: "Hello! I'm PlumberAI, your twenty-four seven emergency call assistant. I book plumbing jobs even when you're under a sink or sleeping.",
          emotion: "professional",
          voiceSettings: { stability: 0.7, similarity_boost: 0.8, style: 0.4 }
        },
        {
          title: "Emergency Call Comes In",
          subtitle: "Customer has urgent plumbing issue",
          speaker: "customer",
          message: "Help! My basement is flooding! Water is everywhere and I need a plumber RIGHT NOW. Can someone come out tonight?",
          voiceText: "Help! My basement is flooding! Water is everywhere and I need a plumber RIGHT NOW. Can someone come out tonight?",
          emotion: "urgent",
          voiceSettings: { stability: 0.3, similarity_boost: 0.7, style: 0.8 }
        },
        {
          title: "AI Handles Emergency",
          subtitle: "PlumberAI responds immediately",
          speaker: "aria",
          message: "I understand this is an emergency! Mike's Emergency Plumbing can have someone there within 45 minutes. What's your address and phone number?",
          voiceText: "I understand this is an emergency! Mike's Emergency Plumbing can have someone there within forty-five minutes.",
          emotion: "reassuring",
          voiceSettings: { stability: 0.6, similarity_boost: 0.8, style: 0.6 }
        },
        {
          title: "Job Secured",
          subtitle: "$400 emergency job booked automatically",
          speaker: "customer",
          message: "Perfect! Thank you so much. I'll be waiting and have cash ready. You just saved my basement!",
          voiceText: "Perfect! Thank you so much. I'll be waiting and have cash ready. You just saved my basement!",
          emotion: "grateful",
          voiceSettings: { stability: 0.2, similarity_boost: 0.8, style: 0.7 }
        }
      ]
    },
    lawfirm: {
      title: "AI for Law Firms",
      subtitle: "Pre-qualify high-value cases",
      icon: "⚖️",
      color: "emerald",
      problem: "Unqualified leads waste 30% of time",
      solution: "AI screens for $50k+ cases only",
      customerName: "Jennifer",
      customerBusiness: "personal injury case",
      agentName: "LegalAI",
      conversationSteps: [
        {
          title: "Meet Your Legal AI",
          subtitle: "Pre-qualify cases automatically",
          speaker: "aria",
          message: "Hello! I'm LegalAI for Johnson & Associates. I help determine if we can take your case before scheduling a consultation.",
          voiceText: "Hello! I'm LegalAI for Johnson and Associates. I help determine if we can take your case before scheduling a consultation.",
          emotion: "professional",
          voiceSettings: { stability: 0.8, similarity_boost: 0.8, style: 0.3 }
        },
        {
          title: "Potential Client Inquiry",
          subtitle: "Someone needs legal help",
          speaker: "customer",
          message: "Hi, I was in a car accident last month and the other driver's insurance is lowballing me. Do you think I have a case?",
          voiceText: "Hi, I was in a car accident last month and the other driver's insurance is lowballing me. Do you think I have a case?",
          emotion: "concerned",
          voiceSettings: { stability: 0.6, similarity_boost: 0.7, style: 0.4 }
        },
        {
          title: "AI Qualifies the Case",
          subtitle: "Gathers key information",
          speaker: "aria",
          message: "I can help assess that. Were you injured and did you receive medical treatment? Also, was the other driver clearly at fault?",
          voiceText: "I can help assess that. Were you injured and did you receive medical treatment? Also, was the other driver clearly at fault?",
          emotion: "analytical",
          voiceSettings: { stability: 0.7, similarity_boost: 0.8, style: 0.4 }
        },
        {
          title: "High-Value Client Secured",
          subtitle: "Potential $50K+ case booked",
          speaker: "customer",
          message: "That's perfect! I've been so stressed about this. Thank you for taking the time to understand my situation.",
          voiceText: "That's perfect! I've been so stressed about this. Thank you for taking the time to understand my situation.",
          emotion: "relieved",
          voiceSettings: { stability: 0.3, similarity_boost: 0.8, style: 0.7 }
        }
      ]
    },
    gym: {
      title: "AI for Gyms",
      subtitle: "Fill empty slots automatically",
      icon: "💪",
      color: "rose",
      problem: "Empty slots = lost revenue daily",
      solution: "AI fills cancellations instantly",
      customerName: "Sarah",
      customerBusiness: "training session",
      agentName: "FitBooker",
      conversationSteps: [
        {
          title: "Meet Your Booking AI",
          subtitle: "Fill every empty slot automatically",
          speaker: "aria",
          message: "Hi! I'm FitBooker for Elite Fitness. I help fill last-minute cancellations and book new training sessions 24/7.",
          voiceText: "Hi! I'm FitBooker for Elite Fitness. I help fill last-minute cancellations and book new training sessions twenty-four seven.",
          emotion: "energetic",
          voiceSettings: { stability: 0.6, similarity_boost: 0.8, style: 0.6 }
        },
        {
          title: "Last-Minute Booking Request",
          subtitle: "Customer wants immediate session",
          speaker: "customer",
          message: "Hey! I know this is short notice, but do you have any personal training slots available today? I just got off work early and want to squeeze in a workout.",
          voiceText: "Hey! I know this is short notice, but do you have any personal training slots available today? I just got off work early and want to squeeze in a workout.",
          emotion: "hopeful",
          voiceSettings: { stability: 0.4, similarity_boost: 0.7, style: 0.7 }
        },
        {
          title: "AI Finds Opening",
          subtitle: "Matches customer with trainer",
          speaker: "aria",
          message: "Perfect timing! We just had a cancellation. Trainer Marcus has a 6 PM slot open today. Would you like upper body, lower body, or full body workout?",
          voiceText: "Perfect timing! We just had a cancellation. Trainer Marcus has a 6 PM slot open today. Would you like upper body, lower body, or full body workout?",
          emotion: "helpful",
          voiceSettings: { stability: 0.6, similarity_boost: 0.8, style: 0.5 }
        },
        {
          title: "Session Secured",
          subtitle: "Empty slot filled = $75 revenue",
          speaker: "customer",
          message: "Perfect! I'm so pumped for this workout. Thanks for fitting me in on such short notice!",
          voiceText: "Perfect! I'm so pumped for this workout. Thanks for fitting me in on such short notice!",
          emotion: "grateful",
          voiceSettings: { stability: 0.2, similarity_boost: 0.8, style: 0.9 }
        }
      ]
    },
    marketing: {
      title: "AI for Marketing",
      subtitle: "Convert website visitors instantly",
      icon: "📈",
      color: "orange",
      problem: "95% of visitors leave without converting",
      solution: "AI captures leads 24/7 automatically",
      customerName: "Jessica",
      customerBusiness: "marketing consultation",
      agentName: "MarketingAI",
      conversationSteps: [
        {
          title: "Meet Your Marketing AI",
          subtitle: "Convert visitors into leads automatically",
          speaker: "aria",
          message: "Hi! I'm MarketingAI for your website. I help convert visitors into qualified leads and book consultations 24/7.",
          voiceText: "Hi! I'm MarketingAI for your website. I help convert visitors into qualified leads and book consultations twenty-four seven.",
          emotion: "professional",
          voiceSettings: { stability: 0.7, similarity_boost: 0.8, style: 0.4 }
        },
        {
          title: "Visitor Inquiry",
          subtitle: "Business owner needs marketing help",
          speaker: "customer",
          message: "Hi, I'm struggling with lead generation for my business. My current marketing isn't working. Can you help?",
          voiceText: "Hi, I'm struggling with lead generation for my business. My current marketing isn't working. Can you help?",
          emotion: "frustrated",
          voiceSettings: { stability: 0.5, similarity_boost: 0.7, style: 0.6 }
        },
        {
          title: "AI Qualifies Lead",
          subtitle: "Gathers business information",
          speaker: "aria",
          message: "I can definitely help! What's your business type and current monthly marketing budget? This helps me recommend the best strategy.",
          voiceText: "I can definitely help! What's your business type and current monthly marketing budget? This helps me recommend the best strategy.",
          emotion: "helpful",
          voiceSettings: { stability: 0.6, similarity_boost: 0.8, style: 0.5 }
        },
        {
          title: "Lead Provides Details",
          subtitle: "Qualified prospect with budget",
          speaker: "customer",
          message: "I run a local service business and I'm spending about $3,000 monthly on ads with poor results. I need better ROI.",
          voiceText: "I run a local service business and I'm spending about three thousand dollars monthly on ads with poor results. I need better ROI.",
          emotion: "concerned",
          voiceSettings: { stability: 0.4, similarity_boost: 0.7, style: 0.5 }
        },
        {
          title: "AI Books Consultation",
          subtitle: "High-value lead secured",
          speaker: "aria",
          message: "Perfect! With that budget, we can definitely improve your ROI. I'm booking you a free strategy session tomorrow at 2 PM to create a custom plan.",
          voiceText: "Perfect! With that budget, we can definitely improve your ROI. I'm booking you a free strategy session tomorrow at 2 PM to create a custom plan.",
          emotion: "confident",
          voiceSettings: { stability: 0.7, similarity_boost: 0.8, style: 0.6 }
        },
        {
          title: "Consultation Secured",
          subtitle: "Potential $5K+ monthly client booked",
          speaker: "customer",
          message: "That sounds great! I'm excited to finally get marketing that works. Thank you for the quick response!",
          voiceText: "That sounds great! I'm excited to finally get marketing that works. Thank you for the quick response!",
          emotion: "excited",
          voiceSettings: { stability: 0.3, similarity_boost: 0.8, style: 0.8 }
        }
      ]
    }
  };

  // ElevenLabs Configuration (PRESERVED FROM ORIGINAL)
  const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || 'YOUR_API_KEY_HERE';
  const VOICES = {
    aria: 'EXAVITQu4vr4xnSDxMaL',
    customer: 'jBpfuIE2acCO8z3wKNLl',
  };

  const currentIndustry = industries[selectedIndustry];
  const conversationSteps = currentIndustry.conversationSteps;

  // Voice functions (PRESERVED FROM ORIGINAL)
  const speakWithElevenLabs = async (text: string, speaker: 'aria' | 'customer', voiceSettings: any) => {
    if (!ELEVENLABS_API_KEY || ELEVENLABS_API_KEY === 'YOUR_API_KEY_HERE') {
      return speakFallback(text, speaker);
    }

    setIsLoading(true);
    setIsSpeaking(true);
    setCurrentSpeaker(speaker);

    try {
      const voiceId = VOICES[speaker];
      
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_turbo_v2",
          voice_settings: voiceSettings
        })
      });

      if (!response.ok) {
        throw new Error('ElevenLabs API error');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      audioRef.current = new Audio(audioUrl);
      
      return new Promise<void>((resolve) => {
        if (audioRef.current) {
          audioRef.current.onended = () => {
            setIsSpeaking(false);
            setCurrentSpeaker(null);
            setVoiceBars(Array(8).fill(10));
            setIsLoading(false);
            URL.revokeObjectURL(audioUrl);
            resolve();
          };
          
          audioRef.current.onerror = () => {
            console.error('Audio playback error');
            setIsSpeaking(false);
            setCurrentSpeaker(null);
            setVoiceBars(Array(8).fill(10));
            setIsLoading(false);
            resolve();
          };
          
          audioRef.current.play();
          setIsLoading(false);
          animateVoiceBars();
        }
      });
    } catch (error) {
      console.error('ElevenLabs error:', error);
      setIsLoading(false);
      return speakFallback(text, speaker);
    }
  };

  const speakFallback = (text: string, speaker: 'aria' | 'customer') => {
    setIsSpeaking(true);
    setCurrentSpeaker(speaker);
    
    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = speechSynthesis.getVoices();
      
      if (speaker === 'aria') {
        const ariaVoice = voices.find(voice => 
          voice.lang.startsWith('en') && 
          voice.name.toLowerCase().includes('female')
        );
        if (ariaVoice) utterance.voice = ariaVoice;
        utterance.rate = 0.9;
        utterance.pitch = 1.15;
      } else {
        const customerVoice = voices.find(voice => 
          voice.lang.startsWith('en') && 
          voice.name.toLowerCase().includes('samantha')
        );
        if (customerVoice) utterance.voice = customerVoice;
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
      }
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentSpeaker(null);
        setVoiceBars(Array(8).fill(10));
        resolve();
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentSpeaker(null);
        setVoiceBars(Array(8).fill(10));
        resolve();
      };
      
      speechSynthesis.speak(utterance);
      animateVoiceBars();
    });
  };

  const animateVoiceBars = () => {
    const animate = () => {
      if (isSpeaking) {
        const newBars = Array(8).fill(0).map((_, i) => {
          const baseHeight = 15;
          const waveHeight = Math.sin(Date.now() * 0.01 + i * 0.8) * 25;
          const randomVariation = Math.random() * 30;
          return Math.max(baseHeight, baseHeight + waveHeight + randomVariation);
        });
        setVoiceBars(newBars);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setVoiceBars(Array(8).fill(15));
      }
    };
    animate();
  };

  // Auto-play logic (PRESERVED FROM ORIGINAL)
  useEffect(() => {
    if (isPlaying) {
      const playStep = async () => {
        const step = conversationSteps[currentStep];
        
        await new Promise(resolve => setTimeout(resolve, 800));
        await speakWithElevenLabs(step.voiceText, step.speaker as 'aria' | 'customer', step.voiceSettings);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (currentStep < conversationSteps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
          setCurrentStep(0);
        }
      };
      
      playStep();
    }
  }, [isPlaying, currentStep, selectedIndustry]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsSpeaking(false);
    setCurrentSpeaker(null);
  }, [selectedIndustry]);

  const startDemo = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const playCurrentStep = () => {
    const step = conversationSteps[currentStep];
    speakWithElevenLabs(step.voiceText, step.speaker as 'aria' | 'customer', step.voiceSettings);
  };

  const currentStepData = conversationSteps[currentStep];
  
  const getColorClasses = (color: 'blue' | 'emerald' | 'rose' | 'orange') => {
    const colorMap = {
      blue: {
        bg: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
        border: 'border-blue-200/50 dark:border-blue-800/50',
        text: 'text-blue-600 dark:text-blue-400',
        gradient: 'from-blue-500 to-indigo-500'
      },
      emerald: {
        bg: 'from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20',
        border: 'border-emerald-200/50 dark:border-emerald-800/50',
        text: 'text-emerald-600 dark:text-emerald-400',
        gradient: 'from-emerald-500 to-green-500'
      },
      rose: {
        bg: 'from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20',
        border: 'border-rose-200/50 dark:border-rose-800/50',
        text: 'text-rose-600 dark:text-rose-400',
        gradient: 'from-rose-500 to-pink-500'
      },
      orange: {
        bg: 'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20',
        border: 'border-orange-200/50 dark:border-orange-800/50',
        text: 'text-orange-600 dark:text-orange-400',
        gradient: 'from-orange-500 to-red-500'
      }
    };
    return colorMap[color];
  };

  const colorClasses = getColorClasses(currentIndustry.color);

  return (
    <div className="h-[500px] flex flex-col overflow-hidden p-4">
      {/* Compact Header */}
      <div className="text-center mb-2 flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          AI Voice Agents Built for Your Industry
        </h2>
        
        {/* Industry Selector - Extra Compact */}
        <div className="grid grid-cols-4 gap-1 max-w-xl mx-auto mb-2">
          {Object.entries(industries).map(([key, industry]) => (
            <button
              key={key}
              onClick={() => setSelectedIndustry(key as 'plumber' | 'lawfirm' | 'gym' | 'marketing')}
              disabled={isPlaying}
              className={`p-1.5 rounded-md border transition-all duration-300 text-xs ${
                selectedIndustry === key
                  ? `bg-gradient-to-r ${getColorClasses(industry.color).bg} ${getColorClasses(industry.color).border} shadow-md`
                  : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:shadow-sm'
              } ${isPlaying ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              <div className="text-base mb-0.5">{industry.icon}</div>
              <div className={`font-medium text-xs ${selectedIndustry === key ? getColorClasses(industry.color).text : 'text-gray-900 dark:text-white'}`}>
                {industry.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Ultra Compact Layout */}
      <div className="flex-1 grid grid-cols-5 gap-2 min-h-0">
        
        {/* Left: Voice Visualizer - 2 columns */}
        <div className="col-span-2 flex flex-col min-h-0">
          <div className={`bg-gradient-to-r ${colorClasses.bg} backdrop-blur-sm rounded-lg p-2 border ${colorClasses.border} flex-1 flex flex-col min-h-0`}>
            
            {/* Voice Bars - Ultra Compact */}
            <div className="flex-1 flex items-center justify-center min-h-[60px]">
              <div className="flex items-end space-x-0.5 h-12">
                {voiceBars.map((height, i) => (
                  <div
                    key={i}
                    className={`transition-all duration-150 ease-out rounded-full relative ${
                      currentSpeaker === 'aria' && isSpeaking
                        ? `bg-gradient-to-t ${colorClasses.gradient} shadow-md`
                        : currentSpeaker === 'customer' && isSpeaking
                        ? 'bg-gradient-to-t from-green-500 to-teal-500 shadow-md'
                        : 'bg-gradient-to-t from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700'
                    }`}
                    style={{
                      height: `${Math.max(height * 0.4, 6)}px`,
                      width: '3px',
                      minHeight: '6px'
                    }}
                  >
                    {isSpeaking && (
                      <div className={`absolute inset-0 rounded-full blur-sm ${
                        currentSpeaker === 'aria'
                          ? `bg-gradient-to-t ${colorClasses.gradient}`
                          : 'bg-gradient-to-t from-green-400 to-teal-400'
                      } opacity-50`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Speaker Status - Ultra Compact */}
            <div className="text-center mt-1 flex-shrink-0">
              <div className={`inline-flex items-center px-1.5 py-0.5 rounded-full mb-1 text-xs ${
                isLoading
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  : currentSpeaker === 'aria' && isSpeaking
                  ? `bg-gradient-to-r ${colorClasses.bg} ${colorClasses.text}`
                  : currentSpeaker === 'customer' && isSpeaking
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }`}>
                <div className={`w-1 h-1 rounded-full mr-1 ${
                  isLoading ? 'animate-spin' : isSpeaking ? 'animate-pulse' : ''
                } ${
                  isLoading ? 'bg-yellow-500' :
                  currentSpeaker === 'aria' && isSpeaking ? colorClasses.text.replace('text-', 'bg-') :
                  currentSpeaker === 'customer' && isSpeaking ? 'bg-green-500' :
                  'bg-gray-400'
                }`}></div>
                <span className="font-medium text-xs">
                  {isLoading && 'Generating...'}
                  {!isLoading && currentSpeaker === 'aria' && isSpeaking && `${currentIndustry.agentName}`}
                  {!isLoading && currentSpeaker === 'customer' && isSpeaking && 'Customer'}
                  {!isLoading && !isSpeaking && 'Ready'}
                </span>
              </div>

              <button
                onClick={startDemo}
                disabled={isPlaying}
                className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 w-full mb-1 ${
                  isPlaying
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : `bg-gradient-to-r ${colorClasses.gradient} text-white hover:shadow-lg`
                }`}
              >
                {isPlaying ? 'Playing...' : `▶ Start Demo`}
              </button>

              <button
                onClick={playCurrentStep}
                disabled={isSpeaking || isLoading}
                className={`px-2 py-1 rounded-md font-medium text-xs transition-all duration-200 w-full ${
                  isSpeaking || isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : `bg-gradient-to-r ${colorClasses.bg} ${colorClasses.text} hover:shadow-md`
                }`}
              >
                {isLoading ? 'Gen...' : isSpeaking ? 'Speaking...' : '🔊 Play'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Conversation - 3 columns */}
        <div className="col-span-3 flex flex-col min-h-0">
          <div className={`bg-gradient-to-r ${colorClasses.bg} backdrop-blur-sm rounded-lg p-2 border ${colorClasses.border} flex flex-col h-full min-h-0`}>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-xs flex items-center flex-shrink-0">
              📞 Live {currentIndustry.customerBusiness} Call
              {isSpeaking && <span className="ml-1 w-1 h-1 bg-red-400 rounded-full animate-pulse"></span>}
            </h4>
            
            <div className="flex-1 space-y-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
              {conversationSteps.slice(0, currentStep + 1).map((step: ConversationStep, i: number) => (
                <div key={i} className={`flex items-start space-x-1 ${
                  i === currentStep && (isSpeaking || isLoading) ? 'animate-pulse' : ''
                }`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                    step.speaker === 'aria' 
                      ? `bg-gradient-to-r ${colorClasses.gradient}`
                      : 'bg-gradient-to-r from-green-500 to-teal-500'
                  }`}>
                    <span className="text-white text-xs">
                      {step.speaker === 'aria' ? currentIndustry.icon : '👤'}
                    </span>
                  </div>
                  <div className={`rounded-md p-1.5 flex-1 min-w-0 text-xs ${
                    step.speaker === 'aria'
                      ? `bg-gradient-to-r ${colorClasses.bg}`
                      : 'bg-green-50 dark:bg-green-950/20'
                  }`}>
                    <div className="flex items-center justify-between mb-0.5 gap-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate">
                        {step.speaker === 'aria' ? `${currentIndustry.agentName}` : `${currentIndustry.customerName}`}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 bg-white/50 dark:bg-gray-800/50 px-1 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                        {step.emotion}
                      </div>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 leading-tight break-words text-xs">{step.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Success Message */}
            {currentStep === conversationSteps.length - 1 && (
              <div className="mt-1 p-1.5 bg-green-50 dark:bg-green-950/30 rounded-md border border-green-200/50 dark:border-green-800/50 text-center flex-shrink-0">
                <div className="text-sm mb-0.5">{currentIndustry.icon}</div>
                <h5 className="font-bold text-gray-900 dark:text-white text-xs mb-0.5">
                  Success! {selectedIndustry === 'plumber' && '$400 Job Booked'}
                  {selectedIndustry === 'lawfirm' && '$50k+ Case Qualified'}
                  {selectedIndustry === 'gym' && '$75 Session Booked'}
                  {selectedIndustry === 'marketing' && '$5K+ Client Booked'}
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  AI converted call to revenue automatically
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Stats - Ultra Compact */}
      <div className="mt-2 grid grid-cols-3 gap-1 text-xs flex-shrink-0">
        <div className={`p-1.5 bg-gradient-to-r ${colorClasses.bg} rounded-md border ${colorClasses.border} text-center`}>
          <div className={`${colorClasses.text} font-medium text-xs`}>Problem</div>
          <div className="font-bold text-gray-900 dark:text-white text-xs leading-tight">{currentIndustry.problem}</div>
        </div>
        <div className="p-1.5 bg-green-50 dark:bg-green-950/20 rounded-md border border-green-200/50 dark:border-green-800/50 text-center">
          <div className="text-green-600 dark:text-green-400 font-medium text-xs">Solution</div>
          <div className="font-bold text-gray-900 dark:text-white text-xs leading-tight">{currentIndustry.solution}</div>
        </div>
        <div className="p-1.5 bg-purple-50 dark:bg-purple-950/20 rounded-md border border-purple-200/50 dark:border-purple-800/50 text-center">
          <div className="text-purple-600 dark:text-purple-400 font-medium text-xs">Revenue</div>
          <div className="font-bold text-gray-900 dark:text-white text-xs">
            {selectedIndustry === 'plumber' && '$400'}
            {selectedIndustry === 'lawfirm' && '$50k+'}
            {selectedIndustry === 'gym' && '$75'}
            {selectedIndustry === 'marketing' && '$5K+'}
          </div>
        </div>
      </div>
    </div>
  );
}