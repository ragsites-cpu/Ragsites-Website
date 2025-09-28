// components/Hero.tsx
'use client';
import { useState } from 'react';
import TargetedVoiceDemo from "./ReadyPlayerMeDemo";
import LiveDemoChat from "./LiveDemoChat";

export default function Hero() {
  const [currentDemo, setCurrentDemo] = useState(0);

  const demos = [
    {
      id: 'voice',
      title: 'AI Voice Agents',
      subtitle: 'Industry-specific voice AI for plumbers, law firms & gyms',
      component: (
        <div className="w-full h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-xl overflow-hidden">
          <div className="w-full h-full p-6">
            <TargetedVoiceDemo />
          </div>
        </div>
      )
    },
    {
      id: 'chat', 
      title: 'AI Chat Assistants',
      subtitle: 'Intelligent chat that qualifies leads and books appointments',
      component: (
        <div className="w-full h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-xl overflow-hidden">
          <div className="w-full h-full p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">AI Chat Assistant Demo</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Experience how our AI chat assistant qualifies leads and books appointments
              </p>
            </div>
            <div className="h-4/5">
              <LiveDemoChat />
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-300/20 to-indigo-300/20 dark:from-pink-500/10 dark:to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-300/20 to-cyan-300/20 dark:from-emerald-500/10 dark:to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32">
        
        {/* White-label Information Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200/50 dark:border-indigo-800/50 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">AI-Powered Solutions</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent">
              White-label AI
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Voice & Chat
            </span>
            <br />
            <span className="text-gray-700 dark:text-gray-300">for Agencies</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
            Invisible, fully-managed AI voice agents and human-like chat assistants that convert your traffic into leads — 
            <span className="font-semibold text-indigo-600 dark:text-indigo-400"> no tech overhead required</span>.
          </p>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              'Upsell under your brand — we stay invisible',
              'Complete setup + integration + ongoing support',
              'Recurring revenue with setup fee + monthly retainer model'
            ].map((feature, i) => (
              <div key={i} className="flex items-center space-x-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/50">
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="#demo" 
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform flex items-center justify-center space-x-2"
            >
              <span>Watch AI Demo</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-4a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </a>
            <a 
              href="#pricing" 
              className="px-8 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold text-lg hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
            >
              View Pricing
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
            {[
              { number: '99.9%', label: 'Uptime Guarantee' },
              { number: '< 200ms', label: 'Response Time' },
              { number: '24/7', label: 'AI Availability' }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Carousel */}
        <div id="demo" className="mt-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 border border-emerald-200/50 dark:border-emerald-800/50 mb-6">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Interactive Demos</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6">
              Experience AI in Action
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              {demos[currentDemo].subtitle}
            </p>

            {/* Demo Navigation */}
            <div className="flex justify-center space-x-4 mb-8">
              {demos.map((demo, index) => (
                <button
                  key={demo.id}
                  onClick={() => setCurrentDemo(index)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentDemo === index
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80'
                  }`}
                >
                  {demo.title}
                </button>
              ))}
            </div>
          </div>

          {/* Side-by-Side Overlapping Cards */}
          <div className="relative max-w-8xl mx-auto">
            <div className="relative flex justify-center items-center" style={{ minHeight: '650px' }}>
              {demos.map((demo, index) => {
                const isActive = index === currentDemo;
                const isLeft = index === 0;
                
                return (
                  <div
                    key={demo.id}
                    className={`relative transition-all duration-500 ease-out cursor-pointer ${
                      isActive ? 'z-20' : 'z-10'
                    }`}
                    style={{
                      transform: `translateX(${isLeft ? (isActive ? '-50px' : '-80px') : (isActive ? '50px' : '80px')}) scale(${isActive ? 1 : 0.95})`,
                      width: '1000px',
                      height: '600px',
                      marginRight: index === 0 ? '-150px' : '0',
                    }}
                    onClick={() => setCurrentDemo(index)}
                  >
                    <div className={`w-full h-full transition-all duration-300 rounded-3xl overflow-hidden ${
                      isActive 
                        ? 'shadow-2xl ring-2 ring-indigo-200 dark:ring-indigo-800' 
                        : 'shadow-lg hover:shadow-xl opacity-90 hover:opacity-100'
                    }`}>
                      {demo.component}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Dots Indicator */}
            <div className="flex justify-center space-x-3 mt-8">
              {demos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDemo(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentDemo === index
                      ? 'w-8 h-3 bg-gradient-to-r from-indigo-600 to-purple-600'
                      : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Call to Action - Moved here and made smaller */}
          <div className="mt-16 text-center">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Ready to revolutionize your agency?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Join hundreds of agencies already using our white-label AI solutions to increase revenue and client satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a 
                  href="#pricing" 
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 transform shadow-lg"
                >
                  Get Started Today
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>

          {/* Add some bottom spacing */}
          <div className="h-16"></div>

          {/* Swipe Instructions */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Use navigation buttons or click demo titles to switch between experiences
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}