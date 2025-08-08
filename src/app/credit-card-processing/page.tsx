'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { CalendlyButton } from '@/components/CalendlyWidget';

export default function CreditCardProcessing() {
  const [activeFeature, setActiveFeature] = useState('security');

  const processingFeatures = [
    {
      id: 'security',
      name: 'Advanced Security',
      icon: '🛡️',
      description: 'Bank-level security with end-to-end encryption'
    },
    {
      id: 'speed',
      name: 'Fast Processing',
      icon: '⚡',
      description: 'Lightning-fast transaction processing'
    },
    {
      id: 'rates',
      name: 'Competitive Rates',
      icon: '💰',
      description: 'Industry-leading processing rates'
    },
    {
      id: 'support',
      name: '24/7 Support',
      icon: '🆘',
      description: 'Round-the-clock expert support'
    }
  ];

  const featureDetails = {
    security: {
      title: 'Advanced Security Features',
      features: [
        {
          name: 'PCI DSS Compliance',
          description: 'Fully compliant with Payment Card Industry Data Security Standards',
          benefit: 'Protect your business from data breaches'
        },
        {
          name: 'End-to-End Encryption',
          description: 'All transactions are encrypted from card swipe to settlement',
          benefit: 'Maximum security for sensitive data'
        },
        {
          name: 'Tokenization',
          description: 'Replace sensitive card data with secure tokens',
          benefit: 'Reduce PCI compliance scope'
        },
        {
          name: 'Fraud Detection',
          description: 'AI-powered fraud prevention and risk management',
          benefit: 'Minimize chargebacks and losses'
        }
      ]
    },
    speed: {
      title: 'Lightning-Fast Processing',
      features: [
        {
          name: 'Real-Time Authorization',
          description: 'Instant transaction approval in under 2 seconds',
          benefit: 'Faster checkout experience'
        },
        {
          name: 'Next-Day Funding',
          description: 'Receive your funds the next business day',
          benefit: 'Improved cash flow management'
        },
        {
          name: 'Same-Day Settlement',
          description: 'Available for qualifying merchants',
          benefit: 'Access to funds when you need them'
        },
        {
          name: 'Batch Processing',
          description: 'Efficient handling of high-volume transactions',
          benefit: 'Seamless operations during peak times'
        }
      ]
    },
    rates: {
      title: 'Competitive Processing Rates',
      features: [
        {
          name: 'Interchange Plus Pricing',
          description: 'Transparent pricing with wholesale interchange rates',
          benefit: 'Save up to 40% on processing fees'
        },
        {
          name: 'Volume Discounts',
          description: 'Lower rates as your processing volume increases',
          benefit: 'Grow your business, reduce your costs'
        },
        {
          name: 'No Hidden Fees',
          description: 'Transparent pricing with no surprise charges',
          benefit: 'Predictable monthly processing costs'
        },
        {
          name: 'Rate Optimization',
          description: 'Regular reviews to ensure you get the best rates',
          benefit: 'Continuous savings on processing'
        }
      ]
    },
    support: {
      title: '24/7 Expert Support',
      features: [
        {
          name: 'Dedicated Account Manager',
          description: 'Personal point of contact who knows your business',
          benefit: 'Personalized service and support'
        },
        {
          name: 'Technical Support',
          description: '24/7 technical assistance for any issues',
          benefit: 'Minimize downtime and disruptions'
        },
        {
          name: 'Training & Onboarding',
          description: 'Comprehensive training for you and your staff',
          benefit: 'Get up and running quickly'
        },
        {
          name: 'Dispute Resolution',
          description: 'Expert assistance with chargebacks and disputes',
          benefit: 'Protect your revenue and reputation'
        }
      ]
    }
  };

  const cardTypes = [
    { name: 'Visa', logo: '💳', accepted: true },
    { name: 'Mastercard', logo: '💳', accepted: true },
    { name: 'American Express', logo: '💳', accepted: true },
    { name: 'Discover', logo: '💳', accepted: true },
    { name: 'JCB', logo: '💳', accepted: true },
    { name: 'Diners Club', logo: '💳', accepted: true }
  ];

  const businessTypes = [
    {
      type: 'Retail Stores',
      description: 'Perfect for brick-and-mortar businesses',
      features: ['In-person payments', 'POS integration', 'Inventory management']
    },
    {
      type: 'Restaurants',
      description: 'Specialized solutions for food service',
      features: ['Table-side payments', 'Tip management', 'Kitchen integration']
    },
    {
      type: 'E-commerce',
      description: 'Online payment processing solutions',
      features: ['Shopping cart integration', 'Recurring billing', 'Mobile optimization']
    },
    {
      type: 'Service Businesses',
      description: 'Flexible payment options for services',
      features: ['Mobile payments', 'Invoicing', 'Appointment booking']
    }
  ];

  const currentFeature = featureDetails[activeFeature as keyof typeof featureDetails];

  return (
    <div className="min-h-screen">
      <Header />
      <FloatingLeadCapture pageName="credit-card-processing" />
      
      <section className="relative py-20 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-blue to-luxury-purple opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe-delay"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Credit Card
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Processing
            </span>
          </h1>
          <p className="text-xl text-neutral-200 mb-12 max-w-3xl mx-auto">
            Accept all major credit cards with our secure, fast, and reliable payment processing system. Start saving on processing fees today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <CalendlyButton 
              text="Get Your Free Quote"
              className="bg-black hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105"
            />
            <Link
              href="/contact"
              className="glass border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Contact Sales
            </Link>
          </div>

          {/* Accepted Cards */}
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">We Accept All Major Cards</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {cardTypes.map((card) => (
                <div key={card.name} className="text-center">
                  <div className="text-4xl mb-2">{card.logo}</div>
                  <div className="text-white text-sm font-semibold">{card.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Why Choose Our Processing?</h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Industry-leading features designed to help your business succeed
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            {processingFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeFeature === feature.id
                    ? 'bg-yellow-400 text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span>{feature.icon}</span>
                <span>{feature.name}</span>
              </button>
            ))}
          </div>

          {/* Feature Details */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">{currentFeature.title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentFeature.features.map((feature, index) => (
                <div key={index} className="glass rounded-2xl p-8">
                  <h4 className="text-xl font-bold text-white mb-4">{feature.name}</h4>
                  <p className="text-neutral-300 mb-4 leading-relaxed">{feature.description}</p>
                  <div className="flex items-center text-yellow-400">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-semibold">{feature.benefit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Types */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Perfect for Every Business</h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Tailored solutions for different business types and industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessTypes.map((business, index) => (
              <div key={index} className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-bold text-white mb-4">{business.type}</h3>
                <p className="text-neutral-400 mb-6">{business.description}</p>
                <ul className="space-y-2">
                  {business.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-neutral-300 text-sm">
                      <svg className="w-4 h-4 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Benefits */}
      <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Transparent Pricing</h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              No hidden fees, no surprises. Just honest, competitive rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">0%</div>
              <div className="text-white font-semibold mb-2">Starting Rate</div>
              <div className="text-neutral-400 text-sm">For qualifying merchants with high volume</div>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">24hrs</div>
              <div className="text-white font-semibold mb-2">Setup Time</div>
              <div className="text-neutral-400 text-sm">Get approved and start processing quickly</div>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">40%</div>
              <div className="text-white font-semibold mb-2">Average Savings</div>
              <div className="text-neutral-400 text-sm">Compared to traditional processors</div>
            </div>
          </div>

          <div className="text-center">
            <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">What&apos;s Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-center text-neutral-300">
                    <svg className="w-5 h-5 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Free terminal and equipment
                  </div>
                  <div className="flex items-center text-neutral-300">
                    <svg className="w-5 h-5 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    24/7 customer support
                  </div>
                  <div className="flex items-center text-neutral-300">
                    <svg className="w-5 h-5 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    PCI compliance assistance
                  </div>
                  <div className="flex items-center text-neutral-300">
                    <svg className="w-5 h-5 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Fraud protection
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-neutral-300">
                    <svg className="w-5 h-5 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Next-day funding
                  </div>
                  <div className="flex items-center text-neutral-300">
                    <svg className="w-5 h-5 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Real-time reporting
                  </div>
                  <div className="flex items-center text-neutral-300">
                    <svg className="w-5 h-5 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Mobile processing
                  </div>
                  <div className="flex items-center text-neutral-300">
                    <svg className="w-5 h-5 mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Chargeback protection
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">
            Ready to Start Processing?
          </h2>
          <p className="text-xl text-black/80 mb-12 max-w-3xl mx-auto">
            Get approved in minutes and start accepting credit cards today. No setup fees, no long-term contracts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <CalendlyButton 
              text="Get Started Now"
              className="bg-black hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105"
            />
            <Link
              href="/portfolio"
              className="bg-white/20 hover:bg-white/30 text-black border-2 border-black/20 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              View Equipment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}