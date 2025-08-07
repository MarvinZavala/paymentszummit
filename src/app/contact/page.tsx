'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import FloatingLeadCapture from '@/components/FloatingLeadCapture';
import { supabase, type ContactMessage } from '@/lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    monthlyVolume: '',
    currentProcessor: '',
    message: '',
    contactReason: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const contactReasons = [
    'Get a Custom Quote 💰',
    'I need Help Setting Up 🛠️',
    'Technical Support 🆘',
    'I want to Partner with You 🤝',
    'Just Curious About Services 🤔',
    'My Current Processor Stinks 😤'
  ];

  const volumeRanges = [
    'Just getting started (Under $5K)',
    'Small but mighty ($5K - $25K)',
    'Growing business ($25K - $50K)',
    'Solid performer ($50K - $100K)',
    'High volume player ($100K - $500K)',
    'Big league (Over $500K) 🏆'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getFormProgress = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'contactReason'];
    const filledRequiredFields = requiredFields.filter(field => formData[field as keyof typeof formData]).length;
    const optionalFields = ['company', 'website', 'monthlyVolume', 'currentProcessor', 'message'];
    const filledOptionalFields = optionalFields.filter(field => formData[field as keyof typeof formData]).length;
    
    const totalFields = requiredFields.length + optionalFields.length;
    const filledFields = filledRequiredFields + filledOptionalFields;
    
    return Math.round((filledFields / totalFields) * 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const contactMessage: Omit<ContactMessage, 'id' | 'created_at'> = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || undefined,
        website: formData.website || undefined,
        contact_reason: formData.contactReason,
        monthly_volume: formData.monthlyVolume || undefined,
        current_processor: formData.currentProcessor || undefined,
        message: formData.message || undefined
      };

      const { data, error } = await supabase
        .from('contact_messages')
        .insert([contactMessage])
        .select();

      if (error) {
        throw error;
      }

      console.log('Contact form submitted successfully:', data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      title: 'Schedule Meeting',
      description: 'Book a personalized consultation',
      value: 'Book Now',
      link: 'https://calendly.com/save-zummitpayments/30min?month=2025-08',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
        </svg>
      ),
      available: 'Available 24/7'
    },
    {
      title: 'Email Us',
      description: 'Send us a detailed message',
      value: 'Save.zummitpayments@gmail.com',
      link: 'mailto:Save.zummitpayments@gmail.com',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
        </svg>
      ),
      available: 'Response within 2 hours'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      value: 'Start Chat',
      link: '#',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
        </svg>
      ),
      available: 'Available 24/7'
    }
  ];



  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary-blue to-luxury-purple">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="glass rounded-3xl p-12">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Thank You!</h1>
            <p className="text-xl text-neutral-300 mb-8">
              We&apos;ve received your message and will get back to you within 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    company: '',
                    website: '',
                    monthlyVolume: '',
                    currentProcessor: '',
                    message: '',
                    contactReason: ''
                  });
                }}
                className="glass border border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold transition-all duration-300"
              >
                Send Another Message
              </button>
              <Link
                href="/"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-6 py-3 rounded-full font-bold transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <FloatingLeadCapture pageName="contact" />
      
      <section className="relative py-20 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-blue to-luxury-purple opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-breathe-delay"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            <span className="inline-block animate-slide-up">Get In</span>
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-slide-up-delay">
              Touch
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-200 mb-12 max-w-4xl mx-auto">
            Ready to start saving on payment processing? Our team of experts is here to help you 
            find the perfect solution for your business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-yellow-400 mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                <p className="text-neutral-400 mb-4">{method.description}</p>
                <p className="text-yellow-400 font-semibold text-lg mb-2">{method.value}</p>
                <p className="text-neutral-500 text-sm">{method.available}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-bold text-white">Send Us a Message</h2>
                <div className="text-right">
                  <div className="text-sm text-neutral-400 mb-1">Form Progress</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300 ease-out"
                        style={{ width: `${getFormProgress()}%` }}
                      ></div>
                    </div>
                    <span className="text-yellow-400 font-semibold text-sm">{getFormProgress()}%</span>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-neutral-300 font-medium mb-2 flex items-center">
                      <span className="mr-2">👋</span> First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      placeholder="What should we call you?"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-neutral-300 font-medium mb-2 flex items-center">
                      <span className="mr-2">👤</span> Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      placeholder="Your family name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-neutral-300 font-medium mb-2 flex items-center">
                      <span className="mr-2">📧</span> Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      placeholder="your@awesome-business.com"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-neutral-300 font-medium mb-2 flex items-center">
                      <span className="mr-2">📞</span> Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-neutral-300 font-medium mb-2 flex items-center">
                      <span className="mr-2">🏢</span> Company Name
                      <span className="ml-2 text-xs text-neutral-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      placeholder="Your amazing company"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-neutral-300 font-medium mb-2 flex items-center">
                      <span className="mr-2">🌐</span> Website
                      <span className="ml-2 text-xs text-neutral-400">(optional)</span>
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-neutral-300 font-medium mb-2 flex items-center">
                    <span className="mr-2">🎯</span> What brings you here? *
                  </label>
                  <select
                    required
                    value={formData.contactReason}
                    onChange={(e) => handleInputChange('contactReason', e.target.value)}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  >
                    <option value="" className="bg-neutral-800">Choose your adventure...</option>
                    {contactReasons.map((reason) => (
                      <option key={reason} value={reason} className="bg-neutral-800">{reason}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <label className="block text-neutral-300 font-medium mb-2 flex items-center">
                    <span className="mr-2">💰</span> Monthly Processing Volume
                    <span className="ml-2 text-xs text-neutral-400">(helps us quote better)</span>
                  </label>
                  <select
                    value={formData.monthlyVolume}
                    onChange={(e) => handleInputChange('monthlyVolume', e.target.value)}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  >
                    <option value="" className="bg-neutral-800">Pick your range...</option>
                    {volumeRanges.map((range) => (
                      <option key={range} value={range} className="bg-neutral-800">{range}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <label className="block text-neutral-300 font-medium mb-2 flex items-center">
                    <span className="mr-2">🏦</span> Current Payment Processor
                    <span className="ml-2 text-xs text-neutral-400">(who&apos;s taking your money?)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.currentProcessor}
                    onChange={(e) => handleInputChange('currentProcessor', e.target.value)}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                    placeholder="Square, Stripe, PayPal, or that other guy..."
                  />
                </div>

                <div className="relative">
                  <label className="block text-neutral-300 font-medium mb-2 flex items-center">
                    <span className="mr-2">💬</span> Tell us your story
                    <span className="ml-2 text-xs text-neutral-400">(optional, but we love stories!)</span>
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 resize-none hover:bg-white/15"
                    placeholder="Share your business dreams, payment processing nightmares, or just say hi! We&apos;re all ears... 👂"
                  />
                </div>

                {submitError && (
                  <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 flex items-center space-x-2">
                    <span>⚠️</span>
                    <span>{submitError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform relative overflow-hidden ${
                    isSubmitting
                      ? 'bg-neutral-600 text-neutral-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black hover:scale-105 shadow-lg shadow-yellow-400/25 group'
                  }`}
                >
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending your message...</span>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <span>Send Message</span>
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">🚀</span>
                      </span>
                    )}
                  </span>
                  {!isSubmitting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              </form>
            </div>

            <div className="space-y-8">

              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Response Guarantee</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-neutral-300">Response within 2 hours during business hours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-neutral-300">Custom quote delivered within 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-neutral-300">No pushy sales tactics, just honest advice</span>
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
            Ready to Save Money?
          </h2>
          <p className="text-xl text-black/80 mb-12 max-w-3xl mx-auto">
            Join thousands of businesses already saving up to 40% on their payment processing costs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:Save.zummitpayments@gmail.com"
              className="bg-black hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </a>
            <a
              href="/portfolio"
              className="bg-white/20 hover:bg-white/30 text-black border-2 border-black/20 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              View Equipment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}