export default function Features() {
  const features = [
    { 
      title: 'AI Chat Assistants', 
      desc: 'Human-like 24/7 chat on client sites that turns visitors into leads with intelligent conversation flows.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50',
      borderGradient: 'from-blue-200 to-cyan-200 dark:from-blue-800 to-cyan-800'
    },
    { 
      title: 'AI Voice Agents', 
      desc: 'Handle calls, book appointments, and prevent missed leads with natural voice interactions.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50',
      borderGradient: 'from-purple-200 to-pink-200 dark:from-purple-800 to-pink-800'
    },
    { 
      title: 'White-label Solution', 
      desc: 'You rebrand and bill clients while we remain the invisible engine powering your success.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50',
      borderGradient: 'from-emerald-200 to-teal-200 dark:from-emerald-800 to-teal-800'
    },
    { 
      title: 'Full-Service Support', 
      desc: 'Complete integration, setup, monitoring, and ongoing support — we handle the technical complexities.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50',
      borderGradient: 'from-orange-200 to-red-200 dark:from-orange-800 to-red-800'
    }
  ];

  return (
    <section id="features" className="relative py-24 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200/50 dark:border-indigo-800/50 mb-6">
            <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Core Features</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Everything you need to 
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> scale your agency</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our comprehensive AI solution seamlessly integrates into your existing workflow, 
            allowing you to offer cutting-edge technology without the overhead.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-5 rounded-3xl blur-xl transition-opacity duration-500`}></div>
              
              <div className={`relative h-full p-8 bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm rounded-3xl border border-transparent bg-clip-padding hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform`}>
                <div className={`absolute inset-[1px] rounded-3xl bg-gradient-to-r ${feature.borderGradient} opacity-20`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {feature.desc}
                  </p>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-xl"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-transparent to-white/5 rounded-full blur-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}