'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { CalendlyButton } from '@/components/CalendlyWidget';

export default function AccountManagement() {
  const [activeService, setActiveService] = useState('optimization');

  const accountServices = [
    {
      id: 'optimization',
      name: 'Rate Optimization',
      icon: '📈',
      description: 'Continuous monitoring and optimization of your processing rates'
    },
    {
      id: 'reporting',
      name: 'Advanced Reporting',
      icon: '📊',
      description: 'Detailed analytics and insights into your payment processing'
    },
    {
      id: 'integration',
      name: 'System Integration',
      icon: '🔗',
      description: 'Seamless integration with your existing business systems'
    },
    {
      id: 'compliance',
      name: 'Compliance Management',
      icon: '🛡️',
      description: 'Ensuring your business stays compliant with industry standards'
    }
  ];

  const serviceDetails = {
    optimization: {
      title: 'Rate Optimization Services',
      features: [
        {
          name: 'Quarterly Rate Reviews',
          description: 'Regular analysis of your processing rates to ensure you\'re getting the best deal',
          benefit: 'Save up to 40% on processing fees'
        },
        {
          name: 'Volume-Based Adjustments',
          description: 'Automatic rate adjustments as your processing volume grows',
          benefit: 'Lower rates as you grow'
        },
        {
          name: 'Industry Benchmarking',
          description: 'Compare your rates against industry standards and competitors',
          benefit: 'Stay competitive in your market'
        },
        {
          name: 'Custom Pricing Models',
          description: 'Tailored pricing structures based on your business model',
          benefit: 'Pricing that fits your business'
        }
      ]
    },
    reporting: {
      title: 'Advanced Reporting & Analytics',
      features: [
        {
          name: 'Real-Time Dashboard',
          description: 'Live view of all your transactions and key metrics',
          benefit: 'Make informed decisions instantly'
        },
        {
          name: 'Custom Report Builder',
          description: 'Create personalized reports for your specific needs',
          benefit: 'Get the data that matters to you'
        },
        {
          name: 'Automated Insights',
          description: 'AI-powered analysis of your payment patterns and trends',
          benefit: 'Discover opportunities for growth'
        },
        {
          name: 'Multi-Location Reporting',
          description: 'Consolidated reporting across all your business locations',
          benefit: 'Manage multiple locations efficiently'
        }
      ]
    },
    integration: {
      title: 'System Integration Services',
      features: [
        {
          name: 'POS Integration',
          description: 'Seamless connection with your existing point-of-sale systems',
          benefit: 'No disruption to your operations'
        },
        {
          name: 'E-commerce Platforms',
          description: 'Integration with popular online shopping platforms',
          benefit: 'Unified payment processing'
        },
        {
          name: 'Accounting Software',
          description: 'Direct integration with QuickBooks, Xero, and other accounting tools',
          benefit: 'Streamlined financial management'
        },
        {
          name: 'API Development',
          description: 'Custom API solutions for unique business requirements',
          benefit: 'Tailored to your specific needs'
        }
      ]
    },
    compliance: {
      title: 'Compliance Management',
      features: [
        {
          name: 'PCI DSS Compliance',
          description: 'Ongoing monitoring and maintenance of PCI compliance standards',
          benefit: 'Avoid costly penalties and breaches'
        },
        {
          name: 'Security Audits',
          description: 'Regular security assessments and vulnerability testing',
          benefit: 'Stay ahead of security threats'
        },
        {
          name: 'Regulatory Updates',
          description: 'Stay informed about changing regulations and requirements',
          benefit: 'Always compliant with current standards'
        },
        {
          name: 'Documentation Support',
          description: 'Help with compliance documentation and reporting',
          benefit: 'Simplified compliance management'
        }
      ]
    }
  };

  const accountBenefits = [
    {
      icon: '👤',
      title: 'Dedicated Account Manager',
      description: 'Your personal point of contact who knows your business inside and out'
    },
    {
      icon: '⚡',
      title: 'Priority Support',
      description: 'Skip the queue with priority access to our technical support team'
    },
    {
      icon: '🎯',
      title: 'Proactive Monitoring',
      description: 'We monitor your account 24/7 and proactively address any issues'
    },
    {
      icon: '📞',
      title: 'Direct Phone Line',
      description: 'Direct access to your account manager via dedicated phone line'
    },
    {
      icon: '💡',
      title: 'Business Consulting',
      description: 'Strategic advice to help grow your business and optimize operations'
    },
    {
      icon: '🔄',
      title: 'Regular Check-ins',
      description: 'Scheduled reviews to ensure your payment processing meets your needs'
    }
  ];

  const currentService = serviceDetails[activeService as keyof typeof serviceDetails];

  return (
    <div className="min-h-screen">
      <Header />
      <FloatingLeadCapture pageName="account-management" />
      
      <section className="relative py-20 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-blue to-luxury-purple opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe-delay"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Account
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-xl text-neutral-200 mb-12 max-w-3xl mx-auto">
            Dedicated account management services to help optimize your payment processing and grow your business.
          </p>
        </div>
      </section>

      {/* Account Benefits */}
      <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">What You Get</h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Comprehensive account management services designed to maximize your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accountBenefits.map((benefit, index) => (
              <div key={index} className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Services</h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Comprehensive services to optimize every aspect of your payment processing
            </p>
          </div>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            {accountServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeService === service.id
                    ? 'bg-yellow-400 text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span>{service.icon}</span>
                <span>{service.name}</span>
              </button>
            ))}
          </div>

          {/* Service Details */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">{currentService.title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentService.features.map((feature, index) => (
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

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Success Stories</h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              See how our account management services have helped businesses like yours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">40%</div>
              <div className="text-white font-semibold mb-2">Average Savings</div>
              <div className="text-neutral-400 text-sm">Reduction in processing fees through rate optimization</div>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">24hrs</div>
              <div className="text-white font-semibold mb-2">Response Time</div>
              <div className="text-neutral-400 text-sm">Average response time for account management requests</div>
            </div>
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">99.9%</div>
              <div className="text-white font-semibold mb-2">Client Satisfaction</div>
              <div className="text-neutral-400 text-sm">Client satisfaction rate with our account management</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">
            Ready to Optimize Your Account?
          </h2>
          <p className="text-xl text-black/80 mb-12 max-w-3xl mx-auto">
            Get started with dedicated account management and see the difference personalized service makes
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <CalendlyButton 
              text="Schedule Account Review"
              className="bg-black hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105"
            />
            <Link
              href="/contact"
              className="bg-white/20 hover:bg-white/30 text-black border-2 border-black/20 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Contact Account Manager
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}