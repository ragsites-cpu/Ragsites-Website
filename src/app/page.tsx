// app/page.tsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import LiveDemoChat from './components/LiveDemoChat';
import LiveDemoVoice from './components/LiveDemoVoice';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Features />
        
        {/* Demo Section */}
        <section id="demo" className="relative py-24 bg-gradient-to-br from-gray-50 to-indigo-50/30 dark:from-gray-800 dark:to-indigo-950/30">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-300/10 to-purple-300/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-300/10 to-indigo-300/10 dark:from-pink-500/5 dark:to-indigo-500/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200/50 dark:border-indigo-800/50 mb-6">
                <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Interactive Demo</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6">
                Experience the 
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> power of AI</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Try our live chat and voice demos to see how our AI agents can transform your client's customer experience.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Live Chat Demo</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Experience intelligent conversations that feel natural and convert visitors into leads.
                  </p>
                </div>
                <LiveDemoChat />
              </div>
              
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Live Voice Demo</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Test our voice AI that handles calls, understands speech, and provides human-like responses.
                  </p>
                </div>
                <LiveDemoVoice />
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-20 text-center">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/50 max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to revolutionize your agency?
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Join hundreds of agencies already using our white-label AI solutions to increase revenue and client satisfaction.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="#pricing" 
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 transform shadow-lg"
                  >
                    Get Started Today
                  </a>
                  <a 
                    href="#contact" 
                    className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    Schedule a Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 border border-emerald-200/50 dark:border-emerald-800/50 mb-8">
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Enterprise Solution</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
                Built for 
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> serious agencies</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Our comprehensive enterprise solution is tailored to your agency's specific needs. Get everything you need to scale your AI offerings with white-label perfection.
              </p>
            </div>

            {/* Single Enterprise Card */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                {/* Popular Badge */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular Choice
                  </div>
                </div>
                
                <div className="relative p-12 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 backdrop-blur-sm rounded-3xl border border-emerald-200/50 dark:border-emerald-800/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
                  
                  {/* Header */}
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Enterprise</h3>
                    <div className="mb-8">
                      <div className="text-6xl font-black text-gray-900 dark:text-white mb-3">Custom</div>
                      <div className="text-gray-600 dark:text-gray-400 text-xl">Tailored pricing & features</div>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto">
                      A complete white-label AI solution designed specifically for your agency's unique requirements and scale.
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {[
                      { icon: '🌐', title: 'Unlimited Client Sites', desc: 'Deploy across all your clients without restrictions' },
                      { icon: '🤖', title: 'Full AI Suite', desc: 'Chat, voice, and advanced AI capabilities' },
                      { icon: '🔧', title: 'Custom Integrations', desc: 'API connections to your existing tools' },
                      { icon: '👥', title: 'Dedicated Support', desc: 'Priority technical support and account management' },
                      { icon: '📊', title: 'Advanced Analytics', desc: 'Comprehensive reporting and insights dashboard' },
                      { icon: '⚡', title: 'Enterprise SLA', desc: '99.9% uptime guarantee with priority infrastructure' },
                      { icon: '🎓', title: 'Custom Training', desc: 'Personalized AI training for your specific use cases' },
                      { icon: '🌍', title: 'Multi-language Support', desc: '50+ languages for global client deployment' }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start space-x-4 p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
                        <div className="text-2xl flex-shrink-0">{feature.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Included Benefits */}
                  <div className="mb-10">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Everything Included</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        'Complete Setup & Integration',
                        'White-label Branding',
                        'Ongoing Maintenance',
                        'Priority Feature Requests',
                        'Custom Documentation',
                        'Training & Onboarding'
                      ].map((benefit, i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 transform shadow-lg text-lg">
                      Schedule Discovery Call
                    </button>
                    <button className="px-8 py-4 border-2 border-emerald-200 dark:border-emerald-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all duration-200 text-lg">
                      Request Proposal
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 text-center">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl p-8 max-w-4xl mx-auto border border-emerald-200/50 dark:border-emerald-800/50">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to transform your agency with AI?
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Join 500+ agencies already scaling their revenue with our white-label AI solutions.
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No long-term contracts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>White-label guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dedicated success manager</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <div className="w-4 h-4 rounded bg-white/90"></div>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Ragsites
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Empowering agencies with invisible, fully-managed AI voice and chat solutions that convert traffic into leads.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a></li>
                <li><a href="#demo" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Live Demo</a></li>
                <li><a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Ragsites — White-label AI for agencies
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}