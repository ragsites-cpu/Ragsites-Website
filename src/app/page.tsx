// app/page.tsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Features />

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 border border-emerald-200/50 dark:border-emerald-800/50 mb-8">
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Simple Pricing</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
                Choose your 
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> AI package</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Scale from small businesses to enterprise clients with our flexible usage-based pricing
              </p>
            </div>

            {/* Three-Tier Pricing Grid */}
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Starter Tier */}
              <div className="relative p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Starter</h3>
                  <div className="mb-6">
                    <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">$75</div>
                    <div className="text-gray-600 dark:text-gray-400">per month</div>
                    <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">Includes 500 minutes</div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Perfect for small businesses getting started with AI voice assistants
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    'AI Voice Assistant (500 min/month)',
                    'Basic chat integration',
                    'Email support',
                    'Standard response time',
                    'Basic analytics dashboard',
                    '$1 per additional minute'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full px-6 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
                  Contact Sales
                </button>
              </div>

              {/* Professional Tier - Popular */}
              <div className="relative p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-3xl border border-emerald-200 dark:border-emerald-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Professional</h3>
                  <div className="mb-6">
                    <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">$200</div>
                    <div className="text-gray-600 dark:text-gray-400">per month</div>
                    <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">Includes 1,500 minutes</div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Ideal for growing businesses with higher call volumes
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    'AI Voice Assistant (1,500 min/month)',
                    'Advanced chat with RAG integration',
                    'Priority email & chat support',
                    'Custom training & fine-tuning',
                    'Advanced analytics & reporting',
                    'CRM integrations',
                    'Multi-language support',
                    '$0.75 per additional minute'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 transform shadow-lg">
                  Contact Sales
                </button>
              </div>

              {/* Enterprise Tier */}
              <div className="relative p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-3xl border border-indigo-200 dark:border-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Enterprise</h3>
                  <div className="mb-6">
                    <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">$500</div>
                    <div className="text-gray-600 dark:text-gray-400">per month</div>
                    <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">Includes 5,000 minutes</div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    For large organizations with high-volume requirements
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    'AI Voice Assistant (5,000 min/month)',
                    'Full AI suite (voice + chat + advanced)',
                    'Dedicated account manager',
                    'Custom integrations & API access',
                    'White-label branding options',
                    'Enterprise SLA (99.9% uptime)',
                    'Custom training & deployment',
                    'Unlimited users & departments',
                    '$0.50 per additional minute'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 transform shadow-lg">
                  Contact Sales
                </button>
              </div>
            </div>

            {/* Email Contact Information */}
            <div className="mt-12 text-center">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 max-w-2xl mx-auto border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Ready to get started?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Contact our sales team to discuss your needs and get a custom quote
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:ragsites@gmail.com" className="text-lg font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                    ragsites@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Usage Information */}
            <div className="mt-16 text-center">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Transparent Usage-Based Pricing
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  All plans include generous minute allowances. Only pay for what you use beyond your plan limits.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-emerald-600 mb-2">$1.00</div>
                    <div className="text-gray-600 dark:text-gray-400">per extra minute</div>
                    <div className="text-sm text-gray-500 mt-1">Starter plan overage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-emerald-600 mb-2">$0.75</div>
                    <div className="text-gray-600 dark:text-gray-400">per extra minute</div>
                    <div className="text-sm text-gray-500 mt-1">Professional plan overage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-emerald-600 mb-2">$0.50</div>
                    <div className="text-gray-600 dark:text-gray-400">per extra minute</div>
                    <div className="text-sm text-gray-500 mt-1">Enterprise plan overage</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 text-center">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl p-8 max-w-4xl mx-auto border border-emerald-200/50 dark:border-emerald-800/50">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to transform your business with AI?
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Start with any plan and scale as you grow. No setup fees, no long-term contracts.
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Setup included</span>
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