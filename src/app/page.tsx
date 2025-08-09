'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CalendlyEmbed, CalendlyButton } from '@/components/CalendlyWidget';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import Header from '@/components/Header';

export default function Home() {
  const [stats] = useState({
    savings: '40%',
    processing: '$100K+',
    customers: '10,000+',
    uptime: '99.9%'
  });

  const [showExitPopup, setShowExitPopup] = useState(false);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
        </svg>
      ),
      title: 'Credit Card Processing',
      description: 'Accept all major credit cards with our secure, fast processing system.',
      link: '/credit-card-processing'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
        </svg>
      ),
      title: 'Point of Sale Systems',
      description: 'Modern POS solutions for retail, restaurants, and service businesses.',
      link: '/portfolio'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: 'Secure Transactions',
      description: 'Bank-level security with PCI DSS compliance and fraud protection.',
      link: '/contact'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
        </svg>
      ),
      title: 'E-commerce Integration',
      description: 'Seamless online payment processing for your website or app.',
      link: '/products'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
        </svg>
      ),
      title: '24/7 Support',
      description: 'Round-the-clock customer support from payment processing experts.',
      link: '/support'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
        </svg>
      ),
      title: 'Account Management',
      description: 'Dedicated account manager to help optimize your payment processing.',
      link: '/support/account'
    }
  ];

  // Exit intent detection
  useEffect(() => {
    let exitIntentTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentTriggered) {
        exitIntentTriggered = true;
        setShowExitPopup(true);
      }
    };

    // Add event listener after a delay to avoid immediate triggers
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 10000); // 10 seconds delay

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="relative py-20 pt-32 lg:min-h-screen lg:flex lg:items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-blue to-luxury-purple opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe-delay"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe-delay-long"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent animate-fade-in leading-tight pb-2">
              <span className="inline-block animate-slide-up">Welcome to</span>
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent animate-slide-up-delay pb-2">
                Zummit Payments
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-neutral-200 mb-12 max-w-4xl mx-auto leading-relaxed">
           Experience the power of our premium merchant & payment processing services and start saving from 0% on processing fees today.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-yellow-400 mb-2 leading-tight pb-1">{stats.savings}</div>
              <div className="text-neutral-300 text-sm">Average Savings</div>
            </div>
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-yellow-400 mb-2 leading-tight pb-1">{stats.processing}</div>
              <div className="text-neutral-300 text-sm">Monthly Processing</div>
            </div>
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-yellow-400 mb-2 leading-tight pb-1">{stats.customers}</div>
              <div className="text-neutral-300 text-sm">Happy Customers</div>
            </div>
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-yellow-400 mb-2 leading-tight pb-1">{stats.uptime}</div>
              <div className="text-neutral-300 text-sm">System Uptime</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <CalendlyButton 
              text="Schedule Call"
              className="bg-black hover:bg-neutral-800 text-white px-8 py-4 text-lg shadow-2xl shadow-yellow-400/25 hover:shadow-yellow-400/40"
            />
            <a
              href="mailto:Save.zummitpayments@gmail.com"
              className="glass border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center space-x-3"
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

      <section className="pt-32 pb-20 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to 
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Process Payments
              </span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Our comprehensive payment processing platform provides all the tools and services your business needs to succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.link}
                className="group glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-yellow-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center text-yellow-400 mt-6 group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm font-semibold">Learn More</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-black/80 mb-12 max-w-3xl mx-auto">
            Join businesses already saving money with our low rate payment processing solutions 
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Schedule Your Free
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Consultation
              </span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Get a personalized savings analysis and see exactly how much you can save on payment processing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <CalendlyEmbed />
          </div>
        </div>
      </section>

      {/* Exit Intent Popup */}
      <ExitIntentPopup 
        isOpen={showExitPopup} 
        onClose={() => setShowExitPopup(false)} 
      />
    </div>
  );
}