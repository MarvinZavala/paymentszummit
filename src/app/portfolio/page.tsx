'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Equipment' },
    { id: 'pos', name: 'POS Systems' },
    { id: 'mobile', name: 'Mobile Solutions' },
    { id: 'gateway', name: 'Payment Gateway' },
    { id: 'printers', name: 'Printers & Accessories' }
  ];

  const equipment = [
    {
      id: 7,
      category: 'mobile',
      name: 'Clover Go',
      description: 'Ultra-portable card reader that turns your smartphone or tablet into a complete POS system.',
      image: '/merchantclover2.PNG',
      features: [
        'Smartphone/tablet compatible',
        'Chip and contactless payments',
        'Bluetooth connectivity',
        'Long battery life',
        'Compact design',
        'Quick setup',
        'Mobile app integration'
      ],
      businessTypes: ['Small Business', 'Mobile Vendors', 'Service Providers'],
      popular: true
    },
    {
      id: 2,
      category: 'mobile',
      name: 'Clover Flex',
      description: 'Portable POS that goes wherever your business takes you. Accept payments anywhere with WiFi or cellular connection.',
      image: '/merchant2.PNG',
      features: [
        'Portable handheld design',
        'Built-in payment processing',
        'WiFi and 4G connectivity',
        'Long-lasting battery',
        'Contactless payments',
        'Receipt printing',
        'Inventory tracking'
      ],
      businessTypes: ['Food Trucks', 'Pop-up Shops', 'Delivery Services'],
      popular: true
    },
    {
      id: 8,
      category: 'pos',
      name: 'Complete POS Setup',
      description: 'Full merchant services setup with integrated payment processing and business management tools.',
      image: '/posmeerchant.JPG',
      features: [
        'Complete hardware bundle',
        'Integrated payment processing',
        'Business management suite',
        'Training and support included',
        'Custom configuration',
        'Multi-payment options',
        '24/7 technical support'
      ],
      businessTypes: ['New Businesses', 'Upgrading Merchants', 'Multi-location'],
      popular: false
    },
    {
      id: 9,
      category: 'gateway',
      name: 'Payment Gateway',
      description: 'Secure online payment processing gateway for e-commerce and remote invoicing. Send professional invoices and collect payments remotely. Now supporting cryptocurrency transactions.',
      image: '/gateway.JPG',
      features: [
        'Online invoice generation',
        'Email payment links',
        'Mobile-friendly payment pages',
        'Real-time payment notifications',
        'Recurring billing options',
        'Multi-currency support',
        'Advanced reporting dashboard'
      ],
      businessTypes: ['E-commerce', 'Service Providers', 'Consultants'],
      popular: true
    },
    {
      id: 10,
      category: 'pos',
      name: 'Enterprise POS System',
      description: 'High-volume merchant solution with advanced analytics and multi-location management capabilities.',
      image: '/merchantbig.JPG',
      features: [
        'Enterprise-grade hardware',
        'Advanced analytics dashboard',
        'Multi-location management',
        'Custom reporting tools',
        'Scalable architecture',
        'Priority support',
        'Advanced inventory management'
      ],
      businessTypes: ['Large Retailers', 'Chain Stores', 'Enterprise'],
      popular: false
    },
    {
      id: 11,
      category: 'pos',
      name: 'Premium Merchant Setup',
      description: 'Complete premium merchant services with high-performance POS systems for growing businesses.',
      image: '/merchantbig.PNG',
      features: [
        'Premium hardware package',
        'Advanced payment processing',
        'Customer loyalty programs',
        'Integrated accounting',
        'Staff management tools',
        'Real-time reporting',
        'Cloud-based system'
      ],
      businessTypes: ['Growing Businesses', 'Retail Chains', 'Franchises'],
      popular: false
    },
    {
      id: 4,
      category: 'printers',
      name: 'Kitchen Printers',
      description: 'Professional receipt and kitchen printers designed for high-volume restaurant environments.',
      image: '/CLOVERPOSSUSTEMS.PNG',
      features: [
        'Impact & Thermal options',
        'High-speed printing',
        'Kitchen environment rated',
        'Easy paper loading',
        'Reliable connectivity',
        'Compact footprint'
      ],
      businessTypes: ['Restaurants', 'Food Service', 'Quick Service'],
      popular: false
    }
  ];

  const installations = [
    {
      businessName: 'Turos Tacos',
      location: 'Oakland',
      equipment: 'Clover Station + Kitchen Printers',
      image: '/merchant.JPG',
      results: {
        efficiency: '+100%',
        processing: '$50K+/month',
        satisfaction: '5/5 stars'
      },
      testimonial: 'Zummit Payments transformed our restaurant operations. The system is intuitive and our staff loves it. We also got the zero credit card payment processing fees.'
    }
  ];

  const filteredEquipment = activeCategory === 'all' 
    ? equipment 
    : equipment.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Header />
      <FloatingLeadCapture pageName="portfolio" />
      
      <section className="relative py-20 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-blue to-luxury-purple opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe-delay"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            <span className="inline-block animate-slide-up">Our Merchant</span>
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-slide-up-delay">
              Equipment
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-200 mb-12 max-w-4xl mx-auto">
            Discover our premium Point of Sale (POS) systems and payment solutions. 
            Professional equipment designed to grow your business!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                    : 'glass border border-white/20 text-white hover:bg-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredEquipment.map((item) => (
              <div
                key={item.id}
                className={`relative glass rounded-3xl p-8 hover:scale-105 transition-all duration-300 ${
                  item.popular 
                    ? 'border-2 border-yellow-400 shadow-2xl shadow-yellow-400/20' 
                    : 'border border-white/10'
                }`}
              >
                {item.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <div className="relative h-64 mb-6 rounded-2xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-neutral-400 mb-6">{item.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-yellow-400 font-semibold mb-3">Perfect for:</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.businessTypes.map((type, index) => (
                        <span key={index} className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <h4 className="text-white font-semibold mb-4">Key Features:</h4>
                  {item.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <svg className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-neutral-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link
                    href="/contact"
                    className={`flex-1 py-3 rounded-full font-bold text-center transition-all duration-300 hover:scale-105 ${
                      item.popular
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black'
                        : 'glass border border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    Get Quote
                  </Link>
                  <a
                    href="mailto:Save.zummitpayments@gmail.com"
                    className="flex-1 glass border border-white/20 text-white hover:bg-white/10 py-3 rounded-full font-semibold text-center transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span>Email</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Real Installation
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Success Story
              </span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              See how we&apos;ve helped local businesses transform their operations with our professional installations.
            </p>
          </div>

          {installations.map((installation, index) => (
            <div key={index} className="glass rounded-3xl p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={installation.image}
                      alt={`Installation at ${installation.businessName}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">{installation.businessName}</h3>
                  <p className="text-yellow-400 font-semibold mb-4">{installation.location}</p>
                  <p className="text-neutral-300 mb-6">Equipment: {installation.equipment}</p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-2">{installation.results.efficiency}</div>
                      <div className="text-neutral-400 text-sm">Efficiency Boost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-2">{installation.results.satisfaction}</div>
                      <div className="text-neutral-400 text-sm">Customer Rating</div>
                    </div>
                  </div>
                  
                  <blockquote className="text-neutral-300 italic text-lg leading-relaxed border-l-4 border-yellow-400 pl-6">
                    &ldquo;{installation.testimonial}&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section - Casa de RJ */}
      <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="/Casa-rj.png"
                    alt="Casa de RJ Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Casa de RJ</h3>
                <p className="text-yellow-400 font-semibold mb-4">General Construction</p>
                <p className="text-neutral-300 mb-6">Equipment: Payment Gateway + Invoice Management</p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-2">+90%</div>
                    <div className="text-neutral-400 text-sm">Faster Payments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400 mb-2">5/5 stars</div>
                    <div className="text-neutral-400 text-sm">Client Rating</div>
                  </div>
                </div>
                
                <blockquote className="text-neutral-300 italic text-lg leading-relaxed border-l-4 border-yellow-400 pl-6">
                  &ldquo;Zummit Payments gave our clients, another form of payments to speed up the projects. If they were short of cash, now the clients were able to use their credit cards. Plus benefiting their credit cards perks. And they gave us a great processing rate compare to the banks and other competitors. &rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Ready to Upgrade Your Business?
          </h2>
          <p className="text-xl text-black/80 mb-12 max-w-3xl mx-auto">
            Get professional installation and setup of your new Point Of Sale (POS) system. Our experts handle everything.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="bg-black hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Schedule Installation
            </Link>
            <a
              href="mailto:Save.zummitpayments@gmail.com"
              className="bg-white/20 hover:bg-white/30 text-black border-2 border-black/20 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <span>Email Quote</span>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h3 className="font-bold text-black mb-2">Professional Installation</h3>
              <p className="text-black/70 text-sm">Expert setup and training</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-bold text-black mb-2">Warranty & Support</h3>
              <p className="text-black/70 text-sm">Full warranty coverage</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-bold text-black mb-2">Competitive Pricing</h3>
              <p className="text-black/70 text-sm">Best rates guaranteed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}