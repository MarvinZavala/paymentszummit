'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';

export default function Company() {


  const values = [
    {
      title: 'Transparency',
      description: 'No hidden fees, no surprises. We believe in clear, upfront pricing that helps you make informed decisions.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      title: 'Innovation',
      description: 'We continuously invest in cutting-edge technology to provide the most advanced payment solutions.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      )
    },
    {
      title: 'Security',
      description: 'Bank-level security with PCI DSS compliance ensures your transactions are always protected.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      title: 'Customer Focus',
      description: '24/7 support from payment experts who are committed to your business success.',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
        </svg>
      )
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '$300K+', label: 'Processed Annually' },
    { number: '99.9%', label: 'System Uptime' },
    { number: '40%', label: 'Average Savings' }
  ];



  return (
    <div className="min-h-screen">
      <Header />
      <FloatingLeadCapture pageName="company" />
      
      <section className="relative py-20 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-blue to-luxury-purple opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe-delay"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            <span className="inline-block animate-slide-up">About</span>
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-slide-up-delay">
              Zummit Payments
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-200 mb-12 max-w-4xl mx-auto">
            We&apos;re revolutionizing payment processing with transparent pricing, 
            cutting-edge technology, and unmatched customer service.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                <div className="text-neutral-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
                At Zummit Payments, we believe that every business deserves access to premium payment processing 
                solutions without the premium price tag. Our mission is to democratize financial technology 
                and help businesses of all sizes thrive in the digital economy.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed">
                We&apos;ve built our platform from the ground up with transparency, security, and customer success 
                at the core. Our team of payment experts works around the clock to ensure your business has 
                the tools it needs to grow and succeed.
              </p>
            </div>
            
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Why Choose Us?</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Low or High Risk</h4>
                    <p className="text-neutral-400 text-sm">Competitive rates with no hidden fees</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Next-Day Funding</h4>
                    <p className="text-neutral-400 text-sm">Fast access to your money</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">24/7 Support</h4>
                    <p className="text-neutral-400 text-sm">Always here when you need us</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Core
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we serve our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="glass rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300">
                <div className="text-yellow-400 mb-6 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Onboarding
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Timeline
              </span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Your journey to seamless payment processing starts here. Follow our simple 5-step process.
            </p>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Enhanced Timeline Line with Gradient */}
            <div className="absolute top-32 left-0 right-0 h-3 bg-gradient-to-r from-yellow-400 via-orange-500 via-yellow-400 via-orange-500 to-yellow-400 rounded-full hidden lg:block shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-yellow-400/20 rounded-full blur-sm"></div>
            </div>
            
            {/* Timeline Steps with Uniform Design */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Step 1 */}
              <div className="relative group">
                <div className="glass rounded-3xl p-6 text-center hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-400/20 border border-blue-400/20 h-80">
                  {/* Single Number Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-2xl">
                    1
                  </div>
                  
                  {/* Day Badge */}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    1 Day
                  </div>
                  
                  <div className="mt-8 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9zm2 0a1 1 0 100 2h.01a1 1 0 100-2H11z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Mutual Agreement</h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      Mutual agreement w/ the payment processing + equipment. Complete e-doc application
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="glass rounded-3xl p-6 text-center hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/20 border border-green-400/20 h-80">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-2xl">
                    2
                  </div>
                  
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-green-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    2 Day
                  </div>
                  
                  <div className="mt-8 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Underwriting Process</h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      Underwriting process (2 business days)
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="glass rounded-3xl p-6 text-center hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-400/20 border border-purple-400/20 h-80">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-2xl">
                    3
                  </div>
                  
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-purple-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    3 Day
                  </div>
                  
                  <div className="mt-8 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Continued Process</h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      Cont. Underwriting process
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative group">
                <div className="glass rounded-3xl p-6 text-center hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-400/20 border border-indigo-400/20 h-80">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-2xl">
                    4
                  </div>
                  
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-indigo-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    4 Day
                  </div>
                  
                  <div className="mt-8 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Approval Email</h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      Approval email<br/>
                      2 days express shipping
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative group">
                <div className="glass rounded-3xl p-6 text-center hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-400/20 border border-emerald-400/20 h-80">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-2xl">
                    5
                  </div>
                  
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    5 Day
                  </div>
                  
                  <div className="mt-8 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Equipment Delivered</h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      Equipment delivered and begin processing payments
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-black/80 mb-12 max-w-3xl mx-auto">
            Experience the Zummit Payments difference and see why thousands of businesses trust us with their payment processing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="bg-black hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Get Started Today
            </Link>
            <a
              href="mailto:Save.zummitpayments@gmail.com"
              className="bg-white/20 hover:bg-white/30 text-black border-2 border-black/20 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}