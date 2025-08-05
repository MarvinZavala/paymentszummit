'use client';

import Link from 'next/link';

export default function Company() {
  const leadership = [
    {
      name: 'Michael Rodriguez',
      position: 'Chief Executive Officer',
      bio: 'With over 15 years in fintech, Michael has led ZummitPayments to become the #1 rated payment processor.',
      image: '/api/placeholder/400/400',
      linkedin: '#'
    },
    {
      name: 'Sarah Chen',
      position: 'Chief Technology Officer',
      bio: 'Former Silicon Valley engineer with expertise in secure payment systems and blockchain technology.',
      image: '/api/placeholder/400/400',
      linkedin: '#'
    },
    {
      name: 'David Thompson',
      position: 'Chief Financial Officer',
      bio: 'Wall Street veteran with deep experience in financial services and regulatory compliance.',
      image: '/api/placeholder/400/400',
      linkedin: '#'
    },
    {
      name: 'Lisa Wang',
      position: 'VP of Customer Success',
      bio: 'Dedicated to ensuring our clients achieve maximum value from our payment processing solutions.',
      image: '/api/placeholder/400/400',
      linkedin: '#'
    }
  ];

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
    { number: '$2.5B+', label: 'Processed Annually' },
    { number: '99.9%', label: 'System Uptime' },
    { number: '40%', label: 'Average Savings' }
  ];

  const timeline = [
    {
      year: '2018',
      title: 'Company Founded',
      description: 'ZummitPayments was established with a mission to simplify payment processing for businesses of all sizes.'
    },
    {
      year: '2019',
      title: 'First 1,000 Customers',
      description: 'Reached our first major milestone by serving over 1,000 businesses across the United States.'
    },
    {
      year: '2020',
      title: 'Technology Innovation',
      description: 'Launched our proprietary fraud detection system, reducing chargebacks by 75%.'
    },
    {
      year: '2021',
      title: 'Series A Funding',
      description: 'Secured $25M in Series A funding to expand our technology platform and customer support.'
    },
    {
      year: '2022',
      title: 'Industry Recognition',
      description: 'Named "Payment Processor of the Year" by FinTech Awards for our innovative solutions.'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded internationally and launched support for 40+ payment methods worldwide.'
    },
    {
      year: '2024',
      title: '#1 Ranked Processor',
      description: 'Achieved the #1 ranking in customer satisfaction and became the fastest-growing payment processor.'
    }
  ];

  return (
    <div className="min-h-screen">
      
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-blue to-luxury-purple opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              ZummitPayments
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-200 mb-12 max-w-4xl mx-auto">
            We're revolutionizing payment processing with transparent pricing, 
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
                At ZummitPayments, we believe that every business deserves access to premium payment processing 
                solutions without the premium price tag. Our mission is to democratize financial technology 
                and help businesses of all sizes thrive in the digital economy.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed">
                We've built our platform from the ground up with transparency, security, and customer success 
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
                    <h4 className="font-semibold text-white">Save Up to 40%</h4>
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
              Our Journey
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              From startup to industry leader - here's how we've grown to become the #1 rated payment processor.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="glass rounded-2xl p-8 relative">
                      <div className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full ${
                        index % 2 === 0 ? '-right-2' : '-left-2'
                      }`}></div>
                      
                      <div className="text-yellow-400 font-bold text-lg mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-neutral-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Leadership
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Meet the experienced leaders driving ZummitPayments' mission to revolutionize payment processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="glass rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{leader.name}</h3>
                <p className="text-yellow-400 font-semibold mb-4">{leader.position}</p>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">{leader.bio}</p>
                <a 
                  href={leader.linkedin}
                  className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full hover:scale-110 transition-transform duration-300"
                >
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-black/80 mb-12 max-w-3xl mx-auto">
            Experience the ZummitPayments difference and see why thousands of businesses trust us with their payment processing.
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