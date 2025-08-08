'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/Header';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { CalendlyButton } from '@/components/CalendlyWidget';

export default function Support() {
  const [activeCategory, setActiveCategory] = useState('general');

  const supportCategories = [
    { id: 'general', name: 'General Support', icon: '🆘' },
    { id: 'technical', name: 'Technical Issues', icon: '⚙️' },
    { id: 'billing', name: 'Billing & Payments', icon: '💳' },
    { id: 'account', name: 'Account Management', icon: '👤' }
  ];

  const faqData = {
    general: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards including Visa, MasterCard, American Express, and Discover. We also support digital wallets like Apple Pay, Google Pay, and Samsung Pay.'
      },
      {
        question: 'How quickly can I start processing payments?',
        answer: 'Most merchants can start processing payments within 24-48 hours after approval. Our streamlined onboarding process ensures you get up and running as quickly as possible.'
      },
      {
        question: 'What are your processing fees?',
        answer: 'Our processing fees start as low as 0% for qualifying merchants. We offer competitive rates tailored to your business volume and industry. Contact us for a personalized quote.'
      },
      {
        question: 'Do you provide equipment?',
        answer: 'Yes, we provide a full range of payment processing equipment including POS systems, mobile card readers, and e-commerce gateways. All equipment comes with training and ongoing support.'
      }
    ],
    technical: [
      {
        question: 'What if my terminal stops working?',
        answer: 'We provide 24/7 technical support. If your terminal malfunctions, we can troubleshoot remotely or send a replacement device within 24 hours.'
      },
      {
        question: 'How do I integrate with my existing POS system?',
        answer: 'Our payment solutions integrate with most popular POS systems. Our technical team will assist with the integration process and provide ongoing support.'
      },
      {
        question: 'What security measures are in place?',
        answer: 'We maintain PCI DSS compliance and use end-to-end encryption for all transactions. Our systems include advanced fraud detection and prevention tools.'
      },
      {
        question: 'Can I process payments offline?',
        answer: 'Yes, our terminals can store transactions when offline and process them automatically when connectivity is restored.'
      }
    ],
    billing: [
      {
        question: 'When do I receive my funds?',
        answer: 'Standard funding is next business day. We also offer same-day funding for qualifying merchants at competitive rates.'
      },
      {
        question: 'Are there any hidden fees?',
        answer: 'No hidden fees. We provide transparent pricing with all costs clearly outlined in your merchant agreement. What you see is what you pay.'
      },
      {
        question: 'How do chargebacks work?',
        answer: 'We provide comprehensive chargeback management including dispute resolution assistance and prevention tools to minimize chargeback occurrences.'
      },
      {
        question: 'Can I get detailed transaction reports?',
        answer: 'Yes, our merchant portal provides detailed real-time reporting including transaction history, settlement reports, and business analytics.'
      }
    ],
    account: [
      {
        question: 'How do I update my account information?',
        answer: 'You can update your account information through our secure merchant portal or by contacting your dedicated account manager directly.'
      },
      {
        question: 'Who is my account manager?',
        answer: 'Every merchant is assigned a dedicated account manager who serves as your primary point of contact for all account-related matters.'
      },
      {
        question: 'Can I add additional locations?',
        answer: 'Yes, we support multi-location businesses. Your account manager can help you add new locations and manage them from a single dashboard.'
      },
      {
        question: 'What if I want to cancel my account?',
        answer: 'We offer flexible terms with no long-term contracts for most merchants. Contact your account manager to discuss any concerns before making a decision.'
      }
    ]
  };

  const contactMethods = [
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      value: 'Save.zummitpayments@gmail.com',
      icon: '📧',
      available: 'Response within 2 hours'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      value: 'Start Chat',
      icon: '💬',
      available: 'Available 24/7'
    },
    {
      title: 'Schedule Call',
      description: 'Book a support consultation',
      value: 'Book Now',
      icon: '📅',
      available: 'Available 24/7'
    }
  ];

  const currentFAQs = faqData[activeCategory as keyof typeof faqData];

  return (
    <div className="min-h-screen">
      <Header />
      <FloatingLeadCapture pageName="support" />
      
      <section className="relative py-40 pt-40 pb-64 md:py-48 md:pt-48 md:pb-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-blue to-luxury-purple opacity-90"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe-delay"></div>
          <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-blue-400/15 rounded-full mix-blend-multiply filter blur-lg animate-pulse"></div>
        </div>
        

        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-4xl">🚀</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-typewriter">
            24/7 Customer Support
          </h1>
          <p className="text-xl text-neutral-200 mb-12 max-w-3xl mx-auto">
            Get the help you need, when you need it. Our expert support team is available around the clock to assist with any questions or issues.
          </p>
          
          {/* Support Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-sm text-neutral-300">Available Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">&lt;5min</div>
              <div className="text-sm text-neutral-300">Average Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">99%</div>
              <div className="text-sm text-neutral-300">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Choose the support method that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {contactMethods.map((method) => (
              <div key={method.title} className="glass rounded-2xl p-6 lg:p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-3xl lg:text-4xl mb-4">{method.icon}</div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-2">{method.title}</h3>
                <p className="text-sm lg:text-base text-neutral-400 mb-4">{method.description}</p>
                <div className="text-yellow-400 font-semibold mb-2 text-sm lg:text-base break-words overflow-hidden">
                  {method.title === 'Email Support' ? (
                    <a href={`mailto:${method.value}`} className="hover:text-yellow-300 transition-colors">
                      {method.value}
                    </a>
                  ) : (
                    method.value
                  )}
                </div>
                <div className="text-xs lg:text-sm text-neutral-500">{method.available}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Find quick answers to common questions
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            {supportCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? 'bg-yellow-400 text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto space-y-6">
            {currentFAQs.map((faq, index) => (
              <div key={index} className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">{faq.question}</h3>
                <p className="text-neutral-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl text-black/80 mb-12 max-w-3xl mx-auto">
            Our support team is standing by to help you with any questions or concerns
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <CalendlyButton 
              text="Schedule Support Call"
              className="bg-black hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105"
            />
            <Link
              href="/contact"
              className="bg-white/20 hover:bg-white/30 text-black border-2 border-black/20 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}