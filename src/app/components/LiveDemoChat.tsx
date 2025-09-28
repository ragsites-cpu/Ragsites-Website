// LiveDemoChat.tsx with Gemini RAG Integration
'use client';
import { useState, useEffect, useRef } from 'react';

type Msg = { 
  id: string; 
  from: 'user' | 'bot'; 
  text: string; 
  timestamp: Date; 
  industry?: string;
  sources?: string[];
};

export default function LiveDemoChatWithRAG() {
  const [selectedIndustry, setSelectedIndustry] = useState<'plumber' | 'lawfirm' | 'gym' | 'marketing'>('plumber');
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Industry configurations
  const industries = {
    plumber: {
      title: "Plumber Chat",
      icon: "🔧",
      color: "blue",
      companyName: "Mike's Emergency Plumbing",
      welcomeMsg: "Hi! I'm the AI assistant for Mike's Emergency Plumbing. I can help you with plumbing questions, emergency services, pricing, and booking appointments. We offer 24/7 emergency service with 45-minute response time. How can I help you today?",
      suggestions: ["emergency leak", "pricing for drain cleaning", "book a service", "water heater repair"]
    },
    lawfirm: {
      title: "Law Firm Chat", 
      icon: "⚖️",
      color: "emerald",
      companyName: "Johnson & Associates",
      welcomeMsg: "Hello! I'm the AI assistant for Johnson & Associates Law Firm. I can help answer questions about our legal services, schedule consultations, and provide information about our personal injury cases. We work on contingency with no fees unless we win. How can I assist with your legal matter?",
      suggestions: ["car accident case", "free consultation", "case evaluation", "attorney credentials"]
    },
    gym: {
      title: "Gym Chat",
      icon: "💪", 
      color: "rose",
      companyName: "Elite Fitness Center",
      welcomeMsg: "Hey! Welcome to Elite Fitness Center's AI assistant. I can help with membership information, class schedules, personal training, and booking. We have a special this month - no enrollment fees! How can I help you reach your fitness goals?",
      suggestions: ["membership pricing", "personal training", "class schedule", "free trial"]
    },
    marketing: {
      title: "Marketing Chat",
      icon: "📈",
      color: "orange",
      companyName: "GrowthMax Digital",
      welcomeMsg: "Hi! I'm the AI assistant for GrowthMax Digital Marketing. I can help with questions about our services, pricing packages, case studies, and booking strategy sessions. We help businesses grow with proven digital strategies and average 3.5x ROAS. What marketing challenges can I help solve?",
      suggestions: ["SEO services", "pricing packages", "case studies", "free audit"]
    }
  };

  const currentIndustry = industries[selectedIndustry];

  // Initialize with welcome message
  useEffect(() => {
    setMsgs([{
      id: 'm1',
      from: 'bot',
      text: currentIndustry.welcomeMsg,
      timestamp: new Date(),
      industry: selectedIndustry
    }]);
  }, [selectedIndustry]);

  // Industry change handler
  const handleIndustryChange = (industry: typeof selectedIndustry) => {
    setSelectedIndustry(industry);
    setInput('');
  };

  // Enhanced greeting detection
  const isGreeting = (message: string) => {
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'];
    const msg = message.toLowerCase().trim();
    return greetings.some(greeting => 
      msg === greeting || 
      msg.startsWith(greeting + ' ') || 
      msg.startsWith(greeting + '!')
    );
  };

  // Generate contextual greeting response
  const generateGreetingResponse = () => {
    const responses = {
      plumber: `Hello! Great to chat with you. I'm here to help with any plumbing questions or services you need from ${currentIndustry.companyName}. Whether it's an emergency repair, routine maintenance, or just getting pricing information, I can assist you. What can I help you with today?`,
      lawfirm: `Hello! Nice to meet you. I'm here to help with any legal questions about ${currentIndustry.companyName}. I can provide information about our services, schedule a free consultation, or help determine if we can assist with your case. What brings you here today?`,
      gym: `Hey there! Welcome! I'm excited to help you with ${currentIndustry.companyName}. Whether you're looking to start your fitness journey, learn about our classes, or get membership details, I'm here to help. What fitness goals are you working towards?`,
      marketing: `Hi! Great to connect with you. I'm here to help with ${currentIndustry.companyName} and all your digital marketing needs. Whether you want to learn about our services, see case studies, or book a strategy session, I can guide you. What marketing challenges are you facing?`
    };
    return responses[selectedIndustry];
  };

  // Send message to Gemini RAG API
  async function send() {
    if (!input.trim() || loading) return;
    
    const userMsg: Msg = { 
      id: crypto.randomUUID(), 
      from: 'user', 
      text: input,
      timestamp: new Date()
    };
    
    setMsgs((m) => [...m, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      // Check if it's a greeting and handle locally for better UX
      if (isGreeting(currentInput)) {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate thinking
        
        const botMsg: Msg = { 
          id: crypto.randomUUID(), 
          from: 'bot', 
          text: generateGreetingResponse(),
          timestamp: new Date(),
          industry: selectedIndustry
        };
        
        setMsgs((m) => [...m, botMsg]);
        setLoading(false);
        setIsTyping(false);
        return;
      }

      const response = await fetch('/api/chat-rag', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          message: currentInput,
          industry: selectedIndustry
        })
      });

      let data;
      
      // More robust response handling
      try {
        const responseText = await response.text();
        
        if (!responseText) {
          throw new Error("Empty response from server");
        }

        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          console.error('Response text:', responseText);
          throw new Error("Server returned invalid JSON");
        }
      } catch (textError) {
        console.error('Error reading response:', textError);
        throw new Error("Failed to read server response");
      }
      
      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      // Simulate typing delay for realism
      await new Promise(resolve => setTimeout(resolve, 500));

      const botMsg: Msg = { 
        id: crypto.randomUUID(), 
        from: 'bot', 
        text: data.reply || "I received your message but couldn't generate a proper response. Can you try rephrasing your question?",
        timestamp: new Date(),
        industry: selectedIndustry,
        sources: data.sources
      };
      
      setMsgs((m) => [...m, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Enhanced fallback response
      await new Promise(resolve => setTimeout(resolve, 500));
      const fallbackResponse = generateFallbackResponse(currentInput);
      setMsgs((m) => [...m, { 
        id: crypto.randomUUID(), 
        from: 'bot', 
        text: fallbackResponse,
        timestamp: new Date(),
        industry: selectedIndustry
      }]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  }

  // Enhanced fallback response generator
  const generateFallbackResponse = (message: string) => {
    const msg = message.toLowerCase();
    const industry = currentIndustry;
    
    // Handle greetings
    if (isGreeting(message)) {
      return generateGreetingResponse();
    }
    
    // Simulated responses based on keywords
    if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
      const prices = {
        plumber: "Service calls start at $89 (waived with repair). Emergency calls are $150. Drain cleaning runs $200-400 depending on severity. Would you like me to schedule an estimate for your specific needs?",
        lawfirm: "We work on contingency for personal injury cases - no fees unless we win your case. Initial consultations are always free. Would you like me to schedule a consultation to discuss your specific situation?",
        gym: "Memberships start at $49/month for basic access, $79/month with classes included. Personal training is $75/session with package discounts available. Want to schedule a tour and trial workout?",
        marketing: "Our packages range from $2,500/month for small businesses to $10,000+ for enterprise clients. Every package includes a free initial audit. Should I schedule a strategy call to discuss your specific needs?"
      };
      return prices[selectedIndustry as keyof typeof prices] || "Please contact us for detailed pricing information tailored to your needs.";
    }
    
    if (msg.includes('book') || msg.includes('appointment') || msg.includes('schedule')) {
      const booking = {
        plumber: "I can schedule your service right away! We have emergency slots available today or regular service appointments tomorrow. What type of plumbing issue are you experiencing?",
        lawfirm: "I'll help you book a free consultation. We have availability this week for case evaluations. Would you prefer a morning or afternoon appointment?",
        gym: "Perfect! I can book you a tour and free trial session. We have slots available today at 2 PM or tomorrow at 10 AM. Which works better for your schedule?",
        marketing: "I'll schedule your free marketing audit and strategy session. Are you available for a 30-minute call this week to discuss your business goals?"
      };
      return booking[selectedIndustry as keyof typeof booking] || "I'd be happy to schedule that for you. What day and time work best?";
    }
    
    if (msg.includes('emergency') || msg.includes('urgent') || msg.includes('now')) {
      return selectedIndustry === 'plumber' 
        ? "This sounds like an emergency! I'm connecting you with our emergency dispatch team right now. Our technician will arrive within 45 minutes. Please shut off your main water valve if possible and text me your address."
        : `I understand this is urgent. Let me connect you with our priority team right away. For immediate assistance with ${industry.companyName}, what's the best number to reach you?`;
    }

    if (msg.includes('help') || msg.includes('what can you do') || msg.includes('services')) {
      const services = {
        plumber: `I can help you with all of ${industry.companyName}'s services including emergency repairs, drain cleaning, water heater installation, pipe repairs, and routine maintenance. I can also provide pricing, schedule appointments, and dispatch emergency technicians. What specific plumbing issue can I help you with?`,
        lawfirm: `I can assist with information about ${industry.companyName}'s legal services, particularly personal injury cases, car accidents, slip and falls, and wrongful death claims. I can schedule free consultations, provide case evaluations, and connect you with our attorneys. What type of legal matter brings you here today?`,
        gym: `I can help with everything related to ${industry.companyName} including membership options, class schedules, personal training, nutrition counseling, and facility tours. I can also book trial sessions and answer questions about our equipment and amenities. What are your fitness goals?`,
        marketing: `I can assist with ${industry.companyName}'s digital marketing services including SEO, PPC advertising, social media marketing, content creation, and website optimization. I can also schedule strategy sessions, provide case studies, and create custom proposals. What marketing challenges is your business facing?`
      };
      return services[selectedIndustry as keyof typeof services] || `I can help with questions about ${industry.companyName} and schedule appointments or consultations. What would you like to know?`;
    }
    
    // Default response with industry context
    return `I'm here to help with any questions about ${industry.companyName}. Whether you need information about our services, pricing, scheduling, or have specific ${selectedIndustry} questions, I'm ready to assist. What would you like to know?`;
  }

  // Quick suggestion handler
  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getIndustryColors = (industry: string) => {
    const colors = {
      plumber: 'from-blue-500 to-indigo-500',
      lawfirm: 'from-emerald-500 to-green-500', 
      gym: 'from-rose-500 to-pink-500',
      marketing: 'from-orange-500 to-red-500'
    };
    return colors[industry as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getBgColors = (color: string) => {
    const colors = {
      blue: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
      emerald: 'from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20',
      rose: 'from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20',
      orange: 'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="h-[450px] flex flex-col overflow-hidden p-2">
      
      {/* Industry Selector */}
      <div className="text-center mb-1 flex-shrink-0">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">
          AI Chat with Gemini RAG
        </h2>
        <div className="grid grid-cols-4 gap-1 max-w-lg mx-auto mb-1">
          {Object.entries(industries).map(([key, industry]) => (
            <button
              key={key}
              onClick={() => handleIndustryChange(key as typeof selectedIndustry)}
              disabled={loading}
              className={`p-1.5 rounded-md border transition-all duration-300 text-xs ${
                selectedIndustry === key
                  ? `bg-gradient-to-r ${getBgColors(industry.color)} border-current shadow-md`
                  : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:shadow-sm'
              } ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              <div className="text-base mb-0.5">{industry.icon}</div>
              <div className="font-medium text-xs">{industry.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-800/50 overflow-hidden flex flex-col min-h-0">
        
        {/* Chat Header */}
        <div className="flex items-center justify-between p-2 border-b border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${getIndustryColors(selectedIndustry)} flex items-center justify-center`}>
                <span className="text-white text-xs">{currentIndustry.icon}</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 border border-white dark:border-gray-900 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-xs">{currentIndustry.companyName}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Powered by Gemini RAG</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400 dark:text-gray-500">Live</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 min-h-0">
          {msgs.map(m => (
            <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${m.from === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`px-2 py-1.5 rounded-lg text-xs ${
                  m.from === 'user' 
                    ? `bg-gradient-to-r ${getIndustryColors(selectedIndustry)} text-white rounded-br-sm`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm'
                } shadow-sm`}>
                  <div className="leading-relaxed">{m.text}</div>
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-1 pt-1 border-t border-white/20">
                      <div className="text-xs opacity-75">
                        Sources: {m.sources.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
                <div className={`text-xs mt-0.5 ${
                  m.from === 'user' ? 'text-right' : 'text-left'
                } text-gray-500 dark:text-gray-400`}>
                  {formatTime(m.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1.5 rounded-lg rounded-bl-sm shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {msgs.length <= 1 && (
          <div className="px-2 pb-1 flex flex-wrap gap-1 flex-shrink-0">
            {currentIndustry.suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSuggestion(suggestion)}
                className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-2 border-t border-gray-200/50 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-800/20 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder={`Ask about ${selectedIndustry} services...`}
              className="flex-1 px-2 py-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              disabled={loading}
            />
            <button 
              onClick={send} 
              disabled={loading || !input.trim()}
              className={`p-1.5 bg-gradient-to-r ${getIndustryColors(selectedIndustry)} hover:opacity-90 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 transform disabled:scale-100 disabled:cursor-not-allowed shadow-sm`}
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-1 grid grid-cols-3 gap-1 text-xs flex-shrink-0">
        <div className="p-1 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200/50 dark:border-blue-800/50 text-center">
          <div className="text-blue-600 dark:text-blue-400 font-medium text-xs">AI Model</div>
          <div className="font-bold text-gray-900 dark:text-white text-xs">Gemini 2.0</div>
        </div>
        <div className="p-1 bg-green-50 dark:bg-green-950/20 rounded-md border border-green-200/50 dark:border-green-800/50 text-center">
          <div className="text-green-600 dark:text-green-400 font-medium text-xs">Knowledge</div>
          <div className="font-bold text-gray-900 dark:text-white text-xs">RAG Enhanced</div>
        </div>
        <div className="p-1 bg-purple-50 dark:bg-purple-950/20 rounded-md border border-purple-200/50 dark:border-purple-800/50 text-center">
          <div className="text-purple-600 dark:text-purple-400 font-medium text-xs">Response</div>
          <div className="font-bold text-gray-900 dark:text-white text-xs">Industry-Specific</div>
        </div>
      </div>
    </div>
  );
}