'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'guides', name: 'Guides & Tutorials' },
    { id: 'security', name: 'Security & Compliance' },
    { id: 'api', name: 'Developer Resources' },
    { id: 'support', name: 'Support & Help' }
  ];

  const resources = [
    {
      category: 'guides',
      title: 'Complete Guide to Payment Processing',
      description: 'Everything you need to know about accepting payments online and in-person.',
      type: 'Guide',
      readTime: '15 min read',
      link: '/resources/payment-processing-guide',
      featured: true
    },
    {
      category: 'guides',
      title: 'PCI DSS Compliance Checklist',
      description: 'Step-by-step checklist to ensure your business meets PCI DSS requirements.',
      type: 'Checklist',
      readTime: '10 min read',
      link: '/resources/pci-compliance-checklist',
      featured: false
    },
    {
      category: 'security',
      title: 'Understanding Payment Security',
      description: 'Learn about encryption, tokenization, and fraud prevention best practices.',
      type: 'White Paper',
      readTime: '20 min read',
      link: '/resources/payment-security',
      featured: true
    },
    {
      category: 'api',
      title: 'API Documentation',
      description: 'Complete API reference with code examples and integration guides.',
      type: 'Documentation',
      readTime: 'Reference',
      link: '/resources/api-docs',
      featured: false
    },
    {
      category: 'guides',
      title: 'Reducing Payment Processing Costs',
      description: 'Proven strategies to minimize fees and maximize your profit margins.',
      type: 'Guide',
      readTime: '12 min read',
      link: '/resources/reduce-processing-costs',
      featured: false
    },
    {
      category: 'security',
      title: 'Fraud Prevention Best Practices',
      description: 'Advanced techniques to protect your business from fraudulent transactions.',
      type: 'Guide',
      readTime: '18 min read',
      link: '/resources/fraud-prevention',
      featured: true
    },
    {
      category: 'api',
      title: 'SDK and Libraries',
      description: 'Download our SDKs for popular programming languages and frameworks.',
      type: 'Downloads',
      readTime: 'Downloads',
      link: '/resources/sdks',
      featured: false
    },
    {
      category: 'support',
      title: 'Common Integration Issues',
      description: 'Troubleshooting guide for the most common payment integration problems.',
      type: 'Troubleshooting',
      readTime: '8 min read',
      link: '/resources/integration-issues',
      featured: false
    },
    {
      category: 'guides',
      title: 'International Payment Processing',
      description: 'How to accept payments from customers around the world.',
      type: 'Guide',
      readTime: '14 min read',
      link: '/resources/international-payments',
      featured: false
    },
    {
      category: 'support',
      title: 'Getting Started Checklist',
      description: 'Everything you need to do to get your payment processing up and running.',
      type: 'Checklist',
      readTime: '5 min read',
      link: '/resources/getting-started',
      featured: false
    }
  ];

  const tools = [
    {
      name: 'Fee Calculator',
      description: 'Calculate your potential savings with Zummit Payments',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clipRule="evenodd"/>
        </svg>
      ),
      link: '/tools/fee-calculator'
    },
    {
      name: 'ROI Calculator',
      description: 'See how much you can save by switching to Zummit Payments',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
        </svg>
      ),
      link: '/tools/roi-calculator'
    },
    {
      name: 'API Testing Sandbox',
      description: 'Test our API in a safe sandbox environment',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
        </svg>
      ),
      link: '/tools/api-sandbox'
    },
    {
      name: 'Compliance Checker',
      description: 'Verify your PCI DSS compliance status',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      ),
      link: '/tools/compliance-checker'
    }
  ];

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="min-h-screen">
      <Header />
      <FloatingLeadCapture pageName="resources" />
      
      <section className="relative py-20 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-blue to-luxury-purple opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Knowledge
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Center
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-200 mb-12 max-w-4xl mx-auto">
            Everything you need to know about payment processing, security, compliance, 
            and growing your business with our premium solutions.
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

      {activeCategory === 'all' && (
        <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Featured
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Resources
                </span>
              </h2>
              <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
                Start with these essential resources to get the most out of Zummit Payments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredResources.map((resource, index) => (
                <Link
                  key={index}
                  href={resource.link}
                  className="group glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-semibold rounded-full">
                      {resource.type}
                    </span>
                    <span className="text-neutral-400 text-sm">{resource.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed mb-6">
                    {resource.description}
                  </p>
                  <div className="flex items-center text-yellow-400 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-semibold">Read More</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {activeCategory === 'all' ? 'All Resources' : categories.find(cat => cat.id === activeCategory)?.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <Link
                key={index}
                href={resource.link}
                className="group glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    resource.featured 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                      : 'bg-neutral-700 text-neutral-300'
                  }`}>
                    {resource.type}
                  </span>
                  <span className="text-neutral-400 text-sm">{resource.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                  {resource.description}
                </p>
                <div className="flex items-center text-yellow-400 text-sm group-hover:translate-x-2 transition-transform duration-300">
                  <span className="font-semibold">Read More</span>
                  <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Business
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Tools
              </span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Powerful tools to help you calculate savings, test integrations, and ensure compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool, index) => (
              <Link
                key={index}
                href={tool.link}
                className="group glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="text-yellow-400 mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Need More Help?
          </h2>
          <p className="text-xl text-black/80 mb-12 max-w-3xl mx-auto">
            Our support team is available 24/7 to help you with any questions about payment processing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="bg-black hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Contact Support
            </Link>
            <a
              href="mailto:Save.zummitpayments@gmail.com"
              className="bg-white/20 hover:bg-white/30 text-black border-2 border-black/20 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}